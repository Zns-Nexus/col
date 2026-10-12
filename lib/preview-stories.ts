import { type Library, type UseCase } from "../data/libraries.ts";
import type { ComponentIndex } from "../data/components.ts";
import type { PreviewStoriesEntry, PreviewStory } from "../data/preview-stories/types.ts";

/**
 * The preview-story gate — the one seam every story passes before it ships.
 *
 * A story is only admitted when it is lawful (the library's recorded reuse
 * permission is granted), truthful (it names a component the verified
 * component index documents for that library), and renderable (its scene is a
 * catalogue use case). Anything else fails validation with an explicit reason
 * rather than silently degrading a preview.
 */

/** Stable exact id for a story: `<library-slug>/<component name>`. */
export function storyId(slug: string, story: PreviewStory): string {
  return `${slug}/${story.component}`;
}

/** URL-safe form of a name (component or scene), used in preview paths. */
export function componentSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

/** Use-case scenes that have a rendered template; a story's scene must be one of these. */
export const PREVIEW_SCENES = [
  "Landing Pages",
  "Dashboards",
  "Marketing Sites",
  "Rapid Prototyping",
] as const satisfies readonly UseCase[];
export type PreviewScene = (typeof PREVIEW_SCENES)[number];

/** The scene a preview path segment names, or undefined for an unknown one. */
export function findScene(segment: string): PreviewScene | undefined {
  return PREVIEW_SCENES.find((scene) => componentSlug(scene) === segment);
}

/** Internal path of the one page every preview channel renders, for one scene. */
export function previewPath(slug: string, story: PreviewStory, scene: UseCase = story.scene): string {
  return `/preview/${slug}/${componentSlug(story.component)}/${componentSlug(scene)}`;
}

/** Public path of a story's rendered screenshot, under the site's public root. */
export function previewScreenshotPath(slug: string, component: string): string {
  return `previews/${slug}/${componentSlug(component)}.png`;
}

/** Preview pages render bare — no site chrome — so widgets and screenshots show only the story. */
export function isPreviewPath(pathname: string): boolean {
  return pathname.startsWith("/preview/");
}

export function validatePreviewStories(
  entries: readonly PreviewStoriesEntry[],
  componentIndex: ComponentIndex,
  libraries: readonly Library[],
): string[] {
  const errors: string[] = [];
  const seen = new Set<string>();

  for (const entry of entries) {
    const documented = componentIndex[entry.slug] ?? [];
    const library = libraries.find((candidate) => candidate.slug === entry.slug);
    const renderable = library?.stacks.includes("React") ?? false;

    if (entry.stories.length > 0 && !renderable) {
      errors.push(`${entry.slug}: no React story runtime for this library's stacks, so no stories may ship`);
    }

    if (entry.permission.status !== "granted" && entry.stories.length > 0) {
      errors.push(`${entry.slug}: permission is ${entry.permission.status}, so no stories may ship`);
    }

    for (const story of entry.stories) {
      const id = storyId(entry.slug, story);

      if (!documented.some(({ name }) => name === story.component)) {
        errors.push(`${id}: the verified component index does not document this component for ${entry.slug}`);
      }
      if (!(PREVIEW_SCENES as readonly string[]).includes(story.scene)) {
        errors.push(`${id}: scene "${story.scene}" has no rendered template`);
      }
      if (story.dependencies.some((dependency) => typeof dependency !== "string" || dependency.trim() === "")) {
        errors.push(`${id}: every dependency must be a non-empty package name`);
      }
      if (seen.has(id)) {
        errors.push(`${id}: duplicate story for the same component`);
      }
      seen.add(id);
    }
  }

  return errors;
}

/** The story index entry for a library slug, or undefined when it has none. */
export function findPreviewEntry(
  entries: readonly PreviewStoriesEntry[],
  slug: string,
): PreviewStoriesEntry | undefined {
  return entries.find((entry) => entry.slug === slug);
}

/** Stories that may ship for a library: a granted entry's stories, empty otherwise. */
export function shippableStories(entries: readonly PreviewStoriesEntry[], slug: string): PreviewStory[] {
  const entry = findPreviewEntry(entries, slug);
  return entry && entry.permission.status === "granted" ? [...entry.stories] : [];
}

/** The story for one component id, or undefined when nothing is served. Only granted entries answer. */
export function findPreviewStory(
  entries: readonly PreviewStoriesEntry[],
  id: string,
): { entry: PreviewStoriesEntry; story: PreviewStory } | undefined {
  for (const entry of entries) {
    if (entry.permission.status !== "granted") continue;
    for (const story of entry.stories) {
      if (storyId(entry.slug, story) === id) return { entry, story };
    }
  }
  return undefined;
}

export type { PreviewStoriesEntry, PreviewStory };
