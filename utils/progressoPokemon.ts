import AsyncStorage from "@react-native-async-storage/async-storage";
import { PokeJogo } from "../types/pokemon";

// Cria uma chave única para cada Pokémon
const criarChave = (id: number) => `pokemon_${id}`;

// Salva um Pokémon no AsyncStorage
export async function salvarPokemon(pokemon: PokeJogo) {
  try {
    // Salva o Pokémon usando o speciesId como identificador
    // JSON.stringify transforma o objeto em texto para poder salvar
    await AsyncStorage.setItem(
      criarChave(pokemon.speciesId),
      JSON.stringify(pokemon),
    );
  } catch (erro) {
    // Mostra o erro caso não consiga salvar
    console.error("Erro ao salvar Pokémon:", erro);
  }
}

// Carrega um Pokémon salvo pelo seu ID
export async function carregarPokemon(id: number): Promise<PokeJogo | null> {
  try {
    // Procura no AsyncStorage o Pokémon usando sua chave
    const dados = await AsyncStorage.getItem(criarChave(id));

    // Se não encontrar nada, retorna null
    if (!dados) {
      return null;
    }

    // JSON.parse transforma o texto novamente em objeto
    return JSON.parse(dados);
  } catch (erro) {
    // Mostra o erro caso não consiga carregar
    console.error("Erro ao carregar Pokémon:", erro);

    // Retorna null se acontecer algum erro
    return null;
  }
}
