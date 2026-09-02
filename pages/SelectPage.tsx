import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import * as ScreenOrientation from "expo-screen-orientation";
import CardCharacter from "../components/CardCharacter";
import { SafeAreaView } from "react-native-safe-area-context";

const SelectPage = () => {
  useFocusEffect(
    React.useCallback(() => {
      const lockLandscape = async () => {
        try {
          await ScreenOrientation.lockAsync(
            ScreenOrientation.OrientationLock.LANDSCAPE,
          );
        } catch (error) {
          console.log(error);
        }
      };

      lockLandscape();

      return () => {
        ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.PORTRAIT_UP,
        ).catch(() => {});
      };
    }, []),
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <CardCharacter
          name="Nome"
          info="lorem"
          image="https://i.pinimg.com/736x/83/89/8b/83898b80e959742365d89776ed2e3a81.jpg"
          experience={10}
          type="Personagem"
        />
        <CardCharacter
          name="Nome"
          info="lorem"
          image="https://i.pinimg.com/736x/83/89/8b/83898b80e959742365d89776ed2e3a81.jpg"
          experience={10}
          type="Personagem"
        />
        <CardCharacter
          name="Nome"
          info="lorem"
          image="https://i.pinimg.com/736x/83/89/8b/83898b80e959742365d89776ed2e3a81.jpg"
          experience={10}
          type="Personagem"
        />
        <CardCharacter
          name="Nome"
          info="lorem"
          image="https://i.pinimg.com/736x/83/89/8b/83898b80e959742365d89776ed2e3a81.jpg"
          experience={10}
          type="Personagem"
        />
        <CardCharacter
          name="Nome"
          info="lorem"
          image="https://i.pinimg.com/736x/83/89/8b/83898b80e959742365d89776ed2e3a81.jpg"
          experience={10}
          type="Personagem"
        />
        <CardCharacter
          name="Nome"
          info="lorem"
          image="https://i.pinimg.com/736x/83/89/8b/83898b80e959742365d89776ed2e3a81.jpg"
          experience={10}
          type="Personagem"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SelectPage;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#18d1ffff",
  },
  scrollContainer: {
    bottom:-30,
    paddingHorizontal: 20,
    alignItems: "center",
    gap: 5, 
  },
});