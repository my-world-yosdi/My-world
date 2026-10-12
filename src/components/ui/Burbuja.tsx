import { AnimatePresence, motion } from 'motion/react'

type Props = {
  visible: boolean
  texto: string
  /** Hacia dónde apunta la colita. */
  lado?: 'abajo' | 'izquierda' | 'derecha'
  className?: string
}

/** Globito de diálogo para que los personajes digan algo. */
export function Burbuja({ visible, texto, lado = 'abajo', className }: Props) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.span
          role="status"
          className={`burbuja burbuja--${lado} ${className ?? ''}`}
          initial={{ opacity: 0, y: 8, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 4, scale: 0.96, transition: { duration: 0.25 } }}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        >
          {texto}
        </motion.span>
      )}
    </AnimatePresence>
  )
}
