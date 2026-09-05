import { StyleSheet, Text, View, Image } from 'react-native'
import { ProgressBar } from 'react-native-paper'
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
      <View style={styles.moldura}>
        <View style={styles.tela}>
          <Image source={{ uri: pokemon.imagem }} style={styles.imagemPokemon} resizeMode="contain" />
          <View style={styles.bolhaFala}>
            <Text style={styles.textoBolha}>{mensagemStatus}</Text>
          </View>
        </View>
      </View>

      <View style={styles.infoCard}>
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
      </View>
    </View>
  )
}

export default CardPoke

const styles = StyleSheet.create({
  container: { 
    width: '90%',
    alignSelf: 'center' 
  },
  moldura: { 
    backgroundColor: '#dc2626', 
    borderRadius: 24, 
    padding: 10 
  },
  tela: {
    backgroundColor: '#dbeafe',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
  },
  imagemPokemon: { 
    width: 160, 
    height: 160 
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
    fontSize: 14 
  },
  infoCard: {
    backgroundColor: '#fff',
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
    alignItems: 'flex-start' 
  },
  nome: { 
    fontSize: 22, 
    fontWeight: '800', 
    textTransform: 'capitalize' 
  },
  numero: { 
    color: '#6b7280', 
    fontWeight: '600' 
  },
  badgeTipo: { 
    paddingVertical: 4, 
    paddingHorizontal: 12, 
    borderRadius: 12 
  },
  textoBadge: { 
    color: '#fff', 
    fontWeight: '700', 
    fontSize: 12 
  },
  linhaNivel: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 4 
  },
  textoNivel: { 
    fontWeight: '700', 
    color: '#111827' 
  },
  textoExp: { 
    color: '#6b7280', 
    fontWeight: '600' 
  },
  barraExp: { 
    height: 8, 
    borderRadius: 4 
  },
})