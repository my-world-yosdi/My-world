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

/**
 * ♡ CANCIÓN DE CADA CARTA ♡
 *
 * Suena desde YouTube cuando ella abre la carta y se apaga suave cuando la guarda.
 * - youtube: el link del video (tal cual se copia del navegador)
 * - desde / hasta: el pedacito que suena, en 'minutos:segundos'. Al llegar a `hasta` vuelve a `desde`.
 * - volumen: de 0 a 100
 *
 * Mientras `youtube` esté vacío, la carta se abre sin música.
 */
export type MusicaCarta = { youtube?: string; desde: string; hasta?: string; volumen: number }

export const musicaCartas: Record<'cartita' | 'especial', MusicaCarta> = {
  cartita: { youtube: 'https://www.youtube.com/watch?v=J9frHbSh1Sg', desde: '1:18', hasta: '2:15', volumen: 60 },
  especial: { youtube: 'https://www.youtube.com/watch?v=mGUjVbsYG6E', desde: '2:15', hasta: '3:15', volumen: 60 },
}
