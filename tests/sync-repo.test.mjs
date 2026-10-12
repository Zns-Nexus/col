import assert from "node:assert/strict";
import { test } from "node:test";
import { syncRepo } from "../scripts/sync-repo.mjs";

const commit = "a".repeat(40);
const backup = "b".repeat(40);

function runner({ dirty = false, blocked = false, fail } = {}) {
  const calls = [];
  let merged = false;
  let stashed = false;
  const execute = (command, args) => {
    calls.push([command, ...args]);
    if (fail && args.includes(fail)) throw new Error(`Failed ${fail}`);
    if (command === "cafe") {
      if (args[1] === "view") return JSON.stringify({ data: { resource: { state: merged ? "merged" : "open", draft: false, targetBranch: "main" } } });
      if (args[1] === "ready") return JSON.stringify({ data: { merge: { state: blocked ? "blocked" : "ready", permitted: true, blockers: [] }, checks: { pending: 0, failing: 0 } } });
      if (args[1] === "merge") merged = true;
      return JSON.stringify({ data: {} });
    }
    if (args[0] === "branch") return "local-work";
    if (args[0] === "status") return args.includes("--porcelain") && dirty && !stashed ? " M local.txt" : "";
    if (args[0] === "stash" && args[1] === "push") stashed = true;
    if (args[0] === "rev-parse") return args[1] === "stash@{0}" ? backup : commit;
    if (args[0] === "ls-remote") return `${commit}\trefs/heads/main`;
    return "";
  };
  return { calls, execute };
}

test("merge sync preserves local edits and pushes only the fetched commit after checks", (t) => {
  t.mock.method(console, "log", () => {});
  const { calls, execute } = runner({ dirty: true });
  syncRepo("63", execute);
  const index = (command, argument) => calls.findIndex((call) => call[0] === command && (command === "git" ? call[1] === argument : call.includes(argument)));
  assert.ok(index("cafe", "ready") < index("cafe", "merge"));
  assert.ok(index("npm", "test") < index("git", "push"));
  assert.deepEqual(calls[index("git", "push")], ["git", "push", "https://github.com/Zns-Nexus/col.git", `${commit}:refs/heads/main`]);
  assert.ok(calls.some((call) => call.join(" ") === `git stash apply --index ${backup}`));
  assert.ok(calls.every((call) => !call.includes("--force") && !call.includes("drop")));
});

test("invalid input and merge blockers stop before merging or pushing", () => {
  const invalid = runner();
  assert.throws(() => syncRepo("63 & whoami", invalid.execute), /Usage/);
  assert.equal(invalid.calls.length, 0);
  const blocked = runner({ blocked: true });
  assert.throws(() => syncRepo("63", blocked.execute), /blockers/);
  assert.ok(blocked.calls.every((call) => !call.includes("merge") && !call.includes("push")));
});

test("failed tests prevent pushing and sync-only never merges a PR", (t) => {
  t.mock.method(console, "log", () => {});
  const failed = runner({ dirty: true, fail: "test" });
  assert.throws(() => syncRepo(undefined, failed.execute), /Failed test/);
  assert.ok(failed.calls.every((call) => call[0] !== "cafe" && call[1] !== "push"));
  assert.ok(failed.calls.some((call) => call.join(" ") === `git stash apply --index ${backup}`));
});
