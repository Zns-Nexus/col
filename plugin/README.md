# Col agent plugin

One MCP connection to Col's hosted catalogue plus a `ui-components` skill that
scripts the find → inspect → implement workflow. The server is read-only and
never requests credentials.

Read the [client setup guide](https://collection-of-libs.vercel.app/mcp) for
connection options and troubleshooting, or the
[agent guide](https://collection-of-libs.vercel.app/mcp/agents) for tool
arguments and the component workflow. Use either this plugin or a direct
connection to avoid configuring Col twice.

The package is shared by both hosts:

- `.mcp.json` — the connection manifest, read by Claude Code and Codex.
- `skills/ui-components/SKILL.md` — the workflow skill.
- `.claude-plugin/plugin.json`, `.codex-plugin/plugin.json` — host manifests.

## Claude Code

```sh
claude plugin marketplace add https://git.cafe/screen/col.git
claude plugin install col@col
```

Or load it straight from a checkout:

```sh
claude --plugin-dir /path/to/Col/plugin
```

Or connect only the server:

```sh
claude mcp add --transport http col https://collection-of-libs.vercel.app/api/mcp
```

## Codex

```sh
codex plugin marketplace add https://git.cafe/screen/col.git
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
