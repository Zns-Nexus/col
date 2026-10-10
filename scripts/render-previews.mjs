/**
 * Render every shipped preview story to a screenshot.
 *
 * Prerequisites: `npm run build` (the script serves the built app).
 * Usage: `npm run previews`.
 *
 * Starts `next start` on a scratch port, visits each story's preview page with
 * the default theme, waits for the canvas to apply theme tokens (which marks
 * hydration done), and writes PNGs to public/previews/<library>/<component>.png
 * — the exact paths the MCP tool layer reads and tests/previews.test.mjs
 * enforces. A story that fails to render fails this script, so the build never
 * ships a blank preview.
 */
import { spawn } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { chromium } from "playwright";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const port = 4617;
const origin = `http://localhost:${port}`;

const { previewStories } = await import("../data/preview-stories/index.ts");
const { previewPath, previewScreenshotPath, shippableStories } = await import("../lib/preview-stories.ts");

if (!existsSync(path.join(root, ".next", "BUILD_ID"))) {
  console.error("No build found. Run `npm run build` first.");
  process.exit(1);
}

const server = spawn(process.execPath, [path.join(root, "node_modules", "next", "dist", "bin", "next"), "start", "-p", String(port)], {
  cwd: root,
  stdio: "ignore",
});

async function waitForServer(timeoutMs = 60_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(origin);
      if (response.ok) return;
    } catch {
      // Server not up yet; poll again.
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error(`server did not start on ${origin}`);
}

try {
  await waitForServer();
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  // Col is dark-first: render every screenshot in the site's default theme.
  await page.emulateMedia({ colorScheme: "dark" });

  for (const entry of previewStories) {
    for (const story of shippableStories(previewStories, entry.slug)) {
      const id = `${entry.slug}/${story.component}`;
      const url = `${origin}${previewPath(entry.slug, story)}`;
      await page.goto(url, { waitUntil: "networkidle" });
      await page.waitForSelector("[data-preview-themed]");
      await page.evaluate(() => document.fonts.ready);

      const out = path.join(root, "public", previewScreenshotPath(entry.slug, story.component));
      mkdirSync(path.dirname(out), { recursive: true });
      await page.screenshot({ path: out, fullPage: true });
      console.log(`rendered ${id} -> ${path.relative(root, out)}`);
    }
  }

  await browser.close();
} finally {
  server.kill();
}
