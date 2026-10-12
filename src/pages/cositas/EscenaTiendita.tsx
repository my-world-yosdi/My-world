import { Mono, Corazon, Flor } from '../../components/decor/Adornos'
import { Particulas } from '../../components/decor/Particulas'
import { Personaje } from '../../components/personajes/Personaje'

/** Tiendita de dulces: pared de cuadritos vichy, toldo a rayas con ondas, moños colgando y un estante con encaje. */
export function EscenaTiendita() {
  return (
    <div className="escenario escena-tiendita">
      <div className="escena-tiendita__pared" />
      <div className="escena-tiendita__luz" />
      <Particulas cantidad={12} modo="flota" semilla={33} tipos={['corazon', 'flor', 'corazon']} tamano={[14, 30]} colores={['#F7A9C6', '#fff', '#F28AAE', '#E9DDFB']} />

      <div className="escena-tiendita__colgantes">
        {[8, 22, 78, 92].map((x, i) => (
          <span key={x} className="escena-tiendita__colgante mecerse" style={{ left: `${x}%`, animationDelay: `${-i * 1.4}s`, height: `${[70, 110, 96, 64][i]}px` }}>
            {i % 2 === 0 ? <Mono ancho={44} /> : <Corazon ancho={30} color="#F28AAE" contorno />}
          </span>
        ))}
      </div>

      <div className="escena-tiendita__toldo">
        <div className="escena-tiendita__toldo-tela" />
      </div>

      <div className="escena-tiendita__estante">
        <div className="escena-tiendita__tabla" />
        <div className="encaje escena-tiendita__encaje" />
        <Flor className="escena-tiendita__maceta-flor escena-tiendita__maceta-flor--1" color="#FFC2D6" contorno />
        <Flor className="escena-tiendita__maceta-flor escena-tiendita__maceta-flor--2" color="#E9DDFB" contorno />
      </div>

      <div className="escena-tiendita__kitty">
        <Personaje id="kitty" />
      </div>
    </div>
  )
}
