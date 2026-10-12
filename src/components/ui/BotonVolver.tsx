import { Link } from 'react-router'
import { general } from '../../data/mensajes'
import { precargar, rutas } from '../../rutas'
import { Corazon, Mono } from '../decor/Adornos'

/** Botón coquette fijo arriba a la izquierda para regresar al mapa. */
export function BotonVolver() {
  return (
    <Link
      to={rutas.mundo}
      className="boton-volver"
      onPointerEnter={() => precargar(rutas.mundo)}
      onFocus={() => precargar(rutas.mundo)}
    >
      <span className="boton-volver__flecha" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="16">
          <path d="M15 5 L8 12 L15 19" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="boton-volver__texto">{general.volverAlMundo}</span>
      <Corazon className="boton-volver__corazon" ancho={14} color="#E25C7A" />
      <Mono className="boton-volver__mono" ancho={30} />
    </Link>
  )
}
