# Col agent plugin

One MCP connection to Col's hosted catalogue plus a `ui-components` skill that
scripts the find → inspect → implement workflow. The server is read-only and
never requests credentials.

The package is shared by both hosts:

- `.mcp.json` — the connection manifest, read by Claude Code and Codex.
- `skills/ui-components/SKILL.md` — the workflow skill.
- `.claude-plugin/plugin.json`, `.codex-plugin/plugin.json` — host manifests.

## Claude Code

```sh
claude plugin marketplace add screen-gd/Col
claude plugin install col@col
```

Or load it straight from a checkout (no GitHub involved):

```sh
claude --plugin-dir /path/to/Col/plugin
```

Or connect only the server:

```sh
claude mcp add --transport http col https://collection-of-libs.vercel.app/api/mcp
```

## Codex

```sh
codex plugin marketplace add screen-gd/Col
codex plugin add col@col
```

Or connect only the server:

```sh
codex mcp add col --url https://collection-of-libs.vercel.app/api/mcp
```

## Verify the connection

```sh
curl -s -X POST https://collection-of-libs.vercel.app/api/mcp \
  -H 'content-type: application/json' \
  -H 'accept: application/json, text/event-stream' \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-06-18","capabilities":{},"clientInfo":{"name":"smoke","version":"1.0"}}}'
```

A JSON-RPC `result` with `serverInfo.name` of `col` means the endpoint is up.
Against a local build, use `http://localhost:3000/api/mcp` instead.
