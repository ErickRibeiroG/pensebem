import { useEffect, useRef } from 'react'
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native'
import { PONTUACAO_MAXIMA, RESPOSTAS, calcularEstrelas, listaProgramas } from '../game/jogo'
import type { Jogo } from '../game/jogo'
import type { Pergunta } from '../game/perguntas'
import { contorno, cores, coresBotao, driverNativo, sombraDura } from '../tema'

type Progresso = { atual: number; total: number; respondidas: number }

type RevistaProps = {
  jogo: Jogo
  pergunta: Pergunta | undefined
  progresso: Progresso
  onEscolherPrograma: (codigo: string) => void
}

function Revista({ jogo, pergunta, progresso, onEscolherPrograma }: RevistaProps) {
  // "Vira a página" quando muda a pergunta ou o estado do jogo
  const chavePagina = `${jogo.programa}-${jogo.pergunta}-${jogo.finalizado}`
  const entrada = useRef(new Animated.Value(1)).current

  useEffect(() => {
    entrada.setValue(0)
    Animated.timing(entrada, { toValue: 1, duration: 320, useNativeDriver: driverNativo }).start()
  }, [chavePagina, entrada])

  const animacao = {
    opacity: entrada,
    transform: [{ translateX: entrada.interpolate({ inputRange: [0, 1], outputRange: [24, 0] }) }],
  }

  let titulo = 'ESCOLHA UM PROGRAMA'
  if (jogo.finalizado) titulo = `PROGRAMA ${jogo.programa} · FIM`
  else if (jogo.programa !== null) titulo = `PROGRAMA ${jogo.programa}`

  return (
    <View style={styles.revista}>
      <View style={styles.manchete}>
        <Text style={styles.textoManchete}>REVISTA</Text>
        <Text style={styles.textoMancheteDireita} numberOfLines={1}>
          {titulo}
        </Text>
      </View>

      <Animated.View style={[styles.pagina, animacao]}>
        {jogo.programa === null && <Capa onEscolher={onEscolherPrograma} />}
        {jogo.programa !== null && !jogo.finalizado && (
          <PaginaPergunta jogo={jogo} pergunta={pergunta} progresso={progresso} />
        )}
        {jogo.finalizado && <Resultado jogo={jogo} />}
      </Animated.View>
    </View>
  )
}

function Capa({ onEscolher }: { onEscolher: (codigo: string) => void }) {
  return (
    <View>
      <Text style={styles.instrucao}>
        Toque num programa ou digite o código no aparelho. Leia a pergunta e responda com os botões
        coloridos.
      </Text>
      <View style={styles.listaProgramas}>
        {listaProgramas.map(({ codigo, primeira, ultima }, i) => {
          const cor = coresBotao[RESPOSTAS[i % RESPOSTAS.length]]
          return (
            <Pressable
              key={codigo}
              onPress={() => onEscolher(codigo)}
              accessibilityRole="button"
              accessibilityLabel={`Programa ${codigo}, perguntas ${primeira} a ${ultima}`}
              style={({ pressed }) => [styles.programa, pressed && styles.programaPressionado]}
            >
              <View style={[styles.programaCodigo, { backgroundColor: cor.face }]}>
                <Text style={[styles.textoCodigo, { color: cor.letra }]}>{codigo}</Text>
              </View>
              <Text style={styles.textoPrograma}>
                Perguntas {primeira} a {ultima}
              </Text>
              <Text style={styles.seta}>›</Text>
            </Pressable>
          )
        })}
      </View>
    </View>
  )
}

function PaginaPergunta({
  jogo,
  pergunta,
  progresso,
}: {
  jogo: Jogo
  pergunta: Pergunta | undefined
  progresso: Progresso
}) {
  const percentual = progresso.total > 0 ? (progresso.respondidas / progresso.total) * 100 : 0

  return (
    <View>
      <View style={styles.cabecalhoPergunta}>
        <View style={styles.numero}>
          <Text style={styles.textoNumero}>{jogo.pergunta}</Text>
        </View>
        <View style={styles.progresso}>
          <Text style={styles.textoProgresso}>
            Pergunta {progresso.atual} de {progresso.total}
          </Text>
          <View style={styles.barra}>
            <View style={[styles.barraCheia, { width: `${percentual}%` }]} />
          </View>
        </View>
      </View>

      <Text style={styles.enunciado}>
        {pergunta ? pergunta.enunciado : `Consulte a pergunta ${jogo.pergunta} no seu livro.`}
      </Text>

      <View style={styles.alternativas}>
        {RESPOSTAS.map((letra) => {
          const eliminada = jogo.eliminadas.includes(letra)
          return (
            <View
              key={letra}
              style={[styles.alternativa, eliminada && styles.eliminada]}
              accessibilityLabel={eliminada ? `Alternativa ${letra}, já tentada` : undefined}
            >
              <View style={[styles.bolaLetra, { backgroundColor: coresBotao[letra].face }]}>
                <Text style={[styles.textoLetra, { color: coresBotao[letra].letra }]}>{letra}</Text>
              </View>
              <Text style={[styles.textoAlternativa, eliminada && styles.riscado]}>
                {pergunta ? pergunta.alternativas[letra] : '· · ·'}
              </Text>
            </View>
          )
        })}
      </View>
    </View>
  )
}

const MENSAGENS = ['Vamos tentar de novo?', 'Bom começo!', 'Muito bem!', 'Incrível!']

function Resultado({ jogo }: { jogo: Jogo }) {
  const estrelas = calcularEstrelas(jogo.pontuacao)

  return (
    <View style={styles.resultado}>
      <View style={styles.estrelas} accessibilityLabel={`${estrelas} de 3 estrelas`}>
        {[0, 1, 2].map((i) => (
          <Text key={i} style={[styles.estrela, i < estrelas ? styles.estrelaCheia : styles.estrelaVazia]}>
            ★
          </Text>
        ))}
      </View>
      <Text style={styles.mensagem}>{MENSAGENS[estrelas]}</Text>
      <Text style={styles.pontos}>
        {jogo.pontuacao}
        <Text style={styles.pontosMaximo}> / {PONTUACAO_MAXIMA} pontos</Text>
      </Text>
      <Text style={styles.detalhe}>{jogo.acertosPrimeira} acertos de primeira</Text>
      <Text style={styles.dica}>Aperte RESET para escolher outro programa.</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  revista: {
    backgroundColor: cores.papel,
    borderRadius: 18,
    borderWidth: contorno,
    borderColor: cores.tinta,
    overflow: 'hidden',
    ...sombraDura(6),
  },
  manchete: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    backgroundColor: cores.manchete,
    borderBottomWidth: contorno,
    borderBottomColor: cores.tinta,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  textoManchete: {
    color: cores.branco,
    fontSize: 18,
    fontWeight: '900',
    fontStyle: 'italic',
    letterSpacing: 2,
  },
  textoMancheteDireita: {
    flexShrink: 1,
    color: cores.branco,
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  pagina: {
    padding: 16,
  },

  // Capa
  instrucao: {
    color: cores.textoPapel,
    fontSize: 15,
    lineHeight: 21,
  },
  listaProgramas: {
    marginTop: 12,
    gap: 8,
  },
  programa: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 2,
    borderColor: cores.tinta,
    borderRadius: 12,
    padding: 6,
    backgroundColor: cores.branco,
  },
  programaPressionado: {
    backgroundColor: cores.papelLinha,
  },
  programaCodigo: {
    borderWidth: 2,
    borderColor: cores.tinta,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  textoCodigo: {
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1,
  },
  textoPrograma: {
    flex: 1,
    color: cores.textoPapel,
    fontSize: 15,
    fontWeight: '600',
  },
  seta: {
    color: cores.textoSuave,
    fontSize: 24,
    fontWeight: 'bold',
    paddingRight: 6,
  },

  // Pergunta
  cabecalhoPergunta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  numero: {
    minWidth: 58,
    height: 58,
    paddingHorizontal: 6,
    borderRadius: 14,
    borderWidth: contorno,
    borderColor: cores.tinta,
    backgroundColor: cores.fundo,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '-4deg' }],
  },
  textoNumero: {
    color: cores.tinta,
    fontSize: 26,
    fontWeight: '900',
  },
  progresso: {
    flex: 1,
    gap: 6,
  },
  textoProgresso: {
    color: cores.textoSuave,
    fontSize: 13,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  barra: {
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: cores.tinta,
    backgroundColor: cores.papelLinha,
    overflow: 'hidden',
  },
  barraCheia: {
    height: '100%',
    backgroundColor: cores.acerto,
  },
  enunciado: {
    marginTop: 14,
    color: cores.textoPapel,
    fontSize: 18,
    lineHeight: 25,
    fontWeight: '700',
  },
  alternativas: {
    marginTop: 12,
    gap: 8,
  },
  alternativa: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: cores.papelLinha,
  },
  eliminada: {
    opacity: 0.35,
  },
  bolaLetra: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: cores.tinta,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoLetra: {
    fontSize: 15,
    fontWeight: '900',
  },
  textoAlternativa: {
    flex: 1,
    color: cores.textoPapel,
    fontSize: 16,
  },
  riscado: {
    textDecorationLine: 'line-through',
  },

  // Resultado
  resultado: {
    alignItems: 'center',
    paddingVertical: 4,
  },
  estrelas: {
    flexDirection: 'row',
    gap: 6,
  },
  estrela: {
    fontSize: 44,
  },
  estrelaCheia: {
    color: cores.fundo,
    textShadowColor: cores.tinta,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  estrelaVazia: {
    color: cores.papelLinha,
  },
  mensagem: {
    marginTop: 4,
    color: cores.textoPapel,
    fontSize: 20,
    fontWeight: '900',
  },
  pontos: {
    marginTop: 8,
    color: cores.manchete,
    fontSize: 40,
    fontWeight: '900',
  },
  pontosMaximo: {
    color: cores.textoSuave,
    fontSize: 16,
    fontWeight: 'bold',
  },
  detalhe: {
    color: cores.textoPapel,
    fontSize: 15,
  },
  dica: {
    marginTop: 12,
    color: cores.textoSuave,
    fontSize: 13,
  },
})

export default Revista
