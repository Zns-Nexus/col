import { siteUrl } from "./site.ts";

/**
 * The MCP Apps preview widget: one generic UI resource that frames Col's
 * shared preview page. The tool's `_meta.ui.resourceUri` points here; the host
 * fetches this template, hands the view its tool result over the standard
 * bridge, and the view frames the preview URL that result carries. Text and
 * image content accompany every result, so a host without the MCP Apps
 * extension loses only the interactivity.
 */
export const PREVIEW_WIDGET_URI = "ui://col/preview.html";

export function previewWidgetHtml(): string {
  const previewOrigin = `${siteUrl}/preview/`;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Component preview</title>
<style>
  html, body { margin: 0; height: 100%; background: #000; }
  iframe { border: 0; width: 100%; height: 100%; }
  #fallback { color: #fff; font: 14px system-ui; padding: 16px; }
</style>
</head>
<body>
<iframe id="preview" title="Component preview" sandbox="allow-scripts" hidden></iframe>
<div id="fallback">Waiting for the tool result…</div>
<script>
  const frame = document.getElementById("preview");
  const fallback = document.getElementById("fallback");
  const pending = new Map();
  let nextId = 1;
  function request(method, params) {
    const id = nextId++;
    window.parent.postMessage({ jsonrpc: "2.0", id: id, method: method, params: params }, "*");
    return new Promise(function (resolve) { pending.set(id, resolve); });
  }
  window.addEventListener("message", function (event) {
    if (event.source !== window.parent) return;
    const message = event.data;
    if (!message || message.jsonrpc !== "2.0") return;
    if (message.id !== undefined && pending.has(message.id)) {
      pending.get(message.id)(message.result);
      pending.delete(message.id);
      return;
    }
    if (message.method !== "ui/notifications/tool-result") return;
    const structured = message.params && message.params.structuredContent;
    const url = structured && structured.preview && structured.preview.url;
    if (typeof url === "string" && url.indexOf(${JSON.stringify(previewOrigin)}) === 0) {
      frame.src = url;
      frame.hidden = false;
      fallback.hidden = true;
    } else {
      fallback.textContent = "No preview is recorded for this component.";
    }
  });
  request("ui/initialize", {});
</script>
</body>
</html>
`;
}
