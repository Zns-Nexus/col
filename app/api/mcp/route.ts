import { createMcpHandler } from "@modelcontextprotocol/server";
import { libraries } from "@/data/libraries";
import { componentIndex } from "@/data/components";
import { libraryDetails } from "@/data/library-details";
import { libraryCorpus } from "@/data/library-corpus";
import { compatibility } from "@/data/compatibility";
import { createColMcpServer } from "@/lib/mcp-server";

/**
 * Col's MCP endpoint: one read-only Streamable HTTP route over the same
 * catalogue data the website renders. Stateless by construction — every
 * request is answered by a fresh server instance, so there is no session
 * state and nothing to store (credentials included).
 */
const handler = createMcpHandler(() =>
  createColMcpServer({
    libraries,
    componentIndex,
    details: libraryDetails,
    corpus: libraryCorpus,
    compatibility,
  }),
);

export async function POST(request: Request) {
  return handler.fetch(request);
}
