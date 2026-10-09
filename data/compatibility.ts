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
  {
    slug: "heroui",
    facts: [
      {
        subject: "react",
        constraint: ">= 19",
        status: "supported",
        evidence: "https://registry.npmjs.org/@heroui/react",
      },
      {
        subject: "react-dom",
        constraint: ">= 19",
        status: "supported",
        evidence: "https://registry.npmjs.org/@heroui/react",
      },
    ],
  },
  {
    slug: "radix-ui",
    facts: [
      {
        subject: "react",
        constraint: "^16.8 || ^17.0 || ^18.0 || ^19.0",
        status: "supported",
        evidence: "https://registry.npmjs.org/@radix-ui/react-dialog",
      },
      {
        subject: "react-dom",
        constraint: "^16.8 || ^17.0 || ^18.0 || ^19.0",
        status: "supported",
        evidence: "https://registry.npmjs.org/@radix-ui/react-dialog",
      },
    ],
  },
  {
    slug: "mantine",
    facts: [
      {
        subject: "react",
        constraint: "^19.2.0",
        status: "supported",
        evidence: "https://registry.npmjs.org/@mantine/core",
      },
      {
        subject: "react-dom",
        constraint: "^19.2.0",
        status: "supported",
        evidence: "https://registry.npmjs.org/@mantine/core",
      },
    ],
  },
  {
    slug: "kibo-ui",
    facts: [
      {
        subject: "react",
        constraint: ">= 18",
        status: "supported",
        evidence: "https://www.kibo-ui.com/docs/setup",
      },
    ],
  },
  {
    slug: "recharts",
    facts: [
      {
        subject: "react",
        constraint: "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0",
        status: "supported",
        evidence: "https://registry.npmjs.org/recharts",
      },
      {
        subject: "react-dom",
        constraint: "^16.0.0 || ^17.0.0 || ^18.0.0 || ^19.0.0",
        status: "supported",
        evidence: "https://registry.npmjs.org/recharts",
      },
    ],
  },
  {
    slug: "wensity-ui",
    facts: [
      {
        subject: "react",
        constraint: ">= 18.2",
        status: "supported",
        evidence: "https://ui.wensity.com/docs/installation",
      },
    ],
  },
];
