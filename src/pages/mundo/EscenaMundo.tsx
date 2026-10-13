import { CapaParallax } from '../../components/decor/CapaParallax'
import { recurso } from '../../lib/recurso'
import type { Parallax } from '../../hooks/useParallax'

/** Pradera primaveral con Hello Kitty y sus amigos: la ilustración de fondo con un velo suave y la franja de abajo desenfocada para que el mapa se lea encima. */
export function EscenaMundo({ parallax }: { parallax: Parallax }) {
  return (
    <div className="escenario escena-mundo">
      <CapaParallax parallax={parallax} profundidad={-6} className="escena-mundo__capa">
        <img className="escena-mundo__fondo" src={recurso('/assets/fondos/mundo-pradera.webp')} alt="" decoding="async" fetchPriority="high" />
      </CapaParallax>
      <div className="escena-mundo__velo" />
      <div className="escena-mundo__desenfoque" />
    </div>
  )
}
