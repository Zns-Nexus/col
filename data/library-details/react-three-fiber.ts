import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://r3f.docs.pmnd.rs",
  repoUrl: "https://github.com/pmndrs/react-three-fiber",
  preview: {
    src: "https://github.com/pmndrs/react-three-fiber/raw/master/docs/logo.jpg",
    alt: "React Three Fiber logo used as the docs site og:image",
  },
  pricing: {
    model: "free",
    summary: "React Three Fiber is free and open source, with no paid tier.",
    license: "MIT",
    source: "https://github.com/pmndrs/react-three-fiber/blob/master/LICENSE",
  },
} satisfies LibraryDetails;
