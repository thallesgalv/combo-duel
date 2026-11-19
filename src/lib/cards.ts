import { cardConfig } from "../../card.config";
import { cardList } from "../../data/cardList";
import type { Card } from "../../types/cardType";
import { shieldTypes } from "./monsterTypes";

export type CardView = Card & {
  // URL da arte (campo `art`); ausente enquanto não houver arquivo
  artSrc?: string;
  // Nome esperado do arquivo de arte (mostrado no placeholder)
  artFile: string;
  // Nome do PNG gerado pelo CLI, ex.: 001-vigia.png
  fileName: string;
  // URL da imagem da carta original (assets/originals/)
  originalSrc?: string;
};

export const slug = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

// Layout desenhado em pixels de impressão (744×1039 para 63×88mm a 300 DPI)
export const printPx = (mm: number) => Math.round((mm / 25.4) * cardConfig.dpi);

export const cardSizeVars = (bleed: boolean) =>
  [
    `--card-w: ${printPx(cardConfig.widthMm)}px`,
    `--card-h: ${printPx(cardConfig.heightMm)}px`,
    `--card-bleed: ${bleed ? printPx(cardConfig.bleedMm) : 0}px`,
  ].join("; ");

export const cardFileName = (card: Pick<Card, "id" | "name">) =>
  `${String(card.id).padStart(3, "0")}-${slug(card.name)}.png`;

// Nome do arquivo em assets/artworks/ (sem extensão) → URL
const artworks = new Map(
  Object.entries(
    import.meta.glob<ImageMetadata>("../../assets/artworks/*.{png,jpg,jpeg,webp}", { eager: true, import: "default" }),
  ).map(([path, image]) => [path.split("/").pop()!.replace(/\.[^.]+$/, ""), image.src]),
);

// Imagem da carta original do Castle Combo: assets/originals/<id>-<nome>.webp (id = linha do originalCards.csv)
const originals = new Map(
  Object.entries(
    import.meta.glob<ImageMetadata>("../../assets/originals/*.webp", { eager: true, import: "default" }),
  ).map(([path, image]) => [Number(path.split("/").pop()!.split("-")[0]), image.src]),
);

// Mapeamento escudo → tipo do CSV (usado pelo painel da página inicial)
export const csvMapping = Object.fromEntries(Object.entries(shieldTypes).map(([shield, { type }]) => [shield, type]));

export const getCards = (): CardView[] =>
  cardList.map((card) => ({
    ...card,
    artSrc: card.art ? artworks.get(card.art) : undefined,
    artFile: card.art ? `${card.art}.png` : "(defina art no cardList)",
    fileName: cardFileName(card),
    originalSrc: originals.get(card.id),
  }));
