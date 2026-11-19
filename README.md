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

Páginas em `src/content/docs/` (regras em `regras/`; todas as cartas na página inicial). A carta é um único componente (`src/components/Card.astro`), usado pelo wiki e pelo render.

## Dados

- `base/csv/originalCards.csv`: as 78 cartas do Castle Combo (extraídas de [listium](https://listium.com/@Marc/143495/castle-combo-card-list)), em inglês. Correções em relação ao listium: **Monk** (id 49) pontua "in the same row or column" (o listium diz só "row"; a imagem da carta mostra as 4 setas), **Patron** (id 59) pontua "per card with a cost of 5 or more" (o listium diz "per purse"), **Guildmaster** (id 14) dá "1 key per gold in its cost" (o listium diz "its cost in gold") **Carpenter** (id 19) dá "1 key per missing shield type" (o listium diz "1 gold") e **His Holiness** (id 41), **Templar** (id 43) e **Witch** (id 71) dão os dois efeitos ("and"/"AND"; o listium diz "or"/"OR"). A coluna `moveMessenger` do listium vinha invertida nas 78 cartas; foi corrigida pelas imagens (move o mensageiro = tem o triângulo abaixo do custo).
- `base/csv/vigentTypeColorShieldMapping.csv`: qual escudo vira qual tipo (Mago, Dragão, Guerreiro, Besta, Demônio, Máquina).
- `base/csv/cardsPerType.csv`, `crossoverCardsPerType.csv`, `lessWantedCardsPerType.csv`: listas de referência usadas para escolher qual carta de Yu-Gi-Oh cada carta virou (crossover = carta com 2 tipos; lessWanted = menos queridas). Não são lidas pelo build. `cardsPerType.csv` também tem o `boxColor` de cada carta.
- `data/cardList.ts`: cartas do jogo, **editado à mão**. `name` e `art` = carta de Yu-Gi-Oh; `boxColor` (`normal` | `effect` | `fusion` | `ritual` | `slifer` | `obelisk` | `ra`) = moldura do painel e das caixas, como a carta real (coluna `boxColor` de `cardsPerType.csv`); `original*` guarda o texto original; `ability` e `score` são da skin.
- Marcações no texto: `**negrito**`, `*(nota)*` e escudos `[red] [orange] [blue] [purple] [green] [yellow]`, que viram o selo do tipo de monstro.

## Imagens

- `assets/artworks/`: arte das cartas de Yu-Gi-Oh. Cada carta aponta para o arquivo pelo campo `art` (nome sem extensão). Preenche a janela da arte (`object-fit: cover`, ~703×572px). Carta sem arte mostra placeholder com o caminho esperado.
- `assets/types/<tipo>.png` (`spellcaster`, `dragon`, `warrior`, `beast`, `fiend`, `machine`): ícones dos tipos, coluna DG de https://yugioh.fandom.com/wiki/Type. Sem o arquivo, o círculo mostra o nome do tipo.
- `assets/originals/<id>-<nome>.webp`: imagem de cada carta do Castle Combo (baixada do mesmo [listium](https://listium.com/@Marc/143495/castle-combo-card-list), convertida para WebP), mostrada no modal da carta em "Carta original". `id` = linha do `originalCards.csv`.
- `assets/frame/`: texturas dos templates do [AYGOCM](https://github.com/legovader09/AYGOCM-Web) (400×583, em `Files/` dentro de `AYGOCM-Web/JAR/AnimeYuGiOhCardMaker.jar`): moldura cinza, estrela de nível e, por tipo de carta (normal = amarelo, efeito = laranja, fusão = roxo, ritual = azul; deuses: Slifer = vermelho, Obelisk = azul, Ra = amarelo):
  - `panel-village.png` (normal), `panel-effect.png`, `panel-fusion.png`, `panel-ritual.png`, `panel-slifer.png`, `panel-obelisk.png`, `panel-ra.png`: painel de baixo sem as caixas e o círculo. O normal foi limpo à mão; os outros são o normal recolorido com as cores do template correspondente (`effect.png`, `fusion.png`, `ritual.png`, `slifer.png`, `obelisk.png`, `ra.png`).
  - `box-normal.png`, `box.png` (efeito), `box-fusion.png`, `box-ritual.png`, `box-slifer.png`, `box-obelisk.png`, `box-ra.png`: caixa de ATK/DEF, recortada em (30, 497) 157×66 de cada template.

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
