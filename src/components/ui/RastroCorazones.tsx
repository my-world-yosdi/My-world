import { useEffect } from 'react'
import { RUTA_CORAZON } from '../decor/Adornos'

const INTERACTIVOS = 'a, button, input, textarea, select, label, [role="button"], [role="dialog"]'
const COLORES = ['#F28AAE', '#F7A9C6', '#E25C7A', '#D9CCF2']

/**
 * Pequeña sorpresa: al tocar cualquier parte vacía de la página brota un corazoncito.
 * Se hace directo en el DOM (sin estado de React) para que no cueste nada.
 */
export function RastroCorazones() {
  useEffect(() => {
    const reducir = window.matchMedia('(prefers-reduced-motion: reduce)')
    let vivos = 0

    const alTocar = (e: PointerEvent) => {
      if (reducir.matches || vivos > 12) return
      if ((e.target as Element).closest?.(INTERACTIVOS)) return
      vivos++
      const color = COLORES[Math.floor(Math.random() * COLORES.length)]
      const nodo = document.createElement('span')
      nodo.className = 'rastro-corazon'
      nodo.style.left = `${e.clientX}px`
      nodo.style.top = `${e.clientY}px`
      nodo.style.setProperty('--deriva', `${(Math.random() - 0.5) * 40}px`)
      nodo.innerHTML = `<svg viewBox="0 0 100 95" width="18" aria-hidden="true"><path d="${RUTA_CORAZON}" fill="${color}"/></svg>`
      document.body.appendChild(nodo)
      nodo.addEventListener(
        'animationend',
        () => {
          nodo.remove()
          vivos--
        },
        { once: true },
      )
    }

    document.addEventListener('pointerdown', alTocar)
    return () => document.removeEventListener('pointerdown', alTocar)
  }, [])

  return null
}
