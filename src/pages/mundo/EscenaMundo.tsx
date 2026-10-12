import { useId } from 'react'
import { LINEA, Nube, Destello } from '../../components/decor/Adornos'
import { Particulas } from '../../components/decor/Particulas'
import { CapaParallax } from '../../components/decor/CapaParallax'
import type { Parallax } from '../../hooks/useParallax'

function Arbolito({ x, y, escala = 1, color = '#F7A9C6' }: { x: number; y: number; escala?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${escala})`}>
      <rect x="-4" y="-6" width="8" height="40" rx="3" fill="#E9C9B8" />
      <circle cx="0" cy="-26" r="26" fill={color} />
      <circle cx="-8" cy="-34" r="8" fill="#fff" opacity=".45" />
      <path d="M-14 -22 a 14 14 0 0 0 28 0" fill="none" stroke="#fff" strokeWidth="2.5" strokeDasharray="2 6" strokeLinecap="round" opacity=".8" />
    </g>
  )
}

function Casita({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} stroke={LINEA} strokeWidth="2.5" strokeLinejoin="round" opacity=".92">
      <rect x="-34" y="-30" width="68" height="44" rx="4" fill="#FFF8F1" />
      <path d="M-44 -28 L0 -66 L44 -28 Z" fill="#E25C7A" />
      <path d="M-8 14 L-8 -6 Q0 -14 8 -6 L8 14 Z" fill="#F7A9C6" />
      <path d="M-20 -18 c -4 -4 -2 -10 3 -8 c 2 -5 9 -3 7 3 c -2 4 -6 6 -10 5 z" fill="#F28AAE" strokeWidth="1.8" />
      <rect x="12" y="-58" width="10" height="18" fill="#FBC2D7" />
    </g>
  )
}

/** Paisaje del mapa: arcoíris pastel, colinas, arbolitos-paleta, la casita de My Melody y nubes que pasan. */
export function EscenaMundo({ parallax }: { parallax: Parallax }) {
  const id = useId()
  return (
    <div className="escenario escena-mundo">
      <div className="escena-mundo__cielo" />
      <Particulas cantidad={10} modo="titila" semilla={21} tipos={['destello', 'estrella']} zona={[2, 40]} colores={['#fff', '#FFE08A']} />

      <CapaParallax parallax={parallax} profundidad={-6} className="escena-mundo__capa">
        <svg className="escena-mundo__paisaje" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
          <defs>
            <linearGradient id={`${id}-colina1`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#FCD9E6" />
              <stop offset="1" stopColor="#F8C6D8" />
            </linearGradient>
            <linearGradient id={`${id}-colina2`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#F9C3D6" />
              <stop offset="1" stopColor="#F3AFC7" />
            </linearGradient>
            <linearGradient id={`${id}-colina3`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#FFE3EC" />
              <stop offset="1" stopColor="#FBD0DF" />
            </linearGradient>
          </defs>
          {/* arcoíris pastel */}
          <g fill="none" strokeWidth="26" opacity=".55" strokeLinecap="round">
            <path d="M330 520 A 390 330 0 0 1 1110 520" stroke="#F7A9C6" />
            <path d="M356 520 A 364 304 0 0 1 1084 520" stroke="#FFE3B8" />
            <path d="M382 520 A 338 278 0 0 1 1058 520" stroke="#FFF6C7" />
            <path d="M408 520 A 312 252 0 0 1 1032 520" stroke="#DDF1E4" />
            <path d="M434 520 A 286 226 0 0 1 1006 520" stroke="#D9CCF2" />
          </g>
          <path d="M0 470 C 200 420, 360 440, 520 470 C 700 504, 900 420, 1100 440 C 1260 456, 1360 480, 1440 466 L1440 900 L0 900 Z" fill={`url(#${id}-colina1)`} />
          <Casita x={1010} y={452} />
          <Arbolito x={250} y={452} escala={0.8} color="#FBC2D7" />
          <Arbolito x={1290} y={470} escala={0.7} color="#E9DDFB" />
          <path d="M0 560 C 240 510, 460 560, 700 560 C 940 560, 1120 500, 1440 540 L1440 900 L0 900 Z" fill={`url(#${id}-colina2)`} />
          <Arbolito x={90} y={560} escala={1.1} color="#F28AAE" />
          <Arbolito x={160} y={572} escala={0.8} color="#FFC2D6" />
          <Arbolito x={1370} y={552} escala={1} color="#F7A9C6" />
          <path d="M0 690 C 300 640, 560 700, 820 680 C 1080 660, 1260 640, 1440 668 L1440 900 L0 900 Z" fill={`url(#${id}-colina3)`} />
          {/* cerquita blanca */}
          <g stroke="#fff" strokeWidth="6" strokeLinecap="round" opacity=".95">
            {[40, 70, 100, 130, 160, 190].map((x) => (
              <path key={x} d={`M${x} ${668 - (x - 40) * 0.12} v -34`} />
            ))}
            <path d="M34 650 L196 632 M34 664 L196 646" strokeWidth="4" />
            {[1250, 1280, 1310, 1340, 1370, 1400].map((x) => (
              <path key={x} d={`M${x} ${652 + (x - 1250) * 0.1} v -34`} />
            ))}
            <path d="M1244 636 L1406 652 M1244 650 L1406 666" strokeWidth="4" />
          </g>
          {/* florecitas sueltas */}
          <g>
            {[[300, 720], [520, 760], [760, 740], [980, 770], [1180, 730], [420, 830], [880, 850], [1320, 800], [120, 800], [640, 860]].map(([x, y], i) => (
              <g key={i} transform={`translate(${x} ${y})`}>
                {[0, 72, 144, 216, 288].map((a) => (
                  <circle key={a} cx="0" cy="-6" r="5" fill={i % 3 === 0 ? '#fff' : i % 3 === 1 ? '#F28AAE' : '#E9DDFB'} transform={`rotate(${a})`} />
                ))}
                <circle r="3.6" fill="#F7C95A" />
              </g>
            ))}
          </g>
        </svg>
      </CapaParallax>

      <div className="escena-mundo__nubes">
        <Nube className="escena-mundo__nube escena-mundo__nube--1 derivar" />
        <Nube className="escena-mundo__nube escena-mundo__nube--2 derivar" />
        <Nube className="escena-mundo__nube escena-mundo__nube--3 derivar" />
      </div>
      <Destello className="escena-mundo__sol" color="#fff" />
    </div>
  )
}
