import { View, Text, Button, StyleSheet } from 'react-native'
import React from 'react'
import { PokeJogo } from '../types/pokemon'

interface Props {
  onEscolher: (pokemon: PokeJogo) => void
}

export default function SelecaoInicial({ onEscolher }: Props) {
  function escolherCharmander() {
    onEscolher({
      speciesId: 4,
      nome: 'charmander',
      imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
      tipos: ['fire'],
      nivel: 1,
      experiencia: 0,
      experienciaProximoNivel: 100,
      atributos: { fome: 80, felicidade: 80, energia: 80, higiene: 80 },
      precisaEvoluir: false,
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Stub temporário — sua colega substitui isso</Text>
      <Button title="Escolher Charmander (teste)" onPress={escolherCharmander} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12 },
  texto: { textAlign: 'center', paddingHorizontal: 20 },
})