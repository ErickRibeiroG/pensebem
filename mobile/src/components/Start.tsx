import { useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { contorno, cores, fontes } from '../tema'

type StartProps = {
  emAndamento: boolean
  erro: string
  onStart: (codigo: string) => boolean
  onReset: () => void
}

function BotaoBorracha({ titulo, onPress, largo = false }: { titulo: string; onPress: () => void; largo?: boolean }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" style={[styles.botaoBase, largo && styles.largo]}>
      {({ pressed }) => (
        <View style={[styles.botaoFace, pressed && styles.botaoPressionado]}>
          <Text style={styles.textoBotao}>{titulo}</Text>
        </View>
      )}
    </Pressable>
  )
}

function Start({ emAndamento, erro, onStart, onReset }: StartProps) {
  const [codigo, setCodigo] = useState('')

  if (emAndamento) {
    return (
      <View style={styles.linha}>
        <BotaoBorracha
          titulo="RESET"
          largo
          onPress={() => {
            setCodigo('')
            onReset()
          }}
        />
      </View>
    )
  }

  const iniciar = () => {
    if (onStart(codigo)) setCodigo('')
  }

  return (
    <View>
      <View style={styles.linha}>
        <TextInput
          style={styles.campo}
          value={codigo}
          onChangeText={(texto) => setCodigo(texto.replace(/\D/g, ''))}
          onSubmitEditing={iniciar}
          placeholder="PROG."
          placeholderTextColor="rgba(255, 59, 48, 0.4)"
          keyboardType="number-pad"
          maxLength={3}
          returnKeyType="go"
          accessibilityLabel="Código do programa"
        />
        <BotaoBorracha titulo="START" onPress={iniciar} />
      </View>
      {erro !== '' && (
        <View style={styles.erro}>
          <Text style={styles.textoErro}>{erro}</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  linha: {
    flexDirection: 'row',
    marginTop: 18,
    gap: 10,
  },
  campo: {
    flex: 1,
    minWidth: 0,
    height: 52,
    borderWidth: contorno,
    borderColor: cores.tinta,
    borderRadius: 14,
    backgroundColor: cores.lcdFundo,
    color: cores.lcdTexto,
    paddingHorizontal: 14,
    fontFamily: fontes.mono,
    fontWeight: 'bold',
    fontSize: 22,
    letterSpacing: 6,
    textAlign: 'center',
  },
  botaoBase: {
    height: 52,
    minWidth: 110,
    flexShrink: 0,
    borderRadius: 26,
    borderWidth: contorno,
    borderColor: cores.tinta,
    backgroundColor: cores.tinta,
    paddingBottom: 5,
    overflow: 'hidden',
  },
  largo: {
    flex: 1,
  },
  botaoFace: {
    flex: 1,
    borderRadius: 22,
    backgroundColor: '#3d3554',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  botaoPressionado: {
    transform: [{ translateY: 4 }],
  },
  textoBotao: {
    color: cores.branco,
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 2,
  },
  erro: {
    marginTop: 10,
    alignSelf: 'center',
    backgroundColor: cores.erro,
    borderWidth: 2,
    borderColor: cores.tinta,
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  textoErro: {
    color: cores.branco,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})

export default Start
