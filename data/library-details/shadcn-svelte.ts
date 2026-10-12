import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://www.shadcn-svelte.com/docs",
  repoUrl: "https://github.com/huntabyte/shadcn-svelte",
  preview: {
    src: "https://shadcn-svelte.com/opengraph-image.png",
    alt: "shadcn-svelte open code design system announcement image",
  },
  pricing: {
    model: "free",
    summary: "Components and the CLI are free and open source, with no paid tier.",
    license: "MIT",
    source: "https://github.com/huntabyte/shadcn-svelte/blob/main/LICENSE.md",
  },
} satisfies LibraryDetails;
