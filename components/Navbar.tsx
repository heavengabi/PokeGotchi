import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

interface Props {
  Trocar: () => void
}

const Navbar = ({ Trocar }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconeContainer}>
        <Image
          source={require('../image/Cartoon_Pokeball_Sticker-removebg-preview.png')}
          style={styles.imagemPokeball}
        />
      </View>

      <View style={styles.textosContainer}>
        <Text style={styles.titulo}>POKÉGOTCHI</Text>
        <Text style={styles.subtitle}>Pocket Partner</Text>
      </View>

      <TouchableOpacity onPress={Trocar}>
        <Text style={styles.textoTrocar}>Trocar</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Navbar

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(211, 12, 12, 1)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 15,
  },
  iconeContainer: {
    width: 60,
    height: 60,
    backgroundColor: 'yellow',
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagemPokeball: { 
    width: 65, 
    height: 65, 
    resizeMode: 'contain' 
  },
  textosContainer: { 
    flex: 1, 
    marginLeft: 10 
  },
  titulo: {
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: 3,
    color: 'rgba(255, 196, 0, 1)',
    textShadowColor: 'blue',
    textShadowOffset: { 
      width: 2, 
      height: 2 
    },
    textShadowRadius: 1,
  },
  subtitle: {
    color: 'white',
    letterSpacing: 2,
    fontSize: 11,
    textShadowColor: 'black',
    textShadowOffset: { 
      width: 1, 
      height: 1 
    },
    textShadowRadius: 1,
    fontWeight: '800',
    marginTop: -4,
  },
  textoTrocar: { 
    color: '#fff', 
    fontWeight: '700', 
    fontSize: 14 
  },
})