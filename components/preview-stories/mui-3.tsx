import * as React from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CallOutlined } from "@mui/icons-material";
import { BarChart, Gauge, LineChart, PieChart, RadarChart, ScatterChart, SparkLineChart } from "@mui/x-charts";
import { RichTreeView, SimpleTreeView, TreeItem } from "@mui/x-tree-view";
import {
  EventCalendar,
  StandaloneAgendaView,
  StandaloneDayView,
  StandaloneEvent,
  StandaloneMonthView,
  StandaloneWeekView,
} from "@mui/x-scheduler";
import {
  ChatBox,
  ChatCodeBlock,
  ChatComposer,
  ChatConfirmation,
  ChatConversation,
  ChatConversationHeader,
  ChatConversationHeaderActions,
  ChatConversationHeaderInfo,
  ChatConversationList,
  ChatConversationSubtitle,
  ChatConversationTitle,
  ChatDateDivider,
  ChatMessageGroup,
  ChatMessageList,
  ChatMessageSkeleton,
  ChatMessageSource,
  ChatMessageSources,
  ChatScrollToBottomAffordance,
  ChatSuggestions,
  ChatTypingIndicator,
  ChatUnreadMarker,
} from "@mui/x-chat";
import {
  ChatRoot,
  useChatStore,
  type ChatAdapter,
  type ChatConversation as ChatConversationModel,
  type ChatMessage,
  type ChatMessageChunk,
  type ChatStreamEnvelope,
  type ChatUser,
} from "@mui/x-chat/headless";
import type { StoryRender } from "./type";

/**
 * Preview stories for MUI, chunk 3 of 3: the MUI X community components from
 * `scripts/coverage/mui-3.txt` — charts (`@mui/x-charts`), tree views
 * (`@mui/x-tree-view`), scheduler views (`@mui/x-scheduler`), and chat
 * (`@mui/x-chat`). The assignment's Pro/Premium components (range pickers,
 * advanced charts, EventTimelinePremium) live in commercially licensed
 * packages and render nothing here; the gap list lives beside this file in
 * `data/preview-stories/mui-3.ts`.
 *
 * Every story wraps its scene in the dark MUI theme so the components read
 * legibly on the preview canvas's true-black background.
 */

const darkTheme = createTheme({ palette: { mode: "dark" } });

/** Wraps one story's scene in the dark theme the preview canvas expects. */
function Themed({ children }: { children: React.ReactNode }) {
  return <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>;
}

/** Caption style for the one line of context above a component. */
function Caption({ children }: { children: React.ReactNode }) {
  return (
    <Typography variant="body2" color="text.secondary">
      {children}
    </Typography>
  );
}

/* ------------------------------------------------------------------ */
/* Chat fixtures: one support thread plus the people and conversations */
/* the chat components read from the chat store.                       */
/* ------------------------------------------------------------------ */

const priya: ChatUser = { id: "priya", displayName: "Priya Raman", role: "user" };
const jonas: ChatUser = { id: "jonas", displayName: "Jonas Weber", role: "user" };
const mei: ChatUser = { id: "mei", displayName: "Mei Chen", role: "user" };
const meridianAssistant: ChatUser = {
  id: "meridian-assistant",
  displayName: "Meridian Assistant",
  role: "assistant",
};

function textMessage(id: string, author: ChatUser, text: string, createdAt: string): ChatMessage {
  return {
    id,
    role: author.role ?? "user",
    parts: [{ type: "text", text }],
    author,
    createdAt,
    conversationId: "conv-support",
    status: "sent",
  };
}

const supportThread: ChatMessage[] = [
  textMessage(
    "m1",
    priya,
    "The invoice export drops the PO number column. Can we get it added before Friday's close?",
    "2026-10-09T09:12:00",
  ),
  textMessage(
    "m2",
    meridianAssistant,
    "I can take that. I'll add `po_number` to the CSV export and mirror it in the PDF summary.",
    "2026-10-09T09:14:00",
  ),
  textMessage(
    "m3",
    meridianAssistant,
    "The change sits behind the `billing-export-v2` flag — I'll enable it for your workspace today.",
    "2026-10-09T09:15:00",
  ),
  textMessage(
    "m4",
    priya,
    "Perfect. Can you also confirm the October invoices use the new numbering?",
    "2026-10-10T10:02:00",
  ),
  textMessage(
    "m5",
    meridianAssistant,
    "Confirmed — invoices INV-2201 through INV-2218 all carry the new series.",
    "2026-10-10T10:05:00",
  ),
];

const chatConversations: ChatConversationModel[] = [
  {
    id: "conv-support",
    title: "Meridian support",
    subtitle: "You: Perfect. Can you also confirm the October invoices?",
    lastMessageAt: "2026-10-10T10:05:00",
    unreadCount: 2,
    participants: [priya, meridianAssistant],
  },
  {
    id: "conv-billing",
    title: "Billing v2 rollout",
    subtitle: "Jonas Weber: The invoices table is ready for review.",
    lastMessageAt: "2026-10-10T08:40:00",
    participants: [priya, jonas, mei],
  },
  {
    id: "conv-onboarding",
    title: "Onboarding checklist",
    subtitle: "Mei Chen: Added the SSO steps to the handbook.",
    lastMessageAt: "2026-10-08T15:12:00",
    unreadCount: 1,
    participants: [priya, mei],
  },
];

/**
 * A minimal `ChatAdapter` over the package's documented stream protocol: every
 * send answers with one static assistant message, so a story shows a realistic
 * reply without any backend.
 */
const supportAdapter: ChatAdapter = {
  async sendMessage({ message }) {
    const replyId = `${message.id}-reply`;
    return new ReadableStream<ChatMessageChunk | ChatStreamEnvelope>({
      start(controller) {
        controller.enqueue({ type: "start", messageId: replyId, author: meridianAssistant });
        controller.enqueue({ type: "text-start", id: `${replyId}-text` });
        controller.enqueue({
          type: "text-delta",
          id: `${replyId}-text`,
          delta: "Done — the export now carries PO numbers, and the October series is active.",
        });
        controller.enqueue({ type: "text-end", id: `${replyId}-text` });
        controller.enqueue({ type: "finish", messageId: replyId });
        controller.close();
      },
    });
  },
};

/** Puts the active conversation into a "teammate is typing" state on mount. */
function TypingDemo() {
  const store = useChatStore();
  React.useEffect(() => {
    store.setTypingUser("conv-billing", "jonas", true);
    return () => store.setTypingUser("conv-billing", "jonas", false);
  }, [store]);
  return null;
}

/* ------------------------------------------------------------------ */
/* Scheduler fixtures: one sprint week shared by the calendar views.   */
/* ------------------------------------------------------------------ */

const sprintEvents = [
  {
    id: "sprint-planning",
    title: "Sprint planning",
    start: "2026-10-12T09:30:00",
    end: "2026-10-12T10:30:00",
    resource: "product",
    color: "indigo" as const,
  },
  {
    id: "design-review",
    title: "Design review — billing v2",
    start: "2026-10-12T14:00:00",
    end: "2026-10-12T15:00:00",
    resource: "design",
    color: "pink" as const,
  },
  {
    id: "one-on-one",
    title: "1:1 — Priya & Jonas",
    start: "2026-10-13T11:00:00",
    end: "2026-10-13T11:30:00",
    resource: "product",
    color: "indigo" as const,
  },
  {
    id: "export-launch",
    title: "Export v2 launch",
    start: "2026-10-14T10:00:00",
    end: "2026-10-14T11:00:00",
    resource: "product",
    color: "indigo" as const,
  },
  {
    id: "billing-retro",
    title: "Billing v2 retro",
    start: "2026-10-14T16:00:00",
    end: "2026-10-14T17:00:00",
    resource: "team",
    color: "amber" as const,
  },
  {
    id: "office-hours",
    title: "Support office hours",
    start: "2026-10-16T13:00:00",
    end: "2026-10-16T14:00:00",
    resource: "support",
    color: "teal" as const,
  },
];

const sprintResources = [
  { id: "product", title: "Product", eventColor: "indigo" as const },
  { id: "design", title: "Design", eventColor: "pink" as const },
  { id: "support", title: "Support", eventColor: "teal" as const },
  { id: "team", title: "Team", eventColor: "amber" as const },
];

const sprintWeek = new Date(2026, 9, 12);

/* ------------------------------------------------------------------ */
/* Charts                                                             */
/* ------------------------------------------------------------------ */

const BarChartStory: StoryRender = ({ sample }) => (
  <Themed>
    <Stack spacing={1}>
      <Caption>{sample.chartTitle ?? "Revenue by plan tier (USD thousands)"}</Caption>
      <BarChart
        width={560}
        height={320}
        xAxis={[{ scaleType: "band", data: ["May", "Jun", "Jul", "Aug", "Sep", "Oct"] }]}
        series={[
          { label: "Starter", data: [18.2, 19.8, 21.1, 22.4, 24.0, 25.6], valueFormatter: (value) => `$${value}k` },
          { label: "Growth", data: [9.4, 11.2, 13.8, 15.1, 17.6, 19.9], valueFormatter: (value) => `$${value}k` },
          { label: "Scale", data: [6.1, 6.8, 8.2, 9.7, 12.4, 14.8], valueFormatter: (value) => `$${value}k` },
        ]}
        grid={{ vertical: true }}
      />
    </Stack>
  </Themed>
);

const LineChartStory: StoryRender = ({ sample }) => (
  <Themed>
    <Stack spacing={1}>
      <Caption>{sample.chartTitle ?? "Weekly active teams"}</Caption>
      <LineChart
        width={560}
        height={320}
        xAxis={[{ scaleType: "point", data: ["W35", "W36", "W37", "W38", "W39", "W40", "W41", "W42"] }]}
        series={[
          { label: "Active", data: [820, 865, 910, 948, 1024, 1087, 1142, 1216], curve: "monotoneX" },
          { label: "Invited, not activated", data: [180, 172, 165, 158, 151, 149, 142, 137], curve: "monotoneX" },
        ]}
        grid={{ horizontal: true }}
      />
    </Stack>
  </Themed>
);

const PieChartStory: StoryRender = ({ sample }) => (
  <Themed>
    <Stack spacing={1}>
      <Caption>{sample.chartTitle ?? "Signups by channel, last 30 days"}</Caption>
      <PieChart
        width={560}
        height={300}
        series={[
          {
            innerRadius: 60,
            paddingAngle: 2,
            cornerRadius: 4,
            data: [
              { id: "organic", value: 4210, label: "Organic search", color: "#90caf9" },
              { id: "referrals", value: 2180, label: "Customer referrals", color: "#a5d6a7" },
              { id: "invites", value: 1340, label: "Product invites", color: "#ffb74d" },
              { id: "paid", value: 860, label: "Paid campaigns", color: "#f48fb1" },
            ],
          },
        ]}
      />
    </Stack>
  </Themed>
);

const ScatterChartStory: StoryRender = ({ sample }) => (
  <Themed>
    <Stack spacing={1}>
      <Caption>{sample.chartTitle ?? "First response vs. resolution time (hours)"}</Caption>
      <ScatterChart
        width={560}
        height={320}
        xAxis={[{ label: "First response (h)", scaleType: "linear" }]}
        yAxis={[{ label: "Resolution (h)", scaleType: "linear" }]}
        series={[
          {
            label: "Billing",
            data: [
              { x: 0.4, y: 3.1 },
              { x: 0.8, y: 5.6 },
              { x: 1.2, y: 4.2 },
              { x: 1.9, y: 8.4 },
              { x: 2.6, y: 11.2 },
            ],
          },
          {
            label: "Onboarding",
            data: [
              { x: 0.6, y: 6.8 },
              { x: 1.4, y: 9.1 },
              { x: 2.1, y: 12.4 },
              { x: 3.2, y: 16.0 },
            ],
          },
        ]}
        grid={{ horizontal: true, vertical: true }}
      />
    </Stack>
  </Themed>
);

const SparkLineChartStory: StoryRender = ({ sample }) => (
  <Themed>
    <Stack spacing={2} sx={{ width: 420 }}>
      {[
        { label: sample.metric1 ?? "New workspaces", value: "1,284", data: [12, 18, 15, 24, 22, 31, 28, 36, 41, 38, 47, 52] },
        { label: sample.metric2 ?? "Exports generated", value: "8,932", data: [42, 45, 40, 48, 52, 49, 57, 61, 58, 66, 71, 74] },
        { label: sample.metric3 ?? "Weekly churn", value: "0.8%", data: [22, 20, 21, 18, 17, 18, 15, 14, 13, 12, 11, 9] },
      ].map((metric) => (
        <Stack key={metric.label} direction="row" spacing={2} sx={{ alignItems: "center", justifyContent: "space-between" }}>
          <Stack spacing={0.5}>
            <Caption>{metric.label}</Caption>
            <Typography variant="h6">{metric.value}</Typography>
          </Stack>
          <SparkLineChart width={180} height={48} data={metric.data} area showTooltip={false} />
        </Stack>
      ))}
    </Stack>
  </Themed>
);

const GaugeStory: StoryRender = ({ sample }) => (
  <Themed>
    <Stack spacing={1} sx={{ alignItems: "center" }}>
      <Gauge width={260} height={200} value={72} valueMin={0} valueMax={100} cornerRadius={12} text="NPS 72" />
      <Caption>{sample.gaugeLabel ?? "Net promoter score, Q3 survey (1,940 responses)"}</Caption>
    </Stack>
  </Themed>
);

const RadarChartStory: StoryRender = ({ sample }) => (
  <Themed>
    <Stack spacing={1}>
      <Caption>{sample.chartTitle ?? "Quality scorecard — 2.13 vs. 2.12"}</Caption>
      <RadarChart
        width={560}
        height={340}
        radar={{
          metrics: ["Speed", "Reliability", "Accessibility", "Docs", "Developer experience", "Test coverage"],
          max: 100,
        }}
        series={[
          { label: "2.13", data: [82, 91, 76, 68, 88, 71], fillArea: true },
          { label: "2.12", data: [70, 84, 62, 55, 74, 60] },
        ]}
      />
    </Stack>
  </Themed>
);

/* ------------------------------------------------------------------ */
/* Tree views                                                         */
/* ------------------------------------------------------------------ */

const SimpleTreeViewStory: StoryRender = ({ sample }) => (
  <Themed>
    <Stack spacing={1}>
      <Caption>{sample.projectName ?? "meridian-web — repository files"}</Caption>
      <SimpleTreeView defaultExpandedItems={["src", "src/components"]}>
        <TreeItem itemId="src" label="src">
          <TreeItem itemId="src/components" label="components">
            <TreeItem itemId="billing-table" label="BillingTable.tsx" />
            <TreeItem itemId="export-dialog" label="ExportDialog.tsx" />
            <TreeItem itemId="usage-chart" label="UsageChart.tsx" />
          </TreeItem>
          <TreeItem itemId="src/pages" label="pages">
            <TreeItem itemId="invoices-page" label="invoices.tsx" />
            <TreeItem itemId="settings-page" label="settings.tsx" />
          </TreeItem>
        </TreeItem>
        <TreeItem itemId="package-json" label="package.json" />
      </SimpleTreeView>
    </Stack>
  </Themed>
);

const RichTreeViewStory: StoryRender = ({ sample }) => (
  <Themed>
    <Stack spacing={1}>
      <Caption>{sample.treeTitle ?? "Meridian handbook"}</Caption>
      <RichTreeView
        items={[
          {
            id: "handbook",
            label: "Meridian handbook",
            children: [
              {
                id: "onboarding",
                label: "Onboarding",
                children: [
                  { id: "week-one", label: "Your first week" },
                  { id: "sso-setup", label: "SSO setup" },
                ],
              },
              {
                id: "engineering",
                label: "Engineering",
                children: [
                  { id: "release-runbook", label: "Release runbook" },
                  { id: "incident-response", label: "Incident response" },
                  { id: "billing-export", label: "Billing export pipeline" },
                ],
              },
              {
                id: "design",
                label: "Design",
                children: [{ id: "design-tokens", label: "Design tokens" }],
              },
            ],
          },
        ]}
        defaultExpandedItems={["handbook", "engineering"]}
      />
    </Stack>
  </Themed>
);

/* ------------------------------------------------------------------ */
/* Scheduler                                                          */
/* ------------------------------------------------------------------ */

const EventCalendarStory: StoryRender = ({ sample }) => (
  <Themed>
    <Stack spacing={1}>
      <Caption>{sample.calendarTitle ?? "Product team — week of Oct 12"}</Caption>
      <EventCalendar events={sprintEvents} resources={sprintResources} defaultVisibleDate={sprintWeek} sx={{ height: 460 }} />
    </Stack>
  </Themed>
);

const StandaloneAgendaViewStory: StoryRender = ({ sample }) => (
  <Themed>
    <Stack spacing={1}>
      <Caption>{sample.agendaTitle ?? "Upcoming this week"}</Caption>
      <StandaloneAgendaView events={sprintEvents} resources={sprintResources} defaultVisibleDate={sprintWeek} />
    </Stack>
  </Themed>
);

const StandaloneDayViewStory: StoryRender = ({ sample }) => (
  <Themed>
    <Stack spacing={1}>
      <Caption>{sample.dayTitle ?? "Monday, Oct 12"}</Caption>
      <StandaloneDayView
        events={sprintEvents}
        resources={sprintResources}
        defaultVisibleDate={sprintWeek}
        viewConfig={{ day: { startTime: 8, endTime: 20, initialScrollTime: 9 } }}
        sx={{ height: 380 }}
      />
    </Stack>
  </Themed>
);

const StandaloneEventStory: StoryRender = ({ sample }) => (
  <Themed>
    <Stack spacing={1}>
      <Caption>{sample.eventsTitle ?? "Drag these onto a calendar"}</Caption>
      <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
        <StandaloneEvent data={{ id: "standup", title: sample.eventTitle ?? "Daily standup", duration: 30, color: "indigo" as const }} />
        <StandaloneEvent data={{ id: "estimation", title: "Sprint estimation", duration: 60, color: "teal" as const }} />
        <StandaloneEvent data={{ id: "demo", title: "Billing v2 demo", duration: 45, color: "amber" as const }} />
      </Stack>
    </Stack>
  </Themed>
);

const StandaloneMonthViewStory: StoryRender = ({ sample }) => (
  <Themed>
    <Stack spacing={1}>
      <Caption>{sample.monthTitle ?? "October 2026"}</Caption>
      <StandaloneMonthView
        events={sprintEvents}
        resources={sprintResources}
        defaultVisibleDate={sprintWeek}
        sx={{ height: 380 }}
      />
    </Stack>
  </Themed>
);

const StandaloneWeekViewStory: StoryRender = ({ sample }) => (
  <Themed>
    <Stack spacing={1}>
      <Caption>{sample.weekTitle ?? "Week 42 — Oct 12–18"}</Caption>
      <StandaloneWeekView
        events={sprintEvents}
        resources={sprintResources}
        defaultVisibleDate={sprintWeek}
        viewConfig={{ week: { startTime: 8, endTime: 20, initialScrollTime: 9 } }}
        sx={{ height: 380 }}
      />
    </Stack>
  </Themed>
);

/* ------------------------------------------------------------------ */
/* Chat                                                               */
/* ------------------------------------------------------------------ */

const ChatBoxStory: StoryRender = ({ sample }) => (
  <Themed>
    <Stack spacing={1}>
      <Caption>{sample.chatTitle ?? "Meridian support — customer inbox"}</Caption>
      <ChatBox
        adapter={supportAdapter}
        currentUser={priya}
        members={[priya, jonas, mei, meridianAssistant]}
        initialConversations={chatConversations}
        initialActiveConversationId="conv-support"
        initialMessages={supportThread}
        suggestions={["Where is my invoice?", "Update billing details", "Talk to a human"]}
        sx={{ height: 440 }}
      />
    </Stack>
  </Themed>
);

const ChatConversationStory: StoryRender = ({ sample }) => (
  <Themed>
    <Stack spacing={1}>
      <Caption>{sample.conversationTitle ?? "Support thread"}</Caption>
      <Box sx={{ height: 380, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <ChatRoot
          adapter={supportAdapter}
          currentUser={priya}
          members={[priya, jonas, mei, meridianAssistant]}
          initialConversations={chatConversations}
          initialActiveConversationId="conv-support"
          initialMessages={supportThread}
        >
          <ChatConversation>
            <ChatConversationHeader>
              <ChatConversationHeaderInfo>
                <ChatConversationTitle />
                <ChatConversationSubtitle />
              </ChatConversationHeaderInfo>
            </ChatConversationHeader>
            <ChatMessageList sx={{ flex: 1, minHeight: 0 }} />
            <ChatComposer />
          </ChatConversation>
        </ChatRoot>
      </Box>
    </Stack>
  </Themed>
);

const ChatConversationListStory: StoryRender = ({ sample }) => (
  <Themed>
    <Stack spacing={1}>
      <Caption>{sample.listTitle ?? "Inbox"}</Caption>
      <Box sx={{ height: 320, width: 360, overflow: "hidden" }}>
        <ChatRoot
          adapter={supportAdapter}
          currentUser={priya}
          members={[priya, jonas, mei, meridianAssistant]}
          initialConversations={chatConversations}
          initialActiveConversationId="conv-support"
        >
          <ChatConversationList />
        </ChatRoot>
      </Box>
    </Stack>
  </Themed>
);

const ChatConversationHeaderStory: StoryRender = ({ sample }) => (
  <Themed>
    <Stack spacing={1}>
      <Caption>{sample.headerTitle ?? "Billing v2 rollout"}</Caption>
      <ChatRoot
        adapter={supportAdapter}
        currentUser={priya}
        members={[priya, jonas, mei, meridianAssistant]}
        initialConversations={chatConversations}
        initialActiveConversationId="conv-billing"
      >
        <ChatConversationHeader>
          <ChatConversationHeaderInfo>
            <ChatConversationTitle />
            <ChatConversationSubtitle />
          </ChatConversationHeaderInfo>
          <ChatConversationHeaderActions>
            <IconButton size="small" aria-label="Start call">
              <CallOutlined fontSize="small" />
            </IconButton>
          </ChatConversationHeaderActions>
        </ChatConversationHeader>
      </ChatRoot>
    </Stack>
  </Themed>
);

const ChatMessageListStory: StoryRender = ({ sample }) => (
  <Themed>
    <Stack spacing={1}>
      <Caption>{sample.listTitle ?? "Meridian support — today's replies"}</Caption>
      <Box sx={{ height: 340, overflow: "hidden" }}>
        <ChatRoot
          adapter={supportAdapter}
          currentUser={priya}
          members={[priya, meridianAssistant]}
          initialMessages={supportThread}
        >
          <ChatMessageList sx={{ height: "100%" }} />
        </ChatRoot>
      </Box>
    </Stack>
  </Themed>
);

const ChatMessageGroupStory: StoryRender = ({ sample }) => (
  <Themed>
    <Stack spacing={1}>
      <Caption>{sample.groupTitle ?? "One assistant reply, grouped by author"}</Caption>
      <ChatRoot
        adapter={supportAdapter}
        currentUser={priya}
        members={[priya, meridianAssistant]}
        initialMessages={supportThread}
      >
        <ChatMessageGroup messageId="m2" />
      </ChatRoot>
    </Stack>
  </Themed>
);

const ChatComposerStory: StoryRender = ({ sample }) => (
  <Themed>
    <Stack spacing={1} sx={{ width: 480 }}>
      <Caption>{sample.composerTitle ?? "Reply to Meridian support"}</Caption>
      <ChatRoot
        adapter={supportAdapter}
        currentUser={priya}
        members={[priya, meridianAssistant]}
        initialComposerValue="Can we push the invoice due date to Nov 3?"
      >
        <ChatComposer />
      </ChatRoot>
    </Stack>
  </Themed>
);

const ChatSuggestionsStory: StoryRender = ({ sample }) => (
  <Themed>
    <Stack spacing={1} sx={{ width: 480 }}>
      <Caption>{sample.promptTitle ?? "Ask the billing assistant"}</Caption>
      <ChatRoot adapter={supportAdapter} currentUser={priya} members={[priya, meridianAssistant]}>
        <ChatSuggestions
          alwaysVisible
          suggestions={[
            { value: "Where is my October invoice?", label: sample.suggestion1 ?? "Where is my October invoice?" },
            { value: "Update the billing address", label: "Update the billing address" },
            { value: "Explain the PO number change", label: "Explain the PO number change" },
          ]}
        />
      </ChatRoot>
    </Stack>
  </Themed>
);

const ChatTypingIndicatorStory: StoryRender = ({ sample }) => (
  <Themed>
    <Stack spacing={1} sx={{ width: 480 }}>
      <Caption>{sample.typingTitle ?? "Billing v2 rollout"}</Caption>
      <ChatRoot
        adapter={supportAdapter}
        currentUser={priya}
        members={[priya, jonas, mei]}
        initialConversations={chatConversations}
        initialActiveConversationId="conv-billing"
      >
        <TypingDemo />
        <ChatTypingIndicator />
      </ChatRoot>
    </Stack>
  </Themed>
);

const ChatUnreadMarkerStory: StoryRender = ({ sample }) => (
  <Themed>
    <Stack spacing={1} sx={{ width: 480 }}>
      <Caption>{sample.markerTitle ?? "Back from lunch — new replies below"}</Caption>
      <ChatRoot
        adapter={supportAdapter}
        currentUser={priya}
        members={[priya, meridianAssistant]}
        initialMessages={supportThread}
      >
        <ChatUnreadMarker messageId="m4" label={sample.markerLabel ?? "New messages"} />
      </ChatRoot>
    </Stack>
  </Themed>
);

const ChatMessageSkeletonStory: StoryRender = ({ sample }) => (
  <Themed>
    <Stack spacing={1} sx={{ width: 480 }}>
      <Caption>{sample.skeletonTitle ?? "Loading conversation history"}</Caption>
      <ChatMessageSkeleton lines={3} />
      <ChatMessageSkeleton lines={2} />
    </Stack>
  </Themed>
);

const ChatScrollToBottomAffordanceStory: StoryRender = ({ sample }) => (
  <Themed>
    <Stack spacing={1}>
      <Caption>{sample.affordanceTitle ?? "2 new replies while you were reading"}</Caption>
      <Stack
        spacing={1}
        sx={{ width: 480, height: 140, overflow: "hidden", justifyContent: "flex-end", alignItems: "center", pb: 1 }}
      >
        <ChatScrollToBottomAffordance />
      </Stack>
    </Stack>
  </Themed>
);

const ChatDateDividerStory: StoryRender = ({ sample }) => (
  <Themed>
    <Stack spacing={1} sx={{ width: 480 }}>
      <Caption>{sample.dividerTitle ?? "Conversation history spans two days"}</Caption>
      <ChatRoot
        adapter={supportAdapter}
        currentUser={priya}
        members={[priya, meridianAssistant]}
        initialMessages={supportThread}
      >
        <ChatDateDivider messageId="m4" />
      </ChatRoot>
    </Stack>
  </Themed>
);

const ChatMessageSourcesStory: StoryRender = ({ sample }) => (
  <Themed>
    <Stack spacing={1} sx={{ width: 480 }}>
      <Caption>{sample.sourcesTitle ?? "Answer grounded in your workspace docs"}</Caption>
      <ChatMessageSources label="Sources">
        <ChatMessageSource href="https://docs.meridian.dev/billing/po-number" title="PO number in exports" index={1} />
        <ChatMessageSource href="https://docs.meridian.dev/billing/invoice-numbering" title="Invoice numbering series" index={2} />
        <ChatMessageSource href="https://docs.meridian.dev/exports/csv" title="CSV export reference" index={3} />
      </ChatMessageSources>
    </Stack>
  </Themed>
);

const ChatMessageSourceStory: StoryRender = ({ sample }) => (
  <Themed>
    <Stack spacing={1} sx={{ width: 480 }}>
      <Caption>{sample.sourceTitle ?? "Cited document"}</Caption>
      <ChatMessageSources label="Source">
        <ChatMessageSource
          href="https://docs.meridian.dev/billing/po-number"
          title={sample.sourceName ?? "PO number in exports"}
          index={1}
        />
      </ChatMessageSources>
    </Stack>
  </Themed>
);

const ChatCodeBlockStory: StoryRender = ({ sample }) => (
  <Themed>
    <Stack spacing={1} sx={{ width: 480 }}>
      <Caption>{sample.codeTitle ?? "Retrieving an invoice through the API"}</Caption>
      <ChatCodeBlock language="typescript">
        {sample.code ??
          'const invoice = await billing.invoices.retrieve("INV-2214");\nconsole.log(invoice.poNumber);'}
      </ChatCodeBlock>
    </Stack>
  </Themed>
);

const ChatConfirmationStory: StoryRender = ({ sample }) => (
  <Themed>
    <Stack spacing={1} sx={{ width: 480 }}>
      <Caption>{sample.confirmationTitle ?? "The assistant wants to run a deploy"}</Caption>
      <ChatConfirmation
        message={sample.message ?? "Deploy meridian-web@2.14.0 to production?"}
        confirmLabel="Deploy"
        cancelLabel="Review diff"
      />
    </Stack>
  </Themed>
);

export const storyRenders: Record<string, StoryRender> = {
  "mui/BarChart": BarChartStory,
  "mui/LineChart": LineChartStory,
  "mui/PieChart": PieChartStory,
  "mui/ScatterChart": ScatterChartStory,
  "mui/SparkLineChart": SparkLineChartStory,
  "mui/Gauge": GaugeStory,
  "mui/RadarChart": RadarChartStory,
  "mui/SimpleTreeView": SimpleTreeViewStory,
  "mui/RichTreeView": RichTreeViewStory,
  "mui/EventCalendar": EventCalendarStory,
  "mui/StandaloneAgendaView": StandaloneAgendaViewStory,
  "mui/StandaloneDayView": StandaloneDayViewStory,
  "mui/StandaloneEvent": StandaloneEventStory,
  "mui/StandaloneMonthView": StandaloneMonthViewStory,
  "mui/StandaloneWeekView": StandaloneWeekViewStory,
  "mui/ChatBox": ChatBoxStory,
  "mui/ChatConversation": ChatConversationStory,
  "mui/ChatConversationList": ChatConversationListStory,
  "mui/ChatConversationHeader": ChatConversationHeaderStory,
  "mui/ChatMessageList": ChatMessageListStory,
  "mui/ChatMessageGroup": ChatMessageGroupStory,
  "mui/ChatComposer": ChatComposerStory,
  "mui/ChatSuggestions": ChatSuggestionsStory,
  "mui/ChatTypingIndicator": ChatTypingIndicatorStory,
  "mui/ChatUnreadMarker": ChatUnreadMarkerStory,
  "mui/ChatMessageSkeleton": ChatMessageSkeletonStory,
  "mui/ChatScrollToBottomAffordance": ChatScrollToBottomAffordanceStory,
  "mui/ChatDateDivider": ChatDateDividerStory,
  "mui/ChatMessageSources": ChatMessageSourcesStory,
  "mui/ChatMessageSource": ChatMessageSourceStory,
  "mui/ChatCodeBlock": ChatCodeBlockStory,
  "mui/ChatConfirmation": ChatConfirmationStory,
};
