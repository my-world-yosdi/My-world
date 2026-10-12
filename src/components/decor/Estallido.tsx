import { motion } from 'motion/react'
import { crearAleatorio, entre } from '../../lib/aleatorio'
import { AdornoPorTipo, type TipoAdorno } from './Particulas'

type Props = {
  /** Cambia este número para lanzar un nuevo estallido (0 = nada). */
  disparo: number
  cantidad?: number
  radio?: number
  tipos?: TipoAdorno[]
  colores?: string[]
  /** Ángulo central (grados, 0 = derecha, -90 = arriba) y apertura del abanico. */
  direccion?: number
  apertura?: number
  className?: string
}

/** Lluvia de corazones, estrellas y flores que sale desde el centro de su contenedor. */
export function Estallido({
  disparo,
  cantidad = 16,
  radio = 150,
  tipos = ['corazon', 'destello', 'estrella', 'flor'],
  colores = ['#F28AAE', '#FFC2D6', '#FFE08A', '#fff', '#D9CCF2', '#E25C7A'],
  direccion = -90,
  apertura = 360,
  className,
}: Props) {
  if (!disparo) return null
  const azar = crearAleatorio(disparo * 131 + cantidad)
  const piezas = Array.from({ length: cantidad }, (_, i) => {
    const angulo = ((direccion + (i / cantidad - 0.5) * apertura + entre(azar, -12, 12)) * Math.PI) / 180
    const distancia = radio * entre(azar, 0.55, 1.15)
    return {
      i,
      x: Math.cos(angulo) * distancia,
      y: Math.sin(angulo) * distancia,
      tam: entre(azar, 12, 26),
      giro: entre(azar, -200, 200),
      retraso: entre(azar, 0, 0.18),
      duracion: entre(azar, 1.3, 1.9),
      tipo: tipos[Math.floor(azar() * tipos.length)],
      color: colores[Math.floor(azar() * colores.length)],
    }
  })

  return (
    <div key={disparo} className={`estallido ${className ?? ''}`} aria-hidden="true">
      {piezas.map((p) => (
        <motion.span
          key={p.i}
          className="estallido__pieza"
          style={{ width: p.tam }}
          initial={{ x: 0, y: 0, scale: 0, opacity: 1, rotate: 0 }}
          animate={{
            x: p.x,
            y: [0, p.y, p.y + 40],
            scale: [0, 1.1, 0.7],
            opacity: [1, 1, 0],
            rotate: p.giro,
          }}
          transition={{ duration: p.duracion, delay: p.retraso, ease: [0.16, 0.84, 0.3, 1], times: [0, 0.6, 1] }}
        >
          <AdornoPorTipo tipo={p.tipo} color={p.color} />
        </motion.span>
      ))}
    </div>
  )
}
