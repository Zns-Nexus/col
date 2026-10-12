import assert from "node:assert/strict";
import { test } from "node:test";
import { parseSample, serializeSample } from "./preview-sample.ts";

// The seam under test is `parseSample`: the one path from a preview URL's
// query to the sample strings a story renders. It must accept the short
// display strings stories replace and refuse anything that is not one.

test("sample data round-trips through a query string", () => {
  const sample = { primaryLabel: "Start free", title1: "Monthly revenue" };
  assert.deepEqual(parseSample(serializeSample(sample)), sample);
});

test("malformed or oversized sample data is refused", () => {
  assert.deepEqual(parseSample("sample=not-json"), {});
  assert.deepEqual(parseSample(`sample=${encodeURIComponent('{"a":3}')}`), {});
  assert.deepEqual(parseSample(`sample=${encodeURIComponent(`{"${"x".repeat(60)}":"y"}`)}`), {});
});

test("sample values render as plain text data, never as structure", () => {
  const parsed = parseSample(`sample=${encodeURIComponent('{"title1":"<b>Revenue</b>"}')}`);
  assert.deepEqual(parsed, { title1: "<b>Revenue</b>" }, "React escapes the value at render; the data itself stays intact");
});
