import type { Metadata } from "next";

export const siteUrl = "https://collection-of-libs.vercel.app";

export const socialImage = "/col-social-preview-v5.jpg";

export const staticRoutes = ["/", "/libraries", "/integrations", "/mcp", "/mcp/agents", "/docs", "/docs/agents", "/docs/find-a-library", "/docs/request-a-library", "/docs/report-issues", "/docs/pull-requests", "/contributors", "/sponsors"] as const;

/** Internal path for a library detail page. */
export const libraryPath = (slug: string) => `/libraries/${slug}`;

/** Internal path for an integration detail page. */
export const integrationPath = (slug: string) => `/integrations/${slug}`;

/** Page identity and sharing metadata, using the same canonical URL on every platform. */
export function pageMetadata(path: string, title: string, description: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: "Col",
      type: "website",
      images: [{ url: socialImage, width: 1200, height: 630, type: "image/jpeg", alt: "Col: UI libraries. All in one place." }],
    },
    twitter: {
      card: "summary_large_image",
      site: "@Screeendev",
      title,
      description,
      images: [{ url: socialImage, alt: "Col: UI libraries. All in one place." }],
    },
  };
}
