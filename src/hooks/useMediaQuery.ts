import { useSyncExternalStore } from 'react'

export function useMediaQuery(consulta: string) {
  return useSyncExternalStore(
    (avisar) => {
      const mq = window.matchMedia(consulta)
      mq.addEventListener('change', avisar)
      return () => mq.removeEventListener('change', avisar)
    },
    () => window.matchMedia(consulta).matches,
    () => false,
  )
}
