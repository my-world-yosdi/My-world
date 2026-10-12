/**
 * ♡ MÚSICA OPCIONAL ♡
 *
 * Copia un archivo de audio en `public/assets/musica/` y pon su ruta aquí,
 * por ejemplo: archivo: '/assets/musica/cancion.mp3'
 *
 * Mientras esté vacío, el botón de música no aparece.
 * Nunca se reproduce sola: solo suena cuando ella presiona el botón.
 */
export const musica: { archivo?: string; volumen: number } = {
  archivo: undefined,
  volumen: 0.4,
}
