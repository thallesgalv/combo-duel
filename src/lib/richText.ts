import { attributes, shieldByLabel } from "./attributes";

// **termo** vira negrito, *(...)* vira nota em itálico e [ATRIBUTO] vira um selo colorido
export const richText = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\[([A-ZÁ]+)\]/g, (match, label: string) => {
      const shield = shieldByLabel[label];
      if (!shield) return match;
      const { color, text } = attributes[shield];
      return `<span class="attr" style="--attr: ${color}; --attr-text: ${text}">${label}</span>`;
    })
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>");
