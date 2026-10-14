import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { cartita, general, paginas } from '../../data/mensajes'
import { marcarVisita } from '../../lib/visitas'
import { useDialogo } from '../../hooks/useDialogo'
import { useMusicaCarta } from '../../hooks/useMusicaCarta'
import { musicaCartas } from '../../data/musica'
import { Contenido } from '../../components/ui/Pagina'
import { BotonVolver } from '../../components/ui/BotonVolver'
import { BotonLazo } from '../../components/ui/BotonLazo'
import { TypewriterOnScroll } from '../../components/ui/TypewriterOnScroll'
import { Personaje } from '../../components/personajes/Personaje'
import { Corazon, LINEA, Mono, RUTA_CORAZON } from '../../components/decor/Adornos'
import { Estallido } from '../../components/decor/Estallido'
import { Particulas } from '../../components/decor/Particulas'
import { EscenaHabitacion } from './EscenaHabitacion'
import './Cartita.css'

const suave = [0.22, 0.8, 0.26, 1] as const

/**
 * cerrado → abriendo (moño, sello, solapa, la carta sube) → leyendo (hoja grande)
 * → guardando (la hoja vuelve al sobre) → cerrado
 */
type Fase = 'cerrado' | 'abriendo' | 'leyendo' | 'guardando'

export default function Cartita() {
  const [fase, setFase] = useState<Fase>('cerrado')
  const [yaLeida, setYaLeida] = useState(false)
  const [disparo, setDisparo] = useState(0)
  const [parrafo, setParrafo] = useState(0)
  const temporizadores = useRef<number[]>([])
  const musica = useMusicaCarta(musicaCartas.cartita)
  const cartaRef = useRef<HTMLElement>(null)

  const abierto = fase !== 'cerrado'
  const cartaArriba = fase === 'abriendo' || fase === 'guardando'

  useEffect(() => {
    marcarVisita('cartita')
    const lista = temporizadores.current
    return () => lista.forEach((t) => window.clearTimeout(t))
  }, [])

  const despues = (ms: number, fn: () => void) => {
    temporizadores.current.push(window.setTimeout(fn, ms))
  }

  const abrir = () => {
    if (fase !== 'cerrado') return
    setFase('abriendo')
    musica.reproducir()
    setParrafo(0)
    despues(1350, () => setDisparo((n) => n + 1))
    despues(2450, () => setFase('leyendo'))
  }

  const guardar = () => {
    if (fase !== 'leyendo') return
    setFase('guardando')
    musica.detener()
    setYaLeida(true)
    despues(900, () => setFase('cerrado'))
  }

  useDialogo(fase === 'leyendo', guardar, cartaRef)

  // Duraciones del sobre según si abre o cierra
  const t = (abrir: object, cerrar: object) => (abierto ? abrir : cerrar)
  const textos = [cartita.saludo, ...cartita.parrafos, cartita.despedida]

  return (
    <Contenido className="cartita" etiqueta={paginas.cartita.titulo}>
      <EscenaHabitacion />
      <BotonVolver />

      <div className="cartita__composicion contenido-escena">
        <header className="cartita__cabecera cabecera">
          <motion.p className="antetitulo cartita__ante" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease: suave }}>
            {cartita.sobreRemitente}
          </motion.p>
          <motion.h1
            className="titulo-display cartita__titulo"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15, ease: suave }}
          >
            {paginas.cartita.titulo}
          </motion.h1>
        </header>

        <motion.div
          className="cartita__mesa-zona"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: suave }}
        >
          <button
            type="button"
            className={`sobre-boton ${abierto ? 'esta-abierto' : ''}`}
            onClick={abrir}
            aria-label={cartita.etiquetaSobre}
            aria-disabled={abierto}
          >
            <div className="sobre">
              <div className="sobre__fondo" />

              {fase !== 'leyendo' && (
                <motion.div
                  className="sobre__carta"
                  layoutId="carta-papel"
                  initial={false}
                  animate={{ y: cartaArriba ? '-62%' : '0%' }}
                  transition={
                    fase === 'abriendo'
                      ? { y: { delay: 1.35, duration: 0.95, ease: suave }, layout: { duration: 0.8, ease: suave } }
                      : { y: { delay: 0.05, duration: 0.7, ease: suave }, layout: { duration: 0.8, ease: suave } }
                  }
                >
                  <span className="sobre__carta-para">{cartita.saludo}</span>
                  <span className="sobre__carta-lineas" />
                </motion.div>
              )}

              <svg className="sobre__bolsillo" viewBox="0 0 300 200" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0 0 L150 106 L0 200 Z" fill="#FBC9DB" />
                <path d="M300 0 L150 106 L300 200 Z" fill="#F7BBD0" />
                <path d="M0 200 L150 104 L300 200 Z" fill="#FCD3E2" />
                <path d="M0 200 L150 104 L300 200" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="5 6" vectorEffect="non-scaling-stroke" opacity=".9" />
                <rect x="1" y="1" width="298" height="198" rx="10" fill="none" stroke={LINEA} strokeWidth="3" vectorEffect="non-scaling-stroke" />
              </svg>
              <span className="sobre__remitente">{cartita.sobreRemitente}</span>

              {/* Solapa con dos caras y sello */}
              <motion.div
                className="sobre__solapa-zona"
                initial={false}
                animate={{ zIndex: abierto ? 1 : 4 }}
                transition={{ zIndex: { delay: abierto ? 1.1 : 0.62, duration: 0 } }}
              >
                <div className="sobre__solapa-anticipo">
                  <motion.div
                    className="sobre__solapa"
                    initial={false}
                    animate={{ rotateX: abierto ? 180 : 0 }}
                    transition={t({ delay: 0.7, duration: 0.85, ease: [0.5, 0, 0.2, 1] }, { delay: 0.55, duration: 0.75, ease: [0.5, 0, 0.2, 1] })}
                  >
                    <svg className="sobre__solapa-cara sobre__solapa-cara--frente" viewBox="0 0 300 116" preserveAspectRatio="none" aria-hidden="true">
                      <path d="M2 2 H298 L150 114 Z" fill="#F8B6CD" stroke={LINEA} strokeWidth="3" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
                      <path d="M30 10 H270 L150 100 Z" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="5 6" vectorEffect="non-scaling-stroke" opacity=".85" />
                    </svg>
                    <svg className="sobre__solapa-cara sobre__solapa-cara--dorso" viewBox="0 0 300 116" preserveAspectRatio="none" aria-hidden="true">
                      <path d="M2 2 H298 L150 114 Z" fill="#FFE6EF" stroke={LINEA} strokeWidth="3" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
                      <path d="M24 8 H276 L150 102 Z" fill="none" stroke="#F7A9C6" strokeWidth="2" strokeDasharray="2 5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                    </svg>
                    <motion.span
                      className="sobre__sello"
                      initial={false}
                      animate={abierto ? { scale: [1, 1.25, 0], opacity: [1, 1, 0] } : { scale: 1, opacity: 1 }}
                      transition={t({ delay: 0.35, duration: 0.5 }, { delay: 1.3, duration: 0.5, ease: suave })}
                    >
                      <svg viewBox="0 0 100 95" aria-hidden="true">
                        <circle cx="50" cy="48" r="46" fill="#D93B5C" stroke={LINEA} strokeWidth="4" />
                        <circle cx="50" cy="48" r="36" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="3 5" opacity=".6" />
                        <path d={RUTA_CORAZON} fill="#F7A9C6" transform="translate(27 26) scale(.46)" />
                      </svg>
                    </motion.span>
                  </motion.div>
                </div>
              </motion.div>

              {/* Cinta y moño */}
              <div className="sobre__cinta" aria-hidden="true">
                <motion.span
                  className="sobre__cinta-mitad sobre__cinta-mitad--izq"
                  initial={false}
                  animate={abierto ? { x: '-40%', opacity: 0 } : { x: '0%', opacity: 1 }}
                  transition={t({ delay: 0.2, duration: 0.6, ease: suave }, { delay: 1.1, duration: 0.6, ease: suave })}
                />
                <motion.span
                  className="sobre__cinta-mitad sobre__cinta-mitad--der"
                  initial={false}
                  animate={abierto ? { x: '40%', opacity: 0 } : { x: '0%', opacity: 1 }}
                  transition={t({ delay: 0.2, duration: 0.6, ease: suave }, { delay: 1.1, duration: 0.6, ease: suave })}
                />
                <div className="sobre__mono">
                  <motion.svg
                    className="sobre__mono-colas"
                    viewBox="0 0 120 100"
                    initial={false}
                    animate={abierto ? { y: 24, opacity: 0, rotate: 8 } : { y: 0, opacity: 1, rotate: 0 }}
                    transition={t({ delay: 0.15, duration: 0.6 }, { delay: 1.25, duration: 0.6, ease: suave })}
                  >
                    <g fill="#E25C7A" stroke={LINEA} strokeWidth="3" strokeLinejoin="round">
                      <path d="M56 50 C 50 64, 40 78, 26 94 L 39 91 L 45 99 C 55 82, 61 64, 61 52 Z" />
                      <path d="M64 50 C 70 64, 80 78, 94 94 L 81 91 L 75 99 C 65 82, 59 64, 59 52 Z" />
                    </g>
                  </motion.svg>
                  <motion.svg
                    className="sobre__mono-lazo sobre__mono-lazo--izq"
                    viewBox="0 0 120 100"
                    initial={false}
                    animate={abierto ? { rotate: -70, scale: 0.4, opacity: 0, x: -16 } : { rotate: 0, scale: 1, opacity: 1, x: 0 }}
                    transition={t({ duration: 0.6, ease: suave }, { delay: 1.35, duration: 0.65, ease: suave })}
                  >
                    <path d="M57 42 C 44 18, 8 8, 6 33 C 4 56, 36 60, 57 50 Z" fill="#E25C7A" stroke={LINEA} strokeWidth="3" strokeLinejoin="round" />
                    <path d="M48 41 C 38 30, 24 25, 15 30" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" opacity=".55" />
                  </motion.svg>
                  <motion.svg
                    className="sobre__mono-lazo sobre__mono-lazo--der"
                    viewBox="0 0 120 100"
                    initial={false}
                    animate={abierto ? { rotate: 70, scale: 0.4, opacity: 0, x: 16 } : { rotate: 0, scale: 1, opacity: 1, x: 0 }}
                    transition={t({ duration: 0.6, ease: suave }, { delay: 1.35, duration: 0.65, ease: suave })}
                  >
                    <path d="M63 42 C 76 18, 112 8, 114 33 C 116 56, 84 60, 63 50 Z" fill="#E25C7A" stroke={LINEA} strokeWidth="3" strokeLinejoin="round" />
                    <path d="M72 41 C 82 30, 96 25, 105 30" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" opacity=".55" />
                  </motion.svg>
                  <motion.svg
                    className="sobre__mono-nudo"
                    viewBox="0 0 120 100"
                    initial={false}
                    animate={abierto ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
                    transition={t({ delay: 0.1, duration: 0.4 }, { delay: 1.45, duration: 0.5, ease: suave })}
                  >
                    <rect x="50" y="36" width="20" height="19" rx="8" fill="#E25C7A" stroke={LINEA} strokeWidth="3" />
                  </motion.svg>
                </div>
              </div>

              <Estallido disparo={disparo} cantidad={18} radio={210} direccion={-90} apertura={220} />
            </div>
          </button>

          <div className="cartita__mesa" aria-hidden="true">
            <span className="cartita__mantel" />
          </div>
          <motion.div
            className="cartita__melody"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.45, ease: suave }}
          >
            <span className="personaje-reactivo"><Personaje id="melody" /></span>
          </motion.div>
        </motion.div>

        <p className="cartita__pista texto-mano" aria-live="polite">
          <Corazon ancho={14} color="#E25C7A" /> {yaLeida ? cartita.pistaReleer : cartita.pistaCerrada}
        </p>
      </div>

      {/* La hoja grande para leer */}
      <AnimatePresence>
        {fase === 'leyendo' && (
          <motion.div
            className="carta-fondo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, pointerEvents: 'none', transition: { duration: 0.45 } }}
            transition={{ duration: 0.5 }}
            onClick={(e) => e.target === e.currentTarget && guardar()}
          >
            <Particulas cantidad={10} semilla={77} tipos={['corazon', 'destello']} className="carta-fondo__particulas" />
            <motion.article
              ref={cartaRef}
              className="carta-papel"
              layoutId="carta-papel"
              role="dialog"
              aria-modal="true"
              aria-labelledby="carta-saludo"
              transition={{ layout: { duration: 0.8, ease: suave } }}
            >
              <motion.div
                className="carta-papel__contenido"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                transition={{ delay: 0.55, duration: 0.6 }}
              >
                <Mono className="carta-papel__mono" ancho={54} />
                <span className="carta-papel__estampilla" aria-hidden="true">
                  <Personaje id="melody" />
                </span>
                <p className="carta-papel__de">{cartita.sobreRemitente}</p>
                {textos.map((texto, i) => (
                  <TypewriterOnScroll
                    key={i}
                    id={i === 0 ? 'carta-saludo' : undefined}
                    className={`carta-papel__texto ${i === 0 ? 'carta-papel__saludo' : ''} ${i === textos.length - 1 ? 'carta-papel__despedida' : ''}`}
                    text={texto}
                    speed={24}
                    delay={i === 0 ? 900 : 250}
                    duracionMaxima={texto.length > 120 ? 2200 : 1500}
                    start={parrafo >= i}
                    onComplete={() => setParrafo((p) => Math.max(p, i + 1))}
                  />
                ))}
                <motion.p
                  className="carta-papel__firma"
                  initial={{ opacity: 0, y: 8 }}
                  animate={parrafo >= textos.length ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                  transition={{ duration: 0.9, ease: suave }}
                >
                  {cartita.firma}
                </motion.p>
                <div className="carta-papel__acciones">
                  <BotonLazo variante="rosa" onClick={guardar} data-foco-inicial>
                    {cartita.guardar}
                  </BotonLazo>
                </div>
                <button type="button" className="carta-papel__cerrar" onClick={guardar} aria-label={general.cerrar}>
                  ×
                </button>
              </motion.div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </Contenido>
  )
}
