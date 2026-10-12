import {
  Accordion,
  AlertDialog,
  Autocomplete,
  Avatar,
  Button,
  Checkbox,
  CheckboxGroup,
  Collapsible,
  Combobox,
  ContextMenu,
  Dialog,
  Drawer,
  Field,
  Fieldset,
  Form,
  Input,
  Menu,
  Menubar,
  Meter,
} from "@base-ui/react";
import { Check, ChevronDown, Minus, X } from "lucide-react";
import type { StoryRender } from "./type";

/**
 * Preview stories for Base UI: each documented component as the installed
 * `@base-ui/react` package documents it — accessible behaviour from the real
 * parts, Col's theme tokens for the look. Popups and dialogs hold themselves
 * open (`open` plus a no-op `onOpenChange`) so a screenshot captures the
 * interesting surface, not just the trigger.
 */

const AccordionStory: StoryRender = ({ sample }) => (
  <Accordion.Root defaultValue={["billing"]} className="w-full max-w-xl">
    <Accordion.Item value="billing" className="border-b border-border">
      <Accordion.Header>
        <Accordion.Trigger className="flex w-full items-center justify-between py-4 text-left text-sm font-medium">
          {sample.question ?? "How does billing work?"}
          <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Panel className="pb-4 text-sm text-muted-foreground">
        Every plan is billed monthly per workspace. The Growth tier adds usage-based pricing above 50,000 tracked
        invoices per month.
      </Accordion.Panel>
    </Accordion.Item>
    <Accordion.Item value="stripe" className="border-b border-border">
      <Accordion.Header>
        <Accordion.Trigger className="flex w-full items-center justify-between py-4 text-left text-sm font-medium">
          Can I import invoices from Stripe?
          <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Panel className="pb-4 text-sm text-muted-foreground">
        Yes. Connect a Stripe account and open and paid invoices sync into Ledger every hour.
      </Accordion.Panel>
    </Accordion.Item>
    <Accordion.Item value="currencies" className="border-b border-border">
      <Accordion.Header>
        <Accordion.Trigger className="flex w-full items-center justify-between py-4 text-left text-sm font-medium">
          Does Ledger support multiple currencies?
          <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Panel className="pb-4 text-sm text-muted-foreground">
        Ledger settles in 32 currencies and revalues open balances daily against the ECB reference rate.
      </Accordion.Panel>
    </Accordion.Item>
  </Accordion.Root>
);

const AlertDialogStory: StoryRender = ({ sample }) => (
  <AlertDialog.Root open onOpenChange={() => {}}>
    <AlertDialog.Trigger className="rounded-md border border-border px-4 py-2 text-sm">Delete invoice</AlertDialog.Trigger>
    <AlertDialog.Portal>
      <AlertDialog.Backdrop className="fixed inset-0 bg-black/60" />
      <AlertDialog.Popup className="fixed left-1/2 top-1/2 w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-card p-6 text-card-foreground">
        <AlertDialog.Title className="text-base font-semibold">
          {sample.title ?? "Delete invoice INV-2041?"}
        </AlertDialog.Title>
        <AlertDialog.Description className="mt-2 text-sm text-muted-foreground">
          This removes the invoice from Harbor CRM&apos;s billing history and notifies the client. This action cannot be
          undone.
        </AlertDialog.Description>
        <div className="mt-6 flex justify-end gap-3">
          <AlertDialog.Close className="rounded-md border border-border px-4 py-2 text-sm">Cancel</AlertDialog.Close>
          <AlertDialog.Close className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">
            Delete invoice
          </AlertDialog.Close>
        </div>
      </AlertDialog.Popup>
    </AlertDialog.Portal>
  </AlertDialog.Root>
);

const PROJECT_NAMES = [
  "Northwind Redesign",
  "Harbor CRM Migration",
  "Q4 Billing Portal",
  "Lantern Mobile App",
  "Summit Data Warehouse",
];

const AutocompleteStory: StoryRender = ({ sample }) => (
  <div className="grid w-full max-w-sm gap-2">
    <label htmlFor="autocomplete-story-input" className="text-sm font-medium">
      {sample.label ?? "Jump to project"}
    </label>
    <Autocomplete.Root items={PROJECT_NAMES} open onOpenChange={() => {}}>
      <Autocomplete.Input
        id="autocomplete-story-input"
        placeholder="Search projects"
        className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
      />
      <Autocomplete.Portal>
        <Autocomplete.Positioner sideOffset={6} className="outline-none">
          <Autocomplete.Popup className="min-w-[240px] rounded-md border border-border bg-popover p-1 text-popover-foreground">
            <Autocomplete.Empty className="rounded-sm px-2 py-1.5 text-sm text-muted-foreground">
              No projects found.
            </Autocomplete.Empty>
            <Autocomplete.List>
              {(project: string) => (
                <Autocomplete.Item key={project} value={project} className="rounded-sm px-2 py-1.5 text-sm">
                  {project}
                </Autocomplete.Item>
              )}
            </Autocomplete.List>
          </Autocomplete.Popup>
        </Autocomplete.Positioner>
      </Autocomplete.Portal>
    </Autocomplete.Root>
  </div>
);

const AvatarStory: StoryRender = ({ sample }) => (
  <div className="grid gap-4">
    <div className="flex items-center gap-4">
      <Avatar.Root className="flex size-12 items-center justify-center overflow-hidden rounded-full bg-muted">
        <Avatar.Fallback delay={0} className="text-sm font-medium text-muted-foreground">
          PR
        </Avatar.Fallback>
      </Avatar.Root>
      <div>
        <p className="text-sm font-medium">{sample.name ?? "Priya Raghavan"}</p>
        <p className="text-sm text-muted-foreground">Product design — active 12 minutes ago</p>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <Avatar.Root className="flex size-12 items-center justify-center overflow-hidden rounded-full bg-muted">
        <Avatar.Fallback delay={0} className="text-sm font-medium text-muted-foreground">
          MC
        </Avatar.Fallback>
      </Avatar.Root>
      <div>
        <p className="text-sm font-medium">Marcus Chen</p>
        <p className="text-sm text-muted-foreground">Platform lead — active 2 hours ago</p>
      </div>
    </div>
  </div>
);

const ButtonStory: StoryRender = ({ sample }) => (
  <div className="flex flex-wrap items-center justify-center gap-3">
    <Button className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">
      {sample.primaryLabel ?? "Start free trial"}
    </Button>
    <Button className="rounded-md border border-border px-4 py-2 text-sm">
      {sample.secondaryLabel ?? "View the docs"}
    </Button>
  </div>
);

const CheckboxStory: StoryRender = ({ sample }) => (
  <div className="grid gap-4">
    {[sample.label ?? "Deployment failures", "Invoice reminders", "Weekly usage report"].map((label, index) => (
      <label key={label} className="flex items-center gap-3 text-sm">
        <Checkbox.Root
          defaultChecked={index < 2}
          className="flex size-5 items-center justify-center rounded-[4px] border border-border data-[checked]:bg-primary data-[checked]:text-primary-foreground"
        >
          <Checkbox.Indicator className="flex">
            <Check className="size-3.5" />
          </Checkbox.Indicator>
        </Checkbox.Root>
        {label}
      </label>
    ))}
  </div>
);

const NOTIFICATION_CHANNELS = ["mentions", "direct messages", "project updates"];

const CheckboxGroupStory: StoryRender = ({ sample }) => (
  <CheckboxGroup
    defaultValue={["mentions"]}
    allValues={NOTIFICATION_CHANNELS}
    aria-labelledby="checkbox-group-story-legend"
    className="flex flex-col items-start gap-3"
  >
    <div id="checkbox-group-story-legend" className="text-sm font-medium">
      {sample.groupLabel ?? "Email me about"}
    </div>
    <label className="flex items-center gap-3 text-sm">
      <Checkbox.Root
        parent
        className="flex size-5 items-center justify-center rounded-[4px] border border-border data-[checked]:bg-primary data-[checked]:text-primary-foreground"
      >
        <Checkbox.Indicator
          className="flex"
          render={(props, state) => (
            <span {...props}>{state.indeterminate ? <Minus className="size-3.5" /> : <Check className="size-3.5" />}</span>
          )}
        />
      </Checkbox.Root>
      All activity
    </label>
    {NOTIFICATION_CHANNELS.map((channel) => (
      <label key={channel} className="flex items-center gap-3 text-sm">
        <Checkbox.Root
          value={channel}
          className="flex size-5 items-center justify-center rounded-[4px] border border-border data-[checked]:bg-primary data-[checked]:text-primary-foreground"
        >
          <Checkbox.Indicator className="flex">
            <Check className="size-3.5" />
          </Checkbox.Indicator>
        </Checkbox.Root>
        {channel.charAt(0).toUpperCase() + channel.slice(1)}
      </label>
    ))}
  </CheckboxGroup>
);

const CollapsibleStory: StoryRender = ({ sample }) => (
  <Collapsible.Root defaultOpen className="w-full max-w-md">
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-medium">{sample.triggerLabel ?? "Deployment details"}</h3>
      <Collapsible.Trigger className="flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-sm">
        Toggle
        <ChevronDown className="size-4 text-muted-foreground" />
      </Collapsible.Trigger>
    </div>
    <Collapsible.Panel className="mt-3 rounded-md border border-border p-4 text-sm text-muted-foreground">
      <p>Commit a3f9c21 on main</p>
      <p>Region iad1 — us-east</p>
      <p>Finished in 2m 14s</p>
    </Collapsible.Panel>
  </Collapsible.Root>
);

const ASSIGNEE_NAMES = ["Priya Raghavan", "Marcus Chen", "Elena Petrova", "Tomás Alvarez", "Aisha Okonkwo"];

const ComboboxStory: StoryRender = ({ sample }) => (
  <div className="grid w-full max-w-sm gap-2">
    <Combobox.Root items={ASSIGNEE_NAMES} open onOpenChange={() => {}}>
      <Combobox.Label className="text-sm font-medium">{sample.label ?? "Assignee"}</Combobox.Label>
      <Combobox.InputGroup className="mt-1 flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2">
        <Combobox.Input placeholder="Search teammates" className="flex-1 bg-transparent text-sm outline-none" />
        <Combobox.Clear aria-label="Clear selection" className="text-muted-foreground">
          <X className="size-4" />
        </Combobox.Clear>
        <Combobox.Trigger aria-label="Open list" className="text-muted-foreground">
          <ChevronDown className="size-4" />
        </Combobox.Trigger>
      </Combobox.InputGroup>
      <Combobox.Portal>
        <Combobox.Positioner sideOffset={6} className="outline-none">
          <Combobox.Popup className="min-w-[220px] rounded-md border border-border bg-popover p-1 text-popover-foreground">
            <Combobox.Empty className="rounded-sm px-2 py-1.5 text-sm text-muted-foreground">
              No teammates found.
            </Combobox.Empty>
            <Combobox.List>
              {(assignee: string) => (
                <Combobox.Item key={assignee} value={assignee} className="flex items-center justify-between rounded-sm px-2 py-1.5 text-sm">
                  {assignee}
                  <Combobox.ItemIndicator>
                    <Check className="size-3.5" />
                  </Combobox.ItemIndicator>
                </Combobox.Item>
              )}
            </Combobox.List>
          </Combobox.Popup>
        </Combobox.Positioner>
      </Combobox.Portal>
    </Combobox.Root>
  </div>
);

const ContextMenuStory: StoryRender = ({ sample }) => (
  <ContextMenu.Root open onOpenChange={() => {}}>
    <ContextMenu.Trigger className="flex h-48 w-full max-w-md flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-border">
      <span className="text-sm font-medium">{sample.projectName ?? "Northwind Redesign"}</span>
      <span className="text-sm text-muted-foreground">Right-click a project row for actions</span>
    </ContextMenu.Trigger>
    <ContextMenu.Portal>
      <ContextMenu.Positioner sideOffset={6} className="outline-none">
        <ContextMenu.Popup className="min-w-[180px] rounded-md border border-border bg-popover p-1 text-popover-foreground">
          <ContextMenu.Item className="rounded-sm px-2 py-1.5 text-sm">Open project</ContextMenu.Item>
          <ContextMenu.Item className="rounded-sm px-2 py-1.5 text-sm">Open in new tab</ContextMenu.Item>
          <ContextMenu.Separator className="my-1 h-px bg-border" />
          <ContextMenu.Item className="rounded-sm px-2 py-1.5 text-sm">Duplicate</ContextMenu.Item>
          <ContextMenu.Item className="rounded-sm px-2 py-1.5 text-sm">Move to archive</ContextMenu.Item>
          <ContextMenu.Separator className="my-1 h-px bg-border" />
          <ContextMenu.Item className="rounded-sm px-2 py-1.5 text-sm text-destructive">Delete project</ContextMenu.Item>
        </ContextMenu.Popup>
      </ContextMenu.Positioner>
    </ContextMenu.Portal>
  </ContextMenu.Root>
);

const DialogStory: StoryRender = ({ sample }) => (
  <Dialog.Root open onOpenChange={() => {}}>
    <Dialog.Trigger className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">Invite member</Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Backdrop className="fixed inset-0 bg-black/60" />
      <Dialog.Popup className="fixed left-1/2 top-1/2 w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-card p-6 text-card-foreground">
        <Dialog.Title className="text-base font-semibold">{sample.title ?? "Invite a team member"}</Dialog.Title>
        <Dialog.Description className="mt-2 text-sm text-muted-foreground">
          They receive an email with a link to join the Northwind workspace.
        </Dialog.Description>
        <Input
          defaultValue="priya@northwind.io"
          className="mt-4 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
        />
        <div className="mt-6 flex justify-end gap-3">
          <Dialog.Close className="rounded-md border border-border px-4 py-2 text-sm">Cancel</Dialog.Close>
          <Dialog.Close className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">Send invite</Dialog.Close>
        </div>
      </Dialog.Popup>
    </Dialog.Portal>
  </Dialog.Root>
);

const DrawerStory: StoryRender = ({ sample }) => (
  <Drawer.Root swipeDirection="right" open onOpenChange={() => {}}>
    <Drawer.Trigger className="rounded-md border border-border px-4 py-2 text-sm">Open settings</Drawer.Trigger>
    <Drawer.Portal>
      <Drawer.Backdrop className="fixed inset-0 bg-black/60" />
      <Drawer.Viewport className="fixed inset-0 flex items-stretch justify-end">
        <Drawer.Popup className="h-full w-[320px] max-w-[calc(100vw-2rem)] border-l border-border bg-card p-6 text-card-foreground">
          <Drawer.Content className="mx-auto w-full">
            <Drawer.Title className="text-base font-semibold">{sample.title ?? "Notification settings"}</Drawer.Title>
            <Drawer.Description className="mt-2 text-sm text-muted-foreground">
              Choose what this workspace sends you.
            </Drawer.Description>
            <div className="mt-6 grid gap-3 text-sm text-muted-foreground">
              <p>Deployment alerts</p>
              <p>Weekly summaries</p>
              <p>Invoice reminders</p>
            </div>
            <Drawer.Close className="mt-6 rounded-md border border-border px-4 py-2 text-sm">Close</Drawer.Close>
          </Drawer.Content>
        </Drawer.Popup>
      </Drawer.Viewport>
    </Drawer.Portal>
  </Drawer.Root>
);

const FieldStory: StoryRender = ({ sample }) => (
  <Field.Root name="invoiceNumber" className="grid w-full max-w-sm gap-2">
    <Field.Label className="text-sm font-medium">{sample.label ?? "Invoice number"}</Field.Label>
    <Field.Control
      pattern="INV-[0-9]{4}"
      defaultValue="2041-AR"
      className="rounded-md border border-border bg-background px-3 py-2 text-sm"
    />
    <Field.Error match="patternMismatch" className="text-sm text-destructive">
      Use the format INV-2041.
    </Field.Error>
    <Field.Description className="text-sm text-muted-foreground">
      Printed on every invoice PDF and receipt.
    </Field.Description>
  </Field.Root>
);

const FieldsetStory: StoryRender = ({ sample }) => (
  <Fieldset.Root className="grid w-full max-w-sm gap-4">
    <Fieldset.Legend className="text-sm font-medium">{sample.legend ?? "Shipping address"}</Fieldset.Legend>
    <Field.Root name="street" className="grid gap-2">
      <Field.Label className="text-sm font-medium">Street address</Field.Label>
      <Field.Control defaultValue="1 Harbour Road" className="rounded-md border border-border bg-background px-3 py-2 text-sm" />
    </Field.Root>
    <Field.Root name="city" className="grid gap-2">
      <Field.Label className="text-sm font-medium">City</Field.Label>
      <Field.Control defaultValue="Bristol" className="rounded-md border border-border bg-background px-3 py-2 text-sm" />
    </Field.Root>
    <Field.Root name="postcode" className="grid gap-2">
      <Field.Label className="text-sm font-medium">Postcode</Field.Label>
      <Field.Control defaultValue="BS1 4ST" className="rounded-md border border-border bg-background px-3 py-2 text-sm" />
    </Field.Root>
  </Fieldset.Root>
);

const FormStory: StoryRender = ({ sample }) => (
  <Form className="grid w-full max-w-sm gap-4">
    <Field.Root name="email" className="grid gap-2">
      <Field.Label className="text-sm font-medium">Work email</Field.Label>
      <Field.Control
        type="email"
        defaultValue="priya at northwind.io"
        className="rounded-md border border-border bg-background px-3 py-2 text-sm"
      />
      <Field.Error match="typeMismatch" className="text-sm text-destructive">
        Enter a valid email address.
      </Field.Error>
    </Field.Root>
    <Button type="submit" className="w-fit rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">
      {sample.submitLabel ?? "Create workspace"}
    </Button>
  </Form>
);

const InputStory: StoryRender = ({ sample }) => (
  <div className="grid w-full max-w-sm gap-2">
    <label htmlFor="input-story-email" className="text-sm font-medium">
      {sample.label ?? "Work email"}
    </label>
    <Input
      id="input-story-email"
      type="email"
      placeholder="you@example.com"
      className="rounded-md border border-border bg-background px-3 py-2 text-sm"
    />
  </div>
);

const MenuStory: StoryRender = ({ sample }) => (
  <Menu.Root open onOpenChange={() => {}}>
    <Menu.Trigger className="rounded-md border border-border px-4 py-2 text-sm">
      {sample.triggerLabel ?? "Project actions"}
    </Menu.Trigger>
    <Menu.Portal>
      <Menu.Positioner sideOffset={6} className="outline-none">
        <Menu.Popup className="min-w-[180px] rounded-md border border-border bg-popover p-1 text-popover-foreground">
          <Menu.Group>
            <Menu.GroupLabel className="px-2 py-1.5 text-sm text-muted-foreground">Northwind Redesign</Menu.GroupLabel>
            <Menu.Item className="rounded-sm px-2 py-1.5 text-sm">Open in new tab</Menu.Item>
            <Menu.Item className="rounded-sm px-2 py-1.5 text-sm">Duplicate</Menu.Item>
          </Menu.Group>
          <Menu.Separator className="my-1 h-px bg-border" />
          <Menu.Item className="rounded-sm px-2 py-1.5 text-sm">Move to archive</Menu.Item>
          <Menu.Item className="rounded-sm px-2 py-1.5 text-sm text-destructive">Delete project</Menu.Item>
        </Menu.Popup>
      </Menu.Positioner>
    </Menu.Portal>
  </Menu.Root>
);

const MenubarStory: StoryRender = ({ sample }) => (
  <Menubar className="flex rounded-md border border-border p-1">
    <Menu.Root open onOpenChange={() => {}}>
      <Menu.Trigger className="rounded-sm px-3 py-1.5 text-sm">{sample.menuLabel ?? "File"}</Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner sideOffset={6} className="outline-none">
          <Menu.Popup className="min-w-[180px] rounded-md border border-border bg-popover p-1 text-popover-foreground">
            <Menu.Item className="rounded-sm px-2 py-1.5 text-sm">New invoice</Menu.Item>
            <Menu.Item className="rounded-sm px-2 py-1.5 text-sm">Open workspace…</Menu.Item>
            <Menu.Separator className="my-1 h-px bg-border" />
            <Menu.Item className="rounded-sm px-2 py-1.5 text-sm">Import from Stripe</Menu.Item>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
    <Menu.Root>
      <Menu.Trigger className="rounded-sm px-3 py-1.5 text-sm">Edit</Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner sideOffset={6} className="outline-none">
          <Menu.Popup className="min-w-[180px] rounded-md border border-border bg-popover p-1 text-popover-foreground">
            <Menu.Item className="rounded-sm px-2 py-1.5 text-sm">Undo</Menu.Item>
            <Menu.Item className="rounded-sm px-2 py-1.5 text-sm">Redo</Menu.Item>
            <Menu.Separator className="my-1 h-px bg-border" />
            <Menu.Item className="rounded-sm px-2 py-1.5 text-sm">Duplicate invoice</Menu.Item>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
    <Menu.Root>
      <Menu.Trigger className="rounded-sm px-3 py-1.5 text-sm">View</Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner sideOffset={6} className="outline-none">
          <Menu.Popup className="min-w-[180px] rounded-md border border-border bg-popover p-1 text-popover-foreground">
            <Menu.Item className="rounded-sm px-2 py-1.5 text-sm">Invoices</Menu.Item>
            <Menu.Item className="rounded-sm px-2 py-1.5 text-sm">Reports</Menu.Item>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  </Menubar>
);

const MeterStory: StoryRender = ({ sample }) => (
  <div className="w-full max-w-md">
    <Meter.Root
      value={68.4}
      max={100}
      format={{ style: "unit", unit: "gigabyte", unitDisplay: "narrow", maximumFractionDigits: 1 }}
      className="grid grid-cols-2 gap-y-2"
    >
      <Meter.Label className="text-sm font-medium">{sample.label ?? "Storage used"}</Meter.Label>
      <Meter.Value className="text-right text-sm text-muted-foreground" />
      <Meter.Track className="col-span-2 h-2 overflow-hidden rounded-full bg-muted">
        <Meter.Indicator className="h-full rounded-full bg-primary" />
      </Meter.Track>
    </Meter.Root>
    <p className="mt-2 text-sm text-muted-foreground">31.6 GB free on the Northwind workspace</p>
  </div>
);

export const storyRenders: Record<string, StoryRender> = {
  "base-ui/Accordion": AccordionStory,
  "base-ui/Alert Dialog": AlertDialogStory,
  "base-ui/Autocomplete": AutocompleteStory,
  "base-ui/Avatar": AvatarStory,
  "base-ui/Button": ButtonStory,
  "base-ui/Checkbox": CheckboxStory,
  "base-ui/Checkbox Group": CheckboxGroupStory,
  "base-ui/Collapsible": CollapsibleStory,
  "base-ui/Combobox": ComboboxStory,
  "base-ui/Context Menu": ContextMenuStory,
  "base-ui/Dialog": DialogStory,
  "base-ui/Drawer": DrawerStory,
  "base-ui/Field": FieldStory,
  "base-ui/Fieldset": FieldsetStory,
  "base-ui/Form": FormStory,
  "base-ui/Input": InputStory,
  "base-ui/Menu": MenuStory,
  "base-ui/Menubar": MenubarStory,
  "base-ui/Meter": MeterStory,
};
