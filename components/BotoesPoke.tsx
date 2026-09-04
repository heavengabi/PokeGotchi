import { StyleSheet, View } from 'react-native'
import { Button } from 'react-native-paper'
import React from 'react'

interface Props {
  aoAlimentar: () => void
  aoBrincar: () => void
  aoDormir: () => void
  aoLimpar: () => void
  aoTreinar: () => void
}

const BotoesPoke = ({ aoAlimentar, aoBrincar, aoDormir, aoLimpar, aoTreinar }: Props) => {
  return (
    <View style={styles.card}>
      <View style={styles.linha}>
        <Button mode="contained" icon="food-drumstick" buttonColor="#ef4444" style={styles.botaoMetade} onPress={aoAlimentar}>
          Alimentar
        </Button>
        <Button mode="contained" icon="soccer" buttonColor="#22c55e" style={styles.botaoMetade} onPress={aoBrincar}>
          Brincar
        </Button>
      </View>
      <View style={styles.linha}>
        <Button mode="contained" icon="sleep" buttonColor="#818cf8" style={styles.botaoMetade} onPress={aoDormir}>
          Dormir
        </Button>
        <Button mode="contained" icon="shower" buttonColor="#22d3ee" style={styles.botaoMetade} onPress={aoLimpar}>
          Limpar
        </Button>
      </View>
      <Button mode="contained" icon="dumbbell" buttonColor="#2563eb" onPress={aoTreinar}>
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