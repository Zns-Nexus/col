import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://reactbits.dev",
  repoUrl: "https://github.com/davidhdev/react-bits",
  preview: {
    src: "https://reactbits.dev/og.png",
    alt: "The React Bits landing page design, showcasing the logo and a subtitle!",
  },
  pricing: {
    model: "freemium",
    summary: "The components are free to use; React Bits Pro blocks and templates are a paid one-time purchase from the same author.",
    license: "MIT + Commons Clause",
    source: "https://pro.reactbits.dev/compare/react-bits-pro-vs-free-react-bits",
  },
} satisfies LibraryDetails;
