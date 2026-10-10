import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { previewStories } from "@/data/preview-stories";
import {
  componentSlug,
  findPreviewEntry,
  findScene,
  previewPath,
  storyId,
  PREVIEW_SCENES,
} from "@/lib/preview-stories";
import { pageMetadata } from "@/lib/site";
import { PreviewCanvas } from "@/components/PreviewCanvas";

/**
 * The one preview page every delivery channel renders: the MCP Apps widget
 * frames it, screenshots capture it, and tool results link to it. The scene is
 * part of the path so each variant is a fast static page; query parameters
 * carry theme tokens and sample data (`?primary=…&sample={…}`), which the
 * canvas applies in place.
 */
export function generateStaticParams() {
  return previewStories.flatMap((entry) =>
    entry.permission.status === "granted"
      ? entry.stories.flatMap((story) =>
          PREVIEW_SCENES.map((scene) => ({
            library: entry.slug,
            component: componentSlug(story.component),
            scene: componentSlug(scene),
          })),
        )
      : [],
  );
}

function resolve(library: string, component: string, scene: string) {
  const entry = findPreviewEntry(previewStories, library);
  const story = entry?.stories.find((candidate) => componentSlug(candidate.component) === component);
  const resolvedScene = findScene(scene);
  if (!entry || entry.permission.status !== "granted" || !story || !resolvedScene) return null;
  return { entry, story, scene: resolvedScene };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ library: string; component: string; scene: string }>;
}): Promise<Metadata> {
  const { library, component, scene } = await params;
  const resolved = resolve(library, component, scene);
  if (!resolved) return {};
  const { entry, story } = resolved;
  return pageMetadata(
    previewPath(entry.slug, story, resolved.scene),
    `${entry.slug} ${story.component} in a ${resolved.scene} scene | Col`,
    `The ${story.component} component rendered in a ${resolved.scene} scene with themeable tokens.`,
  );
}

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ library: string; component: string; scene: string }>;
}) {
  const { library, component, scene } = await params;
  const resolved = resolve(library, component, scene);
  if (!resolved) notFound();

  return <PreviewCanvas storyId={storyId(resolved.entry.slug, resolved.story)} scene={resolved.scene} />;
}
