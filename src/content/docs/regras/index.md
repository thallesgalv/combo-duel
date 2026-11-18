---
title: Visão geral
description: Objetivo e componentes do Combo Duel.
sidebar:
  order: 1
---

Combo Duel é uma skin Yu-Gi-Oh de **Castle Combo**. Cada jogador recruta **9 cartas** e monta um reino em grade **3×3**. Cada carta tem um **efeito** que acontece quando ela é comprada e uma regra de **pontos** contada no fim do jogo. Quem tiver mais pontos vence.

## Componentes

- **78 cartas**: 39 do **Baralho Dourado** e 39 do **Baralho Preto** (versos diferentes).
- **1 mensageiro**: indica de qual fileira se compra.
- **Ouro** e **chaves**: não são limitados; se acabarem, use qualquer substituto.

## Anatomia da carta

| Elemento | Onde fica | Para que serve |
|---|---|---|
| Custo | estrelas na base da arte | ouro pago para comprar a carta (sem estrelas = custo 0) |
| Tipos | círculos no canto superior direito | os “escudos” do jogo original (1 ou 2 por carta) |
| Baralho Dourado / Preto | triângulo do mensageiro (▼ preto nas cartas do Dourado / ▲ dourado nas do Preto) | baralho de origem; também é o ícone de carta dourada/preta citado em alguns textos |
| Mensageiro | selo no canto superior esquerdo da arte | ao comprar a carta, o mensageiro vai para o lado dela |
| Bolsa | círculo tracejado na arte | guarda ouro no fim do jogo |
| Efeito | caixa de texto de cima | resolve uma vez, logo após a compra |
| Pontos | caixa de texto de baixo | contado no fim do jogo |

## Tipos

Os seis escudos de Castle Combo viram tipos de monstro de Yu-Gi-Oh: **Mago**, **Dragão**, **Guerreiro**, **Besta**, **Demônio** e **Máquina**.

:::caution[Em testes]
A associação ainda está sendo testada. Ela vem de `base/csv/vigentTypeColorShieldMapping.csv`, e na página inicial dá para testar outra.
:::

| Castle Combo | Tipo |
|---|---|
| Militar (vermelho) | **Máquina** |
| Artesanato (laranja) | **Besta** |
| Nobreza (azul) | **Mago** |
| Fé (roxo) | **Dragão** |
| Erudição (verde) | **Guerreiro** |
| Campesinato (amarelo) | **Demônio** |
