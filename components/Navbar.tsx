import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const Navbar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconeContainer}>
        <Image 
          source={require("../image/Cartoon_Pokeball_Sticker-removebg-preview.png")} 
          style={styles.imagemPokeball}
        />
      </View>

      <View style={styles.textosContainer}>
        <Text style={styles.titulo}>POKÉGOTCHI</Text>
        <Text style={styles.subtitle}>Pocket Partner</Text>
      </View>

      
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
    justifyContent: 'flex-start',
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
    resizeMode: 'contain',
  },
  textosContainer: {
    flexDirection: 'column',     // Mantém o subtítulo abaixo do título principal
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 32,
    fontFamily: 'Impact',
    letterSpacing: 3,
    fontWeight: '200',
    color: 'rgba(255, 196, 0, 1)',
    textShadowColor: 'blue',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
    transform: [{ scaleY: 0.85 }],
  },
  subtitle: {
    color: 'white',
    fontFamily: 'Knockout',
    letterSpacing: 2,
    fontSize: 11,
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    fontWeight: '800',
    marginTop: -4,
  },
})