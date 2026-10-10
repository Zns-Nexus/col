import { Check, ChevronDown, Minus, Plus } from "lucide-react";
import {
  NavigationMenu,
  NumberField,
  OTPField,
  Popover,
  PreviewCard,
  Progress,
  Radio,
  RadioGroup,
  ScrollArea,
  Select,
  Separator,
  Slider,
  Switch,
  Tabs,
  Toast,
  Toggle,
  ToggleGroup,
  Toolbar,
  Tooltip,
} from "@base-ui/react";
import type { StoryRender } from "./type";

/**
 * Preview stories for Base UI (batch 2): each documented unstyled primitive
 * assembled the way the library's docs assemble it — accessible behaviour from
 * the real package, Col's theme tokens for the look. Overlay primitives are
 * held open so a static screenshot shows the popup, not just the trigger, and
 * sample strings replace the display text where a caller labels the render.
 */

const selectEnvironments = [
  { value: "production", label: "Production" },
  { value: "staging", label: "Staging" },
  { value: "preview", label: "Preview · pr-812" },
  { value: "development", label: "Development" },
];

const NavigationMenuStory: StoryRender = ({ sample }) => (
  <NavigationMenu.Root defaultValue="platform" className="text-sm">
    <NavigationMenu.List className="flex gap-1 rounded-md border border-border p-1">
      <NavigationMenu.Item value="platform">
        <NavigationMenu.Trigger className="flex items-center gap-1.5 rounded-sm px-3 py-1.5 text-sm">
          {sample.menuItem1 ?? "Platform"}
          <NavigationMenu.Icon>
            <ChevronDown className="size-4 text-muted-foreground" />
          </NavigationMenu.Icon>
        </NavigationMenu.Trigger>
        <NavigationMenu.Content className="h-full w-max max-w-[400px] p-2">
          <ul className="m-0 grid list-none grid-cols-2 gap-1 p-0">
            {[
              ["Observability", "Metrics, logs, and traces in one place."],
              ["Incident response", "On-call rotations and alert routing."],
              ["Status pages", "Public updates for your customers."],
              ["Audit log", "Every change to production, recorded."],
            ].map(([title, description]) => (
              <li key={title}>
                <NavigationMenu.Link
                  href={`#${title.toLowerCase().replace(/\s+/g, "-")}`}
                  className="block rounded-sm p-2 text-inherit no-underline"
                >
                  <p className="text-sm font-medium">{title}</p>
                  <p className="text-sm text-muted-foreground">{description}</p>
                </NavigationMenu.Link>
              </li>
            ))}
          </ul>
        </NavigationMenu.Content>
      </NavigationMenu.Item>
      <NavigationMenu.Item value="docs">
        <NavigationMenu.Trigger className="rounded-sm px-3 py-1.5 text-sm">
          {sample.menuItem2 ?? "Docs"}
        </NavigationMenu.Trigger>
      </NavigationMenu.Item>
      <NavigationMenu.Item value="pricing">
        <NavigationMenu.Trigger className="rounded-sm px-3 py-1.5 text-sm">
          {sample.menuItem3 ?? "Pricing"}
        </NavigationMenu.Trigger>
      </NavigationMenu.Item>
    </NavigationMenu.List>
    <NavigationMenu.Portal>
      <NavigationMenu.Positioner
        sideOffset={8}
        className="h-[var(--positioner-height)] w-[var(--positioner-width)]"
      >
        <NavigationMenu.Popup className="h-[var(--popup-height)] w-[var(--popup-width)] rounded-md border border-border bg-popover text-popover-foreground">
          <NavigationMenu.Viewport className="relative h-full w-full overflow-hidden" />
        </NavigationMenu.Popup>
      </NavigationMenu.Positioner>
    </NavigationMenu.Portal>
  </NavigationMenu.Root>
);

const NumberFieldStory: StoryRender = ({ sample }) => (
  <div className="grid w-full max-w-sm gap-2">
    <label htmlFor="number-field-story-seats" className="text-sm font-medium">
      {sample.label ?? "Team seats"}
    </label>
    <NumberField.Root
      id="number-field-story-seats"
      defaultValue={24}
      min={1}
      max={500}
      className="flex items-center gap-3"
    >
      <NumberField.Group className="flex h-10 items-stretch">
        <NumberField.Decrement className="flex w-10 items-center justify-center rounded-l-md border border-border">
          <Minus className="size-4" />
        </NumberField.Decrement>
        <NumberField.Input className="w-20 border-y border-border bg-background px-3 text-center text-sm tabular-nums" />
        <NumberField.Increment className="flex w-10 items-center justify-center rounded-r-md border border-border">
          <Plus className="size-4" />
        </NumberField.Increment>
      </NumberField.Group>
      <p className="text-sm text-muted-foreground">{sample.hint ?? "Billed at $18 per seat each month."}</p>
    </NumberField.Root>
  </div>
);

const OTPFieldStory: StoryRender = ({ sample }) => (
  <div className="grid w-full max-w-sm gap-2">
    <label htmlFor="otp-field-story-code" className="text-sm font-medium">
      {sample.label ?? "Verification code"}
    </label>
    <OTPField.Root id="otp-field-story-code" length={6} defaultValue="4829" className="flex gap-2">
      {Array.from({ length: 6 }, (_, index) => (
        <OTPField.Input
          key={index}
          aria-label={`Character ${index + 1} of 6`}
          className="size-11 rounded-md border border-border bg-background text-center text-lg tabular-nums"
        />
      ))}
    </OTPField.Root>
    <p className="text-sm text-muted-foreground">
      {sample.hint ?? "Enter the 6-digit code we sent to +1 (415) 555-0132."}
    </p>
  </div>
);

const PopoverStory: StoryRender = ({ sample }) => (
  <Popover.Root defaultOpen>
    <Popover.Trigger className="rounded-md border border-border px-4 py-2 text-sm">
      {sample.triggerLabel ?? "Invite teammate"}
    </Popover.Trigger>
    <Popover.Portal>
      <Popover.Positioner sideOffset={8}>
        <Popover.Popup className="w-72 rounded-xl border border-border bg-popover p-4 text-popover-foreground">
          <Popover.Title className="text-sm font-semibold">
            {sample.title ?? "Invite to Northwind Q3 forecast"}
          </Popover.Title>
          <Popover.Description className="mt-2 text-sm text-muted-foreground">
            {sample.description ?? "They get view access to the shared workspace."}
          </Popover.Description>
          <input
            aria-label="Teammate email"
            defaultValue="priya@northwind.io"
            className="mt-3 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
          <div className="mt-4 flex justify-end gap-2">
            <Popover.Close className="rounded-md border border-border px-3 py-1.5 text-sm">Cancel</Popover.Close>
            <Popover.Close className="rounded-md bg-primary px-3 py-1.5 text-sm text-primary-foreground">
              Send invite
            </Popover.Close>
          </div>
        </Popover.Popup>
      </Popover.Positioner>
    </Popover.Portal>
  </Popover.Root>
);

const PreviewCardStory: StoryRender = ({ sample }) => (
  <PreviewCard.Root defaultOpen>
    <p className="max-w-md text-sm">
      The billing migration is led by{" "}
      <PreviewCard.Trigger
        href="#priya-raghavan"
        className="font-medium underline underline-offset-4"
      >
        {sample.name ?? "Priya Raghavan"}
      </PreviewCard.Trigger>
      , staff engineer on the platform team.
    </p>
    <PreviewCard.Portal>
      <PreviewCard.Positioner sideOffset={8}>
        <PreviewCard.Popup className="w-72 rounded-xl border border-border bg-popover p-4 text-popover-foreground">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-muted text-sm text-muted-foreground">
              PR
            </div>
            <div>
              <p className="text-sm font-semibold">{sample.name ?? "Priya Raghavan"}</p>
              <p className="text-sm text-muted-foreground">{sample.role ?? "Staff engineer, Platform"}</p>
            </div>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Owns the invoice pipeline and the migration to Northwind Ledger.
          </p>
        </PreviewCard.Popup>
      </PreviewCard.Positioner>
    </PreviewCard.Portal>
  </PreviewCard.Root>
);

const ProgressStory: StoryRender = ({ sample }) => (
  <Progress.Root
    value={184000}
    max={250000}
    format={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }}
    className="grid w-full max-w-md grid-cols-2 gap-y-2"
  >
    <Progress.Label className="text-sm">{sample.label ?? "Q3 revenue target"}</Progress.Label>
    <Progress.Value className="text-right text-sm text-muted-foreground" />
    <Progress.Track className="col-span-2 h-2 overflow-hidden rounded-full bg-muted">
      <Progress.Indicator className="h-full rounded-full bg-primary" />
    </Progress.Track>
  </Progress.Root>
);

const RadioGroupStory: StoryRender = ({ sample }) => (
  <RadioGroup defaultValue="canary" className="grid gap-3">
    <p className="text-sm font-medium">{sample.legend ?? "Deployment strategy"}</p>
    {[
      ["rolling", "Rolling", "Replaces instances gradually with zero downtime."],
      ["blue-green", "Blue-green", "Keeps a standby environment for instant cutovers."],
      ["canary", "Canary", "Shifts 5% of traffic to the new build before the full rollout."],
    ].map(([value, title, description]) => (
      <label key={value} className="flex items-start gap-3">
        <Radio.Root value={value} className="mt-0.5 flex size-5 items-center justify-center rounded-full border border-border">
          <Radio.Indicator className="size-2.5 rounded-full bg-primary" />
        </Radio.Root>
        <span className="grid gap-0.5">
          <span className="text-sm font-medium">{title}</span>
          <span className="text-sm text-muted-foreground">{description}</span>
        </span>
      </label>
    ))}
  </RadioGroup>
);

const ScrollAreaStory: StoryRender = ({ sample }) => (
  <div className="w-full max-w-sm">
    <p className="mb-2 text-sm font-medium">{sample.label ?? "Recent activity"}</p>
    <ScrollArea.Root className="h-56 w-full rounded-xl border border-border">
      <ScrollArea.Viewport className="h-full">
        <ScrollArea.Content className="grid gap-3 p-4 text-sm">
          {[
            ["Ada Nakamura", "approved invoice #1042", "2 min ago"],
            ["Priya Raghavan", "deployed northwind-web to production", "26 min ago"],
            ["Marcus Bell", "changed the incident rotation", "1 hour ago"],
            ["Sofia Almeida", "merged billing migration #812", "3 hours ago"],
            ["Ada Nakamura", "refunded invoice #0978", "5 hours ago"],
            ["Ken Watanabe", "added three seats to Northwind", "Yesterday"],
            ["Priya Raghavan", "rotated the staging credentials", "Yesterday"],
            ["Sofia Almeida", "published the March usage report", "2 days ago"],
          ].map(([person, action, time]) => (
            <p key={`${person}-${action}`}>
              <span className="font-medium">{person}</span>{" "}
              <span className="text-muted-foreground">
                {action} · {time}
              </span>
            </p>
          ))}
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar className="m-1 flex w-2 justify-center rounded-full bg-muted">
        <ScrollArea.Thumb className="w-full rounded-full bg-border" />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  </div>
);

const SelectStory: StoryRender = ({ sample }) => (
  <div className="grid w-full max-w-sm gap-2">
    <Select.Root items={selectEnvironments} defaultValue="staging" defaultOpen>
      <Select.Label className="text-sm font-medium">{sample.label ?? "Deploy environment"}</Select.Label>
      <Select.Trigger className="flex items-center justify-between gap-3 rounded-md border border-border bg-background px-3 py-2 text-sm">
        <Select.Value />
        <Select.Icon>
          <ChevronDown className="size-4 text-muted-foreground" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner sideOffset={4}>
          <Select.Popup className="min-w-[var(--anchor-width)] rounded-md border border-border bg-popover p-1 text-popover-foreground">
            <Select.List>
              {selectEnvironments.map((environment) => (
                <Select.Item
                  key={environment.value}
                  value={environment.value}
                  className="grid grid-cols-[1rem_1fr] items-center gap-2 rounded-sm px-2 py-1.5 text-sm"
                >
                  <Select.ItemIndicator className="col-start-1">
                    <Check className="size-3.5" />
                  </Select.ItemIndicator>
                  <Select.ItemText className="col-start-2">{environment.label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.List>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  </div>
);

const SeparatorStory: StoryRender = ({ sample }) => (
  <div className="w-full max-w-md">
    <p className="text-sm font-medium">{sample.title ?? "Northwind Analytics"}</p>
    <Separator className="my-4 h-px bg-border" />
    <p className="text-sm text-muted-foreground">
      {sample.description ?? "Real-time revenue tracking for subscription teams."}
    </p>
  </div>
);

const SliderStory: StoryRender = ({ sample }) => (
  <Slider.Root
    defaultValue={4200}
    min={0}
    max={10000}
    step={100}
    format={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }}
    className="w-full max-w-md"
  >
    <div className="mb-1 flex items-baseline justify-between text-sm">
      <Slider.Label>{sample.label ?? "Monthly ad spend"}</Slider.Label>
      <Slider.Value className="text-muted-foreground" />
    </div>
    <Slider.Control className="flex touch-none items-center py-3 select-none">
      <Slider.Track className="h-2 w-full rounded-full bg-muted">
        <Slider.Indicator className="h-full rounded-full bg-primary" />
        <Slider.Thumb aria-label="Ad spend" className="size-5 rounded-full border-2 border-primary bg-background" />
      </Slider.Track>
    </Slider.Control>
  </Slider.Root>
);

const SwitchStory: StoryRender = ({ sample }) => (
  <label className="flex items-center gap-3">
    <Switch.Root
      defaultChecked
      className="flex h-6 w-11 shrink-0 items-center rounded-full bg-muted p-1 data-[checked]:bg-primary"
    >
      <Switch.Thumb className="block size-4 rounded-full bg-foreground transition-[translate,background-color] data-[checked]:translate-x-5 data-[checked]:bg-primary-foreground" />
    </Switch.Root>
    <span className="grid gap-0.5">
      <span className="text-sm font-medium">{sample.label ?? "Auto-deploy on merge"}</span>
      <span className="text-sm text-muted-foreground">
        {sample.description ?? "Deploys to staging after every merge to main."}
      </span>
    </span>
  </label>
);

const tabClassName =
  "border-b-2 border-transparent px-3 py-2 text-sm text-muted-foreground data-[active]:border-primary data-[active]:text-foreground";

const TabsStory: StoryRender = ({ sample }) => (
  <Tabs.Root defaultValue="invoices" className="w-full max-w-md">
    <Tabs.List className="flex gap-2 border-b border-border">
      <Tabs.Tab value="invoices" className={tabClassName}>
        {sample.tab1 ?? "Invoices"}
      </Tabs.Tab>
      <Tabs.Tab value="subscriptions" className={tabClassName}>
        {sample.tab2 ?? "Subscriptions"}
      </Tabs.Tab>
      <Tabs.Tab value="payouts" className={tabClassName}>
        {sample.tab3 ?? "Payouts"}
      </Tabs.Tab>
    </Tabs.List>
    <Tabs.Panel value="invoices" className="pt-4 text-sm text-muted-foreground">
      12 open invoices — $48,210 outstanding across 9 customers.
    </Tabs.Panel>
    <Tabs.Panel value="subscriptions" className="pt-4 text-sm text-muted-foreground">
      1,284 active subscriptions — $92,400 in monthly recurring revenue.
    </Tabs.Panel>
    <Tabs.Panel value="payouts" className="pt-4 text-sm text-muted-foreground">
      The next payout of $18,320 clears Friday to First Meridian Bank.
    </Tabs.Panel>
  </Tabs.Root>
);

const ToastStory: StoryRender = ({ sample }) => (
  <Toast.Provider timeout={0}>
    <Toast.Portal>
      <Toast.Viewport className="fixed bottom-4 right-4 w-80">
        <Toast.Root
          toast={{
            id: "invoice-paid",
            title: sample.title ?? "Invoice #1042 paid",
            description: sample.description ?? "Acme Corp paid $4,820 — two minutes ago.",
            timeout: 0,
          }}
          className="rounded-xl border border-border bg-popover p-4 text-popover-foreground"
        >
          <Toast.Content>
            <Toast.Title className="text-sm font-semibold" />
            <Toast.Description className="mt-1 text-sm text-muted-foreground" />
            <div className="mt-3 flex gap-2">
              <Toast.Action className="rounded-md border border-border px-3 py-1.5 text-sm">
                View invoice
              </Toast.Action>
              <Toast.Close className="rounded-md px-3 py-1.5 text-sm text-muted-foreground">Dismiss</Toast.Close>
            </div>
          </Toast.Content>
        </Toast.Root>
      </Toast.Viewport>
    </Toast.Portal>
  </Toast.Provider>
);

const ToggleStory: StoryRender = ({ sample }) => (
  <Toggle defaultPressed className="rounded-md border border-border px-4 py-2 text-sm data-[pressed]:bg-secondary">
    {sample.label ?? "Bold"}
  </Toggle>
);

const ToggleGroupStory: StoryRender = ({ sample }) => (
  <ToggleGroup defaultValue={["week"]} aria-label="Time range" className="flex rounded-md border border-border p-1">
    {[
      ["day", sample.option1 ?? "Day"],
      ["week", sample.option2 ?? "Week"],
      ["month", sample.option3 ?? "Month"],
    ].map(([value, label]) => (
      <Toggle key={value} value={value} className="rounded-sm px-3 py-1.5 text-sm data-[pressed]:bg-secondary">
        {label}
      </Toggle>
    ))}
  </ToggleGroup>
);

const ToolbarStory: StoryRender = ({ sample }) => (
  <Toolbar.Root className="flex w-full max-w-xl items-center gap-1 rounded-md border border-border p-1">
    <Toolbar.Button className="rounded-sm px-3 py-1.5 text-sm">{sample.button1 ?? "Bold"}</Toolbar.Button>
    <Toolbar.Button className="rounded-sm px-3 py-1.5 text-sm">{sample.button2 ?? "Italic"}</Toolbar.Button>
    <Toolbar.Separator className="mx-1 h-5 w-px bg-border" />
    <Toolbar.Group aria-label="History" className="flex">
      <Toolbar.Button className="rounded-sm px-3 py-1.5 text-sm">Undo</Toolbar.Button>
      <Toolbar.Button className="rounded-sm px-3 py-1.5 text-sm">Redo</Toolbar.Button>
    </Toolbar.Group>
    <Toolbar.Separator className="mx-1 h-5 w-px bg-border" />
    <Toolbar.Input
      aria-label="Link URL"
      defaultValue="https://northwind.io/q3-forecast"
      className="w-56 rounded-md border border-border bg-background px-3 py-1.5 text-sm"
    />
    <Toolbar.Button className="rounded-sm px-3 py-1.5 text-sm">Apply</Toolbar.Button>
  </Toolbar.Root>
);

const TooltipStory: StoryRender = ({ sample }) => (
  <Tooltip.Provider>
    <Tooltip.Root open onOpenChange={() => {}}>
      <Tooltip.Trigger className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">
        {sample.triggerLabel ?? "Start free trial"}
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Positioner sideOffset={8}>
          <Tooltip.Popup className="rounded-md border border-border bg-popover px-3 py-1.5 text-sm text-popover-foreground">
            {sample.tooltip ?? "14 days free — no credit card required."}
          </Tooltip.Popup>
        </Tooltip.Positioner>
      </Tooltip.Portal>
    </Tooltip.Root>
  </Tooltip.Provider>
);

export const storyRenders: Record<string, StoryRender> = {
  "base-ui/Navigation Menu": NavigationMenuStory,
  "base-ui/Number Field": NumberFieldStory,
  "base-ui/OTP Field": OTPFieldStory,
  "base-ui/Popover": PopoverStory,
  "base-ui/Preview Card": PreviewCardStory,
  "base-ui/Progress": ProgressStory,
  "base-ui/Radio Group": RadioGroupStory,
  "base-ui/Scroll Area": ScrollAreaStory,
  "base-ui/Select": SelectStory,
  "base-ui/Separator": SeparatorStory,
  "base-ui/Slider": SliderStory,
  "base-ui/Switch": SwitchStory,
  "base-ui/Tabs": TabsStory,
  "base-ui/Toast": ToastStory,
  "base-ui/Toggle": ToggleStory,
  "base-ui/Toggle Group": ToggleGroupStory,
  "base-ui/Toolbar": ToolbarStory,
  "base-ui/Tooltip": TooltipStory,
};
