import { useEffect, useRef, useState, type ComponentType } from 'react'
import { NavLink } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import { navegacion, paginas } from '../../data/mensajes'
import { precargar, rutas } from '../../rutas'
import { Corazon, Estrella, Flor, Mariposa, Mono, Nube } from '../decor/Adornos'

type Icono = ComponentType<{ className?: string; ancho?: number; color?: string }>

const enlaces: { ruta: string; texto: string; Icono: Icono; color: string }[] = [
  { ruta: rutas.mundo, texto: paginas.mundo.corto, Icono: Nube, color: '#fff' },
  { ruta: rutas.cositas, texto: paginas.cositas.corto, Icono: Corazon, color: '#F28AAE' },
  { ruta: rutas.recuerditos, texto: paginas.recuerditos.corto, Icono: Flor, color: '#FFC2D6' },
  { ruta: rutas.cartita, texto: paginas.cartita.corto, Icono: Mariposa, color: '#C9B6F0' },
  { ruta: rutas.especial, texto: paginas.especial.corto, Icono: Corazon, color: '#E25C7A' },
  { ruta: rutas.regalito, texto: paginas.regalito.corto, Icono: Mono, color: '#E25C7A' },
  { ruta: rutas.extranes, texto: paginas.extranes.corto, Icono: Estrella, color: '#FFE08A' },
  { ruta: rutas.paraAngel, texto: paginas.paraAngel.corto, Icono: Flor, color: '#F7A9C6' },
]

const suave = [0.22, 0.8, 0.26, 1] as const

/** Menú pequeñito arriba a la derecha, disponible en todas las páginas interiores. */
export function MenuFlotante() {
  const [abierto, setAbierto] = useState(false)
  const botonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!abierto) return
    const alTeclear = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setAbierto(false)
        botonRef.current?.focus()
      }
    }
    const alTocarFuera = (e: PointerEvent) => {
      const objetivo = e.target as Node
      if (!panelRef.current?.contains(objetivo) && !botonRef.current?.contains(objetivo)) setAbierto(false)
    }
    document.addEventListener('keydown', alTeclear)
    document.addEventListener('pointerdown', alTocarFuera)
    return () => {
      document.removeEventListener('keydown', alTeclear)
      document.removeEventListener('pointerdown', alTocarFuera)
    }
  }, [abierto])

  return (
    <div className="menu-flotante">
      <button
        ref={botonRef}
        type="button"
        className={`menu-flotante__boton ${abierto ? 'esta-abierto' : ''}`}
        aria-expanded={abierto}
        aria-controls="menu-flotante-panel"
        aria-label={abierto ? navegacion.cerrar : navegacion.abrir}
        onClick={() => setAbierto((v) => !v)}
      >
        <Mono className="menu-flotante__mono" ancho={38} />
        <span className="menu-flotante__etiqueta">{navegacion.boton}</span>
      </button>

      <AnimatePresence>
        {abierto && (
          <motion.nav
            ref={panelRef}
            id="menu-flotante-panel"
            className="menu-flotante__panel"
            aria-label={navegacion.titulo}
            initial={{ opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: suave } }}
            exit={{ opacity: 0, y: -6, scale: 0.98, transition: { duration: 0.22 } }}
          >
            <p className="menu-flotante__titulo">{navegacion.titulo}</p>
            <ul>
              {enlaces.map(({ ruta, texto, Icono, color }, i) => (
                <motion.li
                  key={ruta}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: 0.05 + i * 0.04, duration: 0.35, ease: suave } }}
                >
                  <NavLink
                    to={ruta}
                    className="menu-flotante__enlace"
                    onClick={() => setAbierto(false)}
                    onPointerEnter={() => precargar(ruta)}
                    onFocus={() => precargar(ruta)}
                  >
                    <span className="menu-flotante__icono">
                      <Icono ancho={22} color={color} />
                    </span>
                    <span>{texto}</span>
                    <Corazon className="menu-flotante__activo" ancho={12} color="#E25C7A" />
                  </NavLink>
                </motion.li>
              ))}
            </ul>
            <NavLink to={rutas.inicio} className="menu-flotante__portada" onClick={() => setAbierto(false)}>
              {navegacion.portada}
            </NavLink>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  )
}
