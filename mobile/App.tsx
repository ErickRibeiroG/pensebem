import { StatusBar } from 'expo-status-bar'
import { ScrollView, StyleSheet, View } from 'react-native'
import Titulo from './src/components/Titulo'
import Telas from './src/components/Telas'
import Botoes from './src/components/Botoes'
import Start from './src/components/Start'
import { useJogo } from './src/hooks/useJogo'

export default function App() {
  const { telas, emAndamento, erro, iniciar, reiniciar, jogar } = useJogo()

  return (
    <ScrollView
      style={styles.fundo}
      contentContainerStyle={styles.centro}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.quadro}>
        <Titulo />
        <Telas {...telas} />
        <Botoes onAnswer={jogar} disabled={!emAndamento} />
        <Start emAndamento={emAndamento} erro={erro} onStart={iniciar} onReset={reiniciar} />
      </View>
      <StatusBar style="dark" />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  fundo: {
    flex: 1,
    backgroundColor: '#ccc',
  },
  centro: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
    paddingTop: 48,
  },
  quadro: {
    width: '100%',
    maxWidth: 360,
    alignSelf: 'center',
    backgroundColor: '#eeeebb',
    padding: 16,
  },
})
