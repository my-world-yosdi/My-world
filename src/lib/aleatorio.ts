/** Generador pseudoaleatorio con semilla: las decoraciones siempre caen en el mismo sitio. */
export function crearAleatorio(semilla: number) {
  let s = semilla >>> 0 || 1
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0
    return s / 4294967296
  }
}

export function entre(azar: () => number, min: number, max: number) {
  return min + azar() * (max - min)
}
