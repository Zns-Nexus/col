import assert from "node:assert/strict";
import { test } from "node:test";
import { getVersionHistory } from "../lib/version-history.ts";
import { repo } from "../lib/repo.ts";

test("history includes only merged main PRs across pages and refreshes its cache", async () => {
  const requests = [];
  const pull = (number, state = "merged", targetBranch = "main") => ({ number, title: `Change ${number}`, merged_at: state === "merged" ? "2026-10-01T00:00:00Z" : null, base: { ref: targetBranch } });
  const request = async (url, options) => {
    requests.push({ url, options });
    return Response.json(requests.length === 1
      ? [pull(2), pull(8, "open"), pull(9, "closed"), pull(10, "merged", "feature")]
      : [pull(7)], requests.length === 1 ? { headers: { link: `<${repo.api}/pulls?page=2>; rel="next", <${repo.api}/pulls?page=2>; rel="last"` } } : undefined);
  };
  assert.deepEqual((await getVersionHistory(request)).map(({ number }) => number), [7, 2]);
  assert.equal(requests.length, 2);
  assert.equal(requests[0].url, `${repo.api}/pulls?state=all&per_page=100&page=1`);
  assert.equal(new URL(requests[1].url).searchParams.get("page"), "2");
  assert.ok(requests.every(({ options }) => options.next.revalidate === 300));
});

test("history distinguishes an empty list from unavailable or invalid data", async (t) => {
  t.mock.method(console, "warn", () => {});
  assert.deepEqual(await getVersionHistory(async () => Response.json([])), []);
  assert.equal(await getVersionHistory(async () => new Response(null, { status: 503 })), null);
  assert.equal(await getVersionHistory(async () => Response.json([{ number: "invalid" }])), null);
  assert.equal(await getVersionHistory(async () => { throw new Error("Network unavailable"); }), null);
});
