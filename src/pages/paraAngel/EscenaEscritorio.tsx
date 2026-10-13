import { Guirnalda, Mono, Flor } from '../../components/decor/Adornos'
import { Particulas } from '../../components/decor/Particulas'

/** Escritorio de cartitas: papel tapiz a rayitas con corazones, encaje, guirnalda y una mesa con blonda. */
export function EscenaEscritorio() {
  return (
    <div className="escenario escena-escritorio">
      <div className="escena-escritorio__pared" />
      <div className="escena-escritorio__luz" />
      <div className="encaje escena-escritorio__encaje" />
      <Guirnalda className="escena-escritorio__guirnalda" patron={['perla', 'perla', 'flor', 'perla', 'perla', 'corazon']} caida={18} />
      <Mono className="escena-escritorio__mono escena-escritorio__mono--izq mecerse" ancho={46} color="#F7A9C6" />
      <Mono className="escena-escritorio__mono escena-escritorio__mono--der mecerse" ancho={46} color="#F7A9C6" />

      <Particulas cantidad={7} modo="flota" semilla={520} tipos={['corazon', 'corazon', 'flor']} tamano={[12, 22]} colores={['#F7A9C6', '#fff', '#F28AAE']} zona={[18, 70]} />

      <div className="escena-escritorio__mesa">
        <div className="encaje escena-escritorio__blonda" />
      </div>
      <Flor className="escena-escritorio__flor escena-escritorio__flor--1" color="#FFC2D6" contorno />
      <Flor className="escena-escritorio__flor escena-escritorio__flor--2" color="#E9DDFB" contorno />
    </div>
  )
}
