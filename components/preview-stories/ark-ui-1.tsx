import { Accordion } from "@ark-ui/react/accordion";
import { AngleSlider } from "@ark-ui/react/angle-slider";
import { Avatar } from "@ark-ui/react/avatar";
import { Carousel } from "@ark-ui/react/carousel";
import { Checkbox } from "@ark-ui/react/checkbox";
import { Clipboard } from "@ark-ui/react/clipboard";
import { Collapsible } from "@ark-ui/react/collapsible";
import { ColorPicker, parseColor } from "@ark-ui/react/color-picker";
import { createListCollection } from "@ark-ui/react/collection";
import { Combobox } from "@ark-ui/react/combobox";
import { DateInput } from "@ark-ui/react/date-input";
import { DatePicker, parseDate } from "@ark-ui/react/date-picker";
import { Dialog } from "@ark-ui/react/dialog";
import { Drawer } from "@ark-ui/react/drawer";
import { Editable } from "@ark-ui/react/editable";
import { Field } from "@ark-ui/react/field";
import { Fieldset } from "@ark-ui/react/fieldset";
import { FileUpload } from "@ark-ui/react/file-upload";
import { FloatingPanel } from "@ark-ui/react/floating-panel";
import { HoverCard } from "@ark-ui/react/hover-card";
import { ImageCropper } from "@ark-ui/react/image-cropper";
import { Listbox } from "@ark-ui/react/listbox";
import { Marquee } from "@ark-ui/react/marquee";
import { Menu } from "@ark-ui/react/menu";
import { NavigationMenu } from "@ark-ui/react/navigation-menu";
import { NumberInput } from "@ark-ui/react/number-input";
import { Pagination } from "@ark-ui/react/pagination";
import { Check, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Maximize2, Pipette, X } from "lucide-react";
import type { StoryRender } from "./type";

/**
 * Preview stories for ark-ui: each documented component composed with the real
 * subcomponents the package ships, rendered with realistic content and Col's
 * theme tokens. Overlay components render open by default so a screenshot
 * shows the surface, not just the trigger. Sample strings replace display text
 * where a caller labels the render.
 */

const teammates = [
  { label: "Amara Koll", value: "amara" },
  { label: "Diego Ferreira", value: "diego" },
  { label: "Priya Raghavan", value: "priya" },
  { label: "Sam Okafor", value: "sam" },
];

const assignees = createListCollection({
  items: teammates,
  itemToString: (item) => item.label,
});

const members = createListCollection({
  items: teammates,
  itemToString: (item) => item.label,
});

const brandSwatches = ["#6d28d9", "#0ea5e9", "#059669", "#d97706", "#dc2626"];

const customerNames = ["Northwind Labs", "Acme Robotics", "Bluefin Health", "Cedar Financial", "Orbit Education", "Halden Systems"];

const seededUploads = [
  new File([new Uint8Array(2_480_000)], "brand-assets.zip", { type: "application/zip" }),
  new File([new Uint8Array(384_000)], "q3-invoice-report.pdf", { type: "application/pdf" }),
];

const AccordionStory: StoryRender = ({ sample }) => (
  <Accordion.Root defaultValue={["team-plan"]} collapsible className="w-full max-w-xl">
    <Accordion.Item value="team-plan" className="border-b border-border">
      <Accordion.ItemTrigger className="flex w-full items-center justify-between py-4 text-left text-sm font-medium">
        {sample.question1 ?? "How does the team plan work?"}
        <Accordion.ItemIndicator className="text-muted-foreground transition-transform duration-200 data-[state=open]:rotate-180">
          <ChevronDown className="size-4" />
        </Accordion.ItemIndicator>
      </Accordion.ItemTrigger>
      <Accordion.ItemContent className="pb-4 text-sm text-muted-foreground">
        Every seat includes the full component catalogue. Seats are shared across projects and can be reassigned at any time.
      </Accordion.ItemContent>
    </Accordion.Item>
    <Accordion.Item value="importing" className="border-b border-border">
      <Accordion.ItemTrigger className="flex w-full items-center justify-between py-4 text-left text-sm font-medium">
        Can I import my existing library?
        <Accordion.ItemIndicator className="text-muted-foreground transition-transform duration-200 data-[state=open]:rotate-180">
          <ChevronDown className="size-4" />
        </Accordion.ItemIndicator>
      </Accordion.ItemTrigger>
      <Accordion.ItemContent className="pb-4 text-sm text-muted-foreground">
        Yes. Point the importer at your package manifest and every documented component is matched automatically.
      </Accordion.ItemContent>
    </Accordion.Item>
    <Accordion.Item value="billing" className="border-b border-border">
      <Accordion.ItemTrigger className="flex w-full items-center justify-between py-4 text-left text-sm font-medium">
        When am I billed?
        <Accordion.ItemIndicator className="text-muted-foreground transition-transform duration-200 data-[state=open]:rotate-180">
          <ChevronDown className="size-4" />
        </Accordion.ItemIndicator>
      </Accordion.ItemTrigger>
      <Accordion.ItemContent className="pb-4 text-sm text-muted-foreground">
        Annual plans renew on March 1. Monthly plans charge the card on file at the start of each cycle.
      </Accordion.ItemContent>
    </Accordion.Item>
  </Accordion.Root>
);

const AngleSliderStory: StoryRender = ({ sample }) => (
  <AngleSlider.Root defaultValue={35}>
    <AngleSlider.Label className="text-sm font-medium">{sample.label ?? "Chart rotation"}</AngleSlider.Label>
    <AngleSlider.Control className="relative mx-auto mt-3 size-44 rounded-full border border-border bg-muted">
      <AngleSlider.MarkerGroup>
        {[0, 90, 180, 270].map((value) => (
          <AngleSlider.Marker
            key={value}
            value={value}
            className="absolute left-[calc(50%-8px)] top-0 size-4 rounded-full border border-border bg-background data-[state=at-value]:border-primary"
            style={{ transformOrigin: "50% 88px" }}
          />
        ))}
      </AngleSlider.MarkerGroup>
      <AngleSlider.Thumb
        className="absolute left-[calc(50%-8px)] top-0 size-4 rounded-full border-2 border-primary bg-background"
        style={{ transformOrigin: "50% 88px" }}
      />
    </AngleSlider.Control>
    <AngleSlider.ValueText className="mt-3 block text-center text-sm text-muted-foreground" />
    <AngleSlider.HiddenInput />
  </AngleSlider.Root>
);

const AvatarStory: StoryRender = ({ sample }) => (
  <div className="flex items-center gap-4">
    <Avatar.Root className="flex size-12 items-center justify-center overflow-hidden rounded-full bg-muted">
      <Avatar.Fallback className="text-sm font-medium text-muted-foreground">PR</Avatar.Fallback>
    </Avatar.Root>
    <div>
      <p className="text-sm font-medium">{sample.name ?? "Priya Raghavan"}</p>
      <p className="text-sm text-muted-foreground">Reviewed deploy #482 · 2 hours ago</p>
    </div>
  </div>
);

const CarouselStory: StoryRender = ({ sample }) => {
  const slides = [
    {
      title: sample.slide1 ?? "Coverage you can trust",
      body: "Every preview story maps to a verified component in the catalogue, so what you see is what ships.",
    },
    {
      title: "Scenes, not screenshots",
      body: "Components render inside realistic landing pages, dashboards, and marketing layouts.",
    },
    {
      title: "One query, any theme",
      body: "Recolour and relabel any preview in place before you commit to a library.",
    },
  ];
  return (
    <Carousel.Root slideCount={slides.length} className="w-full max-w-2xl">
      <Carousel.Control className="mb-3 flex items-center gap-2">
        <Carousel.PrevTrigger className="flex size-9 items-center justify-center rounded-md border border-border text-sm">
          <ChevronLeft className="size-4" />
        </Carousel.PrevTrigger>
        <Carousel.NextTrigger className="flex size-9 items-center justify-center rounded-md border border-border text-sm">
          <ChevronRight className="size-4" />
        </Carousel.NextTrigger>
      </Carousel.Control>
      <Carousel.ItemGroup className="overflow-hidden">
        {slides.map((slide, index) => (
          <Carousel.Item key={slide.title} index={index} className="w-full">
            <div className="rounded-xl border border-border bg-card p-6 text-card-foreground">
              <p className="text-base font-semibold">{slide.title}</p>
              <p className="mt-2 text-sm text-muted-foreground">{slide.body}</p>
            </div>
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>
      <Carousel.IndicatorGroup className="mt-3 flex items-center gap-2">
        {slides.map((slide, index) => (
          <Carousel.Indicator
            key={slide.title}
            index={index}
            className="h-1.5 w-8 rounded-full bg-muted data-[current]:bg-primary"
          />
        ))}
      </Carousel.IndicatorGroup>
    </Carousel.Root>
  );
};

const CheckboxStory: StoryRender = ({ sample }) => (
  <div className="grid gap-4">
    {[
      sample.label1 ?? "Invoice paid",
      "Payment failed",
      "Refund issued",
    ].map((label, index) => (
      <label key={label} className="flex items-center gap-3 text-sm">
        <Checkbox.Root defaultChecked={index < 2} className="group flex items-center gap-3">
          <Checkbox.Control className="flex size-5 items-center justify-center rounded-[4px] border border-border data-[state=checked]:border-primary data-[state=checked]:bg-primary">
            <Checkbox.Indicator>
              <Check className="size-3.5 text-primary-foreground" />
            </Checkbox.Indicator>
          </Checkbox.Control>
          <Checkbox.Label>{label}</Checkbox.Label>
          <Checkbox.HiddenInput />
        </Checkbox.Root>
      </label>
    ))}
  </div>
);

const ClipboardStory: StoryRender = ({ sample }) => (
  <Clipboard.Root defaultValue="npm install @ark-ui/react">
    <Clipboard.Label className="text-sm font-medium">{sample.label ?? "Add the components"}</Clipboard.Label>
    <Clipboard.Control className="mt-2 flex items-center gap-2">
      <Clipboard.Input readOnly className="w-full rounded-md border border-border bg-background px-3 py-2 font-mono text-sm" />
      <Clipboard.Trigger className="shrink-0 rounded-md border border-border px-3 py-2 text-sm">
        <Clipboard.Indicator copied="Copied">Copy</Clipboard.Indicator>
      </Clipboard.Trigger>
    </Clipboard.Control>
  </Clipboard.Root>
);

const CollapsibleStory: StoryRender = ({ sample }) => (
  <Collapsible.Root defaultOpen className="w-full max-w-md">
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-medium">{sample.title ?? "Deploy to production"}</h3>
      <Collapsible.Trigger className="flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-sm">
        Build log
        <Collapsible.Indicator className="transition-transform duration-200 data-[state=open]:rotate-180">
          <ChevronDown className="size-4" />
        </Collapsible.Indicator>
      </Collapsible.Trigger>
    </div>
    <Collapsible.Content className="mt-3 rounded-md border border-border p-4 font-mono text-xs text-muted-foreground">
      <p>✓ Compiled preview pages in 12.4s</p>
      <p>✓ Generated 214 static previews</p>
      <p>✓ Uploaded media to the CDN edge</p>
    </Collapsible.Content>
  </Collapsible.Root>
);

const ColorPickerStory: StoryRender = ({ sample }) => (
  <ColorPicker.Root defaultValue={parseColor("#6d28d9")} defaultOpen>
    <ColorPicker.Label className="text-sm font-medium">{sample.label ?? "Brand color"}</ColorPicker.Label>
    <ColorPicker.Control className="mt-2 flex items-center gap-2">
      <ColorPicker.Trigger className="flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm">
        <ColorPicker.ValueSwatch className="size-4 rounded-sm border border-border" />
        <ColorPicker.ValueText />
      </ColorPicker.Trigger>
      <ColorPicker.ChannelInput channel="hex" className="w-32 rounded-md border border-border bg-background px-3 py-2 text-sm" />
    </ColorPicker.Control>
    <ColorPicker.Positioner>
      <ColorPicker.Content className="w-72 rounded-xl border border-border bg-popover p-4 text-popover-foreground">
        <ColorPicker.Area className="h-36 w-full rounded-md">
          <ColorPicker.AreaBackground className="h-full w-full rounded-md" />
          <ColorPicker.AreaThumb className="size-4 rounded-full border-2 border-white" />
        </ColorPicker.Area>
        <ColorPicker.ChannelSlider channel="hue" className="mt-4">
          <ColorPicker.ChannelSliderLabel className="text-xs text-muted-foreground">Hue</ColorPicker.ChannelSliderLabel>
          <ColorPicker.ChannelSliderTrack className="mt-1 h-3 rounded-full">
            <ColorPicker.ChannelSliderThumb className="size-4 rounded-full border-2 border-white" />
          </ColorPicker.ChannelSliderTrack>
        </ColorPicker.ChannelSlider>
        <ColorPicker.ChannelSlider channel="alpha" className="mt-3">
          <ColorPicker.ChannelSliderLabel className="text-xs text-muted-foreground">Opacity</ColorPicker.ChannelSliderLabel>
          <ColorPicker.ChannelSliderTrack className="mt-1 h-3 rounded-full">
            <ColorPicker.ChannelSliderThumb className="size-4 rounded-full border-2 border-white" />
          </ColorPicker.ChannelSliderTrack>
        </ColorPicker.ChannelSlider>
        <ColorPicker.SwatchGroup className="mt-4 flex items-center gap-2">
          {brandSwatches.map((swatch) => (
            <ColorPicker.SwatchTrigger key={swatch} value={swatch} className="rounded-md border border-border p-1">
              <ColorPicker.Swatch value={swatch} className="size-6 rounded-sm" />
            </ColorPicker.SwatchTrigger>
          ))}
        </ColorPicker.SwatchGroup>
        <ColorPicker.EyeDropperTrigger className="mt-4 flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-sm">
          <Pipette className="size-4" />
          Pick from screen
        </ColorPicker.EyeDropperTrigger>
      </ColorPicker.Content>
    </ColorPicker.Positioner>
  </ColorPicker.Root>
);

const ComboboxStory: StoryRender = ({ sample }) => (
  <Combobox.Root collection={assignees} defaultValue={["amara"]} defaultOpen>
    <Combobox.Label className="text-sm font-medium">{sample.label ?? "Assignee"}</Combobox.Label>
    <Combobox.Control className="mt-2 flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2">
      <Combobox.Input placeholder="Search teammates" className="w-full bg-transparent text-sm outline-none" />
      <Combobox.Trigger aria-label="Toggle teammate list" className="text-muted-foreground">
        <ChevronDown className="size-4" />
      </Combobox.Trigger>
    </Combobox.Control>
    <Combobox.Positioner>
      <Combobox.Content className="min-w-[220px] rounded-md border border-border bg-popover p-1 text-popover-foreground">
        <Combobox.ItemGroup>
          <Combobox.ItemGroupLabel className="px-2 py-1.5 text-xs text-muted-foreground">Engineers</Combobox.ItemGroupLabel>
          {teammates.map((teammate) => (
            <Combobox.Item key={teammate.value} item={teammate} className="flex items-center justify-between rounded-sm px-2 py-1.5 text-sm">
              <Combobox.ItemText>{teammate.label}</Combobox.ItemText>
              <Combobox.ItemIndicator>
                <Check className="size-4" />
              </Combobox.ItemIndicator>
            </Combobox.Item>
          ))}
        </Combobox.ItemGroup>
      </Combobox.Content>
    </Combobox.Positioner>
  </Combobox.Root>
);

const DateInputStory: StoryRender = ({ sample }) => (
  // `parseDate` shares the `DateValue` type both date machines consume.
  <DateInput.Root defaultValue={[parseDate("2026-11-04")]}>
    <DateInput.Label className="text-sm font-medium">{sample.label ?? "Project due date"}</DateInput.Label>
    <DateInput.Control className="mt-2 inline-flex rounded-md border border-border bg-background px-3 py-2 text-sm">
      <DateInput.SegmentGroup>
        <DateInput.Context>
          {(api) =>
            api.getSegments().map((segment, index) => (
              <DateInput.Segment
                key={index}
                segment={segment}
                className="rounded-sm px-0.5 data-[placeholder-shown]:text-muted-foreground"
              />
            ))
          }
        </DateInput.Context>
      </DateInput.SegmentGroup>
    </DateInput.Control>
    <DateInput.HiddenInput />
  </DateInput.Root>
);

const DatePickerStory: StoryRender = ({ sample }) => (
  <DatePicker.Root defaultValue={[parseDate("2026-10-21")]} defaultOpen>
    <DatePicker.Label className="text-sm font-medium">{sample.label ?? "Deployment window"}</DatePicker.Label>
    <DatePicker.Control className="mt-2 flex items-center gap-2">
      <DatePicker.Input className="w-40 rounded-md border border-border bg-background px-3 py-2 text-sm" />
      <DatePicker.Trigger className="rounded-md border border-border px-3 py-2 text-sm">Calendar</DatePicker.Trigger>
    </DatePicker.Control>
    <DatePicker.Positioner>
      <DatePicker.Content className="rounded-xl border border-border bg-popover p-4 text-popover-foreground">
        <DatePicker.View view="day">
          <DatePicker.ViewControl className="flex items-center justify-between">
            <DatePicker.PrevTrigger className="flex size-8 items-center justify-center rounded-md border border-border">
              <ChevronLeft className="size-4" />
            </DatePicker.PrevTrigger>
            <DatePicker.ViewTrigger className="px-2 text-sm font-medium">
              <DatePicker.RangeText />
            </DatePicker.ViewTrigger>
            <DatePicker.NextTrigger className="flex size-8 items-center justify-center rounded-md border border-border">
              <ChevronRight className="size-4" />
            </DatePicker.NextTrigger>
          </DatePicker.ViewControl>
          <DatePicker.Table className="mt-3 w-full border-separate border-spacing-1">
            <DatePicker.TableHead>
              <DatePicker.TableRow>
                <DatePicker.Context>
                  {(api) =>
                    api.weekDays.map((day) => (
                      <DatePicker.TableHeader key={day.value.toString()} className="text-xs font-normal text-muted-foreground">
                        {day.narrow}
                      </DatePicker.TableHeader>
                    ))
                  }
                </DatePicker.Context>
              </DatePicker.TableRow>
            </DatePicker.TableHead>
            <DatePicker.TableBody>
              <DatePicker.Context>
                {(api) =>
                  api.weeks.map((week, weekIndex) => (
                    <DatePicker.TableRow key={weekIndex}>
                      {week.map((day) => (
                        <DatePicker.TableCell key={day.toString()} value={day} className="p-0 text-center">
                          <DatePicker.TableCellTrigger className="size-9 rounded-full text-sm data-[in-range]:bg-secondary data-[selected]:bg-primary data-[selected]:text-primary-foreground">
                            {day.day}
                          </DatePicker.TableCellTrigger>
                        </DatePicker.TableCell>
                      ))}
                    </DatePicker.TableRow>
                  ))
                }
              </DatePicker.Context>
            </DatePicker.TableBody>
          </DatePicker.Table>
        </DatePicker.View>
      </DatePicker.Content>
    </DatePicker.Positioner>
  </DatePicker.Root>
);

const DialogStory: StoryRender = ({ sample }) => (
  <Dialog.Root defaultOpen>
    <Dialog.Trigger className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">Invite teammate</Dialog.Trigger>
    <Dialog.Backdrop className="fixed inset-0 bg-black/60" />
    <Dialog.Positioner className="fixed inset-0 flex items-center justify-center p-4">
      <Dialog.Content className="w-[380px] rounded-xl border border-border bg-card p-6 text-card-foreground">
        <Dialog.Title className="text-base font-semibold">{sample.title ?? "Invite to the Col workspace"}</Dialog.Title>
        <Dialog.Description className="mt-2 text-sm text-muted-foreground">
          They receive an email with a link to join and start reviewing previews.
        </Dialog.Description>
        <input
          className="mt-4 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          defaultValue="avery@northwind.dev"
        />
        <div className="mt-6 flex justify-end gap-3">
          <Dialog.CloseTrigger className="rounded-md border border-border px-4 py-2 text-sm">Cancel</Dialog.CloseTrigger>
          <Dialog.CloseTrigger className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">Send invite</Dialog.CloseTrigger>
        </div>
      </Dialog.Content>
    </Dialog.Positioner>
  </Dialog.Root>
);

const DrawerStory: StoryRender = ({ sample }) => (
  <Drawer.Root defaultOpen>
    <Drawer.Trigger className="rounded-md border border-border px-4 py-2 text-sm">Filters</Drawer.Trigger>
    <Drawer.Backdrop className="fixed inset-0 bg-black/60" />
    <Drawer.Positioner className="fixed inset-y-0 right-0 w-80">
      <Drawer.Content className="flex h-full flex-col rounded-l-xl border border-border bg-card p-6 text-card-foreground">
        <Drawer.Grabber className="mx-auto mb-4 h-1 w-10 rounded-full bg-border" />
        <Drawer.Title className="text-base font-semibold">{sample.title ?? "Filter invoices"}</Drawer.Title>
        <Drawer.Description className="mt-2 text-sm text-muted-foreground">
          Narrow the table to the rows your team is chasing this week.
        </Drawer.Description>
        <div className="mt-6 grid gap-3 text-sm">
          <p>Overdue · 18 invoices</p>
          <p>Due this week · 24 invoices</p>
          <p>Paid · 172 invoices</p>
        </div>
        <div className="mt-auto flex justify-end gap-3">
          <Drawer.CloseTrigger className="rounded-md border border-border px-4 py-2 text-sm">Clear</Drawer.CloseTrigger>
          <Drawer.CloseTrigger className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">Apply filters</Drawer.CloseTrigger>
        </div>
        <Drawer.CloseTrigger aria-label="Close filters" className="absolute right-4 top-4 text-muted-foreground">
          <X className="size-4" />
        </Drawer.CloseTrigger>
      </Drawer.Content>
    </Drawer.Positioner>
  </Drawer.Root>
);

const EditableStory: StoryRender = ({ sample }) => (
  <Editable.Root defaultValue={sample.value ?? "Q4 payroll migration"} defaultEdit>
    <Editable.Label className="text-sm font-medium">Project name</Editable.Label>
    <Editable.Area className="mt-2">
      <Editable.Input className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm" />
      <Editable.Preview className="rounded-md px-3 py-2 text-sm" />
    </Editable.Area>
    <Editable.Control className="mt-3 flex gap-2">
      <Editable.EditTrigger className="rounded-md border border-border px-3 py-1.5 text-sm">Rename</Editable.EditTrigger>
      <Editable.SubmitTrigger className="rounded-md bg-primary px-3 py-1.5 text-sm text-primary-foreground">Save</Editable.SubmitTrigger>
      <Editable.CancelTrigger className="rounded-md border border-border px-3 py-1.5 text-sm">Cancel</Editable.CancelTrigger>
    </Editable.Control>
  </Editable.Root>
);

const FieldStory: StoryRender = ({ sample }) => (
  <Field.Root invalid className="grid w-full max-w-sm gap-2">
    <Field.Label className="text-sm font-medium">{sample.label ?? "Billing email"}</Field.Label>
    <Field.Input defaultValue="avery@northwind" className="rounded-md border border-destructive bg-background px-3 py-2 text-sm" />
    <Field.ErrorText className="text-sm text-destructive">Enter a valid email address.</Field.ErrorText>
  </Field.Root>
);

const FieldsetStory: StoryRender = ({ sample }) => (
  <Fieldset.Root className="w-full max-w-sm">
    <Fieldset.Legend className="text-sm font-medium">{sample.legend ?? "Billing address"}</Fieldset.Legend>
    <Fieldset.HelperText className="mt-1 text-sm text-muted-foreground">Use the address that appears on your card statement.</Fieldset.HelperText>
    <div className="mt-4 grid gap-3">
      <input
        aria-label="Street"
        defaultValue="1200 Harbor Street"
        className="rounded-md border border-border bg-background px-3 py-2 text-sm"
      />
      <div className="grid grid-cols-2 gap-3">
        <input
          aria-label="City"
          defaultValue="Oakland"
          className="rounded-md border border-border bg-background px-3 py-2 text-sm"
        />
        <input
          aria-label="Postal code"
          defaultValue="94607"
          className="rounded-md border border-border bg-background px-3 py-2 text-sm"
        />
      </div>
    </div>
  </Fieldset.Root>
);

const FileUploadStory: StoryRender = ({ sample }) => (
  <FileUpload.Root maxFiles={5} defaultAcceptedFiles={seededUploads} className="grid w-full max-w-md gap-4">
    <FileUpload.Label className="text-sm font-medium">{sample.label ?? "Brand assets"}</FileUpload.Label>
    <FileUpload.Dropzone className="flex h-28 w-full items-center justify-center rounded-xl border border-dashed border-border text-sm text-muted-foreground">
      Drop files here, or
      <FileUpload.Trigger className="ml-1 text-foreground underline underline-offset-4">browse</FileUpload.Trigger>
    </FileUpload.Dropzone>
    <FileUpload.ItemGroup className="grid gap-2">
      <FileUpload.Context>
        {(api) =>
          api.acceptedFiles.map((file) => (
            <FileUpload.Item key={file.name} file={file} className="flex items-center justify-between rounded-md border border-border px-3 py-2 text-sm">
              <span className="flex items-center gap-3">
                <FileUpload.ItemName />
                <FileUpload.ItemSizeText className="text-muted-foreground" />
              </span>
              <FileUpload.ItemDeleteTrigger aria-label={`Remove ${file.name}`} className="text-muted-foreground">
                <X className="size-4" />
              </FileUpload.ItemDeleteTrigger>
            </FileUpload.Item>
          ))
        }
      </FileUpload.Context>
    </FileUpload.ItemGroup>
    <FileUpload.ClearTrigger className="w-fit rounded-md border border-border px-3 py-1.5 text-sm">Remove all</FileUpload.ClearTrigger>
    <FileUpload.HiddenInput />
  </FileUpload.Root>
);

const FloatingPanelStory: StoryRender = ({ sample }) => (
  <FloatingPanel.Root defaultOpen defaultSize={{ width: 360, height: 220 }} draggable resizable>
    <FloatingPanel.Trigger className="rounded-md border border-border px-4 py-2 text-sm">Revenue</FloatingPanel.Trigger>
    <FloatingPanel.Positioner>
      <FloatingPanel.Content className="relative flex flex-col overflow-hidden rounded-xl border border-border bg-card text-card-foreground">
        <FloatingPanel.DragTrigger>
          <FloatingPanel.Header className="flex items-center justify-between border-b border-border px-4 py-3">
            <FloatingPanel.Title className="text-sm font-semibold">{sample.title ?? "Revenue today"}</FloatingPanel.Title>
            <FloatingPanel.Control className="flex items-center gap-1">
              <FloatingPanel.StageTrigger stage="maximized" aria-label="Maximize panel" className="rounded-sm p-1 text-muted-foreground">
                <Maximize2 className="size-4" />
              </FloatingPanel.StageTrigger>
              <FloatingPanel.CloseTrigger aria-label="Close panel" className="rounded-sm p-1 text-muted-foreground">
                <X className="size-4" />
              </FloatingPanel.CloseTrigger>
            </FloatingPanel.Control>
          </FloatingPanel.Header>
        </FloatingPanel.DragTrigger>
        <FloatingPanel.Body className="flex-1 p-4 text-sm">
          <p className="text-2xl font-semibold">$12,480</p>
          <p className="mt-1 text-muted-foreground">214 orders · $58 average cart</p>
          <p className="mt-3 text-muted-foreground">Refunds are down 12% week over week.</p>
        </FloatingPanel.Body>
        <FloatingPanel.ResizeTrigger axis="se" aria-label="Resize panel" className="absolute bottom-0 right-0 h-3 w-3 cursor-se-resize" />
      </FloatingPanel.Content>
    </FloatingPanel.Positioner>
  </FloatingPanel.Root>
);

const ImageCropperStory: StoryRender = ({ sample }) => (
  <div className="w-full max-w-md">
    <p className="mb-2 text-sm font-medium">{sample.label ?? "Profile photo"}</p>
    <ImageCropper.Root aspectRatio={1} cropShape="circle" initialCrop={{ x: 88, y: 24, width: 240, height: 240 }}>
      <ImageCropper.Viewport className="relative h-72 w-full overflow-hidden rounded-xl border border-border bg-muted">
        <ImageCropper.Image src="/col-social-preview.jpg" alt="Workspace banner being cropped" className="h-full w-full object-cover" />
        <ImageCropper.Selection>
          <ImageCropper.Grid axis="horizontal" className="absolute inset-x-0 top-1/3 h-px bg-white/40" />
          <ImageCropper.Grid axis="vertical" className="absolute inset-y-0 left-1/3 w-px bg-white/40" />
          <ImageCropper.Handle position="nw" className="absolute -left-1.5 -top-1.5 size-3 rounded-full border-2 border-primary bg-background" />
          <ImageCropper.Handle position="ne" className="absolute -right-1.5 -top-1.5 size-3 rounded-full border-2 border-primary bg-background" />
          <ImageCropper.Handle position="se" className="absolute -bottom-1.5 -right-1.5 size-3 rounded-full border-2 border-primary bg-background" />
          <ImageCropper.Handle position="sw" className="absolute -bottom-1.5 -left-1.5 size-3 rounded-full border-2 border-primary bg-background" />
        </ImageCropper.Selection>
      </ImageCropper.Viewport>
    </ImageCropper.Root>
  </div>
);

const HoverCardStory: StoryRender = ({ sample }) => (
  <HoverCard.Root defaultOpen>
    <HoverCard.Trigger className="text-sm font-medium underline underline-offset-4">@{sample.handle ?? "avery-northwind"}</HoverCard.Trigger>
    <HoverCard.Positioner>
      <HoverCard.Arrow className="absolute">
        <HoverCard.ArrowTip className="border-l border-t border-border" />
      </HoverCard.Arrow>
      <HoverCard.Content className="w-72 rounded-xl border border-border bg-popover p-4 text-popover-foreground">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-muted text-sm text-muted-foreground">AW</div>
          <div>
            <p className="text-sm font-semibold">Avery Northwind</p>
            <p className="text-sm text-muted-foreground">Staff engineer · Col</p>
          </div>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">48 merged pull requests this quarter. Maintains the preview pipeline.</p>
      </HoverCard.Content>
    </HoverCard.Positioner>
  </HoverCard.Root>
);

const ListboxStory: StoryRender = ({ sample }) => (
  <Listbox.Root collection={members} selectionMode="multiple" defaultValue={["amara", "priya"]} className="w-full max-w-sm">
    <Listbox.Label className="text-sm font-medium">{sample.label ?? "Workspace members"}</Listbox.Label>
    <Listbox.Content className="mt-2 rounded-md border border-border">
      <Listbox.ItemGroup>
        <Listbox.ItemGroupLabel className="px-3 py-2 text-xs text-muted-foreground">Engineering</Listbox.ItemGroupLabel>
        {teammates.map((teammate) => (
          <Listbox.Item key={teammate.value} item={teammate} className="flex items-center justify-between px-3 py-2 text-sm data-[highlighted]:bg-secondary">
            <Listbox.ItemText>{teammate.label}</Listbox.ItemText>
            <Listbox.ItemIndicator>
              <Check className="size-4" />
            </Listbox.ItemIndicator>
          </Listbox.Item>
        ))}
      </Listbox.ItemGroup>
    </Listbox.Content>
    <Listbox.ValueText className="mt-2 text-sm text-muted-foreground" placeholder="No members selected" />
  </Listbox.Root>
);

const MarqueeStory: StoryRender = () => (
  // Rendered paused so the story stays a static surface in captures.
  <Marquee.Root defaultPaused speed={40} aria-label="Customers" className="relative w-full overflow-hidden">
    <Marquee.Edge side="start" className="absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
    <Marquee.Edge side="end" className="absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />
    <Marquee.Viewport className="w-full overflow-hidden py-2">
      <Marquee.Content className="flex items-center gap-12">
        {customerNames.map((name) => (
          <Marquee.Item key={name} className="whitespace-nowrap text-lg font-semibold text-muted-foreground">
            {name}
          </Marquee.Item>
        ))}
      </Marquee.Content>
    </Marquee.Viewport>
  </Marquee.Root>
);

const MenuStory: StoryRender = ({ sample }) => (
  <Menu.Root defaultOpen>
    <Menu.Trigger className="rounded-md border border-border px-4 py-2 text-sm">{sample.trigger ?? "Invoice actions"}</Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content className="min-w-[180px] rounded-md border border-border bg-popover p-1 text-popover-foreground">
        <Menu.ItemGroup>
          <Menu.ItemGroupLabel className="px-2 py-1.5 text-xs text-muted-foreground">Invoice INV-2041</Menu.ItemGroupLabel>
          <Menu.Item id="download" value="download" className="rounded-sm px-2 py-1.5 text-sm">
            Download PDF
          </Menu.Item>
          <Menu.Item id="duplicate" value="duplicate" className="rounded-sm px-2 py-1.5 text-sm">
            Duplicate
          </Menu.Item>
          <Menu.Item id="remind" value="remind" className="rounded-sm px-2 py-1.5 text-sm">
            Send reminder
          </Menu.Item>
        </Menu.ItemGroup>
        <Menu.Separator className="my-1 h-px bg-border" />
        <Menu.Item id="void" value="void" className="rounded-sm px-2 py-1.5 text-sm text-destructive">
          Void invoice
        </Menu.Item>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
);

const NavigationMenuStory: StoryRender = ({ sample }) => (
  <NavigationMenu.Root defaultValue="product" className="relative">
    <NavigationMenu.List className="flex items-center gap-1 rounded-md border border-border p-1">
      <NavigationMenu.Item value="product" className="relative">
        <NavigationMenu.Trigger className="rounded-sm px-3 py-1.5 text-sm data-[state=open]:bg-secondary">
          {sample.item1 ?? "Product"}
        </NavigationMenu.Trigger>
        <NavigationMenu.Content value="product" className="absolute left-0 top-full z-10 mt-2 w-64 rounded-md border border-border bg-popover p-3 text-popover-foreground">
          <NavigationMenu.Link value="product" href="#analytics" className="block rounded-sm px-2 py-1.5 text-sm">
            Analytics
          </NavigationMenu.Link>
          <NavigationMenu.Link value="product" href="#automations" className="block rounded-sm px-2 py-1.5 text-sm">
            Automations
          </NavigationMenu.Link>
          <NavigationMenu.Link value="product" href="#reports" className="block rounded-sm px-2 py-1.5 text-sm">
            Reports
          </NavigationMenu.Link>
        </NavigationMenu.Content>
      </NavigationMenu.Item>
      <NavigationMenu.Item value="docs">
        <NavigationMenu.Trigger className="rounded-sm px-3 py-1.5 text-sm data-[state=open]:bg-secondary">Docs</NavigationMenu.Trigger>
      </NavigationMenu.Item>
      <NavigationMenu.Item value="pricing">
        <NavigationMenu.Trigger className="rounded-sm px-3 py-1.5 text-sm data-[state=open]:bg-secondary">Pricing</NavigationMenu.Trigger>
      </NavigationMenu.Item>
    </NavigationMenu.List>
  </NavigationMenu.Root>
);

const NumberInputStory: StoryRender = ({ sample }) => (
  <NumberInput.Root defaultValue="12" min={1} max={50} className="grid w-full max-w-xs gap-2">
    <NumberInput.Label className="text-sm font-medium">{sample.label ?? "Seats"}</NumberInput.Label>
    <div className="flex items-stretch gap-2">
      <NumberInput.Scrubber aria-label="Drag to change seat count" className="w-1 rounded bg-border" />
      <NumberInput.Control className="flex flex-1 items-center rounded-md border border-border bg-background">
        <NumberInput.Input className="w-full bg-transparent px-3 py-2 text-sm outline-none" />
        <NumberInput.IncrementTrigger aria-label="Add a seat" className="px-2 py-1 text-muted-foreground">
          <ChevronUp className="size-4" />
        </NumberInput.IncrementTrigger>
        <NumberInput.DecrementTrigger aria-label="Remove a seat" className="px-2 py-1 text-muted-foreground">
          <ChevronDown className="size-4" />
        </NumberInput.DecrementTrigger>
      </NumberInput.Control>
    </div>
  </NumberInput.Root>
);

const PaginationStory: StoryRender = ({ sample }) => (
  <div className="w-full max-w-md">
    <p className="mb-3 text-sm text-muted-foreground">Showing 31–40 of {sample.total ?? "214"} invoices</p>
    <Pagination.Root count={214} pageSize={10} defaultPage={4} className="flex items-center gap-1">
      <Pagination.PrevTrigger className="flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-sm">
        <ChevronLeft className="size-4" />
        Previous
      </Pagination.PrevTrigger>
      <Pagination.Context>
        {(context) =>
          context.pages.map((page, index) =>
            page.type === "page" ? (
              <Pagination.Item
                key={index}
                type="page"
                value={page.value}
                className="rounded-md px-3 py-1.5 text-sm data-[selected]:bg-secondary"
              >
                {page.value}
              </Pagination.Item>
            ) : (
              <Pagination.Ellipsis key={index} index={index} className="px-2 text-sm text-muted-foreground">
                …
              </Pagination.Ellipsis>
            ),
          )
        }
      </Pagination.Context>
      <Pagination.NextTrigger className="flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-sm">
        Next
        <ChevronRight className="size-4" />
      </Pagination.NextTrigger>
    </Pagination.Root>
  </div>
);

export const storyRenders: Record<string, StoryRender> = {
  "ark-ui/Accordion": AccordionStory,
  "ark-ui/Angle Slider": AngleSliderStory,
  "ark-ui/Avatar": AvatarStory,
  "ark-ui/Carousel": CarouselStory,
  "ark-ui/Checkbox": CheckboxStory,
  "ark-ui/Clipboard": ClipboardStory,
  "ark-ui/Collapsible": CollapsibleStory,
  "ark-ui/Color Picker": ColorPickerStory,
  "ark-ui/Combobox": ComboboxStory,
  "ark-ui/Date Input": DateInputStory,
  "ark-ui/Date Picker": DatePickerStory,
  "ark-ui/Dialog": DialogStory,
  "ark-ui/Drawer": DrawerStory,
  "ark-ui/Editable": EditableStory,
  "ark-ui/Field": FieldStory,
  "ark-ui/Fieldset": FieldsetStory,
  "ark-ui/File Upload": FileUploadStory,
  "ark-ui/Floating Panel": FloatingPanelStory,
  "ark-ui/Image Cropper": ImageCropperStory,
  "ark-ui/Hover Card": HoverCardStory,
  "ark-ui/Listbox": ListboxStory,
  "ark-ui/Marquee": MarqueeStory,
  "ark-ui/Menu": MenuStory,
  "ark-ui/Navigation Menu": NavigationMenuStory,
  "ark-ui/Number Input": NumberInputStory,
  "ark-ui/Pagination": PaginationStory,
};
