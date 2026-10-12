import { readFileSync } from "node:fs";
import { join } from "node:path";
import { previewScreenshotPath } from "./preview-stories.ts";

/**
 * Shipped preview screenshots, rendered at build time and bundled into the MCP
 * route's function (see `outputFileTracingIncludes` in the Next config). A
 * missing file means no image block: the text result and the preview URL stand
 * on their own.
 */
export function readPreviewScreenshot(
  slug: string,
  component: string,
): { data: string; mimeType: "image/png" } | null {
  try {
    const file = join(process.cwd(), "public", previewScreenshotPath(slug, component));
    return { data: readFileSync(file).toString("base64"), mimeType: "image/png" };
  } catch {
    return null;
  }
}
