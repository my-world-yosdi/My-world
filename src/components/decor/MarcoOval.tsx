import { useId } from 'react'
import { LINEA } from './Adornos'

/** Marco ovalado tipo camafeo con fila de perlas: el "espejo" donde vive My Melody. */
export function MarcoOval({ className }: { className?: string }) {
  const id = useId()
  const perlas = Array.from({ length: 38 }, (_, i) => {
    const a = (i / 38) * Math.PI * 2
    return { x: 150 + 136 * Math.cos(a), y: 190 + 166 * Math.sin(a), i }
  })
  return (
    <svg viewBox="0 0 300 380" className={className} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={`${id}-fondo`} cx="50%" cy="38%" r="65%">
          <stop offset="0" stopColor="#FFF9F3" />
          <stop offset=".55" stopColor="#FFE6EF" />
          <stop offset="1" stopColor="#F4D3EC" />
        </radialGradient>
        <radialGradient id={`${id}-perla`} cx="35%" cy="30%" r="70%">
          <stop offset="0" stopColor="#fff" />
          <stop offset=".6" stopColor="#FFF3EE" />
          <stop offset="1" stopColor="#E8C3CF" />
        </radialGradient>
        <pattern id={`${id}-lunares`} width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="5" cy="5" r="1.6" fill="#F7A9C6" opacity=".45" />
          <circle cx="16" cy="16" r="1.6" fill="#fff" opacity=".9" />
        </pattern>
      </defs>
      <ellipse cx="150" cy="190" rx="142" ry="172" fill="#F7A9C6" stroke={LINEA} strokeWidth="3" />
      <ellipse cx="150" cy="190" rx="126" ry="156" fill={`url(#${id}-fondo)`} stroke="#fff" strokeWidth="4" />
      <ellipse cx="150" cy="190" rx="126" ry="156" fill={`url(#${id}-lunares)`} />
      <ellipse cx="150" cy="190" rx="114" ry="144" fill="none" stroke="#F7A9C6" strokeWidth="1.6" strokeDasharray="5 6" />
      {perlas.map((p) => (
        <circle key={p.i} cx={p.x} cy={p.y} r="6.4" fill={`url(#${id}-perla)`} stroke="#E3B6C4" strokeWidth=".8" />
      ))}
    </svg>
  )
}
