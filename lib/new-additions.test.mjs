import assert from "node:assert/strict";
import { test } from "node:test";
import { isNewAddition, NEW_ADDITION_DURATION_MS } from "./new-additions.ts";

const addedAt = "2026-10-03T12:00:00Z";
const added = Date.parse(addedAt);

test("new additions last exactly seven days from their addition timestamp", () => {
  assert.equal(isNewAddition(addedAt, added), true);
  assert.equal(isNewAddition(addedAt, added + NEW_ADDITION_DURATION_MS - 1), true);
  assert.equal(isNewAddition(addedAt, added + NEW_ADDITION_DURATION_MS), false);
  assert.equal(isNewAddition(addedAt, added + NEW_ADDITION_DURATION_MS + 1), false);
});

test("undated, invalid, and future additions are not marked new", () => {
  assert.equal(isNewAddition(undefined, added), false);
  assert.equal(isNewAddition("invalid", added), false);
  assert.equal(isNewAddition(addedAt, added - 1), false);
});
