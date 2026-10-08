import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("homepage keeps its four sections, search shortcuts, and new-tab library links", () => {
  const html = readFileSync(new URL("../.next/server/app/index.html", import.meta.url), "utf8");
  const markup = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
  const sections = ["home-title", "details-title", "roadmap-title", "<footer"];
  let previous = -1;
  for (const section of sections) {
    const position = markup.indexOf(section);
    assert.ok(position > previous, `Missing or misplaced section: ${section}`);
    previous = position;
  }
  const headline = markup.match(/<h1\b[^>]*id="home-title"[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? "";
  assert.equal(headline.replace(/<br\/>/g, " ").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim(), "The libraries that developers love, all in one place");
  for (const query of ["React", "Animation", "Tailwind", "Components", "Icons", "3D"]) {
    assert.ok(markup.includes(`href="/libraries?q=${query}"`), `Missing search shortcut: ${query}`);
  }
  const libraryLinks = [...markup.matchAll(/<a\b[^>]*href="\/libraries\/[^>]+>/g)];
  assert.ok(libraryLinks.length >= 3);
  for (const link of libraryLinks) {
    assert.ok(link[0].includes('target="_blank"'));
    assert.ok(link[0].includes('rel="noopener noreferrer"'));
  }
  assert.ok(markup.includes('href="https://git.cafe/screen/col/issues/new"'));
});

test("homepage components only use classes the CSS module defines", () => {
  const read = (path) => readFileSync(new URL(path, import.meta.url), "utf8");
  const defined = new Set([...read("../components/HomePage.module.css").matchAll(/\.([a-zA-Z][\w-]*)/g)].map(([, name]) => name));
  for (const file of ["HomeHero", "HomeStory", "RollText", "RoadmapSection", "SiteFooter", "WhatsInsideSection"]) {
    for (const [, name] of read(`../components/${file}.tsx`).matchAll(/styles\.(\w+)/g)) {
      assert.ok(defined.has(name), `${file}.tsx uses styles.${name}, which HomePage.module.css does not define`);
    }
  }
});

test("the pinned story's media query matches between HomeStory and its stylesheet", () => {
  const read = (path) => readFileSync(new URL(path, import.meta.url), "utf8");
  const query = read("../components/HomeStory.tsx").match(/const PINNED_QUERY = "([^"]+)"/)?.[1];
  assert.ok(query, "PINNED_QUERY is missing");
  assert.ok(read("../components/HomePage.module.css").includes(`@media ${query} {`), `HomePage.module.css has no @media ${query} block`);
});
