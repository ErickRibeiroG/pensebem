import { useEffect, useState } from 'react'
import { Platform } from 'react-native'
import * as Haptics from 'expo-haptics'
import { iniciarPrograma, jogoInicial, obterProgresso, responder } from '../game/jogo'
import type { Feedback, Resposta } from '../game/jogo'
import { obterPergunta } from '../game/perguntas'

const vibrar = (feedback: Feedback, finalizado: boolean) => {
  if (Platform.OS === 'web') return
  const tipo = finalizado
    ? Haptics.NotificationFeedbackType.Success
    : feedback === 'acerto'
      ? Haptics.NotificationFeedbackType.Success
      : Haptics.NotificationFeedbackType.Error
  Haptics.notificationAsync(tipo).catch(() => {})
}

export function useJogo() {
  const [jogo, setJogo] = useState(jogoInicial)
  const [erro, setErro] = useState('')

  // Vibra a cada resposta (acerto e erro têm padrões diferentes)
  useEffect(() => {
    if (jogo.jogada > 0) vibrar(jogo.feedback, jogo.finalizado)
  }, [jogo.jogada, jogo.feedback, jogo.finalizado])

  // Retorna true se o código é válido e o jogo começou
  const iniciar = (codigo: string) => {
    const novoJogo = iniciarPrograma(codigo.trim())
    if (!novoJogo) {
      setErro('Código inválido! Use 111 a 115.')
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
    jogo,
    pergunta: jogo.programa !== null && !jogo.finalizado ? obterPergunta(jogo.pergunta) : undefined,
    progresso: obterProgresso(jogo),
    emAndamento: jogo.programa !== null,
    erro,
    iniciar,
    reiniciar,
    jogar,
  }
}
