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
  /** What it costs, checked against the official pricing or license page. */
  pricing: {
    /**
     * "free": everything is free to use. "freemium": the core is free but some
     * assets, templates, tiers or features are paid. "paid": the main product
     * needs payment, even if there is a trial or a small free tier.
     */
    model: "free" | "freemium" | "paid";
    /** One plain sentence on what is free and what is paid. */
    summary: string;
    /** License of the free code, when the project states one (for example "MIT"). */
    license?: string;
    /** Official page that states the pricing or license. */
    source: string;
  };
  /**
   * Set when the site mostly hosts components made by many outside authors (a
   * community marketplace or registry), so terms vary per item. One sentence.
   */
  collection?: string;
}
