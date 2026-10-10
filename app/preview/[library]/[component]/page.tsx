import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { previewStories } from "@/data/preview-stories";
import { componentSlug, findPreviewEntry, previewPath, storyId } from "@/lib/preview-stories";
import { pageMetadata } from "@/lib/site";
import { sceneTemplates } from "@/components/PreviewScenes";
import { storyRenders } from "@/components/PreviewStories";
import { PreviewTheme } from "@/components/PreviewTheme";

/**
 * The one preview page every delivery channel renders: the MCP Apps widget
 * frames it, screenshots capture it, and tool results link to it. Query
 * parameters carry theme tokens (`?primary=…&border=…`); with none supplied it
 * renders in the site's default theme.
 */
export function generateStaticParams() {
  return previewStories.flatMap((entry) =>
    entry.permission.status === "granted"
      ? entry.stories.map((story) => ({ library: entry.slug, component: componentSlug(story.component) }))
      : [],
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ library: string; component: string }>;
}): Promise<Metadata> {
  const { library, component } = await params;
  const entry = findPreviewEntry(previewStories, library);
  const story = entry?.stories.find((candidate) => componentSlug(candidate.component) === component);
  if (!entry || entry.permission.status !== "granted" || !story) return {};
  return pageMetadata(
    previewPath(entry.slug, story),
    `${entry.slug} ${story.component} preview | Col`,
    `The ${story.component} component rendered in a ${story.scene} scene with themeable tokens.`,
  );
}

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ library: string; component: string }>;
}) {
  const { library, component } = await params;
  const entry = findPreviewEntry(previewStories, library);
  const story = entry?.stories.find((candidate) => componentSlug(candidate.component) === component);
  if (!entry || entry.permission.status !== "granted" || !story) notFound();

  const render = storyRenders[storyId(entry.slug, story)];
  const Scene = sceneTemplates[story.scene];
  if (!render || !Scene) {
    throw new Error(`story ${storyId(entry.slug, story)} has no render for scene "${story.scene}"`);
  }

  return (
    <PreviewTheme>
      <main data-preview-story={storyId(entry.slug, story)} data-preview-scene={story.scene}>
        <Scene>{render()}</Scene>
      </main>
    </PreviewTheme>
  );
}
