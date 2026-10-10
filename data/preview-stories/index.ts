import type { PreviewStoriesEntry, PreviewStory } from "./types";
import { previewStoriesEntry as radixUi } from "./radix-ui.ts";
import { previewStoriesEntry as shadcnUi } from "./shadcn-ui.ts";
import { previewStoriesEntry as baseUi1 } from "./base-ui-1.ts";
import { previewStoriesEntry as baseUi2 } from "./base-ui-2.ts";
import { previewStoriesEntry as reactAria1 } from "./react-aria-1.ts";
import { previewStoriesEntry as reactAria2 } from "./react-aria-2.ts";
import { previewStoriesEntry as arkUi1 } from "./ark-ui-1.ts";
import { previewStoriesEntry as arkUi2 } from "./ark-ui-2.ts";
import { previewStoriesEntry as mantine1 } from "./mantine-1.ts";
import { previewStoriesEntry as mantine2 } from "./mantine-2.ts";
import { previewStoriesEntry as mantine3 } from "./mantine-3.ts";
import { previewStoriesEntry as mui2 } from "./mui-2.ts";
import { previewStoriesEntry as mantine4 } from "./mantine-4.ts";
import { previewStoriesEntry as mui1 } from "./mui-1.ts";
import { previewStoriesEntry as shadcnUi1 } from "./shadcn-ui-1.ts";
import { previewStoriesEntry as shadcnUi2 } from "./shadcn-ui-2.ts";
import { previewStoriesEntry as mui3 } from "./mui-3.ts";
import { previewStoriesEntry as headlessUi } from "./headless-ui.ts";
import { previewStoriesEntry as intentUi } from "./intent-ui.ts";
import { previewStoriesEntry as reui } from "./reui.ts";
import { previewStoriesEntry as elevenlabsUi } from "./elevenlabs-ui.ts";
import { previewStoriesEntry as starwindUi } from "./starwind-ui.ts";
import { previewStoriesEntry as webcoreui } from "./webcoreui.ts";
import { previewStoriesEntry as webAwesome } from "./web-awesome.ts";

/**
 * The preview story index: one entry per library, assembled from the
 * per-library modules beside this file. A library may arrive in several
 * partial entries (large libraries are written in batches); entries for the
 * same slug merge here, stories first-permission-wins.
 */
function merge(entries: PreviewStoriesEntry[]): PreviewStoriesEntry[] {
  const bySlug = new Map<string, PreviewStoriesEntry>();
  for (const entry of entries) {
    const existing = bySlug.get(entry.slug);
    if (!existing) {
      bySlug.set(entry.slug, { ...entry, stories: [...entry.stories] });
    } else {
      existing.stories.push(...entry.stories);
    }
  }
  return [...bySlug.values()];
}

export const previewStories: PreviewStoriesEntry[] = merge([
  radixUi,
  shadcnUi,
  baseUi1,
  baseUi2,
  reactAria1,
  reactAria2,
  arkUi1,
  arkUi2,
  mantine1,
  mantine2,
  mantine3,
  mui2,
  mantine4,
  mui1,
  shadcnUi1,
  shadcnUi2,
  mui3,
  headlessUi,
  intentUi,
  reui,
  elevenlabsUi,
  starwindUi,
  webcoreui,
  webAwesome,
]);

export type { PreviewStoriesEntry, PreviewStory };
