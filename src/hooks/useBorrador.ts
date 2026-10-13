import { useEffect, useState } from 'react'

/**
 * Estado que se guarda solito en este navegador (localStorage), para que un borrador
 * no se pierda si ella recarga o se cae la conexión. Si el almacenamiento no está disponible,
 * funciona igual, solo que sin recordar.
 */
export function useBorrador(clave: string, inicial: string) {
  const [valor, setValor] = useState(() => {
    try {
      return window.localStorage.getItem(clave) ?? inicial
    } catch {
      return inicial
    }
  })

  useEffect(() => {
    const t = window.setTimeout(() => {
      try {
        window.localStorage.setItem(clave, valor)
      } catch {
        /* sin almacenamiento: no pasa nada */
      }
    }, 300)
    return () => window.clearTimeout(t)
  }, [clave, valor])

  const olvidar = () => {
    try {
      window.localStorage.removeItem(clave)
    } catch {
      /* sin almacenamiento */
    }
  }

  return [valor, setValor, olvidar] as const
}
