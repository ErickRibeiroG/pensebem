import type { Resposta } from './jogo'

export type Pergunta = {
  enunciado: string
  alternativas: Record<Resposta, string>
}

// Texto das perguntas do livro, indexado pelo número da pergunta (1 a 150).
//
// Para cadastrar uma pergunta, copie o modelo abaixo e troque pelo texto do seu livro:
//
//   7: {
//     enunciado: 'Texto da pergunta 7',
//     alternativas: { A: '...', B: '...', C: '...', D: '...' },
//   },
//
// Perguntas que não estiverem aqui aparecem na tela como "Consulte o livro".
// As duas primeiras abaixo são apenas EXEMPLOS de formato: substitua pelo texto real.
const perguntas: Record<number, Pergunta> = {
  1: {
    enunciado: '(Exemplo) Substitua pelo texto da pergunta 1 do livro.',
    alternativas: {
      A: 'Alternativa A',
      B: 'Alternativa B',
      C: 'Alternativa C',
      D: 'Alternativa D',
    },
  },
  2: {
    enunciado: '(Exemplo) Substitua pelo texto da pergunta 2 do livro.',
    alternativas: {
      A: 'Alternativa A',
      B: 'Alternativa B',
      C: 'Alternativa C',
      D: 'Alternativa D',
    },
  },
}

export function obterPergunta(numero: number): Pergunta | undefined {
  return perguntas[numero]
}
