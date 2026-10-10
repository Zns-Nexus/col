/**
 * Preview theming — the one path from a preview URL's query to the CSS custom
 * properties Col renders with.
 *
 * Tokens are the theme surface the site exposes: semantic colours, the corner
 * radius, and the font stack. A preview styled with a project's tokens
 * re-colours and re-shapes exactly the way that project's own theme would.
 * Values are accepted only in the shape their token kind allows — a colour
 * literal or colour function, a length, or a font stack — and never anything
 * that could break out of a CSS custom property. Unknown token names and
 * unsafe values are dropped rather than rendered.
 */

const TOKEN_KINDS = {
  background: "color",
  foreground: "color",
  card: "color",
  "card-foreground": "color",
  primary: "color",
  "primary-foreground": "color",
  secondary: "color",
  "secondary-foreground": "color",
  muted: "color",
  "muted-foreground": "color",
  accent: "color",
  "accent-foreground": "color",
  border: "color",
  radius: "length",
  font: "font",
} as const;

export const THEME_TOKENS = Object.keys(TOKEN_KINDS) as ThemeToken[];
export type ThemeToken = keyof typeof TOKEN_KINDS;
export type ThemeTokens = Partial<Record<ThemeToken, string>>;

/** The CSS custom property each token sets. */
function cssVar(name: ThemeToken): string {
  if (name === "radius") return "--radius";
  if (name === "font") return "--font-sans";
  return `--${name}`;
}

const COLOR_FUNCTION = "(oklch|hsl|rgb|lab|lch|color)\\([a-zA-Z0-9.,%/#\\s-]*\\)";
const VALUE_PATTERNS = {
  color: new RegExp(`^(#[0-9a-fA-F]{3,8}|[a-zA-Z]+|${COLOR_FUNCTION})$`),
  length: /^\d+(\.\d+)?(px|rem|em)$/,
  font: /^[a-zA-Z0-9 ,\-_.]+$/,
} as const;

function isSafeValue(name: ThemeToken, value: string): boolean {
  if (value.length > 100 || /[;{}"'\\<>]/.test(value) || /url\(/i.test(value)) return false;
  return VALUE_PATTERNS[TOKEN_KINDS[name]].test(value);
}

function isThemeToken(name: string): name is ThemeToken {
  return Object.hasOwn(TOKEN_KINDS, name);
}

/** Parse a preview URL's query string into the accepted theme tokens. */
export function parseThemeTokens(query: string | URLSearchParams): ThemeTokens {
  const params = typeof query === "string" ? new URLSearchParams(query) : query;
  const tokens: ThemeTokens = {};
  for (const [name, value] of params) {
    if (isThemeToken(name) && isSafeValue(name, value)) tokens[name] = value;
  }
  return tokens;
}

/** Serialize accepted tokens into a query string; unknown or unsafe entries are dropped. */
export function serializeThemeTokens(tokens: Record<string, string>): string {
  const params = new URLSearchParams();
  for (const [name, value] of Object.entries(tokens)) {
    if (isThemeToken(name) && isSafeValue(name, value)) params.set(name, value);
  }
  return params.toString();
}

/** The tokens as CSS custom properties for a wrapper element's inline style. */
export function themeStyle(tokens: ThemeTokens): Record<string, string> {
  const style: Record<string, string> = {};
  for (const [name, value] of Object.entries(tokens)) {
    if (value !== undefined) style[cssVar(name as ThemeToken)] = value;
  }
  return style;
}
