#!/usr/bin/env node
// Re-verifies every stored component source URL and reports drift: dead links
// and redirects whose target differs from what Col recorded (record the new
// target as a variant or update the url when this reports one). Maintainer-run:
// the test suite never touches the network. Usage: node scripts/verify-sources.mjs
import { componentIndex } from "../data/components.ts";

const targets = [];
for (const [slug, components] of Object.entries(componentIndex)) {
  for (const component of components) {
    targets.push({ id: `${slug}/${component.name}`, url: component.url });
    for (const [name, url] of Object.entries(component.variants ?? {})) {
      targets.push({ id: `${slug}/${component.name}#${name}`, url });
    }
  }
}

const BATCH = 16;
const drift = [];
for (let i = 0; i < targets.length; i += BATCH) {
  await Promise.all(
    targets.slice(i, i + BATCH).map(async (target) => {
      const response = await fetch(target.url, { method: "HEAD", redirect: "follow", signal: AbortSignal.timeout(15_000) }).catch(() => null);
      if (!response) return drift.push(`${target.id}: unreachable`);
      if (response.status >= 400) return drift.push(`${target.id}: HTTP ${response.status} at ${target.url}`);
      const finalUrl = response.url;
      if (finalUrl !== target.url && !target.url.includes("#")) {
        drift.push(`${target.id}: now lives at ${finalUrl}`);
      }
    }),
  );
}

console.log(`checked ${targets.length} source URLs`);
for (const line of drift) console.log(`DRIFT ${line}`);
console.log(`${drift.length} drifting`);
process.exit(drift.length > 0 ? 1 : 0);
