import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// Publicado em https://thallesgalv.github.io/combo-duel/ — por isso os links no markdown
// são relativos (links absolutos não recebem o `base`).
export default defineConfig({
  site: "https://thallesgalv.github.io",
  base: "/combo-duel",
  integrations: [
    starlight({
      title: "Combo Duel",
      // Logo no lugar do título (assets/icons/logo.png: logo-combo-duel.png sem o fundo branco, recortado)
      logo: { src: "./assets/icons/logo.png", replacesTitle: true },
      defaultLocale: "root",
      locales: { root: { label: "Português", lang: "pt-BR" } },
      sidebar: [
        { label: "Regras", items: [{ autogenerate: { directory: "regras" } }] },
        { label: "Cartas", link: "/" },
        { label: "Contagem de pontos", link: "/pontuacao/" },
      ],
    }),
  ],
});
