// Cor do escudo no Castle Combo; na skin cada cor é um tipo de monstro (ver src/lib/monsterTypes.ts)
export type Shield = "red" | "orange" | "blue" | "purple" | "green" | "yellow";

export type MonsterType = "spellcaster" | "dragon" | "warrior" | "beast" | "fiend" | "machine";

export type Location = "castle" | "village";

// Moldura do painel e das caixas, como no Yu-Gi-Oh: normal = amarelo, effect = laranja, fusion = roxo, ritual = azul;
// deuses egípcios: slifer = vermelho, obelisk = azul, ra = amarelo
export type BoxColor = "normal" | "effect" | "fusion" | "ritual" | "slifer" | "obelisk" | "ra";

export type Card = {
  id: number;
  // Carta de Yu-Gi-Oh que esta carta virou; não aparece na carta impressa (wiki, modal e nome do PNG)
  name: string;
  // Nome no Castle Combo
  originalName: string;
  location: Location;
  // Vira as estrelas da carta
  cost: number;
  shields: [Shield] | [Shield, Shield];
  // Ícone de mover o mensageiro
  moveMessenger: boolean;
  // Carta com bolsa (guarda ouro)
  purse: boolean;
  // Textos originais em inglês — não editar
  originalAbility: string;
  originalScore: string;
  // Textos da skin; **negrito**, *(nota)* e [red]/[blue]/... (escudo → selo do tipo)
  ability: string;
  score: string;
  // Nome do arquivo em assets/artworks/ sem extensão
  art?: string;
  // Moldura (base/csv/cardsPerType.csv, coluna boxColor)
  boxColor: BoxColor;
};
