import assert from "node:assert/strict";
import test from "node:test";
import { Effect, Schema } from "effect";
import { getStarCount, listAll } from "./git-cafe.ts";
import { repo } from "./repo.ts";

test("stars use the GitHub repository response and retain the five-minute cache", async () => {
  const stars = await getStarCount(async (url, options) => {
    assert.equal(url, repo.api);
    assert.equal(options.next.revalidate, 300);
    assert.equal(options.headers.Accept, "application/vnd.github+json");
    return Response.json({ stargazers_count: 42 });
  });
  assert.equal(stars, 42);
});

test("stars stay unavailable for invalid data, HTTP errors, and network failures", async (t) => {
  t.mock.method(console, "warn", () => {});
  for (const request of [
    async () => Response.json({ stargazers_count: "wrong" }),
    async () => new Response(null, { status: 403 }),
    async () => { throw new Error("offline"); },
  ]) assert.equal(await getStarCount(request), null);
});

test("list pagination respects its page bound", async () => {
  let requests = 0;
  const items = await Effect.runPromise(listAll(async () => {
    requests += 1;
    return Response.json([requests], { headers: { link: `<${repo.api}/issues?page=2>; rel="next"` } });
  }, "issues", Schema.Number, { maxPages: 1, revalidate: 300 }));
  assert.equal(requests, 1);
  assert.deepEqual(items, [1]);
});
