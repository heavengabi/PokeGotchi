import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CardPoke = () => {
    return (
        <View style={styles.containerdex}>
            
        </View>
    )
}

export default CardPoke

const styles = StyleSheet.create({
    containerdex: {
        backgroundColor: "black",
        borderRadius: 5,
        width: 150,
        height: 150

    },
    container: {
        backgroundColor: "white",
        borderRadius: 5,
        boxShadow: "2px 5px 5px blue",
        width: 100,
        height: 100
    }

})