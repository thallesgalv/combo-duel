import { cardConfig } from "../../card.config";
import { cardList } from "../../data/cardList";
import type { Card } from "../../types/cardType";

export type CardView = Card & {
  // URL da arte em assets/art/<slug>.png; ausente enquanto não houver arquivo
  artSrc?: string;
  // Nome esperado do arquivo de arte (mostrado no placeholder)
  artFile: string;
  // Nome do PNG gerado pelo CLI, ex.: 001-vigia.png
  fileName: string;
};

export const slug = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const artImages = new Map<string, string>(
  Object.entries(
    import.meta.glob<ImageMetadata>("../../assets/art/*.{png,jpg,jpeg,webp}", { eager: true, import: "default" }),
  ).map(([path, image]) => [path.split("/").pop()!.replace(/\.[^.]+$/, ""), image.src]),
);

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

export const getCards = (): CardView[] =>
  cardList.map((card) => {
    const art = card.art ?? slug(card.name);
    return { ...card, artSrc: artImages.get(art), artFile: `${art}.png`, fileName: cardFileName(card) };
  });
