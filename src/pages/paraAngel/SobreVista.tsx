import { AnimatePresence, motion } from 'motion/react'
import { cartaParaAngel } from '../../data/mensajes'
import { LINEA, RUTA_CORAZON } from '../../components/decor/Adornos'
import { Estallido } from '../../components/decor/Estallido'
import { Personaje } from '../../components/personajes/Personaje'
import { NombreAnimado } from './NombreAnimado'

const suave = [0.22, 0.8, 0.26, 1] as const

type Props = {
  apodo: string
  /** Al enviarse de verdad, la solapa se cierra, cae el sello y aparece My Melody. */
  cerrado: boolean
  /** Cambia para lanzar los corazoncitos de celebración. */
  disparo: number
}

/** Sobre que muestra en tiempo real para quién es la cartita y de quién viene. */
export function SobreVista({ apodo, cerrado, disparo }: Props) {
  return (
    <div className={`cpa-sobre ${cerrado ? 'esta-cerrado' : ''}`}>
      <div className="cpa-sobre__cuerpo">
        {/* Solapa: abierta hacia arriba mientras ella escribe; se cierra al enviar */}
        <motion.span
          className="cpa-sobre__solapa"
          initial={false}
          animate={{ rotateX: cerrado ? 0 : 180 }}
          transition={{ duration: 0.85, ease: [0.5, 0, 0.2, 1], delay: cerrado ? 0.35 : 0 }}
          aria-hidden="true"
        >
          <svg viewBox="0 0 100 52" preserveAspectRatio="none">
            <path d="M1 1 H99 L50 50 Z" fill="#F9C9DA" stroke={LINEA} strokeWidth="2.2" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
          </svg>
        </motion.span>

        <svg className="cpa-sobre__pliegues" viewBox="0 0 100 64" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 64 L50 30 L100 64" fill="none" stroke="#fff" strokeWidth="1.6" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
        </svg>

        <span className="cpa-sobre__estampilla" aria-hidden="true">
          <Personaje id="melody" />
        </span>

        <div className="cpa-sobre__etiqueta texto-mano">
          <p className="cpa-sobre__para">
            {cartaParaAngel.sobre.para} <NombreAnimado texto={apodo} /> ♡
          </p>
          <p className="cpa-sobre__de">{cartaParaAngel.sobre.de}</p>
        </div>

        {/* Sello de corazón: cae cuando la solapa termina de cerrarse */}
        <AnimatePresence>
          {cerrado && (
            <motion.svg
              key="sello"
              className="cpa-sobre__sello"
              viewBox="0 0 100 95"
              aria-hidden="true"
              initial={{ scale: 2.4, opacity: 0, rotate: -20 }}
              animate={{ scale: 1, opacity: 1, rotate: -8 }}
              transition={{ delay: 1.05, duration: 0.5, ease: [0.3, 1.4, 0.5, 1] }}
            >
              <path d={RUTA_CORAZON} fill="#E25C7A" stroke={LINEA} strokeWidth="6" strokeLinejoin="round" />
            </motion.svg>
          )}
        </AnimatePresence>
        <div className="cpa-sobre__estallido">
          <Estallido disparo={disparo} cantidad={14} radio={160} direccion={-90} apertura={200} tipos={['corazon', 'corazon', 'destello', 'flor']} />
        </div>
      </div>

      {/* My Melody se asoma a acompañar el sobre cuando la cartita llegó */}
      <AnimatePresence>
        {cerrado && (
          <motion.div
            key="melody"
            className="cpa-sobre__melody"
            initial={{ opacity: 0, y: 40, rotate: 8, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, rotate: -4, scale: 1 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 1.35, duration: 0.9, ease: suave }}
          >
            <Personaje id="melody" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
