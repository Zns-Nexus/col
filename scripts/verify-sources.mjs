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
const throttled = [];
for (let i = 0; i < targets.length; i += BATCH) {
  await Promise.all(
    targets.slice(i, i + BATCH).map(async (target) => {
      // Some doc hosts reject unknown agents with 404 and throttle bursts with
      // 429; neither is evidence of a dead link.
      const response = await fetch(target.url, {
        method: "GET",
        redirect: "follow",
        signal: AbortSignal.timeout(15_000),
        headers: { "user-agent": "Mozilla/5.0" },
      }).catch(() => null);
      if (!response) return drift.push(`${target.id}: unreachable`);
      if (response.status === 429) return throttled.push(target.id);
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
for (const id of throttled) console.log(`THROTTLED (inconclusive) ${id}`);
console.log(`${drift.length} drifting, ${throttled.length} throttled`);
process.exit(drift.length > 0 ? 1 : 0);
