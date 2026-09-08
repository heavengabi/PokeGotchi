import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text, Chip, Divider } from "react-native-paper";
import { Image } from "expo-image";

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

export default function CardSelecao({ pokemon, eCentro = false }: Props) {
  const tipo = pokemon.tipos[0].toLowerCase();
  const corTipo = CORES_TIPO[tipo] ?? "#777";

  return (
    <Card style={[styles.card, eCentro && styles.cardCentro]} mode="contained">
      <Card.Content style={styles.conteudo}>
        {/* Topo: Número, Nome e Nível */}
        <View style={styles.topo}>
          <Text style={styles.numero}>
            #{String(pokemon.speciesId).padStart(3, "0")}
          </Text>

          <Text style={styles.nome} numberOfLines={1}>
            {pokemon.nome.toUpperCase()}
          </Text>

          <View style={styles.nivelBadge}>
            <Text style={styles.nivel}>LV {pokemon.nivel}</Text>
          </View>
        </View>

        {/* Imagem */}
        <View style={styles.imagemContainer}>
          <Image
            source={{ uri: pokemon.imagem }}
            style={styles.imagem}
            contentFit="contain"
            autoplay
          />
        </View>

        <Divider style={styles.divisor} />

        {/* Experiência */}
        <View style={styles.experiencia}>
          <Text style={styles.expTexto}>EXP</Text>
          <Text style={styles.expValor}>
            {pokemon.experiencia}/{pokemon.experienciaProximoNivel}
          </Text>
        </View>

        {/* Tipo */}
        <Chip
          compact
          style={[styles.chip, { backgroundColor: corTipo }]}
          textStyle={styles.chipTexto}
        >
          {pokemon.tipos[0].toUpperCase()}
        </Chip>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 170,
    height: 205,
    backgroundColor: "rgba(0, 0, 0, 0.45)", // Fundo preto semi-transparente
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.2)", // Borda sutil translúcida
    overflow: "hidden",
  },

  cardCentro: {
    backgroundColor: "rgba(0, 0, 0, 0.65)", // Ligeiramente mais escuro para destaque
    borderColor: "#FFD447", // Borda amarelada para o card ativo
    borderWidth: 2,
  },

  conteudo: {
    padding: 10,
    height: "100%",
    justifyContent: "space-between",
  },

  topo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  numero: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 9,
    fontWeight: "bold",
  },

  nome: {
    flex: 1,
    marginHorizontal: 4,
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 0.5,
  },

  nivelBadge: {
    backgroundColor: "rgba(255, 212, 71, 0.2)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#FFD447",
  },

  nivel: {
    color: "#FFD447",
    fontSize: 8,
    fontWeight: "900",
  },

  imagemContainer: {
    height: 95,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 2,
  },

  imagem: {
    width: 90,
    height: 90,
  },

  divisor: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    height: 1,
  },

  experiencia: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 4,
  },

  expTexto: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 8,
    fontWeight: "bold",
  },

  expValor: {
    color: "#FFFFFF",
    fontSize: 8,
    fontWeight: "bold",
  },

  chip: {
    height: 20,
    alignSelf: "center",
    justifyContent: "center",
  },

  chipTexto: {
    color: "#FFFFFF",
    fontSize: 8,
    fontWeight: "900",
    lineHeight: 10,
  },
});
