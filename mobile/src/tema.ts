import { Platform } from 'react-native'
import type { Resposta } from './game/jogo'

// Visual "brinquedo dos anos 90": contornos grossos, sombras duras e cores vivas
export const cores = {
  fundo: '#ffd23f',
  tinta: '#1b1530', // contornos e sombras
  papel: '#fffaf0',
  papelLinha: '#eadfc6',
  textoPapel: '#2a2238',
  textoSuave: '#7a6f86',
  manchete: '#e63946',
  aparelho: '#6c3ce0',
  aparelhoClaro: '#8f68f2',
  aparelhoEscuro: '#4a22a8',
  moldura: '#2a2240',
  lcdFundo: '#14110f',
  lcdTexto: '#ff3b30',
  lcdApagado: 'rgba(255, 59, 48, 0.1)',
  lcdTextoSuave: '#ffb3ad',
  acerto: '#2bb673',
  erro: '#e63946',
  branco: '#ffffff',
}

export const coresBotao: Record<Resposta, { face: string; base: string; letra: string }> = {
  A: { face: '#e63946', base: '#a61e2a', letra: '#ffffff' },
  B: { face: '#ffd23f', base: '#c99a00', letra: '#1b1530' },
  C: { face: '#2f6fed', base: '#1c47a8', letra: '#ffffff' },
  D: { face: '#2bb673', base: '#1b7d4d', letra: '#ffffff' },
}

export const contorno = 3

// Sombra dura deslocada (estilo adesivo/brinquedo)
export const sombraDura = (deslocamento = 5) => ({
  boxShadow: `${deslocamento}px ${deslocamento}px 0px ${cores.tinta}`,
})

export const fontes = {
  lcd: 'DSEG7',
  mono: Platform.select({ ios: 'Courier New', android: 'monospace', default: 'Courier New, monospace' }),
}

// O driver nativo de animação não existe na web
export const driverNativo = Platform.OS !== 'web'
