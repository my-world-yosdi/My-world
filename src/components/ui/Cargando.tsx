import { general } from '../../data/mensajes'
import { Corazon } from '../decor/Adornos'

export function Cargando() {
  return (
    <div className="cargando" role="status">
      <Corazon className="cargando__corazon" ancho={46} color="#F28AAE" />
      <span>{general.cargando}</span>
    </div>
  )
}
