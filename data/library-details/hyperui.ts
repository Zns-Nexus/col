import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://www.hyperui.dev",
  repoUrl: "https://github.com/markmead/hyperui",
  install: [
    {
      label: "Optional Tailwind plugins some components rely on",
      command: "npm install -D @tailwindcss/forms @tailwindcss/typography",
    },
  ],
  gettingStarted: [
    "Confirm the project runs Tailwind CSS v4.2. HyperUI does not work with Tailwind v3.",
    "Open hyperui.dev and pick a category: Application, Marketing, Neobrutalism or Templates.",
    "Preview a component with the viewport toggles (Mobile, SM, MD, LG), then click Copy to grab its HTML.",
    "Paste the markup where you need it and replace the placeholder links, text and images with your own content.",
    "If the component styles forms or prose, add @plugin \"@tailwindcss/forms\"; or @plugin \"@tailwindcss/typography\"; to your main CSS file.",
  ],
  preview: {
    src: "https://hyperui.dev/_astro/og.BbsA6RH6.jpg",
    alt: "HyperUI open graph preview image",
  },
  agentPrompt: `Add HyperUI components to this existing project.

What HyperUI is: a free, open-source collection of copy and paste HTML snippets styled with Tailwind CSS. There is no npm package to install, so do not add anything to package.json for HyperUI itself. Official docs: https://www.hyperui.dev (FAQ: https://www.hyperui.dev/blog/faqs/). Source: https://github.com/markmead/hyperui

Prerequisites:
- The project must already use Tailwind CSS v4.2. HyperUI components are not compatible with Tailwind v3.
- Components are plain HTML, so they work with any framework or with plain HTML.

Steps:
1. Read the official docs at https://www.hyperui.dev and pick a component from the category that matches my request: Application, Marketing, Neobrutalism or Templates.
2. Copy the component HTML and paste it into the right place in my project, converting it to my framework's syntax if needed (for example class becomes className in JSX).
3. Replace placeholder hrefs, text and images with my content, keeping the Tailwind utility classes.
4. If the component styles form controls or long form prose, run npm install -D @tailwindcss/forms @tailwindcss/typography and add @plugin "@tailwindcss/forms"; and/or @plugin "@tailwindcss/typography"; to my main CSS file. Only add the ones the component needs.
5. Some interactive components ship small vanilla JavaScript. Wire that behavior into my framework's approach, or keep the script as is if the project has no framework.
6. Check the component renders correctly at each breakpoint, and verify dark mode variants if the project uses dark mode.

Consult https://www.hyperui.dev for the exact current markup of each component before writing it out.`,
  pricing: {
    model: "free",
    summary: "Every component is free and open source, with no paid tier.",
    license: "MIT",
    source: "https://www.hyperui.dev",
  },
} satisfies LibraryDetails;
