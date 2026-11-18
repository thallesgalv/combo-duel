// Distribui as cartas de Yu-Gi-Oh (base/csv/*CardsPerType.csv) entre as cartas do jogo conforme o
// mapeamento escudo → tipo. Sem dependências do Vite: roda no build e no navegador (painel da página inicial).
//
// Regras:
// - Carta com 2 escudos de tipos diferentes → a carta de crossover daquele par (crossoverCardsPerType).
// - Carta com 1 tipo (ou 2 escudos do mesmo tipo) → próxima carta "pura" do tipo, na ordem de cardsPerType.
//   Pura = está no tipo e não é crossover. Cada tipo tem 13 puras.
// - Se o tipo precisa de menos que 13, sobram cartas: saem primeiro as de lessWantedCardsPerType (na ordem do
//   CSV) e, se ainda sobrar, as últimas da lista.
// - Se precisa de mais que 13, as excedentes ficam sem arte.

export type ArtPools = {
  // tipo → cartas (ordem de cardsPerType.csv)
  perType: Record<string, string[]>;
  // "tipoA+tipoB" (ordem alfabética) → carta
  crossover: Record<string, string>;
  // tipo → cartas menos queridas (ordem do CSV)
  lessWanted: Record<string, string[]>;
};

export type ArtCard = { id: number; shields: string[] };

export type TypeArtStats = {
  // Cartas do jogo de um tipo só que precisam de arte pura
  needed: number;
  // Cartas puras disponíveis
  pool: number;
  // Puras que ficaram de fora
  dropped: string[];
  // Das que ficaram de fora, quantas não estavam em lessWanted (teve que cortar carta querida)
  droppedWanted: string[];
  // Cartas do jogo que ficaram sem arte (faltou pura)
  missing: number;
};

// Chave tolerante para casar nome da carta com nome do arquivo: ignora maiúsculas, apóstrofos,
// separadores, a palavra "the" e letras repetidas ("illlusionist" = "illusionist").
export const artKey = (s: string) =>
  s
    .toLowerCase()
    .replace(/'/g, "")
    .split(/[^a-z0-9]+/)
    .filter((w) => w && w !== "the")
    .join("")
    .replace(/(.)\1+/g, "$1");

// Erros de digitação nos nomes de arquivo que a chave tolerante não resolve
const fileTypos: Record<string, string> = { raibid: "rabid" };

// Chaves (artKey) de um arquivo de arte. "harpie_lady__artwork__by_x.png", "TEMP-Axe Raider.png" → nome da carta;
// "summoned_skull_1" também vale como "summoned_skull".
export const artFileKeys = (fileName: string) => {
  let base = fileName
    .replace(/\.[^.]+$/, "")
    .replace(/^TEMO?P-/i, "")
    .replace(/(_+artwork|_+1st_ocg)?_+by_.*$/, "");
  for (const [typo, fix] of Object.entries(fileTypos)) base = base.replace(new RegExp(typo, "i"), fix);
  return /_\d+$/.test(base) ? [artKey(base), artKey(base.replace(/_\d+$/, ""))] : [artKey(base)];
};

export const pairKey = (a: string, b: string) => [a, b].sort().join("+");

const parseLine = (line: string) => [...line.matchAll(/"([^"]*)"|([^,]+)/g)].map((m) => (m[1] ?? m[2]).trim());
const rows = (csv: string) => csv.trim().split(/\r?\n/).slice(1).map(parseLine);

export const parsePools = (cardsPerType: string, crossover: string, lessWanted: string): ArtPools => {
  const group = (csv: string) => {
    const out: Record<string, string[]> = {};
    for (const [type, card] of rows(csv)) (out[type] ??= []).push(card);
    return out;
  };
  return {
    perType: group(cardsPerType),
    crossover: Object.fromEntries(rows(crossover).map(([a, b, card]) => [pairKey(a, b), card])),
    lessWanted: group(lessWanted),
  };
};

export const assignArts = (cards: ArtCard[], mapping: Record<string, string>, pools: ArtPools) => {
  const crossoverCards = new Set(Object.values(pools.crossover));
  const byId = new Map<number, string>();
  const single: Record<string, ArtCard[]> = {};

  for (const card of [...cards].sort((a, b) => a.id - b.id)) {
    const types = [...new Set(card.shields.map((s) => mapping[s]))];
    if (types.length === 2) {
      const art = pools.crossover[pairKey(types[0], types[1])];
      if (art) byId.set(card.id, art);
    } else (single[types[0]] ??= []).push(card);
  }

  const stats: Record<string, TypeArtStats> = {};
  for (const [type, all] of Object.entries(pools.perType)) {
    const pure = all.filter((c) => !crossoverCards.has(c));
    const need = single[type] ?? [];
    let surplus = Math.max(0, pure.length - need.length);
    const dropped = new Set<string>();
    for (const c of pools.lessWanted[type] ?? [])
      if (surplus && pure.includes(c) && !dropped.has(c)) dropped.add(c), surplus--;
    const droppedWanted: string[] = [];
    for (const c of [...pure].reverse())
      if (surplus && !dropped.has(c)) dropped.add(c), droppedWanted.push(c), surplus--;

    const kept = pure.filter((c) => !dropped.has(c));
    need.forEach((card, i) => kept[i] && byId.set(card.id, kept[i]));
    stats[type] = {
      needed: need.length,
      pool: pure.length,
      dropped: [...dropped],
      droppedWanted,
      missing: Math.max(0, need.length - kept.length),
    };
  }
  return { byId, stats };
};
