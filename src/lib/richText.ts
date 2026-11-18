import star from "../../assets/frame/star.png";
import key from "../../assets/icons/key.png";
import rowIcon from "../../assets/icons/row.svg?url";
import columnIcon from "../../assets/icons/column.svg?url";
import castleCard from "../../assets/icons/card-castle.svg?url";
import villageCard from "../../assets/icons/card-village.svg?url";
import { isShield, shieldInfo } from "./monsterTypes";

const icon = (cls: string, src: string, label: string, attrs = "") =>
  `<img class="${cls}" src="${src}" alt="${label}" title="${label}"${attrs}>`;

// Ícone do tipo de um escudo ([red] etc.); undefined se não for escudo ou faltar o arquivo
const typeImg = (shield: string) => {
  if (!isShield(shield)) return undefined;
  const { label, icon: src } = shieldInfo(shield);
  return src ? icon("rt-type", src, label, ` data-shield="${shield}"`) : undefined;
};

// Ícones no lugar das palavras:
//   linha / coluna → setas (◀▶ / ▲▼)       **ouro** → estrela
//   **chave(s)** → olho do milênio  **Castelo** / **Vilarejo** → carta dourada / preta
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
    // Número colado no ícone que vem depois ("1 **ouro**" → 1⭐)
    .replace(/(\d+)\s+(?=\*\*(?:ouro|chaves?)\*\*)/g, "$1")
    .replace(/\*\*ouro\*\*/g, icon("rt-icon", star.src, "ouro"))
    .replace(/\*\*chaves?\*\*/g, icon("rt-icon rt-key", key.src, "chave"))
    .replace(/\*\*Castelo\*\*/g, icon("rt-card", castleCard, "Castelo"))
    .replace(/\*\*Vilarejo\*\*/g, icon("rt-card", villageCard, "Vilarejo"))
    .replace(/\[([a-z]+)\]/g, (match, shield: string) => {
      if (!isShield(shield)) return match;
      const { label, color } = shieldInfo(shield);
      return typeImg(shield) ?? `<span class="attr" style="--attr: ${color}" data-shield="${shield}">${label.toUpperCase()}</span>`;
    })
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>");
