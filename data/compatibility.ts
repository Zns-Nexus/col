/**
 * Version and variant compatibility, recorded per library.
 *
 * Three states are distinct and none is inferred:
 * - "supported": checked against the source named in `evidence`.
 * - "unsupported": the project states it does not work.
 * - "unknown": nothing verified; never substituted with a guess.
 *
 * A library with no entry here simply answers "unknown" everywhere, so the
 * matrix grows by contribution without blocking launch. Claims were checked
 * against the linked official sources (peer-dependency metadata and migration
 * guides); see `lib/compatibility.test.mjs` for the labelled tests.
 */

export type SupportStatus = "supported" | "unsupported" | "unknown";

export interface CompatibilityFact {
  /** What is being constrained: a package ("react"), runtime ("node"), or dependency. */
  subject: string;
  /** Human-readable constraint, e.g. ">= 18". Empty when unknown. */
  constraint: string;
  status: SupportStatus;
  /** Official page or package metadata that backs this fact. */
  evidence: string;
}

export interface LibraryCompatibility {
  /** Owning library slug, matching `data/libraries.ts`. */
  slug: string;
  facts: CompatibilityFact[];
}

export const compatibility: LibraryCompatibility[] = [
  {
    slug: "ant-design",
    facts: [
      {
        subject: "react",
        constraint: ">= 18",
        status: "supported",
        evidence: "https://ant.design/docs/react/migration-v6/",
      },
      {
        subject: "react-dom",
        constraint: ">= 18",
        status: "supported",
        evidence: "https://ant.design/docs/react/migration-v6/",
      },
    ],
  },
  {
    slug: "chakra-ui",
    facts: [
      {
        subject: "react",
        constraint: ">= 18",
        status: "supported",
        evidence: "https://chakra-ui.com/docs/get-started/installation",
      },
      {
        subject: "@emotion/react",
        constraint: ">= 11",
        status: "supported",
        evidence: "https://chakra-ui.com/docs/get-started/installation",
      },
      {
        subject: "node",
        constraint: ">= 20",
        status: "supported",
        evidence: "https://chakra-ui.com/docs/get-started/installation",
      },
    ],
  },
];
