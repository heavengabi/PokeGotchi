import React, { useEffect, useState } from "react";
import { ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
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
  const [indiceSelecionado, setIndiceSelecionado] = useState(0);

  useEffect(() => {
    async function carregarProgresso() {
      try {
        const pokemonsSalvos = await Promise.all(
          pokemonsIniciais.map(async (pokemonInicial) => {
            let pokemonAtual = await carregarPokemon(pokemonInicial.speciesId);
            let idAtual = pokemonInicial.speciesId;

            while (TABELA_EVOLUCAO[idAtual]) {
              const regra = TABELA_EVOLUCAO[idAtual];
              if (!regra) break;

              const pokemonEvoluido = await carregarPokemon(regra.proximoId);

              if (pokemonEvoluido) {
                pokemonAtual = pokemonEvoluido;
                idAtual = regra.proximoId;
              } else {
                break;
              }
            }

            return pokemonAtual ?? pokemonInicial;
          })
        );

        setPokemons(pokemonsSalvos);
      } catch (erro) {
        console.error("Erro ao carregar progresso dos Pokémon:", erro);
      }
    }

    carregarProgresso();
  }, []);

  // LANDSCAPE
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

    return () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    };
  }, []);

  // CONTROLES DOS CARDS
  const total = pokemons.length;

  const selecionar = (index: number) => {
    setIndiceSelecionado(index);
  };

  const idxAnterior = (indiceSelecionado - 1 + total) % total;
  const idxProximo = (indiceSelecionado + 1) % total;

  const cardsVisiveis = [
    {
      pokemon: pokemons[idxAnterior],
      indexOriginal: idxAnterior,
      posicao: "esquerda",
    },
    {
      pokemon: pokemons[indiceSelecionado],
      indexOriginal: indiceSelecionado,
      posicao: "centro",
    },
    {
      pokemon: pokemons[idxProximo],
      indexOriginal: idxProximo,
      posicao: "direita",
    },
  ];

  const pokemonSelecionado = pokemons[indiceSelecionado];

  return (
    <ImageBackground
      source={require("../assets/fundo.jpg")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.titulo}>ESCOLHA SEU COMPANHEIRO</Text>

        <Text style={styles.subtitulo}>
          Escolha um Pokémon para começar sua aventura
        </Text>

        <View style={styles.cardsContainer}>
          {/* CARDS */}
          {cardsVisiveis.map((item) => {
            const eCentro = item.posicao === "centro";

            return (
              <Pressable
                key={`${item.pokemon.speciesId}-${item.posicao}`}
                onPress={() => selecionar(item.indexOriginal)}
                style={[
                  styles.cardWrapper,
                  eCentro ? styles.cardCentro : styles.cardLateral,
                ]}
              >
                <CardSelecao pokemon={item.pokemon} eCentro={eCentro} />
              </Pressable>
            );
          })}
        </View>

        {/* CONTROLES */}
        <View style={styles.controles}>
          <View style={styles.bolinhas}>
            {pokemons.map((pokemon, index) => (
              <Pressable
                key={`${pokemon.speciesId}-${index}`}
                onPress={() => selecionar(index)}
                style={[
                  styles.bolinha,
                  index === indiceSelecionado && styles.bolinhaSelecionada,
                ]}
                hitSlop={8}
              />
            ))}
          </View>

          {/* BOTÃO ESCOLHER */}
          <Pressable
            style={({ pressed }) => [
              styles.botao,
              pressed && styles.botaoPressionado,
            ]}
            onPress={() => onEscolher(pokemonSelecionado)}
          >
            <Text style={styles.textoBotao}>ESCOLHER</Text>
            <Text style={styles.setaBotao}>→</Text>
          </Pressable>
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

  cardCentro: {
    transform: [{ scale: 1.05 }],
    zIndex: 10,
    elevation: 10,
  },

  cardLateral: {
    transform: [{ scale: 0.82 }],
    zIndex: 1,
    opacity: 0.85,
    elevation: 2,
  },

  controles: {
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 2,
  },

  bolinhas: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
  },

  bolinha: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: "rgba(255,255,255,0.45)",
  },

  bolinhaSelecionada: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#FFD447",
    borderWidth: 2,
    borderColor: "#FFFFFF",
    elevation: 3,
  },

  botao: {
    minWidth: 180,
    height: 38,
    paddingHorizontal: 22,
    borderRadius: 20,
    backgroundColor: "#1689D5",
    borderWidth: 2,
    borderColor: "#075C91",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    elevation: 5,
  },

  botaoPressionado: {
    transform: [{ scale: 0.95 }],
    opacity: 0.9,
  },

  textoBotao: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 0.8,
  },

  setaBotao: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
  },
});