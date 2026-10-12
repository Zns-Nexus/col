import type { Library } from "../data/libraries";
import type { LibraryDetails } from "../data/library-details/types";

/**
 * What Col publishes about setting a library up: links to the library's own
 * current documentation, and a prompt that sends an agent to those docs.
 *
 * Col stores no install commands, registry setup, or step lists of its own, so
 * nothing here can drift from the project it describes. A library marked
 * `outboundOnly` shows no setup guidance at all.
 */
export function libraryOutbound(library: Library, details: LibraryDetails) {
  if (library.outboundOnly) return { links: [], agentPrompt: null };

  return {
    links: [
      { url: details.docsUrl, text: `Read the official ${library.name} docs for prerequisites, installation, and current APIs.` },
      { url: library.url, text: `Browse the official ${library.name} site and choose what to use.` },
    ],
    agentPrompt: `Read the current official docs / llms.txt at ${details.docsUrl}, then install from there.
Use ${library.name} in this existing project and follow those setup pages step by step: Col publishes no install commands of its own, so take every command, prerequisite, and version from them and cite the pages you used.
Keep the project's existing conventions, preserve accessibility, and report anything the official docs do not cover.`,
  };
}
