import type { ButtonHTMLAttributes, ReactNode, Ref } from 'react'
import { Destello, Mono } from '../decor/Adornos'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variante?: 'crema' | 'rosa' | 'cereza'
  conMono?: boolean
  ref?: Ref<HTMLButtonElement>
}

/**
 * Botón coquette: pastilla con costura punteada, moño y destellos que aparecen al pasar el cursor.
 * Las animaciones viven en CSS (.boton-lazo) para que sean instantáneas y livianas.
 */
export function BotonLazo({ children, variante = 'crema', conMono = true, className, ref, ...resto }: Props) {
  return (
    <button ref={ref} type="button" className={`boton-lazo boton-lazo--${variante} ${className ?? ''}`} {...resto}>
      {conMono && <Mono className="boton-lazo__mono" ancho={34} />}
      <span className="boton-lazo__texto">{children}</span>
      <span className="boton-lazo__destellos" aria-hidden="true">
        <Destello className="boton-lazo__destello boton-lazo__destello--1" color="#fff" />
        <Destello className="boton-lazo__destello boton-lazo__destello--2" color="#FFE08A" />
        <Destello className="boton-lazo__destello boton-lazo__destello--3" color="#fff" />
      </span>
    </button>
  )
}
