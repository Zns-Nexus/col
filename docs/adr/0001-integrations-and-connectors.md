# Integrations get their own directory, and a connector is a setup path

Issue #4 asked Col to list MCP servers and connectors next to libraries. In practice, one product often ships both: Figma's remote MCP server is also a connector in Claude and an app in ChatGPT. So Col lists one integration per product, and "MCP server" and "Connector" describe the setup paths it offers, not separate entry types. An integration's types are derived from its setup paths, which means Figma shows up under both filters without a duplicate entry.

Integrations live in `/integrations` instead of `/libraries`. Libraries are filtered by category, stack, and use case. Those filters mean nothing for an integration, which is chosen by client, transport, sign-in method, and whether it is official. Keeping the directories separate leaves the library directory, its counts, and its tests unchanged. The two directories meet where they actually overlap: the header search covers both, and each library page links to the integrations that serve it.

## Considered options

- **One entry per type.** This is simpler to model, but a product offered both ways would need two entries that could drift apart.
- **A Type filter in `/libraries`.** This keeps one directory, but most of its filters would not apply to integrations, and the library count would include things that are not libraries.

## Consequences

Client configuration is generated in one place (`lib/integration-setup.ts`) from each server's transport and auth. Entries never contain a client-specific snippet or a secret. To support a new client, add it to that module. An entry lists only the clients its provider documents.
