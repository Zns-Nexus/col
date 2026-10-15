import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://www.runeicons.com/packages",
  repoUrl: "https://github.com/Runeicons/runeicons",
  preview: {
    src: "https://www.runeicons.com/og-image.png",
    alt: "Rune Icons icon library official preview",
  },
  pricing: {
    model: "free",
    summary:
      "Every icon and npm package is free for personal and commercial use under Apache 2.0 with no paid tier; the brand logos are trademarks of their owners and are not covered by that license.",
    license: "Apache 2.0",
    source: "https://github.com/Runeicons/runeicons/blob/main/LICENSE",
  },
} satisfies LibraryDetails;
