/**
 * Ilustraciones provisionales de los personajes, dibujadas a mano en SVG.
 * Se muestran solo mientras no haya una imagen configurada en `src/data/personajes.ts`.
 *
 * Reglas de estilo para que se parezcan al dibujo original de Sanrio y convivan bien:
 * - cabeza grande y ancha (más ancha que alta), cuerpo pequeño;
 * - ojos: óvalos negros pequeños, verticales y bien separados, a media altura de la cara;
 * - mismo contorno marrón ciruela y mismo grosor en todos;
 * - rellenos planos con un solo brillo suave.
 */
import type { SVGProps } from 'react'
import { LINEA } from '../decor/Adornos'

type P = SVGProps<SVGSVGElement>

const trazo = {
  stroke: LINEA,
  strokeWidth: 3,
  strokeLinejoin: 'round' as const,
  strokeLinecap: 'round' as const,
}

/** Ojitos ovalados con un brillo pequeño. */
function Ojos({ x1, x2, y, rx = 4.2, ry = 5.8, color = LINEA }: { x1: number; x2: number; y: number; rx?: number; ry?: number; color?: string }) {
  return (
    <g>
      <ellipse cx={x1} cy={y} rx={rx} ry={ry} fill={color} />
      <ellipse cx={x2} cy={y} rx={rx} ry={ry} fill={color} />
      <ellipse cx={x1 - rx * 0.3} cy={y - ry * 0.42} rx={rx * 0.34} ry={ry * 0.26} fill="#fff" />
      <ellipse cx={x2 - rx * 0.3} cy={y - ry * 0.42} rx={rx * 0.34} ry={ry * 0.26} fill="#fff" />
    </g>
  )
}

function Rubor({ x1, x2, y, rx = 9, ry = 5, color = '#FF9EBE' }: { x1: number; x2: number; y: number; rx?: number; ry?: number; color?: string }) {
  return (
    <g fill={color} opacity=".42">
      <ellipse cx={x1} cy={y} rx={rx} ry={ry} />
      <ellipse cx={x2} cy={y} rx={rx} ry={ry} />
    </g>
  )
}

/** Forma esponjosa: varias bolitas con un solo contorno exterior. */
function Esponjoso({ bolitas, relleno, grosor = 3 }: { bolitas: [number, number, number][]; relleno: string; grosor?: number }) {
  return (
    <g>
      <g fill={LINEA}>
        {bolitas.map(([x, y, r], i) => (
          <circle key={`c${i}`} cx={x} cy={y} r={r + grosor} />
        ))}
      </g>
      <g fill={relleno}>
        {bolitas.map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} />
        ))}
      </g>
    </g>
  )
}

/** Florecita de cinco pétalos con centro amarillo. */
function Florecita({ x, y, r = 7, petalo = '#FFD3E2' }: { x: number; y: number; r?: number; petalo?: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx="0" cy={-r} rx={r * 0.72} ry={r * 0.95} fill={petalo} stroke={LINEA} strokeWidth="2" transform={`rotate(${a})`} />
      ))}
      <circle r={r * 0.58} fill="#F8CF4F" stroke={LINEA} strokeWidth="1.8" />
    </g>
  )
}

/* ♡ My Melody ----------------------------------------------------------
   Capucha rosada con dos orejas largas y redondeadas, carita blanca ancha,
   ojitos separados, naricita amarilla y la florecita junto a la oreja. */
export function MelodyIlustracion(props: P) {
  const rosa = '#F6A5C2'
  const rosaClaro = '#FCD3E2'
  return (
    <svg viewBox="0 0 200 200" {...props}>
      {/* orejas */}
      <g {...trazo} fill={rosa}>
        <path d="M60 88 C 45 66, 42 28, 55 12 C 64 2, 80 6, 85 24 C 90 44, 89 68, 87 86 Z" />
        <path d="M140 88 C 155 66, 158 28, 145 12 C 136 2, 120 6, 115 24 C 110 44, 111 68, 113 86 Z" />
      </g>
      <g fill={rosaClaro}>
        <path d="M65 76 C 57 58, 55 34, 62 22 C 67 15, 75 19, 77 32 C 79 47, 78 63, 76 76 Z" />
        <path d="M135 76 C 143 58, 145 34, 138 22 C 133 15, 125 19, 123 32 C 121 47, 122 63, 124 76 Z" />
      </g>

      {/* cuerpito */}
      <g {...trazo}>
        <path d="M67 150 C 62 176, 75 194, 100 194 C 125 194, 138 176, 133 150 Z" fill={rosa} />
        <ellipse cx="66" cy="168" rx="10" ry="11.5" fill="#fff" />
        <ellipse cx="134" cy="168" rx="10" ry="11.5" fill="#fff" />
        <ellipse cx="85" cy="192" rx="13" ry="6.5" fill="#fff" />
        <ellipse cx="115" cy="192" rx="13" ry="6.5" fill="#fff" />
      </g>

      {/* capucha */}
      <path
        d="M100 58 C 146 58, 170 90, 170 122 C 170 154, 142 170, 100 170 C 58 170, 30 154, 30 122 C 30 90, 54 58, 100 58 Z"
        fill={rosa}
        {...trazo}
      />
      <path d="M50 92 C 58 76, 74 66, 92 64" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity=".45" />

      {/* carita */}
      <path
        d="M100 84 C 133 84, 154 103, 154 127 C 154 150, 132 163, 100 163 C 68 163, 46 150, 46 127 C 46 103, 67 84, 100 84 Z"
        fill="#FFFEFB"
        {...trazo}
      />
      <Ojos x1={80} x2={120} y={126} rx={4.3} ry={6} />
      <ellipse cx="100" cy="137" rx="6" ry="4.3" fill="#F8CF4F" stroke={LINEA} strokeWidth="2.2" />
      <Rubor x1={69} x2={131} y={141} rx={8.5} ry={4.6} />

      {/* florecita */}
      <Florecita x={146} y={78} r={7.5} />
    </svg>
  )
}

/* ♡ Hello Kitty --------------------------------------------------------
   Cabeza muy ancha, orejitas en las esquinas, moño rojo en la oreja izquierda,
   ojos separados, nariz amarilla, tres bigotes por lado y sin boca. */
export function KittyIlustracion(props: P) {
  return (
    <svg viewBox="0 0 200 200" {...props}>
      {/* cuerpito */}
      <g {...trazo}>
        <path d="M70 150 C 65 176, 76 192, 100 192 C 124 192, 135 176, 130 150 Z" fill="#F6A5C2" />
        <path d="M84 150 L 100 160 L 116 150 Z" fill="#fff" />
        <ellipse cx="66" cy="164" rx="10" ry="11.5" fill="#fff" />
        <ellipse cx="134" cy="164" rx="10" ry="11.5" fill="#fff" />
        <ellipse cx="86" cy="191" rx="13" ry="6.5" fill="#fff" />
        <ellipse cx="114" cy="191" rx="13" ry="6.5" fill="#fff" />
      </g>
      {/* orejas */}
      <g {...trazo} fill="#fff">
        <path d="M38 98 C 32 72, 36 48, 48 41 C 58 36, 76 50, 90 64 Z" />
        <path d="M162 98 C 168 72, 164 48, 152 41 C 142 36, 124 50, 110 64 Z" />
      </g>
      {/* cabeza */}
      <ellipse cx="100" cy="108" rx="70" ry="52" fill="#fff" {...trazo} />
      <Ojos x1={72} x2={128} y={112} rx={4.6} ry={6.4} />
      <ellipse cx="100" cy="124" rx="7" ry="4.8" fill="#F8CF4F" stroke={LINEA} strokeWidth="2.2" />
      <g stroke={LINEA} strokeWidth="2.6" strokeLinecap="round">
        <path d="M20 104 L 46 110 M18 120 L 46 120 M22 136 L 47 130" />
        <path d="M180 104 L 154 110 M182 120 L 154 120 M178 136 L 153 130" />
      </g>
      {/* moño */}
      <g {...trazo} fill="#E23A55">
        <path d="M141 58 C 128 40, 108 46, 113 63 C 116 74, 131 72, 141 63 Z" />
        <path d="M149 58 C 160 40, 182 46, 178 63 C 175 76, 158 72, 149 63 Z" />
        <ellipse cx="145" cy="60" rx="8" ry="9" />
      </g>
      <path d="M118 52 Q 124 46, 131 49" stroke="#fff" strokeWidth="2.6" fill="none" strokeLinecap="round" opacity=".55" />
    </svg>
  )
}

/* ♡ Cinnamoroll --------------------------------------------------------
   Perrito blanco de cabeza ancha, orejas largas que caen hacia los lados,
   ojitos azules, cachetes rosados y colita enrollada como rollo de canela. */
export function CinnamorollIlustracion(props: P) {
  return (
    <svg viewBox="0 0 200 200" {...props}>
      <g {...trazo}>
        {/* colita */}
        <circle cx="146" cy="168" r="14" fill="#fff" />
        <path d="M146 168 m -5 0 a 5 5 0 1 1 5 5 a 9.5 9.5 0 1 1 9.5 -9.5" fill="none" strokeWidth="2.2" />
        {/* cuerpito */}
        <path d="M74 142 C 68 172, 78 190, 100 190 C 122 190, 132 172, 126 142 Z" fill="#fff" />
        <ellipse cx="86" cy="190" rx="11" ry="5.5" fill="#fff" />
        <ellipse cx="114" cy="190" rx="11" ry="5.5" fill="#fff" />
        <ellipse cx="72" cy="158" rx="8.5" ry="10.5" fill="#fff" />
        <ellipse cx="128" cy="158" rx="8.5" ry="10.5" fill="#fff" />
        {/* cabeza */}
        <ellipse cx="100" cy="100" rx="60" ry="47" fill="#fff" />
        {/* orejas largas */}
        <path d="M68 64 C 38 54, 6 66, 5 92 C 4 112, 22 120, 37 110 C 50 101, 58 84, 68 64 Z" fill="#fff" />
        <path d="M132 64 C 162 54, 194 66, 195 92 C 196 112, 178 120, 163 110 C 150 101, 142 84, 132 64 Z" fill="#fff" />
      </g>
      <g fill="#E4EEFF">
        <path d="M14 98 C 16 84, 30 74, 46 74 C 38 86, 32 100, 22 108 Z" />
        <path d="M186 98 C 184 84, 170 74, 154 74 C 162 86, 168 100, 178 108 Z" />
      </g>
      <Ojos x1={80} x2={120} y={103} rx={5.2} ry={6.4} color="#3F78D0" />
      <path d="M93 117 Q 96.5 121.5, 100 117 Q 103.5 121.5, 107 117" fill="none" stroke={LINEA} strokeWidth="2.3" strokeLinecap="round" />
      <Rubor x1={66} x2={134} y={116} rx={8} ry={4.6} />
    </svg>
  )
}

/* ♡ My Sweet Piano -----------------------------------------------------
   Ovejita de lana rosadita esponjosa, carita blanca y cuernitos enrollados. */
export function PianoIlustracion(props: P) {
  const lana = '#FBD0DF'
  const rosa = '#F29AB9'
  return (
    <svg viewBox="0 0 200 200" {...props}>
      <g {...trazo} fill="#fff">
        <ellipse cx="82" cy="191" rx="10" ry="5.5" />
        <ellipse cx="118" cy="191" rx="10" ry="5.5" />
      </g>
      <Esponjoso
        relleno={lana}
        bolitas={[[100, 164, 24], [78, 160, 16], [122, 160, 16], [84, 178, 13], [116, 178, 13], [100, 182, 13]]}
      />
      <Esponjoso
        relleno={lana}
        bolitas={[
          [100, 64, 20], [76, 72, 19], [124, 72, 19], [58, 94, 17], [142, 94, 17],
          [58, 120, 17], [142, 120, 17], [78, 138, 17], [122, 138, 17], [100, 144, 17], [100, 104, 46],
        ]}
      />
      {/* cuernitos enrollados */}
      <g {...trazo} fill={rosa}>
        <circle cx="46" cy="100" r="13" />
        <circle cx="154" cy="100" r="13" />
      </g>
      <g fill="none" stroke={LINEA} strokeWidth="2.1" strokeLinecap="round">
        <path d="M46 100 m -4.5 0 a 4.5 4.5 0 1 1 4.5 4.5 a 7.5 7.5 0 1 1 7.5 -7.5" />
        <path d="M154 100 m 4.5 0 a 4.5 4.5 0 1 0 -4.5 4.5 a 7.5 7.5 0 1 0 -7.5 -7.5" />
      </g>
      {/* carita */}
      <ellipse cx="100" cy="112" rx="35" ry="28" fill="#FFFDFB" {...trazo} strokeWidth={2.6} />
      <Ojos x1={86} x2={114} y={110} rx={3.8} ry={5.2} />
      <ellipse cx="100" cy="121" rx="4.4" ry="3.2" fill={rosa} />
      <Rubor x1={77} x2={123} y={122} rx={7} ry={4} />
      <ellipse cx="84" cy="62" rx="10" ry="5" fill="#fff" opacity=".6" />
    </svg>
  )
}

/* ♡ Flat ---------------------------------------------------------------
   Ratoncito azul, amigo de My Melody: orejas redondas grandes y hociquito claro. */
export function FlatIlustracion(props: P) {
  const azul = '#93BEEF'
  return (
    <svg viewBox="0 0 200 200" {...props}>
      <path d="M132 178 C 158 184, 170 162, 160 152 C 152 144, 142 154, 152 160" fill="none" stroke={LINEA} strokeWidth="3" strokeLinecap="round" />
      <g {...trazo}>
        <path d="M74 144 C 68 172, 78 190, 100 190 C 122 190, 132 172, 126 144 Z" fill={azul} />
        <ellipse cx="86" cy="190" rx="11" ry="5.5" fill="#F6B3CC" />
        <ellipse cx="114" cy="190" rx="11" ry="5.5" fill="#F6B3CC" />
        <ellipse cx="72" cy="158" rx="8.5" ry="10.5" fill={azul} />
        <ellipse cx="128" cy="158" rx="8.5" ry="10.5" fill={azul} />
        <circle cx="58" cy="62" r="29" fill={azul} />
        <circle cx="142" cy="62" r="29" fill={azul} />
      </g>
      <ellipse cx="100" cy="168" rx="15" ry="13" fill="#E6F1FF" />
      <circle cx="58" cy="62" r="18" fill="#D8E8FC" />
      <circle cx="142" cy="62" r="18" fill="#D8E8FC" />
      <g {...trazo}>
        <ellipse cx="100" cy="106" rx="56" ry="44" fill={azul} />
        <ellipse cx="100" cy="122" rx="28" ry="19" fill="#EEF5FF" />
      </g>
      <Ojos x1={80} x2={120} y={104} rx={4.3} ry={6} />
      <ellipse cx="100" cy="116" rx="5.5" ry="4.2" fill="#F48FB1" stroke={LINEA} strokeWidth="2" />
      <g stroke={LINEA} strokeWidth="2" strokeLinecap="round" opacity=".75">
        <path d="M62 116 L 78 118 M62 126 L 78 124 M138 116 L 122 118 M138 126 L 122 124" />
      </g>
      <Rubor x1={68} x2={132} y={120} rx={7} ry={4} />
      <ellipse cx="70" cy="80" rx="10" ry="5" fill="#fff" opacity=".45" transform="rotate(-25 70 80)" />
    </svg>
  )
}

/* ♡ Little Twin Stars ---------------------------------------------------
   Kiki (pelo azul corto) y Lala (pelo rosado largo) sobre una nubecita,
   cada uno con su estrella; Lala con su varita. */
export function TwinStarsIlustracion(props: P) {
  const piel = '#FFF3E9'
  const estrella = 'M0 -12 L3.5 -4 L12 -3.7 L5.5 2 L7.5 10.5 L0 6 L-7.5 10.5 L-5.5 2 L-12 -3.7 L-3.5 -4 Z'
  return (
    <svg viewBox="0 0 200 200" {...props}>
      <Esponjoso relleno="#fff" bolitas={[[38, 182, 15], [68, 176, 20], [100, 180, 18], [132, 176, 20], [162, 182, 15]]} />
      {/* Lala: pelo largo detrás */}
      <path d="M110 80 C 100 114, 104 150, 116 164 L 170 164 C 184 150, 186 114, 176 80 Z" fill="#F8B9D4" {...trazo} />
      {/* cuerpitos con vestido de estrella */}
      <g {...trazo}>
        <path d="M46 124 L 32 168 Q 62 176 92 168 L 78 124 Z" fill="#FFF6CF" />
        <path d="M126 124 L 112 168 Q 142 176 172 168 L 158 124 Z" fill="#FFE6F1" />
      </g>
      {/* Kiki */}
      <g {...trazo}>
        <circle cx="62" cy="98" r="31" fill={piel} />
        <path d="M31 98 C 28 66, 50 58, 64 62 C 82 60, 98 74, 92 98 C 86 84, 76 80, 66 86 C 56 78, 42 82, 31 98 Z" fill="#9EBEF3" />
      </g>
      <Ojos x1={51} x2={73} y={108} rx={3.5} ry={4.8} />
      <Rubor x1={44} x2={80} y={116} rx={6} ry={3.5} />
      {/* Lala */}
      <g {...trazo}>
        <circle cx="143" cy="98" r="31" fill={piel} />
        <path d="M112 98 C 108 66, 130 56, 145 60 C 164 58, 180 72, 174 100 C 166 86, 156 82, 143 88 C 132 80, 118 84, 112 98 Z" fill="#F8B9D4" />
      </g>
      <Ojos x1={132} x2={154} y={108} rx={3.5} ry={4.8} />
      <Rubor x1={125} x2={161} y={116} rx={6} ry={3.5} />
      {/* estrellitas y varita */}
      <path d="M176 142 L 166 168" stroke={LINEA} strokeWidth="3" strokeLinecap="round" />
      <g fill="#FFE08A" stroke={LINEA} strokeWidth="2.2" strokeLinejoin="round">
        <path d={estrella} transform="translate(84 66) scale(1.05)" />
        <path d={estrella} transform="translate(126 62) scale(1.05)" />
        <path d={estrella} transform="translate(180 132) scale(.9)" />
      </g>
    </svg>
  )
}
