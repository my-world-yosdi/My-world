import { crearAleatorio, entre } from '../../lib/aleatorio'

type Props = {
  className?: string
  colores?: [string, string, string]
  conFlores?: boolean
  semilla?: number
}

/** Tres capas de colinas onduladas con florecitas, para dar profundidad al suelo. */
export function Colinas({
  className,
  colores = ['#F9C3D6', '#F6B0C9', '#FBD3E2'],
  conFlores = true,
  semilla = 3,
}: Props) {
  const azar = crearAleatorio(semilla)
  const flores = conFlores
    ? Array.from({ length: 42 }, (_, i) => ({
        i,
        x: entre(azar, 10, 1430),
        y: entre(azar, 232, 300),
        r: entre(azar, 3, 6.5),
        color: ['#fff', '#FFF2B8', '#F28AAE', '#E9DDFB'][Math.floor(azar() * 4)],
      }))
    : []
  return (
    <svg className={className} viewBox="0 0 1440 320" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">
      <path d="M0 150 C 180 90, 360 110, 520 150 C 700 196, 880 90, 1080 112 C 1240 130, 1340 160, 1440 140 L1440 320 L0 320 Z" fill={colores[0]} />
      <path d="M0 210 C 220 150, 420 190, 640 200 C 860 210, 1020 150, 1220 170 C 1320 180, 1390 200, 1440 196 L1440 320 L0 320 Z" fill={colores[1]} />
      <path d="M0 250 C 260 214, 520 262, 760 246 C 1000 230, 1200 214, 1440 240 L1440 320 L0 320 Z" fill={colores[2]} />
      <path d="M0 250 C 260 214, 520 262, 760 246 C 1000 230, 1200 214, 1440 240" fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="2 10" strokeLinecap="round" opacity=".8" />
      {flores.map((f) => (
        <g key={f.i} transform={`translate(${f.x} ${f.y})`}>
          {[0, 72, 144, 216, 288].map((a) => (
            <circle key={a} cx="0" cy={-f.r} r={f.r * 0.72} fill={f.color} transform={`rotate(${a})`} />
          ))}
          <circle r={f.r * 0.55} fill="#F7C95A" />
        </g>
      ))}
    </svg>
  )
}
