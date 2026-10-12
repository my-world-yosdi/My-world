import { useEffect, useRef, useState, type ComponentType, type CSSProperties } from 'react'
import { Link } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import { general, mundo, paginas } from '../../data/mensajes'
import type { PersonajeId } from '../../data/personajes'
import { precargar, rutas } from '../../rutas'
import { leerVisitas, type LugarId } from '../../lib/visitas'
import { useParallax } from '../../hooks/useParallax'
import { Contenido } from '../../components/ui/Pagina'
import { Inclinable } from '../../components/ui/Inclinable'
import { Burbuja } from '../../components/ui/Burbuja'
import { TypewriterOnScroll } from '../../components/ui/TypewriterOnScroll'
import { Personaje } from '../../components/personajes/Personaje'
import { CintaBanner, Corazon, Destello, Mono, Nube } from '../../components/decor/Adornos'
import { Estallido } from '../../components/decor/Estallido'
import { EscenaMundo } from './EscenaMundo'
import { Buzon, Frasco, Globo, Polaroids, RegaloMini, SobreEspecial } from './IlustracionesLugares'
import './Mundo.css'

const suave = [0.22, 0.8, 0.26, 1] as const

const CAMINO = 'M-10 94 C 30 72, 50 50, 90 48 S 190 78, 250 78 S 350 44, 410 44 S 520 76, 580 76 S 690 46, 750 46 S 850 72, 910 72 S 990 58, 1010 50'

type Lugar = {
  id: LugarId
  ruta: string
  Dibujo: ComponentType<{ className?: string }>
  pj: PersonajeId
  /** Posición en el mapa de escritorio (porcentaje del área). */
  x: number
  y: number
}

const lugares: Lugar[] = [
  { id: 'cositas', ruta: rutas.cositas, Dibujo: Frasco, pj: 'piano', x: 9, y: 42 },
  { id: 'recuerditos', ruta: rutas.recuerditos, Dibujo: Polaroids, pj: 'twinStars', x: 25, y: 72 },
  { id: 'cartita', ruta: rutas.cartita, Dibujo: Buzon, pj: 'flat', x: 41, y: 38 },
  { id: 'especial', ruta: rutas.especial, Dibujo: SobreEspecial, pj: 'melody', x: 58, y: 70 },
  { id: 'regalito', ruta: rutas.regalito, Dibujo: RegaloMini, pj: 'kitty', x: 75, y: 40 },
  { id: 'extranes', ruta: rutas.extranes, Dibujo: Globo, pj: 'cinnamoroll', x: 91, y: 66 },
]

export default function Mundo() {
  const parallax = useParallax()
  const [visitas] = useState(leerVisitas)
  const [secreto, setSecreto] = useState(false)
  const [disparoSecreto, setDisparoSecreto] = useState(0)
  const [habla, setHabla] = useState<'melody' | 'kitty' | null>(null)
  const [finalAbierto, setFinalAbierto] = useState(false)
  const temporizador = useRef<number>(undefined)
  const todoVisto = lugares.every((l) => visitas.includes(l.id))

  useEffect(() => {
    const t1 = window.setTimeout(() => setHabla('melody'), 1600)
    const t2 = window.setTimeout(() => setHabla('kitty'), 5200)
    const t4 = window.setTimeout(() => setHabla((h) => (h === 'kitty' ? null : h)), 9200)
    const t3 = todoVisto ? window.setTimeout(() => setFinalAbierto(true), 1400) : undefined
    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
      window.clearTimeout(t4)
      window.clearTimeout(t3)
      window.clearTimeout(temporizador.current)
    }
  }, [todoVisto])

  const encontrarSecreto = () => {
    setSecreto(true)
    setDisparoSecreto((n) => n + 1)
    window.clearTimeout(temporizador.current)
    temporizador.current = window.setTimeout(() => setSecreto(false), 7000)
  }

  const saludar = (quien: 'melody' | 'kitty') => {
    setHabla((h) => (h === quien ? null : quien))
  }

  return (
    <Contenido className="mundo" etiqueta={paginas.mundo.titulo}>
      <EscenaMundo parallax={parallax} />

      <header className="mundo__cabecera cabecera contenido-escena">
        <motion.p
          className="antetitulo"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: suave }}
        >
          {mundo.antetitulo}
        </motion.p>
        <motion.div
          className="mundo__titulo-cinta"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: suave }}
        >
          <CintaBanner className="mundo__cinta" color="#F7A9C6" />
          <h1 className="titulo-display mundo__titulo">{paginas.mundo.titulo}</h1>
        </motion.div>
        <motion.p
          className="texto-intro"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: suave }}
        >
          {mundo.subtitulo}
        </motion.p>
      </header>

      <section className="mundo__mapa contenido-escena" aria-label={paginas.mundo.titulo}>
        {/* Caminito punteado */}
        <svg className="mundo__camino mundo__camino--h" viewBox="0 0 1000 100" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <mask id="mundo-camino-mascara">
              <motion.path
                d={CAMINO}
                stroke="#fff"
                strokeWidth="40"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.4, delay: 0.5, ease: suave }}
              />
            </mask>
          </defs>
          <path d={CAMINO} mask="url(#mundo-camino-mascara)" />
        </svg>
        <svg className="mundo__camino mundo__camino--v" viewBox="0 0 100 1000" preserveAspectRatio="none" aria-hidden="true">
          <path d="M50 -10 C 20 60, 20 140, 30 200 S 75 320, 70 400 S 25 520, 30 600 S 75 720, 70 800 S 40 940, 50 1010" />
        </svg>

        {/* My Melody y Hello Kitty dan la bienvenida */}
        <motion.div
          className="mundo__anfitrionas"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: suave }}
        >
          <button type="button" className="mundo__anfitriona mundo__anfitriona--melody personaje-reactivo" onClick={() => saludar('melody')} aria-label="Saludar a My Melody">
            <Personaje id="melody" />
          </button>
          <button type="button" className="mundo__anfitriona mundo__anfitriona--kitty personaje-reactivo" onClick={() => saludar('kitty')} aria-label="Saludar a Hello Kitty">
            <Personaje id="kitty" />
          </button>
          <Burbuja visible={habla === 'melody'} texto={mundo.melodyDice} lado="abajo" className="mundo__anfitrionas-burbuja" />
          <Burbuja visible={habla === 'kitty'} texto={mundo.kittyDice} lado="abajo" className="mundo__anfitrionas-burbuja" />
        </motion.div>

        <ul className="mundo__lugares">
          {lugares.map((lugar, i) => {
            const pagina = paginas[lugar.id]
            const visitado = visitas.includes(lugar.id)
            return (
              <motion.li
                key={lugar.id}
                className={`lugar lugar--${lugar.id}`}
                style={{ '--x': `${lugar.x}%`, '--y': `${lugar.y}%` } as CSSProperties}
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.6 + i * 0.12, ease: suave }}
              >
                <Link
                  to={lugar.ruta}
                  className="lugar__enlace"
                  onPointerEnter={() => precargar(lugar.ruta)}
                  onFocus={() => precargar(lugar.ruta)}
                  aria-describedby={`lugar-desc-${lugar.id}`}
                >
                  <Inclinable className="lugar__escena" grados={9}>
                    <span className="lugar__sombra" aria-hidden="true" />
                    <span className="lugar__dibujo-vaiven">
                      <lugar.Dibujo className="lugar__dibujo" />
                    </span>
                    <span className="lugar__pj" aria-hidden="true">
                      <Personaje id={lugar.pj} />
                    </span>
                    <span className="lugar__brillos" aria-hidden="true">
                      <Destello className="lugar__brillo lugar__brillo--1" color="#fff" />
                      <Destello className="lugar__brillo lugar__brillo--2" color="#FFE08A" />
                      <Destello className="lugar__brillo lugar__brillo--3" color="#fff" />
                    </span>
                  </Inclinable>
                  <span className="lugar__cartel">
                    <span className="lugar__nombre">{pagina.corto}</span>
                    <span className="lugar__desc" id={`lugar-desc-${lugar.id}`}>
                      {pagina.descripcion}
                    </span>
                  </span>
                  {visitado && (
                    <span className="lugar__sello" title={mundo.visitado}>
                      <Corazon ancho={16} color="#fff" />
                      <span className="solo-lector">{mundo.visitado}</span>
                    </span>
                  )}
                </Link>
              </motion.li>
            )
          })}
        </ul>

        {/* Corazoncito escondido detrás de una nube */}
        <div className="mundo__secreto">
          <button type="button" className="mundo__secreto-boton" aria-label={mundo.secretoEtiqueta} onClick={encontrarSecreto}>
            <Corazon ancho={22} color="#F28AAE" />
          </button>
          <Nube className="mundo__secreto-nube" />
          <Estallido disparo={disparoSecreto} cantidad={12} radio={90} tipos={['corazon', 'destello']} />
        </div>
      </section>

      <AnimatePresence>
        {secreto && (
          <motion.div
            className="mundo__nota mundo__nota--secreto"
            role="status"
            initial={{ opacity: 0, y: 16, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: -1 }}
            exit={{ opacity: 0, y: 10, transition: { duration: 0.3 } }}
            transition={{ duration: 0.6, ease: suave }}
          >
            <Mono className="mundo__nota-mono" ancho={40} />
            <TypewriterOnScroll className="texto-mano" text={mundo.secreto} speed={26} delay={300} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {finalAbierto && (
          <motion.aside
            className="mundo__nota mundo__nota--final"
            aria-labelledby="mundo-final-titulo"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, transition: { duration: 0.3 } }}
            transition={{ duration: 0.9, ease: suave }}
          >
            <Mono className="mundo__nota-mono" ancho={44} />
            <h2 id="mundo-final-titulo" className="titulo-display">{mundo.final.titulo}</h2>
            <TypewriterOnScroll text={mundo.final.texto} speed={26} delay={700} />
            <p className="texto-mano mundo__nota-firma">{mundo.final.firma}</p>
            <button type="button" className="boton-suave" onClick={() => setFinalAbierto(false)}>
              ♡ {general.cerrar}
            </button>
          </motion.aside>
        )}
      </AnimatePresence>
    </Contenido>
  )
}
