import { Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import * as Haptics from 'expo-haptics'
import { RESPOSTAS } from '../game/jogo'
import type { Resposta } from '../game/jogo'
import { contorno, cores, coresBotao } from '../tema'

type BotoesProps = {
  onAnswer: (resposta: Resposta) => void
  disabled?: boolean
}

const ALTURA_LABIO = 7 // parte escura que aparece embaixo do botão (efeito 3D)

function Botoes({ onAnswer, disabled = false }: BotoesProps) {
  const toque = () => {
    if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {})
  }

  return (
    <View style={styles.grade}>
      {RESPOSTAS.map((resposta) => {
        const cor = coresBotao[resposta]
        return (
          <Pressable
            key={resposta}
            onPressIn={toque}
            onPress={() => onAnswer(resposta)}
            disabled={disabled}
            accessibilityRole="button"
            accessibilityLabel={`Resposta ${resposta}`}
            accessibilityState={{ disabled }}
            style={[styles.base, { backgroundColor: cor.base }, disabled && styles.desabilitado]}
          >
            {({ pressed }) => (
              <View
                style={[
                  styles.face,
                  { backgroundColor: cor.face },
                  pressed && { transform: [{ translateY: ALTURA_LABIO - 1 }] },
                ]}
              >
                <View style={styles.brilho} />
                <Text style={[styles.letra, { color: cor.letra }]}>{resposta}</Text>
              </View>
            )}
          </Pressable>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  grade: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 14,
    marginTop: 18,
  },
  base: {
    width: '47.5%',
    height: 96,
    borderRadius: 22,
    borderWidth: contorno,
    borderColor: cores.tinta,
    paddingBottom: ALTURA_LABIO,
    overflow: 'hidden',
  },
  face: {
    flex: 1,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brilho: {
    position: 'absolute',
    top: 6,
    left: 10,
    right: 10,
    height: 14,
    borderRadius: 7,
    backgroundColor: 'rgba(255, 255, 255, 0.28)',
  },
  letra: {
    fontSize: 40,
    fontWeight: '900',
  },
  desabilitado: {
    opacity: 0.55,
  },
})

export default Botoes
