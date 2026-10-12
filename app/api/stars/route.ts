import { getStarCount } from "@/lib/git-cafe";

/** Same-origin star count, refreshed every five minutes; null when GitHub is unavailable. */
export const revalidate = 300;

export async function GET() {
  return Response.json({ stars: await getStarCount() });
}
