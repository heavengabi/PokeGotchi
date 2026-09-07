
import { PokeJogo } from "../types/pokemon";
import { TABELA_EVOLUCAO } from "../data/evolucoesPoke";
import { ganharExperiencia } from "./xpzinho";

export interface ResultadoAcao {
  pokemon: PokeJogo;
  mensagem: string | null;
}

export function ganharXpEChecarEvolucao(
  pokemon: PokeJogo,
  xpGanho: number
): ResultadoAcao {

  const resultado = ganharExperiencia(
    pokemon,
    xpGanho
  );

  const regra =
    TABELA_EVOLUCAO[pokemon.speciesId];

  /*
   * Verifica se o Pokémon possui evolução
   * e se já chegou ao nível necessário.
   */
  const precisaEvoluir =
    regra !== null &&
    regra !== undefined &&
    resultado.nivel >= regra.nivelNecessario;

  return {
    pokemon: {
      ...pokemon,

      experiencia: resultado.experiencia,

      experienciaProximoNivel:
        resultado.experienciaProximoNivel,

      nivel: resultado.nivel,

      precisaEvoluir,
    },

    mensagem: resultado.subiuDeNivel
      ? `Subiu para o nível ${resultado.nivel} !`
      : null,
  };
}

