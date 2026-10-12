import { lazy } from 'react'

/** Rutas reales de cada página. */
export const rutas = {
  inicio: '/',
  mundo: '/mundo',
  cositas: '/cositas-de-ti',
  recuerditos: '/recuerditos',
  cartita: '/cartita',
  especial: '/carta-especial',
  regalito: '/regalito',
  extranes: '/cuando-me-extranes',
} as const

const cargadores = {
  [rutas.mundo]: () => import('./pages/mundo/Mundo'),
  [rutas.cositas]: () => import('./pages/cositas/CositasDeTi'),
  [rutas.recuerditos]: () => import('./pages/recuerditos/Recuerditos'),
  [rutas.cartita]: () => import('./pages/cartita/Cartita'),
  [rutas.especial]: () => import('./pages/especial/CartaEspecial'),
  [rutas.regalito]: () => import('./pages/regalito/Regalito'),
  [rutas.extranes]: () => import('./pages/extranes/CuandoMeExtranes'),
}

export const Mundo = lazy(cargadores[rutas.mundo])
export const CositasDeTi = lazy(cargadores[rutas.cositas])
export const Recuerditos = lazy(cargadores[rutas.recuerditos])
export const Cartita = lazy(cargadores[rutas.cartita])
export const CartaEspecial = lazy(cargadores[rutas.especial])
export const Regalito = lazy(cargadores[rutas.regalito])
export const CuandoMeExtranes = lazy(cargadores[rutas.extranes])

/** Descarga una página antes de que ella haga clic (al pasar el cursor o enfocar). */
export function precargar(ruta: string) {
  const cargar = cargadores[ruta as keyof typeof cargadores]
  if (cargar) void cargar()
}

/** Descarga todas las páginas cuando el navegador está libre. */
export function precargarTodo() {
  const tarea = () => Object.values(cargadores).forEach((cargar) => void cargar())
  if ('requestIdleCallback' in window) window.requestIdleCallback(tarea, { timeout: 4000 })
  else setTimeout(tarea, 2500)
}
