import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://appllama.io/mcp",
  install: [
    { label: "Agent skills for the Appllama MCP", command: "npx skills add appllama/appllama-skills" },
  ],
  gettingStarted: [
    "Open https://appllama.io to browse the app library, which holds 67,700+ screens from 1,500+ top-grossing iOS apps. Filter by category such as Health & Fitness or Productivity, and sort by recently added, top revenue, most downloaded, recently launched, highest rated, or A to Z.",
    "Open an app to see its screens in journey order, its flows, and its estimated monthly revenue, downloads, and ratings. Use https://appllama.io/screens for every screen tagged by flow, https://appllama.io/flows for onboarding, paywall and other flows side by side, and https://appllama.io/elements for UI elements such as tab bars and primary buttons.",
    "Study one pattern across several apps before copying it, for example how many onboarding steps the winners run and where the paywall lands, then rebuild it with your own components, copy, and brand. The site shows reference screens, not code.",
    "Free browsing opens every app's welcome screen plus the 2 newest apps in full. The pricing page at https://appllama.io/pricing lists what Pro adds: all apps, unlimited screen search, and the MCP.",
    "To research from a coding agent, follow the setup guide at https://appllama.io/mcp. Connect the Appllama MCP server as a custom connector in a client such as Claude, Cursor or Codex, and approve it with your Appllama account (Pro, 1,500 credits a month), then install the open-source skills with `npx skills add appllama/appllama-skills`.",
  ],
  preview: {
    src: "https://appllama.io/og.png",
    alt: "Appllama official preview",
  },
  agentPrompt: `Use Appllama (https://appllama.io), a library of screens and flows from top-grossing iOS apps, as the design reference while I build screens in this repo.

Appllama is a browsable reference, not a code library. It shows real onboarding screens, paywalls, flows, and UI elements, with revenue, download, and rating context for each app. There is no component package to install. Agent access is through an MCP server and two open-source skills.

Prerequisites:
- Appllama MCP access is part of the paid Pro plan (1,500 credits a month, one credit per call). Without Pro, use the website directly: the free tier shows every app's welcome screen and the 2 newest apps in full.
- Ask me which screen or flow I am building and which category it belongs to before researching.

Steps:
1. Read https://appllama.io/mcp for the current setup per client. Add the Appllama MCP server as a custom connector and approve it with my Appllama account, or ask me to do that if you cannot.
2. Install the research and design skills from https://github.com/Appllama/appllama-skills with npx skills add appllama/appllama-skills, or read them in the repository if you cannot run the command.
3. Search for three to five apps in my category with the MCP tools (search_apps, get_app, list_app_screens, search_screens, get_screen, list_flows, list_ui_elements), or browse https://appllama.io/flows and https://appllama.io/screens if you have no MCP access. Prefer apps that match my product's price point, since each result carries revenue and rating data.
4. For each app, walk the relevant flow screen by screen and write down the step count, what each step asks for, the layout and component patterns, and where the paywall sits.
5. Summarize what the winners share and where they differ, then propose a design for my screen and wait for my approval before writing code.
6. Build it with this project's own components, tokens, and copy, then run the project's typecheck and build.

Notes:
- Screens and videos carry a small Appllama watermark in the top-left corner. It marks provenance, so ignore it and never reproduce it.
- Media URLs from the MCP expire after about an hour, so do not store them in the repo.
- Go deep on the few apps that matter, because bulk-harvesting the catalog is against the terms of service at https://appllama.io/terms.
- Every screen belongs to another company. Take patterns and structure from it, and never copy their branding, illustrations, or text.`,
  pricing: {
    model: "freemium",
    summary: "Browsing is free for every app's welcome screen plus the 2 newest apps in full; Pro and Team are paid subscriptions that add every app, unlimited screen search, and the MCP with 1,500 credits a month.",
    source: "https://appllama.io/pricing",
  },
  collection: "It catalogs screens from other companies' iOS apps, so the designs belong to those apps and serve as reference, not reusable assets.",
} satisfies LibraryDetails;
