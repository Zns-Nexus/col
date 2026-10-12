import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://mantine.dev",
  repoUrl: "https://github.com/mantinedev/mantine",
  preview: {
    src: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/social-preview.png",
    alt: "Mantine React components library social preview image",
  },
  pricing: {
    model: "free",
    summary: "Mantine core, hooks and the Mantine UI premade components are free forever, funded by sponsors.",
    license: "MIT",
    source: "https://github.com/mantinedev/mantine",
  },
} satisfies LibraryDetails;
