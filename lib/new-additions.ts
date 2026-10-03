export const NEW_ADDITION_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

/** A library is new from its addition timestamp until exactly seven days later. */
export function isNewAddition(addedAt: string | undefined, now = Date.now()): boolean {
  if (!addedAt) return false;
  const added = Date.parse(addedAt);
  return now >= added && now < added + NEW_ADDITION_DURATION_MS;
}
