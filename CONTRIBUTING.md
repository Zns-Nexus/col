# Contributing to Col

Thanks for helping make UI libraries easier to discover.

## Before you start

- Col is maintained on [git.cafe](https://git.cafe/screen/col). Open issues and pull requests there; the GitHub repository is only a deploy mirror.
- Search existing [issues](https://git.cafe/screen/col/issues) and [pull requests](https://git.cafe/screen/col/pulls).
- For a library request, feature request, or bug report, include the details the [README](README.md#request-something) lists.
- Keep each issue and pull request focused on one outcome.
- For a major feature, redesign, or new dependency, open an issue and get Screen's agreement before implementation.

## Local setup

```bash
git clone https://git.cafe/screen/col.git Col
cd Col
npm install
npm run dev
```

For code or catalog changes, run `npm run typecheck` and `npm test` before submitting. `npm test` includes the production build. For documentation-only changes, check links and formatting; if the documentation is a site page, also run `npm run build`.

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
- For a bug fix, include reproduction steps, expected behavior, and how to verify the fix.
- Explain why a new dependency is needed and include the matching lockfile change.

## Keep discovery up to date

When adding or changing libraries, components, integrations, public pages, or features that agents can use, update all affected discovery outputs in the same pull request:

- [`app/llms.txt/route.ts`](app/llms.txt/route.ts) generates `/llms.txt`. Library and integration entries come from catalog data automatically. Update the generator when new features, links, or agent instructions need to appear.
- [`app/sitemap.ts`](app/sitemap.ts) generates `/sitemap.xml`. Library and integration pages are included automatically. Add new public pages to `staticRoutes` in [`lib/site.ts`](lib/site.ts).
- [`app/robots.ts`](app/robots.ts) generates `/robots.txt`. Check that crawler rules and the sitemap URL still cover the change. Update them when crawl access changes.
- Update affected page titles, descriptions, canonical URLs, social metadata, and structured data.
- Keep the [agent guide](app/docs/agents/page.tsx), MCP server guides, and MCP server tool descriptions and results consistent with any changes to agent capabilities.

Edit the source data or generators, then verify the generated output. Catalog additions do not require manual copies in each file. Keep [`tests/discovery.test.mjs`](tests/discovery.test.mjs) current when routes or discovery behavior change, and explain any discovery outputs that do not need changes in the PR description.

## Pull requests

Use a descriptive title, such as:

- `Add Ark UI to the directory`
- `Fix stack filter query handling`
- `Add dedicated library detail route`

In the description, explain what changed, why it changed, and how it was verified. Add screenshots for visible interface changes.

- Use a draft pull request while work is incomplete. Mark it ready for review after implementation, documentation, and relevant checks are complete.
- List the verification commands and results. Check mobile layouts for interface changes and include before-and-after screenshots where applicable.
- Review your own diff for accidental files, debug output, secrets, and unrelated formatting changes. You are responsible for all submitted code, including code generated by AI.
- Every new major feature must include user documentation in the same pull request. Explain how to use it and any required setup, and link it from the site's `/docs` page, following the Col MCP guides. Update the README when the feature affects the project overview or setup.
- If the pull request fully resolves an issue, include `Closes #123` in the description. For a partial fix, use `Refs #123` and describe the remaining work. Keep the issue open until merge. Screen confirms completion and closes the issue after merge.
- Respond to review comments with the change you made or your reasoning. Flag substantial changes made after review so Screen can review them again.

Screen is the only person who merges pull requests for now. Contributors submit changes for review and leave merging to Screen.

## Deploys and the GitHub mirror

Vercel deploys from the GitHub mirror (`https://github.com/screen-gd/Col`) until Vercel and Cloudflare can deploy from git.cafe. Maintainers push every branch to both remotes so the two stay identical:

```bash
git remote add github https://github.com/screen-gd/Col
git remote set-url --add --push origin https://git.cafe/screen/col.git
git remote set-url --add --push origin https://github.com/screen-gd/Col
```

After this, `git push origin <branch>` updates git.cafe first, then GitHub. Merge pull requests on git.cafe and push `main` so the mirror deploys.

Reviewers may request metadata corrections, a smaller scope, accessibility fixes, or links to official sources before merging.
