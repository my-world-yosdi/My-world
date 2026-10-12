import { Guirnalda, Mono, Nube, Corazon, LINEA } from '../../components/decor/Adornos'
import { Particulas } from '../../components/decor/Particulas'
import { Personaje } from '../../components/personajes/Personaje'

/** Habitación rosita: papel tapiz a rayas, ventana con cortinas, cuadro ovalado, zócalo y luz cálida. */
export function EscenaHabitacion() {
  return (
    <div className="escenario escena-cuarto">
      <div className="escena-cuarto__pared" />
      <div className="escena-cuarto__luz" />

      <div className="escena-cuarto__moldura">
        <div className="encaje escena-cuarto__moldura-encaje" />
      </div>
      <Guirnalda className="escena-cuarto__guirnalda" patron={['corazon', 'perla', 'perla', 'flor', 'perla', 'perla']} />

      {/* Ventana */}
      <div className="escena-cuarto__ventana">
        <div className="escena-cuarto__vidrio">
          <Nube className="escena-cuarto__nube escena-cuarto__nube--1" />
          <Nube className="escena-cuarto__nube escena-cuarto__nube--2" />
          <span className="escena-cuarto__cinna flotar">
            <Personaje id="cinnamoroll" />
          </span>
        </div>
        <span className="escena-cuarto__cortina escena-cuarto__cortina--izq" />
        <span className="escena-cuarto__cortina escena-cuarto__cortina--der" />
        <Mono className="escena-cuarto__lazo escena-cuarto__lazo--izq" ancho={40} />
        <Mono className="escena-cuarto__lazo escena-cuarto__lazo--der" ancho={40} />
        <span className="escena-cuarto__repisa" />
      </div>

      {/* Cuadro */}
      <div className="escena-cuarto__cuadro mecerse">
        <svg viewBox="0 0 120 150" aria-hidden="true">
          <ellipse cx="60" cy="78" rx="54" ry="68" fill="#F7A9C6" stroke={LINEA} strokeWidth="3" />
          <ellipse cx="60" cy="78" rx="44" ry="58" fill="#FFF8F1" stroke="#fff" strokeWidth="3" />
          <path d="M60 104 C 40 90, 32 80, 32 70 C 32 62, 38 56, 45 56 C 51 56, 56 60, 60 66 C 64 60, 69 56, 75 56 C 82 56, 88 62, 88 70 C 88 80, 80 90, 60 104 Z" fill="#F28AAE" />
          <path d="M60 10 L60 -10" stroke="#E9A3B9" strokeWidth="2" />
        </svg>
        <Mono className="escena-cuarto__cuadro-mono" ancho={42} />
      </div>

      <Corazon className="escena-cuarto__corazon-pared escena-cuarto__corazon-pared--1" color="#fff" />
      <Corazon className="escena-cuarto__corazon-pared escena-cuarto__corazon-pared--2" color="#F7A9C6" />

      {/* Zócalo y piso */}
      <div className="escena-cuarto__zocalo" />
      <div className="escena-cuarto__piso" />
      <div className="escena-cuarto__alfombra" />

      <Particulas cantidad={12} modo="titila" semilla={91} tipos={['destello']} colores={['#fff', '#FFE08A']} tamano={[8, 16]} zona={[20, 80]} />
    </div>
  )
}
