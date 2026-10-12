import { Guirnalda, Mariposa, Nube, Destello } from '../../components/decor/Adornos'
import { Colinas } from '../../components/decor/Colinas'
import { CapaParallax } from '../../components/decor/CapaParallax'
import { Particulas } from '../../components/decor/Particulas'
import type { Parallax } from '../../hooks/useParallax'

/** Cielo de algodón: rayos de sol, nubes en tres profundidades, colinas floridas y guirnalda de perlas. */
export function EscenaInicio({ parallax }: { parallax: Parallax }) {
  return (
    <div className="escenario escena-inicio">
      <div className="escena-inicio__cielo" />
      <div className="escena-inicio__rayos" />
      <div className="escena-inicio__patron" />

      <CapaParallax parallax={parallax} profundidad={-8} className="escena-inicio__capa">
        <Nube className="escena-inicio__nube escena-inicio__nube--1 flotar flotar--lento" />
        <Nube className="escena-inicio__nube escena-inicio__nube--2 flotar flotar--lento" />
        <Nube className="escena-inicio__nube escena-inicio__nube--3 flotar flotar--lento" />
        <Destello className="escena-inicio__brillo escena-inicio__brillo--1" />
        <Destello className="escena-inicio__brillo escena-inicio__brillo--2" color="#FFE08A" />
        <Destello className="escena-inicio__brillo escena-inicio__brillo--3" />
      </CapaParallax>

      <Particulas cantidad={16} semilla={11} tipos={['corazon', 'destello', 'corazon', 'flor']} />

      <CapaParallax parallax={parallax} profundidad={6} className="escena-inicio__capa">
        <Colinas className="escena-inicio__colinas" />
      </CapaParallax>

      <CapaParallax parallax={parallax} profundidad={22} className="escena-inicio__capa">
        <Mariposa className="escena-inicio__mariposa escena-inicio__mariposa--1" color="#D9CCF2" />
        <Mariposa className="escena-inicio__mariposa escena-inicio__mariposa--2" color="#F7A9C6" />
        <Nube className="escena-inicio__nube escena-inicio__nube--frente-1" />
        <Nube className="escena-inicio__nube escena-inicio__nube--frente-2" />
      </CapaParallax>

      <Guirnalda className="escena-inicio__guirnalda" />
    </div>
  )
}
