
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ScreenOrientation from "expo-screen-orientation";


import fundo from "../image/fundo.jpg";
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
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/4.gif",
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
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/7.gif",
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
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/1.gif",
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
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/158.gif",
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
  const [pokemons, setPokemons] =
    useState<PokeJogo[]>(pokemonsIniciais);

  const [indiceSelecionado, setIndiceSelecionado] =
    useState(0);

  useEffect(() => {
    async function carregarProgresso() {
      try {
        /*
         * Para cada Pokémon inicial, procuramos
         * também suas possíveis evoluções.
         *
         * Exemplo do Charmander:
         *
         * 4 = Charmander
         * 5 = Charmeleon
         * 6 = Charizard
         *
         * Se existir um Charizard salvo, usamos ele.
         */

        const pokemonsSalvos =
          await Promise.all(
            pokemonsIniciais.map(
              async (pokemonInicial) => {
                /*
                 * Primeiro procuramos o Pokémon inicial.
                 */
                let pokemonAtual =
                  await carregarPokemon(
                    pokemonInicial.speciesId
                  );

                /*
                 * Guardamos o ID da forma que estamos procurando.
                 */
                let idAtual =
                  pokemonInicial.speciesId;

                /*
                 * Continua seguindo a tabela de evolução
                 * enquanto existir uma próxima forma.
                 */
                while (
                  TABELA_EVOLUCAO[idAtual]
                ) {
                  const regra =
                    TABELA_EVOLUCAO[idAtual];

                  if (!regra) {
                    break;
                  }

                  /*
                   * Procuramos a próxima evolução salva.
                   *
                   * Exemplo:
                   *
                   * Charmander = 4
                   * Charmeleon = 5
                   *
                   * Aqui procuramos o pokemon_5.
                   */
                  const pokemonEvoluido =
                    await carregarPokemon(
                      regra.proximoId
                    );

                  /*
                   * Se encontrou a evolução salva,
                   * ela passa a ser o Pokémon atual.
                   */
                  if (pokemonEvoluido) {
                    pokemonAtual =
                      pokemonEvoluido;

                    /*
                     * Atualizamos o ID para continuar
                     * procurando a próxima evolução.
                     *
                     * Exemplo:
                     *
                     * encontrou Charmeleon (5)
                     *
                     * agora procura Charizard (6).
                     */
                    idAtual =
                      regra.proximoId;
                  } else {
                    /*
                     * Não encontrou a próxima evolução.
                     * Então paramos a procura.
                     */
                    break;
                  }
                }

                /*
                 * Se encontrou algum progresso salvo,
                 * retorna ele.
                 *
                 * Caso contrário, retorna o Pokémon inicial.
                 */
                return (
                  pokemonAtual ??
                  pokemonInicial
                );
              }
            )
          );

        /*
         * Alteração:
         *
         * Atualizamos a lista que aparece nos cards
         * com o Pokémon salvo mais avançado.
         *
         * Dessa forma, se o Charmander evoluiu para
         * Charmeleon ou Charizard, o CardSelecao recebe
         * a imagem e o nível da evolução.
         */
        setPokemons(
          pokemonsSalvos
        );
      } catch (erro) {
        console.error(
          "Erro ao carregar progresso dos Pokémon:",
          erro
        );
      }
    }

    carregarProgresso();
  }, []);

  // =====================================================
  // LANDSCAPE
  // =====================================================

  useEffect(() => {
    ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE
    );

    return () => {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT
      );
    };
  }, []);

  // =====================================================
  // CONTROLES DOS CARDS
  // =====================================================

  const total =
    pokemons.length;

  const selecionar = (index: number) => {
    setIndiceSelecionado(index);
  };

  const anterior = () => {
    setIndiceSelecionado(
      (prev) =>
        prev === 0
          ? total - 1
          : prev - 1
    );
  };

  const proximo = () => {
    setIndiceSelecionado(
      (prev) =>
        prev === total - 1
          ? 0
          : prev + 1
    );
  };

  const idxAnterior =
    (indiceSelecionado - 1 + total) % total;

  const idxProximo =
    (indiceSelecionado + 1) % total;

  const cardsVisiveis = [
    {
      pokemon:
        pokemons[idxAnterior],
      indexOriginal:
        idxAnterior,
      posicao:
        "esquerda",
    },

    {
      pokemon:
        pokemons[indiceSelecionado],
      indexOriginal:
        indiceSelecionado,
      posicao:
        "centro",
    },

    {
      pokemon:
        pokemons[idxProximo],
      indexOriginal:
        idxProximo,
      posicao:
        "direita",
    },
  ];

  const pokemonSelecionado =
    pokemons[indiceSelecionado];

  const larguraTela =
    Dimensions.get("window").width;

  const larguraCard =
    Math.min(
      190,
      Math.max(
        150,
        (larguraTela - 180) / 3
      )
    );

  // =====================================================
  // TELA
  // =====================================================

  return (
    <ImageBackground
      source={fundo}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView
        style={styles.container}
      >
        <Text style={styles.titulo}>
          ESCOLHA SEU COMPANHEIRO
        </Text>

        <Text style={styles.subtitulo}>
          Escolha um Pokémon para começar sua aventura
        </Text>

        <View
          style={styles.cardsContainer}
        >
          {/* SETA ESQUERDA */}

          <Pressable
            onPress={anterior}
            style={({ pressed }) => [
              styles.seta,
              styles.setaEsquerda,
              pressed &&
              styles.setaPressionada,
            ]}
            hitSlop={12}
          >
            <Text
              style={styles.setaTexto}
            >
              ‹
            </Text>
          </Pressable>

          {/* CARDS */}

          {cardsVisiveis.map(
            (item) => {
              const eCentro =
                item.posicao === "centro";

              return (
                <Pressable
                  key={`${item.pokemon.speciesId}-${item.posicao}`}
                  onPress={() =>
                    selecionar(
                      item.indexOriginal
                    )
                  }
                  style={[
                    styles.cardWrapper,
                    {
                      width:
                        larguraCard,
                    },
                    eCentro
                      ? styles.cardCentro
                      : styles.cardLateral,
                  ]}
                >
                  <CardSelecao
                    pokemon={
                      item.pokemon
                    }
                    eCentro={
                      eCentro
                    }
                  />
                </Pressable>
              );
            }
          )}

          {/* SETA DIREITA */}

          <Pressable
            onPress={proximo}
            style={({ pressed }) => [
              styles.seta,
              styles.setaDireita,
              pressed &&
              styles.setaPressionada,
            ]}
            hitSlop={12}
          >
            <Text
              style={styles.setaTexto}
            >
              ›
            </Text>
          </Pressable>
        </View>

        {/* =====================================================
          CONTROLES
          ===================================================== */}

        <View
          style={styles.controles}
        >
          <View
            style={styles.bolinhas}
          >
            {pokemons.map(
              (pokemon, index) => (
                <Pressable
                  key={`${pokemon.speciesId}-${index}`}
                  onPress={() =>
                    selecionar(index)
                  }
                  style={[
                    styles.bolinha,
                    index ===
                    indiceSelecionado &&
                    styles.bolinhaSelecionada,
                  ]}
                  hitSlop={8}
                />
              )
            )}
          </View>

          {/* BOTÃO ESCOLHER */}

          <Pressable
            style={({ pressed }) => [
              styles.botao,
              pressed &&
              styles.botaoPressionado,
            ]}
            onPress={() =>
              onEscolher(
                pokemonSelecionado
              )
            }
          >
            <Text
              style={styles.textoBotao}
            >
              ESCOLHER
            </Text>

            <Text
              style={styles.setaBotao}
            >
              →
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

// =====================================================
// ESTILOS
// =====================================================

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  container: {
    flex: 1,
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
    textShadowColor:
      "rgba(0, 0, 0, 0.25)",
    textShadowOffset: {
      width: 1,
      height: 2,
    },
    textShadowRadius: 3,
  },

  subtitulo: {
    marginTop: -8,
    fontSize: 11,
    fontWeight: "600",
    color:
      "rgba(255,255,255,0.95)",
  },

  cardsContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
    position: "relative",
  },

  cardWrapper: {
    height: 205,
    justifyContent: "center",
    alignItems: "center",
  },

  cardCentro: {
    transform: [
      { scale: 1.05 },
    ],
    zIndex: 10,
    elevation: 10,
  },

  cardLateral: {
    transform: [
      { scale: 0.82 },
    ],
    zIndex: 1,
    opacity: 0.65,
    elevation: 2,
  },

  seta: {
    position: "absolute",
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#FFFFFF",
    borderWidth: 3,
    borderColor: "#285C2A",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 30,
    elevation: 8,
  },

  setaEsquerda: {
    left: 0,
  },

  setaDireita: {
    right: 0,
  },

  setaPressionada: {
    transform: [
      { scale: 0.88 },
    ],
    opacity: 0.8,
  },

  setaTexto: {
    fontSize: 30,
    lineHeight: 32,
    color: "#285C2A",
    fontWeight: "900",
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
    backgroundColor:
      "rgba(255,255,255,0.45)",
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
    transform: [
      { scale: 0.95 },
    ],
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
