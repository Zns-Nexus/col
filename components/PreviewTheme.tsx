"use client";

import { useEffect, useState, type ReactNode } from "react";
import { parseThemeTokens, themeStyle, type ThemeTokens } from "@/lib/preview-theme";

/**
 * The preview canvas: renders the story with the site's default tokens and
 * applies the caller's theme tokens as CSS custom properties after hydration,
 * so static builds stay cacheable while a themed preview re-colours in place.
 * `data-preview-themed` flips once tokens are applied, which is what screenshot
 * rendering waits on.
 */
export function PreviewTheme({ children }: { children: ReactNode }) {
  const [tokens, setTokens] = useState<ThemeTokens>({});
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    setTokens(parseThemeTokens(window.location.search.replace(/^\?/, "")));
    setApplied(true);
  }, []);

  return (
    <div
      data-preview-themed={applied ? "true" : undefined}
      style={themeStyle(tokens)}
      className="min-h-screen bg-background text-foreground"
    >
      {children}
    </div>
  );
}
