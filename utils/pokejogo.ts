import { PokeJogo } from '../types/pokemon'
import { TABELA_EVOLUCAO } from '../data/evolucoes'
import { ganharExperiencia } from './xpzinho'

export interface ResultadoAcao {
  pokemon: PokeJogo
  mensagem: string | null
}

// Junta "ganhar xp" com "checar se precisa evoluir" — usado por Brincar e Treinar.
export function ganharXpEChecarEvolucao(pokemon: PokeJogo, xpGanho: number): ResultadoAcao {
  const resultado = ganharExperiencia(pokemon, xpGanho)
  const regra = TABELA_EVOLUCAO[pokemon.speciesId]
  const precisaEvoluir = !!regra && resultado.nivel >= regra.nivelNecessario

  return {
    pokemon: {
      ...pokemon,
      experiencia: resultado.experiencia,
      experienciaProximoNivel: resultado.experienciaProximoNivel,
      nivel: resultado.nivel,
      precisaEvoluir,
    },
    mensagem: resultado.subiuDeNivel ? `Subiu para o nível ${resultado.nivel}!` : null,
  }
}