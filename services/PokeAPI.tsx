import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

interface Pokemon {
    id: number
    titulo: string
    imagem: string
    gif: string | null
}

const PokeAPI = () => {

    const [procurar, setProcurar] = useState<Pokemon[]>([])
    const [nome, setNome] = useState("")
    const [infos, setInfos] = useState<{ id: number, titulo: string, imagem: string, gif: string }[]>([])

    useEffect(() => {
        async function chamarPokekon() {
            try {
                const resposta = await fetch(
                    "https://pokeapi.co/api/v2/totodile"
                )
                const dados = await resposta.json()
                setProcurar(dados.results)
            } catch (erro) {
                console.error('Erro ao selecionar o pokemon', erro)
            }
        }
        chamarPokekon()
    }, [])

    

    const resultado: { id: number, titulo: string, imagem: string, gif: string }[] = []

    return (
        <View>
            <Text>PokeAPI</Text>
        </View>
    )
}

export default PokeAPI

const styles = StyleSheet.create({})