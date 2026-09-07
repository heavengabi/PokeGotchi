    import AsyncStorage from '@react-native-async-storage/async-storage'
    import { PokeJogo } from '../types/pokemon'

    const criarChave = (id: number) => `pokemon_${id}`

    export async function salvarPokemon(pokemon: PokeJogo) {
        try {
            await AsyncStorage.setItem(
                criarChave(pokemon.speciesId),
                JSON.stringify(pokemon)
            )
        } catch (erro) {
            console.error('Erro ao salvar Pokémon:', erro)
        }
    }

    export async function carregarPokemon(
        id: number
    ): Promise<PokeJogo | null> {
        try {
            const dados = await AsyncStorage.getItem(
                criarChave(id)
            )

            if (!dados) {
                return null
            }

            return JSON.parse(dados)
        } catch (erro) {
            console.error('Erro ao carregar Pokémon:', erro)
            return null
        }
    }