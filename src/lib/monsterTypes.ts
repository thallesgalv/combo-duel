import mappingCsv from "../../base/csv/vigentTypeColorShieldMapping.csv?raw";
import type { Location, MonsterType, Shield } from "../../types/cardType";

// Tipos de monstro de Yu-Gi-Oh usados como escudos. Ícone em assets/types/<tipo>.png.
export const monsterTypes: Record<MonsterType, { label: string }> = {
  spellcaster: { label: "Mago" },
  dragon: { label: "Dragão" },
  warrior: { label: "Guerreiro" },
  beast: { label: "Besta" },
  fiend: { label: "Demônio" },
  machine: { label: "Máquina" },
};

// Cor de fundo do círculo de cada escudo (fixa por cor)
export const shieldColors: Record<Shield, string> = {
  red: "#b8322a",
  orange: "#b8692a",
  blue: "#2f5fb8",
  purple: "#5e3596",
  green: "#2f7f45",
  yellow: "#b8901e",
};

// Qual escudo do Castle Combo vira qual tipo: vem de base/csv/vigentTypeColorShieldMapping.csv.
// Trocar o CSV atualiza os ícones de tipo nas cartas, textos ([red] etc.) e wiki.
const mappingRows = mappingCsv
  .trim()
  .split(/\r?\n/)
  .slice(1)
  .map((line) => line.split(",").map((v) => v.trim()) as [Shield, MonsterType]);

export const shieldTypes = Object.fromEntries(
  mappingRows.map(([shield, type]) => [shield, { type, color: shieldColors[shield] }]),
) as Record<Shield, { type: MonsterType; color: string }>;

// Ícones DG (Yu-Gi-Oh! Duel Generation) em assets/types/<tipo>.webp
const typeIcons = new Map(
  Object.entries(
    import.meta.glob<ImageMetadata>("../../assets/types/*.{png,jpg,jpeg,webp,svg}", { eager: true, import: "default" }),
  ).map(([path, image]) => [path.split("/").pop()!.replace(/\.[^.]+$/, ""), image.src]),
);

// URL do ícone do tipo; ausente enquanto não houver arquivo
export const typeIcon = (type: MonsterType) => typeIcons.get(type);

export const shieldInfo = (shield: Shield) => {
  const { type, color } = shieldTypes[shield];
  return { type, color, label: monsterTypes[type].label, icon: typeIcon(type) };
};

export const isShield = (s: string): s is Shield => s in shieldTypes;

export const locations: Record<Location, { label: string }> = {
  // Castelo do Castle Combo = Baralho Dourado; Vilarejo = Baralho Preto (cor do verso e do ícone)
  castle: { label: "Baralho Dourado" },
  village: { label: "Baralho Preto" },
};
