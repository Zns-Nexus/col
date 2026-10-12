import * as React from "react";
import {
  Center,
  Group,
  MantineProvider,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  AreaChart,
  BarChart,
  BarsList,
  BubbleChart,
  BulletChart,
  CandlestickChart,
  CompositeChart,
  DonutChart,
  FunnelChart,
  GaugeChart,
  Heatmap,
  LineChart,
  MatrixChart,
  PieChart,
  RadarChart,
  RadialBarChart,
  SankeyChart,
  ScatterChart,
  Sparkline,
  SunburstChart,
  Treemap,
  WaffleChart,
} from "@mantine/charts";
import { MiniCalendar } from "@mantine/dates";
import { CodeHighlight, JsonViewer } from "@mantine/code-highlight";
import type { ScheduleEventData, ScheduleResourceData } from "@mantine/schedule";
import {
  AgendaView,
  DayView,
  MobileMonthView,
  MonthView,
  ResourcesDayView,
  ResourcesMonthView,
  ResourcesSchedule,
  ResourcesWeekView,
  Schedule,
  WeekView,
  YearView,
} from "@mantine/schedule";
import { Notifications, notifications } from "@mantine/notifications";
import { Spotlight } from "@mantine/spotlight";
import { Carousel } from "@mantine/carousel";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { NavigationProgress, nprogress } from "@mantine/nprogress";
import { Lightbox } from "@mantine/lightbox";
import { RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { BarChart3, FileText, LayoutDashboard, Search, Settings, Upload } from "lucide-react";
import type { StoryRender } from "./type";

/**
 * Preview stories for Mantine (charts, dates, code-highlight, schedule and the
 * @mantine/x packages): every render uses the component's documented API with
 * realistic content. The preview canvas is true black, so each story rides
 * `MantineStory`, which pins Mantine's dark color scheme for the subtree (the
 * coordinator wires each package's stylesheet into the preview page at merge
 * time — this module never imports CSS). Overlay surfaces (spotlight, lightbox)
 * are forced open so static screenshots capture the interesting surface.
 */

function MantineStory({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider defaultColorScheme="dark">
      <div data-mantine-color-scheme="dark">{children}</div>
    </MantineProvider>
  );
}

const revenueData = [
  { month: "May", enterprise: 24800, team: 12400, starter: 5200 },
  { month: "Jun", enterprise: 26100, team: 13800, starter: 5600 },
  { month: "Jul", enterprise: 28900, team: 15100, starter: 5900 },
  { month: "Aug", enterprise: 31400, team: 16900, starter: 6400 },
  { month: "Sep", enterprise: 34200, team: 18600, starter: 6900 },
  { month: "Oct", enterprise: 37100, team: 20400, starter: 7300 },
];

const seatData = [
  { quarter: "Q1 '26", enterprise: 180, team: 420, starter: 760 },
  { quarter: "Q2 '26", enterprise: 224, team: 505, starter: 842 },
  { quarter: "Q3 '26", enterprise: 268, team: 612, starter: 934 },
  { quarter: "Q4 '26", enterprise: 321, team: 718, starter: 1028 },
];

const latencyData = [
  { week: "W32", api: 214, dashboard: 320 },
  { week: "W33", api: 208, dashboard: 312 },
  { week: "W34", api: 231, dashboard: 344 },
  { week: "W35", api: 219, dashboard: 328 },
  { week: "W36", api: 202, dashboard: 301 },
  { week: "W37", api: 196, dashboard: 288 },
];

const mrrSpark = [31, 33, 32, 36, 38, 37, 41, 43, 42, 46, 48, 47, 51, 54, 53, 57, 60, 59, 63, 66, 68, 71, 70, 74, 77, 80, 82, 86];

const planMix = [
  { name: "Enterprise", value: 38, color: "blue.6" },
  { name: "Team", value: 72, color: "teal.6" },
  { name: "Starter", value: 124, color: "grape.6" },
  { name: "Trial", value: 52, color: "orange.6" },
];

const trafficSources = [
  { name: "Organic search", value: 4820, color: "blue.6" },
  { name: "Direct", value: 3140, color: "teal.6" },
  { name: "Docs referral", value: 2260, color: "grape.6" },
  { name: "Paid campaigns", value: 1780, color: "orange.6" },
];

const supportSla = [
  { channel: "Email", firstResponse: 88, resolution: 74, csat: 91 },
  { channel: "Live chat", firstResponse: 96, resolution: 82, csat: 94 },
  { channel: "Phone", firstResponse: 92, resolution: 88, csat: 89 },
  { channel: "Community", firstResponse: 71, resolution: 66, csat: 84 },
  { channel: "Escalations", firstResponse: 84, resolution: 79, csat: 80 },
];

const deployBuilds = [
  {
    name: "checkout-web",
    color: "blue.6",
    data: [
      { bundle: 212, duration: 82 },
      { bundle: 245, duration: 96 },
      { bundle: 228, duration: 88 },
      { bundle: 268, duration: 118 },
    ],
  },
  {
    name: "admin-console",
    color: "teal.6",
    data: [
      { bundle: 342, duration: 131 },
      { bundle: 358, duration: 142 },
      { bundle: 329, duration: 126 },
      { bundle: 384, duration: 158 },
    ],
  },
];

const campaignData = [
  { channel: "Search", spend: 42, signups: 980, revenue: 31 },
  { channel: "Social", spend: 28, signups: 640, revenue: 18 },
  { channel: "Sponsorships", spend: 55, signups: 720, revenue: 38 },
  { channel: "Retargeting", spend: 18, signups: 410, revenue: 12 },
  { channel: "Webinars", spend: 34, signups: 520, revenue: 26 },
];

const signupFunnel = [
  { name: "Visited pricing", value: 12400, color: "blue.6" },
  { name: "Started trial", value: 3180, color: "teal.6" },
  { name: "Activated workspace", value: 1620, color: "grape.6" },
  { name: "Converted to paid", value: 740, color: "orange.6" },
];

const bookingsData = [
  { month: "Jul", bookings: 82, forecast: 88, pipeline: 120 },
  { month: "Aug", bookings: 94, forecast: 96, pipeline: 132 },
  { month: "Sep", bookings: 108, forecast: 104, pipeline: 141 },
  { month: "Oct", bookings: 96, forecast: 112, pipeline: 155 },
  { month: "Nov", bookings: 0, forecast: 121, pipeline: 168 },
  { month: "Dec", bookings: 0, forecast: 130, pipeline: 182 },
];

const ohlcData = [
  { date: "Oct 5", open: 118.2, high: 121.4, low: 117.6, close: 120.8 },
  { date: "Oct 6", open: 120.8, high: 123.1, low: 119.9, close: 122.4 },
  { date: "Oct 7", open: 122.4, high: 122.9, low: 118.7, close: 119.3 },
  { date: "Oct 8", open: 119.3, high: 124.6, low: 119.1, close: 124.1 },
  { date: "Oct 9", open: 124.1, high: 126.8, low: 123.5, close: 126.2 },
];

const quotaData = [
  { name: "EMEA", value: 92, color: "blue.6" },
  { name: "AMER", value: 84, color: "teal.6" },
  { name: "APAC", value: 67, color: "grape.6" },
  { name: "Partners", value: 78, color: "orange.6" },
];

const heatmapData: Record<string, number> = {};
for (let day = 0; day < 182; day += 1) {
  const date = new Date(Date.UTC(2026, 3, 13 + day));
  const weekday = date.getUTCDay();
  const key = date.toISOString().slice(0, 10);
  heatmapData[key] = weekday === 0 || weekday === 6 ? day % 3 : ((day * 7) % 5) + 1;
}

const topAccounts = [
  { name: "Northwind Health", value: 128000, color: "blue.6" },
  { name: "Acme Robotics", value: 96400, color: "teal.6" },
  { name: "Juniper Logistics", value: 74200, color: "grape.6" },
  { name: "Halcyon Media", value: 51800, color: "orange.6" },
  { name: "Basalt Energy", value: 38600, color: "cyan.6" },
];

const ticketMix = [
  { name: "Resolved", value: 58, color: "teal.6" },
  { name: "Waiting on customer", value: 26, color: "blue.6" },
  { name: "Escalated", value: 8, color: "red.6" },
];

const storageData = [
  { name: "Media uploads", value: 420, color: "blue.6" },
  { name: "Backups", value: 310, color: "teal.6" },
  { name: "Search index", value: 180, color: "grape.6" },
  { name: "Audit logs", value: 120, color: "orange.6" },
  { name: "Exports", value: 74, color: "cyan.6" },
];

const headcountData = [
  {
    name: "Engineering",
    value: 46,
    color: "blue.6",
    children: [
      { name: "Platform", value: 18, color: "blue.5" },
      { name: "Product", value: 16, color: "blue.4" },
      { name: "Infrastructure", value: 12, color: "blue.3" },
    ],
  },
  {
    name: "Go to market",
    value: 32,
    color: "teal.6",
    children: [
      { name: "Sales", value: 18, color: "teal.5" },
      { name: "Marketing", value: 14, color: "teal.4" },
    ],
  },
  {
    name: "Operations",
    value: 14,
    color: "grape.6",
    children: [
      { name: "Support", value: 9, color: "grape.5" },
      { name: "Finance", value: 5, color: "grape.4" },
    ],
  },
];

const matrixDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const matrixHours = ["00", "04", "08", "12", "16", "20"];
const matrixData: { x: string; y: string; value: number }[] = [];
matrixDays.forEach((y, row) =>
  matrixHours.forEach((x, col) => {
    matrixData.push({ x, y, value: row >= 5 ? col % 2 : ((row + 2) * (col + 3)) % 9 });
  }),
);

const sankeyData = {
  nodes: [
    { name: "Homepage", color: "blue.6" },
    { name: "Pricing", color: "cyan.6" },
    { name: "Docs", color: "teal.6" },
    { name: "Trial signup", color: "grape.6" },
    { name: "Paid plan", color: "green.6" },
    { name: "Dropped", color: "red.6" },
  ],
  links: [
    { source: 0, target: 1, value: 5200 },
    { source: 0, target: 2, value: 2600 },
    { source: 1, target: 3, value: 1750 },
    { source: 2, target: 3, value: 980 },
    { source: 3, target: 4, value: 740 },
    { source: 3, target: 5, value: 1990 },
  ],
};

const scheduleEvents: ScheduleEventData[] = [
  { id: 1, title: "Sprint planning", start: "2026-10-12 09:30:00", end: "2026-10-12 10:15:00", color: "blue" },
  { id: 2, title: "Design review — Checkout v2", start: "2026-10-12 14:00:00", end: "2026-10-12 15:00:00", color: "grape" },
  { id: 3, title: "1:1 Priya ↔ Diego", start: "2026-10-13 11:00:00", end: "2026-10-13 11:30:00", color: "teal" },
  { id: 4, title: "Incident review — API latency", start: "2026-10-13 15:30:00", end: "2026-10-13 16:30:00", color: "red" },
  { id: 5, title: "Customer call — Northwind Health", start: "2026-10-14 10:00:00", end: "2026-10-14 11:00:00", color: "orange" },
  { id: 6, title: "Release 2.4.1 window", start: "2026-10-15 13:00:00", end: "2026-10-15 16:00:00", color: "cyan" },
  { id: 7, title: "All-hands", start: "2026-10-16 09:00:00", end: "2026-10-16 10:00:00", color: "violet" },
  { id: 8, title: "Board deck due", start: "2026-10-16 14:00:00", end: "2026-10-16 15:00:00", color: "yellow" },
];

const scheduleResources: ScheduleResourceData[] = [
  { id: "priya", label: "Priya Raghavan", color: "blue" },
  { id: "diego", label: "Diego Fuentes", color: "teal" },
  { id: "amara", label: "Amara Koll", color: "grape" },
];

const resourceEvents: ScheduleEventData[] = [
  { id: 1, title: "Onboarding — Halcyon Media", start: "2026-10-13 09:00:00", end: "2026-10-13 10:30:00", color: "blue", resourceId: "priya" },
  { id: 2, title: "Architecture review", start: "2026-10-13 11:00:00", end: "2026-10-13 12:00:00", color: "teal", resourceId: "diego" },
  { id: 3, title: "Renewal call — Basalt Energy", start: "2026-10-13 14:00:00", end: "2026-10-13 15:00:00", color: "grape", resourceId: "amara" },
  { id: 4, title: "Security questionnaire", start: "2026-10-14 10:00:00", end: "2026-10-14 11:30:00", color: "orange", resourceId: "priya" },
  { id: 5, title: "Migration pairing", start: "2026-10-14 13:00:00", end: "2026-10-14 15:00:00", color: "cyan", resourceId: "diego" },
  { id: 6, title: "Quarterly business review", start: "2026-10-15 09:30:00", end: "2026-10-15 11:00:00", color: "violet", resourceId: "amara" },
];

/** Re-titles the first event so a caller can relabel what the schedule shows. */
function withHeadlineEvent(events: ScheduleEventData[], title: string): ScheduleEventData[] {
  return events.map((event, index) => (index === 0 ? { ...event, title } : event));
}

/* Inline SVG data URIs for gallery/carousel slides, so previews never fetch the network. */
const shotA =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5NjAiIGhlaWdodD0iNjQwIiB2aWV3Qm94PSIwIDAgOTYwIDY0MCI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMGQyYTQ1Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMTI1NTdlIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9Ijk2MCIgaGVpZ2h0PSI2NDAiIGZpbGw9InVybCgjZykiLz48cmVjdCB4PSI2MCIgeT0iNzAiIHdpZHRoPSIyMjAiIGhlaWdodD0iNTAwIiByeD0iMTAiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9IjAuMTIiLz48cmVjdCB4PSIzMjAiIHk9IjcwIiB3aWR0aD0iNTgwIiBoZWlnaHQ9IjEyMCIgcng9IjEwIiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIwLjE4Ii8+PHJlY3QgeD0iMzIwIiB5PSIyMjAiIHdpZHRoPSIyODAiIGhlaWdodD0iMzUwIiByeD0iMTAiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9IjAuMTIiLz48cmVjdCB4PSI2MjAiIHk9IjIyMCIgd2lkdGg9IjI4MCIgaGVpZ2h0PSIzNTAiIHJ4PSIxMCIgZmlsbD0iI2ZmZmZmZiIgb3BhY2l0eT0iMC4xMiIvPjxjaXJjbGUgY3g9IjE3MCIgY3k9IjE1MCIgcj0iMzYiIGZpbGw9IiM1ZWNiZTgiIG9wYWNpdHk9IjAuOCIvPjwvc3ZnPg==";
const shotB =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5NjAiIGhlaWdodD0iNjQwIiB2aWV3Qm94PSIwIDAgOTYwIDY0MCI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMjQxYTRkIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNWIyZjg2Ii8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9Ijk2MCIgaGVpZ2h0PSI2NDAiIGZpbGw9InVybCgjZykiLz48cG9seWxpbmUgcG9pbnRzPSI2MCw0ODAgMTkwLDM4MCAzMjAsNDIwIDQ1MCwyODAgNTgwLDMzMCA3MTAsMTkwIDg0MCwyNDAgOTAwLDE3MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjYzlhN2ZmIiBzdHJva2Utd2lkdGg9IjEwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cmVjdCB4PSI2MCIgeT0iNzAiIHdpZHRoPSIzNjAiIGhlaWdodD0iMzQiIHJ4PSI4IiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIwLjIyIi8+PHJlY3QgeD0iNjAiIHk9IjEyMiIgd2lkdGg9IjI0MCIgaGVpZ2h0PSIyMiIgcng9IjYiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9IjAuMTQiLz48Y2lyY2xlIGN4PSI3MTAiIGN5PSIxOTAiIHI9IjE0IiBmaWxsPSIjZmZkMTY2Ii8+PC9zdmc+";
const shotC =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5NjAiIGhlaWdodD0iNjQwIiB2aWV3Qm94PSIwIDAgOTYwIDY0MCI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMGIzYTMzIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMTU3YTYzIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9Ijk2MCIgaGVpZ2h0PSI2NDAiIGZpbGw9InVybCgjZykiLz48cmVjdCB4PSI4MCIgeT0iNDMwIiB3aWR0aD0iMTEwIiBoZWlnaHQ9IjE0MCIgcng9IjgiIGZpbGw9IiM4ZWU2YzgiIG9wYWNpdHk9IjAuODUiLz48cmVjdCB4PSIyMzAiIHk9IjM1MCIgd2lkdGg9IjExMCIgaGVpZ2h0PSIyMjAiIHJ4PSI4IiBmaWxsPSIjOGVlNmM4IiBvcGFjaXR5PSIwLjciLz48cmVjdCB4PSIzODAiIHk9IjI3MCIgd2lkdGg9IjExMCIgaGVpZ2h0PSIzMDAiIHJ4PSI4IiBmaWxsPSIjOGVlNmM4IiBvcGFjaXR5PSIwLjU1Ii8+PHJlY3QgeD0iNTMwIiB5PSIxOTAiIHdpZHRoPSIxMTAiIGhlaWdodD0iMzgwIiByeD0iOCIgZmlsbD0iIzhlZTZjOCIgb3BhY2l0eT0iMC40Ii8+PHJlY3QgeD0iNjAiIHk9IjcwIiB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwIiByeD0iOCIgZmlsbD0iI2ZmZmZmZiIgb3BhY2l0eT0iMC4yMiIvPjwvc3ZnPg==";

const MiniCalendarStory: StoryRender = ({ sample }) => {
  const [value, onChange] = React.useState<string | null>("2026-10-13");
  return (
    <MantineStory>
      <Stack gap="xs" maw={420}>
        <Text size="sm" fw={500}>
          {sample.label ?? "Deployment window"}
        </Text>
        <MiniCalendar
          value={value}
          onChange={onChange}
          numberOfDays={5}
          defaultDate="2026-10-12"
          minDate="2026-10-12"
          maxDate="2026-10-30"
        />
      </Stack>
    </MantineStory>
  );
};

const AreaChartStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <Stack gap="sm" maw={640}>
      <Title order={4}>{sample.title ?? "Monthly recurring revenue"}</Title>
      <AreaChart
        h={260}
        data={revenueData}
        dataKey="month"
        type="stacked"
        withLegend
        series={[
          { name: "enterprise", label: sample.series1 ?? "Enterprise", color: "blue.6" },
          { name: "team", label: "Team", color: "teal.6" },
          { name: "starter", label: "Starter", color: "grape.6" },
        ]}
        valueFormatter={(value) => `$${value.toLocaleString()}`}
      />
    </Stack>
  </MantineStory>
);

const BarChartStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <Stack gap="sm" maw={640}>
      <Title order={4}>{sample.title ?? "Seats added by plan"}</Title>
      <BarChart
        h={260}
        data={seatData}
        dataKey="quarter"
        type="stacked"
        withLegend
        series={[
          { name: "enterprise", label: sample.series1 ?? "Enterprise", color: "blue.6", stackId: "seats" },
          { name: "team", label: "Team", color: "teal.6", stackId: "seats" },
          { name: "starter", label: "Starter", color: "grape.6", stackId: "seats" },
        ]}
      />
    </Stack>
  </MantineStory>
);

const LineChartStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <Stack gap="sm" maw={640}>
      <Title order={4}>{sample.title ?? "Checkout latency"}</Title>
      <LineChart
        h={260}
        data={latencyData}
        dataKey="week"
        withDots
        yAxisLabel="p95 (ms)"
        series={[
          { name: "api", label: sample.series1 ?? "API", color: "teal.6" },
          { name: "dashboard", label: "Dashboard", color: "blue.6" },
        ]}
      />
    </Stack>
  </MantineStory>
);

const SparklineStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <Group align="flex-end" gap="xl">
      <Stack gap={4}>
        <Text size="sm" c="dimmed">
          {sample.label ?? "Net MRR · last 28 days"}
        </Text>
        <Text size="xl" fw={700}>
          {sample.value ?? "$86,400"}
        </Text>
      </Stack>
      <Sparkline data={mrrSpark} color="teal.6" w={220} h={56} strokeWidth={2} />
    </Group>
  </MantineStory>
);

const DonutChartStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <Stack gap="sm" maw={560}>
      <Title order={4}>{sample.title ?? "Plan mix"}</Title>
      <DonutChart
        h={240}
        data={planMix}
        withLegend
        size={180}
        thickness={26}
        chartLabel={sample.value ?? "286"}
        labelsType="percent"
      />
    </Stack>
  </MantineStory>
);

const PieChartStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <Stack gap="sm" maw={560}>
      <Title order={4}>{sample.title ?? "Signups by channel"}</Title>
      <PieChart
        h={280}
        data={trafficSources}
        withLabels
        labelsType="percent"
        labelsPosition="inside"
        size={220}
      />
    </Stack>
  </MantineStory>
);

const RadarChartStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <Stack gap="sm" maw={560}>
      <Title order={4}>{sample.title ?? "Support SLA by channel"}</Title>
      <RadarChart
        h={300}
        data={supportSla}
        dataKey="channel"
        withLegend
        series={[
          { name: "firstResponse", label: sample.series1 ?? "First response", color: "blue.6" },
          { name: "resolution", label: "Resolution", color: "teal.6" },
          { name: "csat", label: "CSAT", color: "grape.6" },
        ]}
      />
    </Stack>
  </MantineStory>
);

const ScatterChartStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <Stack gap="sm" maw={640}>
      <Title order={4}>{sample.title ?? "Build time vs bundle size"}</Title>
      <ScatterChart
        h={280}
        data={deployBuilds}
        dataKey={{ x: "bundle", y: "duration" }}
        labels={{ x: "Bundle size", y: "Build time" }}
        unit={{ x: "KB", y: "s" }}
        withLegend
      />
    </Stack>
  </MantineStory>
);

const BubbleChartStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <Stack gap="sm" maw={640}>
      <Title order={4}>{sample.title ?? "Campaign spend vs signups"}</Title>
      <BubbleChart
        h={280}
        data={campaignData}
        dataKey={{ x: "spend", y: "signups", z: "revenue" }}
        range={[8, 40]}
        label="Q3 campaigns · bubble = revenue ($K)"
        color="blue.6"
        valueFormatter={(value) => `$${value}K`}
      />
    </Stack>
  </MantineStory>
);

const FunnelChartStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <Stack gap="sm" maw={560}>
      <Title order={4}>{sample.title ?? "Trial funnel · October"}</Title>
      <FunnelChart
        h={300}
        data={signupFunnel}
        withLabels
        labelsPosition="right"
        withLegend
        valueFormatter={(value) => value.toLocaleString()}
      />
    </Stack>
  </MantineStory>
);

const CompositeChartStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <Stack gap="sm" maw={640}>
      <Title order={4}>{sample.title ?? "Bookings against forecast"}</Title>
      <CompositeChart
        h={280}
        data={bookingsData}
        dataKey="month"
        withLegend
        series={[
          { name: "bookings", label: sample.series1 ?? "Bookings", color: "blue.6", type: "bar" },
          { name: "forecast", label: "Forecast", color: "teal.6", type: "line" },
          { name: "pipeline", label: "Pipeline", color: "grape.6", type: "area" },
        ]}
        valueFormatter={(value) => `$${value}K`}
      />
    </Stack>
  </MantineStory>
);

const CandlestickChartStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <Stack gap="sm" maw={640}>
      <Title order={4}>{sample.title ?? "COLS share price"}</Title>
      <CandlestickChart
        h={280}
        data={ohlcData}
        dataKey="date"
        upColor="teal.6"
        downColor="red.6"
        unit="$"
        valueFormatter={(value) => `$${value.toFixed(2)}`}
      />
    </Stack>
  </MantineStory>
);

const RadialBarChartStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <Stack gap="sm" maw={560}>
      <Title order={4}>{sample.title ?? "Quota attainment by region"}</Title>
      <RadialBarChart h={280} data={quotaData} dataKey="value" withLegend />
    </Stack>
  </MantineStory>
);

const HeatmapStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <Stack gap="sm" maw={720}>
      <Title order={4}>{sample.title ?? "Merge activity · last 26 weeks"}</Title>
      <Heatmap
        data={heatmapData}
        startDate="2026-04-13"
        endDate="2026-10-11"
        withMonthLabels
        withWeekdayLabels
        withLegend
        withTooltip
        getTooltipLabel={({ date, value }) => `${value} merges on ${date}`}
        legendLabels={["Quiet", "Busy"]}
      />
    </Stack>
  </MantineStory>
);

const BarsListStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <Stack gap="sm" maw={560}>
      <Title order={4}>{sample.title ?? "Top accounts by ARR"}</Title>
      <BarsList
        data={topAccounts}
        barsLabel="Account"
        valueLabel="ARR"
        valueFormatter={(value) => `$${(value / 1000).toFixed(1)}K`}
        autoContrast
      />
    </Stack>
  </MantineStory>
);

const BulletChartStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <Stack gap="sm" maw={560}>
      <Title order={4}>{sample.title ?? "Q3 revenue against plan"}</Title>
      <BulletChart
        value={184}
        target={210}
        label="$K"
        ranges={[
          { value: 120, color: "gray.7", label: "Floor" },
          { value: 180, color: "gray.6" },
          { value: 240, color: "gray.5", label: "Stretch" },
        ]}
        valueFormatter={(value) => `$${value}K`}
      />
    </Stack>
  </MantineStory>
);

const GaugeChartStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <Stack gap="sm" maw={560}>
      <Title order={4}>{sample.title ?? "SLA attainment"}</Title>
      <GaugeChart
        value={87}
        target={95}
        min={0}
        max={100}
        size={220}
        thickness={14}
        roundCaps
        valueFormatter={(value) => `${value}%`}
      />
    </Stack>
  </MantineStory>
);

const WaffleChartStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <Stack gap="sm" maw={560}>
      <Title order={4}>{sample.title ?? "Support tickets · 960 this month"}</Title>
      <WaffleChart data={ticketMix} rows={8} columns={12} withLegend cellRadius={2} />
    </Stack>
  </MantineStory>
);

const TreemapStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <Stack gap="sm" maw={640}>
      <Title order={4}>{sample.title ?? "Storage by service"}</Title>
      <Treemap data={storageData} height={280} valueFormatter={(value) => `${value} GB`} autoContrast />
    </Stack>
  </MantineStory>
);

const SunburstChartStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <Stack gap="sm" maw={560}>
      <Title order={4}>{sample.title ?? "Headcount by org"}</Title>
      <SunburstChart data={headcountData} size={280} />
    </Stack>
  </MantineStory>
);

const MatrixChartStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <Stack gap="sm" maw={640}>
      <Title order={4}>{sample.title ?? "Incidents by weekday and hour"}</Title>
      <MatrixChart
        data={matrixData}
        xLabels={matrixHours}
        yLabels={matrixDays}
        withXLabels
        withYLabels
        withLegend
        legendLabels={["None", "Severe"]}
        withTooltip
        getTooltipLabel={(cell) => `${cell.value} incidents · ${cell.y} ${cell.x}:00`}
      />
    </Stack>
  </MantineStory>
);

const SankeyChartStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <Stack gap="sm" maw={640}>
      <Title order={4}>{sample.title ?? "Where the traffic goes"}</Title>
      <SankeyChart data={sankeyData} height={300} valueFormatter={(value) => value.toLocaleString()} />
    </Stack>
  </MantineStory>
);

const webhookCode = `import { verifySignature } from "./signatures";

export async function POST(request: Request) {
  const payload = await request.text();

  if (!verifySignature(request.headers, payload)) {
    return new Response("invalid signature", { status: 401 });
  }

  const event = JSON.parse(payload);
  await queue.publish("invoice." + event.type, event);
  return Response.json({ received: true });
}`;

const CodeHighlightStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <Stack gap="sm" maw={640}>
      <Title order={3}>{sample.title ?? "Ship webhook endpoints in minutes"}</Title>
      <CodeHighlight code={webhookCode} language="tsx" radius="md" withCopyButton />
    </Stack>
  </MantineStory>
);

const JsonViewerStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <Stack gap="sm" maw={560}>
      <Title order={4}>{sample.title ?? "Latest deployment payload"}</Title>
      <JsonViewer
        value={{
          service: "checkout-api",
          version: "2.4.1",
          status: "healthy",
          replicas: { desired: 6, ready: 6 },
          rollout: { strategy: "canary", startedAt: "2026-10-10T09:14:00Z", durationSeconds: 214 },
          checks: ["migrations", "smoke-tests", "synthetic-payments"],
        }}
        rootName={sample.rootName ?? "deployment"}
        defaultExpandDepth={2}
        withTypes
        withSize
      />
    </Stack>
  </MantineStory>
);

const DayViewStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <DayView
      date="2026-10-13"
      events={withHeadlineEvent(scheduleEvents, sample.eventTitle ?? "Sprint planning")}
      startTime="08:00:00"
      endTime="18:00:00"
      startScrollTime="08:00:00"
      scrollAreaProps={{ mah: 420 }}
    />
  </MantineStory>
);

const MonthViewStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <MonthView
      date="2026-10-01"
      events={withHeadlineEvent(scheduleEvents, sample.eventTitle ?? "Sprint planning")}
      withWeekNumbers
    />
  </MantineStory>
);

const WeekViewStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <WeekView
      date="2026-10-12"
      events={withHeadlineEvent(scheduleEvents, sample.eventTitle ?? "Sprint planning")}
      startTime="08:00:00"
      endTime="18:00:00"
      scrollAreaProps={{ mah: 420 }}
    />
  </MantineStory>
);

const YearViewStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <YearView date="2026-10-01" events={withHeadlineEvent(scheduleEvents, sample.eventTitle ?? "Sprint planning")} />
  </MantineStory>
);

const MobileMonthViewStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <MobileMonthView
      date="2026-10-01"
      defaultSelectedDate="2026-10-13"
      events={withHeadlineEvent(scheduleEvents, sample.eventTitle ?? "Sprint planning")}
    />
  </MantineStory>
);

const ScheduleStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <Schedule
      defaultDate="2026-10-12"
      defaultView="week"
      events={withHeadlineEvent(scheduleEvents, sample.eventTitle ?? "Sprint planning")}
    />
  </MantineStory>
);

const ResourcesDayViewStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <ResourcesDayView
      date="2026-10-13"
      resources={scheduleResources}
      events={withHeadlineEvent(resourceEvents, sample.eventTitle ?? "Onboarding — Halcyon Media")}
      startTime="08:00:00"
      endTime="18:00:00"
    />
  </MantineStory>
);

const ResourcesWeekViewStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <ResourcesWeekView
      date="2026-10-12"
      resources={scheduleResources}
      events={withHeadlineEvent(resourceEvents, sample.eventTitle ?? "Onboarding — Halcyon Media")}
      startTime="08:00:00"
      endTime="18:00:00"
      startScrollDateTime="2026-10-12 08:00:00"
    />
  </MantineStory>
);

const ResourcesMonthViewStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <ResourcesMonthView
      date="2026-10-01"
      resources={scheduleResources}
      events={withHeadlineEvent(resourceEvents, sample.eventTitle ?? "Onboarding — Halcyon Media")}
    />
  </MantineStory>
);

const ResourcesScheduleStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <ResourcesSchedule
      defaultDate="2026-10-13"
      resources={scheduleResources}
      events={withHeadlineEvent(resourceEvents, sample.eventTitle ?? "Onboarding — Halcyon Media")}
    />
  </MantineStory>
);

const AgendaViewStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <AgendaView
      rangeStart="2026-10-12"
      rangeEnd="2026-10-18"
      events={withHeadlineEvent(scheduleEvents, sample.eventTitle ?? "Sprint planning")}
    />
  </MantineStory>
);

const NotificationsStory: StoryRender = ({ sample }) => {
  React.useEffect(() => {
    const deployId = notifications.show({
      title: sample.title ?? "Deploy finished",
      message: "checkout-api v2.4.1 is live in production. All smoke checks passed.",
      color: "teal",
      autoClose: false,
    });
    notifications.show({
      title: "Invoice paid",
      message: "Northwind Health paid INV-2291 — $4,820.",
      color: "blue",
      autoClose: false,
    });
    return () => {
      notifications.hide(deployId);
      notifications.clean();
    };
  }, [sample.title]);
  return (
    <MantineStory>
      <Stack gap="xs" maw={360}>
        <Text size="sm" fw={500}>
          {sample.label ?? "Billing activity"}
        </Text>
        <Text size="sm" c="dimmed">
          Deploy and payment updates arrive as notifications in the top-right corner.
        </Text>
      </Stack>
      <Notifications position="top-right" autoClose={false} />
    </MantineStory>
  );
};

const SpotlightStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <Spotlight
      forceOpened
      limit={6}
      highlightQuery
      nothingFound="No commands match that search"
      searchProps={{
        leftSection: <Search size={18} strokeWidth={1.5} />,
        placeholder: sample.placeholder ?? "Search projects, invoices, teammates",
      }}
      actions={[
        {
          id: "dashboard",
          label: "Open dashboard",
          description: "Revenue, signups and deploy health",
          leftSection: <LayoutDashboard size={18} strokeWidth={1.5} />,
          keywords: "home overview metrics",
        },
        {
          id: "invoices",
          label: "Search invoices",
          description: "Filter by client, status or amount",
          leftSection: <FileText size={18} strokeWidth={1.5} />,
          keywords: "billing payments",
        },
        {
          id: "reports",
          label: "Build a report",
          description: "Chart MRR, churn and cohort retention",
          leftSection: <BarChart3 size={18} strokeWidth={1.5} />,
          keywords: "analytics charts",
        },
        {
          id: "settings",
          label: "Workspace settings",
          description: "Members, roles and billing details",
          leftSection: <Settings size={18} strokeWidth={1.5} />,
          keywords: "preferences config",
        },
      ]}
    />
  </MantineStory>
);

const CarouselStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <Carousel slideSize="70%" slideGap="md" withIndicators emblaOptions={{ loop: false }}>
      <Carousel.Slide>
        <Center h={260}>
          <Stack gap="xs" px="lg">
            <Title order={3}>{sample.slide1 ?? "Scenes, not screenshots"}</Title>
            <Text c="dimmed">Every preview renders a component inside a realistic landing page or dashboard.</Text>
          </Stack>
        </Center>
      </Carousel.Slide>
      <Carousel.Slide>
        <Center h={260}>
          <Stack gap="xs" px="lg">
            <Title order={3}>Recolor in place</Title>
            <Text c="dimmed">Send theme tokens and sample text with the preview, before you commit.</Text>
          </Stack>
        </Center>
      </Carousel.Slide>
      <Carousel.Slide>
        <Center h={260}>
          <Stack gap="xs" px="lg">
            <Title order={3}>One query, any library</Title>
            <Text c="dimmed">Compare APIs and licensing across the catalogue without the open tabs.</Text>
          </Stack>
        </Center>
      </Carousel.Slide>
    </Carousel>
  </MantineStory>
);

const DropzoneStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <Dropzone onDrop={() => {}} onReject={() => {}} accept={IMAGE_MIME_TYPE} maxSize={5 * 1024 ** 2}>
      <Group justify="center" gap="xl" mih={180} style={{ pointerEvents: "none" }}>
        <Dropzone.Accept>
          <Upload size={44} strokeWidth={1.2} />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <Upload size={44} strokeWidth={1.2} />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <Upload size={44} strokeWidth={1.2} />
        </Dropzone.Idle>
        <div>
          <Text size="xl" inline>
            {sample.label ?? "Drop brand assets here"}
          </Text>
          <Text size="sm" c="dimmed" inline mt={7}>
            Attach logos or screenshots — PNG, JPG, GIF or WebP, up to 5 MB each.
          </Text>
        </div>
      </Group>
    </Dropzone>
  </MantineStory>
);

const NavigationProgressStory: StoryRender = ({ sample }) => {
  React.useEffect(() => {
    nprogress.set(62);
    return () => nprogress.reset();
  }, []);
  return (
    <MantineStory>
      <Stack gap="xs" maw={380}>
        <Text size="sm" fw={500}>
          {sample.label ?? "Migrating workspace settings"}
        </Text>
        <Text size="sm" c="dimmed">
          62% complete — 8 of 13 sections moved. The progress bar runs along the top of the page.
        </Text>
      </Stack>
      <NavigationProgress />
    </MantineStory>
  );
};

const LightboxStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <Lightbox
      opened
      onClose={() => {}}
      withThumbnails
      slides={[
        { src: shotA, alt: "Analytics dashboard layout", caption: sample.caption ?? "Analytics overview" },
        { src: shotB, alt: "Revenue trend report", caption: "Revenue trend report" },
        { src: shotC, alt: "Weekly throughput chart", caption: "Weekly throughput" },
      ]}
    />
  </MantineStory>
);

const RichTextEditorStory: StoryRender = ({ sample }) => {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit],
    content: `<p><strong>${sample.title ?? "Q4 launch notes"}</strong></p><p>Checkout v2 ships on October 21 with saved cards, invoice previews, and a faster tax step.</p><ul><li>Roll out saved cards to 10% of teams first</li><li>Keep the legacy tax step until November 4</li></ul>`,
  });
  return (
    <MantineStory>
      <RichTextEditor editor={editor} maw={560}>
        <RichTextEditor.Toolbar>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Strikethrough />
          </RichTextEditor.ControlsGroup>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
          </RichTextEditor.ControlsGroup>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>
        <RichTextEditor.Content />
      </RichTextEditor>
    </MantineStory>
  );
};

export const storyRenders: Record<string, StoryRender> = {
  "mantine/MiniCalendar": MiniCalendarStory,
  "mantine/AreaChart": AreaChartStory,
  "mantine/BarChart": BarChartStory,
  "mantine/LineChart": LineChartStory,
  "mantine/Sparkline": SparklineStory,
  "mantine/DonutChart": DonutChartStory,
  "mantine/PieChart": PieChartStory,
  "mantine/RadarChart": RadarChartStory,
  "mantine/ScatterChart": ScatterChartStory,
  "mantine/BubbleChart": BubbleChartStory,
  "mantine/FunnelChart": FunnelChartStory,
  "mantine/CompositeChart": CompositeChartStory,
  "mantine/CandlestickChart": CandlestickChartStory,
  "mantine/RadialBarChart": RadialBarChartStory,
  "mantine/Heatmap": HeatmapStory,
  "mantine/BarsList": BarsListStory,
  "mantine/BulletChart": BulletChartStory,
  "mantine/GaugeChart": GaugeChartStory,
  "mantine/WaffleChart": WaffleChartStory,
  "mantine/Treemap": TreemapStory,
  "mantine/SunburstChart": SunburstChartStory,
  "mantine/MatrixChart": MatrixChartStory,
  "mantine/SankeyChart": SankeyChartStory,
  "mantine/CodeHighlight": CodeHighlightStory,
  "mantine/JsonViewer": JsonViewerStory,
  "mantine/DayView": DayViewStory,
  "mantine/MonthView": MonthViewStory,
  "mantine/WeekView": WeekViewStory,
  "mantine/YearView": YearViewStory,
  "mantine/MobileMonthView": MobileMonthViewStory,
  "mantine/Schedule": ScheduleStory,
  "mantine/ResourcesDayView": ResourcesDayViewStory,
  "mantine/ResourcesWeekView": ResourcesWeekViewStory,
  "mantine/ResourcesMonthView": ResourcesMonthViewStory,
  "mantine/ResourcesSchedule": ResourcesScheduleStory,
  "mantine/AgendaView": AgendaViewStory,
  "mantine/Notifications": NotificationsStory,
  "mantine/Spotlight": SpotlightStory,
  "mantine/Carousel": CarouselStory,
  "mantine/Dropzone": DropzoneStory,
  "mantine/NavigationProgress": NavigationProgressStory,
  "mantine/Lightbox": LightboxStory,
  "mantine/RichTextEditor": RichTextEditorStory,
};
