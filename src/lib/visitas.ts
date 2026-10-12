/**
 * Recuerda (solo en su navegador) qué páginas ya visitó,
 * para marcar los lugares del mapa y mostrar la sorpresa final.
 */
export type LugarId = 'cositas' | 'recuerditos' | 'cartita' | 'regalito' | 'extranes'

const CLAVE = 'my-world:visitas'

export function leerVisitas(): LugarId[] {
  try {
    const crudo = window.localStorage.getItem(CLAVE)
    return crudo ? (JSON.parse(crudo) as LugarId[]) : []
  } catch {
    return []
  }
}

export function marcarVisita(lugar: LugarId) {
  try {
    const actuales = new Set(leerVisitas())
    actuales.add(lugar)
    window.localStorage.setItem(CLAVE, JSON.stringify([...actuales]))
  } catch {
    /* sin almacenamiento: no pasa nada */
  }
}
