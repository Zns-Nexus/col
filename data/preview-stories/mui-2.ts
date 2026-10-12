import type { PreviewStoriesEntry } from "./types";

/**
 * Preview stories for MUI (chunk 2 of 3). Component names follow the verified
 * component index exactly, and every npm package a render imports is listed
 * per story; `scripts/check-story.mjs` enforces both before merge.
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
      component: "Container",
      scene: "Landing Pages",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "Grid",
      scene: "Dashboards",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "Stack",
      scene: "Rapid Prototyping",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "ImageList",
      scene: "Marketing Sites",
      dependencies: ["@mui/material", "@mui/icons-material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "Backdrop",
      scene: "Dashboards",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "ClickAwayListener",
      scene: "Rapid Prototyping",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "Modal",
      scene: "Rapid Prototyping",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "NoSsr",
      scene: "Dashboards",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "Popover",
      scene: "Dashboards",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "Popper",
      scene: "Dashboards",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "Portal",
      scene: "Rapid Prototyping",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "TextareaAutosize",
      scene: "Rapid Prototyping",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "Masonry",
      scene: "Marketing Sites",
      dependencies: ["@mui/lab", "@mui/material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "Timeline",
      scene: "Dashboards",
      dependencies: ["@mui/lab", "@mui/material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "Icon",
      scene: "Marketing Sites",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "SvgIcon",
      scene: "Dashboards",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "Collapse",
      scene: "Dashboards",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "Fade",
      scene: "Rapid Prototyping",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "Grow",
      scene: "Dashboards",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "Slide",
      scene: "Marketing Sites",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "Zoom",
      scene: "Marketing Sites",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "IconButton",
      scene: "Dashboards",
      dependencies: ["@mui/material", "@mui/icons-material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "NativeSelect",
      scene: "Rapid Prototyping",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "Radio",
      scene: "Rapid Prototyping",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "ToggleButtonGroup",
      scene: "Dashboards",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "AvatarGroup",
      scene: "Dashboards",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "SwipeableDrawer",
      scene: "Rapid Prototyping",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "MobileStepper",
      scene: "Rapid Prototyping",
      dependencies: ["@mui/material", "@mui/icons-material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "TablePagination",
      scene: "Dashboards",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "DataGrid",
      scene: "Dashboards",
      dependencies: ["@mui/x-data-grid", "@mui/material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "DatePicker",
      scene: "Rapid Prototyping",
      dependencies: ["@mui/x-date-pickers", "date-fns", "@mui/material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "DateField",
      scene: "Rapid Prototyping",
      dependencies: ["@mui/x-date-pickers", "date-fns", "@mui/material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "DateCalendar",
      scene: "Rapid Prototyping",
      dependencies: ["@mui/x-date-pickers", "date-fns", "@mui/material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "TimePicker",
      scene: "Rapid Prototyping",
      dependencies: ["@mui/x-date-pickers", "date-fns", "@mui/material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "TimeField",
      scene: "Rapid Prototyping",
      dependencies: ["@mui/x-date-pickers", "date-fns", "@mui/material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "TimeClock",
      scene: "Rapid Prototyping",
      dependencies: ["@mui/x-date-pickers", "date-fns", "@mui/material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "DigitalClock",
      scene: "Rapid Prototyping",
      dependencies: ["@mui/x-date-pickers", "date-fns", "@mui/material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "DateTimePicker",
      scene: "Dashboards",
      dependencies: ["@mui/x-date-pickers", "date-fns", "@mui/material", "@emotion/react", "@emotion/styled"],
    },
    {
      component: "DateTimeField",
      scene: "Rapid Prototyping",
      dependencies: ["@mui/x-date-pickers", "date-fns", "@mui/material", "@emotion/react", "@emotion/styled"],
    },
  ],
};
