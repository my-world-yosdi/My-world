import { useId } from 'react'
import { motion } from 'motion/react'
import { APODO_MAXIMO, cartaParaAngel } from '../../data/mensajes'
import { Corazon } from '../../components/decor/Adornos'

type Props = {
  valor: string
  alCambiar: (apodo: string) => void
  error?: string
  deshabilitado?: boolean
}

const textos = cartaParaAngel.apodo

/** Campo "¿Cómo quieres llamarme?" con sugerencias rápidas. */
export function SelectorApodo({ valor, alCambiar, error, deshabilitado }: Props) {
  const id = useId()
  const restantes = APODO_MAXIMO - valor.length
  return (
    <div className="cpa-apodo">
      <label className="cpa-campo__etiqueta" htmlFor={`${id}-apodo`}>
        {textos.etiqueta}
      </label>
      <div className="cpa-apodo__fila">
        <input
          id={`${id}-apodo`}
          className="cpa-apodo__input"
          type="text"
          name="apodo"
          value={valor}
          maxLength={APODO_MAXIMO}
          autoComplete="off"
          spellCheck={false}
          disabled={deshabilitado}
          aria-invalid={error ? true : undefined}
          aria-describedby={`${id}-ayuda`}
          onChange={(e) => alCambiar(e.target.value)}
        />
        <span id={`${id}-ayuda`} className={`cpa-apodo__ayuda ${error ? 'es-error' : ''}`} aria-live="polite">
          {error ?? textos.ayuda(restantes)}
        </span>
      </div>

      <div className="cpa-apodo__sugerencias" role="group" aria-label={textos.sugerenciasEtiqueta}>
        {textos.sugerencias.map((sugerencia) => {
          const activa = valor.trim() === sugerencia
          return (
            <motion.button
              key={sugerencia}
              type="button"
              className={`cpa-chip ${activa ? 'esta-activa' : ''}`}
              aria-pressed={activa}
              disabled={deshabilitado}
              onClick={() => alCambiar(sugerencia)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.94 }}
              transition={{ type: 'spring', stiffness: 420, damping: 26 }}
            >
              <Corazon className="cpa-chip__corazon" ancho={11} color={activa ? '#fff' : '#F28AAE'} />
              {sugerencia}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
