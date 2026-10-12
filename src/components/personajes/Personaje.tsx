import { useState, type ComponentType, type CSSProperties, type SVGProps } from 'react'
import { personajes, type PersonajeId } from '../../data/personajes'
import { recurso } from '../../lib/recurso'
import {
  CinnamorollIlustracion,
  FlatIlustracion,
  KittyIlustracion,
  MelodyIlustracion,
  PianoIlustracion,
  TwinStarsIlustracion,
} from './Ilustraciones'

const ilustraciones: Record<PersonajeId, ComponentType<SVGProps<SVGSVGElement>>> = {
  melody: MelodyIlustracion,
  piano: PianoIlustracion,
  flat: FlatIlustracion,
  kitty: KittyIlustracion,
  cinnamoroll: CinnamorollIlustracion,
  twinStars: TwinStarsIlustracion,
}

type Props = {
  id: PersonajeId
  className?: string
  style?: CSSProperties
  /** Si es decorativo, los lectores de pantalla lo ignoran. */
  decorativo?: boolean
  /** Las imágenes de la portada se cargan de inmediato; el resto, de forma diferida. */
  prioridad?: boolean
}

/**
 * Muestra la imagen configurada del personaje o, si no hay (o falla), su ilustración provisional.
 */
export function Personaje({ id, className, style, decorativo = true, prioridad = false }: Props) {
  const datos = personajes[id]
  const [fallo, setFallo] = useState(false)
  const Ilustracion = ilustraciones[id]
  const clases = ['personaje', `personaje--${id}`, className].filter(Boolean).join(' ')

  if (datos.imagen && !fallo) {
    return (
      <img
        src={recurso(datos.imagen)}
        alt={decorativo ? '' : datos.nombre}
        className={clases}
        style={style}
        loading={prioridad ? 'eager' : 'lazy'}
        decoding="async"
        draggable={false}
        onError={() => setFallo(true)}
      />
    )
  }

  return (
    <Ilustracion
      className={clases}
      style={style}
      role={decorativo ? undefined : 'img'}
      aria-label={decorativo ? undefined : datos.nombre}
      aria-hidden={decorativo ? true : undefined}
      focusable="false"
    />
  )
}
