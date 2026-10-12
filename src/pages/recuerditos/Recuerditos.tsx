import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { AnimatePresence, motion, type PanInfo } from 'motion/react'
import { general, paginas, recuerditos, type Recuerdo } from '../../data/mensajes'
import type { PersonajeId } from '../../data/personajes'
import { marcarVisita } from '../../lib/visitas'
import { crearAleatorio, entre } from '../../lib/aleatorio'
import { useDialogo } from '../../hooks/useDialogo'
import { Contenido } from '../../components/ui/Pagina'
import { BotonVolver } from '../../components/ui/BotonVolver'
import { Inclinable } from '../../components/ui/Inclinable'
import { TypewriterOnScroll } from '../../components/ui/TypewriterOnScroll'
import { Personaje } from '../../components/personajes/Personaje'
import { Corazon, Flor, Mono, Estrella } from '../../components/decor/Adornos'
import { EscenaScrapbook } from './EscenaScrapbook'
import './Recuerditos.css'

const suave = [0.22, 0.8, 0.26, 1] as const
const fotos: Recuerdo[] = recuerditos.fotos

/** Colores de los marquitos de ejemplo mientras no haya foto real. */
const paletas = [
  ['#FFE3EC', '#F7A9C6'],
  ['#EFE7FB', '#C9B6F0'],
  ['#FFF0DF', '#F9C3A8'],
  ['#FFE9F1', '#F28AAE'],
  ['#E9F3FF', '#B9D3F5'],
  ['#FFF6D9', '#F3CF7A'],
]
const cintas = ['rosa', 'lunares', 'lavanda', 'rayas', 'amarilla', 'cuadros']
const adornos: (PersonajeId | 'flor' | 'mono' | 'estrella' | 'corazon')[] = ['melody', 'flor', 'cinnamoroll', 'mono', 'twinStars', 'corazon']

/** Rotaciones y desniveles "a mano", siempre los mismos. */
const azar = crearAleatorio(2024)
const disposicion = fotos.map(() => ({ rot: entre(azar, -5, 5), y: entre(azar, -14, 14) }))

function FotoContenido({ recuerdo, indice }: { recuerdo: Recuerdo; indice: number }) {
  const [fallo, setFallo] = useState(false)
  const [claro, oscuro] = paletas[indice % paletas.length]
  if (recuerdo.foto && !fallo) {
    return <img className="foto__img" src={recuerdo.foto} alt={recuerdo.titulo} loading="lazy" decoding="async" draggable={false} onError={() => setFallo(true)} />
  }
  return (
    <div className="foto__vacia" style={{ '--claro': claro, '--oscuro': oscuro } as CSSProperties}>
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <path d="M0 78 L28 48 L46 64 L62 50 L100 82 L100 100 L0 100 Z" fill={oscuro} opacity=".55" />
        <path d="M0 88 L22 70 L50 92 L74 74 L100 92 L100 100 L0 100 Z" fill={oscuro} opacity=".85" />
        <circle cx="74" cy="26" r="10" fill="#fff" opacity=".9" />
      </svg>
      <span className="foto__vacia-texto">
        <Corazon ancho={16} color="#fff" /> {recuerditos.placeholderFoto}
      </span>
    </div>
  )
}

function Adorno({ tipo }: { tipo: (typeof adornos)[number] }) {
  if (tipo === 'flor') return <Flor color="#FFC2D6" contorno />
  if (tipo === 'mono') return <Mono />
  if (tipo === 'estrella') return <Estrella color="#FFE08A" contorno />
  if (tipo === 'corazon') return <Corazon color="#F28AAE" contorno />
  return <Personaje id={tipo} />
}

const deslizar = {
  entra: (dir: number) => ({ opacity: 0, x: dir * 120, rotate: dir * 6 }),
  centro: { opacity: 1, x: 0, rotate: -1.5 },
  sale: (dir: number) => ({ opacity: 0, x: dir * -120, rotate: dir * -6 }),
}

export default function Recuerditos() {
  const [abierta, setAbierta] = useState<number | null>(null)
  const [navegado, setNavegado] = useState(false)
  const [direccion, setDireccion] = useState(1)
  const visorRef = useRef<HTMLDivElement>(null)
  const total = fotos.length

  useEffect(() => marcarVisita('recuerditos'), [])

  const abrir = (i: number) => {
    setNavegado(false)
    setAbierta(i)
  }
  const cerrar = () => setAbierta(null)
  const mover = (dir: number) => {
    setDireccion(dir)
    setNavegado(true)
    setAbierta((a) => (a === null ? a : (a + dir + total) % total))
  }

  useDialogo(abierta !== null, cerrar, visorRef)

  useEffect(() => {
    if (abierta === null) return
    const alTeclear = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') mover(1)
      if (e.key === 'ArrowLeft') mover(-1)
    }
    document.addEventListener('keydown', alTeclear)
    return () => document.removeEventListener('keydown', alTeclear)
  })

  const alSoltar = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -70 || info.velocity.x < -400) mover(1)
    else if (info.offset.x > 70 || info.velocity.x > 400) mover(-1)
  }

  const actual = abierta === null ? null : fotos[abierta]

  return (
    <Contenido className="recuerditos" etiqueta={paginas.recuerditos.titulo}>
      <EscenaScrapbook />
      <BotonVolver />

      <div className="album contenido-escena">
        <header className="album__cabecera cabecera">
          <motion.p className="antetitulo" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: suave }}>
            {recuerditos.antetitulo}
          </motion.p>
          <motion.h1 className="titulo-display album__titulo" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3, ease: suave }}>
            <span className="album__titulo-papel">{paginas.recuerditos.titulo}</span>
          </motion.h1>
          <TypewriterOnScroll className="texto-intro album__intro texto-mano" text={recuerditos.intro} speed={34} delay={700} />
        </header>

        <ul className="album__fotos">
          {fotos.map((recuerdo, i) => {
            const d = disposicion[i]
            const adorno = adornos[i % adornos.length]
            return (
              <motion.li
                key={i}
                className="album__item"
                style={{ '--rot': `${d.rot}deg`, '--desnivel': `${d.y}px` } as CSSProperties}
                initial={{ opacity: 0, y: 40, rotate: d.rot * 2 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ duration: 0.9, delay: 0.45 + i * 0.09, ease: suave }}
              >
                <Inclinable grados={7} className="album__inclinable">
                  <motion.button
                    type="button"
                    className="polaroid"
                    layoutId={`foto-${i}`}
                    onClick={() => abrir(i)}
                    aria-label={recuerditos.verFoto(recuerdo.titulo)}
                    transition={{ type: 'spring', stiffness: 190, damping: 26 }}
                  >
                    <span className={`polaroid__cinta cinta--${cintas[i % cintas.length]}`} aria-hidden="true" />
                    <span className="polaroid__foto">
                      <FotoContenido recuerdo={recuerdo} indice={i} />
                    </span>
                    <span className="polaroid__pie texto-mano">{recuerdo.titulo}</span>
                  </motion.button>
                </Inclinable>
                <span className={`album__adorno album__adorno--${i % 2 ? 'izq' : 'der'} sticker`} aria-hidden="true">
                  <Adorno tipo={adorno} />
                </span>
              </motion.li>
            )
          })}
        </ul>

        <motion.p className="album__pista texto-mano" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 1 }}>
          <Corazon ancho={14} color="#E25C7A" /> {recuerditos.pista}
        </motion.p>
      </div>

      {/* Visor de fotos */}
      <AnimatePresence>
        {abierta !== null && actual && (
          <motion.div
            className="visor-fondo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, pointerEvents: 'none', transition: { duration: 0.4 } }}
            transition={{ duration: 0.4 }}
            onClick={(e) => e.target === e.currentTarget && cerrar()}
          >
            <div ref={visorRef} className="visor" role="dialog" aria-modal="true" aria-labelledby="visor-titulo" aria-describedby="visor-texto">
              <div className="visor__escena">
                <AnimatePresence mode="popLayout" custom={direccion} initial={false}>
                  <motion.div
                    key={abierta}
                    className="visor__polaroid"
                    layoutId={navegado ? undefined : `foto-${abierta}`}
                    custom={direccion}
                    variants={deslizar}
                    initial={navegado ? 'entra' : false}
                    animate="centro"
                    exit="sale"
                    transition={{ type: 'spring', stiffness: 190, damping: 26 }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.35}
                    onDragEnd={alSoltar}
                  >
                    <span className={`polaroid__cinta cinta--${cintas[abierta % cintas.length]}`} aria-hidden="true" />
                    <span className="polaroid__foto">
                      <FotoContenido recuerdo={actual} indice={abierta} />
                    </span>
                    <span className="polaroid__pie texto-mano">{actual.titulo}</span>
                  </motion.div>
                </AnimatePresence>
              </div>

              <motion.div
                key={`nota-${abierta}`}
                className="visor__nota"
                initial={{ opacity: 0, y: 14, rotate: 3 }}
                animate={{ opacity: 1, y: 0, rotate: 1.5 }}
                transition={{ duration: 0.6, delay: 0.25, ease: suave }}
              >
                <Mono className="visor__nota-mono" ancho={40} />
                <h2 id="visor-titulo" className="visor__titulo">{actual.titulo}</h2>
                {actual.fecha && <p className="visor__fecha">{actual.fecha}</p>}
                <TypewriterOnScroll id="visor-texto" className="visor__texto texto-mano" text={actual.texto} speed={30} delay={500} />
                <p className="visor__contador" aria-live="polite">{recuerditos.contador(abierta + 1, total)}</p>
              </motion.div>

              <button type="button" className="visor__flecha visor__flecha--izq" onClick={() => mover(-1)} aria-label={recuerditos.anterior}>
                <svg viewBox="0 0 24 24" width="22" aria-hidden="true"><path d="M15 5 L8 12 L15 19" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <button type="button" className="visor__flecha visor__flecha--der" onClick={() => mover(1)} aria-label={recuerditos.siguiente}>
                <svg viewBox="0 0 24 24" width="22" aria-hidden="true"><path d="M9 5 L16 12 L9 19" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <button type="button" className="visor__cerrar" onClick={cerrar} aria-label={general.cerrar} data-foco-inicial>
                ×
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Contenido>
  )
}
