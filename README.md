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

Está en Vercel: **cada `git push` a `main` lo publica solo** (el repo está conectado al proyecto `my-world`).
El workflow de GitHub Pages (`.github/workflows/deploy.yml`) está desactivado.
Para fotos, imágenes y música escribe las rutas como `/assets/...`.

### Primera vez en otra computadora

```bash
git clone https://github.com/Einyehl322/My-world.git
cd My-world
npm install
npm run preparar   # una sola vez: firma los commits como Einyehl322
npm run dev
```

`npm run preparar` es necesario porque en el plan gratis Vercel solo publica commits cuyo autor es el dueño del repo.
Si se salta, el `git push` sube igual pero el deploy en Vercel queda **bloqueado**. Solo cambia la configuración de este repo, no la global.
No hace falta `vercel login`, `vercel link` ni copiar ningún `.env.local`: el buzón ya trae su ID público de Formspree.
