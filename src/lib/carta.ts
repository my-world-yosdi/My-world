import { APODO_INICIAL, APODO_MAXIMO, CARTA_MAXIMO, cartaParaAngel } from '../data/mensajes'

/**
 * Limpia un texto escrito a mano antes de enviarlo:
 * normaliza los acentos, quita caracteres de control invisibles (dejando saltos de línea y tabulaciones)
 * y recorta espacios sobrantes al inicio y al final. React ya escapa el texto al mostrarlo.
 */
export function limpiarTexto(texto: string) {
  return (
    texto
      .normalize('NFC')
      // eslint-disable-next-line no-control-regex
      .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F​-‏‪-‮⁦-⁩]/g, '')
      .replace(/\r\n?/g, '\n')
      .trim()
  )
}

/** Apodo listo para mostrar: si el campo está vacío, se usa el nombre de siempre. */
export function apodoVisible(apodo: string) {
  return limpiarTexto(apodo).slice(0, APODO_MAXIMO) || APODO_INICIAL
}

export type ErroresCarta = { apodo?: string; mensaje?: string }

export function validarCarta(apodo: string, mensaje: string): ErroresCarta {
  const errores: ErroresCarta = {}
  const a = limpiarTexto(apodo)
  const m = limpiarTexto(mensaje)
  if (!a) errores.apodo = cartaParaAngel.apodo.vacio
  else if (a.length > APODO_MAXIMO) errores.apodo = cartaParaAngel.apodo.vacio
  if (!m) errores.mensaje = cartaParaAngel.mensaje.vacio
  else if (m.length > CARTA_MAXIMO) errores.mensaje = cartaParaAngel.mensaje.largo(CARTA_MAXIMO)
  return errores
}

/** Fecha y hora de Perú, en palabras, para el correo. */
export function fechaDeEnvio(fecha = new Date()) {
  return new Intl.DateTimeFormat('es-PE', { dateStyle: 'full', timeStyle: 'short', timeZone: 'America/Lima' }).format(fecha)
}

/** Identificador corto para reconocer cada cartita (y no recibir dos veces la misma). */
export function crearIdCarta() {
  const aleatorio = typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`
  return `carta-${aleatorio.replace(/-/g, '').slice(0, 12)}`
}
