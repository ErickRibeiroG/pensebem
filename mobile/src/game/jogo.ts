export type Resposta = 'A' | 'B' | 'C' | 'D'

export const RESPOSTAS: readonly Resposta[] = ['A', 'B', 'C', 'D']

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

// Lista usada na "capa" da revista
export const listaProgramas = Object.entries(programas).map(([codigo, p]) => ({
  codigo,
  primeira: p.primeiraPergunta,
  ultima: p.primeiraPergunta + p.gabarito.length - 1,
}))

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
  // Respostas erradas já tentadas na pergunta atual (riscadas na revista)
  eliminadas: Resposta[]
  // Quantas perguntas foram acertadas na 1ª tentativa
  acertosPrimeira: number
  // Contador de jogadas: muda a cada resposta, dispara animações e vibração
  jogada: number
}

export const jogoInicial: Jogo = {
  programa: null,
  pergunta: 0,
  tentativa: 1,
  pontuacao: 0,
  indice: 0,
  finalizado: false,
  feedback: 'nenhum',
  eliminadas: [],
  acertosPrimeira: 0,
  jogada: 0,
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
    eliminadas: avancou ? [] : [...jogo.eliminadas, resposta],
    acertosPrimeira: jogo.acertosPrimeira + (acertou && jogo.tentativa === 1 ? 1 : 0),
    jogada: jogo.jogada + 1,
  }
}

// Posição dentro do programa (ex.: pergunta 5 de 30)
export function obterProgresso(jogo: Jogo) {
  if (jogo.programa === null) return { atual: 0, total: 0, respondidas: 0 }
  const total = programas[jogo.programa].gabarito.length
  return { atual: Math.min(jogo.indice + 1, total), total, respondidas: jogo.indice }
}

// Estrelas do resumo final (0 a 3)
export function calcularEstrelas(pontuacao: number) {
  const percentual = pontuacao / PONTUACAO_MAXIMA
  if (percentual >= 0.8) return 3
  if (percentual >= 0.5) return 2
  if (percentual >= 0.2) return 1
  return 0
}
