/**
 * The MCP Apps view behind `render_component`: renders the TSX module the agent
 * wrote, live inside the user's chat.
 *
 * The tool's `_meta.ui.resourceUri` points here. The host loads this HTML in a
 * sandboxed iframe and passes the tool arguments to it through the official
 * ext-apps `App` bridge. The view then compiles the TSX with sucrase, points the
 * module's imports at esm.sh, and mounts its default export with React. Col
 * bundles nothing: every package loads from esm.sh on demand. Hosts without MCP
 * Apps (terminal clients) only receive the text result.
 */
export const PREVIEW_WIDGET_URI = "ui://col/render-component.html";

/** The standard MCP Apps UI resource mime type. */
export const PREVIEW_WIDGET_MIME = "text/html;profile=mcp-app";

/** Script and style origins the view loads from. Hosts deny everything else (MCP Apps default CSP). */
export const PREVIEW_WIDGET_CSP = { resourceDomains: ["https://esm.sh", "https://cdn.jsdelivr.net"] };

/** React is pinned once in the import map so the preview and every package share one copy. */
const REACT_VERSION = "19.3.0";

/**
 * Where one import in the agent's code loads from. React stays a bare specifier
 * so the import map resolves it; packages and package stylesheets come from
 * esm.sh with React kept external. Local files cannot be served, so they throw
 * and the message tells the agent to inline them.
 *
 * ponytail: embedded in the view via `toString()`, so it must stay a
 * self-contained arrow function with no outside references.
 */
export const resolveImport = (specifier: string): string => {
  if (/^(react|react-dom)(\/|$)/.test(specifier)) return specifier;
  if (specifier.startsWith("https://")) return specifier;
  if (/^(\.|\/|@\/|~\/)/.test(specifier)) {
    throw new Error(`"${specifier}" is a local file; inline its code in the module instead`);
  }
  if (specifier.endsWith(".css")) return `https://esm.sh/${specifier}`;
  return `https://esm.sh/${specifier}?external=react,react-dom`;
};

/**
 * Turns the compiled module into one that mounts itself: its default export
 * becomes a local and is handed to the view's `__colMount`. Inline module
 * scripts cannot export to the page, and the host CSP forbids blob: imports.
 *
 * ponytail: embedded via `toString()` like `resolveImport`. The regex takes the
 * first `export default`; `export { X as default }` asks for the plain form.
 */
export const mountable = (js: string): string => {
  const marker = /\bexport\s+default\s+/;
  if (!marker.test(js)) {
    throw new Error("The module needs `export default` of a React component");
  }
  return `${js.replace(marker, "const __ColComponent = ")}\nwindow.__colMount(__ColComponent);\n`;
};

export function previewWidgetHtml(): string {
  const importMap = {
    imports: {
      react: `https://esm.sh/react@${REACT_VERSION}`,
      "react/": `https://esm.sh/react@${REACT_VERSION}/`,
      "react-dom": `https://esm.sh/react-dom@${REACT_VERSION}?external=react`,
      "react-dom/client": `https://esm.sh/react-dom@${REACT_VERSION}/client?external=react`,
    },
  };
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Component preview</title>
<script type="importmap">${JSON.stringify(importMap)}</script>
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4.3.3"></script>
<style>
  :root { color-scheme: light dark; }
  body { margin: 0; padding: 16px; background: transparent; color: light-dark(#000, #fff); font: 14px/1.5 system-ui, sans-serif; }
  #status { margin: 0; white-space: pre-wrap; }
</style>
</head>
<body>
<p id="status">Rendering…</p>
<div id="root"></div>
<script type="module">
  import { App, applyDocumentTheme } from "https://esm.sh/@modelcontextprotocol/ext-apps@2.0.3/app-with-deps";
  import { createElement } from "react";
  import { createRoot } from "react-dom/client";
  import { transform } from "https://esm.sh/sucrase@3.35.1";
  import { init, parse } from "https://esm.sh/es-module-lexer@3.0.2/js";

  const resolveImport = ${resolveImport.toString()};
  const mountable = ${mountable.toString()};

  const status = document.getElementById("status");
  const app = new App({ name: "Col component preview", version: "1.0.0" });
  const root = createRoot(document.getElementById("root"), { onUncaughtError: (error) => fail(error) });

  // A failed render is shown to the user and reported to the agent, so it can fix the code and call again.
  function fail(error) {
    const message = String((error && error.message) || error);
    status.textContent = message;
    status.hidden = false;
    // Hosts may not support model-context updates; the on-screen message still stands.
    Promise.resolve()
      .then(() => app.updateModelContext({ content: [{ type: "text", text: "render_component failed in the chat: " + message }] }))
      .catch(() => {});
  }

  window.__colMount = (Component) => {
    status.hidden = true;
    root.render(createElement(Component));
  };
  window.addEventListener("error", (event) => fail(event.error || event.message));
  window.addEventListener("unhandledrejection", (event) => fail(event.reason));

  async function render(code) {
    const js = transform(code, { transforms: ["typescript", "jsx"], jsxRuntime: "automatic", production: true }).code;
    await init();
    const [imports] = parse(js);
    let out = "";
    let last = 0;
    for (const entry of imports) {
      if (entry.type !== "static" && entry.type !== "reexport-star") continue;
      const url = resolveImport(entry.specifier);
      if (entry.specifier.endsWith(".css")) {
        // Browsers cannot import CSS as a module: load it as a stylesheet and drop the statement.
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = url;
        document.head.append(link);
        out += js.slice(last, entry.importStart);
        last = entry.importEnd;
      } else {
        out += js.slice(last, entry.start) + url;
        last = entry.end;
      }
    }
    const script = document.createElement("script");
    script.type = "module";
    script.textContent = mountable(out + js.slice(last));
    script.addEventListener("error", () => fail("A package failed to load from esm.sh"));
    document.body.append(script);
  }

  app.ontoolinput = (params) => {
    const code = params.arguments && params.arguments.code;
    if (typeof code !== "string") return fail("render_component was called without code");
    render(code).catch(fail);
  };
  app.onhostcontextchanged = (context) => {
    if (context.theme) applyDocumentTheme(context.theme);
  };

  await app.connect();
  const context = app.getHostContext();
  if (context && context.theme) applyDocumentTheme(context.theme);
</script>
</body>
</html>
`;
}
