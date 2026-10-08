import assert from "node:assert/strict";
import test from "node:test";
import { getRoadmap } from "./roadmap.ts";

const issue = (number, overrides = {}) => ({
  number,
  title: `Issue ${number}`,
  stateType: "unstarted",
  labels: [{ name: "enhancement" }],
  closedAt: null,
  ...overrides,
});

const shipped = (number, day, overrides = {}) =>
  issue(number, { stateType: "completed", closedAt: `2026-09-${day}T00:00:00Z`, ...overrides });

const page = (items) => async () => Response.json({ items, next: null });

const numbers = (milestones) => milestones?.map(({ number }) => number);

test("uses feature issues: latest shipped in date order, then in-progress and oldest open work", async () => {
  const roadmap = await getRoadmap(page([
    shipped(1, "10"), shipped(2, "20"), shipped(3, "15"), shipped(4, "25"),
    shipped(5, "26", { stateType: "canceled" }),
    shipped(6, "27", { labels: [{ name: "bug" }] }),
    issue(7), issue(8, { stateType: "backlog" }), issue(9, { stateType: "started" }), issue(10),
    issue(11, { stateType: "triage" }), issue(12, { labels: [{ name: "enhancement" }, { name: "in progress" }] }),
  ]));

  assert.deepEqual(numbers(roadmap?.shipped), [3, 2, 4]);
  assert.deepEqual(numbers(roadmap?.upcoming), [9, 12, 7]);
  assert.equal(roadmap?.upcoming[0].status, "in-progress");
  assert.equal(roadmap?.upcoming[0].url, "https://git.cafe/screen/col/issues/9");
});

test("a roadmap label hand-picks the milestones", async () => {
  const roadmap = await getRoadmap(page([
    shipped(1, "10"), shipped(2, "20", { labels: [{ name: "roadmap" }] }),
    issue(3), issue(4, { labels: [{ name: "roadmap" }] }),
  ]));

  assert.deepEqual(numbers(roadmap?.shipped), [2]);
  assert.deepEqual(numbers(roadmap?.upcoming), [4]);
});

test("returns null for invalid API data and failed requests", async () => {
  assert.equal(await getRoadmap(page([{ number: "wrong" }])), null);
  assert.equal(await getRoadmap(async () => new Response(null, { status: 503 })), null);
});
