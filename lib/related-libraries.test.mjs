import assert from "node:assert/strict";
import { test } from "node:test";
import { relatedLibraries } from "./related-libraries.ts";

const library = (slug, category, stacks, useCases, tags = []) => ({ name: slug, slug, description: "", url: `https://${slug}.dev`, category, stacks, useCases, tags });

const subject = library("react-ui", "Component Library", ["React", "Tailwind CSS"], ["Dashboards", "Landing Pages"]);
const registry = [
  subject,
  library("vue-ui", "Component Library", ["Vue"], ["Dashboards", "Landing Pages"]),
  library("plain-ui", "Component Library", ["React"], ["Rapid Prototyping"]),
  library("close-ui", "Component Library", ["React", "Tailwind CSS"], ["Dashboards", "Landing Pages"]),
  library("react-motion", "Animation & Motion", ["React"], ["Landing Pages"]),
  library("vanilla-motion", "Animation & Motion", ["Vanilla JS"], ["Dashboards"]),
  library("svelte-motion", "Animation & Motion", ["Svelte"], ["Landing Pages"]),
  library("unrelated-icons", "Icons", ["React"], ["Accessibility-first"]),
];

const slugs = (libraries) => libraries.map(({ slug }) => slug);

test("alternatives share the category and a framework, closest match first", () => {
  assert.deepEqual(slugs(relatedLibraries(subject, registry).alternatives), ["close-ui", "plain-ui"]);
});

test("complements come from other categories with a shared purpose, and Vanilla JS fits any framework", () => {
  assert.deepEqual(slugs(relatedLibraries(subject, registry).pairsWith), ["react-motion", "vanilla-motion"]);
});
