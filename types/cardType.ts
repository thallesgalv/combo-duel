// Cor do escudo no Castle Combo; na skin cada cor é um atributo de Yu-Gi-Oh (ver src/lib/attributes.ts)
export type Shield = "red" | "orange" | "blue" | "purple" | "green" | "yellow";

export type Location = "castle" | "village";

// Ajuste manual da arte: size é multiplicador (1 = preenche a moldura);
// left/right/top/bottom em px, como no CSS (left: 20 empurra a imagem 20px para a direita)
export type ImageEdition = {
  size: number;
  left: number;
  right: number;
  top: number;
  bottom: number;
};

export type Card = {
  id: number;
  // Nome exibido na carta (skin)
  name: string;
  // Nome no Castle Combo
  originalName: string;
  location: Location;
  cost: number;
  shields: [Shield] | [Shield, Shield];
  // Ícone de mover o mensageiro
  moveMessenger: boolean;
  // Carta com bolsa (guarda ouro)
  purse: boolean;
  // Textos originais em inglês — não editar
  originalAbility: string;
  originalScore: string;
  // Textos da skin; **negrito**, *(nota)* e [ATRIBUTO]
  ability: string;
  score: string;
  // Nome do arquivo em assets/art/ sem extensão; padrão: slug do name
  art?: string;
  imageEdition: ImageEdition;
};
