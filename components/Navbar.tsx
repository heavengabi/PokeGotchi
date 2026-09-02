import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-paper'

const Navbar = () => {
  return (
    <View style={styles.container}>
        <View style={styles.imagem}>
             <Image src="./"></Image>
        </View>
       
        <Text style={styles.titulo}>POKÉGOTCHI</Text>
        <Text style={styles.subtitle}>ESCOLHA SEU PARCEIRO</Text>
    </View>
  )
}

export default Navbar

const styles = StyleSheet.create({
    container:{
        width: 400,
        padding: 20,
        backgroundColor: 'rgba(211, 12, 12, 1)',
        alignItems: 'center',
        justifyContent: 'center' ,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
    },
    imagem:{
        width: 20,
        height: 20,
        backgroundColor: 'yellow',
        borderRadius: '50%',
        borderWidth: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon:{
      width: 150,
      height: 150  
    },
    titulo:{
        marginTop: 10,
        fontSize: 35,
        fontFamily: 'Impact',
        letterSpacing: 4,
        fontWeight: '200',
        color: 'rgba(255, 196, 0, 1)',
        textShadowColor: 'blue',
        textShadowOffset: { 
      width: 2,   // Move a sombra para a direita (negativo move para a esquerda)
      height: 2,  // Move a sombra para baixo (negativo move para cima)
    },
    transform: [{ scaleY: 0.8 }],
    },
    subtitle:{
        color: 'white',
        fontFamily: 'Knockout',
        letterSpacing: 3,
        margin: 5,
        fontSize: 10,
        textShadowColor: 'black',
        textShadowRadius: 1,
        fontWeight: '800',
    }
})