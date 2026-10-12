import assert from "node:assert/strict";
import { test } from "node:test";
import { createComponentSearch } from "./component-directory.ts";

test("component search returns individual matches, ranks exact names, and keeps libraries out of component evidence", () => {
  const library = { name: "Example", slug: "example", tags: ["calendar"] };
  const search = createComponentSearch([library], {
    example: [
      { name: "Date Picker", url: "https://example.com/date-picker", kind: "full-pattern" },
      { name: "Button Group", url: "https://example.com/button-group", kind: "full-pattern" },
      { name: "Button", url: "https://example.com/button", kind: "full-pattern" },
      { name: "Command", aliases: ["cmdk"], url: "https://example.com/command", kind: "full-pattern" },
    ],
  });
  assert.equal(search("").length, 4);
  assert.deepEqual(search("button").map(({ component }) => component.name), ["Button", "Button Group"]);
  assert.equal(search("cmdk")[0].component.name, "Command");
  assert.equal(search("datepicker")[0].component.name, "Date Picker");
  assert.deepEqual(search("date button"), []);
  assert.deepEqual(search("calendar"), []);
  assert.deepEqual(search("Example"), []);
  assert.equal(search("button")[0].library.slug, "example");
});
