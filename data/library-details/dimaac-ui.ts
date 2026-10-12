import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://ui.dimaac.com",
  repoUrl: "https://github.com/DimaacUI/DiMaac-UI",
  preview: {
    src: "https://opengraph.githubassets.com/2/DimaacUI/DiMaac-UI",
    alt: "DiMaac UI repository social preview",
  },
  pricing: {
    model: "freemium",
    summary: "The UI components are free; DiMaac Pro templates are a separate paid subscription.",
    source: "https://ui.dimaac.com/templates/pricing",
  },
} satisfies LibraryDetails;
