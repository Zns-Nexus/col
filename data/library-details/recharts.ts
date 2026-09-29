import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://recharts.github.io/en-US/guide",
  repoUrl: "https://github.com/recharts/recharts",
  install: [
    { label: "npm", command: "npm install recharts" },
    { label: "pnpm", command: "pnpm add recharts" },
    { label: "yarn", command: "yarn add recharts" },
    {
      label: "UMD (script tag)",
      command:
        '<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script> <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script> <script src="https://unpkg.com/recharts/umd/Recharts.js"></script>',
    },
  ],
  gettingStarted: [
    "Recharts is a React chart library that renders SVG. Install it with `npm install recharts`; the peer dependencies are `react` and `react-dom` on `^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0`. The current major is v3 (3.10.1), which requires React 16.8+, TypeScript 5.x, Node.js 18+ and an ES6 build target.",
    "The docs have moved: recharts.org now redirects to https://recharts.github.io. The walkthrough at https://recharts.github.io/en-US/guide/getting-started builds a `LineChart` in five steps: pick the chart type, add `XAxis`/`YAxis`/`CartesianGrid`/`Legend`, set props, add `Tooltip`, then customize with a custom `tick` render function.",
    "A chart renders nothing unless it has a size. On Recharts 3.3 and later, set sizing in CSS on the chart's own `style` prop and add the `responsive` boolean: `<LineChart responsive style={{ width: '100%', maxWidth: 600, aspectRatio: 1.618 }} data={data}>`. The `responsive` prop is what re-measures the chart when its parent resizes, and it works inside flexbox and CSS grid layouts.",
    'On older Recharts versions, wrap the chart in `ResponsiveContainer` instead, for example `<ResponsiveContainer width="100%" height={400}>`. The wrapper needs a parent element with a defined size, otherwise it measures zero and renders empty. Details at https://recharts.github.io/en-US/guide/sizes.',
    "Optionally add theming and devtools. Theming is experimental: wrap charts in `<RechartsThemeProvider value={lightTheme}>` (or `darkTheme` / `emptyTheme`), all exported from `recharts`. `<RechartsDevtools />` from the separate `@recharts/devtools` package adds a hook inspector in development and is not required for charts to work.",
  ],
  preview: {
    src: "https://opengraph.githubassets.com/2/recharts/recharts",
    alt: "Recharts repository social preview",
  },
  agentPrompt: `Add Recharts (https://recharts.github.io/en-US/guide), a React chart library that renders SVG, to this existing project.

Prerequisites:
- This is a React project. Recharts peer-depends on react and react-dom (^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0). Check the installed React version before installing.
- The current major version is v3. If this project is already on Recharts 2.x, read the migration guide at https://github.com/recharts/recharts/wiki/3.0-migration-guide first, because v3 removed several props.
- The docs moved: recharts.org redirects to recharts.github.io. Use the new domain for all doc URLs.

Steps:
1. Install the library with the package manager this project already uses: npm install recharts, pnpm add recharts, or yarn add recharts. Do not wire in a UMD build for a bundled app.
2. Add a first chart to an existing page, following the order in the walkthrough at https://recharts.github.io/en-US/guide/getting-started: a chart root such as LineChart with a data array of plain objects, then children such as Line, XAxis, YAxis, CartesianGrid, Legend and Tooltip. Series read columns through the dataKey prop.
3. Give the chart a size. This is the most common failure: a chart with neither width nor height renders nothing at all. On Recharts 3.3+ set it on the chart's style prop and add the responsive boolean, e.g. <LineChart responsive style={{ width: '100%', maxWidth: 600, aspectRatio: 1.618 }} data={data}>. Use <ResponsiveContainer width="100%" height={400}> only on older versions, and make sure its parent element has a defined size. Full details at https://recharts.github.io/en-US/guide/sizes.
4. Style series and axes with explicit props (stroke, fill, strokeWidth, type, tick, formatter). Explicit props always win over any theme, so set them directly instead of fighting the defaults. Per-component options are at https://recharts.github.io/en-US/guide/customize and the component reference at https://recharts.github.io/en-US/api.
5. For multi-series color and shared typography, wrap charts in <RechartsThemeProvider value={lightTheme}>, passing darkTheme or emptyTheme instead, and spread a built-in theme to override only the sections you need. Theming is experimental and its shape may change in a minor release; charts with no provider keep their historical defaults. See https://recharts.github.io/en-US/guide/theming.
6. Confirm the app builds and that the chart resizes correctly. Optionally install @recharts/devtools and add <RechartsDevtools /> during development to inspect internal chart state.

Version 3 notes worth checking against existing chart code:
- activeIndex was removed in 3.0. Tooltip now controls interaction; use its defaultIndex, active, trigger, content and cursor props instead. See https://recharts.github.io/en-US/guide/activeIndex.
- Custom components can be placed directly inside a chart now, and <Customized /> is optional. Label must keep CustomLabel.displayName = 'Label' if you wrap it.
- accessibilityLayer defaults to true in v3, so keyboard navigation and a11y attributes are on unless you pass accessibilityLayer={false}.
- CartesianGrid gained xAxisId / yAxisId. If you use non-default axis ids, the grid will not render without them.
- SVG z-order follows JSX render order, so put higher-priority elements last (Tooltip before Legend).
- In TypeScript projects, data and dataKey are untyped by default. From 3.8 you can pass generics to components, e.g. <Area<MyData, number>>, to type-check dataKeys. See https://recharts.github.io/en-US/guide/typescript.

Use only components, props and URLs documented on https://recharts.github.io, and re-check the docs rather than assuming 2.x-era APIs still apply.`,
} satisfies LibraryDetails;
