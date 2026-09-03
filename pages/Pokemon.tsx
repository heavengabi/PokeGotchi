import { StyleSheet, View } from 'react-native'
import React from 'react'
import Navbar from '../components/Navbar'
import CardPoke from '../components/CardPoke'
import Atributos from '../components/Atributos'


const Pokemon = () => {
  return (
    <View style={styles.container}>
      <Navbar />
      <View style={styles.containercard}>
        <CardPoke/>
      </View>
      <View style={styles.containeratri}>
        <Atributos/>
      </View>
    </View>
  )
}

export default Pokemon

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    zIndex: 999,
    elevation: 10,
  },
  containercard: {
    alignItems: 'center',
    justifyContent: 'center',
    top: 50,
  },
  containeratri: {
    alignItems: 'center',
    justifyContent: 'center',
    top: 100,
  },
})