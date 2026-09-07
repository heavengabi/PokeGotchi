// Consumo da PokéAPI usando fetch, conforme exigido no enunciado.
const API = 'https://pokeapi.co/api/v2/pokemon'

export interface DetalhePokemonAPI {
  id: number
  nome: string
  imagem: string
  tipos: string[]
}

export async function buscarDetalhePokemon(idOuNome: number | string): Promise<DetalhePokemonAPI> {
  const resposta = await fetch(`${API}/${idOuNome}`)
  if (!resposta.ok) {
    throw new Error(`Pokémon ${idOuNome} não encontrado (status ${resposta.status})`)
  }
  const dados = await resposta.json()

  // Nem todo pokémon tem gif animado (só até a geração 5, ids até 649).
  // Se não existir, cai pro sprite estático como reserva.
  const gifAnimado = dados.sprites?.versions?.['generation-v']?.['black-white']?.animated?.front_default
  const imagemFinal = gifAnimado ?? dados.sprites.front_default

  return {
    id: dados.id,
    nome: dados.name,
    imagem: imagemFinal,
    tipos: dados.types.map((t: any) => t.type.name),
  }
}