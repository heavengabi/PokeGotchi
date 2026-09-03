import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface Props {
  fome: number
  felicidade: number
  energia: number
  higiene: number
}

const Atributos = ({ fome, felicidade, energia, higiene }: Props) => {
  return (
    <View style={styles.containerdex}>
      <View style={styles.container}>

        <Text style={styles.text}>🍖 Saciedade</Text>
        <View style={styles.trilho}>
          <View style={[styles.preenchimento, { width: `${fome}%`, backgroundColor: '#f59e0b' }]} />
        </View>
        <Text style={styles.porcentagem}>{fome}%</Text>

        <Text style={styles.text}>😁 Felicidade</Text>
        <View style={styles.trilho}>
          <View style={[styles.preenchimento, { width: `${felicidade}%`, backgroundColor: '#ec4899' }]} />
        </View>
        <Text style={styles.porcentagem}>{felicidade}%</Text>

        <Text style={styles.text}>⚡ Energia</Text>
        <View style={styles.trilho}>
          <View style={[styles.preenchimento, { width: `${energia}%`, backgroundColor: '#3b82f6' }]} />
        </View>
        <Text style={styles.porcentagem}>{energia}%</Text>

        <Text style={styles.text}>✨ Higiene</Text>
        <View style={styles.trilho}>
          <View style={[styles.preenchimento, { width: `${higiene}%`, backgroundColor: '#10b981' }]} />
        </View>
        <Text style={styles.porcentagem}>{higiene}%</Text>

      </View>
    </View>
  )
}

export default Atributos

const styles = StyleSheet.create({
  containerdex: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    borderRadius: 5,
    width: '80%',
    padding: 12,
  },
  container: {
    justifyContent: 'center',
    backgroundColor: 'yellow',
    borderRadius: 20,
    width: '90%',
    padding: 12,
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Inter',
    marginBottom: 4,
  },
  trilho: {
    height: 12,
    backgroundColor: '#00000030',
    borderRadius: 6,
    overflow: 'hidden',
  },
  preenchimento: {
    height: '100%',
    borderRadius: 6,
  },
  porcentagem: {
    fontSize: 12,
    textAlign: 'right',
    marginBottom: 10,
  },
})