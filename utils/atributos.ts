import { AtributosPokemon } from '../types/pokemon'

export function limitar(valor: number): number {
  return Math.min(100, Math.max(0, valor))
}

// Passagem do tempo: chamado a cada tick do setInterval na tela principal.
export function aplicarDecaimento(atributos: AtributosPokemon): AtributosPokemon {
  return {
    fome: limitar(atributos.fome - 3),
    felicidade: limitar(atributos.felicidade - 2),
    energia: limitar(atributos.energia - 2),
    higiene: limitar(atributos.higiene - 1),
  }
}

export function obterMensagemStatus(atributos: AtributosPokemon): string {
  if (atributos.fome <= 20) return 'Estou com fome!'
  if (atributos.energia <= 20) return 'Estou cansado...'
  if (atributos.higiene <= 20) return 'Preciso de um banho!'
  if (atributos.felicidade <= 20) return 'Estou triste...'
  if (atributos.fome <= 50 || atributos.energia <= 50 || atributos.felicidade <= 50 || atributos.higiene <= 50) {
    return 'Estou bem, mas já vi dias melhores.'
  }
  return 'Estou incrível! ⚡'
}

// Muda a cor da barra conforme criticidade — verde ok, amarelo alerta, vermelho crítico.
export function corPorValor(valor: number): string {
  if (valor <= 20) return '#ef4444'
  if (valor <= 50) return '#f59e0b'
  return '#22c55e'
}