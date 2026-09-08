import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text, Chip, Surface, Divider } from "react-native-paper";
// IMPORTANTE: O 'Image' do 'expo-image' substitui o nativo do React Native para permitir a reprodução de GIFs no Android/iOS
import { Image } from "expo-image";

import { PokeJogo } from "../types/pokemon";

// Tipagem da prop recebida pelo componente
interface Props {
  pokemon: PokeJogo;
}

// Mapeamento de cores hexadecimais para cada tipo de Pokémon
const CORES_TIPO: Record<string, string> = {
  normal: "#A8A77A",
  fire: "#F08030",
  water: "#6890F0",
  electric: "#F8D030",
  grass: "#78C850",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
};

export default function CardSelecao({ pokemon }: Props) {
  /* 
   * TRATAMENTO DE COR DINÂMICA:
   * Converte o nome do primeiro tipo do Pokémon para letras minúsculas 
   * para fazer o match correto com as chaves do dicionário CORES_TIPO.
   * Se a cor não for encontrada, o operador '??' usa "#777" (cinza) como padrão.
   */
  const tipo = pokemon.tipos[0].toLowerCase();
  const corTipo = CORES_TIPO[tipo] ?? "#777";

  return (
    // Borda e container externo do Card (estilo TCG)
    <Card style={styles.cardBorder} mode="elevated" elevation={4}>

      {/* Conteúdo interno com leve transparência escura */}
      <Card.Content style={styles.cardInner}>

        {/* ==================== TOPO DA CARTA ==================== */}
        <View style={styles.topo}>
          {/* Número do Pokémon formatado com zeros à esquerda (ex: #004) */}
          <Text variant="labelSmall" style={styles.estagio}>
            #{String(pokemon.speciesId).padStart(3, "0")}
          </Text>

          {/* Nome do Pokémon em letras maiúsculas */}
          <Text variant="titleMedium" style={styles.nome}>
            {pokemon.nome.toUpperCase()}
          </Text>

          {/* Área com o Nível e Indicador de Tipo */}
          <View style={styles.hpArea}>
            <Text variant="labelSmall" style={styles.hpLabel}>LV</Text>
            <Text variant="titleSmall" style={styles.hpValor}>{pokemon.nivel}</Text>

            {/* Círculo colorido com a inicial do tipo do Pokémon */}
            <Surface style={[styles.tipoCirculo, { backgroundColor: corTipo }]} elevation={0}>
              <Text style={styles.tipoTexto}>
                {pokemon.tipos[0].charAt(0).toUpperCase()}
              </Text>
            </Surface>
          </View>
        </View>

        {/* ==================== ÁREA DA IMAGEM (GIF ANIMADO) ==================== */}
        <View style={styles.areaImagemContainer}>
          <View style={styles.molduraImagem}>
            <View style={styles.fundoImagem}>
              {/* 
                COMPONENTE EXPO-IMAGE:
                - source: Recebe a URL do GIF vindo da PokeAPI
                - contentFit="contain": Garante que o GIF fique centralizado sem cortar
                - autoplay={true}: Força o GIF a começar a mexer imediatamente ao carregar
              */}
              <Image
                source={{ uri: pokemon.imagem }}
                style={styles.pokemon}
                contentFit="contain"
                autoplay={true}
              />
            </View>
          </View>
        </View>

        {/* ==================== BARRA DECORATIVA ==================== */}
        <View style={styles.barraAmarela} />

        {/* ==================== SEÇÃO DE ATAQUES / EXPERIÊNCIA ==================== */}
        <View style={styles.secaoAtaques}>
          {/* Linha de Experiência Atual / Próximo Nível */}
          <View style={styles.linhaAtaque}>
            <Text style={styles.simbolos}>★</Text>
            <Text style={styles.nomeAtaque}>EXPERIÊNCIA</Text>
            <Text style={styles.danoAtaque}>
              {pokemon.experiencia}/{pokemon.experienciaProximoNivel}
            </Text>
          </View>

          {/* Linha divisória fina com transparência */}
          <Divider style={styles.linhaDivisoria} />

          {/* Linha representando o ataque principal */}
          <View style={styles.linhaAtaque}>
            <Text style={styles.simbolos}>★★</Text>
            <Text style={styles.nomeAtaque}>ESCOLHA-ME!</Text>
            <Text style={styles.danoAtaque}>100</Text>
          </View>
        </View>

        {/* ==================== RODAPÉ COM CHIPS ==================== */}
        <View style={styles.rodape}>
          {/* Chip indicando o Tipo do Pokémon com uma bolinha da cor correspondente */}
          <Chip
            compact
            style={styles.chipRodape}
            textStyle={styles.textChip}
            avatar={<View style={[styles.miniTipo, { backgroundColor: corTipo }]} />}
          >
            TIPO: {pokemon.tipos[0].toUpperCase()}
          </Chip>

          {/* Chip indicando o Nível */}
          <Chip compact style={styles.chipRodape} textStyle={styles.textChip}>
            NÍVEL: ★ {pokemon.nivel}
          </Chip>
        </View>

      </Card.Content>
    </Card>
  );
}

// Estilização completa do componente usando StyleSheet
const styles = StyleSheet.create({
  /* Container e Bordas do Card */
  cardBorder: {
    width: 200,
    backgroundColor: "rgba(0, 0, 0, 0.20)", // Cor de fundo externa semi-transparente
    borderRadius: 12,
    margin: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.25)", // Borda branca suave estilo vidro
  },
  cardInner: {
    backgroundColor: "rgba(0, 0, 0, 0.15)", // Fundo interno transparente
    borderRadius: 10,
    padding: 6,
  },

  /* Topo do Card */
  topo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  estagio: {
    color: "#DDD",
    fontWeight: "bold",
  },
  nome: {
    fontWeight: "900",
    color: "#FFFFFF",
    flex: 1,
    marginLeft: 4,
    fontSize: 11,
    textShadowColor: "rgba(0, 0, 0, 0.8)", // Sombra para o texto se destacar no fundo
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  hpArea: {
    flexDirection: "row",
    alignItems: "center",
  },
  hpLabel: {
    fontWeight: "bold",
    color: "#FFD700",
    fontSize: 8,
    marginRight: 1,
  },
  hpValor: {
    fontWeight: "900",
    color: "#FFD700",
    fontSize: 11,
    marginRight: 3,
  },
  tipoCirculo: {
    width: 14,
    height: 14,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  tipoTexto: {
    color: "#FFF",
    fontSize: 7,
    fontWeight: "bold",
  },

  /* Moldura e Imagem do Pokémon */
  areaImagemContainer: {
    width: "100%",
    alignItems: "center",
  },
  molduraImagem: {
    width: "100%",
    height: 140, // Altura ajustada para destacar a animação
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: 4,
    overflow: "hidden",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  fundoImagem: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  pokemon: {
    width: 100, // Dimensões da imagem/GIF do Pokémon
    height: 100,
  },

  /* Detalhes Decorativos */
  barraAmarela: {
    width: "90%",
    height: 3,
    backgroundColor: "#FFD700",
    alignSelf: "center",
    marginTop: 4,
  },

  /* Seção de Ataques */
  secaoAtaques: {
    paddingHorizontal: 2,
    marginVertical: 4,
  },
  linhaAtaque: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 2,
  },
  simbolos: {
    fontSize: 8,
    color: "#FFD700",
    width: 20,
  },
  nomeAtaque: {
    fontSize: 8,
    fontWeight: "900",
    color: "#FFFFFF",
    flex: 1,
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  danoAtaque: {
    fontSize: 10,
    fontWeight: "900",
    color: "#FFD700",
  },
  linhaDivisoria: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    height: 1,
    marginVertical: 3,
  },

  /* Rodapé com Chips */
  rodape: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 4,
    marginTop: 4,
  },
  chipRodape: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    height: 22,
    alignItems: "center",
  },
  textChip: {
    fontSize: 7,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginVertical: 0,
  },
  miniTipo: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});