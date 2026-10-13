# My-world ♡

Un pequeño mundo coquette hecho por Ángel para Yosdi, con My Melody y sus amigos de Sanrio.

## Comandos

```bash
npm install
npm run dev       # desarrollo en http://localhost:5173
npm run build     # versión final en dist/
npm run preview   # ver la versión final
npm run lint
```

## Qué editar

| Quiero cambiar…                         | Archivo                         |
| --------------------------------------- | ------------------------------- |
| Nombres, textos, mensajes, carta, notas | `src/data/mensajes.ts`          |
| Imágenes de los personajes              | `src/data/personajes.ts` + `public/assets/sanrio/` |
| Fotos del álbum                         | `recuerditos.fotos` en `src/data/mensajes.ts` + `public/assets/fotos/` |
| Música opcional                         | `src/data/musica.ts` + `public/assets/musica/` |

Cada carpeta de `public/assets` tiene un `LEEME.md` con los nombres de archivo sugeridos.
Mientras falte una imagen se muestra una ilustración provisional, nunca una imagen rota.

## Páginas

| Ruta                  | Escenario                                   |
| --------------------- | ------------------------------------------- |
| `/`                   | Portada: cielo de algodón y marco de perlas |
| `/mundo`              | Mapa del mundito con sus cinco lugares      |
| `/cositas-de-ti`      | Tiendita de dulces con el frasco de corazones |
| `/recuerditos`        | Álbum scrapbook con visor de fotos          |
| `/cartita`            | Habitación con el sobre y la carta          |
| `/regalito`           | Teatrito con la caja de regalo              |
| `/cuando-me-extranes` | Tendedero de sobrecitos al atardecer        |
| `/carta-para-angel`   | Escritorio de cartitas: Yosdi le escribe a Ángel (correo + aviso por WhatsApp) |

**Buzón de cartitas:** la configuración de Formspree, WhatsApp, Turnstile y Vercel está en [`notificador/README.md`](notificador/README.md). Las variables públicas van en `.env.local` (guía: `.env.example`); las privadas, solo en Vercel.

## Estructura

```
src/
  data/          textos, personajes y música (lo único que hace falta editar)
  components/
    decor/       moños, corazones, nubes, guirnaldas, partículas, colinas…
    personajes/  <Personaje> con su ilustración provisional
    ui/          botones, menú, transiciones, máquina de escribir, inclinación 3D
  pages/         una carpeta por página, cada una con su escenario y estilos
  styles/        tokens de color, tipografías y estilos compartidos
```

## Publicar

Cada `git push` a `main` vuelve a publicarlo solo (workflow en `.github/workflows/deploy.yml`).
Para fotos, imágenes y música escribe las rutas como `/assets/...`; el prefijo `/My-world/` se agrega automáticamente.
