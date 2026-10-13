import { useEffect } from 'react'
import { useMotionValue, useReducedMotion, useSpring, type MotionValue } from 'motion/react'

export type Parallax = { x: MotionValue<number>; y: MotionValue<number> }

/**
 * Posición suavizada del cursor en el rango [-1, 1].
 * Solo se activa con mouse/trackpad y si no se pidió reducir el movimiento.
 */
export function useParallax(): Parallax {
  const reducir = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 40, damping: 18, mass: 0.8 })
  const sy = useSpring(y, { stiffness: 40, damping: 18, mass: 0.8 })

  useEffect(() => {
    if (reducir || !window.matchMedia('(pointer: fine)').matches) return
    const mover = (e: PointerEvent) => {
      x.set((e.clientX / window.innerWidth) * 2 - 1)
      y.set((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', mover, { passive: true })
    return () => window.removeEventListener('pointermove', mover)
  }, [reducir, x, y])

  return { x: sx, y: sy }
}

