import type { PreviewStoriesEntry } from "./types";

/**
 * Preview stories for MUI. Rules are enforced by `lib/preview-stories.test.mjs`:
 * a granted permission record, component names as the verified component index
 * spells them, scenes with rendered templates, and every npm package the render
 * imports listed in `dependencies`.
 *
 * "Number Field" and "Menubar" are documented on mui.com as compositions over
 * `@base-ui/react` (MUI ships no export for them), and "Transfer List" as a
 * composition of MUI's own List, Checkbox, and Button parts; their renders
 * follow those pages, so the extra package appears in `dependencies` where used.
 */
export const previewStoriesEntry: PreviewStoriesEntry = {
  slug: "mui",
  permission: {
    status: "granted",
    source: "https://github.com/mui/material-ui/blob/master/LICENSE + https://github.com/mui/mui-x#licensing (Community packages MIT)",
    checkedAt: "2026-10-10T00:00:00Z",
  },
  stories: [
    {
      component: "Autocomplete",
      scene: "Rapid Prototyping",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "Button",
      scene: "Landing Pages",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "ButtonGroup",
      scene: "Rapid Prototyping",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "Checkbox",
      scene: "Rapid Prototyping",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "Fab",
      scene: "Dashboards",
      dependencies: ["@mui/material", "@mui/icons-material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "Number Field",
      scene: "Rapid Prototyping",
      dependencies: ["@mui/material", "@mui/icons-material", "@base-ui/react", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "RadioGroup",
      scene: "Rapid Prototyping",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "Rating",
      scene: "Marketing Sites",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "Select",
      scene: "Rapid Prototyping",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "Slider",
      scene: "Rapid Prototyping",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "Switch",
      scene: "Rapid Prototyping",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "TextField",
      scene: "Rapid Prototyping",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "Transfer List",
      scene: "Dashboards",
      dependencies: ["@mui/material", "@mui/icons-material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "ToggleButton",
      scene: "Rapid Prototyping",
      dependencies: ["@mui/material", "@mui/icons-material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "Avatar",
      scene: "Marketing Sites",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "Badge",
      scene: "Dashboards",
      dependencies: ["@mui/material", "@mui/icons-material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "Chip",
      scene: "Dashboards",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "Divider",
      scene: "Rapid Prototyping",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "List",
      scene: "Dashboards",
      dependencies: ["@mui/material", "@mui/icons-material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "Table",
      scene: "Dashboards",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "Tooltip",
      scene: "Dashboards",
      dependencies: ["@mui/material", "@mui/icons-material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "Typography",
      scene: "Landing Pages",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "Alert",
      scene: "Dashboards",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "Dialog",
      scene: "Rapid Prototyping",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "CircularProgress",
      scene: "Dashboards",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "LinearProgress",
      scene: "Dashboards",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "Skeleton",
      scene: "Dashboards",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "Snackbar",
      scene: "Dashboards",
      dependencies: ["@mui/material", "@mui/icons-material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "Accordion",
      scene: "Landing Pages",
      dependencies: ["@mui/material", "@mui/icons-material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "AppBar",
      scene: "Landing Pages",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "Card",
      scene: "Dashboards",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "Paper",
      scene: "Rapid Prototyping",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "BottomNavigation",
      scene: "Dashboards",
      dependencies: ["@mui/material", "@mui/icons-material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "Breadcrumbs",
      scene: "Dashboards",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "Drawer",
      scene: "Dashboards",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "Link",
      scene: "Marketing Sites",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "Menu",
      scene: "Dashboards",
      dependencies: ["@mui/material", "@mui/icons-material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "Menubar",
      scene: "Dashboards",
      dependencies: ["@mui/material", "@base-ui/react", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "Pagination",
      scene: "Dashboards",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "SpeedDial",
      scene: "Dashboards",
      dependencies: ["@mui/material", "@mui/icons-material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "Stepper",
      scene: "Rapid Prototyping",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "Tabs",
      scene: "Dashboards",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "Box",
      scene: "Rapid Prototyping",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled"],
    },
  ],
};
