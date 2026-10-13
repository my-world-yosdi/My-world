import { useEffect, useEffectEvent, useRef } from 'react'
import { animate, type AnimationPlaybackControls } from 'motion/react'
import type { MusicaCarta } from '../data/musica'

/** Aviso para que el botón de música de fondo se pause mientras suena una carta. */
export const EVENTO_MUSICA_CARTA = 'musica-carta'

/** Lo poco que usamos del reproductor de YouTube (IFrame API). */
type Reproductor = {
  playVideo(): void
  pauseVideo(): void
  seekTo(segundos: number, permitirBuscar: boolean): void
  setVolume(volumen: number): void
  getCurrentTime(): number
  destroy(): void
}
type ApiYouTube = { Player: new (elemento: HTMLElement, opciones: object) => Reproductor }

declare global {
  interface Window {
    YT?: ApiYouTube
    onYouTubeIframeAPIReady?: () => void
  }
}

let cargaApi: Promise<ApiYouTube> | undefined

/** Carga el script de YouTube una sola vez para todo el sitio. */
function cargarYouTube() {
  cargaApi ??= new Promise((resolver) => {
    if (window.YT?.Player) return resolver(window.YT)
    const previo = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      previo?.()
      resolver(window.YT!)
    }
    const script = document.createElement('script')
    script.src = 'https://www.youtube.com/iframe_api'
    document.head.append(script)
  })
  return cargaApi
}

/** '1:18' → 78 */
function aSegundos(tiempo: string) {
  return tiempo.split(':').reduce((total, parte) => total * 60 + Number(parte), 0)
}

/** Saca el id del video de un link de YouTube (watch?v=, youtu.be/, shorts/) o lo deja tal cual. */
function idDeVideo(link: string) {
  try {
    const url = new URL(link)
    if (url.hostname === 'youtu.be') return url.pathname.slice(1)
    return url.searchParams.get('v') ?? url.pathname.split('/').pop() ?? link
  } catch {
    return link
  }
}

const FUNDIDO = 1.4

/**
 * Canción de una carta desde YouTube, con un reproductor invisible.
 * Al abrir empieza en `desde` con un fundido de entrada; al llegar a `hasta` vuelve a `desde`;
 * al guardar (o salir de la página) se apaga con un fundido.
 */
export function useMusicaCarta(config: MusicaCarta) {
  const reproductor = useRef<Reproductor>(null)
  const listo = useRef(false)
  const pendiente = useRef(false)
  const sonando = useRef(false)
  const reiniciando = useRef(false)
  const volumen = useRef(0)
  const fundido = useRef<AnimationPlaybackControls>(undefined)

  const desde = aSegundos(config.desde)
  const hasta = config.hasta ? aSegundos(config.hasta) : undefined

  const fundirA = (destino: number, alTerminar?: () => void) => {
    const r = reproductor.current
    if (!r) return
    fundido.current?.stop()
    fundido.current = animate(volumen.current, destino, {
      duration: FUNDIDO,
      ease: 'easeInOut',
      onUpdate: (v) => {
        volumen.current = v
        r.setVolume(v)
      },
      onComplete: alTerminar,
    })
  }

  const arrancar = (r: Reproductor) => {
    reiniciando.current = false
    volumen.current = 0
    r.setVolume(0)
    r.seekTo(desde, true)
    r.playVideo()
    fundirA(config.volumen)
  }

  const alEstarListo = useEffectEvent(() => {
    listo.current = true
    reproductor.current?.setVolume(0)
    if (pendiente.current && reproductor.current) {
      pendiente.current = false
      arrancar(reproductor.current)
    }
  })

  // Si el video termina antes de `hasta`, vuelve a empezar el pedacito
  const alCambiarEstado = useEffectEvent((estado: number) => {
    if (estado === 0 && sonando.current && reproductor.current) arrancar(reproductor.current)
  })

  // Repite el pedacito: un poco antes de `hasta` baja el volumen y vuelve a `desde`
  const vigilarPedacito = useEffectEvent(() => {
    const r = reproductor.current
    if (!r || !sonando.current || hasta === undefined || reiniciando.current) return
    if (r.getCurrentTime() >= hasta - FUNDIDO) {
      reiniciando.current = true
      fundirA(0, () => {
        if (sonando.current) arrancar(r)
      })
    }
  })

  useEffect(() => {
    if (!config.youtube) return
    let vivo = true
    const contenedor = document.createElement('div')
    contenedor.className = 'musica-youtube'
    contenedor.setAttribute('aria-hidden', 'true')
    const lugar = document.createElement('div')
    contenedor.append(lugar)
    document.body.append(contenedor)

    void cargarYouTube().then((YT) => {
      if (!vivo) return
      reproductor.current = new YT.Player(lugar, {
        width: 200,
        height: 200,
        videoId: idDeVideo(config.youtube!),
        playerVars: { start: desde, controls: 0, disablekb: 1, playsinline: 1, rel: 0, fs: 0, iv_load_policy: 3 },
        events: {
          onReady: () => alEstarListo(),
          onStateChange: (e: { data: number }) => alCambiarEstado(e.data),
        },
      })
    })

    const vigilar = window.setInterval(() => vigilarPedacito(), 250)

    return () => {
      vivo = false
      window.clearInterval(vigilar)
      fundido.current?.stop()
      reproductor.current?.destroy()
      reproductor.current = null
      listo.current = false
      contenedor.remove()
      if (sonando.current) {
        sonando.current = false
        window.dispatchEvent(new CustomEvent(EVENTO_MUSICA_CARTA, { detail: 'fin' }))
      }
    }
  }, [config.youtube, desde])

  const reproducir = () => {
    if (!config.youtube) return
    sonando.current = true
    window.dispatchEvent(new CustomEvent(EVENTO_MUSICA_CARTA, { detail: 'inicio' }))
    if (reproductor.current && listo.current) arrancar(reproductor.current)
    else pendiente.current = true
  }

  const detener = () => {
    pendiente.current = false
    if (!sonando.current) return
    sonando.current = false
    reiniciando.current = false
    fundirA(0, () => {
      reproductor.current?.pauseVideo()
      window.dispatchEvent(new CustomEvent(EVENTO_MUSICA_CARTA, { detail: 'fin' }))
    })
  }

  return { reproducir, detener }
}
