import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://react-aria.adobe.com",
  repoUrl: "https://github.com/adobe/react-spectrum",
  install: [
    { label: "npm", command: "npm install react-aria-components" },
  ],
  gettingStarted: [
    "Install react-aria-components in an existing React project. Read https://react-aria.adobe.com/getting-started before choosing imports and component parts.",
    "Import a component from its documented subpath, for example import { Button } from 'react-aria-components/Button', and render it in an existing view.",
    "Add styles with your existing CSS, CSS Modules, Tailwind CSS, or CSS-in-JS solution. React Aria does not include default styles; its documented states and data attributes expose interaction state for styling.",
    "Build complex controls by composing the parts shown in their documentation. Check keyboard access, focus management, and labels before adding more controls.",
  ],
  preview: {
    src: "https://react-aria.adobe.com/server/ReactAriaOpenGraph.c58014f0.webp",
    alt: "React Aria Components documentation share image",
  },
  agentPrompt: `Add React Aria Components to this existing React project.

React Aria Components provides unstyled, accessible React controls from Adobe. The behavior, keyboard interactions, and internationalization come from the library; visual styles stay in this project.

Steps:
1. Read https://react-aria.adobe.com/getting-started and the documentation for the control I need. Preserve the existing framework, styling solution, and components.
2. Install the package with this project's package manager, for example "npm install react-aria-components". Do not install React Spectrum's styled component package instead.
3. Use the documented imports and compose the required parts. A first button can use import { Button } from 'react-aria-components/Button'; complex controls such as Select also need their documented trigger, popover, and list parts.
4. Style the control with the project's existing CSS or styling system. Use the documented states and data attributes rather than duplicating interaction state.
5. Verify labels, keyboard navigation, focus behavior, and the project's relevant checks. Report which files changed and which checks ran.

Check current APIs at https://react-aria.adobe.com before writing code. Do not invent parts, props, compatibility constraints, or default styles.`,
  pricing: {
    model: "free",
    summary: "React Aria Components is free and open source under Apache 2.0.",
    license: "Apache-2.0",
    source: "https://github.com/adobe/react-spectrum/blob/main/LICENSE",
  },
} satisfies LibraryDetails;
