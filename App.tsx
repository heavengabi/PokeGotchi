import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Provider as PaperProvider } from 'react-native-paper'
import Pokemon from './pages/Pokemon'
import SelecaoTeste from './pages/SelecaoTeste'
import { PokeJogo } from './types/pokemon'

export default function App() {
  // Único "dono" do pokémon do jogo. Como useContext é proibido, esse
  // state precisa ser passado via props pras duas telas (seleção e principal).
  const [pokemon, setPokemon] = useState<PokeJogo | null>(null)

  return (
    <PaperProvider>
      <View style={styles.container}>
        {!pokemon ? (
          <SelecaoTeste onEscolher={setPokemon} />
        ) : (
          <Pokemon pokemon={pokemon} setPokemon={setPokemon} Trocar={() => setPokemon(null)} />
        )}
      </View>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f1e8' },
})