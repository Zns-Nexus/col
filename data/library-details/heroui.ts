import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://www.heroui.com/en/docs/react/getting-started/quick-start",
  repoUrl: "https://github.com/heroui-inc/heroui",
  preview: {
    src: "https://heroui.com/images/twitter-card.jpg",
    alt: "HeroUI website preview image",
  },
  pricing: {
    model: "freemium",
    summary: "The open-source components are free; HeroUI Pro adds paid components, templates and AI tools as a one-time purchase.",
    license: "MIT",
    source: "https://heroui.pro/pricing",
  },
} satisfies LibraryDetails;
