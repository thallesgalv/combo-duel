import star from "../../assets/frame/star.png";
import key from "../../assets/icons/key.png";
import rowIcon from "../../assets/icons/row.svg?url";
import columnIcon from "../../assets/icons/column.svg?url";
import castleCard from "../../assets/icons/card-castle.svg?url";
import villageCard from "../../assets/icons/card-village.svg?url";
import purse from "../../assets/icons/purse.svg?url";
import { isShield, shieldInfo } from "./monsterTypes";

const icon = (cls: string, src: string, label: string) =>
  `<img class="${cls}" src="${src}" alt="${label}" title="${label}">`;

// Ícone do tipo de um escudo ([red] etc.); undefined se não for escudo ou faltar o arquivo
const typeImg = (shield: string) => {
  if (!isShield(shield)) return undefined;
  const { label, icon: src } = shieldInfo(shield);
  return src ? icon("rt-type", src, label) : undefined;
};

const goldIcon = icon("rt-icon", star.src, "ouro");
const keyIcon = icon("rt-icon rt-key", key.src, "chave");
// Ícone repetido n vezes, junto na mesma linha
const repeat = (img: string, n: string) => `<span class="rt-repeat">${img.repeat(Number(n))}</span>`;

// Ícones no lugar das palavras:
//   N **ouro** / N **chaves** / **Desconto** de N → o ícone repetido N vezes, sem numeral
//   linha / coluna → setas (◀▶ / ▲▼)       **ouro** → estrela
//   **chave(s)** → olho do milênio  **bolsa(s)** → sacola  **Castelo** / **Vilarejo** (marcação) → carta do Baralho Dourado / Preto
//   [red] (cor do escudo) → ícone do tipo
// (Na carta, **OU** divide a caixa em duas: ver Card.astro)
// Depois: **termo** vira negrito e *(...)* vira nota em itálico
export const richText = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    // "[blue] na mesma linha/coluna" → setas ao redor do ícone do tipo
    .replace(/\[([a-z]+)\] na mesma (linha ou coluna|linha|coluna)\b/g, (match, shield: string, where: string) => {
      const img = typeImg(shield);
      if (!img) return match;
      const row = where.includes("linha");
      const col = where.includes("coluna");
      const arrows = [row && "l", row && "r", col && "u", col && "d"]
        .filter(Boolean)
        .map((dir) => `<i class="rt-arrow rt-arrow-${dir}"></i>`)
        .join("");
      return `<span class="rt-around${row ? " rt-row" : ""}">${img}${arrows}</span>`;
    })
    .replace(/\blinha\b/g, icon("rt-icon", rowIcon, "linha"))
    .replace(/\bcoluna\b/g, icon("rt-icon", columnIcon, "coluna"))
    // Quantidades viram o ícone repetido, sem numeral:
    //   "Ganhe 3 **chaves**" → 🔑🔑🔑 (sem o "Ganhe")
    //   "2 **ouro** por [blue]" → ⭐⭐ por …   "os oponentes ganham 1 **chave**" → … 🔑
    //   "**Desconto** de 1" → **Desconto** de ⭐ (é ouro a menos)
    .replace(/\b[Gg]anhe (\d+) \*\*chaves?\*\*/g, (_, n: string) => repeat(keyIcon, n))
    .replace(/\b(\d+) \*\*ouro\*\*/g, (_, n: string) => repeat(goldIcon, n))
    .replace(/\b(\d+) \*\*chaves?\*\*/g, (_, n: string) => repeat(keyIcon, n))
    .replace(/(\*\*Desconto\*\* de )(\d+)/g, (_, prefix: string, n: string) => prefix + repeat(goldIcon, n))
    .replace(/\*\*ouro\*\*/g, goldIcon)
    .replace(/\*\*chaves?\*\*/g, keyIcon)
    .replace(/\*\*bolsas?\*\*/g, icon("rt-icon", purse, "bolsa"))
    // "ícone **Castelo**" não quebra entre a palavra e o ícone
    .replace(/(ícones?) (\*\*(?:Castelo|Vilarejo)\*\*)/g, '<span class="rt-repeat">$1 $2</span>')
    .replace(/\*\*Castelo\*\*/g, icon("rt-card", castleCard, "Baralho Dourado"))
    .replace(/\*\*Vilarejo\*\*/g, icon("rt-card", villageCard, "Baralho Preto"))
    .replace(/\[([a-z]+)\]/g, (match, shield: string) => {
      if (!isShield(shield)) return match;
      const { label, color } = shieldInfo(shield);
      return typeImg(shield) ?? `<span class="attr" style="--attr: ${color}">${label.toUpperCase()}</span>`;
    })
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>");
