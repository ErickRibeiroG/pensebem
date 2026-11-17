import type { ImageSourcePropType } from 'react-native'
import paginasRevista from './paginasRevista'

export type PaginaRevista = {
  numero: number
  fonte: ImageSourcePropType
  largura: number
  altura: number
}

// Páginas da revista (numeração do PDF) que pertencem a cada programa
const PAGINAS_POR_PROGRAMA: Record<string, { primeira: number; ultima: number }> = {
  '111': { primeira: 4, ultima: 9 },
  '112': { primeira: 10, ultima: 15 },
  '113': { primeira: 16, ultima: 21 },
  '114': { primeira: 22, ultima: 27 },
  '115': { primeira: 28, ultima: 33 },
}

// Só devolve as páginas que já foram convertidas (scripts/converter-revista.py)
export function paginasDoPrograma(codigo: string | null): PaginaRevista[] {
  const faixa = codigo === null ? undefined : PAGINAS_POR_PROGRAMA[codigo]
  if (!faixa) return []

  const paginas: PaginaRevista[] = []
  for (let numero = faixa.primeira; numero <= faixa.ultima; numero++) {
    const pagina = paginasRevista[numero]
    if (pagina) paginas.push({ numero, ...pagina })
  }
  return paginas
}
