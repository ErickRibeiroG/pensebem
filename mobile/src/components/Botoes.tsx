import { Pressable, StyleSheet, Text, View } from 'react-native'
import type { Resposta } from '../game/jogo'

type BotoesProps = {
  onAnswer: (resposta: Resposta) => void
  disabled?: boolean
}

const botoes: { resposta: Resposta; cor: string }[] = [
  { resposta: 'A', cor: 'red' },
  { resposta: 'B', cor: 'yellow' },
  { resposta: 'C', cor: 'blue' },
  { resposta: 'D', cor: 'green' },
]

function Botoes({ onAnswer, disabled = false }: BotoesProps) {
  return (
    <View style={styles.grade}>
      {botoes.map(({ resposta, cor }) => (
        <Pressable
          key={resposta}
          onPress={() => onAnswer(resposta)}
          disabled={disabled}
          accessibilityRole="button"
          accessibilityLabel={`Resposta ${resposta}`}
          style={({ pressed }) => [
            styles.botao,
            { backgroundColor: cor, opacity: pressed ? 0.6 : 1 },
          ]}
        >
          <Text style={styles.letra}>{resposta}</Text>
        </Pressable>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  grade: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
  },
  botao: {
    width: '50%',
    height: 110,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  letra: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
  },
})

export default Botoes
