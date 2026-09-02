import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { black, white } from 'react-native-paper/lib/typescript/styles/themes/v2/colors'

const Atributos = () => {
  return (
    <View>

    <View style={styles.containerdex}>
        <View style={styles.container}>
      <Text>Alguma coisa</Text>
      </View>
    </View>
    </View>
  )
}

export default Atributos

const styles = StyleSheet.create({

    containerdex:{
        backgroundColor: "black",
        borderRadius: 5,
        width: 150,
        height: 150

    },
    container:{
        backgroundColor: "white",
        borderRadius: 5,
        boxShadow: "2px 5px 5px blue",
        width: 100,
        height: 100
    }

})