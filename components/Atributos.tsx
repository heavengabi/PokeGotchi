import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import { ProgressBar } from 'react-native-paper'
import React from 'react'
import { corPorValor } from '../utils/atributos'

interface Props {
  fome: number
  felicidade: number
  energia: number
  higiene: number
}

const Atributos = ({ fome, felicidade, energia, higiene }: Props) => {
  return (
    <ImageBackground
      source={require('../image/Moldura.jpg')}
      style={styles.card}
      imageStyle={styles.imagemFundo}
      resizeMode="stretch"
    >
      <View style={styles.overlay}>
        <View style={styles.cabecalho}>
          <Text style={styles.titulo}>CUIDADOS</Text>
          <Text style={styles.subtitulo}>Atualiza a cada 5s</Text>
        </View>

        <Text style={styles.rotulo}>🍖 Saciedade</Text>
        <View style={styles.linha}>
          <ProgressBar progress={fome / 100} color={corPorValor(fome)} style={styles.barra} />
          <Text style={styles.porcentagem}>{fome}%</Text>
        </View>

        <Text style={styles.rotulo}>💗 Felicidade</Text>
        <View style={styles.linha}>
          <ProgressBar progress={felicidade / 100} color={corPorValor(felicidade)} style={styles.barra} />
          <Text style={styles.porcentagem}>{felicidade}%</Text>
        </View>

        <Text style={styles.rotulo}>⚡ Energia</Text>
        <View style={styles.linha}>
          <ProgressBar progress={energia / 100} color={corPorValor(energia)} style={styles.barra} />
          <Text style={styles.porcentagem}>{energia}%</Text>
        </View>

        <Text style={styles.rotulo}>✨ Higiene</Text>
        <View style={styles.linha}>
          <ProgressBar progress={higiene / 100} color={corPorValor(higiene)} style={styles.barra} />
          <Text style={styles.porcentagem}>{higiene}%</Text>
        </View>
      </View>
    </ImageBackground>
  )
}

export default Atributos

const styles = StyleSheet.create({
  card: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 16,
    marginTop: 16,
    overflow: 'hidden', // corta a imagem nos cantos arredondados do card
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  imagemFundo: {
    borderRadius: 16,
    width: '100%',
    height: '100%',
  },
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // deixa o texto/barras legíveis por cima da imagem
    padding: 16,
  },
  cabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  titulo: {
    fontSize: 16,
    fontWeight: '800',
  },
  subtitulo: {
    fontSize: 11,
    color: '#9ca3af',
  },
  rotulo: {
    fontWeight: '700',
    marginBottom: 4,
    marginTop: 8,
  },
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap',
    gap: 8,
  },
  barra: {
    flex: 1,
    height: 10,
    borderRadius: 5,
  },
  porcentagem: {
    fontWeight: '700',
    width: 42, 
    textAlign: 'right',
  },
})