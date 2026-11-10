import { Image, StyleSheet } from 'react-native'

function Titulo() {
  return (
    <Image
      source={require('../../assets/tectoy.png')}
      style={styles.logo}
      resizeMode="contain"
      accessibilityLabel="TecToy"
    />
  )
}

const styles = StyleSheet.create({
  logo: {
    width: '100%',
    height: 70,
    marginBottom: 12,
  },
})

export default Titulo
