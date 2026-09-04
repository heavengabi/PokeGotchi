import { ScrollView, StyleSheet, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import CardPoke from '../components/CardPoke'
import Atributos from '../components/Atributos'
import BotoesAcao from '../components/BotoesPoke'
import Evento from '../components/Evento'
import { PokeJogo } from '../types/pokemon'
import { TABELA_EVOLUCAO } from '../data/evolucoesPoke'
import { buscarDetalhePokemon } from '../services/pokeAPI'
import { aplicarDecaimento, obterMensagemStatus } from '../utils/atributos'
import { ganharXpEChecarEvolucao } from '../utils/pokejogo'
import BotoesPoke from '../components/BotoesPoke'
import Evento from '../components/Evento'

const INTERVALO_DECAIMENTO_MS = 5000 // passagem do tempo: atributos caem a cada 5s

interface Props {
  pokemon: PokeJogo
  setPokemon: React.Dispatch<React.SetStateAction<PokeJogo | null>>
  aoTrocar: () => void
}

const Pokemon = ({ pokemon, setPokemon, aoTrocar }: Props) => {
  const [mensagemEvento, setMensagemEvento] = useState<string | null>(null)
  const [evoluindo, setEvoluindo] = useState(false)

  // Passagem do tempo (requisito 4): a cada 5s os atributos decaem.
  // Usa a forma funcional do setState (prev => ...) porque a função do
  // setInterval é criada uma vez só no primeiro render e, sem isso,
  // ficaria presa enxergando sempre o pokémon daquele momento.
  useEffect(() => {
    const intervalo = setInterval(() => {
      setPokemon((prev) => (prev ? { ...prev, atributos: aplicarDecaimento(prev.atributos) } : prev))
    }, INTERVALO_DECAIMENTO_MS)
    return () => clearInterval(intervalo)
  }, [setPokemon])

  // Sistema de evolução (requisito 8): observa a flag "precisaEvoluir"
  // (definida em ganharXpEChecarEvolucao quando o nível bate o necessário)
  // e busca o próximo estágio na PokéAPI quando ela fica true.
  // "evoluindo" evita disparar duas buscas em paralelo caso o efeito rode
  // de novo antes da primeira terminar.
  useEffect(() => {
    if (!pokemon.precisaEvoluir || evoluindo) return

    setEvoluindo(true)
    async function evoluir() {
      const regra = TABELA_EVOLUCAO[pokemon.speciesId]
      if (!regra) return
      try {
        const proximo = await buscarDetalhePokemon(regra.proximoId)
        const nomeAntigo = pokemon.nome
        setPokemon((prev) =>
          prev
            ? {
                ...prev,
                speciesId: proximo.id,
                nome: proximo.nome,
                imagem: proximo.imagem,
                tipos: proximo.tipos,
                alturaMetros: proximo.alturaMetros,
                pesoKg: proximo.pesoKg,
                precisaEvoluir: false,
              }
            : prev
        )
        setMensagemEvento(`${nomeAntigo} evoluiu para ${proximo.nome}! 🎉`)
      } catch (erro) {
        console.error('Erro ao evoluir pokémon', erro)
      } finally {
        setEvoluindo(false)
      }
    }
    evoluir()
  }, [pokemon.precisaEvoluir, pokemon.speciesId, evoluindo])

  // Ações do jogador (requisito 5)
  function alimentar() {
    setMensagemEvento(null)
    setPokemon({ ...pokemon, atributos: { ...pokemon.atributos, fome: Math.min(100, pokemon.atributos.fome + 30) } })
  }

  function dormir() {
    setMensagemEvento(null)
    setPokemon({ ...pokemon, atributos: { ...pokemon.atributos, energia: 100 } })
  }

  function limpar() {
    setMensagemEvento(null)
    setPokemon({ ...pokemon, atributos: { ...pokemon.atributos, higiene: 100 } })
  }

  function brincar() {
    const comAtributos: PokeJogo = {
      ...pokemon,
      atributos: {
        ...pokemon.atributos,
        felicidade: Math.min(100, pokemon.atributos.felicidade + 20),
        energia: Math.max(0, pokemon.atributos.energia - 10),
        fome: Math.max(0, pokemon.atributos.fome - 5),
      },
    }
    const { pokemon: atualizado, mensagem } = ganharXpEChecarEvolucao(comAtributos, 5)
    setPokemon(atualizado)
    setMensagemEvento(mensagem)
  }

  function treinar() {
    const comAtributos: PokeJogo = {
      ...pokemon,
      atributos: {
        ...pokemon.atributos,
        energia: Math.max(0, pokemon.atributos.energia - 20),
        fome: Math.max(0, pokemon.atributos.fome - 15),
      },
    }
    const { pokemon: atualizado, mensagem } = ganharXpEChecarEvolucao(comAtributos, 100)
    setPokemon(atualizado)
    setMensagemEvento(mensagem)
  }

  const mensagemStatus = obterMensagemStatus(pokemon.atributos)

  return (
    <>
      <Navbar aoTrocar={aoTrocar} />
      <ScrollView contentContainerStyle={styles.conteudo}>
        <CardPoke pokemon={pokemon} mensagemStatus={mensagemStatus} />
        {mensagemEvento && <Evento mensagem={mensagemEvento} />}
        <Atributos
          fome={pokemon.atributos.fome}
          felicidade={pokemon.atributos.felicidade}
          energia={pokemon.atributos.energia}
          higiene={pokemon.atributos.higiene}
        />
        <BotoesPoke
          aoAlimentar={alimentar}
          aoBrincar={brincar}
          aoDormir={dormir}
          aoLimpar={limpar}
          aoTreinar={treinar}
        />
        <Text style={styles.rodape}>Dados dos Pokémon: PokéAPI</Text>
      </ScrollView>
    </>
  )
}

export default Pokemon

const styles = StyleSheet.create({
  conteudo: { backgroundColor: '#f5f1e8', paddingTop: 16, paddingBottom: 32, alignItems: 'center' },
  rodape: { color: '#9ca3af', fontSize: 12, marginTop: 8 },
})