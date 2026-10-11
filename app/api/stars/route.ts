import { getStarCount } from "@/lib/git-cafe";

/**
 * Same-origin star count for the site header. git.cafe's API sends no CORS
 * headers, so the browser cannot read it directly. Regenerated every five
 * minutes; `stars` is null when git.cafe is unavailable.
 */
export const revalidate = 300;

export async function GET() {
  return Response.json({ stars: await getStarCount() });
}
