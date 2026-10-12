import { spawnSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { resolve } from "node:path";
import { repo } from "../lib/repo.ts";

const root = fileURLToPath(new URL("../", import.meta.url));
const destination = "https://github.com/Zns-Nexus/col.git";

function run(command, args, capture = false) {
  // .cmd arguments below are fixed strings or validated PR numbers, never arbitrary shell input.
  const batch = process.platform === "win32" && command !== "git";
  const result = spawnSync(batch ? "cmd.exe" : command, batch ? ["/d", "/s", "/c", [command, ...args].join(" ")] : args, {
    cwd: root,
    encoding: "utf8",
    stdio: capture ? ["ignore", "pipe", "inherit"] : "inherit",
  });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${command} ${args.join(" ")} failed. Sync stopped.`);
  return result.stdout?.trim() ?? "";
}

/** Merges an optional PR and mirrors git.cafe main, preserving uncommitted work in a backup stash. */
export function syncRepo(pullNumber, execute = run) {
  if (pullNumber !== undefined && !/^[1-9]\d*$/.test(pullNumber)) throw new Error("Usage: npm run repo:sync -- <PR-number> (omit the number for sync only)");
  const git = (...args) => execute("git", args, true);
  const cafe = (...args) => JSON.parse(execute("cafe", [...args, "--repo", "screen/col", "--host", "https://git.cafe/api", "--agent", "--no-input", "--no-browser", "--json"], true)).data;
  if (!git("branch", "--show-current")) throw new Error("Check out a local branch before syncing.");
  let stash;
  try {
    if (git("status", "--porcelain")) {
      git("stash", "push", "--include-untracked", "-m", "repo-sync backup");
      stash = git("rev-parse", "stash@{0}");
    }
    if (pullNumber !== undefined) {
      const pull = cafe("pr", "view", pullNumber).resource;
      if (pull.targetBranch !== "main" || pull.draft || !["open", "merged"].includes(pull.state)) throw new Error("The PR must be open and ready for main, or already merged into main.");
      if (pull.state === "open") {
        const readiness = cafe("pr", "ready", pullNumber);
        if (!readiness.merge.permitted || readiness.merge.state !== "ready" || readiness.merge.blockers.length || readiness.checks.failing || readiness.checks.pending) throw new Error("git.cafe reports merge blockers or unfinished checks.");
        cafe("pr", "merge", pullNumber, "--strategy", "merge");
        if (cafe("pr", "view", pullNumber).resource.state !== "merged") throw new Error("Merge is not complete. Inspect it on git.cafe before retrying.");
      }
    }
    git("fetch", repo.cloneUrl, "main");
    const source = git("rev-parse", "FETCH_HEAD");
    if (!/^[a-f0-9]{40,64}$/.test(source)) throw new Error("git.cafe returned an invalid commit ID.");
    git("rebase", source);
    execute("npm", ["ci", "--no-audit", "--no-fund"]);
    execute("npm", ["run", "typecheck"]);
    execute("npm", ["test"]);
    // Mirror only published git.cafe code, even when the current branch has local commits.
    git("push", destination, `${source}:refs/heads/main`);
    const remote = git("ls-remote", destination, "refs/heads/main").split(/\s+/)[0];
    if (remote !== source) throw new Error("GitHub main does not match the fetched git.cafe commit.");
    console.log(`GitHub main matches git.cafe at ${source.slice(0, 7)}.`);
  } finally {
    if (stash) {
      console.log(`Local edits are backed up in stash ${stash}.`);
      const rebaseActive = git("status").includes("rebase in progress");
      if (!rebaseActive && !git("status", "--porcelain")) {
        git("stash", "apply", "--index", stash);
        console.log("Local edits restored. Backup stash retained.");
      } else {
        console.error(`Finish the interrupted Git operation, then restore edits with: git stash apply --index ${stash}`);
      }
    }
  }
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  try {
    if (process.argv.length > 3) throw new Error("Pass at most one PR number.");
    syncRepo(process.argv[2]);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
