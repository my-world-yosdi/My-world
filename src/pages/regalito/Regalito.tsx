import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { paginas, regalito } from '../../data/mensajes'
import { marcarVisita } from '../../lib/visitas'
import { Contenido } from '../../components/ui/Pagina'
import { BotonVolver } from '../../components/ui/BotonVolver'
import { BotonLazo } from '../../components/ui/BotonLazo'
import { Burbuja } from '../../components/ui/Burbuja'
import { TypewriterOnScroll } from '../../components/ui/TypewriterOnScroll'
import { Personaje } from '../../components/personajes/Personaje'
import { Corazon, LINEA } from '../../components/decor/Adornos'
import { Estallido } from '../../components/decor/Estallido'
import { EscenaTeatro } from './EscenaTeatro'
import './Regalito.css'

const suave = [0.22, 0.8, 0.26, 1] as const
type Fase = 'cerrado' | 'sacudiendo' | 'abierto'

export default function Regalito() {
  const [fase, setFase] = useState<Fase>('cerrado')
  const [disparo, setDisparo] = useState(0)
  const [yaAbierto, setYaAbierto] = useState(false)
  const temporizadores = useRef<number[]>([])
  const cerrarRef = useRef<HTMLButtonElement>(null)
  const abierto = fase === 'abierto'

  useEffect(() => {
    marcarVisita('regalito')
    const lista = temporizadores.current
    return () => lista.forEach((t) => window.clearTimeout(t))
  }, [])

  const despues = (ms: number, fn: () => void) => {
    temporizadores.current.push(window.setTimeout(fn, ms))
  }

  const abrir = () => {
    if (fase !== 'cerrado') return
    setFase('sacudiendo')
    setYaAbierto(true)
    despues(480, () => setFase('abierto'))
    despues(480 + 1150, () => setDisparo((n) => n + 1))
    despues(480 + 2400, () => cerrarRef.current?.focus({ preventScroll: true }))
  }
  const envolver = () => setFase('cerrado')

  // Tiempos distintos al abrir y al envolver, para que todo vaya en orden
  const t = (alAbrir: object, alCerrar: object) => (abierto ? alAbrir : alCerrar)

  return (
    <Contenido className="regalito" etiqueta={paginas.regalito.titulo}>
      <EscenaTeatro />
      <BotonVolver />

      <div className="regalito__composicion contenido-escena">
        <header className="regalito__cabecera cabecera">
          <motion.p className="antetitulo" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: suave }}>
            {regalito.antetitulo}
          </motion.p>
          <motion.h1 className="titulo-display regalito__titulo" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.32, ease: suave }}>
            {paginas.regalito.titulo}
          </motion.h1>
        </header>

        <div className="regalito__escenario">
          <motion.div
            className="regalito__zona"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.45, ease: suave }}
          >
            <button
              type="button"
              className={`regalo-boton regalo-boton--${fase}`}
              onClick={abrir}
              aria-label={regalito.etiquetaAbrir}
              aria-disabled={fase !== 'cerrado'}
            >
              <div className="regalo">
                {/* My Melody escondida adentro */}
                <motion.div
                  className="regalo__melody"
                  initial={false}
                  animate={abierto ? { y: '-62%', opacity: 1, scale: 1 } : { y: '18%', opacity: 0, scale: 0.85 }}
                  transition={t({ delay: 1.15, duration: 1.1, ease: suave }, { delay: 0.05, duration: 0.7, ease: suave })}
                >
                  <Personaje id="melody" />
                  <Burbuja visible={abierto} texto={regalito.melodyDice} className="regalo__burbuja" />
                </motion.div>

                {/* Caja */}
                <div className="regalo__caja">
                  <span className="regalo__brillo" aria-hidden="true" />
                  <motion.span
                    className="regalo__cinta-v"
                    initial={false}
                    animate={{ scaleY: abierto ? 0 : 1 }}
                    transition={t({ delay: 0.4, duration: 0.5, ease: suave }, { delay: 1.15, duration: 0.5, ease: suave })}
                  />
                  <span className="regalo__etiqueta" aria-hidden="true">
                    <Corazon ancho={12} color="#E25C7A" /> {regalito.etiquetaTarjeta}
                  </span>
                </div>

                {/* Tapa con moño */}
                <motion.div
                  className="regalo__tapa"
                  initial={false}
                  animate={
                    abierto
                      ? { x: ['0%', '-40%', '-84%'], y: ['0%', '-170%', '262%'], rotate: [0, -22, -9] }
                      : yaAbierto
                        ? { x: ['-84%', '-40%', '0%'], y: ['262%', '-170%', '0%'], rotate: [-9, -22, 0] }
                        : { x: '0%', y: '0%', rotate: 0 }
                  }
                  transition={t(
                    { delay: 0.8, duration: 1.25, times: [0, 0.45, 1], ease: ['easeOut', [0.5, 0, 0.75, 0.9]] },
                    { delay: 0.55, duration: 1, times: [0, 0.55, 1], ease: [[0.3, 0, 0.5, 1], 'easeOut'] },
                  )}
                >
                  <div className="regalo__tapa-anticipo">
                    <div className="regalo__tapa-cuerpo">
                      <motion.span
                        className="regalo__tapa-cinta"
                        initial={false}
                        animate={{ scaleY: abierto ? 0 : 1 }}
                        transition={t({ delay: 0.4, duration: 0.45 }, { delay: 1.1, duration: 0.45 })}
                      />
                    </div>
                    <div className="regalo__mono">
                      <motion.svg
                        className="regalo__mono-parte"
                        viewBox="0 0 120 100"
                        initial={false}
                        animate={abierto ? { y: 20, opacity: 0, rotate: 10 } : { y: 0, opacity: 1, rotate: 0 }}
                        transition={t({ delay: 0.15, duration: 0.55 }, { delay: 1.4, duration: 0.6, ease: suave })}
                      >
                        <g fill="#E25C7A" stroke={LINEA} strokeWidth="3" strokeLinejoin="round">
                          <path d="M56 50 C 50 64, 40 78, 26 94 L 39 91 L 45 99 C 55 82, 61 64, 61 52 Z" />
                          <path d="M64 50 C 70 64, 80 78, 94 94 L 81 91 L 75 99 C 65 82, 59 64, 59 52 Z" />
                        </g>
                      </motion.svg>
                      <motion.svg
                        className="regalo__mono-parte"
                        viewBox="0 0 120 100"
                        initial={false}
                        animate={abierto ? { rotate: -80, scale: 0.3, opacity: 0, x: -20, y: -10 } : { rotate: 0, scale: 1, opacity: 1, x: 0, y: 0 }}
                        transition={t({ duration: 0.6, ease: suave }, { delay: 1.5, duration: 0.7, ease: suave })}
                      >
                        <path d="M57 42 C 44 18, 8 8, 6 33 C 4 56, 36 60, 57 50 Z" fill="#E25C7A" stroke={LINEA} strokeWidth="3" strokeLinejoin="round" />
                        <path d="M48 41 C 38 30, 24 25, 15 30" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" opacity=".55" />
                      </motion.svg>
                      <motion.svg
                        className="regalo__mono-parte"
                        viewBox="0 0 120 100"
                        initial={false}
                        animate={abierto ? { rotate: 80, scale: 0.3, opacity: 0, x: 20, y: -10 } : { rotate: 0, scale: 1, opacity: 1, x: 0, y: 0 }}
                        transition={t({ duration: 0.6, ease: suave }, { delay: 1.5, duration: 0.7, ease: suave })}
                      >
                        <path d="M63 42 C 76 18, 112 8, 114 33 C 116 56, 84 60, 63 50 Z" fill="#E25C7A" stroke={LINEA} strokeWidth="3" strokeLinejoin="round" />
                        <path d="M72 41 C 82 30, 96 25, 105 30" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" opacity=".55" />
                      </motion.svg>
                      <motion.svg
                        className="regalo__mono-parte"
                        viewBox="0 0 120 100"
                        initial={false}
                        animate={abierto ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
                        transition={t({ delay: 0.1, duration: 0.4 }, { delay: 1.6, duration: 0.5, ease: suave })}
                      >
                        <rect x="50" y="36" width="20" height="19" rx="8" fill="#E25C7A" stroke={LINEA} strokeWidth="3" />
                      </motion.svg>
                    </div>
                  </div>
                </motion.div>

                <Estallido disparo={disparo} cantidad={22} radio={230} direccion={-90} apertura={200} tipos={['corazon', 'estrella', 'flor', 'destello']} className="regalo__estallido" />
              </div>
            </button>

            <span className="regalito__sombra" aria-hidden="true" />
          </motion.div>

          {/* Mensaje sorpresa */}
          <AnimatePresence>
            {abierto && (
              <motion.div
                className="regalito__tarjeta"
                role="status"
                initial={{ opacity: 0, y: 24, rotate: 4, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, rotate: 1.5, scale: 1 }}
                exit={{ opacity: 0, y: 12, transition: { duration: 0.3 } }}
                transition={{ delay: 1.9, duration: 0.8, ease: suave }}
              >
                <span className="regalito__tarjeta-cinta" aria-hidden="true" />
                <TypewriterOnScroll className="regalito__mensaje texto-mano" text={regalito.mensaje} speed={30} delay={2300} />
                <p className="regalito__firma">{regalito.firma}</p>
                <BotonLazo ref={cerrarRef} variante="rosa" onClick={envolver} className="regalito__envolver">
                  {regalito.cerrar}
                </BotonLazo>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="regalito__pista texto-mano" aria-live="polite">
          <Corazon ancho={14} color="#E25C7A" /> {abierto ? regalito.pistaAbierto : regalito.pista}
        </p>
      </div>
    </Contenido>
  )
}
