// Cor do escudo no Castle Combo; na skin cada cor é um tipo de monstro (ver src/lib/monsterTypes.ts)
export type Shield = "red" | "orange" | "blue" | "purple" | "green" | "yellow";

export type MonsterType = "spellcaster" | "dragon" | "warrior" | "beast" | "fiend" | "machine";

export type Location = "castle" | "village";

export type Card = {
  id: number;
  // Carta de Yu-Gi-Oh que esta carta virou (gerado por npm run cardlist); não aparece na carta impressa
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
  // Nome do arquivo em assets/artworks/ sem extensão (gerado por npm run cardlist)
  art?: string;
};
