import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

type Props = {
  name: string;
  info: string;
  image: string;
  experience: number;
  type: string;
};

const CardCharacter = ({
  name,
  info,
  image,
  experience,
  type,
}: Props) => {
  return (
    <View style={styles.card}>
      <View style={styles.conteudo}>
        <View style={styles.header}>
          <Text style={styles.txt1}>{name}</Text>
          <Text style={styles.xp}>{experience} XP</Text>
        </View>

        <View style={styles.containerEfeito}>
          <Image
            style={styles.fundoVisual}
            source={{
              uri: "https://i.pinimg.com/736x/83/89/8b/83898b80e959742365d89776ed2e3a81.jpg",
            }}
          />

          <Image
            source={{ uri: image }}
            style={styles.imagemPersonagem}
          />
        </View>

        <Text style={styles.info}>{info}</Text>
        <Text style={styles.type}>{type}</Text>
      </View>
    </View>
  );
};

export default CardCharacter;

const styles = StyleSheet.create({
  card: {
    width: 170,
    height: 210,
    backgroundColor: "#4b5bab",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  conteudo: {
    width: 150,
    height: 190,
    backgroundColor: "#4da6ff",
    borderRadius: 10,
    alignItems: "center",
    paddingTop: 8,
  },

  header: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  txt1: {
    fontSize: 18,
    fontWeight: "bold",
  },

  xp: {
    fontSize: 16,
    fontWeight: "bold",
  },

  containerEfeito: {
    width: 120,
    height: 100,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: 8,
  },

  fundoVisual: {
    position: "absolute",
    width: 120,
    height: 100,
  },

  imagemPersonagem: {
    width: 90,
    height: 90,
    resizeMode: "contain",
  },

  info: {
    marginTop: 8,
    fontSize: 14,
  },

  type: {
    fontSize: 12,
    color: "#333",
  },
});