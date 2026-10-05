import type { MetadataRoute } from "next";
import { integrations } from "@/data/integrations";
import { libraries } from "@/data/libraries";
import { integrationPath, libraryPath, siteUrl, staticRoutes } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticRoutes,
    ...libraries.map(({ slug }) => libraryPath(slug)),
    ...integrations.map(({ slug }) => integrationPath(slug)),
  ].map((route) => ({ url: new URL(route, siteUrl).toString() }));
}
