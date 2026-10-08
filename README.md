<div align="center">
  <img src="public/brand/col-mark.png#gh-dark-mode-only" width="92" alt="Col logo" />

  # Col

  **Sol could not do it himself, so we made Col.**

  A community-maintained directory for finding the right UI library without losing an afternoon to open tabs.

  [![git.cafe stars](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fgit.cafe%2Fapi%2Frepos%2Fscreen%2Fcol%2Fstar&query=%24.count&label=stars&style=flat&color=ff6257)](https://git.cafe/screen/col/stargazers)
  [![Open issues](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fgit.cafe%2Fapi%2Frepos%2Fscreen%2Fcol%2Fissues%3Fstatuses%3Dopen%26limit%3D1&query=%24.total&label=open%20issues&style=flat&color=69a9ff)](https://git.cafe/screen/col/issues)
  [![Pull requests](https://img.shields.io/badge/pull%20requests-git.cafe-3ddc97?style=flat)](https://git.cafe/screen/col/pulls)
  [![CodeRabbit Pull Request Reviews](https://img.shields.io/coderabbit/prs/github/screen-gd/Col?utm_source=oss&utm_medium=github&utm_campaign=screen-gd%2FCol&labelColor=171717&color=FF570A&link=https%3A%2F%2Fcoderabbit.ai&label=CodeRabbit+Reviews)](https://coderabbit.ai)
  [![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat&logo=nextdotjs)](https://nextjs.org)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org)

  [Request a library](#request-a-library) ·
  [Request a feature](#request-a-feature) ·
  [Report a bug](#report-a-bug) ·
  [Contribute](CONTRIBUTING.md)
</div>

<br />

<div align="center">
  <img src="public/hero-logos/21st-dev-glow.png" width="104" alt="21st.dev" />
  <img src="public/hero-logos/react-bits-glow.png" width="104" alt="React Bits" />
  <img src="public/hero-logos/shadcn-glow.png" width="104" alt="shadcn/ui" />
  <img src="public/hero-logos/aceternity-glow.png" width="104" alt="Aceternity UI" />
  <img src="public/hero-logos/mobbin-glow.png" width="104" alt="Mobbin" />
</div>

## What Col does

Col organizes UI libraries by category, stack, and use case. Search from the homepage, then compare matching libraries in the directory.

- Search by name, keyword, category, stack, or use case.
- Search by component name, and jump straight to that component's official docs.
- Filter libraries without leaving the directory.
- Save useful libraries locally.
- Open the official website or documentation from each listing.
- Find MCP servers and connectors for UI libraries and design tools, and copy setup for your AI client.
- Contribute missing libraries through a focused pull request.

Col catalogs **libraries**. Libraries can also list the components they document, so you can search by component name — but that list is partial and grows by contribution, so a component missing from Col is not necessarily missing from the library. Col never infers a component from a library's generic tags.

Col also lists **integrations** in a separate directory at `/integrations`. An integration is an MCP server, a connector, or both: "MCP server" means you add it to your client's config, and "connector" means you enable it from an AI app's own directory. [CONTEXT.md](CONTEXT.md) defines these terms, and [docs/adr/0001](docs/adr/0001-integrations-and-connectors.md) explains the model.

## Connect Col MCP

Col’s read-only MCP server lets coding agents search libraries and verified
components at `https://collection-of-libs.vercel.app/api/mcp`, with no Col
account or API key. See the [client setup guide](https://collection-of-libs.vercel.app/mcp)
for Claude Code, Codex, Cursor, and VS Code, and the
[agent guide](https://collection-of-libs.vercel.app/mcp/agents) for setup and tool use.

## Where Col lives

Col's code, stars, issues, roadmap, and pull requests live on [git.cafe](https://git.cafe/screen/col). GitHub is a mirror that Vercel deploys from until Vercel and Cloudflare can deploy from git.cafe directly, so open issues and pull requests on git.cafe, not GitHub.

## Run it locally

Requirements: [Node.js 20.9+](https://nodejs.org) and npm.

```bash
git clone https://git.cafe/screen/col.git Col
cd Col
npm install
npm run dev
```

Open the local URL printed in the terminal (usually [http://localhost:3000](http://localhost:3000)).

Before opening a pull request:

```bash
npm run typecheck
npm test
npm run build
```

## Request something

Open an issue on [git.cafe](https://git.cafe/screen/col/issues/new) and include the details listed below. One focused request per issue makes discussion and review easier.

### Request a library

[Open a library request](https://git.cafe/screen/col/issues/new) when a useful UI library is missing.

Include:

- the library name and official URL;
- what it provides and who it helps;
- its supported stacks;
- the closest Col category and use cases;
- confirmation that it is maintained and publicly accessible.

Search [existing libraries](data/libraries.ts), [issues](https://git.cafe/screen/col/issues), and [pull requests](https://git.cafe/screen/col/pulls) first.

### Request a feature

[Open a feature request](https://git.cafe/screen/col/issues/new) for improvements to discovery, comparison, contribution, accessibility, or the library detail experience.

Explain the problem before proposing the interface. Include the expected outcome and any useful references.

### Report a bug

[Open a bug report](https://git.cafe/screen/col/issues/new) with:

- the page or action that failed;
- exact reproduction steps;
- expected and actual behavior;
- browser, operating system, and viewport;
- screenshots, recordings, or console errors when relevant.

Do not include secrets, tokens, private URLs, or personal information.

## Add a library with a pull request

Library-only pull requests should be small and should not redesign unrelated parts of the site.

1. Fork the repository on git.cafe and create a focused branch.
2. Add one entry to [`data/libraries.ts`](data/libraries.ts).
3. Reuse the existing category, stack, and use-case values when possible.
4. Keep the description factual and short.
5. Confirm the URL points to the official project.
6. If you add components, verify each one against the library's own docs in [`data/components.ts`](data/components.ts).
7. Run `npm run build`.
8. Open a pull request on git.cafe that follows the checklist in [`.github/PULL_REQUEST_TEMPLATE.md`](.github/PULL_REQUEST_TEMPLATE.md).

```ts
{
  name: "Library name",
  slug: "library-name",
  addedAt: "2026-10-03T12:00:00Z", // Replace with the current ISO timestamp.
  description: "A factual one-sentence description of what the library provides.",
  url: "https://library.example",
  category: "Component Library",
  stacks: ["React", "TypeScript"],
  useCases: ["Rapid Prototyping"],
  tags: ["accessible", "copy paste"],
}
```

The `slug` must be unique, lowercase, and kebab-case. See [CONTRIBUTING.md](CONTRIBUTING.md) for the full checklist.

Set `addedAt` when the library joins the catalog. It shows the "new additions" label for seven days; editing an existing entry should keep its original timestamp.

### Adding components

Components live in [`data/components.ts`](data/components.ts), keyed by the owning library's `slug`, so searching "date picker" or "stroke text" finds the libraries that document it and links straight to that component's page.

```ts
"library-slug": [
  { name: "Date Picker", aliases: ["datepicker"], url: "https://library.example/docs/components/date-picker" },
],
```

- `name` should be spelled the way the library documents it, for example `Date Picker`.
- `aliases` are optional extra search terms for what people actually type, such as `cmdk` for a command palette. Keep them to real search terms, not synonyms for the rest of the index.
- `url` must be the canonical documentation page for that exact component, on the same domain as the library, and must not be a setup or marketing page.

Coverage is partial and grows by contribution, so add a handful you have checked rather than a long unverified list. Col states this plainly in the UI, so a short accurate list beats a long speculative one.

### Adding an MCP server or connector

Integrations live in [`data/integrations.ts`](data/integrations.ts). An entry describes the server once; Col generates the config snippet for each client and the agent prompt.

```ts
{
  name: "Example MCP server",
  slug: "example-mcp",
  description: "A factual one-sentence description of what it lets an agent do.",
  url: "https://example.dev/docs/mcp", // The provider's setup guide.
  provider: { name: "Example", url: "https://example.dev" },
  official: true, // Only when the provider also makes the product it serves.
  library: "example-ui", // Optional: the Col library it serves.
  setup: [
    {
      type: "MCP server",
      key: "example",
      server: { transport: "stdio", command: "npx", args: ["-y", "@example/mcp"] },
      clients: ["Claude Code", "Cursor"], // Only clients the provider documents.
    },
    { type: "Connector", client: "Claude", url: "https://claude.com/connectors/example" },
  ],
}
```

- A product offered both ways is one entry with both kinds of setup path.
- Never add a credential. For an API key, name the environment variable and link to where the user creates it. Col renders a placeholder in each client's own syntax.

## Dedicated library pages

Each library will have a dedicated Col page with:

- a clear overview and best-fit use cases;
- supported stacks and key capabilities;
- official documentation, repository, and installation links;
- useful comparisons and alternatives;
- a copyable setup prompt for coding agents.

### Agent setup prompt

Library pages will provide a prompt based on this structure:

```text
Help me add [LIBRARY] to my project.

Project context:
- Framework: [FRAMEWORK]
- Language: [LANGUAGE]
- Styling: [STYLING SYSTEM]
- Package manager: [PACKAGE MANAGER]

Use the current official [LIBRARY] documentation. Inspect the existing project before changing files. Install only the required packages, follow the project's established patterns, preserve accessibility, and avoid replacing unrelated code.

After implementation:
1. Summarize the files changed.
2. Explain any configuration added.
3. Run the project's type-check and build commands.
4. Call out any manual setup still required.
```

When contributing a future detail page, keep the prompt specific to that library and link every installation claim to official documentation.

## Project structure

```text
app/                  Routes, layout, and global styles
components/           Search, filters, cards, header, and shared UI
data/libraries.ts     The curated library registry
data/components.ts    Verified components, keyed by library slug
data/library-details/ Per-library detail pages and metadata
data/integrations.ts  MCP servers and connectors
lib/                  Search, client setup rendering, and site helpers
CONTEXT.md            Glossary of catalog terms
docs/adr/             Architecture decision records
public/brand/         Col brand assets
public/hero-logos/    Library artwork used by the homepage
.github/              Pull request checklist and GitHub mirror settings
```

## UI components

Application controls use the components in [`components/ui`](components/ui). Use the existing `Button`, `Input`, `Tabs`, and `DropdownMenu` before adding another control. Keep product-specific layout and behavior in `components/`, and keep visual variants in `components/ui/` when the standard component does not cover them.

`components.json` configures shadcn/ui. The components are owned by this repository and may use Radix primitives internally for keyboard and accessibility behavior. Theme colors for those components live in `app/globals.css`.

## Built with

[Next.js](https://nextjs.org) · [React](https://react.dev) · [TypeScript](https://www.typescriptlang.org) · [Tailwind CSS](https://tailwindcss.com) · [shadcn/ui](https://ui.shadcn.com) · [Radix UI](https://www.radix-ui.com) · [Lucide](https://lucide.dev)

## Community

Be clear, constructive, and respectful. Contributions are welcome whether you are adding a library, improving metadata, fixing a bug, or making discovery easier.

Col is licensed under the [MIT License](LICENSE).

<div align="center">
  <strong>Find better tools. Build better interfaces.</strong>
</div>
