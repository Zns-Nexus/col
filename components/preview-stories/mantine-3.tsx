import * as React from "react";
import {
  AngleSlider,
  AlphaSlider,
  Badge,
  Button,
  Card,
  Cascader,
  ColorInput,
  Dialog,
  FileInput,
  Flex,
  FloatingIndicator,
  FloatingWindow,
  getTreeExpandedState,
  Group,
  HueSlider,
  Image,
  JsonInput,
  List,
  LoadingOverlay,
  MantineProvider,
  NavLink,
  NumberFormatter,
  NumberInput,
  OverflowList,
  Paper,
  PasswordInput,
  Radio,
  RollingNumber,
  SemiCircleProgress,
  Spoiler,
  Splitter,
  Stack,
  Stepper,
  TableOfContents,
  Text,
  ThemeIcon,
  Timeline,
  Tree,
  TreeSelect,
  useTree,
  type TreeNodeData,
} from "@mantine/core";
import {
  Calendar,
  DateInput,
  DatePicker,
  DatePickerInput,
  DateTimePicker,
  InlineDateTimePicker,
  MonthPicker,
  MonthPickerInput,
  TimeGrid,
  TimeInput,
  TimePicker,
  TimeValue,
  YearPicker,
  YearPickerInput,
} from "@mantine/dates";
import { Check, Gauge, Home, LayoutGrid, Package, ShieldCheck, Users, Zap } from "lucide-react";
import type { StoryRender } from "./type";

/**
 * Preview stories for Mantine: each documented component with its real API,
 * rendered in realistic product content. Sample strings replace display text
 * where a caller labels the render.
 *
 * The preview canvas is true black, so every story is wrapped in Mantine's own
 * dark color scheme: the provider sets it for theme logic and the wrapper
 * attribute drives Mantine's per-scheme CSS variables. No stylesheet is
 * imported here — the preview page loads Mantine's styles.
 */

function MantineCanvas({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider defaultColorScheme="dark">
      <div data-mantine-color-scheme="dark">{children}</div>
    </MantineProvider>
  );
}

const JsonInputStory: StoryRender = ({ sample }) => (
  <MantineCanvas>
    <JsonInput
      label={sample.label ?? "Webhook payload"}
      description="Posted to the billing endpoint for every paid invoice"
      validationError="Must be valid JSON"
      formatOnBlur
      autosize
      minRows={4}
      w={{ base: "100%", sm: 380 }}
      defaultValue={'{\n  "event": "invoice.paid",\n  "account": "Northwind Labs",\n  "amount": 4820.00\n}'}
    />
  </MantineCanvas>
);

const ImageStory: StoryRender = ({ sample }) => (
  <MantineCanvas>
    <Stack gap="xs" w={{ base: "100%", sm: 480 }}>
      <Image src="/col-social-preview-v5.jpg" alt="Col product overview" radius="md" fit="cover" />
      <Text size="sm" c="gray.5">
        {sample.caption ?? "UI libraries. All in one place."}
      </Text>
    </Stack>
  </MantineCanvas>
);

const CardStory: StoryRender = ({ sample }) => (
  <MantineCanvas>
    <Card withBorder radius="md" padding="lg" w={{ base: "100%", sm: 360 }}>
      <Text fw={500}>{sample.title ?? "Invoice #INV-2041"}</Text>
      <Text size="xs" c="gray.5">
        Issued Oct 3 · Net 30
      </Text>
      <Text size="xl" fw={700} mt="md">
        {sample.amount ?? "$4,820.00"}
      </Text>
      <Card.Section withBorder inheritPadding mt="md" py="sm">
        <Group justify="space-between">
          <Text size="sm">Northwind Labs</Text>
          <Badge color="teal" variant="light">
            Paid
          </Badge>
        </Group>
      </Card.Section>
    </Card>
  </MantineCanvas>
);

const PasswordInputStory: StoryRender = ({ sample }) => (
  <MantineCanvas>
    <PasswordInput
      label={sample.label ?? "Admin password"}
      description="At least 12 characters, rotated every 90 days"
      defaultValue="col-release-2026"
      w={{ base: "100%", sm: 340 }}
    />
  </MantineCanvas>
);

const FileInputStory: StoryRender = ({ sample }) => (
  <MantineCanvas>
    <FileInput
      label={sample.label ?? "Quarterly report"}
      placeholder="Choose a PDF or CSV file"
      description="Up to 20 MB"
      clearable
      w={{ base: "100%", sm: 340 }}
    />
  </MantineCanvas>
);

const SplitterStory: StoryRender = ({ sample }) => (
  <MantineCanvas>
    <Splitter h={240} w={{ base: "100%", sm: 520 }}>
      <Splitter.Pane defaultSize="38%" min="22%">
        <Stack gap="xs" p="md">
          <Text size="xs" c="gray.5">
            {sample.leftTitle ?? "Projects"}
          </Text>
          <Text size="sm" fw={500}>
            col-web
          </Text>
          <Text size="sm" c="gray.5">
            col-api
          </Text>
          <Text size="sm" c="gray.5">
            col-docs
          </Text>
        </Stack>
      </Splitter.Pane>
      <Splitter.Pane defaultSize="62%" min="30%">
        <Stack gap="xs" p="md">
          <Text size="sm" fw={500}>
            col-web
          </Text>
          <Text size="sm" c="gray.5">
            Deployed 12 minutes ago · 41 tests green · preview ready for review
          </Text>
        </Stack>
      </Splitter.Pane>
    </Splitter>
  </MantineCanvas>
);

const StepperStory: StoryRender = ({ sample }) => (
  <MantineCanvas>
    <Stepper active={1} size="sm" w={{ base: "100%", sm: 520 }}>
      <Stepper.Step label={sample.step1 ?? "Account"} description="Workspace details" />
      <Stepper.Step label={sample.step2 ?? "Billing"} description="Card on file" />
      <Stepper.Step label={sample.step3 ?? "Review"} description="Confirm plan" />
    </Stepper>
  </MantineCanvas>
);

const ColorInputStory: StoryRender = ({ sample }) => (
  <MantineCanvas>
    <ColorInput
      label={sample.label ?? "Brand accent"}
      defaultValue="#f03e3e"
      swatches={["#1c7ed6", "#0ca678", "#f03e3e", "#f59f00", "#7048e8", "#101113", "#ffffff"]}
      // Forced open so a static screenshot captures the picker dropdown.
      popoverProps={{ opened: true, width: "target" }}
      w={{ base: "100%", sm: 320 }}
    />
  </MantineCanvas>
);

const ThemeIconStory: StoryRender = ({ sample }) => (
  <MantineCanvas>
    <Stack gap="md" w={{ base: "100%", sm: 420 }}>
      <Group align="flex-start" gap="md">
        <ThemeIcon variant="light" color="yellow" size="lg">
          <Zap size={18} />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={600}>
            {sample.title1 ?? "Sub-second builds"}
          </Text>
          <Text size="sm" c="gray.5">
            Every push renders a fresh preview.
          </Text>
        </div>
      </Group>
      <Group align="flex-start" gap="md">
        <ThemeIcon variant="light" color="teal" size="lg">
          <ShieldCheck size={18} />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={600}>
            {sample.title2 ?? "Licensed for commerce"}
          </Text>
          <Text size="sm" c="gray.5">
            MIT terms verified before any code ships.
          </Text>
        </div>
      </Group>
      <Group align="flex-start" gap="md">
        <ThemeIcon variant="light" color="blue" size="lg">
          <Gauge size={18} />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={600}>
            {sample.title3 ?? "Measured, not guessed"}
          </Text>
          <Text size="sm" c="gray.5">
            Bundle cost reported per component.
          </Text>
        </div>
      </Group>
    </Stack>
  </MantineCanvas>
);

const NumberInputStory: StoryRender = ({ sample }) => (
  <MantineCanvas>
    <NumberInput
      label={sample.label ?? "Team seats"}
      description="Billed at $29 per seat, monthly"
      defaultValue={12}
      min={1}
      max={250}
      w={{ base: "100%", sm: 280 }}
    />
  </MantineCanvas>
);

const LoadingOverlayStory: StoryRender = ({ sample }) => (
  <MantineCanvas>
    <Paper withBorder radius="md" p="lg" pos="relative" h={180} w={{ base: "100%", sm: 420 }}>
      <Stack gap="xs">
        <Text fw={600}>{sample.title ?? "Ledger sync"}</Text>
        <Text size="sm" c="gray.5">
          412 of 480 invoices imported from Northwind Labs.
        </Text>
      </Stack>
      <LoadingOverlay visible />
    </Paper>
  </MantineCanvas>
);

const RadioStory: StoryRender = ({ sample }) => (
  <MantineCanvas>
    <Radio.Group defaultValue="scale" name="billing-plan" label={sample.label ?? "Billing plan"}>
      <Stack gap="xs" mt="xs">
        <Radio value="starter" label="Starter" description="$29 per seat · 3 projects" />
        <Radio value="scale" label="Scale" description="$79 per seat · unlimited projects" />
        <Radio value="enterprise" label="Enterprise" description="Custom terms · SSO and audit logs" />
      </Stack>
    </Radio.Group>
  </MantineCanvas>
);

const TimelineStory: StoryRender = ({ sample }) => (
  <MantineCanvas>
    <Timeline active={2} bulletSize={24} lineWidth={2} w={{ base: "100%", sm: 420 }}>
      <Timeline.Item bullet={<Check size={12} />} title={sample.item1 ?? "Build passed"} opposite="2h ago">
        <Text size="sm" c="gray.5">
          col-web · 41 tests green
        </Text>
      </Timeline.Item>
      <Timeline.Item bullet={<Package size={12} />} title={sample.item2 ?? "Release packaged"} opposite="1h ago">
        <Text size="sm" c="gray.5">
          v2.4.0 · signed and tagged
        </Text>
      </Timeline.Item>
      <Timeline.Item title={sample.item3 ?? "Deploying to production"} opposite="now">
        <Text size="sm" c="gray.5">
          Rolling out to 3 regions
        </Text>
      </Timeline.Item>
    </Timeline>
  </MantineCanvas>
);

const DialogStory: StoryRender = ({ sample }) => (
  <MantineCanvas>
    <Dialog
      opened
      position={{ bottom: 24, right: 24 }}
      size="md"
      withCloseButton
      onClose={() => {}}
    >
      <Group justify="space-between" gap="xl">
        <Text size="sm" fw={500}>
          {sample.message ?? "Your session expires in 5 minutes"}
        </Text>
        <Button size="xs" variant="light">
          Stay signed in
        </Button>
      </Group>
    </Dialog>
  </MantineCanvas>
);

const FlexStory: StoryRender = ({ sample }) => (
  <MantineCanvas>
    <Flex
      direction={{ base: "column", sm: "row" }}
      justify="space-between"
      align={{ base: "flex-start", sm: "center" }}
      gap="md"
      w={{ base: "100%", sm: 460 }}
    >
      <Flex align="center" gap="sm">
        <Text fw={600}>{sample.title ?? "INV-2041"}</Text>
        <Text size="sm" c="gray.5">
          Northwind Labs · Oct 3
        </Text>
      </Flex>
      <Group gap="md">
        <Text fw={600}>$4,820.00</Text>
        <Badge variant="light" color="teal">
          Paid
        </Badge>
      </Group>
    </Flex>
  </MantineCanvas>
);

const ListStory: StoryRender = ({ sample }) => (
  <MantineCanvas>
    <List
      spacing="sm"
      size="sm"
      w={{ base: "100%", sm: 380 }}
      icon={
        <ThemeIcon size={20} color="teal" variant="light">
          <Check size={12} />
        </ThemeIcon>
      }
    >
      <List.Item>{sample.item1 ?? "Connect the GitHub repository"}</List.Item>
      <List.Item>{sample.item2 ?? "Invite the design and product reviewers"}</List.Item>
      <List.Item>{sample.item3 ?? "Turn on preview builds for every pull request"}</List.Item>
    </List>
  </MantineCanvas>
);

const SpoilerStory: StoryRender = ({ sample }) => (
  <MantineCanvas>
    <Spoiler
      maxHeight={72}
      showLabel={sample.showLabel ?? "Show full changelog"}
      hideLabel="Show less"
      w={{ base: "100%", sm: 420 }}
    >
      <Text size="sm">
        {sample.text ??
          "2.4 — Inline previews for every pull request, faster screenshot rendering, and a rewritten search index. 2.3 — Component-level bundle cost, MCP access to preview stories, and twelve new library write-ups. 2.2 — Theme tokens carried through preview URLs so a screenshot matches the embedding site."}
      </Text>
    </Spoiler>
  </MantineCanvas>
);

const NavLinkStory: StoryRender = ({ sample }) => (
  <MantineCanvas>
    <Stack gap={4} w={{ base: "100%", sm: 280 }}>
      <NavLink label={sample.label ?? "Overview"} leftSection={<Home size={16} />} active />
      <NavLink label="Components" leftSection={<LayoutGrid size={16} />} defaultOpened>
        <NavLink label="Forms" rightSection={<Text size="xs" c="gray.5">24</Text>} />
        <NavLink label="Feedback" rightSection={<Text size="xs" c="gray.5">11</Text>} />
      </NavLink>
      <NavLink label="Contributors" leftSection={<Users size={16} />} />
    </Stack>
  </MantineCanvas>
);

const NumberFormatterStory: StoryRender = ({ sample }) => (
  <MantineCanvas>
    <Stack gap={2}>
      <Text size="xs" c="gray.5">
        {sample.label ?? "Monthly recurring revenue"}
      </Text>
      <Text fz="2.25rem" fw={700} lh={1.2}>
        <NumberFormatter value={sample.value ?? 1284920.55} prefix="$" thousandSeparator decimalScale={2} fixedDecimalScale />
      </Text>
    </Stack>
  </MantineCanvas>
);

const RollingNumberStory: StoryRender = ({ sample }) => (
  <MantineCanvas>
    <Stack gap={2}>
      <Text size="xs" c="gray.5">
        {sample.label ?? "API requests this month"}
      </Text>
      <RollingNumber value={284920} thousandSeparator fz="2.25rem" fw={700} />
    </Stack>
  </MantineCanvas>
);

const floatingIndicatorTabs = ["Projects", "Tasks", "Invoices"];

function FloatingIndicatorDemo() {
  const [selected, setSelected] = React.useState(0);
  const [parent, setParent] = React.useState<HTMLDivElement | null>(null);
  const [target, setTarget] = React.useState<HTMLButtonElement | null>(null);

  return (
    <div
      ref={setParent}
      style={{
        position: "relative",
        display: "inline-flex",
        gap: 4,
        padding: 4,
        borderRadius: 8,
        background: "var(--mantine-color-body)",
      }}
    >
      {floatingIndicatorTabs.map((tab, index) => (
        <button
          key={tab}
          ref={index === selected ? setTarget : undefined}
          type="button"
          onClick={() => setSelected(index)}
          style={{
            position: "relative",
            zIndex: 1,
            border: 0,
            padding: "8px 16px",
            borderRadius: 6,
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer",
            background: "transparent",
            color: selected === index ? "#1a1b1e" : "#adb5bd",
          }}
        >
          {tab}
        </button>
      ))}
      <FloatingIndicator target={target} parent={parent} bg="white" />
    </div>
  );
}

const FloatingIndicatorStory: StoryRender = ({ sample }) => (
  <MantineCanvas>
    <Stack gap="xs" w={{ base: "100%", sm: 360 }}>
      <Text size="xs" c="gray.5">
        {sample.label ?? "Workspace activity"}
      </Text>
      <FloatingIndicatorDemo />
    </Stack>
  </MantineCanvas>
);

const treeData: TreeNodeData[] = [
  {
    label: "apps",
    value: "apps",
    children: [
      { label: "col-web", value: "col-web" },
      { label: "col-api", value: "col-api" },
    ],
  },
  {
    label: "packages",
    value: "packages",
    children: [
      { label: "ui", value: "ui" },
      { label: "eslint-config", value: "eslint-config" },
    ],
  },
];

function TreeDemo() {
  const tree = useTree({
    initialExpandedState: getTreeExpandedState(treeData, "*"),
    initialSelectedState: ["col-web"],
  });

  return <Tree data={treeData} tree={tree} selectOnClick w={{ base: "100%", sm: 280 }} />;
}

const TreeStory: StoryRender = ({ sample }) => (
  <MantineCanvas>
    <Stack gap="xs" w={{ base: "100%", sm: 280 }}>
      <Text size="xs" c="gray.5">
        {sample.label ?? "Repository files"}
      </Text>
      <TreeDemo />
    </Stack>
  </MantineCanvas>
);

const teamTreeData: TreeNodeData[] = [
  {
    label: "Engineering",
    value: "engineering",
    children: [
      { label: "Frontend", value: "frontend" },
      { label: "Platform", value: "platform" },
    ],
  },
  {
    label: "Design",
    value: "design",
    children: [{ label: "Brand", value: "brand" }],
  },
];

const TreeSelectStory: StoryRender = ({ sample }) => (
  <MantineCanvas>
    <TreeSelect
      label={sample.label ?? "Assign to team"}
      data={teamTreeData}
      defaultValue="frontend"
      // Forced open so a static screenshot captures the tree dropdown.
      dropdownOpened
      w={{ base: "100%", sm: 320 }}
    />
  </MantineCanvas>
);

const CascaderStory: StoryRender = ({ sample }) => (
  <MantineCanvas>
    <Cascader
      label={sample.label ?? "Ship from"}
      data={[
        {
          value: "us",
          label: "United States",
          children: [
            {
              value: "ca",
              label: "California",
              children: [
                { value: "sf", label: "San Francisco" },
                { value: "la", label: "Los Angeles" },
              ],
            },
            { value: "ny", label: "New York" },
          ],
        },
        {
          value: "de",
          label: "Germany",
          children: [{ value: "berlin", label: "Berlin" }],
        },
      ]}
      defaultValue={["us", "ca", "sf"]}
      // Forced open so a static screenshot captures the columns.
      dropdownOpened
      w={{ base: "100%", sm: 340 }}
    />
  </MantineCanvas>
);

const SemiCircleProgressStory: StoryRender = ({ sample }) => (
  <MantineCanvas>
    <SemiCircleProgress
      value={72}
      size={260}
      thickness={18}
      filledSegmentColor="teal"
      label={sample.label ?? "360 GB of 500 GB used"}
      labelPosition="bottom"
    />
  </MantineCanvas>
);

const AngleSliderStory: StoryRender = ({ sample }) => (
  <MantineCanvas>
    <Stack align="center" gap="xs">
      <AngleSlider
        defaultValue={45}
        size={90}
        marks={[
          { value: 0, label: "N" },
          { value: 90, label: "E" },
          { value: 180, label: "S" },
          { value: 270, label: "W" },
        ]}
        formatLabel={(value) => `${value}°`}
      />
      <Text size="sm" c="gray.5">
        {sample.label ?? "Antenna bearing"}
      </Text>
    </Stack>
  </MantineCanvas>
);

const FloatingWindowStory: StoryRender = ({ sample }) => (
  <MantineCanvas>
    <FloatingWindow
      initialPosition={{ top: 24, left: 24 }}
      dimensions={{ initialWidth: 320, initialHeight: 180, minWidth: 220, minHeight: 140 }}
      withBorder
      shadow="md"
      radius="md"
    >
      <Stack gap="xs" p="md">
        <Group justify="space-between">
          <Text size="sm" fw={600}>
            {sample.title ?? "Col support"}
          </Text>
          <Badge size="xs" variant="light" color="teal">
            Live
          </Badge>
        </Group>
        <Text size="sm" c="gray.5">
          {sample.message ??
            "Your preview screenshots finished. Want me to post them to the pull request?"}
        </Text>
        <Button size="xs" variant="light" w="fit-content">
          Reply
        </Button>
      </Stack>
      <FloatingWindow.ResizeHandle />
    </FloatingWindow>
  </MantineCanvas>
);

const tableOfContentsHeadings = [
  { depth: 2, value: "Getting started", id: "toc-getting-started" },
  { depth: 3, value: "Installation", id: "toc-installation" },
  { depth: 2, value: "Usage", id: "toc-usage" },
  { depth: 3, value: "Preview links", id: "toc-preview-links" },
];

const TableOfContentsStory: StoryRender = ({ sample }) => (
  <MantineCanvas>
    <Flex gap="xl" align="flex-start" wrap="wrap" w="100%">
      <Stack gap="xs" style={{ flex: 1 }} miw={220} data-toc-source>
        <h2 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>{sample.heading1 ?? "Getting started"}</h2>
        <Text size="sm" c="gray.5">
          Col indexes UI libraries by stack and use case.
        </Text>
        <h3 style={{ fontSize: 15, fontWeight: 600, margin: 0 }}>Installation</h3>
        <Text size="sm" c="gray.5">
          Add the packages the component page lists for your framework.
        </Text>
        <h2 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>Usage</h2>
        <Text size="sm" c="gray.5">
          Render the documented component inside your own scene.
        </Text>
        <h3 style={{ fontSize: 15, fontWeight: 600, margin: 0 }}>Preview links</h3>
        <Text size="sm" c="gray.5">
          Every story has a shareable preview URL with theme and sample data.
        </Text>
      </Stack>
      <TableOfContents
        initialData={tableOfContentsHeadings}
        scrollSpyOptions={{ selector: "[data-toc-source] h2, [data-toc-source] h3" }}
        w={200}
      />
    </Flex>
  </MantineCanvas>
);

const reviewers = [
  "Priya Raman",
  "Marco Chen",
  "Ada Osei",
  "Jonas Weber",
  "Sofia Marino",
  "Ravi Patel",
  "Nora Lindqvist",
  "Kenji Sato",
];

const OverflowListStory: StoryRender = ({ sample }) => (
  <MantineCanvas>
    <Stack gap="xs" w={{ base: "100%", sm: 380 }}>
      <Text size="xs" c="gray.5">
        {sample.label ?? "Reviewers on this release"}
      </Text>
      <OverflowList
        data={reviewers}
        gap="xs"
        renderItem={(name) => (
          <Text size="sm" span>
            {name}
          </Text>
        )}
        renderOverflow={(items) => (
          <Text size="sm" c="gray.5" span>
            +{items.length} more
          </Text>
        )}
      />
    </Stack>
  </MantineCanvas>
);

const HueSliderStory: StoryRender = ({ sample }) => (
  <MantineCanvas>
    <Stack gap="xs" w={{ base: "100%", sm: 320 }}>
      <Group justify="space-between">
        <Text size="sm">{sample.label ?? "Theme hue"}</Text>
        <Text size="sm" c="gray.5">
          212°
        </Text>
      </Group>
      <HueSlider value={212} />
    </Stack>
  </MantineCanvas>
);

const AlphaSliderStory: StoryRender = ({ sample }) => (
  <MantineCanvas>
    <Stack gap="xs" w={{ base: "100%", sm: 320 }}>
      <Group justify="space-between">
        <Text size="sm">{sample.label ?? "Overlay opacity"}</Text>
        <Text size="sm" c="gray.5">
          60%
        </Text>
      </Group>
      <AlphaSlider color="#1c7ed6" value={0.6} />
    </Stack>
  </MantineCanvas>
);

const CalendarStory: StoryRender = ({ sample }) => (
  <MantineCanvas>
    <Stack gap="xs" w={{ base: "100%", sm: 340 }}>
      <Text size="xs" c="gray.5">
        {sample.label ?? "Release calendar"}
      </Text>
      <Calendar defaultDate="2026-10-01" />
    </Stack>
  </MantineCanvas>
);

const DateInputStory: StoryRender = ({ sample }) => (
  <MantineCanvas>
    <DateInput
      label={sample.label ?? "Project start date"}
      defaultValue="2026-10-14"
      valueFormat="MMMM D, YYYY"
      clearable
      // Forced open so a static screenshot captures the calendar dropdown.
      popoverProps={{ opened: true, width: "target" }}
      w={{ base: "100%", sm: 320 }}
    />
  </MantineCanvas>
);

const DatePickerStory: StoryRender = ({ sample }) => (
  <MantineCanvas>
    <Stack gap="xs" w={{ base: "100%", sm: 340 }}>
      <Text size="xs" c="gray.5">
        {sample.label ?? "Launch date"}
      </Text>
      <DatePicker defaultDate="2026-10-01" defaultValue="2026-10-22" />
    </Stack>
  </MantineCanvas>
);

const DatePickerInputStory: StoryRender = ({ sample }) => (
  <MantineCanvas>
    <DatePickerInput
      label={sample.label ?? "Launch window"}
      defaultValue="2026-10-22"
      valueFormat="MMMM D, YYYY"
      // Forced open so a static screenshot captures the calendar dropdown.
      popoverProps={{ opened: true, width: "target" }}
      w={{ base: "100%", sm: 320 }}
    />
  </MantineCanvas>
);

const DateTimePickerStory: StoryRender = ({ sample }) => (
  <MantineCanvas>
    <DateTimePicker
      label={sample.label ?? "Deploy at"}
      defaultValue="2026-10-22 14:30:00"
      valueFormat="MMMM D, YYYY HH:mm"
      // Forced open so a static screenshot captures the calendar and time controls.
      popoverProps={{ opened: true, width: "target" }}
      w={{ base: "100%", sm: 340 }}
    />
  </MantineCanvas>
);

const InlineDateTimePickerStory: StoryRender = ({ sample }) => (
  <MantineCanvas>
    <Stack gap="xs" w={{ base: "100%", sm: 340 }}>
      <Text size="xs" c="gray.5">
        {sample.label ?? "Schedule the release call"}
      </Text>
      <InlineDateTimePicker defaultValue="2026-10-22" defaultTimeValue="14:30" />
    </Stack>
  </MantineCanvas>
);

const MonthPickerStory: StoryRender = ({ sample }) => (
  <MantineCanvas>
    <Stack gap="xs" w={{ base: "100%", sm: 340 }}>
      <Text size="xs" c="gray.5">
        {sample.label ?? "Quarterly report month"}
      </Text>
      <MonthPicker defaultDate="2026-10-01" defaultValue="2026-10-01" />
    </Stack>
  </MantineCanvas>
);

const MonthPickerInputStory: StoryRender = ({ sample }) => (
  <MantineCanvas>
    <MonthPickerInput
      label={sample.label ?? "Billing month"}
      defaultValue="2026-10-01"
      valueFormat="MMMM YYYY"
      // Forced open so a static screenshot captures the month dropdown.
      popoverProps={{ opened: true, width: "target" }}
      w={{ base: "100%", sm: 320 }}
    />
  </MantineCanvas>
);

const TimeInputStory: StoryRender = ({ sample }) => (
  <MantineCanvas>
    <TimeInput
      label={sample.label ?? "Daily standup"}
      description="Asia/Kolkata (IST)"
      defaultValue="09:30"
      w={{ base: "100%", sm: 280 }}
    />
  </MantineCanvas>
);

const YearPickerStory: StoryRender = ({ sample }) => (
  <MantineCanvas>
    <Stack gap="xs" w={{ base: "100%", sm: 340 }}>
      <Text size="xs" c="gray.5">
        {sample.label ?? "Model year"}
      </Text>
      <YearPicker defaultDate="2026-01-01" defaultValue="2026-01-01" />
    </Stack>
  </MantineCanvas>
);

const YearPickerInputStory: StoryRender = ({ sample }) => (
  <MantineCanvas>
    <YearPickerInput
      label={sample.label ?? "Warranty year"}
      defaultValue="2026-01-01"
      valueFormat="YYYY"
      // Forced open so a static screenshot captures the year dropdown.
      popoverProps={{ opened: true, width: "target" }}
      w={{ base: "100%", sm: 320 }}
    />
  </MantineCanvas>
);

const TimePickerStory: StoryRender = ({ sample }) => (
  <MantineCanvas>
    <TimePicker
      label={sample.label ?? "Reminder time"}
      defaultValue="14:30"
      withDropdown
      // Forced open so a static screenshot captures the time dropdown.
      popoverProps={{ opened: true, width: "target" }}
      w={{ base: "100%", sm: 280 }}
    />
  </MantineCanvas>
);

const TimeGridStory: StoryRender = ({ sample }) => (
  <MantineCanvas>
    <Stack gap="xs" w={{ base: "100%", sm: 360 }}>
      <Text size="xs" c="gray.5">
        {sample.label ?? "Pick a slot on Thursday"}
      </Text>
      <TimeGrid
        data={["09:00", "09:30", "10:00", "10:30", "11:00", "13:30", "14:00", "14:30", "16:00"]}
        defaultValue="10:00"
      />
    </Stack>
  </MantineCanvas>
);

const TimeValueStory: StoryRender = ({ sample }) => (
  <MantineCanvas>
    <Stack gap="xs" w={{ base: "100%", sm: 300 }}>
      <Group justify="space-between">
        <Text size="sm">{sample.label ?? "Deploy window opens"}</Text>
        <Text size="sm" fw={600}>
          <TimeValue value={new Date(2026, 9, 22, 14, 30)} />
        </Text>
      </Group>
      <Group justify="space-between">
        <Text size="sm" c="gray.5">
          Window closes
        </Text>
        <Text size="sm" fw={600}>
          <TimeValue value={new Date(2026, 9, 22, 18, 0)} />
        </Text>
      </Group>
    </Stack>
  </MantineCanvas>
);

export const storyRenders: Record<string, StoryRender> = {
  "mantine/JsonInput": JsonInputStory,
  "mantine/Image": ImageStory,
  "mantine/Card": CardStory,
  "mantine/PasswordInput": PasswordInputStory,
  "mantine/FileInput": FileInputStory,
  "mantine/Splitter": SplitterStory,
  "mantine/Stepper": StepperStory,
  "mantine/ColorInput": ColorInputStory,
  "mantine/ThemeIcon": ThemeIconStory,
  "mantine/NumberInput": NumberInputStory,
  "mantine/LoadingOverlay": LoadingOverlayStory,
  "mantine/Radio": RadioStory,
  "mantine/Timeline": TimelineStory,
  "mantine/Dialog": DialogStory,
  "mantine/Flex": FlexStory,
  "mantine/List": ListStory,
  "mantine/Spoiler": SpoilerStory,
  "mantine/NavLink": NavLinkStory,
  "mantine/NumberFormatter": NumberFormatterStory,
  "mantine/RollingNumber": RollingNumberStory,
  "mantine/FloatingIndicator": FloatingIndicatorStory,
  "mantine/Tree": TreeStory,
  "mantine/TreeSelect": TreeSelectStory,
  "mantine/Cascader": CascaderStory,
  "mantine/SemiCircleProgress": SemiCircleProgressStory,
  "mantine/AngleSlider": AngleSliderStory,
  "mantine/FloatingWindow": FloatingWindowStory,
  "mantine/TableOfContents": TableOfContentsStory,
  "mantine/OverflowList": OverflowListStory,
  "mantine/HueSlider": HueSliderStory,
  "mantine/AlphaSlider": AlphaSliderStory,
  "mantine/Calendar": CalendarStory,
  "mantine/DateInput": DateInputStory,
  "mantine/DatePicker": DatePickerStory,
  "mantine/DatePickerInput": DatePickerInputStory,
  "mantine/DateTimePicker": DateTimePickerStory,
  "mantine/InlineDateTimePicker": InlineDateTimePickerStory,
  "mantine/MonthPicker": MonthPickerStory,
  "mantine/MonthPickerInput": MonthPickerInputStory,
  "mantine/TimeInput": TimeInputStory,
  "mantine/YearPicker": YearPickerStory,
  "mantine/YearPickerInput": YearPickerInputStory,
  "mantine/TimePicker": TimePickerStory,
  "mantine/TimeGrid": TimeGridStory,
  "mantine/TimeValue": TimeValueStory,
};
