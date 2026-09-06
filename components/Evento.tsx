import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface Props {
  mensagem: string
}

const Evento = ({ mensagem }: Props) => {
  return (
    <View style={styles.banner}>
      <Text style={styles.texto}>{mensagem}</Text>
    </View>
  )
}

export default Evento

const styles = StyleSheet.create({
  banner: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#facc15',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#1e3a8a',
    paddingVertical: 12,
    marginTop: 16,
    alignItems: 'center',
  },
  texto: { 
    fontWeight: '800', 
    fontSize: 15, 
    textAlign: 'center' 
  },
})