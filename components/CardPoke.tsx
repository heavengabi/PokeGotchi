import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native'
import { ProgressBar } from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { PokeJogo } from '../types/pokemon'

interface Props {
  pokemon: PokeJogo
  mensagemStatus: string
}

const CORES_TIPO: Record<string, string> = {
  fire: '#f97316',
  water: '#3b82f6',
  grass: '#22c55e',
  electric: '#eab308',
  normal: '#a8a878',
  bug: '#a8b820',
  poison: '#a040a0',
  flying: '#a890f0',
}

const CardPoke = ({ pokemon, mensagemStatus }: Props) => {
  const corTipo = CORES_TIPO[pokemon.tipos[0]] ?? '#6b7280'
  const progressoExp = pokemon.experiencia / pokemon.experienciaProximoNivel

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../image/molduracerta.jpg')}
        style={styles.moldura}
        imageStyle={styles.imagemMoldura}
        resizeMode="stretch"
      >
        <View style={styles.tela}>
          <Image source={{ uri: pokemon.imagem }} style={styles.imagemPokemon} resizeMode="contain" />
          <View style={styles.bolhaFala}>
            <Text style={styles.textoBolha}>{mensagemStatus}</Text>
          </View>
        </View>
      </ImageBackground>

      <LinearGradient
        colors={['rgb(253, 230, 138)', 'rgb(245, 158, 11)']}
        style={styles.infoCard}
      >
        <View style={styles.linhaTopo}>
          <View>
            <Text style={styles.nome}>{pokemon.nome}</Text>
            <Text style={styles.numero}>#{String(pokemon.speciesId).padStart(3, '0')}</Text>
          </View>
          <View style={[styles.badgeTipo, { backgroundColor: corTipo }]}>
            <Text style={styles.textoBadge}>{pokemon.tipos[0].toUpperCase()}</Text>
          </View>
        </View>

        <View style={styles.linhaNivel}>
          <Text style={styles.textoNivel}>NÍVEL {pokemon.nivel}</Text>
          <Text style={styles.textoExp}>{pokemon.experiencia}/{pokemon.experienciaProximoNivel} EXP</Text>
        </View>
        <ProgressBar progress={progressoExp} color="#3b82f6" style={styles.barraExp} />
      </LinearGradient>
    </View>
  )
}

export default CardPoke

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
  },
  moldura: {
    width: '100%',
    borderRadius: 24,
    overflow: 'hidden',
  },
  imagemMoldura: {
    width: '100%',
    height: 'auto',
    borderRadius: 24,
  },
  tela: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagemPokemon: {
    width: 140,
    height: 200,
  },
  bolhaFala: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#000',
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginTop: 12,
  },
  textoBolha: {
    fontWeight: '700',
    fontSize: 14,
  },
  infoCard: {
    borderRadius: 16,
    padding: 16,
    marginTop: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  linhaTopo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  nome: {
    fontSize: 22,
    fontWeight: '800',
    textTransform: 'capitalize',
  },
  numero: {
    color: '#6b7280',
    fontWeight: '600',
  },
  badgeTipo: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  textoBadge: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
  linhaNivel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  textoNivel: {
    fontWeight: '700',
    color: '#111827',
  },
  textoExp: {
    color: '#6b7280',
    fontWeight: '600',
  },
  barraExp: {
    height: 8,
    borderRadius: 4,
  },
})