import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { extranes, paginas } from '../../data/mensajes'
import { marcarVisita } from '../../lib/visitas'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { Contenido } from '../../components/ui/Pagina'
import { BotonVolver } from '../../components/ui/BotonVolver'
import { TypewriterOnScroll } from '../../components/ui/TypewriterOnScroll'
import { Corazon, LINEA, RUTA_CORAZON } from '../../components/decor/Adornos'
import { Estallido } from '../../components/decor/Estallido'
import { EscenaAtardecer } from './EscenaAtardecer'
import './CuandoMeExtranes.css'

const suave = [0.22, 0.8, 0.26, 1] as const
const COLORES = ['#F7A9C6', '#E3D6FA', '#FFF1E6', '#FBC2D7', '#FFE3C2', '#D9CCF2']
const CAIDA = 22

/* ♡ Un sobrecito colgado del tendedero ---------------------------------- */
function Sobrecito({ indice, etiqueta, mensaje, pinza }: { indice: number; etiqueta: string; mensaje: string; pinza: number }) {
  const [abierto, setAbierto] = useState(false)
  const idNota = `sobrecito-nota-${indice}`
  const color = COLORES[indice % COLORES.length]
  return (
    <li className="sobrecito" style={{ '--pinza': `${pinza}px`, '--fase': `${-indice * 0.9}s`, '--color': color } as CSSProperties}>
      <div className={`sobrecito__colgado ${abierto ? 'esta-abierto' : ''}`}>
        <span className="sobrecito__pinza" aria-hidden="true" />
        <button
          type="button"
          className="sobrecito__boton"
          aria-expanded={abierto}
          aria-controls={idNota}
          aria-label={abierto ? extranes.cerrarSobre(etiqueta) : extranes.abrir(etiqueta)}
          onClick={() => setAbierto((v) => !v)}
        >
          <span className="sobrecito__cuerpo">
            <motion.span
              className="sobrecito__tarjetita"
              initial={false}
              animate={{ y: abierto ? '-34%' : '0%' }}
              transition={{ duration: 0.6, delay: abierto ? 0.3 : 0, ease: suave }}
            />
            <svg className="sobrecito__frente" viewBox="0 0 100 64" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0 0 L50 36 L100 0 L100 64 L0 64 Z" fill={color} />
              <path d="M0 64 L50 30 L100 64" fill="none" stroke="#fff" strokeWidth="1.5" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" opacity=".9" />
              <rect x=".5" y=".5" width="99" height="63" rx="3" fill="none" stroke={LINEA} strokeWidth="2.4" vectorEffect="non-scaling-stroke" />
            </svg>
            <motion.span
              className="sobrecito__solapa"
              initial={false}
              animate={{ rotateX: abierto ? 180 : 0 }}
              transition={{ duration: 0.6, ease: [0.5, 0, 0.2, 1], delay: abierto ? 0 : 0.25 }}
            >
              <svg viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
                <path d="M1 1 H99 L50 38 Z" fill={color} stroke={LINEA} strokeWidth="2.4" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
              </svg>
              <svg className="sobrecito__sello" viewBox="0 0 100 95" aria-hidden="true">
                <path d={RUTA_CORAZON} fill="#E25C7A" stroke={LINEA} strokeWidth="7" strokeLinejoin="round" />
              </svg>
            </motion.span>
          </span>
          <span className="sobrecito__etiqueta texto-mano">{etiqueta}</span>
        </button>

        <AnimatePresence initial={false}>
          {abierto && (
            <motion.div
              id={idNota}
              className="sobrecito__nota-zona"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.55, ease: suave }}
            >
              <motion.div
                className="sobrecito__nota"
                initial={{ y: -16, rotate: -4 }}
                animate={{ y: 0, rotate: indice % 2 ? 2 : -2 }}
                transition={{ duration: 0.7, delay: 0.15, ease: suave }}
              >
                <Corazon className="sobrecito__nota-corazon" ancho={16} color="#F28AAE" />
                <TypewriterOnScroll className="sobrecito__nota-texto texto-mano" text={mensaje} speed={30} delay={450} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </li>
  )
}

/* ♡ Tendedero ------------------------------------------------------------ */
function Cuerda({ sobres, desde }: { sobres: typeof extranes.sobres; desde: number }) {
  const n = sobres.length
  return (
    <div className="cuerda">
      <svg className="cuerda__hilo" viewBox="0 0 100 60" preserveAspectRatio="none" aria-hidden="true">
        <path d={`M0 6 Q 50 ${6 + 2 * CAIDA} 100 6`} fill="none" stroke="#C27891" strokeWidth="2" vectorEffect="non-scaling-stroke" />
      </svg>
      <ul className="cuerda__sobres" style={{ '--n': n } as CSSProperties}>
        {sobres.map((s, i) => {
          const t = (i + 0.5) / n
          return <Sobrecito key={desde + i} indice={desde + i} etiqueta={s.etiqueta} mensaje={s.mensaje} pinza={6 + 4 * CAIDA * t * (1 - t)} />
        })}
      </ul>
    </div>
  )
}

/* ♡ Corazón para mandar un abrazo ---------------------------------------- */
type EstadoAbrazo = 'quieto' | 'cargando' | 'enviado'
const DURACION_ABRAZO = 1600

function Abrazo() {
  const [estado, setEstado] = useState<EstadoAbrazo>('quieto')
  const [disparo, setDisparo] = useState(0)
  const temporizador = useRef<number>(undefined)

  useEffect(() => () => window.clearTimeout(temporizador.current), [])

  const empezar = () => {
    if (estado !== 'quieto') return
    setEstado('cargando')
    temporizador.current = window.setTimeout(() => {
      setEstado('enviado')
      setDisparo((n) => n + 1)
    }, DURACION_ABRAZO)
  }
  const soltar = () => {
    if (estado !== 'cargando') return
    window.clearTimeout(temporizador.current)
    setEstado('quieto')
  }
  const alTeclear = (e: KeyboardEvent<HTMLButtonElement>) => {
    if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) {
      e.preventDefault()
      empezar()
    }
  }
  const alSoltarTecla = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === ' ' || e.key === 'Enter') soltar()
  }

  const texto = estado === 'cargando' ? extranes.abrazo.cargando : estado === 'enviado' ? extranes.abrazo.enviado : extranes.abrazo.instruccion

  return (
    <section className={`abrazo abrazo--${estado}`} aria-label={extranes.abrazo.etiqueta}>
      <div className="abrazo__zona">
        <button
          type="button"
          className="abrazo__corazon"
          aria-label={extranes.abrazo.etiqueta}
          aria-describedby="abrazo-texto"
          disabled={estado === 'enviado'}
          onPointerDown={empezar}
          onPointerUp={soltar}
          onPointerLeave={soltar}
          onPointerCancel={soltar}
          onKeyDown={alTeclear}
          onKeyUp={alSoltarTecla}
          onContextMenu={(e) => e.preventDefault()}
        >
          <svg viewBox="0 0 100 95" aria-hidden="true">
            <path d={RUTA_CORAZON} fill="#FFF4F8" />
            <path className="abrazo__relleno" d={RUTA_CORAZON} fill="#F28AAE" />
            <path d={RUTA_CORAZON} fill="none" stroke={LINEA} strokeWidth="3.5" strokeLinejoin="round" />
            <path d="M20 26 C 21 18, 27 13, 34 13" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity=".8" />
          </svg>
          <span className="abrazo__anillo" aria-hidden="true" />
        </button>
        <Estallido disparo={disparo} cantidad={20} radio={170} tipos={['corazon', 'corazon', 'destello', 'flor']} />
      </div>
      <p id="abrazo-texto" className="abrazo__texto texto-mano" aria-live="polite">
        {texto}
      </p>
      <AnimatePresence>
        {estado === 'enviado' && (
          <motion.button
            type="button"
            className="boton-suave"
            onClick={() => setEstado('quieto')}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {extranes.abrazo.otraVez} ♡
          </motion.button>
        )}
      </AnimatePresence>
    </section>
  )
}

/* ♡ Página --------------------------------------------------------------- */
export default function CuandoMeExtranes() {
  const movil = useMediaQuery('(max-width: 720px)')
  const tablet = useMediaQuery('(max-width: 1100px)')
  const porCuerda = movil ? 2 : tablet ? 3 : 6
  const cuerdas: { sobres: typeof extranes.sobres; desde: number }[] = []
  for (let i = 0; i < extranes.sobres.length; i += porCuerda) {
    cuerdas.push({ sobres: extranes.sobres.slice(i, i + porCuerda), desde: i })
  }

  useEffect(() => marcarVisita('extranes'), [])

  return (
    <Contenido className="extranes" etiqueta={paginas.extranes.titulo}>
      <EscenaAtardecer />
      <BotonVolver />

      <div className="extranes__composicion contenido-escena">
        <header className="extranes__cabecera cabecera">
          <motion.h1 className="titulo-display extranes__titulo" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.12, ease: suave }}>
            {paginas.extranes.titulo}
          </motion.h1>
          <TypewriterOnScroll className="texto-intro extranes__intro" text={extranes.intro} speed={26} delay={350} />
        </header>

        <motion.div className="extranes__tendedero" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.25, ease: suave }}>
          {cuerdas.map((c) => (
            <Cuerda key={`${porCuerda}-${c.desde}`} sobres={c.sobres} desde={c.desde} />
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.4, ease: suave }}>
          <Abrazo />
        </motion.div>
      </div>
    </Contenido>
  )
}
