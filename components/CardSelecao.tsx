import React from "react";
import { StyleSheet, Image, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { PokeJogo } from "../types/pokemon";

interface Props {
  pokemon: PokeJogo;
  eCentro?: boolean;
}

const CORES_TIPO: Record<string, string> = {
  normal: "#A8A77A",
  fire: "#F08030",
  water: "#6890F0",
  electric: "#F8D030",
  grass: "#78C850",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
};

export default function CardSelecao({
  pokemon,
  eCentro = false,
}: Props) {
  const corTipo =
    CORES_TIPO[pokemon.tipos[0]?.toLowerCase()] || "#777";

  return (
    <Card
      style={[
        styles.card,
        eCentro && styles.cardDestaque,
      ]}
    >
      <Card.Content style={styles.conteudo}>

        {/* Imagem atual do Pokémon */}
        <View style={styles.imagemContainer}>
          <View
            style={[
              styles.brilho,
              {
                backgroundColor: corTipo,
              },
            ]}
          />

          <Image
            source={{ uri: pokemon.imagem }}
            style={styles.imagem}
          />
        </View>

        {/* Nome atual */}
        <Text
          variant="titleMedium"
          style={styles.nome}
          numberOfLines={1}
        >
          {pokemon.nome.toUpperCase()}
        </Text>

        {/* Tipo + nível */}
        <View style={styles.infos}>

          {/* Tipo atual */}
          <View
            style={[
              styles.tipoContainer,
              {
                backgroundColor: corTipo,
              },
            ]}
          >
            <Text style={styles.tipoTexto}>
              TIPO: {pokemon.tipos.join(" / ").toUpperCase()}
            </Text>
          </View>

          {/* Nível atual */}
          <View style={styles.nivelContainer}>
            <Text style={styles.nivel}>
              Lv. {pokemon.nivel}
            </Text>
          </View>

        </View>

      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({

  card: {
    width: 190,
    minHeight: 220,

    backgroundColor: "#ffffff17",

    borderRadius: 18,

    borderWidth: 3,
    borderColor: "#E6EAF2",

    elevation: 8,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 7,

    overflow: "hidden",
  },

  // Destaque do card central
  cardDestaque: {
    width: 205,
    minHeight: 235,

    borderColor: "#FFFFFF",
    borderWidth: 4,

    shadowColor: "#BDE7FF",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.9,
    shadowRadius: 25,

    boxShadow:
      "0px 0px 25px rgba(189, 231, 255, 0.9)",

    transform: [
      {
        scale: 1.03,
      },
    ],
  },

  conteudo: {
    alignItems: "center",

    paddingVertical: 10,
    paddingHorizontal: 9,
  },

  // Área da imagem
  imagemContainer: {
    width: 130,
    height: 115,

    borderRadius: 18,

    backgroundColor: "#EEF3FF",

    alignItems: "center",
    justifyContent: "center",

    marginBottom: 5,

    overflow: "hidden",

    borderWidth: 1,
    borderColor: "#DCE4FF",
  },

  // Brilho da imagem
  brilho: {
    position: "absolute",

    width: 100,
    height: 100,

    borderRadius: 50,

    opacity: 0.18,

    top: 8,
    left: 15,
  },

  imagem: {
    width: 160,
    height: 160 ,

    resizeMode: "contain",
  },

  // Nome do Pokémon
  nome: {
    fontWeight: "900",

    color: "#263A91",

    fontSize: 18,

    letterSpacing: 0.7,

    marginTop: 1,

    maxWidth: 165,

    textAlign: "center",
  },

  // Tipo + nível
  infos: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    gap: 5,

    marginTop: 4,

    alignSelf: "center",
  },

  // Tipo atual
  tipoContainer: {
    height: 22,

    paddingHorizontal: 8,

    borderRadius: 6,

    justifyContent: "center",

    alignItems: "center",

    borderWidth: 1,

    borderColor: "rgba(255,255,255,0.5)",
  },

  tipoTexto: {
    color: "#FFFFFF",

    fontSize: 8,

    fontWeight: "900",

    letterSpacing: 0.2,
  },

  // Nível do Pokémon
  nivelContainer: {
    height: 22,

    paddingHorizontal: 7,

    borderRadius: 6,

    backgroundColor: "#F5F5F5",

    justifyContent: "center",

    alignItems: "center",

    borderWidth: 1,

    borderColor: "#D0D0D0",
  },

  nivel: {
    color: "#333333",

    fontSize: 9,

    fontWeight: "900",

    letterSpacing: 0.3,
  },

});