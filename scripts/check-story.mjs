// Validates one subagent-owned story pair before the merge: the data entry
// against the component index (lawful permission, real components, known
// scenes), the render map keys against the entry's stories, and dependencies
// against installed packages. Usage: node scripts/check-story.mjs <data-file> <renders-file>
import { access, readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { join } from "node:path";
import { validatePreviewStories } from "../lib/preview-stories.ts";
import { componentIndex } from "../data/components.ts";
import { libraries } from "../data/libraries.ts";

const [dataFile, rendersFile] = process.argv.slice(2);
if (!dataFile || !rendersFile) {
  console.error("usage: node scripts/check-story.mjs <data-file> <renders-file>");
  process.exit(2);
}

const errors = [];
const { previewStoriesEntry: entry } = await import(pathToFileURL(dataFile).href);
if (!entry?.slug || !entry?.permission || !Array.isArray(entry.stories)) {
  errors.push("data file must export `previewStoriesEntry` shaped like PreviewStoriesEntry");
}

if (entry) {
  errors.push(...validatePreviewStories([entry], componentIndex, libraries));
  const renders = await readFile(rendersFile, "utf8");
  const keys = new Set([...renders.matchAll(/^\s*"([^"]+)\/([^"]+)":/gm)].map((m) => `${m[1]}/${m[2]}`));
  const exportOk = /export const \w*[Ss]toryRenders(:\s*Record<[^>]+>)?\s*=\s*\{/.test(renders);
  if (!exportOk) errors.push("renders file must `export const storyRenders: Record<string, StoryRender> = { ... }`");
  for (const story of entry.stories ?? []) {
    const id = `${entry.slug}/${story.component}`;
    if (!keys.has(id)) errors.push(`render map is missing key "${id}"`);
    for (const dep of story.dependencies ?? []) {
      try {
        await access(join("node_modules", dep, "package.json"));
      } catch {
        errors.push(`dependency "${dep}" (story ${id}) is not installed`);
      }
    }
  }
  for (const key of keys) {
    if (!entry.stories?.some((s) => `${entry.slug}/${s.component}` === key)) {
      errors.push(`render map key "${key}" has no matching story in the data entry`);
    }
  }
}

if (errors.length) {
  console.error(`check-story: ${errors.length} problem(s)`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(`check-story: ${entry.slug} ok (${entry.stories.length} stories)`);
