import { Platform, StyleSheet, Text, View } from 'react-native'
import type { Feedback } from '../game/jogo'

type TelasProps = {
  tela1: string
  tela2: string
  feedback: Feedback
}

const coresBorda: Record<Feedback, string> = {
  nenhum: '#000',
  acerto: 'green',
  erro: 'red',
}

function Telas({ tela1, tela2, feedback }: TelasProps) {
  const bordaGrossa = feedback !== 'nenhum'

  return (
    <View>
      <View style={styles.tela1}>
        <Text style={styles.textoTela1} numberOfLines={1} adjustsFontSizeToFit>
          {tela1}
        </Text>
      </View>
      <View
        style={[
          styles.tela2,
          { borderColor: coresBorda[feedback], borderWidth: bordaGrossa ? 3 : 1 },
        ]}
      >
        <Text style={styles.textoTela2} numberOfLines={1} adjustsFontSizeToFit>
          {tela2}
        </Text>
      </View>
    </View>
  )
}

const fonteMonoespacada = Platform.select({
  ios: 'Courier New',
  android: 'monospace',
  default: 'Courier New, monospace',
})

const styles = StyleSheet.create({
  tela1: {
    backgroundColor: '#000',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  textoTela1: {
    color: 'red',
    fontFamily: fonteMonoespacada,
    fontSize: 40,
    fontWeight: 'bold',
  },
  tela2: {
    backgroundColor: '#000',
    height: 36,
    marginTop: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  textoTela2: {
    color: '#fff',
    fontFamily: fonteMonoespacada,
    fontSize: 18,
  },
})

export default Telas
