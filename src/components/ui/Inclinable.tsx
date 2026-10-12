import { useRef, type ReactNode, type PointerEvent } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionStyle } from 'motion/react'

type Props = {
  children: ReactNode
  className?: string
  /** Grados máximos de inclinación. Se mantiene bajo a propósito: el efecto debe sentirse, no verse. */
  grados?: number
}

const resorte = { stiffness: 150, damping: 20, mass: 0.6 }

/**
 * Inclina su contenido en 3D siguiendo el cursor, con un brillo suave que acompaña.
 * Solo con mouse/trackpad; en pantallas táctiles queda quieto.
 */
export function Inclinable({ children, className, grados = 6 }: Props) {
  const reducir = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const sx = useSpring(px, resorte)
  const sy = useSpring(py, resorte)
  const rotateY = useTransform(sx, [0, 1], [-grados, grados])
  const rotateX = useTransform(sy, [0, 1], [grados, -grados])
  const brilloX = useTransform(sx, (v) => `${v * 100}%`)
  const brilloY = useTransform(sy, (v) => `${v * 100}%`)

  const mover = (e: PointerEvent<HTMLDivElement>) => {
    if (reducir || e.pointerType !== 'mouse' || !ref.current) return
    const caja = ref.current.getBoundingClientRect()
    px.set((e.clientX - caja.left) / caja.width)
    py.set((e.clientY - caja.top) / caja.height)
  }
  const soltar = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      className={`inclinable ${className ?? ''}`}
      style={{ rotateX, rotateY, transformPerspective: 900, '--brillo-x': brilloX, '--brillo-y': brilloY } as MotionStyle}
      onPointerMove={mover}
      onPointerLeave={soltar}
    >
      {children}
    </motion.div>
  )
}
