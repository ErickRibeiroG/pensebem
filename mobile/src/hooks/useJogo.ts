import { useState } from 'react'
import { iniciarPrograma, jogoInicial, obterTelas, responder } from '../game/jogo'
import type { Resposta } from '../game/jogo'

export function useJogo() {
  const [jogo, setJogo] = useState(jogoInicial)
  const [erro, setErro] = useState('')

  // Retorna true se o código é válido e o jogo começou
  const iniciar = (codigo: string) => {
    const novoJogo = iniciarPrograma(codigo.trim())
    if (!novoJogo) {
      setErro('Código inválido! Digite um código entre 111 e 115.')
      return false
    }
    setErro('')
    setJogo(novoJogo)
    return true
  }

  const reiniciar = () => {
    setErro('')
    setJogo(jogoInicial)
  }

  const jogar = (resposta: Resposta) => {
    setJogo((atual) => responder(atual, resposta))
  }

  return {
    telas: obterTelas(jogo),
    emAndamento: jogo.programa !== null,
    erro,
    iniciar,
    reiniciar,
    jogar,
  }
}
