import * as React from "react";
import {
  ActionIcon,
  ActionBar,
  Anchor,
  BackgroundImage,
  Blockquote,
  Box,
  Breadcrumbs,
  Burger,
  Button,
  Center,
  CloseButton,
  Code,
  Collapse,
  ColorPicker,
  ColorSwatch,
  CopyButton,
  Container,
  FileButton,
  FocusTrap,
  Group,
  Highlight,
  Input,
  Kbd,
  Loader,
  MantineProvider,
  Mark,
  Marquee,
  MaskInput,
  NativeSelect,
  Notification,
  Paper,
  Popover,
  Portal,
  RangeSlider,
  ScrollArea,
  Scroller,
  SegmentedControl,
  Slider,
  Stack,
  Switch,
  Table,
  Tabs,
  Text,
  TextInput,
  Title,
  UnstyledButton,
} from "@mantine/core";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  MoreHorizontal,
  Pencil,
  Quote,
  Search,
  Share2,
  Upload,
} from "lucide-react";
import type { StoryRender } from "./type";

/**
 * Preview stories for Mantine: each documented component rendered with its real
 * API and realistic content. The preview canvas is true black, so every story
 * rides `MantineStory`, which pins Mantine's dark color scheme for the subtree
 * (the coordinator wires Mantine's stylesheet into the preview page at merge
 * time — this module never imports CSS). Overlays open by default so static
 * screenshots capture the dropdown surface, not just the trigger.
 */

function MantineStory({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider defaultColorScheme="dark">
      <div data-mantine-color-scheme="dark">
        {children}
      </div>
    </MantineProvider>
  );
}

/** Inline SVG data URI used as a project hero image, so previews never fetch the network. */
const heroImage =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjY0MCIgdmlld0JveD0iMCAwIDEyMDAgNjQwIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiMwYjIwMzMiLz48c3RvcCBvZmZzZXQ9IjAuNTUiIHN0b3AtY29sb3I9IiMxNDQyNWMiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMxZjZmOGIiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI2NDAiIGZpbGw9InVybCgjZykiLz48Y2lyY2xlIGN4PSI5MzAiIGN5PSIxNTAiIHI9IjIxMCIgZmlsbD0iIzJiOGFhOCIgb3BhY2l0eT0iMC4zNSIvPjxjaXJjbGUgY3g9IjIxMCIgY3k9IjQ3MCIgcj0iMjUwIiBmaWxsPSIjMGEyYjNkIiBvcGFjaXR5PSIwLjUiLz48cGF0aCBkPSJNMCA2NDAgTDM0MCAzNTAgTDU2MCA1MDAgTDgzMCAyNzAgTDEyMDAgNTYwIEwxMjAwIDY0MCBaIiBmaWxsPSIjMDcxYTI4IiBvcGFjaXR5PSIwLjg1Ii8+PC9zdmc+";

const BoxStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <Box component="article" maw={560}>
      <Title order={3}>{sample.heading ?? "Faster imports, cleaner audit logs"}</Title>
      <Text mt="sm" c="dimmed">
        Every CSV import now reports row-level errors, and audit entries name the teammate who ran the
        export.
      </Text>
      <Text mt="xs" size="sm">
        Updated October 8 · 4 minute read
      </Text>
    </Box>
  </MantineStory>
);

const ButtonStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <Group justify="center">
      <Button size="md">{sample.primaryLabel ?? "Start free trial"}</Button>
      <Button size="md" variant="default">
        {sample.secondaryLabel ?? "View pricing"}
      </Button>
    </Group>
  </MantineStory>
);

const LoaderStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <Group>
      <Loader size="sm" type="bars" />
      <Text size="sm" c="dimmed">
        {sample.message ?? "Syncing 1,284 invoices from Stripe"}
      </Text>
    </Group>
  </MantineStory>
);

const ContainerStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <Container size="sm">
      <Title order={2} ta="center">
        {sample.headline ?? "Find the right UI library without the open tabs"}
      </Title>
      <Text mt="md" c="dimmed" ta="center">
        Col compares component APIs, licensing, and accessibility across dozens of libraries so your
        team can choose once and ship.
      </Text>
    </Container>
  </MantineStory>
);

const AnchorStory: StoryRender = () => (
  <MantineStory>
    <Group gap="lg">
      <Anchor href="#documentation" size="sm">
        Documentation
      </Anchor>
      <Anchor href="#changelog" size="sm">
        Changelog
      </Anchor>
      <Anchor href="#pricing" size="sm">
        Pricing
      </Anchor>
      <Anchor href="#status" size="sm">
        System status
      </Anchor>
    </Group>
  </MantineStory>
);

const InputStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <Box maw={380}>
      <Input
        leftSection={<Search size={16} strokeWidth={1.5} />}
        placeholder={sample.placeholder ?? "Search invoices, clients, or IDs"}
        aria-label="Search invoices"
      />
    </Box>
  </MantineStory>
);

const ActionIconStory: StoryRender = () => (
  <MantineStory>
    <Group gap="xs">
      <ActionIcon variant="default" size="lg" aria-label="Edit project">
        <Pencil size={16} strokeWidth={1.5} />
      </ActionIcon>
      <ActionIcon variant="default" size="lg" aria-label="Share project">
        <Share2 size={16} strokeWidth={1.5} />
      </ActionIcon>
      <ActionIcon variant="default" size="lg" aria-label="Download report">
        <Download size={16} strokeWidth={1.5} />
      </ActionIcon>
      <ActionIcon variant="default" size="lg" aria-label="More actions">
        <MoreHorizontal size={16} strokeWidth={1.5} />
      </ActionIcon>
    </Group>
  </MantineStory>
);

const ActionBarStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <Text size="sm" c="dimmed">
      {sample.context ?? "2 invoices selected · INV-2291, INV-2294"}
    </Text>
    <ActionBar opened position={{ bottom: 20, left: 20 }} closeOnEscape={false} onClose={() => {}}>
      <Group gap="xs">
        <Button variant="default" size="xs" leftSection={<Download size={14} strokeWidth={1.5} />}>
          Export CSV
        </Button>
        <Button size="xs">Mark as paid</Button>
        <ActionBar.Divider />
        <Button variant="subtle" color="red" size="xs">
          Archive
        </Button>
        <ActionBar.CloseButton aria-label="Hide actions" />
      </Group>
    </ActionBar>
  </MantineStory>
);

const CloseButtonStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <Paper withBorder p="md" pr="xl" maw={480} pos="relative">
      <Text fw={500} size="sm">
        {sample.bannerText ?? "Your trial ends in 5 days"}
      </Text>
      <Text size="sm" c="dimmed" mt={4}>
        Upgrade to keep scheduled exports running after October 15.
      </Text>
      <CloseButton pos="absolute" top={12} right={12} aria-label="Dismiss trial reminder" />
    </Paper>
  </MantineStory>
);

const CopyButtonStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <Group gap="sm">
      <Code>{sample.secret ?? "whsec_7f3a9c2e58d14b0a"}</Code>
      <CopyButton value={sample.secret ?? "whsec_7f3a9c2e58d14b0a"}>
        {({ copied, copy }) => (
          <Button
            variant="default"
            size="xs"
            onClick={copy}
            leftSection={copied ? <Check size={14} strokeWidth={1.5} /> : <Copy size={14} strokeWidth={1.5} />}
          >
            {copied ? "Copied" : "Copy"}
          </Button>
        )}
      </CopyButton>
    </Group>
  </MantineStory>
);

const FileButtonStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <Group>
      <FileButton accept="application/pdf,image/png,image/jpeg" onChange={() => {}}>
        {({ onClick }) => (
          <Button variant="default" leftSection={<Upload size={14} strokeWidth={1.5} />} onClick={onClick}>
            {sample.buttonLabel ?? "Upload contract"}
          </Button>
        )}
      </FileButton>
      <Text size="sm" c="dimmed">
        PDF or image, up to 10 MB
      </Text>
    </Group>
  </MantineStory>
);

const UnstyledButtonStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <UnstyledButton>
      <Group justify="space-between" maw={360}>
        <Box>
          <Text size="sm" fw={500}>
            {sample.rowLabel ?? "Amara Koll"}
          </Text>
          <Text size="xs" c="dimmed">
            Design lead · Joined March 2025
          </Text>
        </Box>
        <Text size="sm" c="dimmed">
          View profile
        </Text>
      </Group>
    </UnstyledButton>
  </MantineStory>
);

const TabsStory: StoryRender = () => (
  <MantineStory>
    <Tabs defaultValue="overview" variant="outline" maw={520}>
      <Tabs.List>
        <Tabs.Tab value="overview">Overview</Tabs.Tab>
        <Tabs.Tab value="invoices">Invoices</Tabs.Tab>
        <Tabs.Tab value="settings">Settings</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="overview" pt="md">
        <Text size="sm" c="dimmed">
          Traffic grew 18% this week, led by the pricing page. 4,210 sessions across 2,900 visitors.
        </Text>
      </Tabs.Panel>
      <Tabs.Panel value="invoices" pt="md">
        <Text size="sm" c="dimmed">
          4 open invoices totalling $7,685. One is 6 days overdue: INV-2293 for Beacon Analytics.
        </Text>
      </Tabs.Panel>
      <Tabs.Panel value="settings" pt="md">
        <Text size="sm" c="dimmed">
          Workspace defaults, member permissions, and the billing contact for Meridian Redesign.
        </Text>
      </Tabs.Panel>
    </Tabs>
  </MantineStory>
);

const BackgroundImageStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <BackgroundImage src={heroImage} radius="md" mih={280} p="xl">
      <Stack gap="xs" maw={340}>
        <Title order={3} c="white">
          {sample.headline ?? "Meridian Redesign ships in 12 days"}
        </Title>
        <Text size="sm" c="gray.2">
          The design system migration closes Friday. Two components remain in review with the platform
          team.
        </Text>
      </Stack>
    </BackgroundImage>
  </MantineStory>
);

const BlockquoteStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <Blockquote
      color="blue"
      icon={<Quote size={24} strokeWidth={1.5} />}
      iconSize={28}
      cite={sample.attribution ?? "Priya Raman, Head of Support at Acme Studio"}
      maw={560}
    >
      {sample.quote ??
        "We replaced three internal admin tools with one Col shortlist in an afternoon. The licensing notes alone saved us a legal review."}
    </Blockquote>
  </MantineStory>
);

const BreadcrumbsStory: StoryRender = () => (
  <MantineStory>
    <Breadcrumbs separator={<ChevronRight size={14} strokeWidth={1.5} />}>
      <Anchor href="#projects" size="sm">
        Projects
      </Anchor>
      <Anchor href="#meridian-redesign" size="sm">
        Meridian Redesign
      </Anchor>
      <Text size="sm" fw={500}>
        Invoices
      </Text>
    </Breadcrumbs>
  </MantineStory>
);

const BurgerStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <Group gap="sm">
      <Burger opened={false} size="sm" aria-label="Open navigation" />
      <Text fw={500}>{sample.workspaceName ?? "Meridian Redesign"}</Text>
    </Group>
  </MantineStory>
);

const CenterStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <Center mih={180}>
      <Stack align="center" gap="xs">
        <Upload size={24} strokeWidth={1.5} />
        <Text size="sm">{sample.hint ?? "Drop the signed contract here"}</Text>
        <Text size="xs" c="dimmed">
          PDF or scanned image, up to 10 MB
        </Text>
      </Stack>
    </Center>
  </MantineStory>
);

const CodeStory: StoryRender = () => (
  <MantineStory>
    <Stack gap="md" maw={560}>
      <Text size="sm">
        Install the components with npm: <Code>npm install @mantine/core</Code>
      </Text>
      <Code block>{`curl -X POST https://api.col.dev/v1/exports \\
  -H "Authorization: Bearer $COL_API_KEY" \\
  -d '{"format": "csv", "range": "q3"}'`}</Code>
    </Stack>
  </MantineStory>
);

const CollapseStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <Stack gap="sm" maw={420}>
      <Group justify="space-between">
        <Text fw={500} size="sm">
          {sample.heading ?? "Billing address"}
        </Text>
        <Text size="sm" c="dimmed">
          Hide details
        </Text>
      </Group>
      <Collapse expanded>
        <Stack gap={4}>
          <Text size="sm">Acme Studio · 2200 Bridgeway Blvd, Suite 210</Text>
          <Text size="sm" c="dimmed">
            Sausalito, CA 94965 · VAT ES-48219930
          </Text>
        </Stack>
      </Collapse>
    </Stack>
  </MantineStory>
);

const ColorPickerStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <Stack gap="sm" maw={280}>
      <Text size="sm" fw={500}>
        {sample.label ?? "Brand color"}
      </Text>
      <ColorPicker
        defaultValue="#1c7ed6"
        format="hex"
        swatches={["#1c7ed6", "#0ca678", "#f59f00", "#e8590c", "#e03131", "#7048e8", "#1098ad"]}
      />
    </Stack>
  </MantineStory>
);

const ColorSwatchStory: StoryRender = () => (
  <MantineStory>
    <Group gap="md">
      {[
        { name: "Ocean", color: "#1c7ed6" },
        { name: "Forest", color: "#0ca678" },
        { name: "Amber", color: "#f59f00" },
        { name: "Crimson", color: "#e03131" },
      ].map((swatch) => (
        <Group key={swatch.name} gap="xs">
          <ColorSwatch color={swatch.color} size={22} />
          <Text size="sm">{swatch.name}</Text>
        </Group>
      ))}
    </Group>
  </MantineStory>
);

const FocusTrapStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <Box maw={360}>
      <Text fw={500} size="sm" mb="xs">
        {sample.title ?? "Invite a teammate"}
      </Text>
      <FocusTrap active>
        <div>
          <FocusTrap.InitialFocus />
          <TextInput placeholder="teammate@acmestudio.com" aria-label="Teammate email" />
        </div>
      </FocusTrap>
    </Box>
  </MantineStory>
);

const GroupStory: StoryRender = () => (
  <MantineStory>
    <Group maw={520} justify="space-between" align="flex-end">
      <Box>
        <Text size="xs" c="dimmed">
          Monthly revenue
        </Text>
        <Text fw={700} fz="xl">
          $48,210
        </Text>
      </Box>
      <Box>
        <Text size="xs" c="dimmed">
          Active trials
        </Text>
        <Text fw={700} fz="xl">
          62
        </Text>
      </Box>
      <Box>
        <Text size="xs" c="dimmed">
          Churn
        </Text>
        <Text fw={700} fz="xl">
          1.8%
        </Text>
      </Box>
    </Group>
  </MantineStory>
);

const HighlightStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <Highlight highlight={["invoices", "renewal"]} maw={520} c="dimmed">
      {sample.text ??
        "Export paid invoices before the renewal on October 15 so finance can close the quarter on time."}
    </Highlight>
  </MantineStory>
);

const KbdStory: StoryRender = () => (
  <MantineStory>
    <Group gap={6}>
      <Text size="sm" c="dimmed">
        Press
      </Text>
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
      <Text size="sm" c="dimmed">
        to open the command menu
      </Text>
    </Group>
  </MantineStory>
);

const MarkStory: StoryRender = () => (
  <MantineStory>
    <Text size="sm" maw={520}>
      Finance flagged <Mark>14 invoices</Mark> that match the duplicate-payment rule you created on
      September 30.
    </Text>
  </MantineStory>
);

const MarqueeStory: StoryRender = () => (
  <MantineStory>
    <Marquee gap="xl" duration={40000} fadeEdgeColor="#000">
      {["Stripe", "Slack", "Linear", "Notion", "HubSpot", "GitHub", "Figma", "QuickBooks"].map((name) => (
        <Text key={name} size="sm" fw={500}>
          {name}
        </Text>
      ))}
    </Marquee>
  </MantineStory>
);

const MaskInputStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <Box maw={320}>
      <MaskInput
        mask="+1 (000) 000-0000"
        alwaysShowMask
        label={sample.label ?? "Phone number"}
        description="Used only for billing alerts"
      />
    </Box>
  </MantineStory>
);

const NativeSelectStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <Box maw={320}>
      <NativeSelect
        label={sample.label ?? "Plan"}
        data={["Starter — $19/month", "Growth — $49/month", "Scale — $199/month"]}
        defaultValue="Growth — $49/month"
      />
    </Box>
  </MantineStory>
);

const NotificationStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <Notification icon={<Check size={16} strokeWidth={1.5} />} color="teal" title={sample.title ?? "Deployment passed"} withCloseButton>
      {sample.message ?? "Meridian Redesign is live on app.col.dev. Build #482 took 2m 14s."}
    </Notification>
  </MantineStory>
);

const PaperStory: StoryRender = () => (
  <MantineStory>
    <Paper withBorder p="lg" maw={380}>
      <Group justify="space-between">
        <Text fw={500} size="sm">
          Pro plan · 8 seats
        </Text>
        <Text size="sm" c="dimmed">
          Renews Nov 1
        </Text>
      </Group>
      <Text size="sm" c="dimmed" mt="xs">
        2,418 of 5,000 preview renders used this month.
      </Text>
      <Button variant="default" size="xs" mt="md">
        Manage subscription
      </Button>
    </Paper>
  </MantineStory>
);

const PopoverStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <Popover defaultOpened position="bottom-start" width={260} shadow="md">
      <Popover.Target>
        <Button variant="default">{sample.triggerLabel ?? "Assignee"}</Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Stack gap="xs">
          <Text size="sm" fw={500}>
            Filter by assignee
          </Text>
          {["Amara Koll", "Priya Raman", "Diego Fuentes"].map((name, index) => (
            <Group key={name} justify="space-between">
              <Text size="sm">{name}</Text>
              {index === 0 ? (
                <Check size={14} strokeWidth={1.5} />
              ) : (
                <Text size="xs" c="dimmed">
                  {index === 1 ? "3 open" : "5 open"}
                </Text>
              )}
            </Group>
          ))}
        </Stack>
      </Popover.Dropdown>
    </Popover>
  </MantineStory>
);

const PortalStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <Box id="mantine-portal-story-host" pos="relative" mih={240} p="md" style={{ overflow: "hidden" }}>
      <Stack gap="xs">
        {[
          "Build #482 queued",
          "Installing dependencies (2m 01s)",
          "Running typecheck",
          "Deploying to app.col.dev",
          "Warming preview screenshots",
        ].map((line) => (
          <Text key={line} size="sm" c="dimmed">
            {line}
          </Text>
        ))}
      </Stack>
      <Portal target="#mantine-portal-story-host">
        <Box pos="absolute" bottom={16} right={16}>
          <Paper withBorder p="sm" radius="md" shadow="md">
            <Group gap="xs">
              <Check size={16} strokeWidth={1.5} />
              <Text size="sm">{sample.status ?? "Build #482 deployed to production"}</Text>
            </Group>
          </Paper>
        </Box>
      </Portal>
    </Box>
  </MantineStory>
);

const ScrollAreaStory: StoryRender = () => (
  <MantineStory>
    <ScrollArea h={220} type="always" maw={420}>
      <Stack gap="sm">
        {[
          "Oct 9 · Amara Koll exported Q3 invoices to CSV",
          "Oct 9 · Diego Fuentes renamed Atlas Mobile to Atlas iOS",
          "Oct 8 · Priya Raman approved the renewal quote for Northwind Labs",
          "Oct 8 · Amara Koll invited lena@harborcms.io",
          "Oct 7 · Scheduled export failed: Stripe API timeout",
          "Oct 7 · Diego Fuentes archived invoice INV-2271",
          "Oct 6 · Priya Raman changed the billing contact to finance@acmestudio.com",
          "Oct 5 · Amara Koll enabled weekly usage digests",
        ].map((entry) => (
          <Text key={entry} size="sm">
            {entry}
          </Text>
        ))}
      </Stack>
    </ScrollArea>
  </MantineStory>
);

const ScrollerStory: StoryRender = () => (
  <MantineStory>
    <Scroller
      showStartControl
      showEndControl
      controlSize="36px"
      startControlIcon={<ChevronLeft size={16} strokeWidth={1.5} />}
      endControlIcon={<ChevronRight size={16} strokeWidth={1.5} />}
    >
      <Group wrap="nowrap" gap="md">
        {[
          { name: "Meridian Redesign", meta: "Due Oct 18 · 6 tasks left" },
          { name: "Atlas iOS", meta: "Due Nov 2 · 14 tasks left" },
          { name: "Northwind Billing", meta: "Due Nov 15 · 3 tasks left" },
          { name: "Beacon Analytics", meta: "Due Dec 1 · 21 tasks left" },
          { name: "Harbor CMS", meta: "Due Dec 12 · 9 tasks left" },
        ].map((project) => (
          <Paper key={project.name} withBorder p="md" w={220} radius="md">
            <Text fw={500} size="sm">
              {project.name}
            </Text>
            <Text size="xs" c="dimmed" mt={4}>
              {project.meta}
            </Text>
          </Paper>
        ))}
      </Group>
    </Scroller>
  </MantineStory>
);

const SegmentedControlStory: StoryRender = () => (
  <MantineStory>
    <Stack gap="xs">
      <Text size="sm" fw={500}>
        Revenue for Acme Studio
      </Text>
      <SegmentedControl
        data={[
          { value: "week", label: "Week" },
          { value: "month", label: "Month" },
          { value: "quarter", label: "Quarter" },
        ]}
        defaultValue="month"
      />
    </Stack>
  </MantineStory>
);

const SliderStory: StoryRender = () => (
  <MantineStory>
    <Stack gap="xs" maw={380}>
      <Group justify="space-between">
        <Text size="sm" fw={500}>
          Monthly preview budget
        </Text>
        <Text size="sm" c="dimmed">
          $4,800
        </Text>
      </Group>
      <Slider
        defaultValue={4800}
        min={0}
        max={10000}
        step={100}
        label={(value) => `$${value.toLocaleString("en-US")}`}
        labelAlwaysOn
        marks={[
          { value: 0, label: "$0" },
          { value: 5000, label: "$5k" },
          { value: 10000, label: "$10k" },
        ]}
      />
    </Stack>
  </MantineStory>
);

const RangeSliderStory: StoryRender = () => (
  <MantineStory>
    <Stack gap="xs" maw={380}>
      <Group justify="space-between">
        <Text size="sm" fw={500}>
          Contract value
        </Text>
        <Text size="sm" c="dimmed">
          $500 – $4,200
        </Text>
      </Group>
      <RangeSlider
        defaultValue={[500, 4200]}
        min={0}
        max={10000}
        step={100}
        minRange={200}
        label={(value) => `$${value.toLocaleString("en-US")}`}
      />
    </Stack>
  </MantineStory>
);

const StackStory: StoryRender = () => (
  <MantineStory>
    <Stack gap="md" maw={340}>
      <TextInput label="Full name" placeholder="Amara Koll" />
      <TextInput label="Work email" placeholder="amara@acmestudio.com" />
      <Button fullWidth>Create account</Button>
    </Stack>
  </MantineStory>
);

const SwitchStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <Stack gap="md" maw={380}>
      <Switch
        label={sample.label1 ?? "Deployment alerts"}
        description="Email me when a build fails or a deploy completes"
        defaultChecked
      />
      <Switch label="Weekly summary" description="A Monday digest of renders, previews, and usage" />
      <Switch label="Product announcements" description="New component coverage and library additions" />
    </Stack>
  </MantineStory>
);

const TableStory: StoryRender = () => (
  <MantineStory>
    <Table striped highlightOnHover tabularNums maw={560}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Invoice</Table.Th>
          <Table.Th>Client</Table.Th>
          <Table.Th ta="right">Amount</Table.Th>
          <Table.Th>Status</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        <Table.Tr>
          <Table.Td>INV-2291</Table.Td>
          <Table.Td>Northwind Labs</Table.Td>
          <Table.Td ta="right">$2,400.00</Table.Td>
          <Table.Td>Paid</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Td>INV-2292</Table.Td>
          <Table.Td>Acme Studio</Table.Td>
          <Table.Td ta="right">$860.00</Table.Td>
          <Table.Td>Paid</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Td>INV-2293</Table.Td>
          <Table.Td>Beacon Analytics</Table.Td>
          <Table.Td ta="right">$3,150.00</Table.Td>
          <Table.Td>Overdue</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Td>INV-2294</Table.Td>
          <Table.Td>Harbor CMS</Table.Td>
          <Table.Td ta="right">$1,275.00</Table.Td>
          <Table.Td>Sent</Table.Td>
        </Table.Tr>
      </Table.Tbody>
      <Table.Tfoot>
        <Table.Tr>
          <Table.Td>4 invoices</Table.Td>
          <Table.Td />
          <Table.Td ta="right">$7,685.00</Table.Td>
          <Table.Td />
        </Table.Tr>
      </Table.Tfoot>
    </Table>
  </MantineStory>
);

const TextStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <Stack gap={4} maw={420}>
      <Text fz="xl" fw={700}>
        {sample.value ?? "$48,210"}
      </Text>
      <Text size="sm">{sample.caption ?? "Monthly recurring revenue"}</Text>
      <Text size="xs" c="dimmed">
        Up 12.4% from September · updated 2 hours ago
      </Text>
    </Stack>
  </MantineStory>
);

const TextInputStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <Box maw={340}>
      <TextInput
        label={sample.label ?? "Work email"}
        description="We will send the invoice receipt here"
        placeholder="you@acmestudio.com"
      />
    </Box>
  </MantineStory>
);

const TitleStory: StoryRender = ({ sample }) => (
  <MantineStory>
    <Title order={2} maw={560}>
      {sample.headline ?? "Ship your next release with the right UI library"}
    </Title>
  </MantineStory>
);

export const storyRenders: Record<string, StoryRender> = {
  "mantine/Box": BoxStory,
  "mantine/Button": ButtonStory,
  "mantine/Loader": LoaderStory,
  "mantine/Container": ContainerStory,
  "mantine/Anchor": AnchorStory,
  "mantine/Input": InputStory,
  "mantine/ActionIcon": ActionIconStory,
  "mantine/ActionBar": ActionBarStory,
  "mantine/CloseButton": CloseButtonStory,
  "mantine/CopyButton": CopyButtonStory,
  "mantine/FileButton": FileButtonStory,
  "mantine/UnstyledButton": UnstyledButtonStory,
  "mantine/Tabs": TabsStory,
  "mantine/BackgroundImage": BackgroundImageStory,
  "mantine/Blockquote": BlockquoteStory,
  "mantine/Breadcrumbs": BreadcrumbsStory,
  "mantine/Burger": BurgerStory,
  "mantine/Center": CenterStory,
  "mantine/Code": CodeStory,
  "mantine/Collapse": CollapseStory,
  "mantine/ColorPicker": ColorPickerStory,
  "mantine/ColorSwatch": ColorSwatchStory,
  "mantine/FocusTrap": FocusTrapStory,
  "mantine/Group": GroupStory,
  "mantine/Highlight": HighlightStory,
  "mantine/Kbd": KbdStory,
  "mantine/Mark": MarkStory,
  "mantine/Marquee": MarqueeStory,
  "mantine/MaskInput": MaskInputStory,
  "mantine/NativeSelect": NativeSelectStory,
  "mantine/Notification": NotificationStory,
  "mantine/Paper": PaperStory,
  "mantine/Popover": PopoverStory,
  "mantine/Portal": PortalStory,
  "mantine/ScrollArea": ScrollAreaStory,
  "mantine/Scroller": ScrollerStory,
  "mantine/SegmentedControl": SegmentedControlStory,
  "mantine/Slider": SliderStory,
  "mantine/RangeSlider": RangeSliderStory,
  "mantine/Stack": StackStory,
  "mantine/Switch": SwitchStory,
  "mantine/Table": TableStory,
  "mantine/Text": TextStory,
  "mantine/TextInput": TextInputStory,
  "mantine/Title": TitleStory,
};
