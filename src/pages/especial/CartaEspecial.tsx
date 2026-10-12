import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Link } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import { cartaEspecial, general, paginas } from '../../data/mensajes'
import { rutas } from '../../rutas'
import { marcarVisita } from '../../lib/visitas'
import { useDialogo } from '../../hooks/useDialogo'
import { Contenido } from '../../components/ui/Pagina'
import { BotonVolver } from '../../components/ui/BotonVolver'
import { BotonLazo } from '../../components/ui/BotonLazo'
import { TypewriterOnScroll } from '../../components/ui/TypewriterOnScroll'
import { Personaje } from '../../components/personajes/Personaje'
import { Corazon, LINEA, Mono, RUTA_CORAZON } from '../../components/decor/Adornos'
import { Estallido } from '../../components/decor/Estallido'
import { EscenaRincon } from './EscenaRincon'
import './CartaEspecial.css'

const suave = [0.22, 0.8, 0.26, 1] as const

/**
 * cerrado → abriendo (moño, cintas, solapa, la carta sube) → leyendo (la carta se despliega)
 * → guardando (vuelve al sobre) → cerrado
 */
type Fase = 'cerrado' | 'abriendo' | 'leyendo' | 'guardando'

/** Ritmo propio de cada párrafo: ms por paso y duración máxima. */
function ritmo(texto: string, i: number, especial: boolean) {
  if (especial) return { speed: 34, duracionMaxima: 5200, delay: 650 }
  const base = [30, 24, 24, 0, 28, 30][i] ?? 26
  return { speed: base, duracionMaxima: Math.min(3600, Math.max(1600, texto.length * 15)), delay: i === 0 ? 900 : 380 }
}

/** Corazoncitos que aparecen alrededor del papel en el párrafo especial. */
const corazonesEspeciales = [
  { x: 3, y: 18, t: 22, d: 0 }, { x: 7, y: 46, t: 16, d: 0.5 }, { x: 2, y: 72, t: 26, d: 0.9 },
  { x: 95, y: 22, t: 18, d: 0.3 }, { x: 91, y: 50, t: 26, d: 0.7 }, { x: 96, y: 78, t: 16, d: 1.1 },
  { x: 14, y: 90, t: 14, d: 1.4 }, { x: 84, y: 8, t: 14, d: 1.6 },
]

function Lazo({ lado }: { lado: 'izq' | 'der' }) {
  const d =
    lado === 'izq'
      ? 'M57 42 C 44 18, 8 8, 6 33 C 4 56, 36 60, 57 50 Z'
      : 'M63 42 C 76 18, 112 8, 114 33 C 116 56, 84 60, 63 50 Z'
  const brillo = lado === 'izq' ? 'M48 41 C 38 30, 24 25, 15 30' : 'M72 41 C 82 30, 96 25, 105 30'
  return (
    <>
      <path d={d} fill="#F28AAE" stroke={LINEA} strokeWidth="3" strokeLinejoin="round" />
      <path d={brillo} fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" opacity=".6" />
    </>
  )
}

export default function CartaEspecial() {
  const [fase, setFase] = useState<Fase>('cerrado')
  const [yaLeida, setYaLeida] = useState(false)
  const [parrafo, setParrafo] = useState(0)
  const [momento, setMomento] = useState(false)
  const [disparo, setDisparo] = useState(0)
  const temporizadores = useRef<number[]>([])
  const lecturaRef = useRef<HTMLDivElement>(null)

  const abierto = fase !== 'cerrado'
  const cartaArriba = fase === 'abriendo' || fase === 'leyendo'
  const textos = [...cartaEspecial.parrafos, cartaEspecial.despedida]
  const terminada = parrafo >= textos.length

  useEffect(() => {
    marcarVisita('especial')
    const lista = temporizadores.current
    return () => lista.forEach((t) => window.clearTimeout(t))
  }, [])

  const despues = (ms: number, fn: () => void) => {
    temporizadores.current.push(window.setTimeout(fn, ms))
  }

  const abrir = () => {
    if (fase !== 'cerrado') return
    setFase('abriendo')
    setParrafo(0)
    setMomento(false)
    despues(1500, () => setDisparo((n) => n + 1))
    despues(2500, () => setFase('leyendo'))
  }

  const guardar = () => {
    if (fase !== 'leyendo') return
    setFase('guardando')
    setYaLeida(true)
    despues(1100, () => setFase('cerrado'))
  }

  useDialogo(fase === 'leyendo', guardar, lecturaRef)

  // Tiempos distintos al abrir y al guardar, para que todo vaya en orden
  const t = (alAbrir: object, alCerrar: object) => (abierto ? alAbrir : alCerrar)

  return (
    <Contenido className="cesp" etiqueta={paginas.especial.titulo}>
      <EscenaRincon />
      <BotonVolver />

      <div className="cesp__composicion contenido-escena">
        <header className="cesp__cabecera cabecera">
          <motion.p className="antetitulo" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: suave }}>
            {cartaEspecial.antetitulo}
          </motion.p>
          <motion.h1 className="titulo-display cesp__titulo" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.32, ease: suave }}>
            {paginas.especial.titulo}
          </motion.h1>
        </header>

        <motion.div
          className="cesp__mesa"
          initial={{ opacity: 0, y: 26, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.45, ease: suave }}
        >
          <span className="cesp__blonda" aria-hidden="true" />

          <button
            type="button"
            className={`cesp-sobre-boton ${abierto ? 'esta-abierto' : ''}`}
            onClick={abrir}
            aria-label={cartaEspecial.abrir}
            aria-disabled={abierto}
          >
            <div className="cesp-sobre">
              <div className="cesp-sobre__forro" />

              {/* La carta doblada adentro */}
              <motion.div
                className="cesp-sobre__carta"
                initial={false}
                animate={{ y: cartaArriba ? '-58%' : '0%', opacity: fase === 'leyendo' ? 0 : 1 }}
                transition={
                  fase === 'abriendo'
                    ? { y: { delay: 1.45, duration: 1, ease: suave }, opacity: { duration: 0.2 } }
                    : fase === 'leyendo'
                      ? { opacity: { duration: 0.4 } }
                      : { y: { delay: 0.45, duration: 0.6, ease: suave }, opacity: { duration: 0.3 } }
                }
              >
                <span className="cesp-sobre__carta-para">{cartaEspecial.etiquetaSobre}</span>
                <Corazon ancho={16} color="#E25C7A" />
              </motion.div>

              <svg className="cesp-sobre__bolsillo" viewBox="0 0 300 206" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0 0 L150 112 L0 206 Z" fill="#FFF3EA" />
                <path d="M300 0 L150 112 L300 206 Z" fill="#FDEBE1" />
                <path d="M0 206 L150 100 L300 206 Z" fill="#FFF8F2" />
                <path d="M6 200 L150 106 L294 200" fill="none" stroke="#F2B9CB" strokeWidth="1.6" strokeDasharray="2 5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                <rect x="1" y="1" width="298" height="204" rx="9" fill="none" stroke={LINEA} strokeWidth="3" vectorEffect="non-scaling-stroke" />
              </svg>

              {/* Solapa con encaje en el borde */}
              <motion.div
                className="cesp-sobre__solapa-zona"
                initial={false}
                animate={{ zIndex: abierto ? 1 : 4 }}
                transition={{ zIndex: { delay: abierto ? 1.2 : 0.55, duration: 0 } }}
              >
                <div className="cesp-sobre__anticipo">
                  <motion.div
                    className="cesp-sobre__solapa"
                    initial={false}
                    animate={{ rotateX: abierto ? 180 : 0 }}
                    transition={t({ delay: 0.75, duration: 0.9, ease: [0.5, 0, 0.2, 1] }, { delay: 0.45, duration: 0.8, ease: [0.5, 0, 0.2, 1] })}
                  >
                    <svg className="cesp-sobre__cara cesp-sobre__cara--frente" viewBox="0 0 300 120" preserveAspectRatio="none" aria-hidden="true">
                      <path d="M2 2 H298 L150 116 Z" fill="#FFF5EE" stroke={LINEA} strokeWidth="3" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
                      <path d="M22 8 H278 L150 104 Z" fill="none" stroke="#F7A9C6" strokeWidth="1.6" strokeDasharray="5 6" vectorEffect="non-scaling-stroke" />
                    </svg>
                    <svg className="cesp-sobre__cara cesp-sobre__cara--dorso" viewBox="0 0 300 120" preserveAspectRatio="none" aria-hidden="true">
                      <path d="M2 2 H298 L150 116 Z" fill="#FBD3E1" stroke={LINEA} strokeWidth="3" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
                    </svg>
                    <span className="cesp-sobre__encaje" aria-hidden="true" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Cintas cruzadas */}
              <div className="cesp-sobre__cintas" aria-hidden="true">
                <motion.span
                  className="cesp-sobre__cinta cesp-sobre__cinta--izq"
                  initial={false}
                  animate={abierto ? { x: '-30%', opacity: 0 } : { x: '0%', opacity: 1 }}
                  transition={t({ delay: 0.3, duration: 0.6, ease: suave }, { delay: 1.05, duration: 0.6, ease: suave })}
                />
                <motion.span
                  className="cesp-sobre__cinta cesp-sobre__cinta--der"
                  initial={false}
                  animate={abierto ? { x: '30%', opacity: 0 } : { x: '0%', opacity: 1 }}
                  transition={t({ delay: 0.3, duration: 0.6, ease: suave }, { delay: 1.05, duration: 0.6, ease: suave })}
                />
                <motion.span
                  className="cesp-sobre__cinta cesp-sobre__cinta--arriba"
                  initial={false}
                  animate={abierto ? { y: '-30%', opacity: 0 } : { y: '0%', opacity: 1 }}
                  transition={t({ delay: 0.35, duration: 0.6, ease: suave }, { delay: 1, duration: 0.6, ease: suave })}
                />
                <motion.span
                  className="cesp-sobre__cinta cesp-sobre__cinta--abajo"
                  initial={false}
                  animate={abierto ? { y: '30%', opacity: 0 } : { y: '0%', opacity: 1 }}
                  transition={t({ delay: 0.35, duration: 0.6, ease: suave }, { delay: 1, duration: 0.6, ease: suave })}
                />
              </div>

              {/* Moño con dije de corazón */}
              <div className="cesp-sobre__mono" aria-hidden="true">
                <motion.svg
                  className="cesp-sobre__mono-parte"
                  viewBox="0 0 120 100"
                  initial={false}
                  animate={abierto ? { y: 22, opacity: 0, rotate: 8 } : { y: 0, opacity: 1, rotate: 0 }}
                  transition={t({ delay: 0.15, duration: 0.55 }, { delay: 1.3, duration: 0.6, ease: suave })}
                >
                  <g fill="#F28AAE" stroke={LINEA} strokeWidth="3" strokeLinejoin="round">
                    <path d="M56 50 C 50 64, 40 78, 26 94 L 39 91 L 45 99 C 55 82, 61 64, 61 52 Z" />
                    <path d="M64 50 C 70 64, 80 78, 94 94 L 81 91 L 75 99 C 65 82, 59 64, 59 52 Z" />
                  </g>
                </motion.svg>
                <motion.svg
                  className="cesp-sobre__mono-parte"
                  viewBox="0 0 120 100"
                  initial={false}
                  animate={abierto ? { rotate: -75, scale: 0.35, opacity: 0, x: -18, y: -8 } : { rotate: 0, scale: 1, opacity: 1, x: 0, y: 0 }}
                  transition={t({ duration: 0.6, ease: suave }, { delay: 1.4, duration: 0.7, ease: suave })}
                >
                  <Lazo lado="izq" />
                </motion.svg>
                <motion.svg
                  className="cesp-sobre__mono-parte"
                  viewBox="0 0 120 100"
                  initial={false}
                  animate={abierto ? { rotate: 75, scale: 0.35, opacity: 0, x: 18, y: -8 } : { rotate: 0, scale: 1, opacity: 1, x: 0, y: 0 }}
                  transition={t({ duration: 0.6, ease: suave }, { delay: 1.4, duration: 0.7, ease: suave })}
                >
                  <Lazo lado="der" />
                </motion.svg>
                <motion.svg
                  className="cesp-sobre__mono-parte"
                  viewBox="0 0 120 100"
                  initial={false}
                  animate={abierto ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
                  transition={t({ delay: 0.1, duration: 0.4 }, { delay: 1.5, duration: 0.5, ease: suave })}
                >
                  <rect x="50" y="36" width="20" height="19" rx="8" fill="#F28AAE" stroke={LINEA} strokeWidth="3" />
                </motion.svg>
                <motion.span
                  className="cesp-sobre__dije"
                  initial={false}
                  animate={abierto ? { y: 30, opacity: 0 } : { y: 0, opacity: 1 }}
                  transition={t({ delay: 0.05, duration: 0.5 }, { delay: 1.55, duration: 0.6, ease: suave })}
                >
                  <span className="cesp-sobre__dije-hilo" />
                  <svg className="cesp-sobre__dije-corazon" viewBox="0 0 100 95">
                    <path d={RUTA_CORAZON} fill="#E25C7A" stroke="#F3CF7A" strokeWidth="9" strokeLinejoin="round" />
                    <path d="M24 28 C 25 20, 31 15, 38 15" fill="none" stroke="#fff" strokeWidth="9" strokeLinecap="round" opacity=".7" />
                  </svg>
                </motion.span>
              </div>

              {/* Etiqueta */}
              <motion.span
                className="cesp-sobre__etiqueta"
                aria-hidden="true"
                initial={false}
                animate={abierto ? { y: 40, rotate: 24, opacity: 0 } : { y: 0, rotate: 0, opacity: 1 }}
                transition={t({ delay: 0.2, duration: 0.7, ease: suave }, { delay: 1.6, duration: 0.7, ease: suave })}
              >
                <span className="cesp-sobre__etiqueta-hilo" />
                <span className="cesp-sobre__etiqueta-papel">{cartaEspecial.etiquetaSobre}</span>
              </motion.span>

              <Estallido disparo={disparo} cantidad={18} radio={200} direccion={-90} apertura={220} tipos={['corazon', 'destello', 'petalo']} />
            </div>
          </button>

          <motion.div
            className="cesp__melody"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: suave }}
          >
            <span className="personaje-reactivo"><Personaje id="melody" /></span>
          </motion.div>
        </motion.div>

        <p className="cesp__pista texto-mano" aria-live="polite">
          <Corazon ancho={14} color="#E25C7A" /> {yaLeida ? cartaEspecial.pistaReleer : cartaEspecial.pistaCerrada}
        </p>
      </div>

      {/* La carta desplegada para leer */}
      <AnimatePresence>
        {fase === 'leyendo' && (
          <motion.div
            ref={lecturaRef}
            className={`cesp-lectura ${momento ? 'es-calida' : ''}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cesp-titulo-carta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, pointerEvents: 'none', transition: { duration: 0.5, delay: 0.25 } }}
            transition={{ duration: 0.5 }}
            onClick={(e) => e.target === e.currentTarget && guardar()}
          >
            {/* corazoncitos del momento especial */}
            <div className="cesp-lectura__corazones" aria-hidden="true">
              <AnimatePresence>
                {momento &&
                  corazonesEspeciales.map((c, i) => (
                    <motion.span
                      key={i}
                      className="cesp-lectura__corazon"
                      style={{ left: `${c.x}%`, top: `${c.y}%`, width: c.t } as CSSProperties}
                      initial={{ opacity: 0, scale: 0.4, y: 14 }}
                      animate={{ opacity: 0.85, scale: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.4, delay: c.d, ease: suave }}
                    >
                      <span className="cesp-lectura__corazon-vaiven" style={{ animationDelay: `${-i * 0.7}s` }}>
                        <Corazon color={i % 2 ? '#F7A9C6' : '#E25C7A'} />
                      </span>
                    </motion.span>
                  ))}
              </AnimatePresence>
            </div>

            <button type="button" className="cesp-lectura__cerrar" onClick={guardar} aria-label={general.cerrar}>
              ×
            </button>

            <motion.article
              className="cesp-papel"
              initial={{ opacity: 0, y: 46, scaleY: 0.34 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: 40, scaleY: 0.4, transition: { duration: 0.55, ease: [0.4, 0, 0.6, 1] } }}
              transition={{ duration: 1.05, ease: suave }}
            >
              <span className="encaje cesp-papel__encaje cesp-papel__encaje--arriba" aria-hidden="true" />
              <span className="encaje cesp-papel__encaje cesp-papel__encaje--abajo" aria-hidden="true" />
              <span className="cesp-papel__pliegue cesp-papel__pliegue--1" aria-hidden="true" />
              <span className="cesp-papel__pliegue cesp-papel__pliegue--2" aria-hidden="true" />
              {(['ai', 'ad', 'bi', 'bd'] as const).map((esquina) => (
                <Mono key={esquina} className={`cesp-papel__esquina cesp-papel__esquina--${esquina}`} ancho={34} color="#F7A9C6" />
              ))}

              <motion.div
                className="cesp-papel__contenido"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.75, duration: 0.7 }}
              >
                <span className="cesp-papel__estampilla" aria-hidden="true">
                  <Personaje id="melody" />
                </span>
                <p className="cesp-papel__para">{cartaEspecial.etiquetaSobre}</p>
                <h2 id="cesp-titulo-carta" className="cesp-papel__titulo">{cartaEspecial.titulo}</h2>
                <span className="cesp-papel__separador" aria-hidden="true">
                  <span />
                  <Corazon ancho={14} color="#F28AAE" />
                  <span />
                </span>

                {textos.map((texto, i) => {
                  const esEspecial = i === cartaEspecial.parrafoEspecial
                  const esDespedida = i === textos.length - 1
                  const r = ritmo(texto, i, esEspecial)
                  return (
                    <div key={i} className={`cesp-papel__bloque ${esEspecial ? 'es-especial' : ''}`}>
                      <TypewriterOnScroll
                        className={`cesp-papel__texto ${esDespedida ? 'cesp-papel__despedida' : ''} ${esEspecial && momento ? 'esta-resaltado' : ''}`}
                        text={texto}
                        speed={r.speed}
                        delay={r.delay}
                        duracionMaxima={r.duracionMaxima}
                        start={parrafo >= i}
                        onStart={esEspecial ? () => setMomento(true) : undefined}
                        onComplete={() => setParrafo((p) => Math.max(p, i + 1))}
                      />
                      {esEspecial && (
                        <span className="cesp-papel__mono-especial" aria-hidden="true">
                          <AnimatePresence>
                            {momento && (
                              <motion.span
                                initial={{ opacity: 0, scale: 0.5, rotate: -12 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                transition={{ duration: 1.1, delay: 2.2, ease: suave }}
                              >
                                <Mono ancho={52} color="#F28AAE" />
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </span>
                      )}
                    </div>
                  )
                })}

                <motion.div
                  className="cesp-papel__cierre"
                  initial={{ opacity: 0, y: 8 }}
                  animate={terminada ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                  transition={{ duration: 1, ease: suave }}
                >
                  <p className="cesp-papel__firma">{cartaEspecial.firma}</p>
                  <svg className="cesp-papel__sello" viewBox="0 0 100 100" aria-hidden="true">
                    <circle cx="50" cy="50" r="44" fill="#E25C7A" stroke={LINEA} strokeWidth="3" />
                    <circle cx="50" cy="50" r="34" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="3 5" opacity=".6" />
                    <path d={RUTA_CORAZON} fill="#FFD6E7" transform="translate(28 30) scale(.44)" />
                  </svg>
                </motion.div>

                <div className="cesp-papel__acciones">
                  <BotonLazo variante="rosa" onClick={guardar} data-foco-inicial>
                    {cartaEspecial.guardar}
                  </BotonLazo>
                  <Link to={rutas.mundo} className="boton-suave">
                    {cartaEspecial.volverAlMundo} ♡
                  </Link>
                </div>
              </motion.div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </Contenido>
  )
}
