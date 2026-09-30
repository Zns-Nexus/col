import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import ts from "typescript";

const require = createRequire(import.meta.url);
const source = readFileSync(new URL("../components/LibraryDetailParts.tsx", import.meta.url), "utf8");
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
});

test("expansion follows the footer on every height change and disconnects on collapse", () => {
  for (const expanded of [true, false]) {
    const effects = [];
    const observers = [];
    const scrolls = [];
    const states = [];
    const body = { scrollHeight: 800, firstElementChild: {} };
    const footer = { scrollIntoView: (options) => scrolls.push(options) };
    const refs = [body, footer];
    const exports = {};
    const mockRequire = (id) => {
      if (id === "react") return {
        useState: (initial) => {
          const current = initial === false ? expanded : initial;
          return [current, (value) => states.push(typeof value === "function" ? value(current) : value)];
        },
        useRef: () => ({ current: refs.shift() }),
        useLayoutEffect: (effect) => effects.push(effect),
      };
      if (id === "lucide-react") return { ChevronDown: () => null };
      if (id === "./CopyButton") return { CopyButton: () => null };
      return require(id);
    };
    class ResizeObserver {
      constructor(callback) { this.callback = callback; observers.push(this); }
      observe(target) { this.target = target; }
      disconnect() { this.disconnected = true; }
    }
    new Function("require", "exports", "ResizeObserver", "window", outputText)(mockRequire, exports, ResizeObserver, {
      matchMedia: () => ({ matches: false }),
    });
    const card = exports.AgentPrompt({ prompt: "Set up this library." });
    const cleanups = effects.map((effect) => effect());
    const follower = observers.find((observer) => observer.target === body);
    if (expanded) {
      assert.ok(follower, "Observe the animated body, not just its text's final height");
      assert.equal(card.props.children[1].props.ref.current, footer);
      for (let frame = 0; frame < 3; frame++) follower.callback();
      assert.deepEqual(scrolls, Array(3).fill({ behavior: "instant", block: "nearest" }));
    } else {
      assert.equal(follower, undefined);
      assert.deepEqual(scrolls, []);
    }
    card.props.children[1].props.children[0].props.onClick();
    assert.equal(states.at(-1), !expanded);
    for (const cleanup of cleanups) cleanup?.();
    assert.ok(observers.every((observer) => observer.disconnected));
  }
});
