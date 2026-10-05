import type { LibraryCorpusEntry } from "./types";

/**
 * The deep-coverage documentation corpus, one entry per library.
 *
 * Ingestion rules (enforced by `lib/corpus.test.mjs`):
 * - `permission` must be recorded before any snapshot is added. A missing or
 *   `unknown` permission means the entry holds no snapshots at all.
 * - Every snapshot carries its fetch date and source revision so evidence can
 *   be re-verified and aged out.
 *
 * Entries here are added one at a time, each with its permission record; the
 * initial library selection is tracked in issue #40.
 */
export const libraryCorpus: LibraryCorpusEntry[] = [];
