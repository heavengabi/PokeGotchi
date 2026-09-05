export interface AtributosPokemon {
  fome: number
  felicidade: number
  energia: number
  higiene: number
}

export interface PokeJogo {
  speciesId: number
  nome: string
  imagem: string
  tipos: string[]
  alturaMetros: number
  pesoKg: number
  nivel: number
  experiencia: number
  experienciaProximoNivel: number
  atributos: AtributosPokemon
  precisaEvoluir: boolean
}