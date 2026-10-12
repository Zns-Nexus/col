"use client";

import { useEffect, useState } from "react";
import type { UseCase } from "@/data/libraries";
import { parseSample } from "@/lib/preview-sample";
import { parseThemeTokens, themeStyle, type ThemeTokens } from "@/lib/preview-theme";
import { sceneTemplates } from "@/components/PreviewScenes";
import { storyRenders } from "@/components/PreviewStories";

/**
 * The preview canvas: renders the story in its scene and applies the caller's
 * theme tokens and sample data from the URL query after hydration, so static
 * builds stay cacheable while a themed preview re-colours and re-labels in
 * place. `data-preview-themed` flips once applied, which is what screenshot
 * rendering waits on.
 */
export function PreviewCanvas({ storyId, scene }: { storyId: string; scene: UseCase }) {
  const [tokens, setTokens] = useState<ThemeTokens>({});
  const [sample, setSample] = useState<Readonly<Record<string, string>>>({});
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    const query = window.location.search.replace(/^\?/, "");
    setTokens(parseThemeTokens(query));
    setSample(parseSample(query));
    setApplied(true);
  }, []);

  const render = storyRenders[storyId];
  const Scene = sceneTemplates[scene];
  if (!render || !Scene) {
    throw new Error(`story ${storyId} has no render for scene "${scene}"`);
  }

  return (
    <div
      data-preview-themed={applied ? "true" : undefined}
      style={themeStyle(tokens)}
      className="min-h-screen bg-background text-foreground"
    >
      <main data-preview-story={storyId} data-preview-scene={scene}>
        <Scene>{render({ sample })}</Scene>
      </main>
    </div>
  );
}
