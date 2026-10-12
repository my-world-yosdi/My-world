import { useEffect, useRef, type RefObject } from 'react'

const ENFOCABLES = 'button:not([disabled]), [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'

/**
 * Comportamiento accesible de una ventana emergente:
 * enfoca su primer botón, mantiene el Tab adentro, cierra con Escape,
 * bloquea el scroll de fondo y devuelve el foco al cerrar.
 */
export function useDialogo(activo: boolean, alCerrar: () => void, ref: RefObject<HTMLElement | null>) {
  const cerrarRef = useRef(alCerrar)
  useEffect(() => {
    cerrarRef.current = alCerrar
  })

  useEffect(() => {
    if (!activo) return
    const previo = document.activeElement as HTMLElement | null
    const enfocables = () =>
      ref.current ? Array.from(ref.current.querySelectorAll<HTMLElement>(ENFOCABLES)) : []

    const temporizador = window.setTimeout(() => {
      const primero = ref.current?.querySelector<HTMLElement>('[data-foco-inicial]') ?? enfocables()[0] ?? ref.current
      primero?.focus({ preventScroll: true })
    }, 60)

    const alTeclear = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        cerrarRef.current()
        return
      }
      if (e.key !== 'Tab') return
      const lista = enfocables()
      if (lista.length === 0) return
      const primero = lista[0]
      const ultimo = lista[lista.length - 1]
      if (e.shiftKey && document.activeElement === primero) {
        e.preventDefault()
        ultimo.focus()
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault()
        primero.focus()
      }
    }

    document.addEventListener('keydown', alTeclear)
    const overflowPrevio = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      window.clearTimeout(temporizador)
      document.removeEventListener('keydown', alTeclear)
      document.body.style.overflow = overflowPrevio
      if (previo && document.contains(previo)) previo.focus({ preventScroll: true })
    }
  }, [activo, ref])
}
