import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { cositas, general, paginas } from '../../data/mensajes'
import type { PersonajeId } from '../../data/personajes'
import { marcarVisita } from '../../lib/visitas'
import { useDialogo } from '../../hooks/useDialogo'
import { Contenido } from '../../components/ui/Pagina'
import { BotonVolver } from '../../components/ui/BotonVolver'
import { BotonLazo } from '../../components/ui/BotonLazo'
import { TypewriterOnScroll } from '../../components/ui/TypewriterOnScroll'
import { Personaje } from '../../components/personajes/Personaje'
import { Corazon, LINEA, Mono, RUTA_CORAZON } from '../../components/decor/Adornos'
import { Estallido } from '../../components/decor/Estallido'
import { EscenaTiendita } from './EscenaTiendita'
import './CositasDeTi.css'

const suave = [0.22, 0.8, 0.26, 1] as const

/** Dónde cae cada corazón dentro del frasco (porcentaje) y su color. */
const posiciones = [
  { x: 30, y: 80, rot: -14, color: '#F28AAE' },
  { x: 52, y: 84, rot: 6, color: '#E25C7A' },
  { x: 73, y: 79, rot: 16, color: '#D9CCF2' },
  { x: 41, y: 66, rot: 10, color: '#FFC2D6' },
  { x: 64, y: 64, rot: -8, color: '#F7A9C6' },
  { x: 29, y: 51, rot: -6, color: '#FFE3B8' },
  { x: 51, y: 48, rot: 12, color: '#F28AAE' },
  { x: 72, y: 50, rot: -16, color: '#E9DDFB' },
  { x: 40, y: 36, rot: 4, color: '#E25C7A' },
  { x: 62, y: 35, rot: -10, color: '#FFC2D6' },
]

const stickers: PersonajeId[] = ['melody', 'piano', 'kitty', 'flat', 'cinnamoroll', 'twinStars']

export default function CositasDeTi() {
  const total = cositas.lista.length
  const [abierta, setAbierta] = useState<number | null>(null)
  const [vistas, setVistas] = useState<number[]>([])
  const [disparo, setDisparo] = useState(0)
  const notaRef = useRef<HTMLDivElement>(null)
  const completo = vistas.length === total

  useEffect(() => marcarVisita('cositas'), [])

  const abrir = (i: number) => {
    setAbierta(i)
    setVistas((v) => (v.includes(i) ? v : [...v, i]))
    setDisparo((n) => n + 1)
  }
  const cerrar = () => setAbierta(null)
  const otra = () => {
    const pendientes = cositas.lista.map((_, i) => i).filter((i) => !vistas.includes(i))
    const siguiente = pendientes.length ? pendientes[0] : ((abierta ?? 0) + 1) % total
    abrir(siguiente)
  }

  useDialogo(abierta !== null, cerrar, notaRef)

  return (
    <Contenido className="cositas" etiqueta={paginas.cositas.titulo}>
      <EscenaTiendita />
      <BotonVolver />

      <div className="cositas__composicion contenido-escena">
        <header className="cositas__cabecera">
          <motion.p className="antetitulo" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: suave }}>
            {cositas.antetitulo}
          </motion.p>
          <motion.h1 className="titulo-display cositas__titulo" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.32, ease: suave }}>
            {paginas.cositas.titulo}
          </motion.h1>
          <motion.p className="texto-intro" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.45, ease: suave }}>
            {cositas.intro}
          </motion.p>
          <motion.div
            className="cositas__progreso"
            role="status"
            aria-label={cositas.progresoLargo(vistas.length, total)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <ol className="cositas__progreso-corazones" aria-hidden="true">
              {cositas.lista.map((_, i) => (
                <li key={i} className={vistas.includes(i) ? 'esta-lleno' : ''}>
                  <Corazon ancho={18} color={vistas.includes(i) ? '#E25C7A' : '#fff'} contorno />
                </li>
              ))}
            </ol>
            <span className="texto-mano">{cositas.progreso(vistas.length, total)}</span>
          </motion.div>
        </header>

        <div className="cositas__estante-zona">
          <motion.div
            className="frasco"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.35, ease: suave }}
          >
            <FrascoGrande />
            <div className="frasco__etiqueta" aria-hidden="true">
              <span className="frasco__etiqueta-texto">{cositas.etiquetaFrasco}</span>
              <span className="frasco__etiqueta-para">{cositas.etiquetaPara}</span>
            </div>

            {cositas.lista.map((_, i) => {
              const p = posiciones[i % posiciones.length]
              const vista = vistas.includes(i)
              return (
                <motion.button
                  key={i}
                  type="button"
                  className={`frasco__corazon ${vista ? 'esta-visto' : ''}`}
                  style={{ '--x': `${p.x}%`, '--y': `${p.y}%`, '--rot': `${p.rot}deg`, '--retraso': `${-i * 0.7}s` } as CSSProperties}
                  aria-label={cositas.abrirCorazon(i + 1)}
                  onClick={() => abrir(i)}
                  initial={{ opacity: 0, y: -40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 + i * 0.07, ease: suave }}
                >
                  <span className="frasco__corazon-vaiven">
                    <svg viewBox="0 0 100 95" aria-hidden="true">
                      <path d={RUTA_CORAZON} fill={p.color} stroke={LINEA} strokeWidth="6" strokeLinejoin="round" />
                      <path d="M22 28 C 23 20, 29 15, 36 15" fill="none" stroke="#fff" strokeWidth="9" strokeLinecap="round" opacity=".75" />
                      {vista && <path d="M36 48 L46 58 L66 36" fill="none" stroke="#fff" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />}
                    </svg>
                  </span>
                </motion.button>
              )
            })}
          </motion.div>

          <motion.div className="cositas__pj cositas__pj--piano" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.9, ease: suave }}>
            <span className="personaje-reactivo"><Personaje id="piano" /></span>
          </motion.div>
          <motion.div className="cositas__pj cositas__pj--flat" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 1, ease: suave }}>
            <span className="personaje-reactivo"><Personaje id="flat" /></span>
          </motion.div>

          <AnimatePresence>
            {completo && abierta === null && (
              <motion.div
                className="cositas__final"
                role="status"
                initial={{ opacity: 0, y: 20, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: suave }}
              >
                <Personaje id="melody" className="cositas__final-melody" />
                <div>
                  <p className="cositas__final-titulo">{cositas.final.titulo}</p>
                  <p className="texto-mano cositas__final-texto">{cositas.final.texto}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Notita desdoblada */}
      <AnimatePresence>
        {abierta !== null && (
          <motion.div
            className="nota-fondo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, pointerEvents: 'none', transition: { duration: 0.35, delay: 0.1 } }}
            transition={{ duration: 0.4 }}
            onClick={(e) => e.target === e.currentTarget && cerrar()}
          >
            <motion.div
              ref={notaRef}
              key={abierta}
              className="nota"
              role="dialog"
              aria-modal="true"
              aria-labelledby="nota-numero"
              aria-describedby="nota-texto"
              initial={{ opacity: 0, scale: 0.6, rotate: -10, y: 60 }}
              animate={{ opacity: 1, scale: 1, rotate: -1.5, y: 0 }}
              exit={{ opacity: 0, scale: 0.7, rotate: 6, y: 80, transition: { duration: 0.4, ease: [0.4, 0, 0.6, 1] } }}
              transition={{ type: 'spring', stiffness: 170, damping: 22 }}
            >
              <span className="nota__cinta" aria-hidden="true" />
              <motion.div
                className="nota__pliegue"
                initial={{ rotateX: -90 }}
                animate={{ rotateX: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: suave }}
              >
                <p id="nota-numero" className="nota__numero">{cositas.numero(abierta + 1)}</p>
                <TypewriterOnScroll id="nota-texto" className="nota__texto texto-mano" text={cositas.lista[abierta]} speed={30} delay={550} />
              </motion.div>
              <span className="nota__sticker sticker" aria-hidden="true">
                <Personaje id={stickers[abierta % stickers.length]} />
              </span>
              <Mono className="nota__mono" ancho={46} />
              <div className="nota__acciones">
                <BotonLazo variante="rosa" conMono={false} onClick={cerrar} data-foco-inicial>
                  {cositas.guardar}
                </BotonLazo>
                <button type="button" className="boton-suave" onClick={otra}>
                  {cositas.otra} ♡
                </button>
              </div>
              <button type="button" className="nota__cerrar" onClick={cerrar} aria-label={general.cerrar}>
                ×
              </button>
              <Estallido disparo={disparo} cantidad={14} radio={190} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Contenido>
  )
}

/** Frasco de vidrio grande con tapa de encaje y moño. */
function FrascoGrande() {
  return (
    <svg className="frasco__svg" viewBox="0 0 300 360" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="frasco-vidrio" x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".9" />
          <stop offset=".45" stopColor="#FFF6FA" stopOpacity=".5" />
          <stop offset="1" stopColor="#FBD9E7" stopOpacity=".85" />
        </linearGradient>
      </defs>
      {/* cuerpo */}
      <path d="M70 96 Q38 108 38 150 L38 310 Q38 346 74 346 L226 346 Q262 346 262 310 L262 150 Q262 108 230 96 Z" fill="url(#frasco-vidrio)" stroke={LINEA} strokeWidth="4" strokeLinejoin="round" />
      <ellipse cx="150" cy="330" rx="98" ry="10" fill="#F7A9C6" opacity=".25" />
      {/* reflejos */}
      <path d="M58 160 Q54 230 62 300" fill="none" stroke="#fff" strokeWidth="11" strokeLinecap="round" opacity=".9" />
      <path d="M78 136 L80 148" stroke="#fff" strokeWidth="8" strokeLinecap="round" />
      <path d="M244 180 Q248 230 242 270" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity=".7" />
      {/* tapa */}
      <rect x="62" y="52" width="176" height="48" rx="14" fill="#F7A9C6" stroke={LINEA} strokeWidth="4" />
      <path d="M76 68 H224" stroke="#fff" strokeWidth="4" strokeDasharray="7 9" strokeLinecap="round" opacity=".9" />
      {/* encaje */}
      <g fill="#fff" stroke={LINEA} strokeWidth="2">
        {Array.from({ length: 13 }, (_, i) => (
          <circle key={i} cx={66 + i * 14} cy="104" r="8" />
        ))}
      </g>
      <rect x="58" y="94" width="184" height="10" fill="#fff" />
      <g fill={LINEA} opacity=".25">
        {Array.from({ length: 13 }, (_, i) => (
          <circle key={i} cx={66 + i * 14} cy="106" r="2" />
        ))}
      </g>
      {/* moño */}
      <g transform="translate(150 54)" stroke={LINEA} strokeWidth="3.4" strokeLinejoin="round" fill="#E25C7A">
        <path d="M-4 4 C -10 18, -18 30, -30 42 L -19 40 L -15 48 C -5 34, 0 18, 0 6 Z" />
        <path d="M4 4 C 10 18, 18 30, 30 42 L 19 40 L 15 48 C 5 34, 0 18, 0 6 Z" />
        <path d="M-4 -2 C -16 -24, -48 -30, -48 -8 C -48 12, -20 10, -4 4 Z" />
        <path d="M4 -2 C 16 -24, 48 -30, 48 -8 C 48 12, 20 10, 4 4 Z" />
        <rect x="-9" y="-9" width="18" height="17" rx="7" />
      </g>
      <path d="M118 42 C 112 36, 104 34, 100 38" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity=".6" />
    </svg>
  )
}
