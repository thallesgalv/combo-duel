import type { Location, Shield } from "../../types/cardType";

// Escudos do Castle Combo viram os 6 atributos de Yu-Gi-Oh
export const attributes: Record<Shield, { label: string; color: string; text: string }> = {
  red: { label: "FOGO", color: "#d23b2a", text: "#fff" },
  orange: { label: "TERRA", color: "#b8692a", text: "#fff" },
  blue: { label: "ÁGUA", color: "#2f6fd6", text: "#fff" },
  purple: { label: "TREVAS", color: "#5e3596", text: "#fff" },
  green: { label: "VENTO", color: "#2f8f45", text: "#fff" },
  yellow: { label: "LUZ", color: "#e6b81e", text: "#2a1d00" },
};

export const shieldByLabel = Object.fromEntries(
  Object.entries(attributes).map(([shield, { label }]) => [label, shield as Shield]),
) as Record<string, Shield>;

export const locations: Record<Location, { label: string; slug: string }> = {
  castle: { label: "Castelo", slug: "castelo" },
  village: { label: "Vilarejo", slug: "vilarejo" },
};
