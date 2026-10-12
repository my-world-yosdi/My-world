/**
 * ♡ IMÁGENES DE LOS PERSONAJES ♡
 *
 * 1. Copia tus imágenes (PNG con fondo transparente, idealmente cuadradas)
 *    en la carpeta `public/assets/sanrio/`.
 * 2. Escribe la ruta en `imagen`, por ejemplo: imagen: '/assets/sanrio/my-melody.png'
 *
 * Mientras `imagen` esté vacío se dibuja una ilustración provisional.
 * Si una imagen no carga, también se vuelve a la ilustración provisional,
 * así que nunca aparecerán imágenes rotas.
 */

export type PersonajeId =
  | 'melody'
  | 'piano'
  | 'flat'
  | 'kitty'
  | 'cinnamoroll'
  | 'twinStars'

type Personaje = {
  nombre: string
  imagen?: string
}

export const personajes: Record<PersonajeId, Personaje> = {
  melody: { nombre: 'My Melody', imagen: undefined }, // '/assets/sanrio/my-melody.png'
  piano: { nombre: 'My Sweet Piano', imagen: undefined }, // '/assets/sanrio/my-sweet-piano.png'
  flat: { nombre: 'Flat', imagen: undefined }, // '/assets/sanrio/flat.png'
  kitty: { nombre: 'Hello Kitty', imagen: undefined }, // '/assets/sanrio/hello-kitty.png'
  cinnamoroll: { nombre: 'Cinnamoroll', imagen: undefined }, // '/assets/sanrio/cinnamoroll.png'
  twinStars: { nombre: 'Little Twin Stars', imagen: undefined }, // '/assets/sanrio/little-twin-stars.png'
}
