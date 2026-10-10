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
 *
 * It then verifies the two behaviours screenshots cannot show: a themed render
 * (caller tokens and sample data applied in place) and the MCP Apps widget
 * (acting as the host, it must frame the preview page). Both fail the script
 * loudly, so the interactive channel is proven on every run.
 */
import { spawn } from "node:child_process";
import { existsSync, mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import { chromium } from "playwright";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const port = 4617;
const origin = `http://localhost:${port}`;

const { previewStories } = await import("../data/preview-stories/index.ts");
const { previewPath, previewScreenshotPath, shippableStories } = await import("../lib/preview-stories.ts");
const { previewWidgetHtml } = await import("../lib/preview-widget.ts");

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
      try {
        await page.screenshot({ path: out, fullPage: true });
      } catch {
        // One broken capture must never stall the whole catalogue: fall back to
        // the viewport shot and say so, so the gap is visible in the log.
        console.warn(`full-page capture failed for ${id}; falling back to viewport`);
        await page.screenshot({ path: out });
      }
      console.log(`rendered ${id} -> ${path.relative(root, out)}`);
    }
  }

  await verifyThemedRender(page, origin);
  await verifyWidget(page, root);

  await browser.close();
} finally {
  server.kill();
}

/** Caller tokens and sample data must apply in place after hydration. */
async function verifyThemedRender(page, origin) {
  const story = shippableStories(previewStories, "shadcn-ui").find((candidate) => candidate.component === "Button");
  const query = `?primary=%23ff0000&radius=16px&sample=${encodeURIComponent('{"primaryLabel":"Invite team"}')}`;
  await page.goto(`${origin}${previewPath("shadcn-ui", story, "Landing Pages")}${query}`, { waitUntil: "networkidle" });
  await page.waitForSelector("[data-preview-themed]");
  const themed = await page.evaluate(() => {
    const canvas = document.querySelector("[data-preview-themed]");
    return {
      primary: canvas.style.getPropertyValue("--primary"),
      radius: canvas.style.getPropertyValue("--radius"),
      label: canvas.textContent,
    };
  });
  if (themed.primary !== "#ff0000" || themed.radius !== "16px" || !themed.label.includes("Invite team")) {
    throw new Error(`themed render did not apply: ${JSON.stringify(themed)}`);
  }
  console.log("verified themed render (tokens and sample data applied)");
}

/** The widget must run the MCP Apps handshake and frame Col's preview page. */
async function verifyWidget(page, root) {
  await page.addInitScript(() => {
    window.__messages = [];
    window.addEventListener("message", (event) => window.__messages.push(event.data));
  });
  await page.route("https://collection-of-libs.vercel.app/preview/**", (route) =>
    route.fulfill({ status: 200, contentType: "text/html", body: "<html><body data-widget-proof>preview</body></html>" }),
  );
  const widgetFile = path.join(mkdtempSync(path.join(tmpdir(), "col-widget-")), "widget.html");
  writeFileSync(widgetFile, previewWidgetHtml());
  await page.goto(pathToFileURL(widgetFile).href);

  const previewUrl = "https://collection-of-libs.vercel.app/preview/shadcn-ui/button/landing-pages";
  await page.evaluate((url) => {
    window.postMessage(
      { jsonrpc: "2.0", id: 999, method: "ui/notifications/tool-result", params: { structuredContent: { preview: { url } } } },
      "*",
    );
  }, previewUrl);
  await page.waitForSelector("iframe#preview:not([hidden])");
  try {
    await page.frameLocator("#preview").locator("body[data-widget-proof]").waitFor({ state: "attached", timeout: 5000 });
  } catch {
    const src = await page.getAttribute("iframe#preview", "src");
    throw new Error(`the widget iframe did not load the preview page (src=${src})`);
  }

  const check = await page.evaluate(() => ({
    src: document.getElementById("preview").getAttribute("src"),
    fallbackHidden: document.getElementById("fallback").hidden,
    initialized: window.__messages.some((message) => message && message.method === "ui/initialize"),
  }));
  if (check.src !== previewUrl || !check.fallbackHidden || !check.initialized) {
    throw new Error(`widget behaviour wrong: ${JSON.stringify(check)}`);
  }
  console.log("verified MCP Apps widget (handshake and framing)");
}
