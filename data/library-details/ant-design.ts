import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://ant.design/docs/react/introduce",
  repoUrl: "https://github.com/ant-design/ant-design",
  install: [
    { label: "Install with npm", command: "npm install antd --save" },
    { label: "Install a pinned major (v6)", command: "npm install --save antd@6" },
  ],
  gettingStarted: [
    "Use a React 18 or newer project (antd 6 requires React >= 18) with Node.js 16 or above; for a fresh app run `npm create vite antd-demo`, then `cd antd-demo && npm install`.",
    "Add the library with `npm install antd --save` (yarn and pnpm work too).",
    "Import components straight from the package, for example `import { Button } from 'antd'` and render `<Button type=\"primary\">Button</Button>`; ES module tree shaking drops the code you do not use.",
    "Wrap your app root in `ConfigProvider` from antd to set global theme tokens, component overrides and locale, for example `<ConfigProvider theme={{ token: { colorPrimary: '#00b96b' } }}>...</ConfigProvider>`.",
    "Pick components from the docs component list (Form, Table, DatePicker, message and the rest) and copy the demo code from each component page.",
  ],
  preview: {
    src: "https://gw.alipayobjects.com/zos/rmsportal/rlpTLlbMzTNYuZGGCVYM.png",
    alt: "Ant Design official site preview image",
  },
  agentPrompt: `Set up Ant Design (antd) in this existing React project.

Prerequisites: a React app on React 18 or newer (antd 6 requires react and react-dom >= 18), Node.js 16 or above, and TypeScript if the project already uses it. This is a component library import, not a CLI-driven generator, so no init command is needed.

Steps:
1. Install the package from the project root: "npm install antd --save" (yarn add antd or pnpm add antd also work).
2. Import a first component to confirm setup, for example in App: import { Button } from 'antd' and render <Button type="primary">Button</Button>.
3. Wrap the application root in ConfigProvider from antd so global settings apply everywhere, for example <ConfigProvider theme={{ token: { colorPrimary: '#1677ff' } }}><App /></ConfigProvider>. Use the same provider with a locale import such as "antd/locale/fr_FR" for internationalization.
4. Add more components as needed by importing them from "antd" (Form, Table, DatePicker, message). Tree shaking keeps unused code out of the bundle.
5. For date pickers with a non-default locale, also import the matching dayjs locale file, since antd uses dayjs for date handling.

Consult the official docs before deviating: getting started at https://ant.design/docs/react/getting-started, Vite setup at https://ant.design/docs/react/use-with-vite, theming at https://ant.design/docs/react/customize-theme, and the v5 to v6 migration notes at https://ant.design/docs/react/migration-v6.`,
  pricing: {
    model: "free",
    summary: "Ant Design is free and open source, with no paid tier.",
    license: "MIT",
    source: "https://github.com/ant-design/ant-design/blob/master/LICENSE",
  },
} satisfies LibraryDetails;
