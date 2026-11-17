import { Image, StyleSheet, View } from 'react-native'
import { cores } from '../tema'

type TituloProps = {
  ligado: boolean
}

// Topo do aparelho: logo, LED de "ligado" e grade do alto-falante
function Titulo({ ligado }: TituloProps) {
  return (
    <View style={styles.topo}>
      <View style={[styles.led, ligado && styles.ledAceso]} accessibilityLabel={ligado ? 'Ligado' : 'Aguardando'} />
      <Image
        source={require('../../assets/tectoy.png')}
        style={styles.logo}
        resizeMode="contain"
        accessibilityLabel="TecToy"
      />
      <View style={styles.altoFalante}>
        {[0, 1, 2, 3].map((i) => (
          <View key={i} style={styles.furo} />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  topo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  led: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: cores.tinta,
    backgroundColor: '#3b5a3f',
  },
  ledAceso: {
    backgroundColor: '#5cff8a',
    boxShadow: '0px 0px 10px #5cff8a',
  },
  logo: {
    flex: 1,
    height: 52,
  },
  altoFalante: {
    gap: 4,
  },
  furo: {
    width: 22,
    height: 4,
    borderRadius: 2,
    backgroundColor: cores.aparelhoEscuro,
  },
})

export default Titulo
