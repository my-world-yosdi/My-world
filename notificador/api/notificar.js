/**
 * ♡ Notificador de cartitas por WhatsApp (función serverless para Vercel) ♡
 *
 * La página llama a este endpoint SOLO después de que Formspree confirmó la carta.
 * Envía a Ángel una plantilla aprobada de WhatsApp Cloud API (Meta) que dice para quién era la carta.
 * El contenido de la carta NO pasa por aquí: se lee en el correo.
 *
 * Todo lo privado vive en variables de entorno de Vercel (ver ../.env.example y ../README.md).
 * Nunca se registran en logs el número, el token ni el contenido recibido.
 */

const MAX_CUERPO = 2_000 // bytes
const APODO_MAXIMO = 30
const ID_VALIDO = /^carta-[a-f0-9]{12}$/

/* ---------- Límites contra abuso (por instancia de la función) ---------- */
// Vercel puede tener varias instancias: esto es una barrera extra, la principal es Turnstile.
const VENTANA_MS = 10 * 60 * 1000
const MAX_POR_IP = 3
const MAX_GLOBAL_POR_HORA = 15
const porIp = new Map()
const recientes = []
const idsVistos = new Set()

function env(nombre, porDefecto = '') {
  return (process.env[nombre] ?? porDefecto).trim()
}

function origenesPermitidos() {
  return env('ORIGENES_PERMITIDOS')
    .split(',')
    .map((o) => o.trim().replace(/\/$/, ''))
    .filter(Boolean)
}

function cabecerasCors(origen) {
  const base = { Vary: 'Origin', 'Cache-Control': 'no-store' }
  if (!origen || !origenesPermitidos().includes(origen)) return base
  return {
    ...base,
    'Access-Control-Allow-Origin': origen,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  }
}

function responder(estado, cuerpo, origen) {
  return new Response(JSON.stringify(cuerpo), {
    status: estado,
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...cabecerasCors(origen) },
  })
}

/** Limpia el apodo para usarlo como parámetro de plantilla (WhatsApp no acepta saltos de línea ni tabs). */
function limpiarApodo(texto) {
  return String(texto)
    .normalize('NFC')
    // eslint-disable-next-line no-control-regex -- justamente se quitan los caracteres de control
    .replace(/[\u0000-\u001F\u007F​-‏‪-‮⁦-⁩]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, APODO_MAXIMO)
}

function ipDe(request) {
  return (request.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'desconocida'
}

function dentroDelLimite(ip) {
  const ahora = Date.now()
  const lista = (porIp.get(ip) ?? []).filter((t) => ahora - t < VENTANA_MS)
  while (recientes.length && ahora - recientes[0] > 60 * 60 * 1000) recientes.shift()
  if (lista.length >= MAX_POR_IP || recientes.length >= MAX_GLOBAL_POR_HORA) return false
  lista.push(ahora)
  porIp.set(ip, lista)
  recientes.push(ahora)
  return true
}

async function verificarTurnstile(token, ip) {
  const secreto = env('TURNSTILE_SECRET_KEY')
  if (!secreto) return env('PERMITIR_SIN_TURNSTILE') === 'true'
  if (typeof token !== 'string' || !token || token.length > 2048) return false
  try {
    const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: secreto, response: token, remoteip: ip, idempotency_key: crypto.randomUUID() }),
    })
    const datos = await r.json()
    if (!datos.success) return false
    // Si se configuró, el token debe venir de tu propio dominio
    const host = env('TURNSTILE_HOSTNAME')
    return !host || datos.hostname === host
  } catch {
    return false
  }
}

async function enviarWhatsApp(apodo) {
  const token = env('WHATSAPP_TOKEN')
  const telefonoId = env('WHATSAPP_PHONE_NUMBER_ID')
  const destino = env('WHATSAPP_DESTINO').replace(/\D/g, '')
  const plantilla = env('WHATSAPP_PLANTILLA', 'nueva_cartita')
  const idioma = env('WHATSAPP_IDIOMA', 'es')
  const version = env('GRAPH_API_VERSION', 'v23.0')
  // Para la primera prueba con la plantilla `hello_world` de Meta (no tiene variables): WHATSAPP_CON_APODO=false
  const conApodo = env('WHATSAPP_CON_APODO', 'true') !== 'false'
  if (!token || !telefonoId || !destino) return { ok: false, motivo: 'sin-configurar' }

  const r = await fetch(`https://graph.facebook.com/${version}/${telefonoId}/messages`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to: destino,
      type: 'template',
      template: {
        name: plantilla,
        language: { code: idioma },
        ...(conApodo && { components: [{ type: 'body', parameters: [{ type: 'text', text: apodo }] }] }),
      },
    }),
  })
  if (r.ok) return { ok: true }
  // Solo se registra el código de error de Meta, nunca el número ni el token
  let codigo = 'desconocido'
  try {
    const datos = await r.json()
    codigo = `${datos?.error?.code ?? ''}/${datos?.error?.error_subcode ?? ''}`
  } catch {
    /* sin cuerpo */
  }
  console.error(`[notificador] WhatsApp respondió ${r.status} (código ${codigo})`)
  return { ok: false, motivo: 'whatsapp' }
}

export function OPTIONS(request) {
  const origen = request.headers.get('origin')
  if (!origen || !origenesPermitidos().includes(origen)) return new Response(null, { status: 403, headers: { Vary: 'Origin' } })
  return new Response(null, { status: 204, headers: cabecerasCors(origen) })
}

export async function POST(request) {
  const origen = request.headers.get('origin')
  if (!origen || !origenesPermitidos().includes(origen)) return responder(403, { ok: false, error: 'origen-no-permitido' }, origen)
  if (!(request.headers.get('content-type') ?? '').includes('application/json')) return responder(415, { ok: false, error: 'tipo-no-soportado' }, origen)

  const texto = await request.text()
  if (texto.length > MAX_CUERPO) return responder(413, { ok: false, error: 'muy-grande' }, origen)

  let datos
  try {
    datos = JSON.parse(texto)
  } catch {
    return responder(400, { ok: false, error: 'json-invalido' }, origen)
  }

  const apodo = limpiarApodo(datos?.para ?? '')
  const idCarta = String(datos?.idCarta ?? '')
  if (!apodo || !ID_VALIDO.test(idCarta)) return responder(400, { ok: false, error: 'datos-invalidos' }, origen)

  const ip = ipDe(request)
  if (!(await verificarTurnstile(datos?.token, ip))) return responder(401, { ok: false, error: 'verificacion-fallida' }, origen)
  // Misma carta dos veces (reintento o doble clic): no se avisa de nuevo
  if (idsVistos.has(idCarta)) return responder(200, { ok: true, repetido: true }, origen)
  if (!dentroDelLimite(ip)) return responder(429, { ok: false, error: 'demasiados-avisos' }, origen)

  idsVistos.add(idCarta)
  if (idsVistos.size > 500) idsVistos.delete(idsVistos.values().next().value)

  try {
    const resultado = await enviarWhatsApp(apodo)
    if (!resultado.ok) return responder(resultado.motivo === 'sin-configurar' ? 503 : 502, { ok: false, error: resultado.motivo }, origen)
    return responder(202, { ok: true }, origen)
  } catch {
    console.error('[notificador] No se pudo contactar a WhatsApp')
    return responder(502, { ok: false, error: 'whatsapp' }, origen)
  }
}
