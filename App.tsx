<<<<<<< HEAD
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SelectPage from "./pages/SelectPage";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator();
=======
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Provider as PaperProvider } from 'react-native-paper'
import Pokemon from './pages/Pokemon'
import SelecaoTeste from './pages/SelecaoTeste'
import { PokeJogo } from './types/pokemon'
>>>>>>> acc705cd20e31784b7f8aca070e141f5a3cd4f25

export default function App() {
  // Único "dono" do pokémon do jogo. Como useContext é proibido, esse
  // state precisa ser passado via props pras duas telas (seleção e principal).
  const [pokemon, setPokemon] = useState<PokeJogo | null>(null)

  return (
<<<<<<< HEAD
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={SelectPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
=======
    <PaperProvider>
      <View style={styles.container}>
        {!pokemon ? (
          <SelecaoTeste onEscolher={setPokemon} />
        ) : (
          <Pokemon pokemon={pokemon} setPokemon={setPokemon} Trocar={() => setPokemon(null)} />
        )}
      </View>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f1e8' },
})
>>>>>>> acc705cd20e31784b7f8aca070e141f5a3cd4f25
