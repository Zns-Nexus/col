/**
 * Preview theming — the one path from a preview URL's query to the CSS custom
 * properties Col renders with.
 *
 * Tokens are the semantic colour set the site theme defines in `:root`, so a
 * preview styled with a project's tokens re-colours exactly the way that
 * project's own theme would. Values are accepted only when they cannot break
 * out of a CSS custom property: a colour literal or a colour function, nothing
 * else. Unknown token names and unsafe values are dropped rather than rendered.
 */

export const THEME_TOKENS = [
  "background",
  "foreground",
  "card",
  "card-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "border",
] as const;

export type ThemeToken = (typeof THEME_TOKENS)[number];
export type ThemeTokens = Partial<Record<ThemeToken, string>>;

const COLOR_FUNCTION = "(oklch|hsl|rgb|lab|lch|color)\\([a-zA-Z0-9.,%/#\\s-]*\\)";
const VALUE_PATTERN = new RegExp(`^(#[0-9a-fA-F]{3,8}|[a-zA-Z]+|${COLOR_FUNCTION})$`);

function isSafeValue(value: string): boolean {
  if (value.length > 100 || /[;{}"'\\<>]/.test(value) || /url\(/i.test(value)) return false;
  return VALUE_PATTERN.test(value);
}

function isThemeToken(name: string): name is ThemeToken {
  return (THEME_TOKENS as readonly string[]).includes(name);
}

/** Parse a preview URL's query string into the accepted theme tokens. */
export function parseThemeTokens(query: string | URLSearchParams): ThemeTokens {
  const params = typeof query === "string" ? new URLSearchParams(query) : query;
  const tokens: ThemeTokens = {};
  for (const [name, value] of params) {
    if (isThemeToken(name) && isSafeValue(value)) tokens[name] = value;
  }
  return tokens;
}

/** Serialize accepted tokens into a query string; unknown or unsafe entries are dropped. */
export function serializeThemeTokens(tokens: Record<string, string>): string {
  const params = new URLSearchParams();
  for (const [name, value] of Object.entries(tokens)) {
    if (isThemeToken(name) && isSafeValue(value)) params.set(name, value);
  }
  return params.toString();
}

/** The tokens as CSS custom properties for a wrapper element's inline style. */
export function themeStyle(tokens: ThemeTokens): Record<string, string> {
  const style: Record<string, string> = {};
  for (const [name, value] of Object.entries(tokens)) {
    if (value !== undefined) style[`--${name}`] = value;
  }
  return style;
}
