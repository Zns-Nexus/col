import { isFrameworkStack, type Library } from "../data/libraries.ts";

const LIMIT = 3;

export type RelatedLibraries = {
  /** Same category: other libraries that do the same job. */
  alternatives: Library[];
  /** Different category with a shared use case or tag: libraries that complement this one. */
  pairsWith: Library[];
};

const overlap = <T>(a: readonly T[], b: readonly T[]) => a.filter((item) => b.includes(item)).length;

/** Framework stacks, ignoring "Vanilla JS", which works inside any framework. */
const frameworks = (library: Library) => library.stacks.filter((stack) => isFrameworkStack(stack) && stack !== "Vanilla JS");

/** Whether two libraries can live in the same project: either one is framework-free, or they share a framework. */
function compatible(a: Library, b: Library) {
  const [fa, fb] = [frameworks(a), frameworks(b)];
  return fa.length === 0 || fb.length === 0 || overlap(fa, fb) > 0;
}

const sharedPurpose = (a: Library, b: Library) => overlap(a.useCases, b.useCases) + overlap(a.tags ?? [], b.tags ?? []);

/** How alike two libraries are: use cases count double, then shared stacks and tags. */
const affinity = (a: Library, b: Library) => overlap(a.useCases, b.useCases) * 2 + overlap(a.stacks, b.stacks) + overlap(a.tags ?? [], b.tags ?? []);

/**
 * Picks up to three alternatives and three complements for a library from the
 * registry, best match first. Only libraries that fit the same framework are
 * considered; ties keep the registry's curated order.
 */
export function relatedLibraries(library: Library, registry: readonly Library[]): RelatedLibraries {
  const candidates = registry.filter((other) => other.slug !== library.slug && compatible(library, other));
  const best = (pool: Library[]) => pool
    .map((other) => ({ other, score: affinity(library, other) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, LIMIT)
    .map(({ other }) => other);

  return {
    alternatives: best(candidates.filter((other) => other.category === library.category)),
    pairsWith: best(candidates.filter((other) => other.category !== library.category && sharedPurpose(library, other) > 0)),
  };
}
