import { useState } from 'react'
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import type { PaginaRevista } from '../game/revista'
import { contorno, cores } from '../tema'

type ConsultarRevistaProps = {
  visivel: boolean
  programa: string
  paginas: PaginaRevista[]
  onFechar: () => void
}

// Quanto o botão "Ampliar" aumenta a página
const ZOOM = 2

// Mostra as páginas da revista do programa escolhido por cima do jogo.
// Fica montado durante todo o programa, então reabre na última página vista.
function ConsultarRevista({ visivel, programa, paginas, onFechar }: ConsultarRevistaProps) {
  const insets = useSafeAreaInsets()
  const { width } = useWindowDimensions()
  const [indice, setIndice] = useState(0)
  const [ampliada, setAmpliada] = useState(false)

  const pagina = paginas[Math.min(indice, paginas.length - 1)]
  if (!pagina) return null

  const larguraPagina = Math.min(width, 700) * (ampliada ? ZOOM : 1)
  const alturaPagina = larguraPagina * (pagina.altura / pagina.largura)

  const irPara = (novo: number) => {
    setIndice(novo)
    setAmpliada(false)
  }

  const primeira = indice === 0
  const ultima = indice === paginas.length - 1

  return (
    <Modal visible={visivel} animationType="slide" onRequestClose={onFechar} statusBarTranslucent>
      <View style={[styles.tela, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <View style={styles.topo}>
          <Text style={styles.titulo} numberOfLines={1}>
            PROGRAMA {programa} · PÁG. {indice + 1} DE {paginas.length}
          </Text>
          <Pressable
            onPress={onFechar}
            accessibilityRole="button"
            accessibilityLabel="Fechar revista"
            hitSlop={10}
            style={({ pressed }) => [styles.fechar, pressed && styles.pressionado]}
          >
            <Text style={styles.textoFechar}>✕</Text>
          </Pressable>
        </View>

        {/* key: volta para o topo ao trocar de página ou de zoom */}
        <ScrollView key={`${indice}-${ampliada}`} style={styles.area} contentContainerStyle={styles.centro}>
          <ScrollView horizontal scrollEnabled={ampliada} contentContainerStyle={styles.centro}>
            <Image
              source={pagina.fonte}
              style={{ width: larguraPagina, height: alturaPagina }}
              resizeMode="contain"
              accessibilityLabel={`Página ${pagina.numero} da revista`}
            />
          </ScrollView>
        </ScrollView>

        <View style={styles.rodape}>
          <BotaoRodape texto="‹ Anterior" desabilitado={primeira} onPress={() => irPara(indice - 1)} />
          <BotaoRodape
            texto={ampliada ? 'Reduzir' : 'Ampliar'}
            destaque
            onPress={() => setAmpliada((atual) => !atual)}
          />
          <BotaoRodape texto="Próxima ›" desabilitado={ultima} onPress={() => irPara(indice + 1)} />
        </View>
      </View>
    </Modal>
  )
}

function BotaoRodape({
  texto,
  onPress,
  desabilitado = false,
  destaque = false,
}: {
  texto: string
  onPress: () => void
  desabilitado?: boolean
  destaque?: boolean
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={desabilitado}
      accessibilityRole="button"
      accessibilityState={{ disabled: desabilitado }}
      style={({ pressed }) => [
        styles.botao,
        destaque && styles.botaoDestaque,
        desabilitado && styles.desabilitado,
        pressed && styles.pressionado,
      ]}
    >
      <Text style={styles.textoBotao}>{texto}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: cores.tinta,
  },
  topo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: cores.manchete,
    borderBottomWidth: contorno,
    borderBottomColor: cores.tinta,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  titulo: {
    flex: 1,
    color: cores.branco,
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 1,
  },
  fechar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: cores.tinta,
    backgroundColor: cores.branco,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoFechar: {
    color: cores.tinta,
    fontSize: 18,
    fontWeight: '900',
  },
  area: {
    flex: 1,
  },
  centro: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rodape: {
    flexDirection: 'row',
    gap: 8,
    padding: 10,
    backgroundColor: cores.tinta,
  },
  botao: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: cores.papel,
    backgroundColor: cores.aparelho,
  },
  botaoDestaque: {
    backgroundColor: cores.manchete,
  },
  textoBotao: {
    color: cores.branco,
    fontSize: 15,
    fontWeight: '900',
  },
  desabilitado: {
    opacity: 0.35,
  },
  pressionado: {
    opacity: 0.7,
  },
})

export default ConsultarRevista
