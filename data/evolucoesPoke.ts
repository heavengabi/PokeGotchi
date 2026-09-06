export interface RegraEvolucao {
  proximoId: number
  nivelNecessario: number
}

// Chave = speciesId atual. null = forma final, não evolui mais.
export const TABELA_EVOLUCAO: Record<number, RegraEvolucao | null> = {
  1: { proximoId: 2, nivelNecessario: 16 },  // Bulbasaur -> Ivysaur
  2: { proximoId: 3, nivelNecessario: 32 },  // Ivysaur -> Venusaur
  3: null,
  4: { proximoId: 5, nivelNecessario: 16 },  // Charmander -> Charmeleon
  5: { proximoId: 6, nivelNecessario: 36 },  // Charmeleon -> Charizard
  6: null,
  7: { proximoId: 8, nivelNecessario: 16 },  // Squirtle -> Wartortle
  8: { proximoId: 9, nivelNecessario: 36 },  // Wartortle -> Blastoise
  9: null,
}

export const IDS_STARTERS = [1, 4, 7] // Bulbasaur, Charmander, Squirtle