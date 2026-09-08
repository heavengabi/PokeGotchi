import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ScreenOrientation from "expo-screen-orientation";

import { PokeJogo } from "../types/pokemon";
import CardSelecao from "../components/CardSelecao";
import { carregarPokemon } from "../utils/progressoPokemon";
import { TABELA_EVOLUCAO } from "../data/evolucoesPoke";

interface Props {
  onEscolher: (pokemon: PokeJogo) => void;
}

const pokemonsIniciais: PokeJogo[] = [
  {
    speciesId: 4,
    nome: "charmander",
    imagem:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
    tipos: ["fire"],
    nivel: 1,
    experiencia: 0,
    experienciaProximoNivel: 100,
    atributos: {
      fome: 80,
      felicidade: 80,
      energia: 80,
      higiene: 80,
    },
    precisaEvoluir: false,
  },

  {
    speciesId: 7,
    nome: "squirtle",
    imagem:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
    tipos: ["water"],
    nivel: 1,
    experiencia: 0,
    experienciaProximoNivel: 100,
    atributos: {
      fome: 80,
      felicidade: 80,
      energia: 80,
      higiene: 80,
    },
    precisaEvoluir: false,
  },

  {
    speciesId: 1,
    nome: "bulbasaur",
    imagem:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    tipos: ["grass", "poison"],
    nivel: 1,
    experiencia: 0,
    experienciaProximoNivel: 100,
    atributos: {
      fome: 80,
      felicidade: 80,
      energia: 80,
      higiene: 80,
    },
    precisaEvoluir: false,
  },

  {
    speciesId: 158,
    nome: "totodile",
    imagem:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/158.png",
    tipos: ["water"],
    nivel: 1,
    experiencia: 0,
    experienciaProximoNivel: 100,
    atributos: {
      fome: 80,
      felicidade: 80,
      energia: 80,
      higiene: 80,
    },
    precisaEvoluir: false,
  },
];

export default function SelecaoTeste({ onEscolher }: Props) {
  const [pokemons, setPokemons] = useState<PokeJogo[]>(pokemonsIniciais);

  // CARREGAR PROGRESSO
  useEffect(() => {
    // Função responsável por carregar o progresso dos Pokémons salvos
    async function carregarProgresso() {
      try {
        // Carrega todos os Pokémons iniciais ao mesmo tempo
        const pokemonsSalvos = await Promise.all(
          pokemonsIniciais.map(async (pokemonInicial) => {
            // Tenta carregar o Pokémon inicial salvo
            let pokemonAtual = await carregarPokemon(pokemonInicial.speciesId);
            // Começa verificando a evolução a partir do Pokémon inicial
            let idAtual = pokemonInicial.speciesId;
            // Continua verificando se o Pokémon possui evolução
            while (true) {
              // Pega a regra de evolução desse Pokémon
              const regra = TABELA_EVOLUCAO[idAtual];
              // Se não tiver evolução, para
              if (!regra) {
                break;
              }
              // Tenta carregar o Pokémon evoluído
              const pokemonEvoluido = await carregarPokemon(regra.proximoId);
              // Se a evolução não estiver salva, para
              if (!pokemonEvoluido) {
                break;
              }
              // Atualiza para o Pokémon evoluído
              pokemonAtual = pokemonEvoluido;
              idAtual = regra.proximoId;
            }
            // Retorna o Pokémon mais evoluído salvo
            // Se não tiver nenhum salvo, usa o Pokémon inicial
            return pokemonAtual || pokemonInicial;
          }),
        );
        // Atualiza a lista de Pokémons na tela
        setPokemons(pokemonsSalvos);
      } catch (erro) {
        // Mostra o erro caso aconteça algum problema
        console.error("Erro ao carregar progresso:", erro);
      }
    }
    // Executa a função quando a tela é carregada
    carregarProgresso();
  }, []);
  // LANDSCAPE
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

    return () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    };
  }, []);

  return (
    <ImageBackground
      source={require("../image/fundo.jpg")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.titulo}>ESCOLHA SEU COMPANHEIRO</Text>

        <View style={styles.cardsContainer}>
          {pokemons.map((pokemon) => (
            <Pressable
              key={pokemon.speciesId}
              onPress={() => onEscolher(pokemon)}
              style={({ pressed }) => [
                styles.cardWrapper,
                pressed && styles.cardPressionado,
              ]}
            >
              <CardSelecao pokemon={pokemon} />
            </Pressable>
          ))}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  container: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
    paddingBottom: 12,
    paddingHorizontal: 20,
  },

  titulo: {
    fontSize: 20,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 1.2,
    textShadowColor: "rgba(0, 0, 0, 0.6)",
    textShadowOffset: {
      width: 1,
      height: 2,
    },
    textShadowRadius: 4,
  },

  subtitulo: {
    marginTop: -8,
    fontSize: 11,
    fontWeight: "600",
    color: "rgba(255,255,255,0.95)",
    textShadowColor: "rgba(0, 0, 0, 0.6)",
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    textShadowRadius: 2,
  },

  cardsContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
  },

  cardWrapper: {
    width: 170,
    height: 205,
    justifyContent: "center",
    alignItems: "center",
  },

  cardPressionado: {
    transform: [{ scale: 0.95 }],
    opacity: 0.85,
  },
});
