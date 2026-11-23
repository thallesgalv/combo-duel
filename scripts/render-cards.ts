// Gera um PNG por carta em output/cards a partir da rota /render/<id>.
// Também gera o player aid (frente e verso) em output/cards/player-aid-<lado>.png; com --id, só se pedir "aid".
// Uso: npm run cards [-- --id 1,25,aid] [--skip-build] [--public]
import { mkdirSync, writeFileSync } from "node:fs";
import { parseArgs } from "node:util";
import { build, preview } from "astro";
import { chromium } from "playwright";
import sharp from "sharp";
import { cardConfig } from "../card.config.ts";

const PORT = 4399;
const BASE_URL = `http://localhost:${PORT}/combo-duel`;
const OUT_DIR = "output/cards";
const PUBLIC_DIR = "public/cards";

const { values } = parseArgs({
  options: {
    id: { type: "string" },
    "skip-build": { type: "boolean", default: false },
    public: { type: "boolean", default: false },
  },
});

type CardEntry = { id: number; name: string; fileName: string };

if (!values["skip-build"]) await build({});
const server = await preview({ server: { port: PORT }, logLevel: "warn" });

mkdirSync(OUT_DIR, { recursive: true });
if (values.public) mkdirSync(PUBLIC_DIR, { recursive: true });

// A carta já é desenhada em pixels de impressão (1 px CSS = 1 px do PNG); o sharp recorta
// o tamanho exato e grava o DPI no arquivo.
const printPx = (mm: number) => Math.round((mm / 25.4) * cardConfig.dpi);
const size = {
  width: printPx(cardConfig.widthMm + 2 * cardConfig.bleedMm),
  height: printPx(cardConfig.heightMm + 2 * cardConfig.bleedMm),
};
const browser = await chromium.launch();
const failures: string[] = [];

try {
  const cardList: CardEntry[] = await (await fetch(`${BASE_URL}/render/cards.json`)).json();
  const ids = values.id?.split(",").filter((id) => id !== "aid");
  const withAid = !values.id || values.id.split(",").includes("aid");
  const cards = values.id ? cardList.filter((card) => ids.includes(String(card.id))) : cardList;
  const missing = ids?.filter((id) => !cards.some((card) => String(card.id) === id)) ?? [];
  if (missing.length) throw new Error(`ids não encontrados: ${missing.join(", ")}`);

  const page = await browser.newPage({ viewport: { width: size.width + 1, height: size.height + 1 } });

  // Cartas + player aid
  const pages = [
    ...cards.map((card) => ({ name: card.name, path: `render/${card.id}`, fileName: card.fileName })),
    ...(!withAid ? [] : (["frente", "verso"] as const).map((side) => ({
      name: `player aid (${side})`,
      path: `render/player-aid/${side}`,
      fileName: `player-aid-${side}.png`,
    }))),
  ];

  for (const card of pages) {
    try {
      await page.goto(`${BASE_URL}/${card.path}`, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForFunction(() => [...document.images].every((img) => img.complete));
      const buffer = await sharp(await page.screenshot())
        .extract({ left: 0, top: 0, ...size })
        .withMetadata({ density: cardConfig.dpi })
        .toBuffer();
      writeFileSync(`${OUT_DIR}/${card.fileName}`, buffer);
      if (values.public) writeFileSync(`${PUBLIC_DIR}/${card.fileName}`, buffer);
      console.log(`ok  ${card.fileName}`);
    } catch (error) {
      failures.push(card.name);
      console.error(`erro ${card.name}: ${(error as Error).message}`);
    }
  }
} finally {
  await browser.close();
  await server.stop();
}

const where = `${OUT_DIR}${values.public ? ` (+ ${PUBLIC_DIR})` : ""}`;
console.log(failures.length ? `\n${failures.length} carta(s) com erro` : `\ncartas geradas em ${where}`);
if (failures.length) process.exit(1);
