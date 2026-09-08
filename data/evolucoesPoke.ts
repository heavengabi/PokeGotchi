

export interface RegraEvolucao {
  proximoId: number
  nivelNecessario: number
}

// Chave = speciesId atual.
// null = forma final, não evolui mais.
export const TABELA_EVOLUCAO: Record<number, RegraEvolucao | null> = {
  // Bulbasaur
  1: { proximoId: 2, nivelNecessario: 16 },
  2: { proximoId: 3, nivelNecessario: 32 },
  3: null,

  // Charmander
  4: { proximoId: 5, nivelNecessario: 16 },
  5: { proximoId: 6, nivelNecessario: 36 },
  6: null,

  // Squirtle
  7: { proximoId: 8, nivelNecessario: 16 },
  8: { proximoId: 9, nivelNecessario: 36 },
  9: null,

  // Totodile
  158: { proximoId: 159, nivelNecessario: 18 },
  159: { proximoId: 160, nivelNecessario: 30 },
  160: null,
}

export const IDS_STARTERS = [1, 4, 7, 158]





