// Artes em assets/artworks/ e as listas de cartas de Yu-Gi-Oh por tipo (base/csv/).
import cardsPerTypeCsv from "../../base/csv/cardsPerType.csv?raw";
import crossoverCsv from "../../base/csv/crossoverCardsPerType.csv?raw";
import lessWantedCsv from "../../base/csv/lessWantedCardsPerType.csv?raw";
import { artFileKeys, artKey, parsePools } from "./artAssignment";

export const artPools = parsePools(cardsPerTypeCsv, crossoverCsv, lessWantedCsv);

export type Artwork = { src: string; file: string };

// Nome exato do arquivo (sem extensão) → arte; usado pelo campo `art` das cartas
export const artworksByFile = new Map<string, Artwork>();
// artKey do nome da carta de Yu-Gi-Oh → arte
const artworksByKey = new Map<string, Artwork>();

for (const [path, image] of Object.entries(
  import.meta.glob<ImageMetadata>("../../assets/artworks/*.{png,jpg,jpeg,webp}", { eager: true, import: "default" }),
)) {
  const file = path.split("/").pop()!;
  const art = { src: image.src, file };
  artworksByFile.set(file.replace(/\.[^.]+$/, ""), art);
  for (const key of artFileKeys(file)) artworksByKey.set(key, art);
}

// Arte de uma carta de Yu-Gi-Oh pelo nome (ex.: "Dark Magician")
export const artworkFor = (ygoName: string) => artworksByKey.get(artKey(ygoName));
