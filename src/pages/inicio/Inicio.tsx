import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { useNavigate } from 'react-router'
import { motion } from 'motion/react'
import { inicio } from '../../data/mensajes'
import { personajes, type PersonajeId } from '../../data/personajes'
import { precargar, precargarTodo, rutas } from '../../rutas'
import { useParallax } from '../../hooks/useParallax'
import { Contenido } from '../../components/ui/Pagina'
import { BotonLazo } from '../../components/ui/BotonLazo'
import { Burbuja } from '../../components/ui/Burbuja'
import { TypewriterOnScroll } from '../../components/ui/TypewriterOnScroll'
import { CapaParallax } from '../../components/decor/CapaParallax'
import { Personaje } from '../../components/personajes/Personaje'
import { MarcoOval } from '../../components/decor/MarcoOval'
import { Mono, Nube, Corazon } from '../../components/decor/Adornos'
import { EscenaInicio } from './EscenaInicio'
import './Inicio.css'

const suave = [0.22, 0.8, 0.26, 1] as const

/** Orden de aparición: primero las dos protagonistas, luego sus amigos alrededor. */
const elenco: { id: PersonajeId; desde: { x?: number; y?: number }; retraso: number; burbuja: 'abajo' | 'izquierda' | 'derecha' }[] = [
  { id: 'melody', desde: { y: 40 }, retraso: 0.55, burbuja: 'abajo' },
  { id: 'kitty', desde: { x: -30, y: 30 }, retraso: 0.75, burbuja: 'abajo' },
  { id: 'piano', desde: { x: 30, y: 20 }, retraso: 0.95, burbuja: 'abajo' },
  { id: 'flat', desde: { y: 30 }, retraso: 1.05, burbuja: 'abajo' },
  { id: 'cinnamoroll', desde: { x: 60, y: -20 }, retraso: 1.25, burbuja: 'derecha' },
  { id: 'twinStars', desde: { x: -40, y: -20 }, retraso: 1.35, burbuja: 'izquierda' },
]

export default function Inicio() {
  const navigate = useNavigate()
  const parallax = useParallax()
  const [hablando, setHablando] = useState<PersonajeId | null>(null)
  const [salida, setSalida] = useState<{ x: number; y: number; r: number } | null>(null)
  const temporizador = useRef<number>(undefined)

  useEffect(() => {
    precargarTodo()
    return () => window.clearTimeout(temporizador.current)
  }, [])

  const saludar = (id: PersonajeId) => {
    window.clearTimeout(temporizador.current)
    setHablando((actual) => (actual === id ? null : id))
    temporizador.current = window.setTimeout(() => setHablando(null), 3600)
  }

  const entrar = (e: MouseEvent<HTMLButtonElement>) => {
    if (salida) return
    const caja = e.currentTarget.getBoundingClientRect()
    const x = caja.left + caja.width / 2
    const y = caja.top + caja.height / 2
    const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y)) + 40
    setSalida({ x, y, r })
  }

  return (
    <Contenido className="inicio">
      <EscenaInicio parallax={parallax} />

      <div className="inicio__composicion contenido-escena">
        {/* Texto */}
        <section className="inicio__texto" aria-labelledby="inicio-titulo">
          <TypewriterOnScroll className="antetitulo inicio__antetitulo" text={inicio.antetitulo} speed={75} delay={300} duracionMaxima={2000} />
          <h1 id="inicio-titulo" className="titulo-display inicio__titulo">
            <motion.span
              className="inicio__titulo-linea"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: suave }}
            >
              {inicio.tituloInicio}
            </motion.span>{' '}
            <motion.em
              className="inicio__titulo-nombre"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.6, ease: suave }}
            >
              {inicio.tituloNombre}
              <svg className="inicio__subrayado" viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true">
                <motion.path
                  d="M4 16 C 60 6, 120 22, 180 12 S 270 8, 296 14"
                  fill="none"
                  stroke="#F28AAE"
                  strokeWidth="5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 1.3, ease: suave }}
                />
              </svg>
            </motion.em>
          </h1>
          <TypewriterOnScroll className="texto-intro inicio__subtitulo" text={inicio.subtitulo} speed={40} delay={1500} duracionMaxima={4000} />
          <motion.div
            className="inicio__accion"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.15, ease: suave }}
          >
            <BotonLazo variante="cereza" onClick={entrar} onPointerEnter={() => precargar(rutas.mundo)}>
              {inicio.boton}
            </BotonLazo>
            <p className="inicio__pista texto-mano">
              <Corazon ancho={14} color="#E25C7A" /> {inicio.pista}
            </p>
          </motion.div>
        </section>

        {/* Escenario con los personajes */}
        <CapaParallax parallax={parallax} profundidad={12} className="inicio__escenario-capa">
          <div className="inicio__escenario">
            <motion.div
              className="inicio__marco"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.3, ease: suave }}
            >
              <MarcoOval />
              <Mono className="inicio__marco-mono" color="#E25C7A" />
            </motion.div>
            <motion.span
              className="inicio__halo"
              aria-hidden="true"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, delay: 0.5, ease: suave }}
            />
            <motion.div
              className="inicio__pedestal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.45, ease: suave }}
            >
              <Nube contorno />
            </motion.div>

            {elenco.map(({ id, desde, retraso, burbuja }) => (
              <motion.div
                key={id}
                className={`inicio__pj inicio__pj--${id}`}
                initial={{ opacity: 0, x: desde.x ?? 0, y: desde.y ?? 0 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 1.1, delay: retraso, ease: suave }}
              >
                <div className="inicio__pj-vaiven">
                  <button
                    type="button"
                    className="inicio__pj-boton personaje-reactivo"
                    aria-label={`Saludar a ${personajes[id].nombre}`}
                    onClick={() => saludar(id)}
                  >
                    <Personaje id={id} prioridad hero />
                  </button>
                </div>
                <Burbuja visible={hablando === id} texto={inicio.saludos[id]} lado={burbuja} className="inicio__burbuja" />
              </motion.div>
            ))}
          </div>
        </CapaParallax>
      </div>

      <motion.p
        className="inicio__firma texto-mano"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1.2 }}
      >
        {inicio.firma}
      </motion.p>

      {/* Transición tipo iris hacia el mapa */}
      {salida && (
        <motion.div
          className="inicio__iris"
          aria-hidden="true"
          initial={{ clipPath: `circle(0px at ${salida.x}px ${salida.y}px)` }}
          animate={{ clipPath: `circle(${salida.r}px at ${salida.x}px ${salida.y}px)` }}
          transition={{ duration: 1.05, ease: [0.65, 0, 0.35, 1] }}
          onAnimationComplete={() => navigate(rutas.mundo)}
        >
          <motion.div
            className="inicio__iris-centro"
            initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: suave }}
          >
            <Mono ancho={120} color="#E25C7A" />
          </motion.div>
        </motion.div>
      )}
    </Contenido>
  )
}
