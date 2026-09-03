import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const CardPoke = () => {
    return (
        <View style={styles.containerdex}>
                <Image 
                  source={require("../image/Totodile.jpg")} 
                  style={styles.cardpokemon}
                />
        </View>
    )
}

export default CardPoke

const styles = StyleSheet.create({
    containerdex: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "black",
        borderRadius: 5,
        width: '80%',
        height: 300
    },
    cardpokemon: {
        backgroundColor: "white",
        borderRadius: 50,
        boxShadow: "2px 5px 5px blue",
        width: "90%",
        height: "90%"
    }

})