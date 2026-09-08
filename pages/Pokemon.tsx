import {
  ScrollView,
  StyleSheet,
} from 'react-native';

import React, { useEffect, useState } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';

import Navbar from '../components/Navbar';
import CardPoke from '../components/CardPoke';
import Atributos from '../components/Atributos';
import Evento from '../components/Evento';
import { PokeJogo } from '../types/pokemon';
import { TABELA_EVOLUCAO } from '../data/evolucoesPoke';
import { buscarDetalhePokemon } from '../services/pokeAPI';
import {
  aplicarDecaimento,
  obterMensagemStatus,
  podeTreinar,
} from '../utils/atributos';
import { ganharXpEChecarEvolucao } from '../utils/pokejogo';
import { salvarPokemon } from '../utils/progressoPokemon';
import BotoesPoke from '../components/BotoesPoke';

const TempoAtributos = 5000;

interface Props {
  pokemon: PokeJogo;
  setPokemon: React.Dispatch<React.SetStateAction<PokeJogo | null>>;
  Trocar: () => void;
}

const Pokemon = ({ pokemon, setPokemon, Trocar }: Props) => {
  const [mensagemEvento, setMensagemEvento] = useState<string | null>(null);
  const [evoluindo, setEvoluindo] = useState(false);

  useEffect(() => {
    salvarPokemon(pokemon);
  }, [pokemon]);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setPokemon((prev) =>
        prev
          ? {
            ...prev,
            atributos: aplicarDecaimento(prev.atributos),
          }
          : prev
      );
    }, TempoAtributos);

    return () => clearInterval(intervalo);
  }, [setPokemon]);

  useEffect(() => {
    if (!pokemon.precisaEvoluir || evoluindo) return;

    setEvoluindo(true);

    async function evoluir() {
      const regra = TABELA_EVOLUCAO[pokemon.speciesId];

      if (!regra) {
        setEvoluindo(false);
        return;
      }

      try {
        const proximo = await buscarDetalhePokemon(regra.proximoId);
        const nomeAntigo = pokemon.nome;

        setPokemon((prev) =>
          prev
            ? {
              ...prev,
              speciesId: proximo.id,
              nome: proximo.nome,
              imagem: proximo.imagem,
              tipos: proximo.tipos,
              precisaEvoluir: false,
            }
            : prev
        );

        setMensagemEvento(
          `${nomeAntigo} evoluiu para ${proximo.nome}! 🎉`
        );
      } catch (erro) {
        console.error('Erro ao evoluir pokémon', erro);
      } finally {
        setEvoluindo(false);
      }
    }

    evoluir();
  }, [
    pokemon.precisaEvoluir,
    pokemon.speciesId,
    evoluindo,
  ]);

  function alimentar() {
    setMensagemEvento(null);

    const comAtributos: PokeJogo = {
      ...pokemon,
      atributos: {
        ...pokemon.atributos,
        fome: Math.min(
          100,
          pokemon.atributos.fome + 30
        ),
      },
    };

    const {
      pokemon: atualizado,
      mensagem,
    } = ganharXpEChecarEvolucao(
      comAtributos,
      5
    );

    setPokemon(atualizado);
    setMensagemEvento(mensagem);
  }

  function dormir() {
    setMensagemEvento(null);

    const comAtributos: PokeJogo = {
      ...pokemon,
      atributos: {
        ...pokemon.atributos,
        energia: 100,
      },
    };

    const {
      pokemon: atualizado,
      mensagem,
    } = ganharXpEChecarEvolucao(
      comAtributos,
      5
    );

    setPokemon(atualizado);
    setMensagemEvento(mensagem);
  }

  function limpar() {
    setMensagemEvento(null);

    const comAtributos: PokeJogo = {
      ...pokemon,
      atributos: {
        ...pokemon.atributos,
        higiene: 100,
      },
    };

    const {
      pokemon: atualizado,
      mensagem,
    } = ganharXpEChecarEvolucao(
      comAtributos,
      5
    );

    setPokemon(atualizado);
    setMensagemEvento(mensagem);
  }

  function brincar() {
    const comAtributos: PokeJogo = {
      ...pokemon,
      atributos: {
        ...pokemon.atributos,
        felicidade: Math.min(
          100,
          pokemon.atributos.felicidade + 20
        ),
        energia: Math.max(
          0,
          pokemon.atributos.energia - 10
        ),
        fome: Math.max(
          0,
          pokemon.atributos.fome - 5
        ),
      },
    };

    const {
      pokemon: atualizado,
      mensagem,
    } = ganharXpEChecarEvolucao(
      comAtributos,
      5
    );

    setPokemon(atualizado);
    setMensagemEvento(mensagem);
  }

  function treinar() {
    if (!podeTreinar(pokemon.atributos)) {
      setMensagemEvento(
        'Sem energia ou fome suficiente pra treinar!'
      );
      return;
    }

    const comAtributos: PokeJogo = {
      ...pokemon,
      atributos: {
        ...pokemon.atributos,
        energia: Math.max(
          0,
          pokemon.atributos.energia - 20
        ),
        fome: Math.max(
          0,
          pokemon.atributos.fome - 15
        ),
      },
    };

    const {
      pokemon: atualizado,
      mensagem,
    } = ganharXpEChecarEvolucao(
      comAtributos,
      500
    );

    setPokemon(atualizado);
    setMensagemEvento(mensagem);
  }

  const mensagemStatus =
    obterMensagemStatus(pokemon.atributos);

  return (
    <SafeAreaView style={styles.container}>
      <Navbar Trocar={Trocar} />

      <ScrollView
        contentContainerStyle={styles.conteudo}
        showsVerticalScrollIndicator={false}
      >
        <CardPoke
          pokemon={pokemon}
          mensagemStatus={mensagemStatus}
        />

        {mensagemEvento && (
          <Evento mensagem={mensagemEvento} />
        )}

        <Atributos
          fome={pokemon.atributos.fome}
          felicidade={pokemon.atributos.felicidade}
          energia={pokemon.atributos.energia}
          higiene={pokemon.atributos.higiene}
        />

        <BotoesPoke
          Alimentar={alimentar}
          Brincar={brincar}
          Dormir={dormir}
          Limpar={limpar}
          Treinar={treinar}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Pokemon;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f1e8',
  },

  conteudo: {
    backgroundColor: '#f5f1e8',
    paddingTop: 16,
    paddingBottom: 32,
    alignItems: 'center',
  },

  rodape: {
    color: '#9ca3af',
    fontSize: 12,
    marginTop: 8,
  },
});