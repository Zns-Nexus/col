import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://mui.com/material-ui/getting-started/",
  repoUrl: "https://github.com/mui/material-ui",
  install: [
    { label: "Install Material UI with Emotion", command: "npm install @mui/material @emotion/react @emotion/styled" },
    { label: "Install prebuilt icons (optional)", command: "npm install @mui/icons-material" },
    { label: "Install the Roboto font (optional)", command: "npm install @fontsource/roboto" },
  ],
  gettingStarted: [
    "Confirm the app runs React 17, 18 or 19 with react-dom installed; both are peer dependencies of @mui/material. On React 18 or below you must also pin react-is to your React version via overrides or resolutions.",
    "Run `npm install @mui/material @emotion/react @emotion/styled`, since Emotion is the default styling engine for Material UI.",
    "Add `<meta name=\"viewport\" content=\"initial-scale=1, width=device-width\" />` to the document head, and load Roboto with `npm install @fontsource/roboto` plus imports of the 300, 400, 500 and 700 CSS files, for the default typography.",
    "Render a first component to verify the setup: `import Button from '@mui/material/Button'` and `<Button variant=\"contained\">Hello world</Button>`.",
    "Add `npm install @mui/icons-material` for prebuilt icons, and wrap the app in `ThemeProvider` with `createTheme` from `@mui/material/styles` once you need custom colors, spacing or typography.",
  ],
  preview: {
    src: "https://mui.com/static/social-previews/home-preview.jpg",
    alt: "Material UI home page social preview image",
  },
  agentPrompt: `Add Material UI to this existing React project.

Prerequisites: a React app on React 17, 18 or 19 (react and react-dom are peer dependencies) built with a normal npm bundler such as Vite, Next.js or React Router. Styling is handled by Emotion, which is installed together with the library. Framework specific notes may apply, so check the docs link at the end.

Steps:
1. Install the runtime packages: "npm install @mui/material @emotion/react @emotion/styled".
2. If the app is on React 18 or below, additionally install "react-is" at the exact same version as your React and pin it through "overrides" (npm) or "resolutions" (yarn), because Material UI ships react-is@19 and a mismatch breaks prop type checks.
3. Add the tag <meta name="viewport" content="initial-scale=1, width=device-width" /> to the document head, and install the default font with "npm install @fontsource/roboto" plus imports of its 300, 400, 500 and 700 CSS files at the app entry point.
4. Render one component to confirm the setup: import Button from "@mui/material/Button" and place <Button variant="contained">Hello world</Button> inside an existing page.
5. Install "npm install @mui/icons-material" when you need prebuilt Material icons. When the app needs custom colors, spacing or typography, build a theme with createTheme and wrap the tree in ThemeProvider, both imported from "@mui/material/styles". If the project also uses Tailwind CSS, follow the official Tailwind integration guide rather than mixing the two styling approaches freely.

Consult the official docs before deviating from these steps: installation at https://mui.com/material-ui/getting-started/installation/ and theming at https://mui.com/material-ui/customization/theming/, since setup details change between major versions. The current stable release is Material UI v9.`,
  pricing: {
    model: "freemium",
    summary: "Material UI is free; MUI X Pro and Premium components and support are paid yearly per-developer licenses.",
    license: "MIT",
    source: "https://mui.com/pricing/",
  },
} satisfies LibraryDetails;
