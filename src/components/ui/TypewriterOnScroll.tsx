import { useEffect, useRef, useState, type ElementType } from 'react'
import { motion, useReducedMotion } from 'motion/react'

type Props = {
  text: string
  /** Milisegundos por letra (velocidad base). */
  speed?: number
  /** Espera (ms) antes de empezar a escribir, una vez visible. */
  delay?: number
  className?: string
  /** Si es true (por defecto), se escribe una sola vez aunque vuelva a entrar en pantalla. */
  once?: boolean
  /** Etiqueta HTML que se renderiza. */
  as?: ElementType
  /** Duración máxima: los textos largos aceleran para no hacerse eternos. */
  duracionMaxima?: number
  /** Se llama cuando terminó de escribirse. */
  onComplete?: () => void
  /** Permite encadenar textos: no empieza hasta que sea true (además de estar visible). */
  start?: boolean
  id?: string
}

/**
 * Escribe el texto letra por letra cuando ~30% del elemento entra en pantalla.
 * - El texto completo siempre ocupa su lugar (la parte pendiente es invisible), así la altura no salta.
 * - Los lectores de pantalla leen el texto completo desde el inicio.
 * - Con "reducir movimiento", el texto aparece directo.
 */
export function TypewriterOnScroll({
  text,
  speed = 32,
  delay = 0,
  className,
  once = true,
  as: Etiqueta = 'p',
  duracionMaxima = 2600,
  onComplete,
  id,
  start = true,
}: Props) {
  const reducir = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const [escritas, setEscritas] = useState(0)
  const terminadoRef = useRef(onComplete)
  useEffect(() => {
    terminadoRef.current = onComplete
  })

  // 1. Detectar cuándo entra en pantalla
  useEffect(() => {
    const nodo = ref.current
    if (!nodo) return
    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setVisible(true)
          if (once) observador.disconnect()
        } else if (!once) {
          setVisible(false)
          setEscritas(0)
        }
      },
      { threshold: 0.3 },
    )
    observador.observe(nodo)
    return () => observador.disconnect()
  }, [once])

  // 2. Escribir
  const total = text.length
  const completo = reducir || escritas >= total
  useEffect(() => {
    if (reducir) {
      terminadoRef.current?.()
      return
    }
    if (!visible || !start) return
    // Para textos largos se escriben varias letras por paso y el intervalo se mantiene natural.
    const pasos = Math.max(1, Math.min(total, Math.floor(duracionMaxima / speed)))
    const porPaso = Math.ceil(total / pasos)
    let actual = 0
    let intervalo: number | undefined
    const inicio = window.setTimeout(() => {
      intervalo = window.setInterval(() => {
        actual = Math.min(total, actual + porPaso)
        setEscritas(actual)
        if (actual >= total) {
          window.clearInterval(intervalo)
          terminadoRef.current?.()
        }
      }, speed)
    }, delay)
    return () => {
      window.clearTimeout(inicio)
      window.clearInterval(intervalo)
    }
  }, [visible, start, reducir, total, speed, delay, duracionMaxima, once])

  const mostradas = reducir ? total : escritas

  return (
    <Etiqueta ref={ref} id={id} className={`maquina ${completo ? 'esta-completa' : ''} ${className ?? ''}`}>
      <span className="solo-lector">{text}</span>
      <motion.span
        aria-hidden="true"
        className="maquina__visual"
        initial={{ opacity: reducir ? 1 : 0 }}
        animate={{ opacity: (visible && start) || reducir ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {text.slice(0, mostradas)}
        <span className="maquina__cursor" />
        <span className="maquina__pendiente">{text.slice(mostradas)}</span>
      </motion.span>
    </Etiqueta>
  )
}
