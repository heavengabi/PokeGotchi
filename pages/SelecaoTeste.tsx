import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  Pressable,
  ScrollView,
  ImageBackground,
  View,
} from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import { SafeAreaView } from "react-native-safe-area-context";

import CardSelecao from "../components/CardSelecao";
import { PokeJogo } from "../types/pokemon";

interface Props {
  onEscolher: (pokemon: PokeJogo) => void;
}

// ARRAY DE DADOS: As URLs das imagens foram trocadas de '.png' para '.gif'
// apontando para o diretório 'animated' da Generation V na PokeAPI.
const pokemons: PokeJogo[] = [
  {
    speciesId: 4,
    nome: "Charmander",
    imagem:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/4.gif",
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
    tipos: ["Fire"],
  },
  {
    speciesId: 7,
    nome: "Squirtle",
    imagem:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/7.gif",
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
    tipos: ["Water"],
  },
  {
    speciesId: 1,
    nome: "Bulbasaur",
    imagem:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/1.gif",
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
    tipos: ["Grass", "Poison"],
  },
  {
    speciesId: 158,
    nome: "Totodile",
    imagem:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/158.gif",
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
    tipos: ["Water"],
  },
];

export default function SelecaoTeste({ onEscolher }: Props) {
  /*
   * GERENCIAMENTO DA TELA (Giro automático):
   * Quando o componente monta, trava o celular na horizontal (LANDSCAPE).
   * A função no 'return' limpa a trava quando saímos desta tela,
   * liberando a rotação de volta ao normal (unlockAsync).
   */
  useEffect(() => {
    ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE
    );

    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  return (
    <ImageBackground
      source={require("../image/fundo.jpg")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      {/* Overlay transparente para garantir a leitura do texto sobre o fundo */}
      <View style={styles.overlay}>
        {/* 
         * 'edges': Garante que o conteúdo não fique debaixo da câmera 
         * ou da barra de navegação nos 4 lados, essencial em telas deitadas.
         */}
        <SafeAreaView style={styles.container} edges={["top", "bottom", "left", "right"]}>

          <Text style={styles.titulo}>ESCOLHA SEU POKÉMON!</Text>

          {/* 
            contentContainerStyle: Aplica os estilos ao CONTEÚDO interno 
            da lista, e não na caixa visível da ScrollView em si.
          */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listaHorizontal}
          >
            {pokemons.map((pokemon) => (
              /*
               * PRESSABLE COM ESTILO DINÂMICO:
               * Aplica 'styles.pressionado' somente enquanto 'pressed' for true,
               * dando feedback visual de clique (efeito afundar).
               */
              <Pressable
                key={pokemon.speciesId}
                onPress={() => onEscolher(pokemon)}
                style={({ pressed }) => [
                  styles.botao,
                  pressed && styles.pressionado,
                ]}
              >
                <CardSelecao pokemon={pokemon} />
              </Pressable>
            ))}
          </ScrollView>

        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "900",
    color: "#FFFFFF",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 1.2,
    marginTop: 8,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 3,
  },
  listaHorizontal: {
    paddingHorizontal: 20,
    alignItems: "center",
    gap: 12,
  },
  botao: {
    margin: 0,
    padding: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pressionado: {
    opacity: 0.8,
    transform: [
      {
        scale: 0.95,
      },
    ],
  },
});