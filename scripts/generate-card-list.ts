// Gera data/cardList.ts a partir dos CSVs de base/csv/ e dos textos de data/cardTexts.ts.
// Uso: npm run cardlist
//
// - Cartas, custo, escudos e textos originais: base/csv/originalCards.csv
// - Escudo → tipo: base/csv/vigentTypeColorShieldMapping.csv
// - Qual carta de Yu-Gi-Oh cada carta vira (name + art): cardsPerType, crossoverCardsPerType e
//   lessWantedCardsPerType, pela regra de src/lib/artAssignment.ts
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { cardTexts } from "../data/cardTexts.ts";
import { artFileKeys, artKey, assignArts, parsePools } from "../src/lib/artAssignment.ts";

const read = (file: string) => readFileSync(`base/csv/${file}`, "utf8");

// CSV com campos entre aspas e campos vazios
const parseCsv = (text: string) => {
  const [header, ...lines] = text.trim().split(/\r?\n/);
  const keys = header.split(",");
  return lines.map((line) => {
    const values = [...line.matchAll(/(?:^|,)(?:"([^"]*)"|([^,]*))/g)].map((m) => m[1] ?? m[2]);
    return Object.fromEntries(keys.map((key, i) => [key, values[i] ?? ""]));
  });
};

const original = parseCsv(read("originalCards.csv")).map((row) => ({
  id: Number(row.id),
  originalName: row.name,
  location: row.location,
  cost: Number(row.cost),
  shields: [row.shield1, row.shield2].filter(Boolean),
  moveMessenger: row.moveMessenger === "true",
  originalAbility: row.ability,
  originalScore: row.score,
}));

const mapping = Object.fromEntries(parseCsv(read("vigentTypeColorShieldMapping.csv")).map((r) => [r.shield, r.type]));
const pools = parsePools(read("cardsPerType.csv"), read("crossoverCardsPerType.csv"), read("lessWantedCardsPerType.csv"));
const { byId, stats } = assignArts(original, mapping, pools);

// Arquivo de arte (sem extensão) por carta de Yu-Gi-Oh
const artFiles = new Map<string, string>();
for (const file of readdirSync("assets/artworks").filter((f) => /\.(png|jpe?g|webp)$/i.test(f)))
  for (const key of artFileKeys(file)) artFiles.set(key, file.replace(/\.[^.]+$/, ""));

const problems: string[] = [];
const q = JSON.stringify;

const entries = original.map((card) => {
  const text = cardTexts[card.id];
  if (!text) throw new Error(`sem texto em data/cardTexts.ts para a carta ${card.id} (${card.originalName})`);
  const ygo = byId.get(card.id);
  const art = ygo && artFiles.get(artKey(ygo));
  if (!ygo) problems.push(`#${card.id} ${card.originalName}: sem carta de Yu-Gi-Oh`);
  else if (!art) problems.push(`#${card.id} ${ygo}: sem arquivo em assets/artworks/`);
  const types = [...new Set(card.shields.map((s) => mapping[s]))].join(" + ");
  return `  {
    // ${card.originalName} · ${types}
    id: ${card.id},
    name: ${q(ygo ?? card.originalName)},${art ? `\n    art: ${q(art)},` : ""}
    originalName: ${q(card.originalName)},
    location: ${q(card.location)},
    cost: ${card.cost},
    shields: ${q(card.shields).replace(/,/g, ", ")},
    moveMessenger: ${card.moveMessenger},
    purse: ${!!text.purse},
    originalAbility: ${q(card.originalAbility)},
    originalScore: ${q(card.originalScore)},
    ability: ${q(text.ability)},
    score: ${q(text.score)},
  },`;
});

writeFileSync(
  "data/cardList.ts",
  `import type { Card } from "../types/cardType";

// GERADO por \`npm run cardlist\` (scripts/generate-card-list.ts) — não editar.
// Dados em base/csv/ e textos da skin em data/cardTexts.ts.
// name/art = carta de Yu-Gi-Oh distribuída pelo tipo (src/lib/artAssignment.ts). original* = Castle Combo.
export const cardList: Card[] = [
${entries.join("\n")}
];
`,
);

console.log(`data/cardList.ts: ${entries.length} cartas\n`);
console.log("tipo         precisa  cortadas");
for (const [type, s] of Object.entries(stats)) {
  const extra = [
    s.droppedWanted.length && `fora do lessWanted: ${s.droppedWanted.join(", ")}`,
    s.missing && `faltam ${s.missing}`,
  ].filter(Boolean);
  console.log(`${type.padEnd(12)} ${`${s.needed}/${s.pool}`.padEnd(8)} ${s.dropped.length}${extra.length ? `  ⚠ ${extra.join("; ")}` : ""}`);
}
if (problems.length) console.log(`\n⚠ ${problems.length} problema(s):\n${problems.map((p) => `  ${p}`).join("\n")}`);
