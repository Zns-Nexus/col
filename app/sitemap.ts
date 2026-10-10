import type { MetadataRoute } from "next";
import { integrations } from "@/data/integrations";
import { libraries } from "@/data/libraries";
import { integrationPath, libraryPath, siteUrl, staticRoutes } from "@/lib/site";
import { previewStories } from "@/data/preview-stories";
import { previewPath, shippableStories, PREVIEW_SCENES } from "@/lib/preview-stories";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticRoutes,
    ...libraries.map(({ slug }) => libraryPath(slug)),
    ...integrations.map(({ slug }) => integrationPath(slug)),
    ...previewStories.flatMap((entry) =>
      shippableStories(previewStories, entry.slug).flatMap((story) =>
        PREVIEW_SCENES.map((scene) => previewPath(entry.slug, story, scene)),
      ),
    ),
  ].map((route) => ({ url: new URL(route, siteUrl).toString() }));
}
