import {
  Button,
  CalendarCell,
  CalendarGrid,
  Cell,
  Column,
  DateInput,
  DateSegment,
  Dialog,
  DialogTrigger,
  Group,
  Heading,
  Input,
  Label,
  Link,
  ListLayout,
  ListBox,
  ListBoxItem,
  Meter,
  Modal,
  ModalOverlay,
  NavigationTree,
  NavigationTreeItem,
  NavigationTreeItemContent,
  NumberField,
  Popover,
  PreviewTrigger,
  ProgressBar,
  RadioField,
  RadioButton,
  RadioGroup,
  RangeCalendar,
  Row,
  SearchField,
  Select,
  SelectValue,
  Separator,
  Slider,
  SliderFill,
  SliderOutput,
  SliderThumb,
  SliderTrack,
  SwitchButton,
  SwitchField,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Table,
  TableBody,
  TableHeader,
  Tabs,
  Tag,
  TagGroup,
  TagList,
  Text,
  TextField,
  TimeField,
  ToggleButton,
  ToggleButtonGroup,
  Token,
  TokenField,
  TokenInput,
  TokenFieldValue,
  Toolbar,
  Tooltip,
  TooltipTrigger,
  Tree,
  TreeItem,
  TreeItemContent,
  Virtualizer,
  UNSTABLE_Toast as Toast,
  UNSTABLE_ToastContent as ToastContent,
  UNSTABLE_ToastQueue as ToastQueue,
  UNSTABLE_ToastRegion as ToastRegion,
} from "react-aria-components";
import { CalendarDate, Time } from "@internationalized/date";
import { ChevronDown, ChevronLeft, ChevronRight, X } from "lucide-react";
import type { StoryRender } from "./type";

/**
 * Preview stories for react-aria: each documented component rendered as the
 * library documents it — behaviour from the real package, Col's theme tokens
 * for the look. Overlays (modals, popovers, tooltips, selects, previews) are
 * held open via their controlled `isOpen`/`onOpenChange` props so a static
 * screenshot captures the interesting surface, mirroring the Radix stories.
 */

const MeterStory: StoryRender = ({ sample }) => (
  <div className="w-full max-w-md">
    <Meter value={68.4}>
      {({ percentage, valueText }) => (
        <>
          <div className="flex items-baseline justify-between text-sm">
            <Label className="font-medium">{sample.label ?? "Storage used"}</Label>
            <span className="text-muted-foreground">{valueText}</span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-primary" style={{ width: `${percentage}%` }} />
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            68.4 GB of 100 GB — design exports take the most space.
          </p>
        </>
      )}
    </Meter>
  </div>
);

const ModalStory: StoryRender = ({ sample }) => (
  <DialogTrigger isOpen onOpenChange={() => {}}>
    <Button className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">
      {sample.buttonLabel ?? "Invite teammate"}
    </Button>
    <ModalOverlay className="fixed inset-0 bg-black/60">
      <Modal className="fixed left-1/2 top-1/2 w-[380px] max-w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2">
        <Dialog className="rounded-xl border border-border bg-card p-6 text-card-foreground outline-none">
          <Heading slot="title" className="text-base font-semibold">
            {sample.title ?? "Invite a team member"}
          </Heading>
          <p className="mt-2 text-sm text-muted-foreground">
            They receive an email with a link to join the Atlas workspace.
          </p>
          <label className="mt-4 grid gap-2 text-sm font-medium">
            Work email
            <input
              defaultValue="sana@northwind.dev"
              className="rounded-md border border-input bg-background px-3 py-2 text-sm font-normal"
            />
          </label>
          <div className="mt-6 flex justify-end gap-3">
            <Button className="rounded-md border border-border px-4 py-2 text-sm">Cancel</Button>
            <Button className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">Send invite</Button>
          </div>
        </Dialog>
      </Modal>
    </ModalOverlay>
  </DialogTrigger>
);

/** Row style for every navigation item: indentation follows the tree level. */
function navItemClass(level: number): string {
  return `flex items-center gap-1.5 rounded-md py-1.5 pr-2 text-sm data-[current]:bg-secondary ${level > 1 ? "pl-6" : "pl-2"}`;
}

const NavigationTreeStory: StoryRender = ({ sample }) => (
  <nav aria-label="Workspace" className="w-full max-w-xs">
    <NavigationTree
      aria-label="Workspace"
      selectedRoute="/projects/apollo"
      defaultExpandedKeys={["projects"]}
    >
      <NavigationTreeItem
        id="overview"
        href="/overview"
        textValue="Overview"
        className={({ level }) => navItemClass(level)}
      >
        <NavigationTreeItemContent>
          <Link className="flex-1">Overview</Link>
        </NavigationTreeItemContent>
      </NavigationTreeItem>
      <NavigationTreeItem
        id="projects"
        href="/projects"
        textValue="Projects"
        className={({ level }) => navItemClass(level)}
      >
        <NavigationTreeItemContent>
          {({ isExpanded }) => (
            <>
              <Button
                slot="chevron"
                aria-label={isExpanded ? "Collapse projects" : "Expand projects"}
                className="flex items-center text-muted-foreground"
              >
                {isExpanded ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
              </Button>
              <Link className="flex-1">Projects</Link>
            </>
          )}
        </NavigationTreeItemContent>
        <NavigationTreeItem
          id="apollo"
          href="/projects/apollo"
          textValue="Apollo"
          className={({ level }) => navItemClass(level)}
        >
          <NavigationTreeItemContent>
            <Link className="flex-1">{sample.project ?? "Apollo"}</Link>
          </NavigationTreeItemContent>
        </NavigationTreeItem>
        <NavigationTreeItem
          id="gemini"
          href="/projects/gemini"
          textValue="Gemini"
          className={({ level }) => navItemClass(level)}
        >
          <NavigationTreeItemContent>
            <Link className="flex-1">Gemini</Link>
          </NavigationTreeItemContent>
        </NavigationTreeItem>
        <NavigationTreeItem
          id="orion"
          href="/projects/orion"
          textValue="Orion"
          className={({ level }) => navItemClass(level)}
        >
          <NavigationTreeItemContent>
            <Link className="flex-1">Orion</Link>
          </NavigationTreeItemContent>
        </NavigationTreeItem>
      </NavigationTreeItem>
      <NavigationTreeItem
        id="billing"
        href="/billing"
        textValue="Billing"
        className={({ level }) => navItemClass(level)}
      >
        <NavigationTreeItemContent>
          <Link className="flex-1">Billing</Link>
        </NavigationTreeItemContent>
      </NavigationTreeItem>
      <NavigationTreeItem
        id="settings"
        href="/settings"
        textValue="Settings"
        className={({ level }) => navItemClass(level)}
      >
        <NavigationTreeItemContent>
          <Link className="flex-1">Settings</Link>
        </NavigationTreeItemContent>
      </NavigationTreeItem>
    </NavigationTree>
  </nav>
);

const NumberFieldStory: StoryRender = ({ sample }) => (
  <NumberField defaultValue={5} minValue={1} maxValue={25} className="w-full max-w-xs">
    <Label className="text-sm font-medium">{sample.label ?? "Seats"}</Label>
    <Group className="mt-2 flex items-center gap-2 rounded-md border border-input bg-background px-2 py-1">
      <Button slot="decrement" aria-label="Decrease seats" className="size-7 rounded-sm text-lg text-muted-foreground">
        −
      </Button>
      <Input className="w-full bg-transparent text-center text-sm outline-none" />
      <Button slot="increment" aria-label="Increase seats" className="size-7 rounded-sm text-lg text-muted-foreground">
        +
      </Button>
    </Group>
    <Text slot="description" className="mt-2 text-sm text-muted-foreground">
      Billed monthly at $12 per seat.
    </Text>
  </NumberField>
);

const PopoverStory: StoryRender = ({ sample }) => (
  <DialogTrigger isOpen onOpenChange={() => {}}>
    <Button className="rounded-md border border-border px-4 py-2 text-sm">Share report</Button>
    <Popover className="w-72 rounded-xl border border-border bg-popover p-4 text-popover-foreground outline-none">
      <Dialog>
        <Heading slot="title" className="text-sm font-semibold">
          {sample.title ?? "Share revenue report"}
        </Heading>
        <p className="mt-2 text-sm text-muted-foreground">
          Anyone with the link can view the April numbers.
        </p>
        <input
          readOnly
          defaultValue="col.app/r/april-revenue"
          className="mt-3 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        />
        <Button className="mt-3 rounded-md bg-primary px-3 py-1.5 text-sm text-primary-foreground">Copy link</Button>
      </Dialog>
    </Popover>
  </DialogTrigger>
);

const PreviewTriggerStory: StoryRender = ({ sample }) => (
  <p className="w-full max-w-lg text-sm leading-6 text-muted-foreground">
    {"Merged "}
    <PreviewTrigger isOpen onOpenChange={() => {}}>
      <Link href="#issue-482" className="text-primary underline underline-offset-4">
        #482
      </Link>
      <Popover className="w-72 rounded-xl border border-border bg-popover p-4 text-popover-foreground outline-none">
        <p className="text-sm font-semibold text-foreground">
          {sample.issueTitle ?? "Retry webhook deliveries with backoff"}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">#482 · Opened by Maya Chen</p>
        <p className="mt-3 text-sm text-muted-foreground">
          Failed deliveries retry three times before the endpoint is paused.
        </p>
        <Button className="mt-4 rounded-md border border-border px-3 py-1.5 text-sm text-popover-foreground">
          View issue
        </Button>
      </Popover>
    </PreviewTrigger>
    {" and cut median delivery latency by 40%."}
  </p>
);

const ProgressBarStory: StoryRender = ({ sample }) => (
  <ProgressBar value={72} className="w-full max-w-md">
    {({ percentage, valueText }) => (
      <>
        <div className="flex items-baseline justify-between text-sm">
          <Label className="font-medium">{sample.label ?? "Importing 2,400 contacts"}</Label>
          <span className="text-muted-foreground">{valueText}</span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-primary" style={{ width: `${percentage}%` }} />
        </div>
        <p className="mt-2 text-sm text-muted-foreground">1,728 of 2,400 records processed.</p>
      </>
    )}
  </ProgressBar>
);

const RadioGroupStory: StoryRender = ({ sample }) => (
  <RadioGroup defaultValue="annual" className="grid w-full max-w-sm gap-3">
    <Label className="text-sm font-medium">{sample.label ?? "Billing cycle"}</Label>
    {[
      { value: "monthly", title: "Monthly", detail: "$12 per seat, billed on the 1st." },
      { value: "annual", title: "Annual", detail: "$120 per seat — two months free." },
      { value: "usage", title: "Usage-based", detail: "$0.004 per preview render, capped at $400." },
    ].map((option) => (
      <RadioField key={option.value} value={option.value} className="grid gap-1">
        <RadioButton className="flex items-center gap-3 text-sm">
          {({ isSelected }) => (
            <>
              <span
                className={`flex size-5 items-center justify-center rounded-full border ${isSelected ? "border-primary" : "border-border"}`}
              >
                {isSelected && <span className="size-2.5 rounded-full bg-primary" />}
              </span>
              {option.title}
            </>
          )}
        </RadioButton>
        <Text slot="description" className="pl-8 text-sm text-muted-foreground">
          {option.detail}
        </Text>
      </RadioField>
    ))}
  </RadioGroup>
);

const RangeCalendarStory: StoryRender = ({ sample }) => (
  <div className="w-full max-w-xs">
    <RangeCalendar
      defaultValue={{ start: new CalendarDate(2026, 4, 6), end: new CalendarDate(2026, 4, 17) }}
      className="w-full"
    >
      <header className="flex items-center justify-between pb-2">
        <Button slot="previous" aria-label="Previous month" className="flex size-8 items-center justify-center rounded-md text-muted-foreground">
          <ChevronLeft className="size-4" />
        </Button>
        <Heading className="text-sm font-semibold" />
        <Button slot="next" aria-label="Next month" className="flex size-8 items-center justify-center rounded-md text-muted-foreground">
          <ChevronRight className="size-4" />
        </Button>
      </header>
      <CalendarGrid className="w-full border-separate border-spacing-1 text-sm" weekdayStyle="short">
        {(date) => (
          <CalendarCell
            date={date}
            className={({ isSelected, isSelectionStart, isSelectionEnd, isOutsideMonth }) =>
              `flex size-9 items-center justify-center rounded-md ${
                isSelectionStart || isSelectionEnd
                  ? "bg-primary text-primary-foreground"
                  : isSelected
                    ? "bg-secondary text-foreground"
                    : isOutsideMonth
                      ? "text-muted-foreground"
                      : "text-foreground"
              }`
            }
          />
        )}
      </CalendarGrid>
    </RangeCalendar>
    <p className="mt-3 text-sm text-muted-foreground">{sample.label ?? "Sprint 14"} — Apr 6 to Apr 17, 2026.</p>
  </div>
);

const SearchFieldStory: StoryRender = ({ sample }) => (
  <SearchField defaultValue={sample.query ?? "harbor"} className="w-full max-w-sm">
    <Label className="text-sm font-medium">{sample.label ?? "Search invoices"}</Label>
    <Group className="mt-2 flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2">
      <Input placeholder="Customer, number, or status" className="w-full bg-transparent text-sm outline-none" />
      <Button slot="clear" aria-label="Clear search" className="flex items-center text-muted-foreground">
        <X className="size-4" />
      </Button>
    </Group>
    <Text slot="description" className="mt-2 text-sm text-muted-foreground">
      2 open invoices match “harbor”.
    </Text>
  </SearchField>
);

const SelectStory: StoryRender = ({ sample }) => (
  <Select isOpen onOpenChange={() => {}} defaultSelectedKey="production" className="w-full max-w-xs">
    <Label className="text-sm font-medium">{sample.label ?? "Environment"}</Label>
    <Button className="mt-2 flex w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm">
      <SelectValue />
      <ChevronDown className="size-4 text-muted-foreground" />
    </Button>
    <Popover className="w-[var(--trigger-width)] rounded-md border border-border bg-popover p-1 text-popover-foreground outline-none">
      <ListBox className="outline-none">
        <ListBoxItem id="production" className="rounded-sm px-2 py-1.5 text-sm">
          Production
        </ListBoxItem>
        <ListBoxItem id="staging" className="rounded-sm px-2 py-1.5 text-sm">
          Staging
        </ListBoxItem>
        <ListBoxItem id="preview" className="rounded-sm px-2 py-1.5 text-sm">
          Preview
        </ListBoxItem>
      </ListBox>
    </Popover>
  </Select>
);

const SeparatorStory: StoryRender = ({ sample }) => (
  <div className="w-full max-w-md">
    <p className="text-sm font-medium">{sample.title ?? "Atlas workspace"}</p>
    <Separator className="my-4 h-px bg-border" />
    <p className="text-sm text-muted-foreground">12 projects · 8 teammates · billing closes on the 1st.</p>
  </div>
);

const SliderStory: StoryRender = ({ sample }) => (
  <Slider
    defaultValue={[6500]}
    minValue={0}
    maxValue={12000}
    step={250}
    formatOptions={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }}
    className="w-full max-w-md"
  >
    <div className="flex items-baseline justify-between text-sm">
      <Label className="font-medium">{sample.label ?? "Monthly ad spend"}</Label>
      <SliderOutput />
    </div>
    <SliderTrack className="mt-3">
      <SliderFill className="rounded-full bg-primary" />
      <SliderThumb className="block size-5 rounded-full border-2 border-primary bg-background" />
    </SliderTrack>
  </Slider>
);

const SwitchStory: StoryRender = ({ sample }) => (
  <div className="grid w-full max-w-sm gap-5">
    <SwitchField defaultSelected>
      <SwitchButton className="flex items-center gap-3 text-sm">
        {({ isSelected }) => (
          <>
            <span
              className={`flex h-5 w-9 items-center rounded-full px-0.5 ${isSelected ? "bg-primary" : "bg-muted"}`}
            >
              <span
                className={`size-4 rounded-full transition-transform ${isSelected ? "translate-x-4 bg-primary-foreground" : "translate-x-0 bg-muted-foreground"}`}
              />
            </span>
            {sample.label ?? "Weekly usage report"}
          </>
        )}
      </SwitchButton>
      <Text slot="description" className="text-sm text-muted-foreground">
        Sent every Monday with render counts and top stories.
      </Text>
    </SwitchField>
    <SwitchField>
      <SwitchButton className="flex items-center gap-3 text-sm">
        {({ isSelected }) => (
          <>
            <span
              className={`flex h-5 w-9 items-center rounded-full px-0.5 ${isSelected ? "bg-primary" : "bg-muted"}`}
            >
              <span
                className={`size-4 rounded-full transition-transform ${isSelected ? "translate-x-4 bg-primary-foreground" : "translate-x-0 bg-muted-foreground"}`}
              />
            </span>
            Auto-archive stale projects
          </>
        )}
      </SwitchButton>
      <Text slot="description" className="text-sm text-muted-foreground">
        Projects with no activity for 90 days move to the archive.
      </Text>
    </SwitchField>
  </div>
);

const TableStory: StoryRender = ({ sample }) => (
  <Table aria-label="Invoices" className="w-full max-w-2xl">
    <TableHeader>
      <Column isRowHeader className="border-b border-border pb-2 text-left text-sm font-medium">
        Invoice
      </Column>
      <Column className="border-b border-border pb-2 text-left text-sm font-medium">Customer</Column>
      <Column className="border-b border-border pb-2 text-left text-sm font-medium">Status</Column>
      <Column className="border-b border-border pb-2 text-right text-sm font-medium">Amount</Column>
    </TableHeader>
    <TableBody>
      <Row>
        <Cell className="border-b border-border py-2 text-sm">INV-2041</Cell>
        <Cell className="border-b border-border py-2 text-sm">{sample.customer1 ?? "Acme Robotics"}</Cell>
        <Cell className="border-b border-border py-2 text-sm text-muted-foreground">Paid</Cell>
        <Cell className="border-b border-border py-2 text-right text-sm">$4,800</Cell>
      </Row>
      <Row>
        <Cell className="border-b border-border py-2 text-sm">INV-2042</Cell>
        <Cell className="border-b border-border py-2 text-sm">Northwind Health</Cell>
        <Cell className="border-b border-border py-2 text-sm text-muted-foreground">Pending</Cell>
        <Cell className="border-b border-border py-2 text-right text-sm">$2,150</Cell>
      </Row>
      <Row>
        <Cell className="border-b border-border py-2 text-sm">INV-2043</Cell>
        <Cell className="border-b border-border py-2 text-sm">Blue Harbor Studio</Cell>
        <Cell className="border-b border-border py-2 text-sm text-destructive">Overdue</Cell>
        <Cell className="border-b border-border py-2 text-right text-sm">$960</Cell>
      </Row>
      <Row>
        <Cell className="py-2 text-sm">INV-2044</Cell>
        <Cell className="py-2 text-sm">Lumen Labs</Cell>
        <Cell className="py-2 text-sm text-muted-foreground">Paid</Cell>
        <Cell className="py-2 text-right text-sm">$3,420</Cell>
      </Row>
    </TableBody>
  </Table>
);

const TabsStory: StoryRender = ({ sample }) => (
  <Tabs defaultSelectedKey="activity" className="w-full max-w-md">
    <TabList aria-label="Project" className="flex gap-2 border-b border-border">
      <Tab id="overview" className="border-b-2 border-transparent px-3 py-2 text-sm data-[selected]:border-primary">
        Overview
      </Tab>
      <Tab id="activity" className="border-b-2 border-transparent px-3 py-2 text-sm data-[selected]:border-primary">
        Activity
      </Tab>
      <Tab id="settings" className="border-b-2 border-transparent px-3 py-2 text-sm data-[selected]:border-primary">
        Settings
      </Tab>
    </TabList>
    <TabPanels>
      <TabPanel id="overview" className="pt-4 text-sm text-muted-foreground">
        {sample.project ?? "Apollo"} is on the Growth plan with 8 seats and 12 active projects.
      </TabPanel>
      <TabPanel id="activity" className="pt-4 text-sm text-muted-foreground">
        Maya deployed billing-api to production 20 minutes ago; Dev merged #482 earlier today.
      </TabPanel>
      <TabPanel id="settings" className="pt-4 text-sm text-muted-foreground">
        Workspace defaults, member permissions, and the deploy webhook all live here.
      </TabPanel>
    </TabPanels>
  </Tabs>
);

const TagGroupStory: StoryRender = ({ sample }) => (
  <TagGroup aria-label="Release labels" onRemove={() => {}} className="w-full max-w-md">
    <Label className="text-sm font-medium">{sample.label ?? "Release labels"}</Label>
    <TagList className="mt-2 flex flex-wrap gap-2">
      {[
        sample.tag1 ?? "Billing",
        "Auth",
        "Performance",
        "Webhooks",
        "Search",
      ].map((label) => (
        <Tag key={label} textValue={label} className="flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-sm">
          {label}
          <Button slot="remove" aria-label={`Remove ${label}`} className="pl-1 text-muted-foreground">
            <X className="size-3.5" />
          </Button>
        </Tag>
      ))}
    </TagList>
    <Text slot="description" className="mt-2 text-sm text-muted-foreground">
      Applied to every deploy of the billing-api service.
    </Text>
  </TagGroup>
);

const TextFieldStory: StoryRender = ({ sample }) => (
  <TextField isRequired className="grid w-full max-w-sm gap-2">
    <Label className="text-sm font-medium">{sample.label ?? "Project name"}</Label>
    <Input defaultValue="Apollo" className="rounded-md border border-input bg-background px-3 py-2 text-sm" />
    <Text slot="description" className="text-sm text-muted-foreground">
      Shown on invoices and in the workspace switcher.
    </Text>
  </TextField>
);

const TimeFieldStory: StoryRender = ({ sample }) => (
  <TimeField defaultValue={new Time(9, 30)} className="w-full max-w-xs">
    <Label className="text-sm font-medium">{sample.label ?? "Daily standup"}</Label>
    <DateInput className="mt-2 flex rounded-md border border-input bg-background px-3 py-2 text-sm">
      {(segment) => <DateSegment segment={segment} className="rounded-sm px-0.5" />}
    </DateInput>
    <Text slot="description" className="mt-2 text-sm text-muted-foreground">
      Asia/Kolkata — the call invite goes out ten minutes before.
    </Text>
  </TimeField>
);

type DeployToast = { title: string; description: string };

// The documented global-toast-queue pattern, seeded at import so a static
// preview captures the toast without a click.
const deployToastQueue = new ToastQueue<DeployToast>();
deployToastQueue.add({
  title: "Deployment complete",
  description: "pricing-page is live in production.",
});

const ToastStory: StoryRender = ({ sample }) => (
  <ToastRegion queue={deployToastQueue} className="fixed bottom-4 right-4 flex w-80 flex-col gap-2">
    {({ toast }) => (
      <Toast toast={toast} className="flex items-center gap-4 rounded-xl border border-border bg-popover p-4 text-popover-foreground outline-none">
        <ToastContent className="flex min-w-0 flex-1 flex-col">
          <Text slot="title" className="text-sm font-semibold">
            {sample.title ?? toast.content.title}
          </Text>
          <Text slot="description" className="mt-1 text-sm text-muted-foreground">
            {sample.description ?? toast.content.description}
          </Text>
        </ToastContent>
        <Button slot="close" aria-label="Dismiss" className="flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground">
          <X className="size-4" />
        </Button>
      </Toast>
    )}
  </ToastRegion>
);

const ToggleButtonStory: StoryRender = ({ sample }) => (
  <div className="flex items-center gap-3">
    <ToggleButton defaultSelected className="rounded-md border border-border px-4 py-2 text-sm data-[selected]:bg-secondary">
      {sample.primaryLabel ?? "Watching"}
    </ToggleButton>
    <ToggleButton className="rounded-md border border-border px-4 py-2 text-sm data-[selected]:bg-secondary">
      {sample.secondaryLabel ?? "Starred"}
    </ToggleButton>
  </div>
);

const ToggleButtonGroupStory: StoryRender = ({ sample }) => (
  <ToggleButtonGroup
    selectionMode="single"
    defaultSelectedKeys={["week"]}
    aria-label={sample.label ?? "Chart range"}
    className="flex rounded-md border border-border p-1"
  >
    <ToggleButton id="day" className="rounded-sm px-3 py-1.5 text-sm data-[selected]:bg-secondary">
      Day
    </ToggleButton>
    <ToggleButton id="week" className="rounded-sm px-3 py-1.5 text-sm data-[selected]:bg-secondary">
      Week
    </ToggleButton>
    <ToggleButton id="month" className="rounded-sm px-3 py-1.5 text-sm data-[selected]:bg-secondary">
      Month
    </ToggleButton>
  </ToggleButtonGroup>
);

const TokenFieldStory: StoryRender = ({ sample }) => (
  <TokenField
    defaultValue={
      new TokenFieldValue([
        { type: "token", text: sample.token1 ?? "maya.chen@northwind.dev" },
        { type: "token", text: "dev.patel@northwind.dev" },
        { type: "token", text: "amara.koll@northwind.dev" },
      ])
    }
    className="w-full max-w-md"
  >
    <Label className="text-sm font-medium">{sample.label ?? "Notify teammates"}</Label>
    <TokenInput className="mt-2 flex flex-wrap items-center gap-2 rounded-md border border-input bg-background px-2 py-2 text-sm">
      {(segment) => <Token className="rounded-md bg-secondary px-2 py-1">{segment.text}</Token>}
    </TokenInput>
    <Text slot="description" className="mt-2 text-sm text-muted-foreground">
      Press Enter after each address; tokens resolve against the workspace directory.
    </Text>
  </TokenField>
);

const ToolbarStory: StoryRender = ({ sample }) => (
  <Toolbar
    aria-label={sample.label ?? "Comment formatting"}
    className="flex w-full max-w-md items-center gap-1 rounded-md border border-border p-1"
  >
    <Button className="rounded-sm px-3 py-1.5 text-sm">Bold</Button>
    <Button className="rounded-sm px-3 py-1.5 text-sm">Italic</Button>
    <Button className="rounded-sm px-3 py-1.5 text-sm">Link</Button>
    <Separator orientation="vertical" className="mx-1 h-5 w-px bg-border" />
    <ToggleButtonGroup selectionMode="single" defaultSelectedKeys={["left"]} aria-label="Alignment">
      <ToggleButton id="left" className="rounded-sm px-3 py-1.5 text-sm data-[selected]:bg-secondary">
        Left
      </ToggleButton>
      <ToggleButton id="center" className="rounded-sm px-3 py-1.5 text-sm data-[selected]:bg-secondary">
        Center
      </ToggleButton>
      <ToggleButton id="right" className="rounded-sm px-3 py-1.5 text-sm data-[selected]:bg-secondary">
        Right
      </ToggleButton>
    </ToggleButtonGroup>
  </Toolbar>
);

const TooltipStory: StoryRender = ({ sample }) => (
  <TooltipTrigger isOpen onOpenChange={() => {}}>
    <Button className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">
      {sample.buttonLabel ?? "Start free trial"}
    </Button>
    <Tooltip className="rounded-md border border-border bg-popover px-3 py-1.5 text-sm text-popover-foreground outline-none">
      {sample.tooltip ?? "14 days of the Growth plan — no card required."}
    </Tooltip>
  </TooltipTrigger>
);

/** Row style for tree rows: indent by level, highlight the selected file. */
function treeItemClass(level: number, isSelected: boolean): string {
  return `flex items-center gap-2 rounded-md py-1 pr-2 ${level > 1 ? "pl-6" : "pl-2"} ${isSelected ? "bg-secondary text-foreground" : ""}`;
}

const TreeStory: StoryRender = ({ sample }) => (
  <Tree
    aria-label="Files"
    selectionMode="single"
    defaultExpandedKeys={["src", "components"]}
    defaultSelectedKeys={["preview-stories"]}
    className="w-full max-w-xs rounded-xl border border-border p-2 text-sm"
  >
    <TreeItem id="src" textValue="src" className={({ level, isSelected }) => treeItemClass(level, isSelected)}>
      <TreeItemContent>
        {({ isExpanded }) => (
          <>
            <Button slot="chevron" aria-label={isExpanded ? "Collapse src" : "Expand src"} className="flex items-center text-muted-foreground">
              {isExpanded ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
            </Button>
            <span>src</span>
          </>
        )}
      </TreeItemContent>
      <TreeItem id="components" textValue="components" className={({ level, isSelected }) => treeItemClass(level, isSelected)}>
        <TreeItemContent>
          {({ isExpanded }) => (
            <>
              <Button slot="chevron" aria-label={isExpanded ? "Collapse components" : "Expand components"} className="flex items-center text-muted-foreground">
                {isExpanded ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
              </Button>
              <span>components</span>
            </>
          )}
        </TreeItemContent>
        <TreeItem id="preview-canvas" textValue="PreviewCanvas.tsx" className={({ level, isSelected }) => treeItemClass(level, isSelected)}>
          <TreeItemContent>
            <span className="pl-6 text-muted-foreground">PreviewCanvas.tsx</span>
          </TreeItemContent>
        </TreeItem>
        <TreeItem id="preview-stories" textValue="PreviewStories.tsx" className={({ level, isSelected }) => treeItemClass(level, isSelected)}>
          <TreeItemContent>
            <span className="pl-6 text-muted-foreground">{sample.file ?? "PreviewStories.tsx"}</span>
          </TreeItemContent>
        </TreeItem>
      </TreeItem>
      <TreeItem id="lib" textValue="lib" className={({ level, isSelected }) => treeItemClass(level, isSelected)}>
        <TreeItemContent>
          {({ isExpanded }) => (
            <>
              <Button slot="chevron" aria-label={isExpanded ? "Collapse lib" : "Expand lib"} className="flex items-center text-muted-foreground">
                {isExpanded ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
              </Button>
              <span>lib</span>
            </>
          )}
        </TreeItemContent>
        <TreeItem id="mcp-tools" textValue="mcp-tools.ts" className={({ level, isSelected }) => treeItemClass(level, isSelected)}>
          <TreeItemContent>
            <span className="pl-6 text-muted-foreground">mcp-tools.ts</span>
          </TreeItemContent>
        </TreeItem>
      </TreeItem>
    </TreeItem>
    <TreeItem id="package-json" textValue="package.json" className={({ level, isSelected }) => treeItemClass(level, isSelected)}>
      <TreeItemContent>
        <span className="pl-6 text-muted-foreground">package.json</span>
      </TreeItemContent>
    </TreeItem>
  </Tree>
);

const AUDIT_ACTORS = [
  "Maya Chen",
  "Dev Patel",
  "Amara Koll",
  "Sana Rahimi",
  "Jonas Berg",
  "Priya Nair",
  "Leo Martins",
  "Hannah Osei",
];

const AUDIT_ACTIONS = [
  "deployed billing-api to production",
  "rotated the webhook signing key",
  "invited sana@northwind.dev to Atlas",
  "merged pull request #482",
  "archived the legacy checkout project",
  "updated the April revenue report",
  "enabled two-factor enforcement",
  "created the Gemini workspace",
  "revoked the staging API token",
  "changed the standup time to 09:30",
];

/** Audit log rows: 240 realistic events with times two minutes apart. */
function buildAuditRows(): { id: number; text: string }[] {
  return Array.from({ length: 240 }, (_, index) => {
    const actor = AUDIT_ACTORS[index % AUDIT_ACTORS.length];
    const action = AUDIT_ACTIONS[index % AUDIT_ACTIONS.length];
    const minutes = 8 * 60 + index * 2;
    const hour = String(Math.floor(minutes / 60)).padStart(2, "0");
    const minute = String(minutes % 60).padStart(2, "0");
    return { id: index, text: `${actor} ${action} · ${hour}:${minute}` };
  });
}

const VirtualizerStory: StoryRender = ({ sample }) => {
  const rows = buildAuditRows();
  return (
    <div className="w-full max-w-md">
      <p className="text-sm font-medium">{sample.title ?? "Audit log"}</p>
      <Virtualizer layout={ListLayout}>
        <ListBox
          aria-label="Audit log"
          items={rows}
          className="mt-2 block h-72 overflow-auto rounded-xl border border-border p-0 text-sm"
        >
          {(row) => (
            <ListBoxItem className="flex h-full min-h-0 items-center border-b border-border px-3">
              {row.text}
            </ListBoxItem>
          )}
        </ListBox>
      </Virtualizer>
      <p className="mt-2 text-sm text-muted-foreground">
        {rows.length.toLocaleString()} events — only the visible rows render.
      </p>
    </div>
  );
};

export const storyRenders: Record<string, StoryRender> = {
  "react-aria/Meter": MeterStory,
  "react-aria/Modal": ModalStory,
  "react-aria/NavigationTree": NavigationTreeStory,
  "react-aria/NumberField": NumberFieldStory,
  "react-aria/Popover": PopoverStory,
  "react-aria/PreviewTrigger": PreviewTriggerStory,
  "react-aria/ProgressBar": ProgressBarStory,
  "react-aria/RadioGroup": RadioGroupStory,
  "react-aria/RangeCalendar": RangeCalendarStory,
  "react-aria/SearchField": SearchFieldStory,
  "react-aria/Select": SelectStory,
  "react-aria/Separator": SeparatorStory,
  "react-aria/Slider": SliderStory,
  "react-aria/Switch": SwitchStory,
  "react-aria/Table": TableStory,
  "react-aria/Tabs": TabsStory,
  "react-aria/TagGroup": TagGroupStory,
  "react-aria/TextField": TextFieldStory,
  "react-aria/TimeField": TimeFieldStory,
  "react-aria/Toast": ToastStory,
  "react-aria/ToggleButton": ToggleButtonStory,
  "react-aria/ToggleButtonGroup": ToggleButtonGroupStory,
  "react-aria/TokenField": TokenFieldStory,
  "react-aria/Toolbar": ToolbarStory,
  "react-aria/Tooltip": TooltipStory,
  "react-aria/Tree": TreeStory,
  "react-aria/Virtualizer": VirtualizerStory,
};
