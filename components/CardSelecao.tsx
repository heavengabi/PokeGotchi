
import React from "react";
import { StyleSheet, Image, View } from "react-native";
import { Card, Text, Chip } from "react-native-paper";
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
  return (
    <Card style={[styles.card, eCentro && styles.cardDestaque]}>
      <Card.Content style={styles.conteudo}>

        {/* IMAGEM ATUAL DO POKÉMON
            Se evoluiu, aqui aparece a imagem da evolução.
            Exemplo:
            Charmander → Charmeleon → Charizard
        */}
        <View style={styles.imagemContainer}>
          <Image
            source={{ uri: pokemon.imagem }}
            style={styles.imagem}
          />
        </View>

        {/* NÍVEL ATUAL */}
        <View style={styles.nivelContainer}>
          <Text style={styles.nivel}>
            NÍVEL {pokemon.nivel}
          </Text>
        </View>

        {/* NOME ATUAL
            Se evoluiu, mostra o nome da evolução.
            Exemplo: CHARMELEON
        */}
        <Text
          variant="titleMedium"
          style={styles.nome}
        >
          {pokemon.nome.toUpperCase()}
        </Text>

        {/* TIPOS ATUAIS */}
        <View style={styles.tiposContainer}>
          {pokemon.tipos.map((tipo) => (
            <Chip
              key={tipo}
              compact
              style={[
                styles.chip,
                {
                  backgroundColor:
                    CORES_TIPO[tipo.toLowerCase()] || "#777",
                },
              ]}
              textStyle={styles.chipTexto}
            >
              {tipo.toUpperCase()}
            </Chip>
          ))}
        </View>

      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 180,
    minHeight: 190,
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    elevation: 7,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    borderWidth: 2,
    borderColor: "#E5E7EB",
  },

  cardDestaque: {
    borderColor: "#FFDE00",
    borderWidth: 4,
    elevation: 12,
    shadowColor: "#FFDE00",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.35,
    shadowRadius: 8,
  },

  conteudo: {
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
  },

  imagemContainer: {
    width: 115,
    height: 105,
    borderRadius: 20,
    backgroundColor: "#F3F6FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
    position: "relative",
  },

  imagem: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },

  /*
   * NÍVEL DO POKÉMON
   *
   * Continua mostrando o nível atual mesmo depois
   * da evolução.
   *
   * Exemplo:
   * CHARMANDER nível 16
   * ↓
   * CHARMELEON nível 16
   */
  nivelContainer: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "#3B4CCA",
    borderRadius: 10,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    elevation: 4,
  },

  nivel: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "900",
  },

  nome: {
    fontWeight: "900",
    color: "#3B4CCA",
    fontSize: 18,
    letterSpacing: 0.5,
    marginTop: 2,
  },

  tiposContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
    marginTop: 8,
    flexWrap: "wrap",
  },

  chip: {
    height: 28,
    borderRadius: 14,
  },

  chipTexto: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "bold",
  },
});
