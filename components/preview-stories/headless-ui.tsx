import * as React from "react";
import {
  Button,
  Checkbox,
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptions,
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Field,
  Fieldset,
  Input,
  Label,
  Legend,
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuSection,
  MenuHeading,
  MenuSeparator,
  Popover,
  PopoverButton,
  PopoverPanel,
  Radio,
  RadioGroup,
  RadioGroupDescription,
  RadioGroupLabel,
  RadioGroupOption,
  Select,
  Switch,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Textarea,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Check, ChevronDown, ChevronsUpDown } from "lucide-react";
import type { StoryRender } from "./type";

/**
 * Preview stories for Headless UI: each documented component rendered with the
 * API the installed `@headlessui/react` types define, styled through Col's
 * theme tokens with realistic content. Sample strings replace display text
 * where a caller relabels the render. Overlay components run in the package's
 * `__demoMode` (or a controlled `open`) so a screenshot captures the open
 * surface, not just the trigger.
 */

const MenuStory: StoryRender = ({ sample }) => (
  <Menu __demoMode as="div" className="relative">
    <MenuButton className="rounded-md border border-border px-4 py-2 text-sm">
      {sample.triggerLabel ?? "Acme workspace"}
    </MenuButton>
    <MenuItems className="mt-2 w-56 rounded-md border border-border bg-popover p-1 text-popover-foreground">
      <MenuSection>
        <MenuHeading className="px-2 py-1.5 text-xs text-muted-foreground">Project</MenuHeading>
        <MenuItem as="div" className="rounded-sm px-2 py-1.5 text-sm">{sample.item1 ?? "Invite teammates"}</MenuItem>
        <MenuItem as="div" className="rounded-sm px-2 py-1.5 text-sm">{sample.item2 ?? "Billing and invoices"}</MenuItem>
      </MenuSection>
      <MenuSeparator className="my-1 h-px bg-border" />
      <MenuItem as="div" className="rounded-sm px-2 py-1.5 text-sm text-destructive">{sample.item3 ?? "Delete project"}</MenuItem>
    </MenuItems>
  </Menu>
);

const DisclosureStory: StoryRender = ({ sample }) => (
  <Disclosure defaultOpen as="div" className="w-full max-w-md rounded-xl border border-border bg-card p-4 text-card-foreground">
    <DisclosureButton className="flex w-full items-center justify-between text-left text-sm font-medium">
      {sample.title ?? "How does per-seat billing work?"}
      <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
    </DisclosureButton>
    <DisclosurePanel className="mt-3 text-sm text-muted-foreground">
      Each workspace pays per active member per month. Deactivated members stop counting at the
      next cycle, and archived projects stay free forever.
    </DisclosurePanel>
  </Disclosure>
);

const DialogStory: StoryRender = ({ sample }) => (
  <Dialog open onClose={() => {}} className="relative z-50">
    <DialogBackdrop className="fixed inset-0 bg-black/60" />
    <div className="fixed inset-0 flex items-center justify-center p-4">
      <DialogPanel className="w-full max-w-md rounded-xl border border-border bg-card p-6 text-card-foreground">
        <DialogTitle className="text-base font-semibold">{sample.title ?? "Deploy to production?"}</DialogTitle>
        <p className="mt-2 text-sm text-muted-foreground">
          This ships the pricing-page redesign to all visitors and purges the edge cache.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button className="rounded-md border border-border px-4 py-2 text-sm">Cancel</Button>
          <Button className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">
            {sample.actionLabel ?? "Deploy now"}
          </Button>
        </div>
      </DialogPanel>
    </div>
  </Dialog>
);

const PopoverStory: StoryRender = ({ sample }) => (
  <Popover __demoMode className="relative">
    <PopoverButton className="rounded-md border border-border px-4 py-2 text-sm">
      {sample.triggerLabel ?? "Deploy settings"}
    </PopoverButton>
    <PopoverPanel className="mt-2 w-64 rounded-xl border border-border bg-popover p-4 text-popover-foreground">
      <p className="text-sm font-semibold">Production branch</p>
      <p className="mt-1 text-sm text-muted-foreground">main · auto-deploy on merge</p>
      <div className="mt-3 grid gap-2 text-sm">
        <label className="flex items-center justify-between gap-4">
          Preview URLs
          <input
            defaultValue="enabled"
            className="w-28 rounded-md border border-border bg-background px-2 py-1 text-sm"
          />
        </label>
        <label className="flex items-center justify-between gap-4">
          Region
          <input
            defaultValue="iad1"
            className="w-28 rounded-md border border-border bg-background px-2 py-1 text-sm"
          />
        </label>
      </div>
    </PopoverPanel>
  </Popover>
);

const TabsStory: StoryRender = ({ sample }) => (
  <TabGroup defaultIndex={0} className="w-full max-w-md">
    <TabList className="flex gap-2 border-b border-border">
      {[
        ["Overview", "Traffic grew 18% this week, led by the pricing page."],
        ["Analytics", "4,210 sessions across 2,900 visitors since Monday."],
        ["Members", "Priya Raman and 6 teammates have access to this workspace."],
      ].map(([tab], index) => (
        <Tab
          key={tab}
          className="border-b-2 border-transparent px-3 py-2 text-sm data-[selected]:border-primary data-[selected]:text-foreground"
        >
          {index === 0 ? (sample.tab1 ?? tab) : tab}
        </Tab>
      ))}
    </TabList>
    <TabPanels className="pt-4">
      {[
        "Traffic grew 18% this week, led by the pricing page.",
        "4,210 sessions across 2,900 visitors since Monday.",
        "Priya Raman and 6 teammates have access to this workspace.",
      ].map((body) => (
        <TabPanel key={body} className="text-sm text-muted-foreground">
          {body}
        </TabPanel>
      ))}
    </TabPanels>
  </TabGroup>
);

const TransitionStory: StoryRender = ({ sample }) => (
  <Transition show appear>
    <TransitionChild
      enter="transition duration-200 ease-out"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
    >
      <div className="w-full max-w-sm rounded-xl border border-border bg-card p-5 text-card-foreground">
        <p className="text-sm font-semibold">{sample.title ?? "Release notes published"}</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Version 2.4 is live — invoice exports, faster search, and a rebuilt billing page.
        </p>
      </div>
    </TransitionChild>
  </Transition>
);

const ButtonStory: StoryRender = ({ sample }) => (
  <div className="flex flex-wrap items-center justify-center gap-3">
    <Button className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">
      {sample.primaryLabel ?? "Start free trial"}
    </Button>
    <Button className="rounded-md border border-border px-4 py-2 text-sm">
      {sample.secondaryLabel ?? "View the docs"}
    </Button>
    <Button disabled className="rounded-md bg-secondary px-4 py-2 text-sm text-muted-foreground">
      Coming soon
    </Button>
  </div>
);

const CheckboxStory: StoryRender = ({ sample }) => (
  <div className="grid gap-4">
    {([
      [sample.label1 ?? "Invoice receipts", true],
      [sample.label2 ?? "Usage alerts", true],
      ["Security advisories", false],
    ] as Array<[string, boolean]>).map(([label, checked]) => (
      <Checkbox
        key={String(label)}
        defaultChecked={checked}
        className="flex items-center gap-3 text-sm"
      >
        {({ checked: isChecked }) => (
          <>
            <span
              className={
                isChecked
                  ? "flex size-5 items-center justify-center rounded-[4px] bg-primary"
                  : "flex size-5 items-center justify-center rounded-[4px] border border-border"
              }
            >
              {isChecked && <Check className="size-3.5 text-primary-foreground" />}
            </span>
            {label}
          </>
        )}
      </Checkbox>
    ))}
  </div>
);

const ComboboxStory: StoryRender = ({ sample }) => (
  <Combobox __demoMode defaultValue="priya" as="div" className="w-full max-w-xs">
    <ComboboxLabel className="text-sm font-medium">{sample.label ?? "Assignee"}</ComboboxLabel>
    <div className="relative mt-1.5">
      <ComboboxInput
        className="w-full rounded-md border border-border bg-background px-3 py-2 pr-10 text-sm"
        aria-label="Assignee"
      />
      <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground">
        <ChevronsUpDown className="size-4" />
      </ComboboxButton>
    </div>
    <ComboboxOptions className="mt-2 w-full rounded-md border border-border bg-popover p-1 text-popover-foreground">
      {[
        ["priya", "Priya Raman", "Platform lead"],
        ["jonas", "Jonas Weber", "Design systems"],
        ["lucia", "Lucía Fernández", "Growth engineering"],
      ].map(([value, name, role]) => (
        <ComboboxOption key={value} value={value} className="rounded-sm px-2 py-1.5 text-sm">
          <div>
            <p>{name}</p>
            <p className="text-xs text-muted-foreground">{role}</p>
          </div>
        </ComboboxOption>
      ))}
    </ComboboxOptions>
  </Combobox>
);

const FieldsetStory: StoryRender = ({ sample }) => (
  <Fieldset className="w-full max-w-sm rounded-xl border border-border bg-card p-4 text-card-foreground">
    <Legend className="text-sm font-semibold">{sample.title ?? "Invoice details"}</Legend>
    <Field className="mt-3 grid gap-1.5">
      <Label className="text-sm">Billing email</Label>
      <Input
        type="email"
        defaultValue="ap@northwind.io"
        className="rounded-md border border-border bg-background px-3 py-2 text-sm"
      />
    </Field>
    <Field className="mt-3 grid gap-1.5">
      <Label className="text-sm">Purchase order</Label>
      <Input
        defaultValue="PO-2026-0871"
        className="rounded-md border border-border bg-background px-3 py-2 text-sm"
      />
    </Field>
  </Fieldset>
);

const InputStory: StoryRender = ({ sample }) => (
  <Field className="grid w-full max-w-sm gap-1.5">
    <Label className="text-sm font-medium">{sample.label ?? "Work email"}</Label>
    <Input
      type="email"
      defaultValue="priya@northwind.io"
      className="rounded-md border border-border bg-background px-3 py-2 text-sm"
    />
    <Description className="text-sm text-muted-foreground">
      Invoices and usage alerts go to this address.
    </Description>
  </Field>
);

const ListboxStory: StoryRender = ({ sample }) => (
  <Listbox __demoMode defaultValue="startup" as="div" className="w-full max-w-xs">
    <ListboxLabel className="text-sm font-medium">{sample.label ?? "Plan"}</ListboxLabel>
    <ListboxButton className="mt-1.5 flex w-full items-center justify-between rounded-md border border-border bg-background px-3 py-2 text-sm">
      {({ value }) => (
        <>
          <span>{value}</span>
          <ChevronDown className="size-4 text-muted-foreground" />
        </>
      )}
    </ListboxButton>
    <ListboxOptions className="mt-2 w-full rounded-md border border-border bg-popover p-1 text-popover-foreground">
      {[
        ["starter", "Starter — $0 per seat"],
        ["startup", "Startup — $12 per seat"],
        ["scale", "Scale — $29 per seat"],
      ].map(([value, label]) => (
        <ListboxOption key={value} value={value} className="rounded-sm px-2 py-1.5 text-sm">
          {({ selected }) => (
            <span className="flex items-center justify-between gap-2">
              {label}
              {selected && <Check className="size-4 text-primary-foreground" />}
            </span>
          )}
        </ListboxOption>
      ))}
    </ListboxOptions>
  </Listbox>
);

const RadioGroupStory: StoryRender = ({ sample }) => (
  <RadioGroup defaultValue="annual" className="grid gap-3">
    <RadioGroupLabel className="text-sm font-medium">{sample.label ?? "Billing cycle"}</RadioGroupLabel>
    {[
      ["monthly", "Monthly — $12 per seat", "Flexible, cancel anytime."],
      ["annual", "Annual — $120 per seat", "Two months free versus monthly."],
    ].map(([value, label, description]) => (
      <RadioGroupOption key={value} value={value} className="flex items-start gap-3 text-sm">
        {({ checked }) => (
          <>
            <Radio
              value={value}
              className={
                checked
                  ? "mt-0.5 flex size-5 items-center justify-center rounded-full border border-primary"
                  : "mt-0.5 flex size-5 items-center justify-center rounded-full border border-border"
              }
            >
              {checked && <span className="size-2.5 rounded-full bg-primary" />}
            </Radio>
            <div>
              <p>{label}</p>
              <RadioGroupDescription className="text-sm text-muted-foreground">{description}</RadioGroupDescription>
            </div>
          </>
        )}
      </RadioGroupOption>
    ))}
  </RadioGroup>
);

const SelectStory: StoryRender = ({ sample }) => (
  <Field className="grid w-full max-w-sm gap-1.5">
    <Label className="text-sm font-medium">{sample.label ?? "Deployment region"}</Label>
    <div className="relative">
      <Select
        defaultValue="iad1"
        className="w-full appearance-none rounded-md border border-border bg-background px-3 py-2 text-sm"
      >
        <option value="iad1">US East — Ashburn</option>
        <option value="fra1">EU — Frankfurt</option>
        <option value="sin1">Asia Pacific — Singapore</option>
      </Select>
      <ChevronDown className="pointer-events-none absolute inset-y-0 right-3 my-auto size-4 text-muted-foreground" />
    </div>
    <Description className="text-sm text-muted-foreground">
      New projects deploy here first. You can add regions later.
    </Description>
  </Field>
);

const SwitchStory: StoryRender = ({ sample }) => (
  <Switch defaultChecked className="flex items-center gap-3 text-sm">
    {({ checked }) => (
      <>
        <span
          className={
            checked
              ? "relative h-6 w-11 rounded-full bg-primary"
              : "relative h-6 w-11 rounded-full bg-muted"
          }
        >
          <span
            className={
              checked
                ? "absolute left-5 top-0.5 block size-5 rounded-full bg-primary-foreground"
                : "absolute left-0.5 top-0.5 block size-5 rounded-full bg-background"
            }
          />
        </span>
        {sample.label ?? "Weekly usage digest"}
      </>
    )}
  </Switch>
);

const TextareaStory: StoryRender = ({ sample }) => (
  <Field className="grid w-full max-w-md gap-1.5">
    <Label className="text-sm font-medium">{sample.label ?? "Release notes"}</Label>
    <Textarea
      defaultValue={"Invoice exports, faster search, and a rebuilt billing page."}
      rows={4}
      className="rounded-md border border-border bg-background px-3 py-2 text-sm"
    />
    <Description className="text-sm text-muted-foreground">
      Shown to everyone on the updates feed.
    </Description>
  </Field>
);

export const storyRenders: Record<string, StoryRender> = {
  "headless-ui/Dropdown Menu": MenuStory,
  "headless-ui/Disclosure": DisclosureStory,
  "headless-ui/Dialog": DialogStory,
  "headless-ui/Popover": PopoverStory,
  "headless-ui/Tabs": TabsStory,
  "headless-ui/Transition": TransitionStory,
  "headless-ui/Button": ButtonStory,
  "headless-ui/Checkbox": CheckboxStory,
  "headless-ui/Combobox": ComboboxStory,
  "headless-ui/Fieldset": FieldsetStory,
  "headless-ui/Input": InputStory,
  "headless-ui/Listbox": ListboxStory,
  "headless-ui/Radio Group": RadioGroupStory,
  "headless-ui/Select": SelectStory,
  "headless-ui/Switch": SwitchStory,
  "headless-ui/Textarea": TextareaStory,
};
