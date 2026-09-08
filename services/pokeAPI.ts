
const API = 'https://pokeapi.co/api/v2/pokemon'

export interface DetalhePokemonAPI {
  id: number
  nome: string
  imagem: string
  tipos: string[]
}

export async function buscarDetalhePokemon(
  idOuNome: number | string
): Promise<DetalhePokemonAPI> {
  const resposta = await fetch(`${API}/${idOuNome}`)

  if (!resposta.ok) {
    throw new Error(
      `Pokémon ${idOuNome} não encontrado (status ${resposta.status})`
    )
  }

  const dados = await resposta.json()

  return {
    id: dados.id,
    nome: dados.name,
    imagem:
      dados.sprites.versions['generation-v']['black-white'].animated
        .front_default,
    tipos: dados.types.map((t: any) => t.type.name),
  }
}

