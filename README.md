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
- `base/csv/vigentTypeColorShieldMapping.csv`: qual escudo vira qual tipo (Mago, Dragão, Guerreiro, Besta, Demônio, Máquina).
- `base/csv/cardsPerType.csv`: 18 cartas de Yu-Gi-Oh por tipo. `crossoverCardsPerType.csv`: uma carta por par de tipos (já incluída nos dois tipos). `lessWantedCardsPerType.csv`: as 5 menos queridas de cada tipo.
- `data/cardTexts.ts`: textos da skin (`ability`, `score`) e `purse` por id. **Editado à mão.**
- `data/cardList.ts`: **gerado** por `npm run cardlist` a partir dos CSVs e do `cardTexts.ts`; não editar.
- Marcações no texto: `**negrito**`, `*(nota)*` e escudos `[red] [orange] [blue] [purple] [green] [yellow]`, que viram o selo do tipo de monstro.

### Gerar o cardList

```sh
npm run cardlist
```

Cada carta vira uma carta de Yu-Gi-Oh (`name` + `art`), conforme o tipo dos escudos (`src/lib/artAssignment.ts`):

1. Carta com 2 tipos diferentes → o crossover do par (ex.: Mago + Dragão = Lord of D.).
2. Carta de 1 tipo (ou 2 escudos iguais) → as cartas "puras" do tipo (as 18 menos os 5 crossovers = 13), na ordem de `cardsPerType.csv` e por id.
3. Se o tipo precisa de menos de 13, saem primeiro as de `lessWantedCardsPerType.csv`; se ainda sobrar, as últimas da lista.

O comando mostra quantas artes cada tipo usa e avisa quando foi preciso cortar carta fora do lessWanted ou quando falta arte. Para testar outro mapeamento sem gerar nada, use o painel da página inicial do wiki.

## Imagens

- `assets/artworks/`: arte das cartas de Yu-Gi-Oh. O arquivo é achado pelo nome da carta, tolerando sufixos como `__artwork__by_...` e prefixo `TEMP-` (ex.: `dark_magician__artwork__by_x.png`). Preenche a janela da arte (`object-fit: cover`, ~703×572px). Carta sem arte mostra placeholder com o caminho esperado.
- `assets/types/<tipo>.png` (`spellcaster`, `dragon`, `warrior`, `beast`, `fiend`, `machine`): ícones dos tipos, coluna DG de https://yugioh.fandom.com/wiki/Type. Sem o arquivo, o círculo mostra o nome do tipo.
- `assets/frame/`: texturas recortadas do template do [AYGOCM](https://github.com/legovader09/AYGOCM-Web) (moldura cinza, painel amarelo do monstro normal, painel laranja = o amarelo retingido, caixa de ATK/DEF e estrela de nível).

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
