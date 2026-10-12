import { useEffect, useRef, useState } from 'react'
import { general } from '../../data/mensajes'
import { musica } from '../../data/musica'

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
      <audio ref={audioRef} src={musica.archivo} loop preload="none" />
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
