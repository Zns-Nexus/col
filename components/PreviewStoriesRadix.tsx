import * as React from "react";
import {
  Accordion,
  AlertDialog,
  AspectRatio,
  Avatar,
  Checkbox,
  Collapsible,
  ContextMenu,
  Dialog,
  DropdownMenu,
  Form,
  HoverCard,
  Label,
  Menubar,
  NavigationMenu,
  Popover,
  Progress,
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
  unstable_OneTimePasswordField as OneTimePasswordField,
  unstable_PasswordToggleField as PasswordToggleField,
} from "radix-ui";
import { Check, ChevronDown, Eye, EyeOff } from "lucide-react";
import type { StoryRender } from "./PreviewStories";

/**
 * Preview stories for Radix UI: each documented primitive rendered as the
 * library documents it — accessible behaviour from the real package, Col's
 * theme tokens for the look. Overlay primitives open by default so a
 * screenshot shows the content, not just the trigger.
 */

const AccordionStory: StoryRender = () => (
  <Accordion.Root type="single" collapsible defaultValue="pricing" className="group w-full max-w-xl">
    <Accordion.Item value="pricing" className="border-b border-border">
      <Accordion.Header>
        <Accordion.Trigger className="flex w-full items-center justify-between py-4 text-left text-sm font-medium">
          How does pricing work?
          <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="pb-4 text-sm text-muted-foreground">
        Every plan includes the full component set. Paid tiers add team seats and priority support.
      </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="license" className="border-b border-border">
      <Accordion.Header>
        <Accordion.Trigger className="flex w-full items-center justify-between py-4 text-left text-sm font-medium">
          Can I use the components commercially?
          <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="pb-4 text-sm text-muted-foreground">
        Yes. The code you install is yours to use in commercial products, per the library&apos;s license.
      </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="frameworks" className="border-b border-border">
      <Accordion.Header>
        <Accordion.Trigger className="flex w-full items-center justify-between py-4 text-left text-sm font-medium">
          Does it work with my framework?
          <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="pb-4 text-sm text-muted-foreground">
        Each component page lists the frameworks and versions the library documents support for.
      </Accordion.Content>
    </Accordion.Item>
  </Accordion.Root>
);

const AlertDialogStory: StoryRender = () => (
  <AlertDialog.Root defaultOpen>
    <AlertDialog.Trigger className="rounded-md border border-border px-4 py-2 text-sm">Delete project</AlertDialog.Trigger>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="fixed inset-0 bg-black/60" />
      <AlertDialog.Content className="fixed left-1/2 top-1/2 w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-card p-6 text-card-foreground">
        <AlertDialog.Title className="text-base font-semibold">Delete this project?</AlertDialog.Title>
        <AlertDialog.Description className="mt-2 text-sm text-muted-foreground">
          This removes the project and its deployments. This action cannot be undone.
        </AlertDialog.Description>
        <div className="mt-6 flex justify-end gap-3">
          <AlertDialog.Cancel className="rounded-md border border-border px-4 py-2 text-sm">Cancel</AlertDialog.Cancel>
          <AlertDialog.Action className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">
            Delete
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
);

const AspectRatioStory: StoryRender = () => (
  <AspectRatio.Root ratio={16 / 9} className="w-full max-w-md rounded-xl border border-border bg-muted">
    <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">16 : 9</div>
  </AspectRatio.Root>
);

const AvatarStory: StoryRender = () => (
  <div className="flex items-center gap-4">
    <Avatar.Root className="flex size-12 items-center justify-center overflow-hidden rounded-full bg-muted">
      <Avatar.Fallback delayMs={0} className="text-sm font-medium text-muted-foreground">
        AK
      </Avatar.Fallback>
    </Avatar.Root>
    <div>
      <p className="text-sm font-medium">Amara Koll</p>
      <p className="text-sm text-muted-foreground">Signed in 2 hours ago</p>
    </div>
  </div>
);

const CheckboxStory: StoryRender = () => (
  <div className="grid gap-4">
    {["Email digests", "Product updates", "Security alerts"].map((label, index) => (
      <label key={label} className="flex items-center gap-3 text-sm">
        <Checkbox.Root
          defaultChecked={index < 2}
          className="flex size-5 items-center justify-center rounded-[4px] border border-border"
        >
          <Checkbox.Indicator>
            <Check className="size-3.5 text-primary-foreground" />
          </Checkbox.Indicator>
        </Checkbox.Root>
        {label}
      </label>
    ))}
  </div>
);

const CollapsibleStory: StoryRender = () => (
  <Collapsible.Root defaultOpen className="w-full max-w-md">
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-medium">@radix-ui/primitives</h3>
      <Collapsible.Trigger className="rounded-md border border-border px-3 py-1.5 text-sm">Toggle</Collapsible.Trigger>
    </div>
    <Collapsible.Content className="mt-3 rounded-md border border-border p-4 text-sm text-muted-foreground">
      30 accessible primitives, unstyled and ready for your theme.
    </Collapsible.Content>
  </Collapsible.Root>
);

const ContextMenuStory: StoryRender = () => (
  <ContextMenu.Root open onOpenChange={() => {}}>
    <ContextMenu.Trigger className="flex h-48 w-full max-w-md items-center justify-center rounded-xl border border-dashed border-border text-sm text-muted-foreground">
      Right-click area
    </ContextMenu.Trigger>
    <ContextMenu.Portal>
      <ContextMenu.Content className="min-w-[160px] rounded-md border border-border bg-popover p-1 text-popover-foreground">
        <ContextMenu.Item className="rounded-sm px-2 py-1.5 text-sm">Back</ContextMenu.Item>
        <ContextMenu.Item className="rounded-sm px-2 py-1.5 text-sm">Reload</ContextMenu.Item>
        <ContextMenu.Separator className="my-1 h-px bg-border" />
        <ContextMenu.Item className="rounded-sm px-2 py-1.5 text-sm">Save as…</ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Portal>
  </ContextMenu.Root>
);

const DialogStory: StoryRender = () => (
  <Dialog.Root defaultOpen>
    <Dialog.Trigger className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">Invite member</Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/60" />
      <Dialog.Content className="fixed left-1/2 top-1/2 w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-card p-6 text-card-foreground">
        <Dialog.Title className="text-base font-semibold">Invite a team member</Dialog.Title>
        <Dialog.Description className="mt-2 text-sm text-muted-foreground">
          They receive an email with a link to join this workspace.
        </Dialog.Description>
        <input
          className="mt-4 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          defaultValue="teammate@example.com"
        />
        <div className="mt-6 flex justify-end gap-3">
          <Dialog.Close className="rounded-md border border-border px-4 py-2 text-sm">Cancel</Dialog.Close>
          <Dialog.Close className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">Send invite</Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

const DropdownMenuStory: StoryRender = () => (
  <DropdownMenu.Root defaultOpen>
    <DropdownMenu.Trigger className="rounded-md border border-border px-4 py-2 text-sm">Options</DropdownMenu.Trigger>
    <DropdownMenu.Portal>
      <DropdownMenu.Content className="min-w-[160px] rounded-md border border-border bg-popover p-1 text-popover-foreground">
        <DropdownMenu.Item className="rounded-sm px-2 py-1.5 text-sm">Duplicate</DropdownMenu.Item>
        <DropdownMenu.Item className="rounded-sm px-2 py-1.5 text-sm">Archive</DropdownMenu.Item>
        <DropdownMenu.Separator className="my-1 h-px bg-border" />
        <DropdownMenu.Item className="rounded-sm px-2 py-1.5 text-sm text-destructive">Delete</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  </DropdownMenu.Root>
);

const FormStory: StoryRender = () => (
  <Form.Root className="grid w-full max-w-sm gap-4">
    <Form.Field name="email">
      <Form.Label className="text-sm font-medium">Work email</Form.Label>
      <Form.Control asChild>
        <input
          type="email"
          required
          defaultValue="not-an-email"
          className="w-full rounded-md border border-destructive bg-background px-3 py-2 text-sm"
        />
      </Form.Control>
      <Form.Message className="text-sm text-destructive">Please enter a valid email address.</Form.Message>
    </Form.Field>
    <Form.Submit asChild>
      <button className="w-fit rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">Continue</button>
    </Form.Submit>
  </Form.Root>
);

const HoverCardStory: StoryRender = () => (
  <HoverCard.Root defaultOpen>
    <HoverCard.Trigger className="text-sm font-medium underline underline-offset-4">@radix-ui</HoverCard.Trigger>
    <HoverCard.Portal>
      <HoverCard.Content className="w-72 rounded-xl border border-border bg-popover p-4 text-popover-foreground">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-muted text-sm text-muted-foreground">
            R
          </div>
          <div>
            <p className="text-sm font-semibold">Radix UI</p>
            <p className="text-sm text-muted-foreground">Unstyled, accessible components.</p>
          </div>
        </div>
      </HoverCard.Content>
    </HoverCard.Portal>
  </HoverCard.Root>
);

const LabelStory: StoryRender = () => (
  <div className="grid w-full max-w-sm gap-2">
    <Label.Root htmlFor="label-story-email" className="text-sm font-medium">
      Email address
    </Label.Root>
    <input
      id="label-story-email"
      type="email"
      placeholder="you@example.com"
      className="rounded-md border border-border bg-background px-3 py-2 text-sm"
    />
  </div>
);

const MenubarStory: StoryRender = () => (
  <Menubar.Root defaultValue="file" className="flex rounded-md border border-border p-1">
    <Menubar.Menu value="file">
      <Menubar.Trigger className="rounded-sm px-3 py-1.5 text-sm">File</Menubar.Trigger>
      <Menubar.Portal>
        <Menubar.Content className="min-w-[160px] rounded-md border border-border bg-popover p-1 text-popover-foreground">
          <Menubar.Item className="rounded-sm px-2 py-1.5 text-sm">New tab</Menubar.Item>
          <Menubar.Item className="rounded-sm px-2 py-1.5 text-sm">New window</Menubar.Item>
          <Menubar.Separator className="my-1 h-px bg-border" />
          <Menubar.Item className="rounded-sm px-2 py-1.5 text-sm">Print…</Menubar.Item>
        </Menubar.Content>
      </Menubar.Portal>
    </Menubar.Menu>
    <Menubar.Menu value="edit">
      <Menubar.Trigger className="rounded-sm px-3 py-1.5 text-sm">Edit</Menubar.Trigger>
    </Menubar.Menu>
    <Menubar.Menu value="view">
      <Menubar.Trigger className="rounded-sm px-3 py-1.5 text-sm">View</Menubar.Trigger>
    </Menubar.Menu>
  </Menubar.Root>
);

const NavigationMenuStory: StoryRender = () => (
  <NavigationMenu.Root defaultValue="product" className="relative">
    <NavigationMenu.List className="flex gap-1 rounded-md border border-border p-1">
      <NavigationMenu.Item value="product">
        <NavigationMenu.Trigger className="rounded-sm px-3 py-1.5 text-sm">Product</NavigationMenu.Trigger>
        <NavigationMenu.Content className="absolute left-0 top-full mt-2 w-64 rounded-md border border-border bg-popover p-4 text-popover-foreground">
          <NavigationMenu.Link className="block rounded-sm p-2 text-sm">Analytics</NavigationMenu.Link>
          <NavigationMenu.Link className="block rounded-sm p-2 text-sm">Automations</NavigationMenu.Link>
          <NavigationMenu.Link className="block rounded-sm p-2 text-sm">Reports</NavigationMenu.Link>
        </NavigationMenu.Content>
      </NavigationMenu.Item>
      <NavigationMenu.Item value="docs">
        <NavigationMenu.Trigger className="rounded-sm px-3 py-1.5 text-sm">Docs</NavigationMenu.Trigger>
      </NavigationMenu.Item>
    </NavigationMenu.List>
  </NavigationMenu.Root>
);

const OneTimePasswordFieldStory: StoryRender = () => (
  <OneTimePasswordField.Root className="flex gap-2">
    {[0, 1, 2, 3].map((index) => (
      <OneTimePasswordField.Input
        key={index}
        index={index}
        className="size-11 rounded-md border border-border bg-background text-center text-lg"
      />
    ))}
    <OneTimePasswordField.HiddenInput />
  </OneTimePasswordField.Root>
);

const PasswordToggleFieldStory: StoryRender = () => (
  <div className="flex w-full max-w-sm items-center gap-2">
    <PasswordToggleField.Root>
      <PasswordToggleField.Input
        defaultValue="correct horse battery"
        className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
      />
      <PasswordToggleField.Toggle className="rounded-md border border-border px-3 py-2 text-sm">
        <PasswordToggleField.Icon visible={<Eye className="size-4" />} hidden={<EyeOff className="size-4" />} />
      </PasswordToggleField.Toggle>
    </PasswordToggleField.Root>
  </div>
);

const PopoverStory: StoryRender = () => (
  <Popover.Root defaultOpen>
    <Popover.Trigger className="rounded-md border border-border px-4 py-2 text-sm">Open popover</Popover.Trigger>
    <Popover.Portal>
      <Popover.Content className="w-64 rounded-xl border border-border bg-popover p-4 text-popover-foreground">
        <p className="text-sm font-semibold">Dimensions</p>
        <div className="mt-3 grid gap-2 text-sm">
          <label className="flex items-center justify-between gap-4">
            Width
            <input defaultValue="100%" className="w-24 rounded-md border border-border bg-background px-2 py-1" />
          </label>
          <label className="flex items-center justify-between gap-4">
            Height
            <input defaultValue="24px" className="w-24 rounded-md border border-border bg-background px-2 py-1" />
          </label>
        </div>
      </Popover.Content>
    </Popover.Portal>
  </Popover.Root>
);

const ProgressStory: StoryRender = () => (
  <div className="w-full max-w-md">
    <div className="mb-2 flex items-baseline justify-between text-sm">
      <span>Uploading assets</span>
      <span className="text-muted-foreground">66%</span>
    </div>
    <Progress.Root value={66} className="h-2 w-full overflow-hidden rounded-full bg-muted">
      <Progress.Indicator className="h-full rounded-full bg-primary" style={{ width: "66%" }} />
    </Progress.Root>
  </div>
);

const RadioGroupStory: StoryRender = () => (
  <RadioGroup.Root defaultValue="annual" className="grid gap-3">
    {[
      ["monthly", "Monthly — $12 per seat"],
      ["annual", "Annual — $120 per seat"],
    ].map(([value, label]) => (
      <label key={value} className="flex items-center gap-3 text-sm">
        <RadioGroup.Item value={value} className="flex size-5 items-center justify-center rounded-full border border-border">
          <RadioGroup.Indicator className="size-2.5 rounded-full bg-primary" />
        </RadioGroup.Item>
        {label}
      </label>
    ))}
  </RadioGroup.Root>
);

const ScrollAreaStory: StoryRender = () => (
  <ScrollArea.Root className="h-48 w-full max-w-sm rounded-xl border border-border">
    <ScrollArea.Viewport className="h-full p-4">
      <div className="grid gap-3 text-sm">
        {Array.from({ length: 12 }, (_, index) => (
          <p key={index} className="text-muted-foreground">
            Log line {index + 1}: the pipeline finished in {(index + 1) * 2} seconds.
          </p>
        ))}
      </div>
    </ScrollArea.Viewport>
    <ScrollArea.Scrollbar orientation="vertical" className="flex w-2 p-0.5">
      <ScrollArea.Thumb className="flex-1 rounded-full bg-border" />
    </ScrollArea.Scrollbar>
  </ScrollArea.Root>
);

const SelectStory: StoryRender = () => (
  <Select.Root defaultValue="apple" defaultOpen>
    <Select.Trigger className="flex w-56 items-center justify-between rounded-md border border-border bg-background px-3 py-2 text-sm">
      <Select.Value />
      <Select.Icon>
        <ChevronDown className="size-4 text-muted-foreground" />
      </Select.Icon>
    </Select.Trigger>
    <Select.Portal>
      <Select.Content className="rounded-md border border-border bg-popover p-1 text-popover-foreground">
        <Select.Viewport>
          {[
            ["apple", "Apple"],
            ["banana", "Banana"],
            ["blueberry", "Blueberry"],
          ].map(([value, label]) => (
            <Select.Item key={value} value={value} className="rounded-sm px-2 py-1.5 text-sm">
              <Select.ItemText>{label}</Select.ItemText>
            </Select.Item>
          ))}
        </Select.Viewport>
      </Select.Content>
    </Select.Portal>
  </Select.Root>
);

const SeparatorStory: StoryRender = () => (
  <div className="w-full max-w-md">
    <p className="text-sm font-medium">Radix UI</p>
    <Separator.Root className="my-4 h-px bg-border" />
    <p className="text-sm text-muted-foreground">Accessible primitives for the web.</p>
  </div>
);

const SliderStory: StoryRender = () => (
  <Slider.Root defaultValue={[40]} max={100} step={1} className="relative flex w-full max-w-md touch-none select-none items-center">
    <Slider.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-muted">
      <Slider.Range className="absolute h-full bg-primary" />
    </Slider.Track>
    <Slider.Thumb className="block size-5 rounded-full border-2 border-primary bg-background" />
  </Slider.Root>
);

const SwitchStory: StoryRender = () => (
  <div className="flex items-center gap-3 text-sm">
    <Switch.Root defaultChecked className="relative h-6 w-11 rounded-full bg-primary">
      <Switch.Thumb className="block size-5 translate-x-5 rounded-full bg-primary-foreground transition-transform" />
    </Switch.Root>
    Email notifications
  </div>
);

const TabsStory: StoryRender = () => (
  <Tabs.Root defaultValue="overview" className="w-full max-w-md">
    <Tabs.List className="flex gap-2 border-b border-border">
      {[
        ["overview", "Overview"],
        ["analytics", "Analytics"],
        ["settings", "Settings"],
      ].map(([value, label]) => (
        <Tabs.Trigger key={value} value={value} className="border-b-2 border-transparent px-3 py-2 text-sm data-[state=active]:border-primary">
          {label}
        </Tabs.Trigger>
      ))}
    </Tabs.List>
    <Tabs.Content value="overview" className="pt-4 text-sm text-muted-foreground">
      Traffic grew 18% this week, led by the pricing page.
    </Tabs.Content>
    <Tabs.Content value="analytics" className="pt-4 text-sm text-muted-foreground">
      4,210 sessions across 2,900 visitors.
    </Tabs.Content>
    <Tabs.Content value="settings" className="pt-4 text-sm text-muted-foreground">
      Workspace defaults and member permissions.
    </Tabs.Content>
  </Tabs.Root>
);

const ToastStory: StoryRender = () => (
  <Toast.Provider duration={100000}>
    <Toast.Root open onOpenChange={() => {}} className="w-80 rounded-xl border border-border bg-popover p-4 text-popover-foreground">
      <Toast.Title className="text-sm font-semibold">Deployment complete</Toast.Title>
      <Toast.Description className="mt-1 text-sm text-muted-foreground">
        The pricing page is live in production.
      </Toast.Description>
      <Toast.Action altText="Undo" className="mt-3 rounded-md border border-border px-3 py-1.5 text-sm">
        Undo
      </Toast.Action>
    </Toast.Root>
    <Toast.Viewport className="fixed bottom-4 right-4 w-80" />
  </Toast.Provider>
);

const ToggleStory: StoryRender = () => (
  <Toggle.Root defaultPressed className="rounded-md border border-border px-4 py-2 text-sm data-[state=on]:bg-secondary">
    Bold
  </Toggle.Root>
);

const ToggleGroupStory: StoryRender = () => (
  <ToggleGroup.Root type="single" defaultValue="center" className="flex rounded-md border border-border p-1">
    {[
      ["left", "Left"],
      ["center", "Center"],
      ["right", "Right"],
    ].map(([value, label]) => (
      <ToggleGroup.Item key={value} value={value} className="rounded-sm px-3 py-1.5 text-sm data-[state=on]:bg-secondary">
        {label}
      </ToggleGroup.Item>
    ))}
  </ToggleGroup.Root>
);

const ToolbarStory: StoryRender = () => (
  <Toolbar.Root className="flex items-center gap-1 rounded-md border border-border p-1">
    <Toolbar.Button className="rounded-sm px-3 py-1.5 text-sm">Bold</Toolbar.Button>
    <Toolbar.Button className="rounded-sm px-3 py-1.5 text-sm">Italic</Toolbar.Button>
    <Toolbar.Separator className="mx-1 h-5 w-px bg-border" />
    <Toolbar.ToggleGroup type="single" defaultValue="left" className="flex">
      {["left", "center", "right"].map((align) => (
        <Toolbar.ToggleItem key={align} value={align} className="rounded-sm px-3 py-1.5 text-sm data-[state=on]:bg-secondary">
          {align}
        </Toolbar.ToggleItem>
      ))}
    </Toolbar.ToggleGroup>
  </Toolbar.Root>
);

const TooltipStory: StoryRender = () => (
  <Tooltip.Provider>
    <Tooltip.Root open onOpenChange={() => {}}>
      <Tooltip.Trigger className="rounded-md border border-border px-4 py-2 text-sm">Hover me</Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content className="rounded-md border border-border bg-popover px-3 py-1.5 text-sm text-popover-foreground">
          Adds the component to your project.
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  </Tooltip.Provider>
);

export const radixStoryRenders: Record<string, StoryRender> = {
  "radix-ui/Accordion": AccordionStory,
  "radix-ui/Alert Dialog": AlertDialogStory,
  "radix-ui/Aspect Ratio": AspectRatioStory,
  "radix-ui/Avatar": AvatarStory,
  "radix-ui/Checkbox": CheckboxStory,
  "radix-ui/Collapsible": CollapsibleStory,
  "radix-ui/Context Menu": ContextMenuStory,
  "radix-ui/Dialog": DialogStory,
  "radix-ui/Dropdown Menu": DropdownMenuStory,
  "radix-ui/Form": FormStory,
  "radix-ui/Hover Card": HoverCardStory,
  "radix-ui/Label": LabelStory,
  "radix-ui/Menubar": MenubarStory,
  "radix-ui/Navigation Menu": NavigationMenuStory,
  "radix-ui/One-Time Password Field": OneTimePasswordFieldStory,
  "radix-ui/Password Toggle Field": PasswordToggleFieldStory,
  "radix-ui/Popover": PopoverStory,
  "radix-ui/Progress": ProgressStory,
  "radix-ui/Radio Group": RadioGroupStory,
  "radix-ui/Scroll Area": ScrollAreaStory,
  "radix-ui/Select": SelectStory,
  "radix-ui/Separator": SeparatorStory,
  "radix-ui/Slider": SliderStory,
  "radix-ui/Switch": SwitchStory,
  "radix-ui/Tabs": TabsStory,
  "radix-ui/Toast": ToastStory,
  "radix-ui/Toggle": ToggleStory,
  "radix-ui/Toggle Group": ToggleGroupStory,
  "radix-ui/Toolbar": ToolbarStory,
  "radix-ui/Tooltip": TooltipStory,
};
