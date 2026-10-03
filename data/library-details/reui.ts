import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://reui.io/docs/get-started",
  repoUrl: "https://github.com/keenthemes/reui",
  preview: {
    src: "https://reui.io/og?title=Free%20Shadcn%20UI%20Components%2C%20Blocks%2C%20Icons%2C%20Templates%20%26%20MCP&description=Free%20Shadcn%20UI%20components%20and%20pro%20blocks%20for%20React%20and%20Tailwind%20CSS%2C%20plus%20hand-crafted%20icons%2C%20templates%20and%20a%20hosted%20MCP%20server%20for%20coding%20agents.&v=dpl_DEcWbDEap8UuDo5vtPZYzyfdChok",
    alt: "ReUI official preview",
  },
  registrySetup: {
    description: "Use a React 19 project with Tailwind CSS v4 and shadcn/ui initialized. Merge the @reui registry into components.json. Its style must be a supported base/variant pairing, such as base-nova or radix-lyra; choose the pairing that matches the project's primitives before installing.",
    config: `{
  "registries": {
    "@reui": "https://reui.io/r/{style}/{name}.json"
  }
}`,
  },
  install: [
    { label: "Initialize shadcn/ui if needed", command: "npx shadcn@latest init" },
    { label: "Add the data grid", command: "npx shadcn@latest add @reui/data-grid" },
  ],
  gettingStarted: [
    "The current setup guide targets React 19 and Tailwind CSS v4. Initialize shadcn/ui if needed, then configure the @reui registry without replacing other components.json settings.",
    "ReUI resolves `{style}` from components.json. Supported styles pair `base` or `radix` with a documented variant, for example `base-nova` or `radix-lyra`. See https://reui.io/docs/registry before selecting a style.",
    "Install through the shadcn CLI, for example `npx shadcn@latest add @reui/data-grid`. The @reui namespace is a registry alias, not an npm package scope for this library.",
    "Use the documentation for the selected primitive variant. Data Grid's Base UI page is https://reui.io/docs/components/base/data-grid; its generated files and dependencies must match the documented API.",
    "Merge ReUI's additional semantic CSS tokens using https://reui.io/docs/styling. Free components need no license key; paid registry items require the authenticated configuration documented at https://reui.io/docs/license-setup.",
  ],
  agentPrompt: `Add ReUI (https://reui.io) to this existing React project.

ReUI distributes editable components through the shadcn registry, with Base UI and Radix UI variants. The @reui alias is not the library's npm scope.

Prerequisites:
- React 19, Tailwind CSS v4, and shadcn/ui configured with components.json.
- Inspect existing primitives, style, aliases, and CSS tokens before selecting a ReUI variant.

Steps:
1. Read https://reui.io/docs/get-started, https://reui.io/docs/registry, and https://reui.io/docs/styling. Find the requested component in the official catalog or https://reui.io/llms.txt.
2. Initialize shadcn/ui only if missing. Merge "@reui": "https://reui.io/r/{style}/{name}.json" into the existing registries object.
3. Select a documented style pairing matching the app's primitives, such as base-nova or radix-lyra. Keep the rest of components.json intact and assess existing components before changing its style.
4. Add the requested item through shadcn, for example npx shadcn@latest add @reui/data-grid. Do not npm install @reui/data-grid. Inspect the generated files and installed dependencies before importing them.
5. Use the component docs for the same Base UI or Radix variant. Merge the required CSS tokens and integrate with the app's state and data types. Run typecheck and build.

Free c-* components and their supporting primitives are publicly available. Use paid blocks or icons only when the project has the required license, following https://reui.io/docs/license-setup. Keep secrets out of source files.`,
  pricing: {
    model: "freemium",
    summary: "The open source components are free under MIT; premium blocks, icons, and templates require a paid license.",
    license: "MIT",
    source: "https://reui.io/pricing",
  },
} satisfies LibraryDetails;
