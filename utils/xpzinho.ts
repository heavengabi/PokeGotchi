import { PokeJogo } from '../types/pokemon'

export function xpNecessarioParaNivel(nivel: number): number {
  return nivel * 100
}

// Sistema de experiência e nível. Usa "while" (não "if") porque um ganho
// grande de xp pode, em teoria, fazer o pokémon subir mais de 1 nível de uma vez.
export function ganharExperiencia(pokemon: PokeJogo, quantidade: number) {
  let experiencia = pokemon.experiencia + quantidade
  let nivel = pokemon.nivel
  let experienciaProximoNivel = pokemon.experienciaProximoNivel
  let subiuDeNivel = false

  while (experiencia >= experienciaProximoNivel) {
    experiencia -= experienciaProximoNivel
    nivel += 1
    experienciaProximoNivel = xpNecessarioParaNivel(nivel)
    subiuDeNivel = true
  }

  return { experiencia, experienciaProximoNivel, nivel, subiuDeNivel }
}