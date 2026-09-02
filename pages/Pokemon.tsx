import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Navbar from '../components/Navbar'
import CardPoke from '../components/CardPoke'
import Atributos from '../components/Atributos'

const Pokemon = () => {
  return (
    <View>
      <Navbar/>
      <CardPoke/>
      <Atributos/>
    </View>
  )
}

export default Pokemon

const styles = StyleSheet.create({})