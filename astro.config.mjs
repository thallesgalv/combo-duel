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
      defaultLocale: "root",
      locales: { root: { label: "Português", lang: "pt-BR" } },
      sidebar: [
        { label: "Regras", items: [{ autogenerate: { directory: "regras" } }] },
        { label: "Cartas", items: [{ autogenerate: { directory: "cartas" } }] },
      ],
    }),
  ],
});
