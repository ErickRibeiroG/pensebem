import { useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'

type StartProps = {
  emAndamento: boolean
  erro: string
  onStart: (codigo: string) => boolean
  onReset: () => void
}

function Start({ emAndamento, erro, onStart, onReset }: StartProps) {
  const [codigo, setCodigo] = useState('')

  if (emAndamento) {
    return (
      <Pressable
        style={({ pressed }) => [styles.botao, pressed && styles.pressionado]}
        onPress={() => {
          setCodigo('')
          onReset()
        }}
        accessibilityRole="button"
      >
        <Text style={styles.textoBotao}>Reiniciar Jogo</Text>
      </Pressable>
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
          placeholder="Código (111 a 115)"
          keyboardType="number-pad"
          maxLength={3}
          returnKeyType="go"
        />
        <Pressable
          style={({ pressed }) => [styles.botao, styles.botaoIniciar, pressed && styles.pressionado]}
          onPress={iniciar}
          accessibilityRole="button"
        >
          <Text style={styles.textoBotao}>Iniciar</Text>
        </Pressable>
      </View>
      {erro !== '' && <Text style={styles.erro}>{erro}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  linha: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 8,
  },
  campo: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: 4,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    fontSize: 16,
  },
  botao: {
    height: 40,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: 4,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  botaoIniciar: {
    marginTop: 0,
  },
  pressionado: {
    opacity: 0.6,
  },
  textoBotao: {
    fontSize: 16,
    color: '#222',
  },
  erro: {
    color: '#b00020',
    marginTop: 8,
    textAlign: 'center',
  },
})

export default Start
