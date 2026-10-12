/**
 * Ilustraciones provisionales de los personajes, dibujadas a mano en SVG.
 * Se muestran solo mientras no haya una imagen configurada en `src/data/personajes.ts`.
 * Todas comparten el mismo contorno, grosor y paleta para que convivan bien.
 */
import type { SVGProps } from 'react'
import { LINEA } from '../decor/Adornos'

type P = SVGProps<SVGSVGElement>

const trazo = {
  stroke: LINEA,
  strokeWidth: 3.2,
  strokeLinejoin: 'round' as const,
  strokeLinecap: 'round' as const,
}

/** Ojitos ovalados con brillo. */
function Ojos({ x1, x2, y, rx = 4.2, ry = 5.8, color = LINEA }: { x1: number; x2: number; y: number; rx?: number; ry?: number; color?: string }) {
  return (
    <g>
      <ellipse cx={x1} cy={y} rx={rx} ry={ry} fill={color} />
      <ellipse cx={x2} cy={y} rx={rx} ry={ry} fill={color} />
      <circle cx={x1 - 1.2} cy={y - 2.2} r={1.4} fill="#fff" />
      <circle cx={x2 - 1.2} cy={y - 2.2} r={1.4} fill="#fff" />
    </g>
  )
}

function Rubor({ x1, x2, y, rx = 9, ry = 5 }: { x1: number; x2: number; y: number; rx?: number; ry?: number }) {
  return (
    <g fill="#FF8FB3" opacity=".45">
      <ellipse cx={x1} cy={y} rx={rx} ry={ry} />
      <ellipse cx={x2} cy={y} rx={rx} ry={ry} />
    </g>
  )
}

/** Forma esponjosa: varias bolitas con un solo contorno exterior. */
function Esponjoso({ bolitas, relleno, grosor = 3.2 }: { bolitas: [number, number, number][]; relleno: string; grosor?: number }) {
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

/* ♡ My Melody ---------------------------------------------------------- */
export function MelodyIlustracion(props: P) {
  const rosa = '#F7A9C6'
  return (
    <svg viewBox="0 0 200 200" {...props}>
      {/* orejas de la capucha */}
      <g {...trazo} fill={rosa}>
        <path d="M58 92 C 40 60, 44 14, 64 10 C 84 6, 90 50, 86 78 Z" />
        <path d="M142 92 C 160 60, 156 14, 136 10 C 116 6, 110 50, 114 78 Z" />
      </g>
      <g fill="#FDD3E3">
        <path d="M66 78 C 58 56, 60 26, 66 22 C 74 20, 78 48, 76 70 Z" />
        <path d="M134 78 C 142 56, 140 26, 134 22 C 126 20, 122 48, 124 70 Z" />
      </g>
      {/* cuerpo */}
      <g {...trazo}>
        <path d="M66 146 Q 100 134 134 146 L 142 180 Q 100 194 58 180 Z" fill={rosa} />
        <ellipse cx="60" cy="160" rx="10" ry="12" fill="#fff" />
        <ellipse cx="140" cy="160" rx="10" ry="12" fill="#fff" />
        <ellipse cx="84" cy="186" rx="14" ry="8" fill="#fff" />
        <ellipse cx="116" cy="186" rx="14" ry="8" fill="#fff" />
      </g>
      <path d="M100 172 C 92 165, 94 158, 100 162 C 106 158, 108 165, 100 172 Z" fill="#fff" />
      {/* capucha y carita */}
      <g {...trazo}>
        <ellipse cx="100" cy="110" rx="64" ry="52" fill={rosa} />
        <path d="M54 118 C 54 92, 74 80, 100 80 C 126 80, 146 92, 146 118 C 146 142, 126 154, 100 154 C 74 154, 54 142, 54 118 Z" fill="#FFFDF8" />
      </g>
      <ellipse cx="100" cy="88" rx="36" ry="5" fill="#FDE6EE" opacity=".8" />
      <Ojos x1={83} x2={117} y={120} />
      <ellipse cx="100" cy="131" rx="6.5" ry="4.5" fill="#F7C95A" stroke={LINEA} strokeWidth="2.4" />
      <Rubor x1={72} x2={128} y={133} />
      {/* florecita */}
      <g transform="translate(140 76)">
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse key={a} cx="0" cy="-8" rx="6" ry="8" fill="#FFE3EC" stroke={LINEA} strokeWidth="2.2" transform={`rotate(${a})`} />
        ))}
        <circle r="4.6" fill="#F7C95A" stroke={LINEA} strokeWidth="2" />
      </g>
      <ellipse cx="62" cy="96" rx="7" ry="12" fill="#fff" opacity=".35" transform="rotate(25 62 96)" />
    </svg>
  )
}

/* ♡ Hello Kitty -------------------------------------------------------- */
export function KittyIlustracion(props: P) {
  return (
    <svg viewBox="0 0 200 200" {...props}>
      <g {...trazo}>
        <path d="M66 146 Q 100 136 134 146 L 140 180 Q 100 192 60 180 Z" fill="#E85A74" />
        <ellipse cx="62" cy="158" rx="10" ry="12" fill="#fff" />
        <ellipse cx="138" cy="158" rx="10" ry="12" fill="#fff" />
        <ellipse cx="84" cy="186" rx="14" ry="8" fill="#fff" />
        <ellipse cx="116" cy="186" rx="14" ry="8" fill="#fff" />
        <path d="M80 144 L 100 154 L 120 144" fill="#fff" />
        {/* orejas */}
        <path d="M40 92 Q 34 42, 50 36 Q 62 34, 88 62 Z" fill="#fff" />
        <path d="M160 92 Q 166 42, 150 36 Q 138 34, 112 62 Z" fill="#fff" />
        {/* cabeza */}
        <ellipse cx="100" cy="104" rx="68" ry="50" fill="#fff" />
      </g>
      <path d="M50 52 Q 54 46, 62 50" stroke="#FCD3E1" strokeWidth="5" fill="none" strokeLinecap="round" />
      <Ojos x1={76} x2={124} y={110} rx={4.6} ry={6.4} />
      <ellipse cx="100" cy="122" rx="7.5" ry="5" fill="#F7C95A" stroke={LINEA} strokeWidth="2.4" />
      <g stroke={LINEA} strokeWidth="2.6" strokeLinecap="round">
        <path d="M30 104 L 54 110 M28 118 L 54 118 M32 132 L 55 126" />
        <path d="M170 104 L 146 110 M172 118 L 146 118 M168 132 L 145 126" />
      </g>
      <Rubor x1={66} x2={134} y={128} rx={8} ry={4} />
      {/* moño */}
      <g {...trazo} fill="#E0435E">
        <path d="M144 54 C 126 30, 110 44, 120 62 C 126 72, 138 66, 144 58 Z" />
        <path d="M150 58 C 162 74, 182 70, 180 52 C 178 34, 160 38, 150 54 Z" />
        <ellipse cx="147" cy="56" rx="9" ry="10" />
      </g>
      <path d="M124 48 Q 128 42, 136 44" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" opacity=".6" />
    </svg>
  )
}

/* ♡ Cinnamoroll -------------------------------------------------------- */
export function CinnamorollIlustracion(props: P) {
  return (
    <svg viewBox="0 0 200 200" {...props}>
      <g {...trazo}>
        {/* colita en espiral */}
        <circle cx="148" cy="168" r="15" fill="#fff" />
        <path d="M148 168 m -6 0 a 6 6 0 1 1 6 6 a 10 10 0 1 1 10 -10" fill="none" strokeWidth="2.4" />
        {/* cuerpo */}
        <path d="M70 138 Q 100 128 130 138 Q 138 172 122 184 Q 100 192 78 184 Q 62 172 70 138 Z" fill="#fff" />
        <ellipse cx="86" cy="188" rx="11" ry="6" fill="#fff" />
        <ellipse cx="114" cy="188" rx="11" ry="6" fill="#fff" />
        <ellipse cx="68" cy="156" rx="9" ry="11" fill="#fff" />
        <ellipse cx="132" cy="156" rx="9" ry="11" fill="#fff" />
        {/* cabeza */}
        <ellipse cx="100" cy="100" rx="62" ry="48" fill="#fff" />
        {/* orejas largas */}
        <path d="M62 72 C 26 62, 2 82, 6 108 C 10 128, 30 126, 44 112 C 52 102, 58 90, 62 72 Z" fill="#fff" />
        <path d="M138 72 C 174 62, 198 82, 194 108 C 190 128, 170 126, 156 112 C 148 102, 142 90, 138 72 Z" fill="#fff" />
      </g>
      <g fill="#E3EEFF" opacity=".9">
        <path d="M18 104 C 18 88, 34 78, 50 80 C 40 92, 34 108, 22 116 Z" />
        <path d="M182 104 C 182 88, 166 78, 150 80 C 160 92, 166 108, 178 116 Z" />
      </g>
      <Ojos x1={80} x2={120} y={104} rx={5} ry={6.5} color="#4F7FD6" />
      <path d="M93 118 Q 96.5 123, 100 118 Q 103.5 123, 107 118" fill="none" stroke={LINEA} strokeWidth="2.4" strokeLinecap="round" />
      <Rubor x1={66} x2={134} y={118} />
      <ellipse cx="80" cy="66" rx="14" ry="5" fill="#fff" stroke="#EAF2FF" strokeWidth="2" />
    </svg>
  )
}

/* ♡ My Sweet Piano ----------------------------------------------------- */
export function PianoIlustracion(props: P) {
  const rosa = '#F6B3CC'
  return (
    <svg viewBox="0 0 200 200" {...props}>
      <g {...trazo} fill={rosa}>
        <ellipse cx="80" cy="190" rx="10" ry="6" />
        <ellipse cx="120" cy="190" rx="10" ry="6" />
      </g>
      <Esponjoso
        relleno="#fff"
        bolitas={[
          [100, 162, 26], [76, 158, 18], [124, 158, 18], [82, 178, 14], [118, 178, 14], [100, 182, 14],
        ]}
      />
      <Esponjoso
        relleno="#fff"
        bolitas={[
          [100, 66, 22], [74, 74, 20], [126, 74, 20], [58, 98, 18], [142, 98, 18],
          [62, 124, 18], [138, 124, 18], [82, 138, 18], [118, 138, 18], [100, 104, 46],
        ]}
      />
      {/* rizos rosados */}
      <Esponjoso relleno={rosa} grosor={2.8} bolitas={[[86, 52, 10], [100, 46, 11], [114, 52, 10]]} />
      <g {...trazo} fill={rosa}>
        <circle cx="46" cy="104" r="14" />
        <circle cx="154" cy="104" r="14" />
      </g>
      <g fill="none" stroke={LINEA} strokeWidth="2.2" strokeLinecap="round">
        <path d="M46 104 m -5 0 a 5 5 0 1 1 5 5 a 8 8 0 1 1 8 -8" />
        <path d="M154 104 m 5 0 a 5 5 0 1 0 -5 5 a 8 8 0 1 0 -8 -8" />
      </g>
      <ellipse cx="100" cy="110" rx="34" ry="28" fill="#FFF8F4" stroke={LINEA} strokeWidth="2.6" />
      <Ojos x1={87} x2={113} y={108} rx={3.8} ry={5.2} />
      <ellipse cx="100" cy="119" rx="4.5" ry="3.2" fill="#F48FB1" />
      <path d="M96 124 Q 100 128 104 124" fill="none" stroke={LINEA} strokeWidth="2.2" strokeLinecap="round" />
      <Rubor x1={78} x2={122} y={120} rx={7} ry={4} />
    </svg>
  )
}

/* ♡ Flat --------------------------------------------------------------- */
export function FlatIlustracion(props: P) {
  const azul = '#93BEEF'
  return (
    <svg viewBox="0 0 200 200" {...props}>
      <path d="M134 176 C 160 182, 170 160, 160 150 C 152 142, 142 152, 152 158" fill="none" stroke={LINEA} strokeWidth="3.2" strokeLinecap="round" />
      <g {...trazo}>
        <path d="M72 140 Q 100 130 128 140 Q 136 172 122 184 Q 100 192 78 184 Q 64 172 72 140 Z" fill={azul} />
        <ellipse cx="100" cy="166" rx="16" ry="14" fill="#EAF3FF" stroke="none" />
        <ellipse cx="86" cy="188" rx="11" ry="6" fill="#F6B3CC" />
        <ellipse cx="114" cy="188" rx="11" ry="6" fill="#F6B3CC" />
        <ellipse cx="70" cy="154" rx="9" ry="11" fill={azul} />
        <ellipse cx="130" cy="154" rx="9" ry="11" fill={azul} />
        <circle cx="62" cy="60" r="28" fill={azul} />
        <circle cx="138" cy="60" r="28" fill={azul} />
      </g>
      <circle cx="62" cy="60" r="17" fill="#D6E7FC" />
      <circle cx="138" cy="60" r="17" fill="#D6E7FC" />
      <g {...trazo}>
        <ellipse cx="100" cy="102" rx="54" ry="44" fill={azul} />
        <ellipse cx="100" cy="116" rx="30" ry="21" fill="#EAF3FF" />
      </g>
      <Ojos x1={80} x2={120} y={98} />
      <circle cx="100" cy="110" r="5.5" fill="#F48FB1" stroke={LINEA} strokeWidth="2" />
      <path d="M94 120 Q 100 126 106 120" fill="none" stroke={LINEA} strokeWidth="2.4" strokeLinecap="round" />
      <g stroke={LINEA} strokeWidth="2" strokeLinecap="round" opacity=".7">
        <path d="M60 110 L 76 113 M60 120 L 76 119 M140 110 L 124 113 M140 120 L 124 119" />
      </g>
      <Rubor x1={68} x2={132} y={114} rx={7} ry={4} />
      <ellipse cx="70" cy="76" rx="10" ry="5" fill="#fff" opacity=".45" transform="rotate(-25 70 76)" />
    </svg>
  )
}

/* ♡ Little Twin Stars --------------------------------------------------- */
export function TwinStarsIlustracion(props: P) {
  const piel = '#FFF1E6'
  const estrella = 'M0 -12 L3.5 -4 L12 -3.7 L5.5 2 L7.5 10.5 L0 6 L-7.5 10.5 L-5.5 2 L-12 -3.7 L-3.5 -4 Z'
  return (
    <svg viewBox="0 0 200 200" {...props}>
      {/* nube base */}
      <Esponjoso relleno="#fff" bolitas={[[40, 182, 16], [70, 176, 20], [100, 180, 18], [132, 176, 20], [162, 182, 16]]} />
      {/* Lala: pelo largo detrás */}
      <path d="M108 74 C 98 110, 104 150, 118 162 L 170 162 C 184 150, 188 110, 176 74 Z" fill="#F7B6D2" {...trazo} />
      {/* cuerpos */}
      <g {...trazo}>
        <path d="M44 120 L 30 168 Q 62 176 92 168 L 78 120 Z" fill="#FFF5C7" />
        <path d="M126 120 L 112 168 Q 142 176 172 168 L 158 120 Z" fill="#FFE3F0" />
      </g>
      {/* Kiki */}
      <g {...trazo}>
        <circle cx="61" cy="96" r="30" fill={piel} />
        <path d="M31 96 C 28 66, 50 58, 64 62 C 80 60, 96 72, 90 96 C 84 82, 74 78, 64 84 C 54 76, 40 80, 31 96 Z" fill="#9DBDF2" />
      </g>
      <Ojos x1={51} x2={71} y={104} rx={3.4} ry={4.6} />
      <Rubor x1={44} x2={78} y={112} rx={6} ry={3.5} />
      <path d="M57 113 Q 61 117 65 113" fill="none" stroke={LINEA} strokeWidth="2" strokeLinecap="round" />
      {/* Lala */}
      <g {...trazo}>
        <circle cx="142" cy="96" r="30" fill={piel} />
        <path d="M112 96 C 108 66, 130 56, 144 60 C 162 58, 178 72, 172 98 C 164 84, 154 80, 142 86 C 132 78, 118 82, 112 96 Z" fill="#F7B6D2" />
      </g>
      <Ojos x1={132} x2={152} y={104} rx={3.4} ry={4.6} />
      <Rubor x1={125} x2={159} y={112} rx={6} ry={3.5} />
      <path d="M138 113 Q 142 117 146 113" fill="none" stroke={LINEA} strokeWidth="2" strokeLinecap="round" />
      {/* estrellitas */}
      <g fill="#FFE08A" stroke={LINEA} strokeWidth="2.2" strokeLinejoin="round">
        <path d={estrella} transform="translate(82 64) scale(1.05)" />
        <path d={estrella} transform="translate(126 60) scale(1.05)" />
        <path d={estrella} transform="translate(186 128) scale(.9)" />
      </g>
      <path d="M176 140 L 166 166" stroke={LINEA} strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}
