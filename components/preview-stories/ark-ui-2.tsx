import * as React from "react";
import { PasswordInput } from "@ark-ui/react/password-input";
import { PinInput } from "@ark-ui/react/pin-input";
import { Popover } from "@ark-ui/react/popover";
import { Progress } from "@ark-ui/react/progress";
import { QrCode } from "@ark-ui/react/qr-code";
import { RadioGroup } from "@ark-ui/react/radio-group";
import { RatingGroup } from "@ark-ui/react/rating-group";
import { ScrollArea } from "@ark-ui/react/scroll-area";
import { SegmentGroup } from "@ark-ui/react/segment-group";
import { Select, createListCollection } from "@ark-ui/react/select";
import { SignaturePad } from "@ark-ui/react/signature-pad";
import { Slider } from "@ark-ui/react/slider";
import { Splitter } from "@ark-ui/react/splitter";
import { Steps } from "@ark-ui/react/steps";
import { Switch } from "@ark-ui/react/switch";
import { Tabs } from "@ark-ui/react/tabs";
import { TagsInput } from "@ark-ui/react/tags-input";
import { Timer } from "@ark-ui/react/timer";
import { Toc } from "@ark-ui/react/toc";
import { Toast, Toaster, createToaster } from "@ark-ui/react/toast";
import type { ToastOptions } from "@ark-ui/react/toast";
import { Toggle } from "@ark-ui/react/toggle";
import { ToggleGroup } from "@ark-ui/react/toggle-group";
import { Tooltip } from "@ark-ui/react/tooltip";
import { Tour, useTour, type TourStepDetails } from "@ark-ui/react/tour";
import { TreeView, createTreeCollection } from "@ark-ui/react/tree-view";
import { Check, ChevronDown, ChevronRight, Eye, EyeOff, Star } from "lucide-react";
import type { CSSProperties, ReactElement } from "react";
import type { StoryRender } from "./type";

/**
 * Preview stories for Ark UI: each documented component rendered with its real
 * package API — behaviour from `@ark-ui/react`, Col's theme tokens for the
 * look. Overlay components are forced open so a screenshot shows their
 * surface, and sample strings replace the display text a caller would relabel.
 */

const PasswordInputStory: StoryRender = ({ sample }) => (
  <PasswordInput.Root className="w-full max-w-sm">
    <PasswordInput.Label className="text-sm font-medium">{sample.label ?? "Password"}</PasswordInput.Label>
    <PasswordInput.Control className="mt-2 flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2">
      <PasswordInput.Input
        defaultValue="harbour-lantern-42"
        className="w-full bg-transparent text-sm text-foreground outline-none"
      />
      <PasswordInput.VisibilityTrigger className="text-muted-foreground">
        <PasswordInput.Indicator fallback={<EyeOff className="size-4" />}>
          <Eye className="size-4" />
        </PasswordInput.Indicator>
      </PasswordInput.VisibilityTrigger>
    </PasswordInput.Control>
    <p className="mt-2 text-sm text-muted-foreground">
      {sample.hint ?? "At least 12 characters. Never reused from another account."}
    </p>
  </PasswordInput.Root>
);

const PinInputStory: StoryRender = ({ sample }) => (
  <PinInput.Root count={6} defaultValue={["8", "3", "1", "", "", ""]} className="w-full max-w-sm">
    <PinInput.Label className="text-sm font-medium">{sample.label ?? "Verification code"}</PinInput.Label>
    <PinInput.Control className="mt-2 flex gap-2">
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <PinInput.Input
          key={index}
          index={index}
          className="size-11 rounded-md border border-border bg-background text-center text-lg text-foreground"
        />
      ))}
    </PinInput.Control>
    <PinInput.HiddenInput />
    <p className="mt-2 text-sm text-muted-foreground">{sample.hint ?? "Sent to samira@northwind.dev"}</p>
  </PinInput.Root>
);

const PopoverStory: StoryRender = ({ sample }) => (
  <Popover.Root open onOpenChange={() => {}}>
    <Popover.Trigger className="rounded-md border border-border px-4 py-2 text-sm">
      {sample.triggerLabel ?? "Share report"}
    </Popover.Trigger>
    <Popover.Positioner>
      <Popover.Content className="w-72 rounded-xl border border-border bg-popover p-4 text-popover-foreground">
        <Popover.Title className="text-sm font-semibold">Share Q3 revenue</Popover.Title>
        <Popover.Description className="mt-1 text-sm text-muted-foreground">
          Anyone at Northwind with the link can view this report.
        </Popover.Description>
        <input
          readOnly
          defaultValue="col.dev/reports/q3-revenue"
          className="mt-3 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
        />
        <div className="mt-3 flex items-center justify-between gap-3">
          <Popover.CloseTrigger className="rounded-md border border-border px-3 py-1.5 text-sm">Done</Popover.CloseTrigger>
          <span className="text-sm text-muted-foreground">Expires in 7 days</span>
        </div>
      </Popover.Content>
    </Popover.Positioner>
  </Popover.Root>
);

const ProgressCircularStory: StoryRender = ({ sample }) => (
  <Progress.Root value={68} className="flex items-center gap-5">
    <Progress.Circle
      className="shrink-0 text-foreground"
      style={{ "--size": "96px", "--thickness": "8px" } as CSSProperties}
    >
      <Progress.CircleTrack className="stroke-border" />
      <Progress.CircleRange className="stroke-primary" />
    </Progress.Circle>
    <div>
      <Progress.Label className="text-sm font-medium">{sample.label ?? "Storage used"}</Progress.Label>
      <Progress.ValueText className="mt-1 block text-2xl font-semibold" />
      <p className="text-sm text-muted-foreground">136 GB of 200 GB across 4 projects</p>
    </div>
  </Progress.Root>
);

const ProgressLinearStory: StoryRender = ({ sample }) => (
  <Progress.Root value={72} className="w-full max-w-md">
    <div className="flex items-baseline justify-between text-sm">
      <Progress.Label className="font-medium">{sample.label ?? "Deploying checkout-service"}</Progress.Label>
      <Progress.ValueText className="text-muted-foreground" />
    </div>
    <Progress.Track className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
      <Progress.Range className="h-full rounded-full bg-primary" />
    </Progress.Track>
    <p className="mt-2 text-sm text-muted-foreground">Running smoke tests against production, step 9 of 13.</p>
  </Progress.Root>
);

const QrCodeStory: StoryRender = ({ sample }) => (
  <div className="flex items-center gap-5">
    <QrCode.Root value="https://col.dev/checkin/devops-summit-2026" className="rounded-xl bg-primary-foreground p-3">
      <QrCode.Frame className="size-36">
        <QrCode.Pattern className="fill-background" />
      </QrCode.Frame>
    </QrCode.Root>
    <div>
      <p className="text-sm font-medium">{sample.title ?? "DevOps Summit check-in"}</p>
      <p className="mt-1 text-sm text-muted-foreground">Scan at the front desk to collect your badge.</p>
    </div>
  </div>
);

const RadioGroupStory: StoryRender = ({ sample }) => (
  <RadioGroup.Root defaultValue="annual" className="grid w-full max-w-sm gap-3">
    <RadioGroup.Label className="text-sm font-medium">{sample.label ?? "Billing cycle"}</RadioGroup.Label>
    {[
      ["monthly", "Monthly — $12 per seat"],
      ["annual", "Annual — $120 per seat"],
      ["usage", "Usage-based — $0.04 per build minute"],
    ].map(([value, label]) => (
      <RadioGroup.Item key={value} value={value} className="flex items-center gap-3 text-sm">
        <RadioGroup.ItemControl className="flex size-5 items-center justify-center rounded-full border border-border data-[state=checked]:border-primary data-[state=checked]:bg-primary" />
        <RadioGroup.ItemText>{label}</RadioGroup.ItemText>
        <RadioGroup.ItemHiddenInput />
      </RadioGroup.Item>
    ))}
  </RadioGroup.Root>
);

const RatingGroupStory: StoryRender = ({ sample }) => (
  <RatingGroup.Root count={5} defaultValue={4} className="w-full max-w-sm">
    <RatingGroup.Label className="text-sm font-medium">
      {sample.label ?? "How was your support experience?"}
    </RatingGroup.Label>
    <RatingGroup.Control className="mt-2 flex gap-1">
      {[1, 2, 3, 4, 5].map((index) => (
        <RatingGroup.Item key={index} index={index} className="text-muted-foreground data-[highlighted]:text-primary">
          <Star className="size-7 fill-current" />
        </RatingGroup.Item>
      ))}
    </RatingGroup.Control>
    <RatingGroup.HiddenInput />
    <p className="mt-2 text-sm text-muted-foreground">
      {sample.caption ?? "Ticket #3182 — refund question, resolved in 2 hours"}
    </p>
  </RatingGroup.Root>
);

const ScrollAreaStory: StoryRender = ({ sample }) => (
  <ScrollArea.Root className="h-56 w-full max-w-md rounded-xl border border-border">
    <ScrollArea.Viewport className="h-full">
      <ScrollArea.Content className="p-4">
        <div className="grid gap-2 font-mono text-xs text-muted-foreground">
          {[
            "$ npm run build --filter=checkout-service",
            "▸ compiling 214 modules with esbuild",
            "▸ type-checking src/ ... ok",
            "▸ emitting dist/ (1.8 MB)",
            "▸ running migrations against staging",
            "  - 20261009_add_invoice_index.sql ... applied",
            "  - 20261009_backfill_tax_rates.sql ... applied",
            "▸ uploading artifacts to the release bucket",
            "▸ warming the edge cache in 12 regions",
            "▸ health checks: api 200, billing 200, webhooks 200",
            "build finished in 47s — ready for review",
          ].map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </ScrollArea.Content>
    </ScrollArea.Viewport>
    <ScrollArea.Scrollbar orientation="vertical" className="flex w-2 p-0.5">
      <ScrollArea.Thumb className="flex-1 rounded-full bg-border" />
    </ScrollArea.Scrollbar>
    <ScrollArea.Corner />
  </ScrollArea.Root>
);

const SegmentGroupStory: StoryRender = ({ sample }) => (
  <SegmentGroup.Root defaultValue="7d" className="w-full max-w-md">
    <SegmentGroup.Label className="sr-only">{sample.label ?? "Time range"}</SegmentGroup.Label>
    <div className="relative flex rounded-lg border border-border p-1 text-sm">
      <SegmentGroup.Indicator
        className="rounded-md bg-secondary"
        style={
          {
            "--transition-property": "left, top, width, height",
            top: "var(--top)",
            width: "var(--width)",
            height: "var(--height)",
          } as CSSProperties
        }
      />
      {[
        ["24h", "Last 24 hours"],
        ["7d", "Last 7 days"],
        ["30d", "Last 30 days"],
        ["qtd", "Quarter to date"],
      ].map(([value, label]) => (
        <SegmentGroup.Item
          key={value}
          value={value}
          className="relative z-10 flex-1 rounded-md px-3 py-1.5 text-center text-muted-foreground data-[state=checked]:text-foreground"
        >
          <SegmentGroup.ItemText>{label}</SegmentGroup.ItemText>
          <SegmentGroup.ItemControl className="absolute inset-0 rounded-md" />
          <SegmentGroup.ItemHiddenInput />
        </SegmentGroup.Item>
      ))}
    </div>
    <p className="mt-2 text-sm text-muted-foreground">{sample.caption ?? "Revenue and deploy counts, refreshed hourly"}</p>
  </SegmentGroup.Root>
);

interface RoleOption {
  label: string;
  value: string;
}

const roleOptions: RoleOption[] = [
  { value: "viewer", label: "Viewer" },
  { value: "editor", label: "Editor" },
  { value: "admin", label: "Admin" },
  { value: "billing", label: "Billing manager" },
];

const roleCollection = createListCollection<RoleOption>({
  items: roleOptions,
  groupBy: (item) => (item.value === "billing" ? "restricted" : "workspace"),
});

const SelectStory: StoryRender = ({ sample }) => (
  <Select.Root collection={roleCollection} defaultValue={["editor"]} open onOpenChange={() => {}}>
    <Select.Label className="text-sm font-medium">{sample.label ?? "Workspace role"}</Select.Label>
    <Select.Control className="mt-2 flex w-64 items-center justify-between rounded-md border border-border bg-background px-3 py-2 text-sm">
      <Select.Trigger className="flex w-full items-center justify-between">
        <Select.ValueText />
        <Select.Indicator>
          <ChevronDown className="size-4 text-muted-foreground" />
        </Select.Indicator>
      </Select.Trigger>
      <Select.HiddenSelect />
    </Select.Control>
    <Select.Positioner>
      <Select.Content className="rounded-md border border-border bg-popover p-1 text-popover-foreground">
        {["workspace", "restricted"].map((groupId) => (
          <Select.ItemGroup key={groupId} id={groupId}>
            <Select.ItemGroupLabel className="px-2 py-1.5 text-xs text-muted-foreground">
              {groupId === "workspace" ? "Workspace roles" : "Restricted"}
            </Select.ItemGroupLabel>
            {roleCollection.items
              .filter((item) => (groupId === "restricted" ? item.value === "billing" : item.value !== "billing"))
              .map((item) => (
                <Select.Item key={item.value} item={item} className="flex items-center justify-between rounded-sm px-2 py-1.5 text-sm">
                  <Select.ItemText>{item.label}</Select.ItemText>
                  <Select.ItemIndicator>
                    <Check className="size-4" />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
          </Select.ItemGroup>
        ))}
      </Select.Content>
    </Select.Positioner>
  </Select.Root>
);

// Perfect-freehand strokes are filled outlines, so the seeded signature is a
// thin ribbon traced out and back rather than a single stroked curve.
const seededSignature =
  "M 12 78 C 40 14, 78 12, 98 58 C 118 104, 152 108, 182 46 C 194 22, 218 30, 228 56 C 219 41, 202 34, 192 56 C 163 116, 121 112, 101 66 C 81 20, 42 22, 17 84 Z";

const SignaturePadStory: StoryRender = ({ sample }) => (
  <SignaturePad.Root
    defaultPaths={[seededSignature]}
    drawing={{ fill: "currentColor" }}
    className="w-full max-w-md text-foreground"
  >
    <SignaturePad.Label className="text-sm font-medium">
      {sample.label ?? "Sign the statement of work"}
    </SignaturePad.Label>
    <SignaturePad.Control className="relative mt-2 h-36 rounded-xl border border-border bg-background">
      <SignaturePad.Segment className="text-foreground" />
      <SignaturePad.Guide className="absolute inset-x-8 bottom-8 border-b border-dashed border-border" />
    </SignaturePad.Control>
    <div className="mt-3 flex items-center justify-between">
      <SignaturePad.ClearTrigger className="rounded-md border border-border px-3 py-1.5 text-sm">
        Clear
      </SignaturePad.ClearTrigger>
      <span className="text-sm text-muted-foreground">Signed by Priya Raman on Oct 9</span>
    </div>
  </SignaturePad.Root>
);

const SliderStory: StoryRender = ({ sample }) => (
  <Slider.Root defaultValue={[48]} min={10} max={200} className="w-full max-w-md">
    <div className="flex items-baseline justify-between text-sm">
      <Slider.Label className="font-medium">{sample.label ?? "Daily ad budget"}</Slider.Label>
      <Slider.ValueText className="text-muted-foreground" />
    </div>
    <Slider.Control className="mt-4">
      <Slider.Track className="h-2 rounded-full bg-muted">
        <Slider.Range className="rounded-full bg-primary" />
      </Slider.Track>
      <Slider.Thumb index={0} className="block size-5 rounded-full border-2 border-primary bg-background">
        <Slider.HiddenInput />
      </Slider.Thumb>
      <Slider.MarkerGroup className="relative mt-3 h-4 text-xs text-muted-foreground">
        <Slider.Marker value={10} className="absolute -translate-x-1/2">
          $10
        </Slider.Marker>
        <Slider.Marker value={105} className="absolute -translate-x-1/2">
          $105
        </Slider.Marker>
        <Slider.Marker value={200} className="absolute -translate-x-1/2">
          $200
        </Slider.Marker>
      </Slider.MarkerGroup>
    </Slider.Control>
    <p className="mt-2 text-sm text-muted-foreground">Capped at $1,440 spend per week.</p>
  </Slider.Root>
);

const SplitterStory: StoryRender = ({ sample }) => (
  <Splitter.Root
    panels={[{ id: "files" }, { id: "diff" }]}
    defaultSize={[200, 380]}
    className="flex h-64 w-full max-w-2xl overflow-hidden rounded-xl border border-border text-sm"
  >
    <Splitter.Panel id="files" className="min-w-0 p-4">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{sample.sidebarTitle ?? "Changed files"}</p>
      <ul className="mt-2 grid gap-1.5 text-muted-foreground">
        <li className="text-foreground">src/billing/Invoice.tsx</li>
        <li>src/billing/tax.ts</li>
        <li>src/api/stripe-webhook.ts</li>
        <li>tests/billing/invoice.test.ts</li>
      </ul>
    </Splitter.Panel>
    <Splitter.ResizeTrigger id="files:diff" className="flex w-px items-center justify-center bg-border">
      <Splitter.ResizeTriggerIndicator className="h-10 w-1 rounded-full bg-border" />
    </Splitter.ResizeTrigger>
    <Splitter.Panel id="diff" className="min-w-0 flex-1 p-4">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">
        {sample.mainTitle ?? "src/billing/tax.ts"}
      </p>
      <div className="mt-2 grid gap-1.5 font-mono text-xs">
        <p className="text-muted-foreground">export function taxFor(region: Region) {"{"}</p>
        <p className="text-destructive">-  return rates[region] ?? 0</p>
        <p className="text-primary-foreground">+  return rates[region] ?? defaultRate</p>
        <p className="text-muted-foreground">{"}"}</p>
      </div>
    </Splitter.Panel>
  </Splitter.Root>
);

const StepsStory: StoryRender = ({ sample }) => (
  <Steps.Root count={3} defaultStep={1} className="w-full max-w-xl">
    <Steps.List>
      {[
        sample.step1 ?? "Create your account",
        sample.step2 ?? "Set up the workspace",
        sample.step3 ?? "Invite your team",
      ].map((label, index) => (
        <Steps.Item key={label} index={index} className="flex items-center gap-2 last:flex-none">
          <Steps.Trigger className="flex items-center gap-2 text-sm text-muted-foreground data-[complete]:text-foreground data-[current]:text-foreground">
            <Steps.Indicator className="flex size-7 items-center justify-center rounded-full border border-border text-xs data-[complete]:border-primary data-[complete]:bg-primary">
              {index + 1}
            </Steps.Indicator>
            {label}
          </Steps.Trigger>
          <Steps.Separator className="h-px min-w-6 flex-1 bg-border" />
        </Steps.Item>
      ))}
    </Steps.List>
    <Steps.Content index={0} className="mt-4 rounded-xl border border-border p-4 text-sm">
      Your Northwind account is verified. Pick a workspace URL to continue.
    </Steps.Content>
    <Steps.Content index={1} className="mt-4 rounded-xl border border-border p-4 text-sm">
      Workspace &quot;northwind-analytics&quot; is ready. Choose which projects to import from GitHub.
    </Steps.Content>
    <Steps.Content index={2} className="mt-4 rounded-xl border border-border p-4 text-sm">
      Send invites to teammates — they join with view access until you promote them.
    </Steps.Content>
    <Steps.CompletedContent className="mt-4 rounded-xl border border-border p-4 text-sm">
      Setup complete. Your first deploy will appear on the dashboard in about a minute.
    </Steps.CompletedContent>
    <div className="mt-4 flex items-center gap-3">
      <Steps.PrevTrigger className="rounded-md border border-border px-4 py-2 text-sm">Back</Steps.PrevTrigger>
      <Steps.NextTrigger className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">
        Continue
      </Steps.NextTrigger>
      <Steps.Context>
        {(steps) => (
          <Steps.Progress className="ml-auto text-sm text-muted-foreground">
            Step {steps.value + 1} of {steps.count}
          </Steps.Progress>
        )}
      </Steps.Context>
    </div>
  </Steps.Root>
);

const SwitchStory: StoryRender = ({ sample }) => (
  <div className="flex w-full max-w-md items-center justify-between gap-6 rounded-xl border border-border p-4">
    <Switch.Root defaultChecked className="flex items-center gap-3">
      <Switch.Control className="flex h-6 w-11 items-center rounded-full bg-muted p-0.5 data-[state=checked]:bg-primary">
        <Switch.Thumb className="size-5 rounded-full bg-primary-foreground data-[state=checked]:translate-x-5" />
      </Switch.Control>
      <Switch.Label className="text-sm font-medium">{sample.label ?? "Deploy alerts"}</Switch.Label>
      <Switch.HiddenInput />
    </Switch.Root>
    <p className="text-sm text-muted-foreground">Email me when a production deploy fails.</p>
  </div>
);

const TabsStory: StoryRender = ({ sample }) => (
  <Tabs.Root defaultValue="deploys" className="w-full max-w-xl">
    <Tabs.List className="flex gap-2 border-b border-border">
      {[
        ["overview", sample.tab1 ?? "Overview"],
        ["deploys", sample.tab2 ?? "Deploys"],
        ["settings", sample.tab3 ?? "Settings"],
      ].map(([value, label]) => (
        <Tabs.Trigger
          key={value}
          value={value}
          className="border-b-2 border-transparent px-3 py-2 text-sm text-muted-foreground data-[selected]:border-primary data-[selected]:text-foreground"
        >
          {label}
        </Tabs.Trigger>
      ))}
    </Tabs.List>
    <Tabs.Content value="overview" className="pt-4 text-sm text-muted-foreground">
      Traffic grew 18% this week, led by the pricing page. 4,210 sessions across 2,900 visitors.
    </Tabs.Content>
    <Tabs.Content value="deploys" className="grid gap-2 pt-4 text-sm">
      {[
        ["checkout-service", "v2.4.1", "12 min ago", "Passed"],
        ["web-dashboard", "v9.18.0", "2 hours ago", "Passed"],
        ["billing-worker", "v1.7.3", "Yesterday", "Rolled back"],
      ].map(([service, version, when, status]) => (
        <div key={service} className="flex items-center justify-between gap-4">
          <span>
            {service} {version}
          </span>
          <span className="text-muted-foreground">{when}</span>
          <span className={status === "Passed" ? "text-primary-foreground" : "text-destructive"}>{status}</span>
        </div>
      ))}
    </Tabs.Content>
    <Tabs.Content value="settings" className="pt-4 text-sm text-muted-foreground">
      Deploy previews run for every pull request; production deploys require one approval.
    </Tabs.Content>
  </Tabs.Root>
);

const TagsInputStory: StoryRender = ({ sample }) => (
  <TagsInput.Root defaultValue={["changelog", "performance", "billing"]} className="w-full max-w-md">
    <TagsInput.Label className="text-sm font-medium">{sample.label ?? "Release tags"}</TagsInput.Label>
    <TagsInput.Control className="mt-2 flex flex-wrap items-center gap-2 rounded-md border border-border bg-background px-2 py-2">
      <TagsInput.Context>
        {(tagsInput) =>
          tagsInput.value.map((tag) => (
            <TagsInput.Item
              key={tag}
              index={tag}
              value={tag}
              className="flex items-center gap-1 rounded-md border border-border px-2 py-1 text-sm"
            >
              <TagsInput.ItemPreview>
                <TagsInput.ItemText>{tag}</TagsInput.ItemText>
                <TagsInput.ItemDeleteTrigger aria-label={`Remove ${tag}`} className="pl-1 text-muted-foreground">
                  ✕
                </TagsInput.ItemDeleteTrigger>
              </TagsInput.ItemPreview>
              <TagsInput.ItemInput />
            </TagsInput.Item>
          ))
        }
      </TagsInput.Context>
      <TagsInput.Input placeholder="Add a tag…" className="min-w-24 flex-1 bg-transparent px-1 text-sm outline-none" />
    </TagsInput.Control>
    <div className="mt-2 flex items-center justify-between">
      <span className="text-sm text-muted-foreground">Shown on the changelog entry.</span>
      <TagsInput.ClearTrigger className="text-sm text-muted-foreground">Clear all</TagsInput.ClearTrigger>
    </div>
    <TagsInput.HiddenInput />
  </TagsInput.Root>
);

const TimerStory: StoryRender = ({ sample }) => (
  <Timer.Root countdown autoStart={false} startMs={25 * 60 * 1000} className="w-full max-w-md">
    <p className="text-sm text-muted-foreground">{sample.label ?? "Focus session"}</p>
    <Timer.Area className="mt-2 flex items-baseline gap-1">
      <Timer.Item type="minutes" className="text-4xl font-semibold" />
      <Timer.Separator className="text-4xl text-muted-foreground">:</Timer.Separator>
      <Timer.Item type="seconds" className="text-4xl font-semibold" />
    </Timer.Area>
    <Timer.Control className="mt-4 flex gap-2">
      <Timer.ActionTrigger
        action="start"
        className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground"
      >
        Start
      </Timer.ActionTrigger>
      <Timer.ActionTrigger action="pause" className="rounded-md border border-border px-4 py-2 text-sm">
        Pause
      </Timer.ActionTrigger>
      <Timer.ActionTrigger action="reset" className="rounded-md border border-border px-4 py-2 text-sm">
        Reset
      </Timer.ActionTrigger>
    </Timer.Control>
    <p className="mt-3 text-sm text-muted-foreground">Blocks notifications until the session ends.</p>
  </Timer.Root>
);

interface DocHeading {
  value: string;
  depth: number;
  label: string;
}

const docHeadings: DocHeading[] = [
  { value: "why-col", depth: 2, label: "Why Col" },
  { value: "install", depth: 2, label: "Installation" },
  { value: "connect-api", depth: 3, label: "Connect your API" },
  { value: "first-preview", depth: 2, label: "Your first preview" },
  { value: "deploy", depth: 2, label: "Deploying" },
];

const TocStory: StoryRender = ({ sample }) => (
  <Toc.Root items={docHeadings} activeIds={["connect-api"]} className="w-full max-w-sm">
    <Toc.Nav placement="right" className="rounded-xl border border-border p-4">
      <Toc.Title className="text-sm font-medium">{sample.title ?? "On this page"}</Toc.Title>
      <Toc.List className="mt-3 grid gap-1">
        {docHeadings.map((heading) => (
          <Toc.Item key={heading.value} item={heading}>
            <Toc.Link
              href={`#${heading.value}`}
              className={`block py-1 text-sm text-muted-foreground data-[active]:text-foreground ${
                heading.depth > 2 ? "pl-6" : "pl-3"
              }`}
            >
              {heading.label}
            </Toc.Link>
          </Toc.Item>
        ))}
      </Toc.List>
    </Toc.Nav>
  </Toc.Root>
);

const deploymentToaster = createToaster({
  placement: "bottom-end",
  duration: 600000,
  removeDelay: 0,
});

deploymentToaster.create({
  id: "deployment-complete",
  type: "success",
  title: "Deployment complete",
  description: "checkout-service v2.4.1 is live in production.",
  action: { label: "View logs", onClick: () => {} },
  closable: true,
});

const ToastStory: StoryRender = ({ sample }) => (
  <div className="w-80">
    <Toaster toaster={deploymentToaster}>
      {(toast: ToastOptions) => (
        <Toast.Root className="rounded-xl border border-border bg-popover p-4 text-popover-foreground">
          <Toast.Title className="text-sm font-semibold">{sample.title ?? toast.title}</Toast.Title>
          <Toast.Description className="mt-1 text-sm text-muted-foreground">{toast.description}</Toast.Description>
          <div className="mt-3 flex items-center gap-2">
            <Toast.ActionTrigger className="rounded-md border border-border px-3 py-1.5 text-sm">
              {toast.action?.label}
            </Toast.ActionTrigger>
            <Toast.CloseTrigger aria-label="Dismiss" className="ml-auto text-muted-foreground">
              ✕
            </Toast.CloseTrigger>
          </div>
        </Toast.Root>
      )}
    </Toaster>
  </div>
);

const ToggleStory: StoryRender = ({ sample }) => (
  <Toggle.Root defaultPressed className="rounded-md border border-border px-4 py-2 text-sm data-[state=on]:bg-secondary">
    <Toggle.Indicator fallback={sample.offLabel ?? "Pin toolbar"}>{sample.label ?? "Pinned"}</Toggle.Indicator>
  </Toggle.Root>
);

const ToggleGroupStory: StoryRender = ({ sample }) => (
  <div>
    <p className="text-sm font-medium">{sample.label ?? "Project view"}</p>
    <ToggleGroup.Root defaultValue={["board"]} className="mt-2 flex rounded-md border border-border p-1">
      {[
        ["list", "List"],
        ["board", "Board"],
        ["calendar", "Calendar"],
      ].map(([value, label]) => (
        <ToggleGroup.Item
          key={value}
          value={value}
          className="rounded-sm px-3 py-1.5 text-sm data-[state=on]:bg-secondary"
        >
          {label}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  </div>
);

const TooltipStory: StoryRender = ({ sample }) => (
  <Tooltip.Root open onOpenChange={() => {}}>
    <Tooltip.Trigger className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">
      {sample.triggerLabel ?? "Deploy"}
    </Tooltip.Trigger>
    <Tooltip.Positioner>
      <Tooltip.Content className="rounded-md border border-border bg-popover px-3 py-1.5 text-sm text-popover-foreground">
        Deploys the main branch to production.
      </Tooltip.Content>
    </Tooltip.Positioner>
  </Tooltip.Root>
);

const tourSteps: TourStepDetails[] = [
  {
    id: "welcome",
    type: "dialog",
    title: "Welcome to Northwind Analytics",
    description: "Track revenue, deploys, and team activity in one dashboard. The tour takes about a minute.",
    actions: [
      { label: "Start tour", action: "next" },
      { label: "Skip", action: "skip" },
    ],
  },
  {
    id: "done",
    type: "dialog",
    title: "You are all set",
    description: "Invite teammates from Settings whenever you are ready — they start with view access.",
    actions: [{ label: "Done", action: "dismiss" }],
  },
];

function TourDemo({ title }: { title: string }): ReactElement {
  const tour = useTour({ steps: tourSteps, stepId: "welcome" });
  return (
    <Tour.Root tour={tour}>
      <Tour.Backdrop className="bg-black/60" />
      <Tour.Spotlight />
      <Tour.Positioner className="fixed inset-0 z-50 grid place-items-center">
        <Tour.Content className="relative w-96 rounded-xl border border-border bg-card p-6 text-card-foreground">
          <Tour.CloseTrigger aria-label="Close tour" className="absolute right-4 top-4 text-muted-foreground">
            ✕
          </Tour.CloseTrigger>
          <Tour.Title className="text-base font-semibold">{title}</Tour.Title>
          <Tour.Description className="mt-2 text-sm text-muted-foreground" />
          <div className="mt-6 flex items-center justify-between gap-3">
            <Tour.ProgressText className="text-sm text-muted-foreground" />
            <Tour.Actions>
              {(actions) => (
                <div className="flex gap-2">
                  {actions.map((action) => (
                    <Tour.ActionTrigger
                      key={action.label}
                      action={action}
                      className="rounded-md border border-border px-4 py-2 text-sm"
                    >
                      {action.label}
                    </Tour.ActionTrigger>
                  ))}
                </div>
              )}
            </Tour.Actions>
          </div>
        </Tour.Content>
      </Tour.Positioner>
    </Tour.Root>
  );
}

const TourStory: StoryRender = ({ sample }) => (
  <TourDemo title={sample.title ?? "Welcome to Northwind Analytics"} />
);

interface ProjectNode {
  value: string;
  children?: ProjectNode[];
}

const projectTree: ProjectNode = {
  value: "northwind-dashboard",
  children: [
    {
      value: "src",
      children: [
        {
          value: "components",
          children: [{ value: "RevenueChart.tsx" }, { value: "DeployList.tsx" }],
        },
        { value: "app.tsx" },
        { value: "styles.css" },
      ],
    },
    { value: "package.json" },
    { value: "README.md" },
  ],
};

const projectFiles = createTreeCollection<ProjectNode>({ rootNode: projectTree });

function ProjectNodeItem({ node, indexPath }: { node: ProjectNode; indexPath: number[] }): ReactElement {
  return (
    <TreeView.NodeProvider node={node} indexPath={indexPath}>
      {node.children ? (
        <TreeView.Branch>
          <TreeView.BranchControl className="flex items-center gap-1.5 py-1 text-sm">
            <TreeView.BranchIndicator className="flex items-center data-[state=open]:rotate-90">
              <ChevronRight className="size-3.5" />
            </TreeView.BranchIndicator>
            <TreeView.BranchText>{node.value}</TreeView.BranchText>
          </TreeView.BranchControl>
          <TreeView.BranchContent className="ml-1.5 border-l border-border pl-2">
            {node.children.map((child, index) => (
              <ProjectNodeItem key={child.value} node={child} indexPath={[...indexPath, index]} />
            ))}
          </TreeView.BranchContent>
        </TreeView.Branch>
      ) : (
        <TreeView.Item className="flex items-center gap-1.5 py-1 pl-5 text-sm text-muted-foreground data-[selected]:text-foreground">
          <TreeView.ItemIndicator className="text-primary">
            <Check className="size-3.5" />
          </TreeView.ItemIndicator>
          <TreeView.ItemText>{node.value}</TreeView.ItemText>
        </TreeView.Item>
      )}
    </TreeView.NodeProvider>
  );
}

const TreeViewStory: StoryRender = ({ sample }) => (
  <TreeView.Root
    collection={projectFiles}
    defaultExpandedValue={["src", "components"]}
    defaultSelectedValue={["app.tsx"]}
    className="w-full max-w-xs"
  >
    <TreeView.Label className="text-sm font-medium">{sample.label ?? "Project files"}</TreeView.Label>
    <TreeView.Tree className="mt-2">
      {(projectTree.children ?? []).map((node, index) => (
        <ProjectNodeItem key={node.value} node={node} indexPath={[index]} />
      ))}
    </TreeView.Tree>
  </TreeView.Root>
);

export const storyRenders: Record<string, StoryRender> = {
  "ark-ui/Password Input": PasswordInputStory,
  "ark-ui/Pin Input": PinInputStory,
  "ark-ui/Popover": PopoverStory,
  "ark-ui/Progress - Circular": ProgressCircularStory,
  "ark-ui/Progress - Linear": ProgressLinearStory,
  "ark-ui/QR Code": QrCodeStory,
  "ark-ui/Radio Group": RadioGroupStory,
  "ark-ui/Rating Group": RatingGroupStory,
  "ark-ui/Scroll Area": ScrollAreaStory,
  "ark-ui/Segment Group": SegmentGroupStory,
  "ark-ui/Select": SelectStory,
  "ark-ui/Signature Pad": SignaturePadStory,
  "ark-ui/Slider": SliderStory,
  "ark-ui/Splitter": SplitterStory,
  "ark-ui/Steps": StepsStory,
  "ark-ui/Switch": SwitchStory,
  "ark-ui/Tabs": TabsStory,
  "ark-ui/Tags Input": TagsInputStory,
  "ark-ui/Timer": TimerStory,
  "ark-ui/Table of Contents": TocStory,
  "ark-ui/Toast": ToastStory,
  "ark-ui/Toggle": ToggleStory,
  "ark-ui/Toggle Group": ToggleGroupStory,
  "ark-ui/Tooltip": TooltipStory,
  "ark-ui/Tour": TourStory,
  "ark-ui/Tree View": TreeViewStory,
};
