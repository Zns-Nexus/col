import { useSyncExternalStore } from "react";

/**
 * The directory's search text. It lives outside React state so the sidebar
 * search (part of the app frame) and the directory results can share it.
 */
let query = "";
const listeners = new Set<() => void>();

export const directoryQuery = {
  get: () => query,
  set(next: string) {
    if (next === query) return;
    query = next;
    listeners.forEach((listener) => listener());
  },
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};

export function useDirectoryQuery() {
  return useSyncExternalStore(directoryQuery.subscribe, directoryQuery.get, () => "");
}

/** Focus whichever directory search field is on screen (sidebar on desktop, top bar on mobile). */
export function focusDirectorySearch() {
  const field = [...document.querySelectorAll<HTMLInputElement>("[data-directory-search]")].find((input) => input.offsetParent !== null);
  field?.focus();
  return Boolean(field);
}
