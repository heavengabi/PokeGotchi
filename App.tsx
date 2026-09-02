import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Atributos from './components/Atributos';
import Pokemon from './pages/Pokemon';

export default function App() {
  return (
    <View style={styles.container}>
      <Pokemon/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
