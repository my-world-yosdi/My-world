import type { ReactNode } from 'react'
import { motion, useTransform } from 'motion/react'
import type { Parallax } from '../../hooks/useParallax'

type Props = {
  parallax: Parallax
  /** Píxeles que se desplaza la capa en cada eje. Negativo = se mueve al revés (fondo). */
  profundidad: number
  className?: string
  children?: ReactNode
}

export function CapaParallax({ parallax, profundidad, className, children }: Props) {
  const x = useTransform(parallax.x, (v) => v * profundidad)
  const y = useTransform(parallax.y, (v) => v * profundidad * 0.6)
  return (
    <motion.div className={`capa-parallax ${className ?? ''}`} style={{ x, y }} aria-hidden="true">
      {children}
    </motion.div>
  )
}
