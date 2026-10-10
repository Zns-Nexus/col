/**
 * Sample data for preview stories: the short display strings a story replaces
 * in its render (a metric name, a button label, a question). The data travels
 * in the preview URL's query as JSON and comes back as plain strings; React
 * escapes them at render, so they can never supply structure. Oversized keys
 * and values are dropped rather than rendered.
 */

const MAX_KEYS = 16;
const MAX_KEY_LENGTH = 40;
const MAX_VALUE_LENGTH = 100;

function accept(key: string, value: unknown): value is string {
  return typeof value === "string" && key.length <= MAX_KEY_LENGTH && value.length <= MAX_VALUE_LENGTH;
}

/** Serialize accepted sample strings into a query string; empty when none survive. */
export function serializeSample(sample: Record<string, string>): string {
  const clean = Object.fromEntries(
    Object.entries(sample)
      .filter(([key, value]) => accept(key, value))
      .slice(0, MAX_KEYS),
  );
  return Object.keys(clean).length > 0 ? new URLSearchParams({ sample: JSON.stringify(clean) }).toString() : "";
}

/** Parse a preview URL's query into the accepted sample strings. */
export function parseSample(query: string | URLSearchParams): Record<string, string> {
  const params = typeof query === "string" ? new URLSearchParams(query) : query;
  const raw = params.get("sample");
  if (!raw) return {};
  try {
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) return {};
    return Object.fromEntries(
      Object.entries(parsed)
        .filter(([key, value]) => accept(key, value))
        .slice(0, MAX_KEYS),
    );
  } catch {
    return {};
  }
}
