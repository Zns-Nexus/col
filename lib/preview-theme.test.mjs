import assert from "node:assert/strict";
import { test } from "node:test";
import { parseThemeTokens, serializeThemeTokens, themeStyle } from "./preview-theme.ts";

// The seam under test is `parseThemeTokens`: the only path from a preview
// URL's query to the CSS custom properties Col renders with. It must accept
// real theme values and refuse anything that could break out of one.

test("theme tokens round-trip through a query string", () => {
  const tokens = { primary: "oklch(0.5 0.2 240)", border: "#303030" };
  const query = serializeThemeTokens(tokens);
  assert.deepEqual(parseThemeTokens(query), tokens);
});

test("every semantic theme token Col renders with is accepted", () => {
  const tokens = parseThemeTokens(
    "background=%23000&foreground=%23fff&card=%23050505&card-foreground=%23fff&primary=%230800ff&primary-foreground=%23fff&secondary=%231a1a1a&secondary-foreground=%23fff&muted=%231a1a1a&muted-foreground=%23b3b3b3&accent=%23202020&accent-foreground=%23fff&border=%23303030",
  );
  assert.equal(Object.keys(tokens).length, 13);
  assert.equal(tokens.primary, "#0800ff");
});

test("values that could break out of a CSS custom property are refused", () => {
  assert.deepEqual(parseThemeTokens("primary=red%3B%20background%3Aurl(x)"), {});
  assert.deepEqual(parseThemeTokens("primary=url(https%3A%2F%2Fevil.example)"), {});
  assert.deepEqual(parseThemeTokens("primary=%7B%7D"), {});
});

test("unknown token names are ignored", () => {
  assert.deepEqual(parseThemeTokens("evil-name=red&primary=%23fff"), { primary: "#fff" });
});

test("radius and typography tokens reach their own CSS variables", () => {
  const tokens = parseThemeTokens("radius=12px&font=Nunito%2C%20sans-serif");
  assert.deepEqual(tokens, { radius: "12px", font: "Nunito, sans-serif" });
  assert.deepEqual(themeStyle(tokens), { "--radius": "12px", "--font-sans": "Nunito, sans-serif" });
});

test("unsafe radius and font values are refused", () => {
  assert.deepEqual(parseThemeTokens("radius=12px%3B%20x%3A1"), {});
  assert.deepEqual(parseThemeTokens("radius=calc(1%2B2)"), {});
  assert.deepEqual(parseThemeTokens("font=url(x)"), {});
  assert.deepEqual(parseThemeTokens("radius=huge"), {});
});
