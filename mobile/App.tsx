import { StatusBar } from 'expo-status-bar'
import { useFonts } from 'expo-font'
import { ScrollView, StyleSheet, View } from 'react-native'
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context'
import Titulo from './src/components/Titulo'
import Telas from './src/components/Telas'
import Botoes from './src/components/Botoes'
import Start from './src/components/Start'
import Revista from './src/components/Revista'
import { useJogo } from './src/hooks/useJogo'
import { contorno, cores, fontes, sombraDura } from './src/tema'

export default function App() {
  const [fonteCarregada, erroFonte] = useFonts({
    [fontes.lcd]: require('./assets/fonts/DSEG7Classic-Bold.ttf'),
  })

  // Espera a fonte do LCD (ou a falha dela) para não "piscar" a tela
  if (!fonteCarregada && !erroFonte) return null

  return (
    <SafeAreaProvider>
      <Tela fonteLcd={fonteCarregada} />
    </SafeAreaProvider>
  )
}

function Tela({ fonteLcd }: { fonteLcd: boolean }) {
  const insets = useSafeAreaInsets()
  const { jogo, pergunta, progresso, emAndamento, erro, iniciar, reiniciar, jogar } = useJogo()
  const jogando = emAndamento && !jogo.finalizado

  return (
    <ScrollView
      style={styles.fundo}
      contentContainerStyle={[
        styles.conteudo,
        { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 24 },
      ]}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.coluna}>
        <Revista
          jogo={jogo}
          pergunta={pergunta}
          progresso={progresso}
          onEscolherPrograma={iniciar}
        />

        <View style={styles.aparelho}>
          <View style={styles.aparelhoBrilho} />
          <Titulo ligado={emAndamento} />
          <Telas jogo={jogo} fonteLcd={fonteLcd} />
          <Botoes onAnswer={jogar} disabled={!jogando} />
          <Start emAndamento={emAndamento} erro={erro} onStart={iniciar} onReset={reiniciar} />
        </View>
      </View>
      <StatusBar style="dark" />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  fundo: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  conteudo: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  coluna: {
    width: '100%',
    maxWidth: 420,
    alignSelf: 'center',
    gap: 22,
  },
  aparelho: {
    backgroundColor: cores.aparelho,
    borderRadius: 32,
    borderWidth: contorno,
    borderColor: cores.tinta,
    padding: 18,
    overflow: 'hidden',
    ...sombraDura(6),
  },
  // Reflexo no plástico, no topo do aparelho
  aparelhoBrilho: {
    position: 'absolute',
    top: 6,
    left: 14,
    right: 14,
    height: 26,
    borderRadius: 13,
    backgroundColor: cores.aparelhoClaro,
    opacity: 0.45,
  },
})
