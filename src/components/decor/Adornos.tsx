import type { CSSProperties } from 'react'

/** Color del contorno de todas las ilustraciones (marrón ciruela, más suave que el negro). */
export const LINEA = '#5b3b44'

type AdornoProps = {
  color?: string
  ancho?: number | string
  className?: string
  style?: CSSProperties
  /** Dibuja contorno marrón (estilo sticker) o solo relleno (estilo fondo). */
  contorno?: boolean
}

function base({ color, ancho, className, style }: AdornoProps) {
  return {
    'aria-hidden': true as const,
    focusable: 'false' as const,
    className,
    width: ancho,
    style: { color, ...style },
  }
}

/* ♡ Moño coquette ---------------------------------------------------- */
export function Mono({ color = '#E25C7A', contorno = true, ...p }: AdornoProps) {
  const trazo = contorno ? LINEA : 'none'
  return (
    <svg viewBox="0 0 120 100" {...base({ color, ...p })}>
      <g fill="currentColor" stroke={trazo} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
        <path d="M56 50 C 50 64, 40 78, 26 94 L 39 91 L 45 99 C 55 82, 61 64, 61 52 Z" />
        <path d="M64 50 C 70 64, 80 78, 94 94 L 81 91 L 75 99 C 65 82, 59 64, 59 52 Z" />
        <path d="M57 42 C 44 18, 8 8, 6 33 C 4 56, 36 60, 57 50 Z" />
        <path d="M63 42 C 76 18, 112 8, 114 33 C 116 56, 84 60, 63 50 Z" />
        <rect x="50" y="36" width="20" height="19" rx="8" />
      </g>
      <g fill="none" strokeLinecap="round" strokeWidth="2.6">
        <path d="M48 41 C 38 30, 24 25, 15 30" stroke="#fff" opacity=".55" />
        <path d="M72 41 C 82 30, 96 25, 105 30" stroke="#fff" opacity=".55" />
        <path d="M50 48 C 38 50, 24 49, 16 44" stroke={LINEA} opacity={contorno ? 0.35 : 0.15} />
        <path d="M70 48 C 82 50, 96 49, 104 44" stroke={LINEA} opacity={contorno ? 0.35 : 0.15} />
      </g>
      <circle cx="55" cy="41" r="2.4" fill="#fff" opacity=".7" />
    </svg>
  )
}

/* ♡ Corazón ----------------------------------------------------------- */
export const RUTA_CORAZON =
  'M50 90 C 22 70, 5 50, 5 30 C 5 15, 16 5, 29 5 C 39 5, 46 11, 50 19 C 54 11, 61 5, 71 5 C 84 5, 95 15, 95 30 C 95 50, 78 70, 50 90 Z'

export function Corazon({ color = '#F28AAE', contorno = false, ...p }: AdornoProps) {
  return (
    <svg viewBox="0 0 100 95" {...base({ color, ...p })}>
      <path
        d={RUTA_CORAZON}
        fill="currentColor"
        stroke={contorno ? LINEA : 'none'}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path d="M20 26 C 21 18, 27 13, 34 13" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity=".7" />
      <circle cx="19" cy="36" r="3" fill="#fff" opacity=".6" />
    </svg>
  )
}

/* ♡ Flor de cinco pétalos --------------------------------------------- */
export function Flor({
  color = '#FFC2D6',
  centro = '#F7D774',
  contorno = false,
  ...p
}: AdornoProps & { centro?: string }) {
  return (
    <svg viewBox="0 0 100 100" {...base({ color, ...p })}>
      <g fill="currentColor" stroke={contorno ? LINEA : 'none'} strokeWidth="3">
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse key={a} cx="50" cy="27" rx="17" ry="22" transform={`rotate(${a} 50 50)`} />
        ))}
      </g>
      {!contorno &&
        [0, 72, 144, 216, 288].map((a) => (
          <ellipse key={a} cx="50" cy="22" rx="5" ry="9" fill="#fff" opacity=".35" transform={`rotate(${a} 50 50)`} />
        ))}
      <circle cx="50" cy="50" r="11" fill={centro} stroke={contorno ? LINEA : 'none'} strokeWidth="3" />
      <circle cx="46" cy="46" r="3" fill="#fff" opacity=".7" />
    </svg>
  )
}

/* ♡ Mariposa ---------------------------------------------------------- */
export function Mariposa({ color = '#C9B6F0', contorno = false, ...p }: AdornoProps) {
  const trazo = contorno ? LINEA : 'none'
  return (
    <svg viewBox="0 0 100 80" {...base({ color, ...p })}>
      <g fill="currentColor" stroke={trazo} strokeWidth="3" strokeLinejoin="round">
        <path d="M48 38 C 40 14, 18 2, 8 10 C -2 18, 12 38, 46 42 Z" />
        <path d="M52 38 C 60 14, 82 2, 92 10 C 102 18, 88 38, 54 42 Z" />
        <path d="M47 44 C 30 46, 16 58, 22 68 C 28 76, 42 66, 48 48 Z" opacity=".85" />
        <path d="M53 44 C 70 46, 84 58, 78 68 C 72 76, 58 66, 52 48 Z" opacity=".85" />
      </g>
      <g fill="#fff" opacity=".55">
        <circle cx="22" cy="20" r="5" />
        <circle cx="78" cy="20" r="5" />
      </g>
      <rect x="47.5" y="30" width="5" height="30" rx="2.5" fill={LINEA} />
      <path d="M49 31 C 46 22, 42 18, 38 16 M51 31 C 54 22, 58 18, 62 16" stroke={LINEA} strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  )
}

/* ♡ Estrella redondita ------------------------------------------------- */
export function Estrella({ color = '#FFE08A', contorno = false, ...p }: AdornoProps) {
  return (
    <svg viewBox="0 0 100 100" {...base({ color, ...p })}>
      <path
        d="M50 8 L61 36 L91 38 L68 57 L76 87 L50 70 L24 87 L32 57 L9 38 L39 36 Z"
        fill="currentColor"
        stroke={contorno ? LINEA : 'currentColor'}
        strokeWidth={contorno ? 5 : 9}
        strokeLinejoin="round"
      />
      <circle cx="40" cy="44" r="3.5" fill="#fff" opacity=".7" />
    </svg>
  )
}

/* ♡ Destello de cuatro puntas ------------------------------------------ */
export function Destello({ color = '#fff', ...p }: AdornoProps) {
  return (
    <svg viewBox="0 0 100 100" {...base({ color, ...p })}>
      <path
        d="M50 0 C 53 36, 64 47, 100 50 C 64 53, 53 64, 50 100 C 47 64, 36 53, 0 50 C 36 47, 47 36, 50 0 Z"
        fill="currentColor"
      />
    </svg>
  )
}

/* ♡ Nube esponjosa (contorno unificado con la técnica de doble capa) --- */
const BOLITAS_NUBE: [number, number, number][] = [
  [40, 62, 24],
  [70, 46, 30],
  [108, 40, 34],
  [146, 52, 28],
  [172, 66, 20],
  [22, 72, 15],
]

export function Nube({ color = '#fff', contorno = false, ...p }: AdornoProps) {
  return (
    <svg viewBox="0 0 196 96" {...base({ color, ...p })}>
      {contorno && (
        <g fill={LINEA}>
          {BOLITAS_NUBE.map(([x, y, r]) => (
            <circle key={`${x}-c`} cx={x} cy={y} r={r + 3} />
          ))}
          <rect x="7" y="62" width="182" height="29" rx="14.5" />
        </g>
      )}
      <g fill="currentColor">
        {BOLITAS_NUBE.map(([x, y, r]) => (
          <circle key={x} cx={x} cy={y} r={r} />
        ))}
        <rect x="10" y="64" width="176" height="24" rx="12" />
      </g>
      <ellipse cx="98" cy="80" rx="80" ry="7" fill="#F9C9DA" opacity=".35" />
      <ellipse cx="96" cy="30" rx="16" ry="7" fill="#fff" opacity=".8" />
    </svg>
  )
}

/* ♡ Guirnalda: cuerda que cuelga con perlas, corazones y moños ---------- */
type GuirnaldaProps = {
  className?: string
  caida?: number
  cuentas?: number
  colorCuerda?: string
  /** Patrón que se repite a lo largo de la cuerda. */
  patron?: ('perla' | 'corazon' | 'mono' | 'estrella' | 'flor')[]
}

export function Guirnalda({
  className,
  caida = 40,
  cuentas = 23,
  colorCuerda = '#E9A3B9',
  patron = ['perla', 'perla', 'corazon', 'perla', 'perla', 'mono'],
}: GuirnaldaProps) {
  const p0 = { x: -10, y: 8 }
  const p2 = { x: 1010, y: 8 }
  const p1 = { x: 500, y: 8 + caida * 2 }
  const punto = (t: number) => ({
    x: (1 - t) ** 2 * p0.x + 2 * (1 - t) * t * p1.x + t ** 2 * p2.x,
    y: (1 - t) ** 2 * p0.y + 2 * (1 - t) * t * p1.y + t ** 2 * p2.y,
  })
  const items = Array.from({ length: cuentas }, (_, i) => {
    const t = (i + 1) / (cuentas + 1)
    return { ...punto(t), tipo: patron[i % patron.length], i }
  })
  return (
    <svg
      className={className}
      viewBox={`0 0 1000 ${caida + 60}`}
      preserveAspectRatio="xMidYMin slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="perla-brillo" cx="35%" cy="30%" r="70%">
          <stop offset="0" stopColor="#fff" />
          <stop offset=".55" stopColor="#FFF4EE" />
          <stop offset="1" stopColor="#EBC9D2" />
        </radialGradient>
      </defs>
      <path
        d={`M${p0.x} ${p0.y} Q ${p1.x} ${p1.y} ${p2.x} ${p2.y}`}
        fill="none"
        stroke={colorCuerda}
        strokeWidth="2.5"
      />
      {items.map(({ x, y, tipo, i }) => {
        if (tipo === 'perla')
          return <circle key={i} cx={x} cy={y} r="8" fill="url(#perla-brillo)" stroke="#E3BAC6" strokeWidth="1" />
        if (tipo === 'corazon')
          return (
            <g key={i} transform={`translate(${x - 13} ${y - 4}) scale(.26)`}>
              <path d={RUTA_CORAZON} fill="#F07C9E" />
              <path d="M20 26 C 21 18, 27 13, 34 13" fill="none" stroke="#fff" strokeWidth="7" strokeLinecap="round" opacity=".7" />
            </g>
          )
        if (tipo === 'estrella')
          return (
            <path
              key={i}
              transform={`translate(${x - 12} ${y - 4}) scale(.24)`}
              d="M50 8 L61 36 L91 38 L68 57 L76 87 L50 70 L24 87 L32 57 L9 38 L39 36 Z"
              fill="#FFE08A"
              stroke="#FFE08A"
              strokeWidth="10"
              strokeLinejoin="round"
            />
          )
        if (tipo === 'flor')
          return (
            <g key={i} transform={`translate(${x} ${y + 6})`}>
              {[0, 72, 144, 216, 288].map((a) => (
                <ellipse key={a} cx="0" cy="-6" rx="5" ry="7" fill="#fff" transform={`rotate(${a})`} />
              ))}
              <circle r="4" fill="#F7D774" />
            </g>
          )
        return (
          <g key={i} transform={`translate(${x - 17} ${y - 8}) scale(.29)`}>
            <path d="M56 50 C 50 64, 40 78, 26 94 L 39 91 L 45 99 C 55 82, 61 64, 61 52 Z M64 50 C 70 64, 80 78, 94 94 L 81 91 L 75 99 C 65 82, 59 64, 59 52 Z M57 42 C 44 18, 8 8, 6 33 C 4 56, 36 60, 57 50 Z M63 42 C 76 18, 112 8, 114 33 C 116 56, 84 60, 63 50 Z" fill="#E25C7A" />
            <rect x="50" y="36" width="20" height="19" rx="8" fill="#C9445F" />
          </g>
        )
      })}
    </svg>
  )
}

/* ♡ Cinta banderín para títulos --------------------------------------- */
export function CintaBanner({ color = '#F7A9C6', ...p }: AdornoProps) {
  return (
    <svg viewBox="0 0 600 120" preserveAspectRatio="none" {...base({ color, ...p })}>
      <g stroke={LINEA} strokeWidth="3" strokeLinejoin="round">
        <path d="M70 40 L4 40 L30 72 L4 104 L92 104 Z" fill="currentColor" style={{ filter: 'brightness(.88)' }} />
        <path d="M530 40 L596 40 L570 72 L596 104 L508 104 Z" fill="currentColor" style={{ filter: 'brightness(.88)' }} />
        <path d="M70 40 L92 104 L92 92 Z M530 40 L508 104 L508 92 Z" fill={LINEA} opacity=".35" />
        <path d="M60 16 Q 300 -4 540 16 L 540 92 Q 300 72 60 92 Z" fill="currentColor" />
      </g>
      <path d="M74 26 Q 300 8 526 26 M74 82 Q 300 62 526 82" fill="none" stroke="#fff" strokeWidth="2.5" strokeDasharray="7 7" opacity=".85" />
    </svg>
  )
}
