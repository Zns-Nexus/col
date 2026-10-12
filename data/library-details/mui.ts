import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://mui.com/material-ui/getting-started/",
  repoUrl: "https://github.com/mui/material-ui",
  preview: {
    src: "https://mui.com/static/social-previews/home-preview.jpg",
    alt: "Material UI home page social preview image",
  },
  pricing: {
    model: "freemium",
    summary: "Material UI is free; MUI X Pro and Premium components and support are paid yearly per-developer licenses.",
    license: "MIT",
    source: "https://mui.com/pricing/",
  },
} satisfies LibraryDetails;
