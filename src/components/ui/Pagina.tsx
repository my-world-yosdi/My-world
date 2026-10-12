import { Suspense, useEffect, useRef, type ReactNode } from 'react'
import { motion } from 'motion/react'
import { Cargando } from './Cargando'

/**
 * Envoltorio de cada ruta: fundido de entrada/salida coordinado con AnimatePresence.
 * Solo anima opacidad para no romper los fondos con `position: fixed` de cada escenario.
 */
export function Pagina({ children }: { children: ReactNode }) {
  return (
    <motion.div
      className="pagina"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.6, ease: [0.22, 0.8, 0.26, 1] } }}
      exit={{ opacity: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.6, 1] } }}
    >
      <Suspense fallback={<Cargando />}>{children}</Suspense>
    </motion.div>
  )
}

let primeraVisita = true

/** <main> de cada página. Al navegar, mueve el foco aquí para lectores de pantalla y teclado. */
export function Contenido({ className, children, etiqueta }: { className?: string; children: ReactNode; etiqueta?: string }) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    if (primeraVisita) {
      primeraVisita = false
      return
    }
    ref.current?.focus({ preventScroll: true })
  }, [])
  return (
    <main id="contenido" ref={ref} tabIndex={-1} className={className} aria-label={etiqueta}>
      {children}
    </main>
  )
}
