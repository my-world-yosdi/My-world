/**
 * Convierte una ruta de `public` ('/assets/fotos/01.jpg') en la ruta real del sitio.
 * Así funciona igual en local ('/') y en GitHub Pages ('/My-world/').
 */
export function recurso(ruta: string) {
  if (!ruta.startsWith('/')) return ruta
  return import.meta.env.BASE_URL.replace(/\/$/, '') + ruta
}
