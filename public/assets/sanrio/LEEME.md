# Imágenes de los personajes de Sanrio

Pon aquí las imágenes de los personajes (PNG con fondo transparente, idealmente cuadradas, ~600×600 px).

Nombres sugeridos:

| Personaje         | Archivo                 |
| ----------------- | ----------------------- |
| My Melody (portada) | `my-melody-hero.png`  |
| My Melody         | `my-melody.png`         |
| My Sweet Piano    | `my-sweet-piano.png`    |
| Flat              | `flat.png`              |
| Hello Kitty (portada) | `hello-kitty-hero.png` |
| Hello Kitty       | `hello-kitty.png`       |
| Cinnamoroll       | `cinnamoroll.png`       |
| Little Twin Stars | `little-twin-stars.png` |

Después abre `src/data/personajes.ts` y escribe la ruta en `imagen`, por ejemplo:

```ts
melody: { nombre: 'My Melody', imagen: '/assets/sanrio/my-melody.png' },
```

Mientras no haya imagen (o si alguna no carga), se muestra la ilustración provisional,
así que nunca aparecerá una imagen rota.
