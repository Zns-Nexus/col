/**
 * The renderer behind `render_component`: turns the TSX module the agent wrote
 * into a live React render inside the user's chat. It ships in two shells that
 * share one runtime (`runtimeScript`):
 *
 * - `previewWidgetHtml()`: the MCP Apps view. The tool's `_meta.ui.resourceUri`
 *   points here; MCP Apps hosts load it in a sandboxed iframe and pass it the
 *   tool arguments through the official ext-apps `App` bridge.
 * - `previewFragmentHtml(code)`: a self-contained HTML fragment with the code
 *   embedded, returned by `render_component({ format: "html" })` for hosts that
 *   cannot show MCP Apps, such as Claude Code. It isolates the render in an
 *   `<iframe srcdoc>` so the host's CSS cannot restyle it. The agent passes it
 *   to an inline HTML widget tool, or saves it as a file and opens it in a browser.
 *
 * The runtime compiles the TSX with sucrase, points the module's imports at
 * esm.sh, and mounts its default export with React. Col bundles nothing: every
 * package loads from esm.sh, with `?deps=` pinning React so the render and every
 * package share one React without an import map.
 */
export const PREVIEW_WIDGET_URI = "ui://col/render-component.html";

/**
 * What turns `previewFragmentHtml` output into a standalone page. The charset
 * keeps non-ASCII text intact; the color scheme makes the page canvas follow the
 * system theme, which Tailwind's `dark:` variant also follows, so dark styles
 * never land on a light page.
 */
export const FRAGMENT_PAGE_PREFIX = '<!doctype html><meta charset="utf-8"><meta name="color-scheme" content="light dark">';

/** The standard MCP Apps UI resource mime type. */
export const PREVIEW_WIDGET_MIME = "text/html;profile=mcp-app";

/** Script and style origins the renderer loads from. Hosts deny everything else (MCP Apps default CSP). */
export const PREVIEW_WIDGET_CSP = { resourceDomains: ["https://esm.sh", "https://cdn.jsdelivr.net"] };

const REACT_VERSION = "19.3.0";

/** Pinned runtime modules. Each version is at least two weeks old at the time it was pinned. */
const RUNTIME = {
  react: `https://esm.sh/react@${REACT_VERSION}`,
  reactDomClient: `https://esm.sh/react-dom@${REACT_VERSION}/client?deps=react@${REACT_VERSION}`,
  sucrase: "https://esm.sh/sucrase@3.35.1",
  lexer: "https://esm.sh/es-module-lexer@3.0.2/js",
  tailwind: "https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4.3.3",
  apps: "https://esm.sh/@modelcontextprotocol/ext-apps@2.0.3/app-with-deps",
} as const;


/**
 * Where one import in the agent's code loads from. React and react-dom resolve
 * to the pinned copies; other packages come from esm.sh with React pinned by
 * `?deps=`, which esm.sh resolves to those same module URLs. Local files cannot
 * be served, so they throw and the message tells the agent to inline them.
 *
 * ponytail: embedded in the runtime via `toString()`, so it must stay a
 * self-contained arrow function with no outside references.
 */
export const resolveImport = (specifier: string, reactVersion: string): string => {
  const react = specifier.match(/^react(\/.*)?$/);
  if (react) return `https://esm.sh/react@${reactVersion}${react[1] ?? ""}`;
  const reactDom = specifier.match(/^react-dom(\/.*)?$/);
  if (reactDom) return `https://esm.sh/react-dom@${reactVersion}${reactDom[1] ?? ""}?deps=react@${reactVersion}`;
  if (specifier.startsWith("https://")) return specifier;
  if (/^(\.|\/|@\/|~\/)/.test(specifier)) {
    throw new Error(`"${specifier}" is a local file; inline its code in the module instead`);
  }
  if (specifier.endsWith(".css")) return `https://esm.sh/${specifier}`;
  return `https://esm.sh/${specifier}?deps=react@${reactVersion},react-dom@${reactVersion}`;
};

/**
 * Turns the compiled module into one that mounts itself: its default export
 * becomes a local and is handed to the runtime's `__colMount`. Inline module
 * scripts cannot export to the page, and host CSPs forbid blob: imports.
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

/**
 * The shared runtime: defines `colRuntime(report?)`, which loads React and the
 * compiler, then resolves to `{ render(code), fail(error) }`. Failures show in
 * `#col-status`; `report` also forwards them, e.g. to the agent's context.
 * Uses only dynamic `import()`, so it runs in classic and module scripts alike.
 */
function runtimeScript(): string {
  return `
async function colRuntime(report) {
  const resolveImport = ${resolveImport.toString()};
  const mountable = ${mountable.toString()};
  const [{ createElement }, { createRoot }, { transform }, { init, parse }] = await Promise.all([
    import(${JSON.stringify(RUNTIME.react)}),
    import(${JSON.stringify(RUNTIME.reactDomClient)}),
    import(${JSON.stringify(RUNTIME.sucrase)}),
    import(${JSON.stringify(RUNTIME.lexer)}),
  ]);
  const status = document.getElementById("col-status");
  function fail(error) {
    const message = String((error && error.message) || error);
    status.textContent = message;
    status.hidden = false;
    if (report) report(message);
  }
  const root = createRoot(document.getElementById("col-root"), { onUncaughtError: (error) => fail(error) });
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
      const url = resolveImport(entry.specifier, ${JSON.stringify(REACT_VERSION)});
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
  return { render, fail };
}
`;
}

/**
 * The document every render runs in: Tailwind, a status line for failures, and
 * the mount point. `script` boots the runtime for the shell that uses it.
 */
function previewPage(script: string): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="color-scheme" content="light dark" />
<title>Component preview</title>
<script src="${RUNTIME.tailwind}"></script>
<style>
  body { margin: 0; padding: 16px; background: transparent; color: light-dark(#000, #fff); font: 14px/1.5 system-ui, sans-serif; }
  #col-status { margin: 0; white-space: pre-wrap; }
</style>
</head>
<body>
<p id="col-status">Rendering…</p>
<div id="col-root"></div>
${script}
</body>
</html>
`;
}

/** The MCP Apps view: reads the agent's code from the tool input and reports failures back to the agent. */
export function previewWidgetHtml(): string {
  return previewPage(`<script type="module">
  import { App, applyDocumentTheme } from "${RUNTIME.apps}";
${runtimeScript()}
  const app = new App({ name: "Col component preview", version: "1.0.0" });
  // A failed render is shown to the user and reported to the agent, so it can fix the code and call again.
  // Hosts may not support model-context updates; the on-screen message still stands.
  const report = (message) =>
    Promise.resolve()
      .then(() => app.updateModelContext({ content: [{ type: "text", text: "render_component failed in the chat: " + message }] }))
      .catch(() => {});
  const runtime = colRuntime(report);

  app.ontoolinput = (params) => {
    const code = params.arguments && params.arguments.code;
    runtime
      .then(({ render, fail }) => (typeof code === "string" ? render(code).catch(fail) : fail("render_component was called without code")))
      .catch((error) => {
        const message = String((error && error.message) || error);
        document.getElementById("col-status").textContent = message;
        report(message);
      });
  };
  app.onhostcontextchanged = (context) => {
    if (context.theme) applyDocumentTheme(context.theme);
  };

  await app.connect();
  const context = app.getHostContext();
  if (context && context.theme) applyDocumentTheme(context.theme);
</script>`);
}

/**
 * The same render with the code embedded, for hosts without MCP Apps. It is an
 * HTML fragment, which inline HTML widget tools accept, holding the page in an
 * `<iframe srcdoc>`: the frame is a clean document, so a host's own CSS (Claude
 * Code's widget restyles every input) cannot reach the component. The frame
 * inherits the host's script allowlist, and reports its height so it fits the
 * render. Saved after `FRAGMENT_PAGE_PREFIX`, it also opens in any browser.
 * The code rides a JSON string with `<` escaped, so it cannot close its script
 * element early.
 */
export function previewFragmentHtml(code: string): string {
  const embedded = JSON.stringify(code).replace(/</g, "\\u003c");
  const page = previewPage(`<script>
${runtimeScript()}
colRuntime()
  .then(({ render, fail }) => render(${embedded}).catch(fail))
  .catch((error) => {
    document.getElementById("col-status").textContent = String((error && error.message) || error);
  });
new ResizeObserver(() => parent.postMessage({ colHeight: Math.ceil(document.body.getBoundingClientRect().height) }, "*")).observe(document.body);
</script>`);
  const srcdoc = page.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
  return `<iframe data-col-preview title="Component preview" srcdoc="${srcdoc}" style="display:block;width:100%;height:160px;border:0"></iframe>
<script>
addEventListener("message", (event) => {
  const frame = document.querySelector("iframe[data-col-preview]");
  if (frame && event.source === frame.contentWindow && typeof event.data?.colHeight === "number") frame.style.height = event.data.colHeight + "px";
});
</script>
`;
}
