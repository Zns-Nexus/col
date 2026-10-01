import assert from "node:assert/strict";
import test from "node:test";
import { getRoadmap } from "./github-roadmap.ts";

const issue = (number, overrides = {}) => ({
  number,
  title: `Issue ${number}`,
  html_url: `https://github.com/screen-gd/Col/issues/${number}`,
  state: "open",
  state_reason: null,
  labels: [{ name: "enhancement" }],
  closed_at: null,
  ...overrides,
});

const shipped = (number, day, overrides = {}) =>
  issue(number, { state: "closed", state_reason: "completed", closed_at: `2026-09-${day}T00:00:00Z`, ...overrides });

const numbers = (milestones) => milestones?.map(({ number }) => number);

test("uses feature issues: latest shipped in date order, then in-progress and oldest open work", async () => {
  const roadmap = await getRoadmap(async () => Response.json([
    shipped(1, "10"), shipped(2, "20"), shipped(3, "15"), shipped(4, "25"),
    shipped(5, "26", { state_reason: "not_planned" }),
    shipped(6, "27", { labels: [{ name: "bug" }] }),
    issue(7), issue(8), issue(9, { labels: [{ name: "enhancement" }, { name: "in progress" }] }), issue(10),
    issue(11, { pull_request: {} }),
  ]));

  assert.deepEqual(numbers(roadmap?.shipped), [3, 2, 4]);
  assert.deepEqual(numbers(roadmap?.upcoming), [9, 7, 8]);
  assert.equal(roadmap?.upcoming[0].status, "in-progress");
});

test("a roadmap label hand-picks the milestones", async () => {
  const roadmap = await getRoadmap(async () => Response.json([
    shipped(1, "10"), shipped(2, "20", { labels: [{ name: "roadmap" }] }),
    issue(3), issue(4, { labels: [{ name: "roadmap" }] }),
  ]));

  assert.deepEqual(numbers(roadmap?.shipped), [2]);
  assert.deepEqual(numbers(roadmap?.upcoming), [4]);
});

test("returns null for invalid API data and failed requests", async () => {
  assert.equal(await getRoadmap(async () => Response.json([{ number: "wrong" }])), null);
  assert.equal(await getRoadmap(async () => new Response(null, { status: 503 })), null);
});
