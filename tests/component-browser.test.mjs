import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { runInNewContext } from "node:vm";
import ts from "typescript";
import { createComponentSearch } from "../lib/component-directory.ts";

test("selecting a component changes its embedded demo, and the column search filters the list", () => {
  const components = [
    { name: "Button", url: "https://example.com/button" },
    { name: "Dialog", url: "https://example.com/dialog" },
  ];
  const state = [];
  let hook = 0;
  // The field owns its query in the page, so the test drives it the way the user does.
  const SearchFieldStub = () => {};
  const module = { exports: {} };
  const source = readFileSync(new URL("../components/ComponentsExplorer.tsx", import.meta.url), "utf8").replace(/^import .*;$/gm, "");
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.React },
  }).outputText;
  runInNewContext(compiled, {
    exports: module.exports,
    React: { createElement: (type, props, ...children) => ({ type, props: props ?? {}, children: children.flat() }) },
    useEffect: () => {},
    useMemo: (fn) => fn(),
    useState: (initial) => {
      const index = hook++;
      if (!(index in state)) state[index] = initial;
      return [state[index], (next) => { state[index] = typeof next === "function" ? next(state[index]) : next; }];
    },
    libraries: [{ name: "Example", slug: "example", url: "https://example.com" }],
    componentIndex: { example: components },
    createComponentSearch,
    SearchField: SearchFieldStub,
    styles: {}, Button: () => {}, LibraryLogo: () => {}, SearchX: () => {}, ArrowUpRight: () => {},
  });
  const render = () => {
    hook = 0;
    return module.exports.ComponentsExplorer({});
  };
  const nodes = (node) => !node || typeof node !== "object" ? [] : [node, ...node.children.flatMap(nodes)];
  const frame = (tree) => nodes(tree).find(({ type }) => type === "iframe");
  const field = (tree) => nodes(tree).find(({ type }) => type === SearchFieldStub);
  let tree = render();
  assert.equal(frame(tree).props.src, components[0].url);
  nodes(tree).filter(({ props }) => "aria-pressed" in props)[1].props.onClick();
  tree = render();
  assert.equal(frame(tree).props.src, components[1].url);
  assert.ok(frame(tree).props.title.includes("Dialog"));
  assert.equal(nodes(tree).find(({ type }) => type === "a").props.href, components[1].url);
  assert.equal(field(tree).props.placeholder, "Search components");
  field(tree).props.onChange("button");
  assert.equal(frame(render()).props.src, components[0].url);
  assert.ok(field(render()), "the column keeps its own search field");
  field(render()).props.onChange("missing");
  assert.equal(frame(render()), undefined);
});
