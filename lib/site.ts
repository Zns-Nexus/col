export const siteUrl = "https://collection-of-libs.vercel.app";

export const socialImage = "/col-social-preview.jpg?v=2";

export const staticRoutes = ["/", "/libraries", "/docs", "/contributors", "/sponsors"] as const;

/** Internal path for a library detail page. */
export const libraryPath = (slug: string) => `/libraries/${slug}`;
