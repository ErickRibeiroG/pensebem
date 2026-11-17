import { useEffect, useRef, useState } from 'react'
import { Animated, StyleSheet, Text, View } from 'react-native'
import { PONTUACAO_MAXIMA } from '../game/jogo'
import type { Jogo } from '../game/jogo'
import { contorno, cores, driverNativo, fontes } from '../tema'

type TelasProps = {
  jogo: Jogo
  fonteLcd: boolean // false se a fonte de 7 segmentos não carregou
}

// Na fonte DSEG, '!' é um dígito apagado com a mesma largura do '8'
const APAGADO = '!'
const FUNDO_SEGMENTOS = '888-888'

const alinhar = (valor: number | string) => String(valor).padStart(3, APAGADO)

function textoDisplay(jogo: Jogo) {
  if (jogo.finalizado) return `${APAGADO.repeat(4)}${alinhar(jogo.pontuacao)}`
  if (jogo.programa === null) return `${APAGADO.repeat(3)}-${APAGADO.repeat(3)}`
  return `${jogo.programa}-${alinhar(jogo.pergunta)}`
}

function textoStatus(jogo: Jogo) {
  if (jogo.finalizado) return `FIM · ${jogo.pontuacao}/${PONTUACAO_MAXIMA} PTS`
  if (jogo.programa === null) return 'DIGITE O PROGRAMA'
  return 'TENTATIVA'
}

function Telas({ jogo, fonteLcd }: TelasProps) {
  const [largura, setLargura] = useState(0)
  const flash = useRef(new Animated.Value(0)).current
  const tremor = useRef(new Animated.Value(0)).current

  // Pisca a borda (verde/vermelho) e treme no erro a cada nova jogada
  useEffect(() => {
    if (jogo.jogada === 0) return
    flash.setValue(1)
    Animated.timing(flash, { toValue: 0, duration: 700, useNativeDriver: driverNativo }).start()
    if (jogo.feedback === 'erro') {
      tremor.setValue(0)
      Animated.sequence(
        [8, -8, 6, -6, 0].map((x) =>
          Animated.timing(tremor, { toValue: x, duration: 50, useNativeDriver: driverNativo }),
        ),
      ).start()
    }
  }, [jogo.jogada, jogo.feedback, flash, tremor])

  const display = textoDisplay(jogo)
  // 7 dígitos de 0,816em cada (medido na fonte); sobra margem para o padding
  const tamanhoFonte = largura > 0 ? Math.min(52, Math.floor((largura - 28) / 6)) : 40
  const corFlash = jogo.feedback === 'acerto' ? cores.acerto : cores.erro
  const emJogo = jogo.programa !== null && !jogo.finalizado

  return (
    <Animated.View style={[styles.moldura, { transform: [{ translateX: tremor }] }]}>
      <View style={styles.tela} onLayout={(e) => setLargura(e.nativeEvent.layout.width)}>
        <View style={styles.linhaDisplay}>
          {fonteLcd ? (
            <View>
              <Text style={[styles.lcd, styles.apagado, { fontSize: tamanhoFonte }]}>{FUNDO_SEGMENTOS}</Text>
              <Text
                style={[styles.lcd, styles.aceso, styles.sobreposto, { fontSize: tamanhoFonte }]}
                accessibilityLabel={display.replaceAll(APAGADO, ' ')}
              >
                {display}
              </Text>
            </View>
          ) : (
            <Text style={[styles.reserva, { fontSize: tamanhoFonte * 0.9 }]}>
              {display.replaceAll(APAGADO, ' ')}
            </Text>
          )}
        </View>

        <View style={styles.linhaStatus}>
          <Text style={styles.status} numberOfLines={1}>
            {textoStatus(jogo)}
          </Text>
          {emJogo && (
            <View style={styles.bolinhas} accessibilityLabel={`Tentativa ${jogo.tentativa} de 3`}>
              {[1, 2, 3].map((n) => (
                <View key={n} style={[styles.bolinha, n <= jogo.tentativa && styles.bolinhaAcesa]} />
              ))}
            </View>
          )}
        </View>

        <Animated.View
          pointerEvents="none"
          style={[styles.flash, { borderColor: corFlash, opacity: flash }]}
        />
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  moldura: {
    backgroundColor: cores.moldura,
    borderRadius: 18,
    borderWidth: contorno,
    borderColor: cores.tinta,
    padding: 10,
  },
  tela: {
    backgroundColor: cores.lcdFundo,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 14,
    boxShadow: 'inset 0px 4px 10px rgba(0, 0, 0, 0.8)',
  },
  linhaDisplay: {
    alignItems: 'center',
  },
  lcd: {
    fontFamily: fontes.lcd,
  },
  apagado: {
    color: cores.lcdApagado,
  },
  aceso: {
    color: cores.lcdTexto,
    textShadowColor: 'rgba(255, 59, 48, 0.75)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  },
  sobreposto: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  reserva: {
    color: cores.lcdTexto,
    fontFamily: fontes.mono,
    fontWeight: 'bold',
  },
  linhaStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 59, 48, 0.2)',
  },
  status: {
    color: cores.lcdTextoSuave,
    fontFamily: fontes.mono,
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 1.5,
  },
  bolinhas: {
    flexDirection: 'row',
    gap: 6,
  },
  bolinha: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: cores.lcdTexto,
  },
  bolinhaAcesa: {
    backgroundColor: cores.lcdTexto,
    boxShadow: `0px 0px 6px ${cores.lcdTexto}`,
  },
  flash: {
    ...StyleSheet.absoluteFill,
    borderRadius: 10,
    borderWidth: 4,
  },
})

export default Telas
