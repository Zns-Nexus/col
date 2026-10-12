import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://ui.shadcn.com/docs",
  repoUrl: "https://github.com/shadcn-ui/ui",
  preview: {
    src: "https://ui.shadcn.com/og?title=The%20Foundation%20for%20your%20Design%20System&description=Composable%2C%20accessible%20components%20with%20thoughtful%20defaults.%20Build%20your%20own%20component%20library%20with%20code%20you%20can%20customize%2C%20extend%2C%20and%20make%20your%20own.",
    alt: "shadcn/ui open code design system announcement image",
  },
  pricing: {
    model: "free",
    summary: "Components and the CLI are free and open source, with no paid tier.",
    license: "MIT",
    source: "https://github.com/shadcn-ui/ui/blob/main/LICENSE.md",
  },
} satisfies LibraryDetails;
