import { useEffect, useRef, useState } from 'react'
import { useEventListener } from 'expo'
import { useVideoPlayer, VideoView } from 'expo-video'
import type { VideoPlayer } from 'expo-video'
import { Animated, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { PONTUACAO_MAXIMA, RESPOSTAS, calcularEstrelas, listaProgramas } from '../game/jogo'
import type { Jogo } from '../game/jogo'
import type { Pergunta } from '../game/perguntas'
import { contorno, cores, coresBotao, driverNativo, sombraDura } from '../tema'

const videoPontuacaoBaixa = require('../../assets/videos/woodyRindo.mp4')

type Progresso = { atual: number; total: number; respondidas: number }

type RevistaProps = {
  jogo: Jogo
  pergunta: Pergunta | undefined
  progresso: Progresso
  onEscolherPrograma: (codigo: string) => void
}

function Revista({ jogo, pergunta, progresso, onEscolherPrograma }: RevistaProps) {
  // O player é criado já na abertura da revista para o vídeo carregar durante o jogo,
  // e não só quando a tela de resultado aparece
  const playerPontuacaoBaixa = useVideoPlayer(videoPontuacaoBaixa, (p) => {
    p.loop = true
    // Navegadores só deixam tocar sozinho se estiver no mudo (o vídeo não tem áudio)
    p.muted = true
  })
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
        <View style={styles.mancheteEsquerda}>
          <Text style={styles.textoManchete}>REVISTA</Text>
          <View style={styles.seloLogo}>
            <Image
              source={require('../../assets/toystory.png')}
              style={styles.logo}
              resizeMode="contain"
              accessibilityLabel="Toy Story"
            />
          </View>
        </View>
        <Text style={styles.textoMancheteDireita} numberOfLines={1}>
          {titulo}
        </Text>
      </View>

      <Animated.View style={[styles.pagina, animacao]}>
        {jogo.programa === null && <Capa onEscolher={onEscolherPrograma} />}
        {jogo.programa !== null && !jogo.finalizado && (
          <PaginaPergunta jogo={jogo} pergunta={pergunta} progresso={progresso} />
        )}
        {jogo.finalizado && <Resultado jogo={jogo} player={playerPontuacaoBaixa} />}
      </Animated.View>

      {/* No web o arquivo só é baixado quando existe um <video> na tela: este fica
          invisível durante o jogo só para adiantar o carregamento */}
      {jogo.programa !== null && !jogo.finalizado && (
        <VideoView player={playerPontuacaoBaixa} style={styles.preCarregamento} nativeControls={false} />
      )}
    </View>
  )
}

function Capa({ onEscolher }: { onEscolher: (codigo: string) => void }) {
  return (
    <View>
      <Text style={styles.instrucao}>
        Toque num programa ou digite o código no aparelho e responda com os botões coloridos.
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
              <Text style={styles.textoPrograma} numberOfLines={1}>
                Perg. {primeira}–{ultima}
              </Text>
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

// Até 1 estrela (menos de 50% dos pontos) conta como pontuação baixa
const ESTRELAS_PONTUACAO_BAIXA = 1

function VideoPontuacaoBaixa({ player }: { player: VideoPlayer }) {
  // Esconde o vídeo até o primeiro quadro estar pronto, para não aparecer uma caixa vazia
  const [pronto, setPronto] = useState(false)

  // O play() precisa vir depois que o VideoView montou: no web, chamar dentro do
  // setup do useVideoPlayer não tem efeito porque ainda não existe <video> na tela
  useEffect(() => {
    player.play()
  }, [player])

  useEventListener(player, 'statusChange', ({ status }) => {
    if (status === 'readyToPlay' && !player.playing) player.play()
  })

  return (
    <View style={[styles.moldeVideo, !pronto && styles.escondido]}>
      <VideoView
        player={player}
        onFirstFrameRender={() => setPronto(true)}
        style={styles.video}
        contentFit="cover"
        nativeControls={false}
        accessibilityLabel="Vídeo de pontuação baixa"
      />
    </View>
  )
}

function Resultado({ jogo, player }: { jogo: Jogo; player: VideoPlayer }) {
  const estrelas = calcularEstrelas(jogo.pontuacao)
  const pontuacaoBaixa = estrelas <= ESTRELAS_PONTUACAO_BAIXA

  return (
    <View style={styles.resultado}>
      <View style={styles.estrelas} accessibilityLabel={`${estrelas} de 3 estrelas`}>
        {[0, 1, 2].map((i) => (
          <Text key={i} style={[styles.estrela, i < estrelas ? styles.estrelaCheia : styles.estrelaVazia]}>
            ★
          </Text>
        ))}
      </View>
      {pontuacaoBaixa ? (
        <VideoPontuacaoBaixa player={player} />
      ) : (
        <Text style={styles.mensagem}>{MENSAGENS[estrelas]}</Text>
      )}
      <Text style={styles.pontos}>
        {jogo.pontuacao}
        <Text style={styles.pontosMaximo}> / {PONTUACAO_MAXIMA} pontos</Text>
      </Text>
      {!pontuacaoBaixa && (
        <Text style={styles.detalhe}>{jogo.acertosPrimeira} acertos de primeira</Text>
      )}
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
  mancheteEsquerda: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  seloLogo: {
    backgroundColor: cores.branco,
    borderWidth: 2,
    borderColor: cores.tinta,
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  logo: {
    width: 40,
    height: 30,
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
    fontSize: 14,
    lineHeight: 19,
  },
  listaProgramas: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 6,
  },
  programa: {
    width: '49%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 2,
    borderColor: cores.tinta,
    borderRadius: 10,
    padding: 4,
    backgroundColor: cores.branco,
  },
  programaPressionado: {
    backgroundColor: cores.papelLinha,
  },
  programaCodigo: {
    borderWidth: 2,
    borderColor: cores.tinta,
    borderRadius: 8,
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  textoCodigo: {
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 1,
  },
  textoPrograma: {
    flex: 1,
    color: cores.textoPapel,
    fontSize: 13,
    fontWeight: '600',
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 8,
  },
  alternativa: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
    fontSize: 15,
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
  moldeVideo: {
    marginTop: 8,
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 12,
    borderWidth: contorno,
    borderColor: cores.tinta,
    overflow: 'hidden',
    backgroundColor: cores.tinta,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  escondido: {
    opacity: 0,
  },
  preCarregamento: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0,
    pointerEvents: 'none',
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
