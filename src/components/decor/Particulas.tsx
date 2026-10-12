import type { CSSProperties } from 'react'
import { crearAleatorio, entre } from '../../lib/aleatorio'
import { Corazon, Destello, Estrella, Flor, Mariposa } from './Adornos'

export type TipoAdorno = 'corazon' | 'destello' | 'estrella' | 'flor' | 'mariposa' | 'petalo'

export function AdornoPorTipo({ tipo, color, className }: { tipo: TipoAdorno; color?: string; className?: string }) {
  if (tipo === 'corazon') return <Corazon color={color} className={className} />
  if (tipo === 'estrella') return <Estrella color={color} className={className} />
  if (tipo === 'flor') return <Flor color={color} className={className} />
  if (tipo === 'mariposa') return <Mariposa color={color} className={className} />
  if (tipo === 'petalo')
    return (
      <svg viewBox="0 0 40 52" className={className} aria-hidden="true" focusable="false" style={{ color }}>
        <path d="M20 2 C 34 10, 40 30, 30 44 C 26 50, 14 50, 10 44 C 0 30, 6 10, 20 2 Z" fill="currentColor" />
        <path d="M20 8 C 18 20, 18 32, 20 44" fill="none" stroke="#fff" strokeWidth="2" opacity=".45" strokeLinecap="round" />
      </svg>
    )
  return <Destello color={color} className={className} />
}

type Props = {
  cantidad?: number
  tipos?: TipoAdorno[]
  colores?: string[]
  semilla?: number
  /** sube: flotan hacia arriba · cae: caen como pétalos · titila: brillan en su sitio · flota: se mecen en su sitio */
  modo?: 'sube' | 'cae' | 'titila' | 'flota'
  tamano?: [number, number]
  /** Limita la zona vertical (en %) donde aparecen; útil para cielos. */
  zona?: [number, number]
  className?: string
}

/**
 * Capa de adornos animados solo con CSS (transform + opacity), muy liviana.
 * Con "reducir movimiento" activado, quedan quietos.
 */
export function Particulas({
  cantidad = 14,
  tipos = ['corazon', 'destello'],
  colores = ['#F7A9C6', '#fff', '#F28AAE', '#E9DDFB'],
  semilla = 7,
  modo = 'sube',
  tamano = [10, 26],
  zona = [0, 100],
  className,
}: Props) {
  const azar = crearAleatorio(semilla)
  const piezas = Array.from({ length: cantidad }, (_, i) => {
    const dur = modo === 'sube' || modo === 'cae' ? entre(azar, 16, 30) : entre(azar, 3, 7)
    return {
      i,
      tipo: tipos[Math.floor(azar() * tipos.length)],
      color: colores[Math.floor(azar() * colores.length)],
      estilo: {
        '--x': `${entre(azar, 2, 96).toFixed(2)}%`,
        '--y': `${entre(azar, zona[0], zona[1]).toFixed(2)}%`,
        '--t': `${entre(azar, tamano[0], tamano[1]).toFixed(1)}px`,
        '--dur': `${dur.toFixed(2)}s`,
        '--delay': `${(-azar() * dur).toFixed(2)}s`,
        '--deriva': `${entre(azar, -60, 60).toFixed(0)}px`,
        '--giro': `${entre(azar, -160, 160).toFixed(0)}deg`,
        '--op': entre(azar, 0.45, 0.95).toFixed(2),
      } as CSSProperties,
    }
  })

  return (
    <div className={`particulas particulas--${modo} ${className ?? ''}`} aria-hidden="true">
      {piezas.map((p) => (
        <span key={p.i} className="particula" style={p.estilo}>
          <AdornoPorTipo tipo={p.tipo} color={p.color} />
        </span>
      ))}
    </div>
  )
}
