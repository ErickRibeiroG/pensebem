import { useState } from 'react'
import { iniciarPrograma, jogoInicial, obterTelas, responder } from '../game/jogo'
import type { Resposta } from '../game/jogo'

export function useJogo() {
  const [jogo, setJogo] = useState(jogoInicial)

  const iniciar = () => {
    while (true) {
      const codigo = window.prompt('Digite o código do programa(021 a 025):', '')
      if (codigo === null) return

      const novoJogo = iniciarPrograma(codigo)
      if (novoJogo) {
        setJogo(novoJogo)
        return
      }
      window.alert('Código de programa inválido!\nDigite um código entre 021 e 025')
    }
  }

  const jogar = (resposta: Resposta) => {
    setJogo((atual) => responder(atual, resposta))
  }

  return { telas: obterTelas(jogo), iniciar, jogar }
}
