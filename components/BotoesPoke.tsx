import { StyleSheet, View } from 'react-native'
import { Button } from 'react-native-paper'
import React from 'react'
import { useAudioPlayer } from 'expo-audio'
//adicionei sons nos botoes
interface Props {
  Alimentar: () => void
  Brincar: () => void
  Dormir: () => void
  Limpar: () => void
  Treinar: () => void
}

const BotoesPoke = ({
  Alimentar,
  Brincar,
  Dormir,
  Limpar,
  Treinar
}: Props) => {

  // Áudio de cada botão
  const somComer = useAudioPlayer(
    require('../assets/sounds/comer.mp3')
  )

  const somBrincar = useAudioPlayer(
    require('../assets/sounds/brincar.mp3')
  )

  const somDormir = useAudioPlayer(
    require('../assets/sounds/dormir.mp3')
  )

  const somTreinar = useAudioPlayer(
    require('../assets/sounds/treinar.mp3')
  )

  // Toca o áudio de comer e depois executa a ação
  const tocarComer = () => {
    somComer.seekTo(0)
    somComer.play()
    Alimentar()
  }

  // Toca o áudio de brincar e depois executa a ação
  const tocarBrincar = () => {
    somBrincar.seekTo(0)
    somBrincar.play()
    Brincar()
  }

  // Toca o áudio de dormir e depois executa a ação
  const tocarDormir = () => {
    somDormir.seekTo(0)
    somDormir.play()
    Dormir()
  }

  // Toca o áudio de treinar e depois executa a ação
  const tocarTreinar = () => {
    somTreinar.seekTo(0)
    somTreinar.play()
    Treinar()
  }

//nao achei som de limar
  const tocarLimpar = () => {
    Limpar()
  }

  return (
    <View style={styles.card}>

      <View style={styles.linha}>

        <Button
          mode="contained"
          icon="food-drumstick"
          buttonColor="#ef4444"
          style={styles.botaoMetade}
          onPress={tocarComer}
        >
          Alimentar
        </Button>

        <Button
          mode="contained"
          icon="soccer"
          buttonColor="#22c55e"
          style={styles.botaoMetade}
          onPress={tocarBrincar}
        >
          Brincar
        </Button>

      </View>

      <View style={styles.linha}>

        <Button
          mode="contained"
          icon="sleep"
          buttonColor="#818cf8"
          style={styles.botaoMetade}
          onPress={tocarDormir}
        >
          Dormir
        </Button>

        <Button
          mode="contained"
          icon="shower"
          buttonColor="#22d3ee"
          style={styles.botaoMetade}
          onPress={tocarLimpar}
        >
          Limpar
        </Button>

      </View>

      <Button
        mode="contained"
        icon="dumbbell"
        buttonColor="#2563eb"
        onPress={tocarTreinar}
      >
        Treinar +20 EXP
      </Button>

    </View>
  )
}

export default BotoesPoke

const styles = StyleSheet.create({
  card: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 24,
    gap: 10
  },

  linha: {
    flexDirection: 'row',
    gap: 10
  },

  botaoMetade: {
    flex: 1,
    borderRadius: 12
  },
})