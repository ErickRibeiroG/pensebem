export type Resposta = 'A' | 'B' | 'C' | 'D'

type Programa = {
  primeiraPergunta: number
  gabarito: readonly Resposta[]
}

const programas: Record<string, Programa> = {
  '021': { primeiraPergunta: 1, gabarito: ['B', 'A', 'A', 'D', 'C'] },
  '022': { primeiraPergunta: 31, gabarito: ['B', 'D', 'A', 'B', 'A'] },
  '023': { primeiraPergunta: 61, gabarito: ['B', 'A', 'D', 'B', 'B'] },
  '024': { primeiraPergunta: 91, gabarito: ['B', 'A', 'D', 'B', 'D'] },
  '025': { primeiraPergunta: 121, gabarito: ['C', 'C', 'D', 'D', 'A'] },
}

export type Jogo = {
  programa: string | null
  pergunta: number
  tentativa: number
  pontuacao: number
  indice: number
  finalizado: boolean
  borda: 'black 1px solid' | 'green 3px solid' | 'red 3px solid'
}

export const jogoInicial: Jogo = {
  programa: null,
  pergunta: 0,
  tentativa: 1,
  pontuacao: 0,
  indice: 0,
  finalizado: false,
  borda: 'black 1px solid',
}

export function iniciarPrograma(codigo: string): Jogo | null {
  const programa = programas[codigo]
  if (!programa) return null

  return {
    ...jogoInicial,
    programa: codigo,
    pergunta: programa.primeiraPergunta,
  }
}

export function responder(jogo: Jogo, resposta: Resposta): Jogo {
  if (jogo.programa === null || jogo.finalizado) return jogo

  const gabarito = programas[jogo.programa].gabarito
  const acertou = resposta === gabarito[jogo.indice]
  const avancou = acertou || jogo.tentativa === 3
  const indice = jogo.indice + (avancou ? 1 : 0)

  return {
    ...jogo,
    pergunta: jogo.pergunta + (avancou ? 1 : 0),
    tentativa: avancou ? 1 : jogo.tentativa + 1,
    pontuacao: jogo.pontuacao + (acertou ? 4 - jogo.tentativa : 0),
    indice,
    finalizado: indice === gabarito.length,
    borda: acertou ? 'green 3px solid' : 'red 3px solid',
  }
}

export function obterTelas(jogo: Jogo) {
  if (jogo.finalizado) {
    return { tela1: '***FIM***', tela2: `Pontuação ${jogo.pontuacao}`, borda: jogo.borda }
  }
  if (jogo.programa === null) {
    return { tela1: '*', tela2: '*', borda: jogo.borda }
  }
  return {
    tela1: `${jogo.programa}->${jogo.pergunta}`,
    tela2: `Tentativa ${jogo.tentativa} de 3`,
    borda: jogo.borda,
  }
}
