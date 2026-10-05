# Contributing to Col

Thanks for helping make UI libraries easier to discover.

## Before you start

- Search existing [issues](https://github.com/screen-gd/Col/issues) and [pull requests](https://github.com/screen-gd/Col/pulls).
- Use an issue form for a library request, feature request, or bug report.
- Keep each issue and pull request focused on one outcome.
- For a larger product or design change, open an issue before implementation.

## Local setup

```bash
git clone https://github.com/screen-gd/Col.git
cd Col
npm install
npm run dev
```

Run `npm run build` before submitting changes.

## Add a library

Add one object to the `libraries` array in [`data/libraries.ts`](data/libraries.ts).

Checklist:

- Use the official project name and canonical URL.
- Use a unique lowercase kebab-case `slug`.
- Set `addedAt` to the current ISO timestamp, including its timezone. The "new additions" label expires after seven days. Keep this timestamp unchanged when editing an existing library.
- Write a factual one-sentence description.
- Select existing category, stack, and use-case values where possible.
- Add only useful search tags; do not repeat every field.
- Do not add affiliate, tracking, or shortened URLs.
- Confirm the project is publicly accessible and actively useful.
- Add the matching detail page in [`data/library-details/`](data/library-details/index.ts) and register it in that file's `libraryDetails` map, keyed by the same `slug`. The detail tests fail without it.

If a new category or stack is genuinely required, explain why in the pull request.

## Add a component

Components are how someone searches for "a date picker" or "stroke text" instead of browsing 56 libraries. They live in [`data/components.ts`](data/components.ts), keyed by the owning library's `slug`.

- Only add a component you have verified on the library's own documentation site.
- Spell `name` the way the library documents it, and point `url` at that component's page, not the library homepage. It must be on the library's own domain, and must not be a setup, CLI, or marketing page.
- Use `aliases` for terms people genuinely search for, such as `cmdk` or `datepicker`. Do not pad them with synonyms.
- Add a handful you have checked rather than a long list you have not. Col tells users the index is partial, so a short accurate list is better than a long speculative one.

Many libraries publish a machine-readable component list at `/llms.txt`, which is a good starting point, but it also lists setup guides and paid tiers. Check every entry against the site's own navigation before adding it.

Do not add a component to make a library match a search. If a library does not document it, it does not belong in the index.

## Add an MCP server or connector

Integrations live in [`data/integrations.ts`](data/integrations.ts). [CONTEXT.md](CONTEXT.md) defines the terms. The README has an example entry.

- Keep to UI libraries and design tools.
- Add one entry per product. If it can be set up from a config file and from an AI app's directory, give the entry both an `MCP server` path and a `Connector` path.
- Copy the command, URL, and server key from the provider's own setup guide, and link that guide as `url`.
- List only the clients the provider documents. Col generates each client's snippet in [`lib/integration-setup.ts`](lib/integration-setup.ts); adding a new client means adding it there.
- Set `official` only when the provider also makes the product it serves. Anything else is a community integration.
- Never add a token or key, even as an example. Name the environment variable and link to where the user creates it.
- Set `library` to the slug of the Col library it serves, if that library is listed.

## Fix a bug or add a feature

- Follow the existing TypeScript and component patterns.
- Avoid `any` and unrelated refactors.
- Preserve light mode, dark mode, keyboard access, and reduced-motion behavior.
- Keep copy short and specific.
- Update comments and documentation affected by the change.
- Add a focused test when the behavior has a stable test seam.

## Pull requests

Use a descriptive title, such as:

- `Add Ark UI to the directory`
- `Fix stack filter query handling`
- `Add dedicated library detail route`

In the description, explain what changed, why it changed, and how it was verified. Add screenshots for visible interface changes.

Reviewers may request metadata corrections, a smaller scope, accessibility fixes, or links to official sources before merging.
