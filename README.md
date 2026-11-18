# Combo Duel

Skin Yu-Gi-Oh de **Castle Combo**. Gera as cartas para impressão e serve de wiki (Astro + Starlight).

## Setup

```sh
npm install
npx playwright install chromium   # uma vez, para o render das cartas
```

## Wiki

```sh
npm run dev      # http://localhost:4321/combo-duel/
npm run build
```

Páginas em `src/content/docs/` (regras em `regras/`, galerias em `cartas/`). A carta é um único componente (`src/components/Card.astro`), usado pelo wiki e pelo render.

## Dados

- `base/csv/originalCards.csv`: as 78 cartas do Castle Combo (extraídas de [listium](https://listium.com/@Marc/143495/castle-combo-card-list)), em inglês.
- `data/cardList.ts`: cartas do jogo. `original*` guarda o texto original; `name`, `ability` e `score` são da skin.
- Marcações no texto: `**negrito**`, `*(nota)*` e atributos `[FOGO] [TERRA] [ÁGUA] [TREVAS] [VENTO] [LUZ]`, que viram selos coloridos.
- Escudo → atributo em `src/lib/attributes.ts` (vermelho=FOGO, laranja=TERRA, azul=ÁGUA, roxo=TREVAS, verde=VENTO, amarelo=LUZ).

## Imagens

Arte em `assets/art/<slug-do-nome>.png` (ex.: `assets/art/vigia.png`), ou defina `art` na carta para outro nome de arquivo. A arte preenche a moldura (`object-fit: cover`); ajuste fino em `imageEdition`. Carta sem arte mostra placeholder com o caminho esperado.

## Cartas para impressão

```sh
npm run cards                    # build + um PNG por carta em output/cards/
npm run cards -- --id 1,25       # só algumas cartas
npm run cards -- --skip-build    # reaproveita o dist/ atual
npm run cards -- --public        # também copia para public/cards/ (link "PNG" no wiki no próximo build)
```

Tamanho, DPI e sangria ficam em `card.config.ts` (padrão 63×88mm a 300 DPI = 744×1039px). `output/` e `public/cards/` ficam fora do git.

## Deploy

`.github/workflows/deploy.yml` publica em https://thallesgalv.github.io/combo-duel/ a cada push na `main` (gera os PNGs e builda).
