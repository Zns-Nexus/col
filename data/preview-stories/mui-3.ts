import type { PreviewStoriesEntry } from "./types";

/**
 * Preview stories for MUI, chunk 3 of 3: the 42 MUI X components assigned in
 * `scripts/coverage/mui-3.txt`. Ten of them are gaps — commercially licensed
 * MUI X Pro/Premium components that ship from `@mui/x-date-pickers-pro`,
 * `@mui/x-charts-pro`, or `@mui/x-scheduler-premium`, never from the installed
 * community packages, so they render nothing and stay out of `stories`:
 * Time Range Field, DateTimeRangePicker, Date Time Range Field, Heatmap,
 * FunnelChart, SankeyChart, CandlestickChart, RadialBarChart, RadialLineChart,
 * EventTimelinePremium. The other 32 come from the community MIT packages
 * `@mui/x-charts`, `@mui/x-tree-view`, `@mui/x-scheduler`, and `@mui/x-chat`,
 * each verified against the package's own export list.
 */
export const previewStoriesEntry: PreviewStoriesEntry = {
  slug: "mui",
  permission: {
    status: "granted",
    source: "https://github.com/mui/mui-x#licensing (Community packages MIT)",
    checkedAt: "2026-10-10T00:00:00Z",
  },
  stories: [
    {
      component: "BarChart",
      scene: "Dashboards",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled", "@mui/x-charts"],
    },
    {
      component: "LineChart",
      scene: "Dashboards",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled", "@mui/x-charts"],
    },
    {
      component: "PieChart",
      scene: "Dashboards",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled", "@mui/x-charts"],
    },
    {
      component: "ScatterChart",
      scene: "Dashboards",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled", "@mui/x-charts"],
    },
    {
      component: "SparkLineChart",
      scene: "Dashboards",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled", "@mui/x-charts"],
    },
    {
      component: "Gauge",
      scene: "Dashboards",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled", "@mui/x-charts"],
    },
    {
      component: "RadarChart",
      scene: "Dashboards",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled", "@mui/x-charts"],
    },
    {
      component: "SimpleTreeView",
      scene: "Rapid Prototyping",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled", "@mui/x-tree-view"],
    },
    {
      component: "RichTreeView",
      scene: "Dashboards",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled", "@mui/x-tree-view"],
    },
    {
      component: "EventCalendar",
      scene: "Dashboards",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled", "@mui/x-scheduler"],
    },
    {
      component: "StandaloneAgendaView",
      scene: "Dashboards",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled", "@mui/x-scheduler"],
    },
    {
      component: "StandaloneDayView",
      scene: "Dashboards",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled", "@mui/x-scheduler"],
    },
    {
      component: "StandaloneEvent",
      scene: "Rapid Prototyping",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled", "@mui/x-scheduler"],
    },
    {
      component: "StandaloneMonthView",
      scene: "Dashboards",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled", "@mui/x-scheduler"],
    },
    {
      component: "StandaloneWeekView",
      scene: "Dashboards",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled", "@mui/x-scheduler"],
    },
    {
      component: "ChatBox",
      scene: "Rapid Prototyping",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled", "@mui/x-chat"],
    },
    {
      component: "ChatConversation",
      scene: "Rapid Prototyping",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled", "@mui/x-chat"],
    },
    {
      component: "ChatConversationList",
      scene: "Dashboards",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled", "@mui/x-chat"],
    },
    {
      component: "ChatConversationHeader",
      scene: "Rapid Prototyping",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled", "@mui/x-chat", "@mui/icons-material"],
    },
    {
      component: "ChatMessageList",
      scene: "Rapid Prototyping",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled", "@mui/x-chat"],
    },
    {
      component: "ChatMessageGroup",
      scene: "Rapid Prototyping",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled", "@mui/x-chat"],
    },
    {
      component: "ChatComposer",
      scene: "Rapid Prototyping",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled", "@mui/x-chat"],
    },
    {
      component: "ChatSuggestions",
      scene: "Marketing Sites",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled", "@mui/x-chat"],
    },
    {
      component: "ChatTypingIndicator",
      scene: "Rapid Prototyping",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled", "@mui/x-chat"],
    },
    {
      component: "ChatUnreadMarker",
      scene: "Rapid Prototyping",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled", "@mui/x-chat"],
    },
    {
      component: "ChatMessageSkeleton",
      scene: "Rapid Prototyping",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled", "@mui/x-chat"],
    },
    {
      component: "ChatScrollToBottomAffordance",
      scene: "Rapid Prototyping",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled", "@mui/x-chat"],
    },
    {
      component: "ChatDateDivider",
      scene: "Rapid Prototyping",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled", "@mui/x-chat"],
    },
    {
      component: "ChatMessageSources",
      scene: "Marketing Sites",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled", "@mui/x-chat"],
    },
    {
      component: "ChatMessageSource",
      scene: "Marketing Sites",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled", "@mui/x-chat"],
    },
    {
      component: "ChatCodeBlock",
      scene: "Rapid Prototyping",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled", "@mui/x-chat"],
    },
    {
      component: "ChatConfirmation",
      scene: "Rapid Prototyping",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled", "@mui/x-chat"],
    },
  ],
};
