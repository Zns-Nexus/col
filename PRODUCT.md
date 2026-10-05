# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Frontend developers and product designers comparing UI libraries for an active project, plus contributors maintaining the directory.

## Product Purpose

Col is a community-maintained directory for finding, filtering, and comparing UI libraries without opening many disconnected sources.

## Positioning

Col combines a curated library registry with practical stack and use-case filters, then sends users to the official source for each library.

## Operating Context

Visitors search from the homepage, refine results in the library directory, save useful entries locally, and use GitHub issues or pull requests to improve the catalog.

## Capabilities and Constraints

- Catalog libraries, and optionally a verified, explicitly partial list of components each library documents.
- Never infer that a library offers a component from its generic tags, and never present component coverage as complete.
- Catalog MCP servers and connectors for UI libraries and design tools in a separate directory. List only the clients each provider documents, and never request or store credentials.
- Keep library metadata factual and link to canonical project sources.
- Preserve light and dark themes, keyboard access, responsive behavior, and reduced-motion support.
- Only maintainers merge changes to the protected default branch.

## Brand Commitments

The product is named Col and uses the line “Sol could not do it himself, so we made Col.” The visual identity is minimal, high-contrast, and uses `#0800FF` as its primary accent.

## Evidence on Hand

The curated registry lives in `data/libraries.ts`; verified components live in `data/components.ts`; integrations live in `data/integrations.ts`, with terms defined in `CONTEXT.md`. Contribution rules live in `README.md`, `CONTRIBUTING.md`, and `.github/` issue templates.

## Product Principles

- Reduce the time it takes to find a suitable UI library.
- Prefer clear filters and factual metadata over promotional copy.
- Keep contributions focused, reviewable, and easy to verify.
- Send users to official project sources for installation and documentation.
