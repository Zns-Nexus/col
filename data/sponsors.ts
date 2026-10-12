/**
 * A project supporting Col. `tier` decides how much room the sponsor's card
 * gets, and `logo` is shown beside every credit.
 */
export type Sponsor = {
  name: string;
  url: string;
  tier: "Platinum" | "Gold" | "Silver";
  /** The sponsor's own mark in `public/sponsors/`, copied from their site. */
  logo: string;
  /** One line about the sponsor, shown under its name on the sponsors page. */
  tagline: string;
};

/** Col's sponsors, highest tier first. */
export const sponsors: Sponsor[] = [
  {
    name: "Reactbits.dev",
    url: "https://reactbits.dev",
    tier: "Platinum",
    logo: "/sponsors/react-bits.png",
    tagline: "Animated React components",
  },
];
