/**
 * ♡ MY-WORLD · TODOS LOS NOMBRES Y TEXTOS VIVEN AQUÍ ♡
 *
 * Puedes cambiar cualquier frase sin tocar los componentes.
 * - Cambia los nombres en `nombres` y se actualizan en toda la página.
 * - Las listas (cositas, fotos, sobres, párrafos) aceptan más o menos elementos.
 * - El símbolo ♡ se puede quitar o mover a donde quieras.
 * - Las fotos se ponen en `public/assets/fotos/` y se enlazan en `recuerditos.fotos`.
 */

export const nombres = {
  ella: 'Yosdi',
  el: 'Ángel',
  proyecto: 'My-world',
}

const { ella, el } = nombres

/* ------------------------------------------------------------------ */
/* General                                                            */
/* ------------------------------------------------------------------ */

export const general = {
  tituloPestana: `${nombres.proyecto} · para ${ella} ♡`,
  saltarAlContenido: 'Saltar al contenido',
  volverAlMundo: 'Volver al mundito',
  cerrar: 'Cerrar',
  cargando: 'Un segundito…',
  firma: `Con mucho cariño, ${el} ♡`,
  musica: {
    poner: 'Poner musiquita',
    pausar: 'Pausar la musiquita',
  },
}

/** Nombres de cada página: se usan en el menú, el mapa y los títulos. */
export const paginas = {
  mundo: {
    titulo: 'Eres mi mundo',
    corto: 'Eres mi mundo',
    descripcion: 'El mapita con todo',
  },
  cositas: {
    titulo: 'Cositas que me gustan de ti',
    corto: 'Cositas de ti',
    descripcion: 'Un frasquito lleno de cosas que me gustan de ti',
  },
  recuerditos: {
    titulo: 'Cuando estoy contigo todo es mejor',
    corto: 'Recuerditos',
    descripcion: 'Fotos que me gusta volver a ver',
  },
  cartita: {
    titulo: 'Una cartita para ti',
    corto: 'Una cartita',
    descripcion: 'Te escribí algo. Es cortito, lo prometo',
  },
  regalito: {
    titulo: 'Abre un regalito',
    corto: 'Un regalito',
    descripcion: 'Hay algo esperándote en la cajita',
  },
  especial: {
    titulo: 'Algo que quiero vivir contigo ♡',
    corto: 'Una cartita especial ♡',
    descripcion: 'Esta es más personal. Léela con calma',
  },
  paraAngel: {
    titulo: `Una cartita para ${el} ♡`,
    corto: `Escríbele a ${el}`,
    descripcion: 'Un rinconcito para que me escribas',
  },
  extranes: {
    titulo: 'Para cuando me extrañes',
    corto: 'Cuando me extrañes',
    descripcion: 'Sobrecitos para abrir cuando quieras',
  },
} as const

export const navegacion = {
  abrir: 'Abrir el menú',
  cerrar: 'Cerrar el menú',
  boton: 'Menú',
  titulo: '¿A dónde vamos?',
  portada: 'Volver a la portada',
}

/* ------------------------------------------------------------------ */
/* Portada  ·  /                                                      */
/* ------------------------------------------------------------------ */

export const inicio = {
  antetitulo: 'Un pedacito de mi mundo',
  tituloInicio: 'Para ti, mi linda',
  tituloNombre: `${ella} ♡`,
  subtitulo:
    'Hice este pequeño mundo como para cuando lo veas, recuerdes lo mucho que te quiero y pienso en ti.',
  boton: 'Entra, hay cositas para ti ♡',
  pista: 'Psst… si tocas a los personajes, te saludan',
  firma: `Hecho a ratitos por ${el}, solo para ${ella}`,
  /** Lo que dice cada personaje cuando lo tocan en la portada. */
  saludos: {
    melody: `¡Hola, ${ella}! Te estábamos esperando.`,
    kitty: `¡Hola, ${ella}! Melody y yo te preparamos todo esto.`,
    cinnamoroll: 'Vine volando apenas supe que llegabas.',
    twinStars: 'Pide un deseo, total no cuesta nada.',
    piano: 'Meee… digo, ¡hola!',
    flat: `${el} nos pidió que te cuidáramos.`,
  },
}

/* ------------------------------------------------------------------ */
/* Mapa / menú principal  ·  /mundo                                    */
/* ------------------------------------------------------------------ */

export const mundo = {
  antetitulo: `bienvenida, ${ella}`,
  subtitulo: 'Hay algunas cositas que quiero enseñarte. Empieza por donde quieras.',
  melodyDice: '¿Por dónde empezamos?',
  kittyDice: '¡Todo esto es para ti!',
  entrar: 'Entrar',
  visitado: 'ya pasaste por aquí',
  secretoEtiqueta: 'Un corazoncito escondido',
  secreto: `Lo encontraste, ${ella}. No tiene premio, solo quería decirte que me encanta lo curiosa que eres.`,
  /** Aparece cuando ya visitó todas las páginas. */
  final: {
    titulo: `Ya lo viste todo, ${ella}`,
    texto:
      'Gracias por pasear por aquí. Puedes volver cuando quieras, este lugarcito es tuyo.',
    firma: general.firma,
  },
}

/* ------------------------------------------------------------------ */
/* Cositas que me gustan de ti  ·  /cositas-de-ti                      */
/* ------------------------------------------------------------------ */

export const cositas = {
  antetitulo: 'el frasquito de las',
  intro: 'Las fui guardando aquí para que no se me olviden. Toca un corazón y saca una.',
  etiquetaFrasco: 'cositas',
  etiquetaPara: `de ${ella}`,
  progreso: (vistas: number, total: number) => `${vistas} de ${total}`,
  progresoLargo: (vistas: number, total: number) => `Llevas ${vistas} de ${total} cositas`,
  abrirCorazon: (n: number) => `Sacar la cosita número ${n}`,
  guardar: 'Guardar en el frasco',
  otra: 'Sacar otra',
  numero: (n: number) => `cosita n.º ${n}`,
  lista: [
    'Me gusta escucharte contarme cómo estuvo tu día, incluso cuando dices que no pasó nada.',
    'A veces me acuerdo de algo que dijiste y me río solo.',
    'Me gusta que contigo puedo hablar de cualquier tontería y pasarla bien.',
    'Hay días normales que terminan siendo bonitos solo porque hablamos.',
    'Me gusta mucho más de ti de lo que suelo decirte.',
    'Me gusta cómo te ríes cuando algo te da demasiada risa y ya no puedes parar.',
    'Me gusta que contigo no tengo que hacerme el interesante. Puedo ser yo nomás.',
    `Me gusta cómo suena tu nombre, ${ella}. No sé, me gusta y ya.`,
  ],
  final: {
    titulo: 'Las sacaste todas',
    texto:
      'Bueno, todas las que entraron. Quedan un montón afuera, pero esas te las digo en persona.',
  },
}

/* ------------------------------------------------------------------ */
/* Cuando estoy contigo todo es mejor  ·  /recuerditos                 */
/* ------------------------------------------------------------------ */

export type Recuerdo = {
  /**
   * Ruta de la foto dentro de `public`, por ejemplo '/assets/fotos/01.jpg'.
   * Mientras sea `undefined` se muestra un marquito de ejemplo.
   */
  foto?: string
  /**
   * Opcional: qué parte de la foto se ve en la miniatura cuadrada del álbum, como en CSS
   * ('50% 20%' = centrada y hacia arriba). Al abrirla, la foto se ve completa.
   */
  encuadre?: string
  titulo: string
  /** Opcional: si lo dejas vacío, no se muestra. */
  fecha?: string
  texto: string
}

export const recuerditos = {
  antetitulo: 'nuestro álbum',
  intro: 'Hay momentos que parecen pequeños, pero que a mí me gusta recordar.',
  pista: 'Toca una foto para verla de cerquita',
  pistaGirar: 'Arrastra la foto para darle la vuelta ↻',
  placeholderFoto: 'aquí va una foto',
  verFoto: (titulo: string) => `Ver la foto: ${titulo}`,
  anterior: 'Foto anterior',
  siguiente: 'Foto siguiente',
  contador: (actual: number, total: number) => `${actual} de ${total}`,
  fotos: [
    {
      foto: '/assets/fotos/01-wafles.webp',
      titulo: 'Los wafles',
      fecha: '',
      texto: `El día que fuimos a comer wafles. La verdad no me terminaron de encantar los wafles, pero tuve la mejor compañía. Te quiero mucho, mi linda ${ella} ♡`,
    },
    {
      foto: '/assets/fotos/02-pantuflas.webp',
      encuadre: '50% 78%',
      titulo: 'Día hermoso',
      fecha: '',
      texto:
        'Me encantó este día, fue muy bonito: comimos, caminamos, nos besamos mucho, te compré cositas y, al final de todo, los zapatos se te dañaron y tuvimos que caminar todo el Jockey para buscarte unas pantuflas. Te quiero, mujer hermosa ♡',
    },
    { foto: '/assets/fotos/03-nosotros.webp', encuadre: '50% 12%', titulo: 'Nosotros', fecha: '', texto: 'Una foto de nosotros bastante casual, pero no deja de encantarme.' },
    {
      foto: '/assets/fotos/04-espejo.webp',
      encuadre: '50% 34%',
      titulo: 'Otra más',
      fecha: '',
      // Texto largo: los párrafos se separan con una línea en blanco
      texto: [
        `Esto es de mí para ti, de tu más grande admirador, del chico que está obsesionado con tu personalidad, tu físico y tu hermoso corazón.`,
        `Quiero que sepas lo muchísimo que aprecio cada momento que paso contigo. Sé que las cosas a veces pueden ser complicadas y que no todo tiene que ser perfecto, mi amor, pero lo importante es que siempre estamos ahí el uno para el otro. Estoy muy seguro de que a nosotros nos va a ir muy bien.`,
        `Estoy tan emocionado por todo lo que se nos viene: muchas aventuras, muchos viajes, muchas experiencias y momentos inolvidables. Todo eso quiero vivirlo contigo, mi amor.`,
        `Y quiero que sepas algo más: cuando pienso en mi futuro, siempre me imagino contigo. Quiero casarme contigo algún día, verte vestida de novia y saber que estamos comenzando una nueva etapa de nuestras vidas. Sueño con que tengamos una familia hermosa y numerosa, con muchos hijitos, un hogar lleno de amor. Me emociona muchísimo imaginar todo eso a tu lado, porque realmente eres la persona con la que quiero construir mi futuro.`,
        `Sé que todavía tenemos muchas cosas por vivir y aprender juntos, pero tengo muchísimas ganas de descubrir todo lo que nos espera. No necesito que todo sea perfecto, mi amor, solo quiero que sigamos eligiéndonos y estando el uno para el otro.`,
        `Realmente, lo que siento por ti es muy sincero, y quiero que siempre lo tengas en cuenta.`,
        `Con muchísimo cariño, te escribo esto, mi hermosa ${ella}. ♡`,
        `De tu fiel admirador, que te quiere muchísimo.`,
      ].join('\n\n'),
    },
    { foto: undefined, titulo: 'Lo que falta', fecha: '', texto: 'Todavía nos faltan un montón de fotos para este álbum.' },
    { foto: undefined, titulo: 'Tú', fecha: '', texto: 'Esta la tengo guardada hace rato. Me gusta cómo sales.' },
  ] satisfies Recuerdo[],
}

/* ------------------------------------------------------------------ */
/* Una cartita para ti  ·  /cartita                                    */
/* ------------------------------------------------------------------ */

export const cartita = {
  pistaCerrada: 'Toca el sobre para abrirlo',
  pistaReleer: 'Ya sabes dónde está si la quieres volver a leer',
  etiquetaSobre: 'Abrir la cartita',
  sobreRemitente: `De ${el}, para ${ella}`,
  guardar: 'Guardar la cartita',
  saludo: `Hola, ${ella}.`,
  parrafos: [
    'No sabía muy bien cómo empezar esto, así que se me ocurrió hacerte una página.',
    'Quería que tuvieras un lugarcito donde guardar algunas de las cosas que siento por ti. Sé que a veces no soy el mejor encontrando las palabras, pero hay algo que sí tengo claro: me hace muy feliz tenerte en mi vida.',
    'Me gustan nuestros ratitos juntos, nuestras conversaciones y hasta esas pequeñas tonterías que terminan haciéndome sonreír.',
    'Espero que te guste este pequeño detalle. Lo hice pensando en ti.',
  ],
  despedida: 'Te quiero mucho. ♡',
  firma: el,
}

/* ------------------------------------------------------------------ */
/* Una cartita especial  ·  /carta-especial                            */
/* ------------------------------------------------------------------ */

export const cartaEspecial = {
  antetitulo: 'una cartita especial',
  etiquetaSobre: `Para ${ella}, de ${el}`,
  /** Foto pegada en la esquina de la carta, tipo polaroid. Sin `archivo`, vuelve la estampilla de Melody. */
  foto: { archivo: '/assets/fotos/carta-especial.webp', alt: `${ella} con su ramo de flores`, ver: 'Ver la foto en grande' },
  abrir: 'Abrir la cartita especial',
  pistaCerrada: 'Toca el sobre cuando estés lista ♡',
  pistaReleer: 'Puedes volver a abrirla las veces que quieras',
  guardar: 'Guardar la carta',
  volverAlMundo: 'Volver al mundito',
  titulo: 'Quién lo hubiera imaginado... ♡',
  parrafos: [
    'Me acuerdo de cuando te veía por fotos hace años. En ese entonces ni se me pasaba por la cabeza que algún día íbamos a estar juntos.',
    'A veces me pongo a pensar en eso y todavía se me hace un poco irreal. Antes solo te veía por Instagram y ahora eres alguien tan importante en mi vida. No sé, es bonito pensar en cómo terminaron pasando las cosas.',
    `${ella}, de verdad eres una chica maravillosa. Me encanta la persona que eres, tu manera de ser y esas pequeñas cosas tuyas que quizá ni te das cuenta de que me encantan. Me hace muy feliz tenerte conmigo y, sinceramente, me gusta mucho más mi vida desde que llegaste.`,
    'Y hay algo que quiero que sepas. Cuando pienso en mi futuro, me gusta imaginarte ahí. Me encantaría casarme contigo algún día, tener nuestros hijos y formar una familia juntos. Sé que todavía nos quedan muchas cosas por vivir, pero contigo me nace pensar en todo eso.',
    'Quién me hubiera dicho hace unos años que esa chica que veía en fotos terminaría siendo la persona con la que quiero compartir tantas cosas.',
    'Y ahora que te tengo en mi vida, solo quiero seguir viviendo momentos bonitos contigo.',
  ],
  /** Índice (desde 0) del párrafo que lleva la animación especial de corazones. */
  parrafoEspecial: 3,
  despedida: `Te quiero muchísimo, mi ${ella}. ♡`,
  firma: `— ${el}`,
}

/* ------------------------------------------------------------------ */
/* Abre un regalito  ·  /regalito                                      */
/* ------------------------------------------------------------------ */

export const regalito = {
  antetitulo: 'Una cosita más para ti, bonita',
  pista: 'Tócalo, es para ti',
  pistaAbierto: 'Lo puedes volver a envolver y abrir las veces que quieras',
  etiquetaAbrir: 'Abrir el regalo',
  etiquetaTarjeta: `para ${ella}`,
  /** Lo que dice Hello Kitty al salir de la caja. */
  personajeDice: '¡Sorpresa!',
  mensaje:
    'No es un regalo enorme, pero lo hice con mucho cariño. Espero haberte sacado una sonrisita ♡',
  firma: `— ${el}`,
  cerrar: 'Volver a envolverlo',
}

/* ------------------------------------------------------------------ */
/* Para cuando me extrañes  ·  /cuando-me-extranes                     */
/* ------------------------------------------------------------------ */

export const extranes = {
  intro: 'Para esos ratos en que no estamos juntos. Abre el que quieras, las veces que quieras.',
  abrir: (etiqueta: string) => `Abrir el sobre ${etiqueta}`,
  cerrarSobre: (etiqueta: string) => `Cerrar el sobre ${etiqueta}`,
  sobres: [
    { etiqueta: 'para ahora mismo', mensaje: 'Te mando un abracito desde aquí.' },
    { etiqueta: 'para un día largo', mensaje: 'Espero que hoy te esté yendo bonito.' },
    { etiqueta: 'para cuando estés aburrida', mensaje: 'Ojalá siempre pudiera estar a tu lado.' },
    { etiqueta: 'para antes de dormir', mensaje: 'Por si no te lo repetí 500 veces, quiero que sepas lo mucho que te quiero y te deseo.' },
    { etiqueta: 'para cuando quieras', mensaje: 'Me acordé de ti. Bueno, me pasa bastante seguido.' },
    { etiqueta: 'para un día pesado', mensaje: 'Si hoy fue pesado, descansa un rato. Después me cuentas todo.' },
  ],
  abrazo: {
    etiqueta: 'Corazón para mandarle un abrazo a ' + el,
    instruccion: 'Mantén presionado el corazón para mandarme un abrazo',
    cargando: 'Abrazando…',
    enviado: `Abrazo recibido, ${ella}. Te debo uno en persona.`,
    otraVez: 'Mandar otro',
  },
}

/* ------------------------------------------------------------------ */
/* Página no encontrada                                               */
/* ------------------------------------------------------------------ */

export const noEncontrado = {
  titulo: 'Uy, por aquí no hay nada',
  texto: `Creo que te perdiste un poquito, ${ella}. Ven, te llevo de vuelta.`,
  boton: 'Volver al mundito',
}

/* ------------------------------------------------------------------ */
/* Una cartita para Ángel  ·  /carta-para-angel                        */
/* ------------------------------------------------------------------ */

/** Apodo que aparece al entrar; ella puede cambiarlo libremente. */
export const APODO_INICIAL = el
export const APODO_MAXIMO = 30
export const CARTA_MAXIMO = 5000

export const cartaParaAngel = {
  antetitulo: 'tu escritorio de cartitas',
  /** El título queda: "Una cartita para [apodo] ♡" (el apodo y el corazón los pone la página). */
  tituloInicio: 'Una cartita para',
  subtitulo: `Este rinconcito es tuyo, ${ella}. Puedes escribirme lo que quieras, que me encantará leerte.`,
  apodo: {
    etiqueta: '¿Cómo quieres llamarme? ♡',
    sugerencias: ['Bebé', 'Amor', 'Amorcito', 'Angelito', 'Mi niño'],
    sugerenciasEtiqueta: 'Algunas ideas',
    ayuda: (restantes: number) => `Te quedan ${restantes} letras`,
    vacio: 'Escribe cómo quieres llamarme ♡',
  },
  mensaje: {
    etiqueta: 'Tu cartita',
    placeholder: (apodo: string) => `Hola, ${apodo}... ♡`,
    contador: (usados: number, maximo: number) => `${usados.toLocaleString('es-PE')} / ${maximo.toLocaleString('es-PE')}`,
    vacio: 'La cartita está vacía. Escríbeme algo, aunque sea cortito ♡',
    largo: (maximo: number) => `La cartita es muy larga: el máximo es ${maximo.toLocaleString('es-PE')} letras.`,
    borradorGuardado: 'Tu borrador se guarda solito en este navegador',
  },
  sobre: {
    para: 'Para:',
    de: `De: ${ella} 💗`,
  },
  boton: (apodo: string) => `Enviar a ${apodo} ♡`,
  enviando: 'Enviando tu cartita…',
  aviso: `Tu cartita le llega a ${el} por correo a través de Formspree, un servicio externo. Nadie más que él puede leerla.`,
  exito: {
    titulo: (apodo: string) => `Tu cartita para ${apodo} llegó correctamente ♡`,
    texto: 'Ya está en camino a su buzón. Gracias por escribirme.',
    otra: 'Escribir otra cartita',
  },
  error: {
    titulo: 'Uy, tu cartita no se pudo enviar',
    texto: 'No te preocupes: todo lo que escribiste sigue aquí. Inténtalo otra vez en un ratito.',
    sinConfigurar: 'El buzón todavía no está conectado. Tu cartita sigue aquí guardada.',
    sinConexion: 'Parece que no hay internet. Tu cartita sigue aquí guardada.',
    reintentar: 'Intentar de nuevo',
  },
  /** Asunto del correo que recibe Ángel. */
  asuntoCorreo: (apodo: string) => `💌 Nueva cartita de ${ella} para ${apodo}`,
}
