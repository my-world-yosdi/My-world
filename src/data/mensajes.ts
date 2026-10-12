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
    titulo: 'Nuestro pequeño mundo',
    corto: 'Nuestro mundito',
    descripcion: 'El mapita con todo',
  },
  cositas: {
    titulo: 'Cositas que me gustan de ti',
    corto: 'Cositas de ti',
    descripcion: 'Un frasquito lleno de cosas que me gustan de ti',
  },
  recuerditos: {
    titulo: 'Nuestros pequeños momentos ♡',
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
    kitty: 'Te guardamos el mejor sitio.',
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
  antetitulo: `bienvenida, ${ella}, a`,
  subtitulo: 'Hay algunas cositas que quiero enseñarte. Empieza por donde quieras.',
  melodyDice: '¿Por dónde empezamos?',
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
/* Nuestros pequeños momentos  ·  /recuerditos                         */
/* ------------------------------------------------------------------ */

export type Recuerdo = {
  /**
   * Ruta de la foto dentro de `public`, por ejemplo '/assets/fotos/01.jpg'.
   * Mientras sea `undefined` se muestra un marquito de ejemplo.
   */
  foto?: string
  titulo: string
  /** Opcional: si lo dejas vacío, no se muestra. */
  fecha?: string
  texto: string
}

export const recuerditos = {
  antetitulo: 'el álbum de',
  intro: 'Hay momentos que parecen pequeños, pero que a mí me gusta recordar.',
  pista: 'Toca una foto para verla de cerquita',
  placeholderFoto: 'aquí va una foto',
  verFoto: (titulo: string) => `Ver la foto: ${titulo}`,
  anterior: 'Foto anterior',
  siguiente: 'Foto siguiente',
  contador: (actual: number, total: number) => `${actual} de ${total}`,
  fotos: [
    { foto: undefined, titulo: 'Este día', fecha: '', texto: 'No sé si te acuerdas de este día, pero yo sí ♡' },
    { foto: undefined, titulo: 'Un ratito', fecha: '', texto: 'Me gusta mucho esta foto. Cada vez que la veo me dan ganas de volver a ese día.' },
    { foto: undefined, titulo: 'Nosotros', fecha: '', texto: 'Aquí salimos bonitos. Bueno, tú más.' },
    { foto: undefined, titulo: 'Tú', fecha: '', texto: 'Esta la tengo guardada hace rato. Me gusta cómo sales.' },
    { foto: undefined, titulo: 'Otra más', fecha: '', texto: 'Hay fotos que no son perfectas, pero son de mis favoritas igual.' },
    { foto: undefined, titulo: 'Lo que falta', fecha: '', texto: 'Todavía nos faltan un montón de fotos para este álbum.' },
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
/* Abre un regalito  ·  /regalito                                      */
/* ------------------------------------------------------------------ */

export const regalito = {
  antetitulo: 'Una cosita más para ti, bonita',
  pista: 'Tócalo, es para ti',
  pistaAbierto: 'Lo puedes volver a envolver y abrir las veces que quieras',
  etiquetaAbrir: 'Abrir el regalo',
  etiquetaTarjeta: `para ${ella}`,
  melodyDice: '¡Sorpresa!',
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
