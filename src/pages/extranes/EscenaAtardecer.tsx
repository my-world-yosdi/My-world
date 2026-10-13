import { Nube } from '../../components/decor/Adornos'
import { Colinas } from '../../components/decor/Colinas'
import { Particulas } from '../../components/decor/Particulas'
import { CapaParallax } from '../../components/decor/CapaParallax'
import { useParallax } from '../../hooks/useParallax'
import { Personaje } from '../../components/personajes/Personaje'

/** Atardecer de algodón: sol bajito, nubes grandes que pasan, globitos de corazón y Cinnamoroll volando. */
export function EscenaAtardecer() {
  const parallax = useParallax()
  return (
    <div className="escenario escena-tarde">
      <div className="escena-tarde__cielo" />
      <CapaParallax parallax={parallax} profundidad={-10}>
        <div className="escena-tarde__sol" />
        <Particulas cantidad={8} modo="titila" semilla={13} tipos={['destello']} colores={['#fff']} zona={[4, 30]} tamano={[8, 14]} />
      </CapaParallax>

      <CapaParallax parallax={parallax} profundidad={-5}>
        <div className="escena-tarde__nubes">
          <Nube className="escena-tarde__nube escena-tarde__nube--1 derivar" />
          <Nube className="escena-tarde__nube escena-tarde__nube--2 derivar" />
          <Nube className="escena-tarde__nube escena-tarde__nube--3 derivar" />
          <Nube className="escena-tarde__nube escena-tarde__nube--4 derivar" />
        </div>
      </CapaParallax>

      <CapaParallax parallax={parallax} profundidad={14}>
        <Particulas cantidad={9} semilla={404} tipos={['corazon']} tamano={[18, 38]} colores={['#F28AAE', '#F7A9C6', '#E25C7A', '#D9CCF2']} className="escena-tarde__globos" />
        <span className="escena-tarde__cinna">
          <Personaje id="cinnamoroll" />
        </span>
      </CapaParallax>

      <Colinas className="escena-tarde__colinas" colores={['#EBC8E6', '#F3BCD3', '#FAD2E1']} semilla={8} />
      <CapaParallax parallax={parallax} profundidad={24}>
        <Nube className="escena-tarde__nube-frente escena-tarde__nube-frente--1" />
        <Nube className="escena-tarde__nube-frente escena-tarde__nube-frente--2" />
      </CapaParallax>
    </div>
  )
}
