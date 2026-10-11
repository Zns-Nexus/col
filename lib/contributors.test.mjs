import assert from "node:assert/strict";
import test from "node:test";
import { getContributors } from "./contributors.ts";

const github = (login, overrides = {}) => ({ kind: "github", login, accountType: "user", avatarUrl: `/avatars/v1/${login}`, linkedProfile: null, ...overrides });
const local = (handle) => ({ kind: "local", handle, avatarUrl: null });
const pull = (number, author, state = "merged") => ({ number, state, author });

test("follows the cursor and counts merged pull requests per person", async () => {
  const urls = [];
  const contributors = await getContributors(async (url) => {
    urls.push(String(url));
    return urls.length === 1
      ? Response.json({ items: [pull(1, github("ada")), pull(2, github("bot", { accountType: "bot" })), pull(3, github("ada"), "closed")], next: "cursor" })
      : Response.json({
        items: [
          pull(4, github("lin", { linkedProfile: { handle: "lin", avatarUrl: null } })),
          pull(5, local("lin")),
          pull(6, { kind: "unavailable" }),
        ],
        next: null,
      });
  });

  assert.match(urls[1], /after=cursor/);
  assert.deepEqual(contributors.map(({ name, contributions }) => [name, contributions]), [["lin", 2], ["ada", 1]]);
  assert.equal(contributors[0].url, "https://git.cafe/lin");
  assert.equal(contributors[1].url, "https://github.com/ada");
  assert.equal(contributors[1].avatarUrl, "https://git.cafe/avatars/v1/ada");
});

test("rejects invalid API data and failed requests", async () => {
  assert.deepEqual(await getContributors(async () => Response.json({ items: [{ number: "wrong" }], next: null })), []);
  assert.deepEqual(await getContributors(async () => new Response(null, { status: 503 })), []);
});
