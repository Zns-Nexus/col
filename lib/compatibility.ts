import type { CompatibilityFact } from "../data/compatibility";

/**
 * The compatibility resolver: versions and variants per subject, with three
 * distinct states. "unknown" is the answer whenever nothing is recorded —
 * never a guess inferred from a neighbouring subject or a generic tag.
 */

export interface CompatibilityReport {
  supported: CompatibilityFact[];
  unsupported: CompatibilityFact[];
  /** Subjects with no verified fact for this library. */
  unknown: string[];
}

/** One subject's fact, or an explicit unknown when nothing is recorded. */
export function resolveCompatibility(facts: readonly CompatibilityFact[], subject: string): CompatibilityFact {
  return (
    facts.find((fact) => fact.subject === subject) ?? { subject, constraint: "", status: "unknown", evidence: "" }
  );
}

/**
 * Groups a library's facts across the subjects Col tracks anywhere in its
 * compatibility data, so the gaps show up as named unknowns instead of
 * silence. `subjects` is that vocabulary: the union of recorded subjects.
 */
export function compatibilityReport(
  facts: readonly CompatibilityFact[],
  subjects: readonly string[],
): CompatibilityReport {
  const resolved = subjects.map((subject) => resolveCompatibility(facts, subject));
  return {
    supported: resolved.filter((fact) => fact.status === "supported"),
    unsupported: resolved.filter((fact) => fact.status === "unsupported"),
    unknown: resolved.filter((fact) => fact.status === "unknown").map((fact) => fact.subject),
  };
}
