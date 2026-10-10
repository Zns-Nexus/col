import * as React from "react";
import { parseDate } from "@internationalized/date";
import {
  Autocomplete,
  Breadcrumb,
  Breadcrumbs,
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  CalendarHeading,
  CheckboxButton,
  CheckboxField,
  CheckboxGroup,
  ColorArea,
  ColorField,
  ColorPicker,
  ColorSlider,
  ColorSwatch,
  ColorSwatchPicker,
  ColorSwatchPickerItem,
  ColorThumb,
  ColorWheel,
  ColorWheelTrack,
  ComboBox,
  DateField,
  DateInput,
  DatePicker,
  DateRangePicker,
  DateSegment,
  DialogTrigger,
  Disclosure,
  DisclosureGroup,
  DisclosurePanel,
  DropZone,
  FieldError,
  FileTrigger,
  Form,
  GridList,
  GridListItem,
  Group,
  Heading,
  Input,
  Keyboard,
  Label,
  Link,
  ListBox,
  ListBoxItem,
  Menu,
  MenuItem,
  MenuTrigger,
  Popover,
  RangeCalendar,
  SearchField,
  Separator,
  SliderOutput,
  SliderTrack,
  Text,
  TextField,
} from "react-aria-components";
import { Check, ChevronDown, ChevronLeft, ChevronRight, Minus } from "lucide-react";
import type { StoryRender } from "./type";

/**
 * Preview stories for react-aria-components: each documented component in its
 * documented composition — the components and props the installed package's
 * types define — styled through Col's theme tokens with realistic content.
 * Sample strings replace display text where a caller relabels the render, and
 * overlay surfaces (menus, popovers, date pickers) render open so a screenshot
 * captures the interesting surface, not just the trigger.
 */

const AutocompleteStory: StoryRender = ({ sample }) => (
  <div className="w-full max-w-sm">
    <Autocomplete
      filter={(textValue, inputValue) => textValue.toLowerCase().includes(inputValue.toLowerCase())}
    >
      <SearchField aria-label="Search projects" className="mb-2">
        <Input
          placeholder={sample.placeholder ?? "Search projects"}
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground"
        />
      </SearchField>
      <Menu aria-label="Project suggestions" className="rounded-md border border-border bg-card p-1 text-foreground">
        <MenuItem id="atlas" className="rounded-sm px-3 py-2 text-sm data-[hovered]:bg-secondary data-[focused]:bg-secondary">
          <Text slot="label">Atlas Redesign</Text>
          <Text slot="description" className="text-muted-foreground">Marketing site rebuild</Text>
        </MenuItem>
        <MenuItem id="harbor" className="rounded-sm px-3 py-2 text-sm data-[hovered]:bg-secondary data-[focused]:bg-secondary">
          <Text slot="label">Harbor Analytics</Text>
          <Text slot="description" className="text-muted-foreground">Usage dashboards</Text>
        </MenuItem>
        <MenuItem id="ledger" className="rounded-sm px-3 py-2 text-sm data-[hovered]:bg-secondary data-[focused]:bg-secondary">
          <Text slot="label">Ledger Invoicing</Text>
          <Text slot="description" className="text-muted-foreground">Billing portal</Text>
        </MenuItem>
      </Menu>
    </Autocomplete>
  </div>
);

const BreadcrumbsStory: StoryRender = ({ sample }) => (
  <Breadcrumbs aria-label="Breadcrumb" className="w-full max-w-md">
    <Breadcrumb
      id="workspace"
      className={({ isCurrent }) => (isCurrent ? "text-sm font-medium text-foreground" : "text-sm text-muted-foreground")}
    >
      <Link href="https://col.dev/workspace" className="underline-offset-4 data-[hovered]:underline">
        Workspace
      </Link>
    </Breadcrumb>
    <Breadcrumb
      id="atlas"
      className={({ isCurrent }) => (isCurrent ? "text-sm font-medium text-foreground" : "text-sm text-muted-foreground")}
    >
      <Link href="https://col.dev/workspace/atlas" className="underline-offset-4 data-[hovered]:underline">
        Atlas Redesign
      </Link>
    </Breadcrumb>
    <Breadcrumb
      id="deployments"
      className={({ isCurrent }) => (isCurrent ? "text-sm font-medium text-foreground" : "text-sm text-muted-foreground")}
    >
      {sample.current ?? "Deployments"}
    </Breadcrumb>
  </Breadcrumbs>
);

const ButtonStory: StoryRender = ({ sample }) => (
  <div className="flex flex-wrap items-center justify-center gap-3">
    <Button className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">
      {sample.primaryLabel ?? "Start free trial"}
    </Button>
    <Button className="rounded-md border border-border px-4 py-2 text-sm text-foreground">
      {sample.secondaryLabel ?? "View the docs"}
    </Button>
  </div>
);

const CalendarStory: StoryRender = ({ sample }) => (
  <div className="w-full max-w-xs">
    <p className="mb-2 text-sm font-medium">{sample.label ?? "Launch date"}</p>
    <Calendar defaultValue={parseDate("2026-10-14")} aria-label="Launch date" className="rounded-md border border-border p-4">
      <header className="flex items-center justify-between pb-3">
        <Button slot="previous" aria-label="Previous month" className="rounded-md p-1 text-muted-foreground">
          <ChevronLeft className="size-4" />
        </Button>
        <CalendarHeading className="text-sm font-medium" />
        <Button slot="next" aria-label="Next month" className="rounded-md p-1 text-muted-foreground">
          <ChevronRight className="size-4" />
        </Button>
      </header>
      <CalendarGrid weekdayStyle="short" className="border-separate border-spacing-1">
        <CalendarGridHeader>
          {(day) => <CalendarHeaderCell className="pb-1 text-xs text-muted-foreground">{day}</CalendarHeaderCell>}
        </CalendarGridHeader>
        <CalendarGridBody>
          {(date) => (
            <CalendarCell
              date={date}
              className={({ isSelected, isDisabled, isToday, isOutsideMonth }) =>
                [
                  "flex size-8 items-center justify-center rounded-full text-sm",
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : isDisabled || isOutsideMonth
                      ? "text-muted-foreground"
                      : isToday
                        ? "border border-border text-foreground"
                        : "text-foreground",
                ].join(" ")
              }
            />
          )}
        </CalendarGridBody>
      </CalendarGrid>
    </Calendar>
  </div>
);

// The documented checkbox is CheckboxField + CheckboxButton; the composite
// Checkbox in the installed types is the deprecated legacy form.
const CheckboxIndicator = ({ isSelected, isIndeterminate }: { isSelected: boolean; isIndeterminate: boolean }) => (
  <span
    className={[
      "flex size-5 items-center justify-center rounded-[4px] border",
      isSelected || isIndeterminate ? "border-primary bg-primary" : "border-border",
    ].join(" ")}
  >
    {isIndeterminate ? (
      <Minus className="size-3.5 text-primary-foreground" aria-hidden />
    ) : isSelected ? (
      <Check className="size-3.5 text-primary-foreground" aria-hidden />
    ) : null}
  </span>
);

const CheckboxStory: StoryRender = ({ sample }) => (
  <div className="grid w-full max-w-sm gap-4">
    <CheckboxField defaultSelected className="grid gap-1">
      <CheckboxButton className="flex items-center gap-3 text-sm text-foreground">
        {({ isSelected, isIndeterminate }) => (
          <>
            <CheckboxIndicator isSelected={isSelected} isIndeterminate={isIndeterminate} />
            {sample.label ?? "Email me when a production deploy fails"}
          </>
        )}
      </CheckboxButton>
    </CheckboxField>
    <CheckboxField defaultSelected className="grid gap-1">
      <CheckboxButton className="flex items-center gap-3 text-sm text-foreground">
        {({ isSelected, isIndeterminate }) => (
          <>
            <CheckboxIndicator isSelected={isSelected} isIndeterminate={isIndeterminate} />
            Weekly usage summary
          </>
        )}
      </CheckboxButton>
    </CheckboxField>
    <CheckboxField className="grid gap-1">
      <CheckboxButton className="flex items-center gap-3 text-sm text-foreground">
        {({ isSelected, isIndeterminate }) => (
          <>
            <CheckboxIndicator isSelected={isSelected} isIndeterminate={isIndeterminate} />
            Product announcements from the Col team
          </>
        )}
      </CheckboxButton>
    </CheckboxField>
  </div>
);

const CheckboxGroupStory: StoryRender = ({ sample }) => (
  <CheckboxGroup defaultValue={["product", "security"]} className="grid w-full max-w-sm gap-4">
    <Label className="text-sm font-medium">{sample.label ?? "Notify me about"}</Label>
    <CheckboxField value="product" className="grid gap-1">
      <CheckboxButton className="flex items-center gap-3 text-sm text-foreground">
        {({ isSelected, isIndeterminate }) => (
          <>
            <CheckboxIndicator isSelected={isSelected} isIndeterminate={isIndeterminate} />
            Product updates
          </>
        )}
      </CheckboxButton>
      <Text slot="description" className="pl-8 text-sm text-muted-foreground">
        New features and improvements.
      </Text>
    </CheckboxField>
    <CheckboxField value="security" className="grid gap-1">
      <CheckboxButton className="flex items-center gap-3 text-sm text-foreground">
        {({ isSelected, isIndeterminate }) => (
          <>
            <CheckboxIndicator isSelected={isSelected} isIndeterminate={isIndeterminate} />
            Security alerts
          </>
        )}
      </CheckboxButton>
      <Text slot="description" className="pl-8 text-sm text-muted-foreground">
        Sign-ins and account safety.
      </Text>
    </CheckboxField>
    <CheckboxField value="billing" className="grid gap-1">
      <CheckboxButton className="flex items-center gap-3 text-sm text-foreground">
        {({ isSelected, isIndeterminate }) => (
          <>
            <CheckboxIndicator isSelected={isSelected} isIndeterminate={isIndeterminate} />
            Billing receipts
          </>
        )}
      </CheckboxButton>
      <Text slot="description" className="pl-8 text-sm text-muted-foreground">
        Invoices and plan changes.
      </Text>
    </CheckboxField>
  </CheckboxGroup>
);

const ColorAreaStory: StoryRender = ({ sample }) => (
  <div className="flex items-center gap-5">
    <ColorArea
      aria-label="Saturation and brightness"
      colorSpace="hsb"
      xChannel="saturation"
      yChannel="brightness"
      defaultValue={sample.value ?? "#7C3AED"}
      className="size-40 rounded-md border border-border"
    />
    <div>
      <p className="text-sm font-medium">{sample.label ?? "Brand color"}</p>
      <p className="text-sm text-muted-foreground">{sample.value ?? "#7C3AED"}</p>
    </div>
  </div>
);

const ColorFieldStory: StoryRender = ({ sample }) => (
  <ColorField defaultValue="#7C3AED" className="grid w-full max-w-xs gap-1.5">
    <Label className="text-sm font-medium">{sample.label ?? "Brand color"}</Label>
    <Input className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground" />
    <Text slot="description" className="text-sm text-muted-foreground">
      Used for links and primary buttons.
    </Text>
  </ColorField>
);

const ColorPickerStory: StoryRender = ({ sample }) => (
  <ColorPicker defaultValue="hsb(262, 76%, 93%)">
    <DialogTrigger defaultOpen>
      <Button className="flex items-center gap-2 rounded-md px-1 py-1 text-sm text-foreground">
        <ColorSwatch className="size-6 rounded-md border border-border" />
        {sample.label ?? "Brand color"}
      </Button>
      <Popover className="w-56 rounded-md border border-border bg-popover p-4 text-popover-foreground">
        <div className="grid gap-3">
          <ColorArea
            aria-label="Saturation and brightness"
            colorSpace="hsb"
            xChannel="saturation"
            yChannel="brightness"
            className="h-32 w-full rounded-md border border-border"
          />
          <ColorSlider channel="hue" className="grid gap-1.5">
            <Label className="text-xs text-muted-foreground">Hue</Label>
            <SliderTrack className="h-4 rounded-md">
              <ColorThumb className="size-4 rounded-full border-2 border-white" />
            </SliderTrack>
          </ColorSlider>
          <ColorField className="grid gap-1.5">
            <Label className="text-xs text-muted-foreground">Hex</Label>
            <Input className="rounded-md border border-border bg-background px-2 py-1 text-sm text-foreground" />
          </ColorField>
        </div>
      </Popover>
    </DialogTrigger>
  </ColorPicker>
);

const ColorSliderStory: StoryRender = ({ sample }) => (
  <div className="w-full max-w-xs">
    <ColorSlider channel="hue" defaultValue="hsl(262, 83%, 58%)" className="grid gap-1.5">
      <div className="flex items-baseline justify-between">
        <Label className="text-sm font-medium">{sample.label ?? "Hue"}</Label>
        <SliderOutput className="text-sm text-muted-foreground" />
      </div>
      <SliderTrack className="h-4 rounded-md">
        <ColorThumb className="size-4 rounded-full border-2 border-white" />
      </SliderTrack>
    </ColorSlider>
  </div>
);

const ColorSwatchStory: StoryRender = ({ sample }) => (
  <div className="flex items-center gap-4">
    <ColorSwatch
      color={sample.value ?? "#7C3AED"}
      colorName={sample.label ?? "Signature Violet"}
      className="size-14 rounded-md border border-border"
    />
    <div>
      <p className="text-sm font-medium">{sample.label ?? "Signature Violet"}</p>
      <p className="text-sm text-muted-foreground">{sample.value ?? "#7C3AED"}</p>
    </div>
  </div>
);

const ColorSwatchPickerStory: StoryRender = ({ sample }) => (
  <div className="grid gap-3">
    <p className="text-sm font-medium">{sample.label ?? "Accent"}</p>
    <ColorSwatchPicker aria-label="Accent color" defaultValue="#7C3AED" className="flex gap-2">
      {["#7C3AED", "#2563EB", "#059669", "#D97706", "#DC2626"].map((color) => (
        <ColorSwatchPickerItem
          key={color}
          color={color}
          className={({ isSelected }) =>
            [
              "size-10 rounded-md border",
              isSelected ? "border-2 border-white" : "border-border",
            ].join(" ")
          }
        />
      ))}
    </ColorSwatchPicker>
  </div>
);

const ColorWheelStory: StoryRender = ({ sample }) => (
  <div className="flex items-center gap-6">
    <ColorWheel
      aria-label="Hue"
      defaultValue="hsl(262, 83%, 58%)"
      outerRadius={90}
      innerRadius={66}
      className="rounded-full"
    >
      <ColorWheelTrack className="rounded-full" />
      <ColorThumb className="size-4 rounded-full border-2 border-white" />
    </ColorWheel>
    <div>
      <p className="text-sm font-medium">{sample.label ?? "Hue"}</p>
      <p className="text-sm text-muted-foreground">262°</p>
    </div>
  </div>
);

const ComboBoxStory: StoryRender = ({ sample }) => (
  <ComboBox menuTrigger="focus" defaultValue="priya" className="grid w-full max-w-xs gap-1.5">
    <Label className="text-sm font-medium">{sample.label ?? "Assignee"}</Label>
    <Group className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2">
      <Input
        autoFocus
        className="min-w-0 flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground"
      />
      <Button aria-label="Show all assignees" className="shrink-0 text-muted-foreground">
        <ChevronDown className="size-4" />
      </Button>
    </Group>
    <Popover className="min-w-[15rem] rounded-md border border-border bg-popover p-1 text-popover-foreground">
      <ListBox className="outline-none">
        <ListBoxItem id="priya" textValue="Priya Raman" className="grid gap-0.5 rounded-sm px-3 py-2 data-[hovered]:bg-secondary data-[focused]:bg-secondary">
          <Text slot="label" className="text-sm">
            Priya Raman
          </Text>
          <Text slot="description" className="text-sm text-muted-foreground">
            Platform lead
          </Text>
        </ListBoxItem>
        <ListBoxItem id="jonas" textValue="Jonas Weber" className="grid gap-0.5 rounded-sm px-3 py-2 data-[hovered]:bg-secondary data-[focused]:bg-secondary">
          <Text slot="label" className="text-sm">
            Jonas Weber
          </Text>
          <Text slot="description" className="text-sm text-muted-foreground">
            Design systems
          </Text>
        </ListBoxItem>
        <ListBoxItem id="lucia" textValue="Lucía Fernández" className="grid gap-0.5 rounded-sm px-3 py-2 data-[hovered]:bg-secondary data-[focused]:bg-secondary">
          <Text slot="label" className="text-sm">
            Lucía Fernández
          </Text>
          <Text slot="description" className="text-sm text-muted-foreground">
            Growth engineering
          </Text>
        </ListBoxItem>
      </ListBox>
    </Popover>
  </ComboBox>
);

const DateFieldStory: StoryRender = ({ sample }) => (
  <DateField defaultValue={parseDate("2026-10-10")} className="grid w-full max-w-xs gap-1.5">
    <Label className="text-sm font-medium">{sample.label ?? "Invoice date"}</Label>
    <DateInput className="flex rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground">
      {(segment) => (
        <DateSegment
          segment={segment}
          className={({ isPlaceholder }) => (isPlaceholder ? "text-muted-foreground" : "text-foreground")}
        />
      )}
    </DateInput>
  </DateField>
);

const DatePickerStory: StoryRender = ({ sample }) => (
  <DatePicker defaultValue={parseDate("2026-11-18")} defaultOpen className="grid w-full max-w-xs gap-1.5">
    <Label className="text-sm font-medium">{sample.label ?? "Delivery date"}</Label>
    <Group className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2">
      <DateInput className="flex flex-1 text-sm text-foreground">
        {(segment) => (
          <DateSegment
            segment={segment}
            className={({ isPlaceholder }) => (isPlaceholder ? "text-muted-foreground" : "text-foreground")}
          />
        )}
      </DateInput>
      <Button aria-label="Open calendar" className="shrink-0 text-muted-foreground">
        <ChevronDown className="size-4" />
      </Button>
    </Group>
    <Popover className="rounded-md border border-border bg-popover p-4 text-popover-foreground">
      <Calendar aria-label="Delivery date" className="w-64">
        <header className="flex items-center justify-between pb-3">
          <Button slot="previous" aria-label="Previous month" className="rounded-md p-1 text-muted-foreground">
            <ChevronLeft className="size-4" />
          </Button>
          <CalendarHeading className="text-sm font-medium" />
          <Button slot="next" aria-label="Next month" className="rounded-md p-1 text-muted-foreground">
            <ChevronRight className="size-4" />
          </Button>
        </header>
        <CalendarGrid weekdayStyle="short" className="border-separate border-spacing-1">
          <CalendarGridHeader>
            {(day) => <CalendarHeaderCell className="pb-1 text-xs text-muted-foreground">{day}</CalendarHeaderCell>}
          </CalendarGridHeader>
          <CalendarGridBody>
            {(date) => (
              <CalendarCell
                date={date}
                className={({ isSelected, isDisabled, isToday, isOutsideMonth }) =>
                  [
                    "flex size-8 items-center justify-center rounded-full text-sm",
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : isDisabled || isOutsideMonth
                        ? "text-muted-foreground"
                        : isToday
                          ? "border border-border text-foreground"
                          : "text-foreground",
                  ].join(" ")
                }
              />
            )}
          </CalendarGridBody>
        </CalendarGrid>
      </Calendar>
    </Popover>
  </DatePicker>
);

const DateRangePickerStory: StoryRender = ({ sample }) => (
  <DateRangePicker
    defaultValue={{ start: parseDate("2026-11-03"), end: parseDate("2026-11-12") }}
    defaultOpen
    className="grid w-full max-w-xs gap-1.5"
  >
    <Label className="text-sm font-medium">{sample.label ?? "Campaign dates"}</Label>
    <Group className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2">
      <div className="flex flex-1 items-center text-sm text-foreground">
        <DateInput slot="start" className="flex">
          {(segment) => (
            <DateSegment
              segment={segment}
              className={({ isPlaceholder }) => (isPlaceholder ? "text-muted-foreground" : "text-foreground")}
            />
          )}
        </DateInput>
        <span aria-hidden="true" className="px-1 text-muted-foreground">
          –
        </span>
        <DateInput slot="end" className="flex">
          {(segment) => (
            <DateSegment
              segment={segment}
              className={({ isPlaceholder }) => (isPlaceholder ? "text-muted-foreground" : "text-foreground")}
            />
          )}
        </DateInput>
      </div>
      <Button aria-label="Open calendar" className="shrink-0 text-muted-foreground">
        <ChevronDown className="size-4" />
      </Button>
    </Group>
    <Popover className="rounded-md border border-border bg-popover p-4 text-popover-foreground">
      <RangeCalendar aria-label="Campaign dates" className="w-64">
        <header className="flex items-center justify-between pb-3">
          <Button slot="previous" aria-label="Previous month" className="rounded-md p-1 text-muted-foreground">
            <ChevronLeft className="size-4" />
          </Button>
          <CalendarHeading className="text-sm font-medium" />
          <Button slot="next" aria-label="Next month" className="rounded-md p-1 text-muted-foreground">
            <ChevronRight className="size-4" />
          </Button>
        </header>
        <CalendarGrid weekdayStyle="short" className="border-separate border-spacing-1">
          <CalendarGridHeader>
            {(day) => <CalendarHeaderCell className="pb-1 text-xs text-muted-foreground">{day}</CalendarHeaderCell>}
          </CalendarGridHeader>
          <CalendarGridBody>
            {(date) => (
              <CalendarCell
                date={date}
                className={({ isSelected, isSelectionStart, isSelectionEnd, isDisabled, isOutsideMonth }) =>
                  [
                    "flex size-8 items-center justify-center rounded-full text-sm",
                    isSelected && (isSelectionStart || isSelectionEnd)
                      ? "bg-primary text-primary-foreground"
                      : isSelected
                        ? "bg-secondary text-foreground"
                        : isDisabled || isOutsideMonth
                          ? "text-muted-foreground"
                          : "text-foreground",
                  ].join(" ")
                }
              />
            )}
          </CalendarGridBody>
        </CalendarGrid>
      </RangeCalendar>
    </Popover>
  </DateRangePicker>
);

const DisclosureStory: StoryRender = ({ sample }) => (
  <Disclosure defaultExpanded className="group w-full max-w-md">
    <Heading>
      <Button slot="trigger" className="flex w-full items-center gap-2 py-3 text-left text-sm font-medium text-foreground">
        <ChevronRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[expanded]:rotate-90" />
        {sample.title ?? "What's included in the free trial?"}
      </Button>
    </Heading>
    <DisclosurePanel className="pb-4 pl-6 text-sm text-muted-foreground">
      Fourteen days of the full component set, one project, and the preview MCP. No card required, and nothing is
      deleted when the trial ends.
    </DisclosurePanel>
  </Disclosure>
);

const DisclosureGroupStory: StoryRender = ({ sample }) => (
  <DisclosureGroup defaultExpandedKeys={["shipping"]} className="w-full max-w-md">
    <Disclosure id="shipping" className="group border-b border-border">
      <Heading>
        <Button slot="trigger" className="flex w-full items-center gap-2 py-4 text-left text-sm font-medium text-foreground">
          <ChevronRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[expanded]:rotate-90" />
          {sample.title ?? "How does shipping work?"}
        </Button>
      </Heading>
      <DisclosurePanel className="pb-4 pl-6 text-sm text-muted-foreground">
        Orders placed before 3pm ship the same day. Standard delivery takes three to five business days across the
        continental US.
      </DisclosurePanel>
    </Disclosure>
    <Disclosure id="returns" className="group border-b border-border">
      <Heading>
        <Button slot="trigger" className="flex w-full items-center gap-2 py-4 text-left text-sm font-medium text-foreground">
          <ChevronRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[expanded]:rotate-90" />
          What is the return window?
        </Button>
      </Heading>
      <DisclosurePanel className="pb-4 pl-6 text-sm text-muted-foreground">
        Thirty days from delivery, in original packaging. Return labels are free for damaged or incorrect items.
      </DisclosurePanel>
    </Disclosure>
    <Disclosure id="warranty" className="group border-b border-border">
      <Heading>
        <Button slot="trigger" className="flex w-full items-center gap-2 py-4 text-left text-sm font-medium text-foreground">
          <ChevronRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[expanded]:rotate-90" />
          Is there a warranty?
        </Button>
      </Heading>
      <DisclosurePanel className="pb-4 pl-6 text-sm text-muted-foreground">
        Every desk ships with a five-year warranty covering frame, joints, and the lift mechanism.
      </DisclosurePanel>
    </Disclosure>
  </DisclosureGroup>
);

const DropZoneStory: StoryRender = ({ sample }) => (
  <DropZone className="flex w-full max-w-md flex-col items-center gap-3 rounded-xl border border-dashed border-border p-8 text-center">
    <Text slot="label" className="text-sm text-muted-foreground">
      {sample.label ?? "Drop your logo here, or browse"}
    </Text>
    <FileTrigger acceptedFileTypes={["image/png", "image/jpeg"]} onSelect={() => {}}>
      <Button className="rounded-md border border-border px-4 py-2 text-sm text-foreground">Browse files</Button>
    </FileTrigger>
  </DropZone>
);

const FileTriggerStory: StoryRender = ({ sample }) => (
  <div className="flex flex-wrap items-center gap-3">
    <FileTrigger acceptedFileTypes={["image/*"]} onSelect={() => {}}>
      <Button className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">
        {sample.label ?? "Upload cover image"}
      </Button>
    </FileTrigger>
    <p className="text-sm text-muted-foreground">PNG or JPG, up to 5 MB.</p>
  </div>
);

const FormStory: StoryRender = ({ sample }) => (
  <Form
    validationErrors={{ email: "Enter a valid work email address." }}
    className="grid w-full max-w-sm gap-4"
  >
    <TextField name="email" isRequired type="email" className="grid gap-1.5">
      <Label className="text-sm font-medium">{sample.label ?? "Work email"}</Label>
      <Input
        defaultValue="amara@northwind"
        className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground"
      />
      <FieldError className="text-sm text-destructive" />
    </TextField>
    <Button
      type="submit"
      className="w-fit rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground"
    >
      {sample.submitLabel ?? "Create workspace"}
    </Button>
  </Form>
);

const GridListStory: StoryRender = ({ sample }) => (
  <GridList
    aria-label="Recent deployments"
    selectionMode="multiple"
    defaultSelectedKeys={["atlas-482"]}
    className="w-full rounded-md border border-border"
  >
    <GridListItem
      id="atlas-482"
      textValue="Atlas Redesign, production, live"
      className="flex items-center justify-between gap-4 border-b border-border px-4 py-3 data-[selected]:bg-secondary"
    >
      <div>
        <p className="text-sm font-medium">{sample.name1 ?? "Atlas Redesign"}</p>
        <p className="text-sm text-muted-foreground">production · 4f2c1ab</p>
      </div>
      <span className="text-sm text-muted-foreground">Live</span>
    </GridListItem>
    <GridListItem
      id="harbor-479"
      textValue="Harbor Analytics, staging, building"
      className="flex items-center justify-between gap-4 border-b border-border px-4 py-3 data-[selected]:bg-secondary"
    >
      <div>
        <p className="text-sm font-medium">Harbor Analytics</p>
        <p className="text-sm text-muted-foreground">staging · 91d7e30</p>
      </div>
      <span className="text-sm text-muted-foreground">Building</span>
    </GridListItem>
    <GridListItem
      id="ledger-475"
      textValue="Ledger Invoicing, production, live"
      className="flex items-center justify-between gap-4 border-b border-border px-4 py-3 data-[selected]:bg-secondary"
    >
      <div>
        <p className="text-sm font-medium">Ledger Invoicing</p>
        <p className="text-sm text-muted-foreground">production · c08b521</p>
      </div>
      <span className="text-sm text-muted-foreground">Live</span>
    </GridListItem>
    <GridListItem
      id="northwind-471"
      textValue="Northwind Docs, preview, rolled back"
      className="flex items-center justify-between gap-4 px-4 py-3 data-[selected]:bg-secondary"
    >
      <div>
        <p className="text-sm font-medium">Northwind Docs</p>
        <p className="text-sm text-muted-foreground">preview · e77a9d4</p>
      </div>
      <span className="text-sm text-muted-foreground">Rolled back</span>
    </GridListItem>
  </GridList>
);

const GroupStory: StoryRender = ({ sample }) => (
  <div className="grid w-full max-w-xs gap-2">
    <Label htmlFor="seats-input" className="text-sm font-medium">
      {sample.label ?? "Team seats"}
    </Label>
    <Group aria-label="Seat quantity" className="flex w-fit items-center gap-1 rounded-md border border-border px-2 py-1">
      <Button aria-label="Remove a seat" className="size-8 text-sm text-muted-foreground">
        −
      </Button>
      <Input
        id="seats-input"
        defaultValue="5"
        className="w-12 bg-transparent text-center text-sm text-foreground"
      />
      <Button aria-label="Add a seat" className="size-8 text-sm text-muted-foreground">
        +
      </Button>
    </Group>
    <p className="text-sm text-muted-foreground">$24 per seat, billed monthly.</p>
  </div>
);

const LinkStory: StoryRender = ({ sample }) => (
  <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
    <Link href="https://col.dev/pricing" className="text-foreground underline underline-offset-4">
      {sample.primaryLabel ?? "See pricing"}
    </Link>
    <Link href="https://col.dev/docs" className="text-muted-foreground underline-offset-4 data-[hovered]:underline">
      {sample.secondaryLabel ?? "Read the docs"}
    </Link>
    <Link href="https://col.dev/changelog" className="text-muted-foreground underline-offset-4 data-[hovered]:underline">
      Changelog
    </Link>
  </div>
);

const ListBoxStory: StoryRender = ({ sample }) => (
  <ListBox
    aria-label="Team members"
    selectionMode="single"
    defaultSelectedKeys={["amara"]}
    className="w-full rounded-md border border-border"
  >
    <ListBoxItem
      id="amara"
      textValue="Amara Koll, Platform lead"
      className="flex items-center justify-between gap-4 border-b border-border px-4 py-3 data-[selected]:bg-secondary data-[hovered]:bg-secondary"
    >
      <div>
        <p className="text-sm font-medium">{sample.name1 ?? "Amara Koll"}</p>
        <p className="text-sm text-muted-foreground">Platform lead</p>
      </div>
      <span className="text-sm text-muted-foreground">On call</span>
    </ListBoxItem>
    <ListBoxItem
      id="jonas"
      textValue="Jonas Weber, Design systems"
      className="flex items-center justify-between gap-4 border-b border-border px-4 py-3 data-[selected]:bg-secondary data-[hovered]:bg-secondary"
    >
      <div>
        <p className="text-sm font-medium">Jonas Weber</p>
        <p className="text-sm text-muted-foreground">Design systems</p>
      </div>
      <span className="text-sm text-muted-foreground">Away</span>
    </ListBoxItem>
    <ListBoxItem
      id="lucia"
      textValue="Lucía Fernández, Growth engineering"
      className="flex items-center justify-between gap-4 px-4 py-3 data-[selected]:bg-secondary data-[hovered]:bg-secondary"
    >
      <div>
        <p className="text-sm font-medium">Lucía Fernández</p>
        <p className="text-sm text-muted-foreground">Growth engineering</p>
      </div>
      <span className="text-sm text-muted-foreground">On call</span>
    </ListBoxItem>
  </ListBox>
);

const MenuStory: StoryRender = ({ sample }) => (
  <MenuTrigger defaultOpen>
    <Button className="rounded-md border border-border px-4 py-2 text-sm text-foreground">
      {sample.triggerLabel ?? "Options"}
    </Button>
    <Popover className="min-w-[180px] rounded-md border border-border bg-popover p-1 text-popover-foreground">
      <Menu aria-label="Project actions" className="outline-none">
        <MenuItem id="duplicate" className="flex items-center justify-between gap-6 rounded-sm px-2 py-1.5 text-sm data-[hovered]:bg-secondary data-[focused]:bg-secondary">
          <Text slot="label">Duplicate</Text>
          <Keyboard className="text-xs text-muted-foreground">⌘D</Keyboard>
        </MenuItem>
        <MenuItem id="archive" className="flex items-center justify-between gap-6 rounded-sm px-2 py-1.5 text-sm data-[hovered]:bg-secondary data-[focused]:bg-secondary">
          <Text slot="label">Archive</Text>
          <Keyboard className="text-xs text-muted-foreground">⌘A</Keyboard>
        </MenuItem>
        <MenuItem id="export" className="flex items-center justify-between gap-6 rounded-sm px-2 py-1.5 text-sm data-[hovered]:bg-secondary data-[focused]:bg-secondary">
          <Text slot="label">Export CSV</Text>
          <Keyboard className="text-xs text-muted-foreground">⌘E</Keyboard>
        </MenuItem>
        <Separator className="my-1 h-px bg-border" />
        <MenuItem id="delete" className="flex items-center justify-between gap-6 rounded-sm px-2 py-1.5 text-sm text-destructive data-[hovered]:bg-secondary data-[focused]:bg-secondary">
          <Text slot="label">Delete project</Text>
          <Keyboard className="text-xs text-muted-foreground">⌘⌫</Keyboard>
        </MenuItem>
      </Menu>
    </Popover>
  </MenuTrigger>
);

export const storyRenders: Record<string, StoryRender> = {
  "react-aria/Autocomplete": AutocompleteStory,
  "react-aria/Breadcrumbs": BreadcrumbsStory,
  "react-aria/Button": ButtonStory,
  "react-aria/Calendar": CalendarStory,
  "react-aria/Checkbox": CheckboxStory,
  "react-aria/CheckboxGroup": CheckboxGroupStory,
  "react-aria/ColorArea": ColorAreaStory,
  "react-aria/ColorField": ColorFieldStory,
  "react-aria/ColorPicker": ColorPickerStory,
  "react-aria/ColorSlider": ColorSliderStory,
  "react-aria/ColorSwatch": ColorSwatchStory,
  "react-aria/ColorSwatchPicker": ColorSwatchPickerStory,
  "react-aria/ColorWheel": ColorWheelStory,
  "react-aria/ComboBox": ComboBoxStory,
  "react-aria/DateField": DateFieldStory,
  "react-aria/DatePicker": DatePickerStory,
  "react-aria/DateRangePicker": DateRangePickerStory,
  "react-aria/Disclosure": DisclosureStory,
  "react-aria/DisclosureGroup": DisclosureGroupStory,
  "react-aria/DropZone": DropZoneStory,
  "react-aria/FileTrigger": FileTriggerStory,
  "react-aria/Form": FormStory,
  "react-aria/GridList": GridListStory,
  "react-aria/Group": GroupStory,
  "react-aria/Link": LinkStory,
  "react-aria/ListBox": ListBoxStory,
  "react-aria/Menu": MenuStory,
};
