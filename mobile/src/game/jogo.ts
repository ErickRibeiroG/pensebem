export type Resposta = 'A' | 'B' | 'C' | 'D'

type Programa = {
  primeiraPergunta: number
  gabarito: readonly Resposta[]
}

// Converte 'DCBB...' em ['D', 'C', 'B', 'B', ...]
const gabarito = (letras: string) => letras.split('') as Resposta[]

// Livro: Pense Bem Disney - Toy Story
// Cores do Pense Bem: A = vermelho, B = amarelo, C = azul, D = verde
const programas: Record<string, Programa> = {
  // Programa 1 - questões 1 a 30
  '111': { primeiraPergunta: 1, gabarito: gabarito('DCBBCDDBAA' + 'DCBDADACAC' + 'CBDABABDAC') },
  // Programa 2 - questões 31 a 60
  '112': { primeiraPergunta: 31, gabarito: gabarito('ACCBDDDBDA' + 'BABDAAABCA' + 'ABADBBBCDC') },
  // Programa 3 - questões 61 a 90
  '113': { primeiraPergunta: 61, gabarito: gabarito('DDDACABBCA' + 'ABADBDCCBA' + 'DBADBBDCCC') },
  // Programa 4 - questões 91 a 120
  '114': { primeiraPergunta: 91, gabarito: gabarito('BADBADBBDC' + 'AADADABCCD' + 'DCCDDAACDB') },
  // Programa 5 - questões 121 a 150
  '115': { primeiraPergunta: 121, gabarito: gabarito('BDDBBDABDA' + 'BCCABDDCDC' + 'BBBACADDDC') },
}

export const PONTUACAO_MAXIMA = 30 * 3

export type Feedback = 'nenhum' | 'acerto' | 'erro'

export type Jogo = {
  programa: string | null
  pergunta: number
  tentativa: number
  pontuacao: number
  indice: number
  finalizado: boolean
  feedback: Feedback
}

export const jogoInicial: Jogo = {
  programa: null,
  pergunta: 0,
  tentativa: 1,
  pontuacao: 0,
  indice: 0,
  finalizado: false,
  feedback: 'nenhum',
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
    // 1ª tentativa = 3 pontos, 2ª = 2 pontos, 3ª = 1 ponto
    pontuacao: jogo.pontuacao + (acertou ? 4 - jogo.tentativa : 0),
    indice,
    finalizado: indice === gabarito.length,
    feedback: acertou ? 'acerto' : 'erro',
  }
}

export function obterTelas(jogo: Jogo) {
  if (jogo.finalizado) {
    return {
      tela1: 'FIM',
      tela2: `Pontos: ${jogo.pontuacao} de ${PONTUACAO_MAXIMA}`,
      feedback: jogo.feedback,
    }
  }
  if (jogo.programa === null) {
    return { tela1: '*', tela2: 'Digite o programa', feedback: jogo.feedback }
  }
  return {
    tela1: `${jogo.programa}->${jogo.pergunta}:`,
    tela2: `Tentativa ${jogo.tentativa} de 3`,
    feedback: jogo.feedback,
  }
}
