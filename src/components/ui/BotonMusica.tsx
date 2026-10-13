import { useEffect, useRef, useState } from 'react'
import { general } from '../../data/mensajes'
import { musica } from '../../data/musica'
import { recurso } from '../../lib/recurso'
import { EVENTO_MUSICA_CARTA } from '../../hooks/useMusicaCarta'

/**
 * Botón opcional de música. Solo aparece si hay un archivo configurado en `src/data/musica.ts`
 * y nunca reproduce nada hasta que ella lo presione.
 */
export function BotonMusica() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [sonando, setSonando] = useState(false)

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = musica.volumen
  }, [])

  // Mientras suena la canción de una carta, la música de fondo se pausa y luego vuelve
  const pausadaPorCarta = useRef(false)
  useEffect(() => {
    const alCambiar = (e: Event) => {
      const audio = audioRef.current
      if (!audio) return
      if ((e as CustomEvent).detail === 'inicio' && !audio.paused) {
        pausadaPorCarta.current = true
        audio.pause()
        setSonando(false)
      } else if ((e as CustomEvent).detail === 'fin' && pausadaPorCarta.current) {
        pausadaPorCarta.current = false
        void audio.play().then(() => setSonando(true)).catch(() => {})
      }
    }
    window.addEventListener(EVENTO_MUSICA_CARTA, alCambiar)
    return () => window.removeEventListener(EVENTO_MUSICA_CARTA, alCambiar)
  }, [])

  if (!musica.archivo) return null

  const alternar = async () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      try {
        await audio.play()
        setSonando(true)
      } catch {
        setSonando(false)
      }
    } else {
      audio.pause()
      setSonando(false)
    }
  }

  return (
    <>
      <audio ref={audioRef} src={recurso(musica.archivo)} loop preload="none" />
      <button
        type="button"
        className={`boton-musica ${sonando ? 'esta-sonando' : ''}`}
        aria-pressed={sonando}
        aria-label={sonando ? general.musica.pausar : general.musica.poner}
        onClick={alternar}
      >
        <svg viewBox="0 0 24 24" width="22" aria-hidden="true">
          <path d="M9 18V6l10-2v12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="6.5" cy="18" r="2.6" fill="currentColor" />
          <circle cx="16.5" cy="16" r="2.6" fill="currentColor" />
        </svg>
        <span className="boton-musica__ondas" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </button>
    </>
  )
}
