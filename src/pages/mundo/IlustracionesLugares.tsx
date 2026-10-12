/**
 * Ilustraciones de cada "lugar" del mapa. Cada una tiene grupos con clases propias
 * para que su animación al pasar el cursor sea distinta (ver Mundo.css).
 */
import { useId } from 'react'
import { LINEA, RUTA_CORAZON } from '../../components/decor/Adornos'

const t = { stroke: LINEA, strokeWidth: 3, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const }

function MonoMini({ x, y, escala = 1, color = '#E25C7A' }: { x: number; y: number; escala?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${escala})`}>
      <g {...t} strokeWidth={2.4} fill={color}>
        <path d="M-2 2 C -5 9, -9 14, -14 19 L -9 18 L -7 22 C -2 15, 0 8, 0 3 Z" />
        <path d="M2 2 C 5 9, 9 14, 14 19 L 9 18 L 7 22 C 2 15, 0 8, 0 3 Z" />
        <path d="M-2 -1 C -8 -11, -22 -14, -22 -4 C -22 6, -9 5, -2 2 Z" />
        <path d="M2 -1 C 8 -11, 22 -14, 22 -4 C 22 6, 9 5, 2 2 Z" />
        <rect x="-4.5" y="-4.5" width="9" height="8.5" rx="3.5" />
      </g>
    </g>
  )
}

function CorazonMini({ x, y, escala = 0.2, color = '#F28AAE', className }: { x: number; y: number; escala?: number; color?: string; className?: string }) {
  return (
    <g className={className}>
      <g transform={`translate(${x} ${y}) scale(${escala}) translate(-50 -47)`}>
        <path d={RUTA_CORAZON} fill={color} stroke={LINEA} strokeWidth={3 / escala / 1.6} strokeLinejoin="round" />
        <path d="M22 28 C 23 20, 29 15, 36 15" fill="none" stroke="#fff" strokeWidth={10} strokeLinecap="round" opacity=".7" />
      </g>
    </g>
  )
}

/* ♡ Frasco de corazones · Cositas de ti */
export function Frasco({ className }: { className?: string }) {
  const id = useId()
  return (
    <svg viewBox="0 0 160 160" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-vidrio`} x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".85" />
          <stop offset=".5" stopColor="#FFF4F8" stopOpacity=".55" />
          <stop offset="1" stopColor="#FCE1EC" stopOpacity=".8" />
        </linearGradient>
      </defs>
      <path d="M42 54 Q34 58 34 74 L34 130 Q34 150 54 150 L106 150 Q126 150 126 130 L126 74 Q126 58 118 54 Z" fill={`url(#${id}-vidrio)`} {...t} />
      <g className="lugar-frasco__corazones">
        <CorazonMini x={58} y={134} escala={0.22} color="#F28AAE" className="lugar-frasco__c lugar-frasco__c--1" />
        <CorazonMini x={84} y={136} escala={0.2} color="#E25C7A" className="lugar-frasco__c lugar-frasco__c--2" />
        <CorazonMini x={106} y={132} escala={0.21} color="#D9CCF2" className="lugar-frasco__c lugar-frasco__c--3" />
        <CorazonMini x={70} y={114} escala={0.2} color="#FFC2D6" className="lugar-frasco__c lugar-frasco__c--4" />
        <CorazonMini x={96} y={112} escala={0.22} color="#F7A9C6" className="lugar-frasco__c lugar-frasco__c--5" />
        <CorazonMini x={80} y={92} escala={0.19} color="#E25C7A" className="lugar-frasco__c lugar-frasco__c--6" />
      </g>
      <path d="M44 78 Q42 100 46 126" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" opacity=".9" />
      <path d="M54 70 L54 76" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity=".9" />
      <g className="lugar-frasco__tapa">
        <rect x="40" y="32" width="80" height="22" rx="7" fill="#F7A9C6" {...t} />
        <path d="M46 40 H114" stroke="#fff" strokeWidth="2.5" strokeDasharray="4 5" strokeLinecap="round" opacity=".9" />
        <g fill="#fff" stroke={LINEA} strokeWidth="1.6">
          {[44, 54, 64, 74, 84, 94, 104, 114].map((x) => (
            <circle key={x} cx={x} cy="57" r="5.5" />
          ))}
        </g>
        <rect x="38" y="50" width="84" height="7" fill="#fff" />
        <MonoMini x={80} y={50} escala={1} />
      </g>
      <g className="lugar-frasco__etiqueta">
        <path d="M118 86 L134 82 L140 100 L124 106 Z" fill="#FFF8F1" {...t} strokeWidth={2.4} />
        <circle cx="122" cy="89" r="2" fill={LINEA} />
        <path d="M128 94 c -2 -2 -1 -5 1.5 -4.5 c 1 -2.5 4.5 -1.5 3.5 1.5 c -1 2 -3 3 -5 3 z" fill="#E25C7A" />
      </g>
    </svg>
  )
}

/* ♡ Polaroids · Recuerditos */
export function Polaroids({ className }: { className?: string }) {
  const fotos = [
    { clase: 'lugar-fotos__f1', rot: -12, x: 18, y: 36, fondo: ['#E9DDFB', '#C9B6F0'] },
    { clase: 'lugar-fotos__f2', rot: 10, x: 64, y: 30, fondo: ['#FFE5D2', '#F9C3A8'] },
    { clase: 'lugar-fotos__f3', rot: -3, x: 38, y: 50, fondo: ['#FFD6E7', '#F28AAE'] },
  ]
  return (
    <svg viewBox="0 0 160 160" className={className} aria-hidden="true" focusable="false">
      {fotos.map((f, i) => (
        <g key={f.clase} className={`lugar-fotos__foto ${f.clase}`}>
        <g transform={`rotate(${f.rot} ${f.x + 38} ${f.y + 46})`}>
          <rect x={f.x} y={f.y} width="76" height="92" rx="4" fill="#fff" {...t} />
          <rect x={f.x + 8} y={f.y + 8} width="60" height="58" rx="2" fill={f.fondo[0]} />
          <path d={`M${f.x + 8} ${f.y + 66} L${f.x + 26} ${f.y + 44} L${f.x + 40} ${f.y + 58} L${f.x + 50} ${f.y + 48} L${f.x + 68} ${f.y + 66} Z`} fill={f.fondo[1]} />
          <circle cx={f.x + 54} cy={f.y + 22} r="7" fill="#fff" opacity=".9" />
          {i === 2 && (
            <>
              <path d={`M${f.x + 16} ${f.y + 82} q 6 -5 12 0 t 12 0`} fill="none" stroke="#C27891" strokeWidth="2" strokeLinecap="round" />
              <rect x={f.x + 22} y={f.y - 7} width="32" height="12" rx="2" fill="#FFE08A" opacity=".85" transform={`rotate(-6 ${f.x + 38} ${f.y})`} />
            </>
          )}
        </g>
        </g>
      ))}
      <CorazonMini x={120} y={124} escala={0.2} color="#E25C7A" className="lugar-fotos__corazon" />
    </svg>
  )
}

/* ♡ Buzón · Cartita */
export function Buzon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 160" className={className} aria-hidden="true" focusable="false">
      <rect x="72" y="100" width="16" height="54" rx="4" fill="#FFF8F1" {...t} />
      <path d="M60 154 Q80 146 100 154" fill="#F6B3CC" {...t} />
      <g className="lugar-buzon__sobre">
        <rect x="54" y="30" width="52" height="34" rx="3" fill="#FFF8F1" {...t} />
        <path d="M54 32 L80 50 L106 32" fill="none" {...t} strokeWidth={2.4} />
        <CorazonMini x={80} y={52} escala={0.1} color="#E25C7A" />
      </g>
      <path d="M34 66 Q34 40 62 40 L98 40 Q126 40 126 66 L126 106 L34 106 Z" fill="#F7A9C6" {...t} />
      <path d="M34 66 Q34 40 62 40 Q90 40 90 66 L90 106 L34 106 Z" fill="#FBC2D7" {...t} />
      <rect x="50" y="56" width="26" height="6" rx="3" fill={LINEA} opacity=".75" />
      <CorazonMini x={62} y={84} escala={0.2} color="#E25C7A" />
      <path d="M40 70 Q40 52 54 48" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity=".8" />
      <g className="lugar-buzon__bandera">
        <rect x="124" y="58" width="5" height="40" rx="2" fill="#FFF8F1" {...t} strokeWidth={2.4} />
        <path d="M128 58 L148 64 L128 72 Z" fill="#E25C7A" {...t} strokeWidth={2.4} />
      </g>
      <g fill="#fff" stroke={LINEA} strokeWidth="1.4">
        {[40, 50, 60, 70, 80, 90, 100, 110, 120].map((x) => (
          <circle key={x} cx={x} cy="108" r="4" />
        ))}
      </g>
    </svg>
  )
}

/* ♡ Regalo · Regalito */
export function RegaloMini({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 160" className={className} aria-hidden="true" focusable="false">
      <g className="lugar-regalo__chispas" fill="#FFE08A">
        <path d="M80 30 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3z" />
        <path d="M46 48 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2z" />
        <path d="M116 44 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2z" />
      </g>
      <rect x="36" y="80" width="88" height="68" rx="6" fill="#FBC2D7" {...t} />
      <g fill="#fff" opacity=".7">
        {[[50, 96], [70, 116], [50, 132], [104, 96], [110, 128], [92, 140]].map(([x, y]) => (
          <circle key={`${x}${y}`} cx={x} cy={y} r="3.4" />
        ))}
      </g>
      <rect x="72" y="80" width="16" height="68" fill="#E25C7A" {...t} />
      <g className="lugar-regalo__tapa">
        <rect x="30" y="64" width="100" height="22" rx="6" fill="#F7A9C6" {...t} />
        <rect x="72" y="64" width="16" height="22" fill="#E25C7A" {...t} />
        <path d="M36 70 H66 M94 70 H124" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" opacity=".8" />
        <MonoMini x={80} y={60} escala={1.7} />
      </g>
    </svg>
  )
}

/* ♡ Globo de corazón · Cuando me extrañes */
export function Globo({ className }: { className?: string }) {
  const id = useId()
  return (
    <svg viewBox="0 0 160 160" className={className} aria-hidden="true" focusable="false">
      <defs>
        <clipPath id={`${id}-corazon`}>
          <path d={RUTA_CORAZON} transform="translate(20 6) scale(1.2)" />
        </clipPath>
      </defs>
      <g className="lugar-globo__todo">
        <path d="M50 92 L66 128 M110 92 L94 128 M80 112 L80 128" stroke={LINEA} strokeWidth="2" />
        <g clipPath={`url(#${id}-corazon)`}>
          <rect x="0" y="0" width="160" height="130" fill="#F7A9C6" />
          {[38, 62, 86, 110].map((x) => (
            <rect key={x} x={x} y="0" width="12" height="130" fill="#FFF0F5" />
          ))}
        </g>
        <path d={RUTA_CORAZON} transform="translate(20 6) scale(1.2)" fill="none" stroke={LINEA} strokeWidth={3 / 1.2} strokeLinejoin="round" />
        <path d="M38 34 C 40 24, 48 18, 56 18" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity=".85" />
        <g className="lugar-globo__sobres">
          <rect x="66" y="118" width="14" height="10" rx="1.5" fill="#FFF8F1" stroke={LINEA} strokeWidth="2" transform="rotate(-14 73 123)" />
          <rect x="80" y="116" width="14" height="10" rx="1.5" fill="#FFE3EC" stroke={LINEA} strokeWidth="2" transform="rotate(12 87 121)" />
        </g>
        <path d="M62 126 L98 126 L94 148 Q80 152 66 148 Z" fill="#F3CF9A" {...t} />
        <path d="M64 134 H96 M65 142 H95" stroke={LINEA} strokeWidth="1.6" opacity=".5" />
      </g>
    </svg>
  )
}

/* ♡ Sobre de encaje con cinta · Una cartita especial */
export function SobreEspecial({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 160" className={className} aria-hidden="true" focusable="false">
      <g className="lugar-especial__chispas" fill="#FFE08A">
        <path d="M34 40 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2z" />
        <path d="M126 34 l2.5 6 6 2.5 -6 2.5 -2.5 6 -2.5 -6 -6 -2.5 6 -2.5z" />
      </g>
      <g className="lugar-especial__sobre">
        <rect x="22" y="56" width="116" height="80" rx="7" fill="#FFF5EE" {...t} />
        <path d="M22 136 L80 94 L138 136" fill="none" stroke="#F2B9CB" strokeWidth="2" strokeDasharray="2 5" strokeLinecap="round" />
        <path d="M24 58 L80 102 L136 58" fill="#FFF8F3" {...t} />
        <g fill="#fff" stroke={LINEA} strokeWidth="1.2">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <circle key={`a${i}`} cx={30 + i * 7.6} cy={64 + i * 5.9} r="3.2" />
          ))}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <circle key={`b${i}`} cx={130 - i * 7.6} cy={64 + i * 5.9} r="3.2" />
          ))}
        </g>
        <rect x="22" y="90" width="116" height="10" fill="#F7A9C6" stroke={LINEA} strokeWidth="2" />
        <rect x="75" y="56" width="10" height="80" fill="#F7A9C6" stroke={LINEA} strokeWidth="2" />
        <MonoMini x={80} y={94} escala={1.25} color="#F28AAE" />
      </g>
      <CorazonMini x={80} y={124} escala={0.14} color="#E25C7A" className="lugar-especial__corazon" />
      <g className="lugar-especial__etiqueta">
        <path d="M118 104 L146 112 L142 126 L114 118 Z" fill="#FFF8F1" {...t} strokeWidth={2.2} />
        <circle cx="120" cy="110" r="2" fill={LINEA} />
      </g>
    </svg>
  )
}
