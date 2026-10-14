import assert from "node:assert/strict";
import test from "node:test";
import { getContributors } from "./contributors.ts";
import { repo } from "./repo.ts";

const user = (login, type = "User") => ({ login, type, html_url: `https://github.com/${login}`, avatar_url: `https://avatars.githubusercontent.com/${login}` });
const pull = (number, user, merged_at = "2026-10-01T00:00:00Z") => ({ number, user, merged_at });

test("lists unique authors of merged pull requests and retains Luneri", async () => {
  const urls = [];
  const contributors = await getContributors(async (url) => {
    urls.push(String(url));
    return urls.length === 1
      ? Response.json([pull(1, user("ada")), pull(2, user("bot", "Bot")), pull(3, user("ada"), null)], { headers: { link: `<${repo.api}/pulls?page=2>; rel="next"` } })
      : Response.json([pull(4, user("lin")), pull(5, user("lin")), pull(6, null)]);
  });
  assert.equal(new URL(urls[1]).searchParams.get("page"), "2");
  assert.equal(new URL(urls[0]).searchParams.get("state"), "all");
  assert.deepEqual(contributors.map(({ key }) => key).sort(), ["ada", "itsluneri", "lin"]);
  const luneri = contributors.find(({ key }) => key === "itsluneri");
  assert.equal(luneri?.name, "Luneri");
  assert.equal(luneri?.url, "https://github.com/itsluneri");
  assert.equal(luneri?.avatarUrl, "https://avatars.githubusercontent.com/u/208310261?v=4");
  assert.equal(contributors.find(({ key }) => key === "lin")?.url, "https://github.com/lin");
  assert.equal(contributors.find(({ key }) => key === "ada")?.avatarUrl, "https://avatars.githubusercontent.com/ada");
});

test("rejects invalid API data and failed requests", async (t) => {
  t.mock.method(console, "warn", () => {});
  assert.deepEqual((await getContributors(async () => Response.json([{ number: "wrong" }]))).map(({ key }) => key), ["itsluneri"]);
  assert.deepEqual((await getContributors(async () => new Response(null, { status: 503 }))).map(({ key }) => key), ["itsluneri"]);
});
