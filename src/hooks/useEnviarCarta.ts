import { useRef, useState } from 'react'
import { useSubmit } from '@formspree/react'
import { APODO_MAXIMO, CARTA_MAXIMO, cartaParaAngel, nombres } from '../data/mensajes'
import { buzon } from '../config/buzon'
import { crearIdCarta, fechaDeEnvio, limpiarTexto } from '../lib/carta'
import { useTurnstile } from './useTurnstile'

/** Campos que llegan al correo de Ángel (Formspree los muestra tal cual, como texto). */
type CamposCarta = {
  remitente: string
  para: string
  carta: string
  enviadoEl: string
  enviadoIso: string
  idCarta: string
  subject: string
  _gotcha: string
}

export type MotivoError = 'sinConfigurar' | 'sinConexion' | 'servicio'
export type EstadoEnvio = { fase: 'listo' | 'enviando' | 'enviado' | 'error'; motivo?: MotivoError }

/**
 * Envía la cartita de verdad:
 * 1. a Formspree (el correo de Ángel), y solo si Formspree confirma,
 * 2. avisa al notificador de WhatsApp (si está configurado). Ese aviso es "extra":
 *    si falla, la carta igual ya llegó al correo y no se le muestra error a ella.
 */
export function useEnviarCarta() {
  const submit = useSubmit<CamposCarta>(buzon.formspreeId || 'sin-configurar')
  const turnstile = useTurnstile(buzon.notificadorUrl ? buzon.turnstileSiteKey : '')
  const [estado, setEstado] = useState<EstadoEnvio>({ fase: 'listo' })
  // Evita envíos duplicados por doble clic o Enter repetido
  const enCurso = useRef(false)

  const avisarPorWhatsApp = async (para: string, idCarta: string) => {
    if (!buzon.notificadorUrl) return
    try {
      const token = await turnstile.obtenerToken()
      await fetch(buzon.notificadorUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ para, idCarta, token }),
        keepalive: true,
      })
    } catch {
      /* el correo ya llegó; el aviso por WhatsApp es solo un extra */
    }
  }

  const enviar = async ({ apodo, mensaje, trampa }: { apodo: string; mensaje: string; trampa: string }) => {
    if (enCurso.current) return false
    if (!buzon.formspreeId) {
      setEstado({ fase: 'error', motivo: 'sinConfigurar' })
      return false
    }
    enCurso.current = true
    setEstado({ fase: 'enviando' })

    const para = limpiarTexto(apodo).slice(0, APODO_MAXIMO)
    const carta = limpiarTexto(mensaje).slice(0, CARTA_MAXIMO)
    const ahora = new Date()
    const idCarta = crearIdCarta()

    try {
      const resultado = await submit({
        remitente: nombres.ella,
        para,
        carta,
        enviadoEl: fechaDeEnvio(ahora),
        enviadoIso: ahora.toISOString(),
        idCarta,
        subject: cartaParaAngel.asuntoCorreo(para),
        _gotcha: trampa,
      })
      if (resultado.kind === 'error') {
        if (import.meta.env.DEV) console.warn('[cartita] Formspree respondió con error:', resultado.getFormErrors(), resultado.getAllFieldErrors())
        setEstado({ fase: 'error', motivo: 'servicio' })
        return false
      }
      setEstado({ fase: 'enviado' })
      void avisarPorWhatsApp(para, idCarta)
      return true
    } catch (error) {
      if (import.meta.env.DEV) console.warn('[cartita] No se pudo contactar a Formspree:', error)
      setEstado({ fase: 'error', motivo: navigator.onLine ? 'servicio' : 'sinConexion' })
      return false
    } finally {
      enCurso.current = false
    }
  }

  const reiniciar = () => setEstado({ fase: 'listo' })

  return { estado, enviar, reiniciar, turnstileRef: turnstile.contenedorRef }
}
