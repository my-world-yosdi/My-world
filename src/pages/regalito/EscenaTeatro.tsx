import { Mono, LINEA } from '../../components/decor/Adornos'
import { Particulas } from '../../components/decor/Particulas'
import { CapaParallax } from '../../components/decor/CapaParallax'
import { useParallax } from '../../hooks/useParallax'
import { Personaje } from '../../components/personajes/Personaje'

/** Teatrito: cielo lavanda con estrellas, luna con las Little Twin Stars, telones de terciopelo y un foco. */
export function EscenaTeatro() {
  const parallax = useParallax()
  return (
    <div className="escenario escena-teatro">
      <div className="escena-teatro__cielo" />
      <CapaParallax parallax={parallax} profundidad={-10}>
        <Particulas cantidad={26} modo="titila" semilla={5} tipos={['estrella', 'destello', 'destello']} colores={['#FFE08A', '#fff', '#fff']} zona={[8, 62]} tamano={[8, 20]} />
      </CapaParallax>

      <CapaParallax parallax={parallax} profundidad={-6}>
        <div className="escena-teatro__luna flotar flotar--lento">
          <svg viewBox="0 0 120 120" aria-hidden="true">
            <defs>
              <mask id="luna-mascara">
                <rect width="120" height="120" fill="#fff" />
                <circle cx="78" cy="44" r="44" fill="#000" />
              </mask>
            </defs>
            <circle cx="56" cy="62" r="48" fill="#FFF3C7" mask="url(#luna-mascara)" stroke={LINEA} strokeWidth="3" />
            <circle cx="36" cy="82" r="5" fill="#F7E2A0" />
            <circle cx="24" cy="60" r="3.5" fill="#F7E2A0" />
          </svg>
          <span className="escena-teatro__gemelos">
            <Personaje id="twinStars" />
          </span>
        </div>
      </CapaParallax>

      <div className="escena-teatro__foco" />

      <div className="escena-teatro__piso">
        <div className="escena-teatro__tablas" />
        <div className="encaje escena-teatro__falda" />
      </div>

      <div className="escena-teatro__telon escena-teatro__telon--izq" />
      <div className="escena-teatro__telon escena-teatro__telon--der" />
      <Mono className="escena-teatro__amarre escena-teatro__amarre--izq" ancho={56} color="#F3CF7A" />
      <Mono className="escena-teatro__amarre escena-teatro__amarre--der" ancho={56} color="#F3CF7A" />

      <div className="escena-teatro__cenefa">
        <div className="escena-teatro__cenefa-tela" />
        <div className="escena-teatro__flecos" />
      </div>
    </div>
  )
}
