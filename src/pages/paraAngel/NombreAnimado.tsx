import { useEffect, useState } from 'react'
import { useAnimate, useReducedMotion } from 'motion/react'

const suave = [0.22, 0.8, 0.26, 1] as const

/**
 * Apodo que se actualiza en vivo mientras ella escribe y, cuando hace una pausa,
 * se "asienta" con una transición delicada (sin animar cada letra).
 */
export function NombreAnimado({ texto, className }: { texto: string; className?: string }) {
  const reducir = useReducedMotion()
  const [alcance, animar] = useAnimate<HTMLSpanElement>()
  const [asentado, setAsentado] = useState(texto)

  useEffect(() => {
    const t = window.setTimeout(() => setAsentado(texto), 260)
    return () => window.clearTimeout(t)
  }, [texto])

  useEffect(() => {
    if (reducir || !alcance.current) return
    void animar(alcance.current, { opacity: [0.35, 1], y: [5, 0], filter: ['blur(3px)', 'blur(0px)'] }, { duration: 0.5, ease: suave })
  }, [asentado, reducir, alcance, animar])

  return (
    <span ref={alcance} className={`nombre-animado ${className ?? ''}`}>
      {texto}
    </span>
  )
}
