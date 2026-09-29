/**
 * Detail-page content for a single library.
 *
 * One file per registry entry lives alongside this one as `<slug>.ts` and is
 * aggregated in `./index.ts`. Keep every field factual: URLs, package names,
 * and commands must come from the project's official sources.
 */

export interface LibraryDetails {
  /** Official documentation page. */
  docsUrl: string;
  /** Official public source repository. Omit for closed-source projects. */
  repoUrl?: string;
  /** Current official install commands. Omit for resources that are not installed. */
  install?: { label: string; command: string }[];
  /** Registry prerequisites shown before the component install commands. */
  registrySetup?: { description: string; config?: string };
  /** Short, concrete steps to get started. */
  gettingStarted: string[];
  /** An official og:image or screenshot. Omit unless the URL is verified reachable. */
  preview?: { src: string; alt: string };
  /** Copyable prompt for setting the library up in an existing project. */
  agentPrompt: string;
}
