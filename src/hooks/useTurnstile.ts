import { useEffect, useRef } from 'react'

/** Lo poco que usamos de Cloudflare Turnstile (modo explícito). */
type ApiTurnstile = {
  render(contenedor: HTMLElement, opciones: Record<string, unknown>): string
  execute(contenedor: HTMLElement | string): void
  reset(widget: string): void
  remove(widget: string): void
}

declare global {
  interface Window {
    turnstile?: ApiTurnstile
  }
}

const SCRIPT = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
let carga: Promise<ApiTurnstile> | undefined

function cargarTurnstile() {
  carga ??= new Promise((resolver, rechazar) => {
    if (window.turnstile) return resolver(window.turnstile)
    const script = document.createElement('script')
    script.src = SCRIPT
    script.async = true
    script.onload = () => (window.turnstile ? resolver(window.turnstile) : rechazar(new Error('Turnstile no cargó')))
    script.onerror = () => {
      carga = undefined
      rechazar(new Error('Turnstile no cargó'))
    }
    document.head.append(script)
  })
  return carga
}

/**
 * Verificación anti-robots de Cloudflare Turnstile, invisible salvo que Cloudflare necesite
 * que ella marque una casilla. Solo se carga si hay una site key configurada.
 * `obtenerToken()` pide un token nuevo cada vez (cada token sirve una sola vez).
 */
export function useTurnstile(siteKey: string) {
  const contenedorRef = useRef<HTMLDivElement>(null)
  const widget = useRef<string | null>(null)
  const espera = useRef<((token: string | undefined) => void) | null>(null)

  useEffect(() => {
    if (!siteKey || !contenedorRef.current) return
    let vivo = true
    const contenedor = contenedorRef.current
    cargarTurnstile()
      .then((api) => {
        if (!vivo) return
        widget.current = api.render(contenedor, {
          sitekey: siteKey,
          execution: 'execute',
          appearance: 'interaction-only',
          language: 'es',
          callback: (token: string) => {
            espera.current?.(token)
            espera.current = null
          },
          'error-callback': () => {
            espera.current?.(undefined)
            espera.current = null
          },
        })
      })
      .catch(() => {
        /* sin Turnstile: el notificador decidirá si acepta o no el aviso */
      })
    return () => {
      vivo = false
      if (widget.current && window.turnstile) window.turnstile.remove(widget.current)
      widget.current = null
    }
  }, [siteKey])

  const obtenerToken = () =>
    new Promise<string | undefined>((resolver) => {
      const api = window.turnstile
      if (!siteKey || !api || !widget.current || !contenedorRef.current) return resolver(undefined)
      const limite = window.setTimeout(() => {
        espera.current = null
        resolver(undefined)
      }, 20000)
      espera.current = (token) => {
        window.clearTimeout(limite)
        resolver(token)
      }
      api.reset(widget.current)
      api.execute(contenedorRef.current)
    })

  return { contenedorRef, obtenerToken }
}
