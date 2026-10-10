import {
  CalendarIcon,
  CheckIcon,
  ChevronsUpDownIcon,
  LayoutDashboardIcon,
  ReceiptIcon,
  SearchIcon,
  SettingsIcon,
  TriangleAlertIcon,
  UsersIcon,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group";
import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@/components/ui/native-select";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type { StoryRender } from "./type";

/**
 * Preview stories for shadcn/ui (batch 1): the very component code the
 * library documents, as it ships in this app's `components/ui`, rendered with
 * realistic content. Sample strings replace the display text where a caller
 * labels the render. Popups and dialogs hold themselves open so a screenshot
 * captures the interesting surface, not just the trigger.
 */

const FieldStory: StoryRender = ({ sample }) => (
  <FieldGroup className="w-full max-w-md">
    <FieldSet>
      <FieldLegend>{sample.title ?? "Create your workspace"}</FieldLegend>
      <Field>
        <FieldLabel htmlFor="field-story-name">Workspace name</FieldLabel>
        <Input id="field-story-name" defaultValue="Northwind Trading" />
        <FieldDescription>Invoices and reminders send from this workspace.</FieldDescription>
      </Field>
      <Field>
        <FieldLabel htmlFor="field-story-email">Billing email</FieldLabel>
        <Input id="field-story-email" type="email" defaultValue="ap@northwind.test" />
        <FieldError errors={[{ message: "Use a work address on your company domain." }]} />
      </Field>
    </FieldSet>
  </FieldGroup>
);

const ButtonGroupStory: StoryRender = ({ sample }) => (
  <div className="flex flex-wrap items-center gap-4">
    <ButtonGroup>
      <Button variant="outline">{sample.view1 ?? "Day"}</Button>
      <Button variant="outline">{sample.view2 ?? "Week"}</Button>
      <Button variant="outline">{sample.view3 ?? "Month"}</Button>
    </ButtonGroup>
    <ButtonGroup>
      <ButtonGroupText>{sample.selection ?? "3 invoices selected"}</ButtonGroupText>
      <ButtonGroupSeparator />
      <Button variant="outline">Archive</Button>
      <Button variant="outline">Export</Button>
    </ButtonGroup>
  </div>
);

const InputGroupStory: StoryRender = ({ sample }) => (
  <div className="grid w-full max-w-sm gap-4">
    <div className="grid gap-2">
      <label htmlFor="input-group-story-amount" className="text-sm font-medium">
        {sample.label ?? "Transfer amount"}
      </label>
      <InputGroup>
        <InputGroupAddon align="inline-start">$</InputGroupAddon>
        <InputGroupInput id="input-group-story-amount" inputMode="decimal" defaultValue="1,250.00" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>USD</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
    <InputGroup>
      <InputGroupAddon align="inline-start">
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupInput placeholder="Search invoices by client or number" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton size="sm">Clear</InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  </div>
);

const InputOTPStory: StoryRender = ({ sample }) => (
  <div className="grid justify-items-center gap-3">
    <div className="grid gap-1 text-center">
      <p className="text-sm font-medium">{sample.title ?? "Verification code"}</p>
      <p className="text-sm text-muted-foreground">
        {sample.description ?? "We sent a 6-digit code to dana@northwind.test."}
      </p>
    </div>
    <InputOTP maxLength={6} value="294815" onChange={() => {}}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  </div>
);

const TextareaStory: StoryRender = ({ sample }) => (
  <div className="grid w-full max-w-md gap-2">
    <label htmlFor="textarea-story-notes" className="text-sm font-medium">
      {sample.label ?? "Project notes"}
    </label>
    <Textarea
      id="textarea-story-notes"
      className="min-h-28"
      defaultValue={
        sample.body ??
        "Ship the billing rework before the Q4 audit on October 21. Isla owns the migration script."
      }
    />
    <p className="text-sm text-muted-foreground">Visible to everyone on the Atlas Migration project.</p>
  </div>
);

const RadioGroupStory: StoryRender = ({ sample }) => {
  const plans = [
    {
      value: "starter",
      name: sample.plan1 ?? "Starter",
      note: "Up to 3 seats and 50 invoices a month.",
    },
    {
      value: "growth",
      name: sample.plan2 ?? "Growth",
      note: "Unlimited seats, recurring invoices, and Stripe sync.",
    },
    {
      value: "scale",
      name: sample.plan3 ?? "Scale",
      note: "Multi-entity accounting with audit logs and SSO.",
    },
  ];
  return (
    <RadioGroup defaultValue="growth" className="gap-4">
      {plans.map((plan) => (
        <div key={plan.value} className="flex items-start gap-3">
          <RadioGroupItem value={plan.value} id={`radio-story-${plan.value}`} className="mt-1" />
          <div className="grid gap-1">
            <label htmlFor={`radio-story-${plan.value}`} className="text-sm font-medium">
              {plan.name}
            </label>
            <p className="text-sm text-muted-foreground">{plan.note}</p>
          </div>
        </div>
      ))}
    </RadioGroup>
  );
};

const SelectStory: StoryRender = ({ sample }) => (
  <div className="grid w-full max-w-sm gap-2">
    <label htmlFor="select-story-trigger" className="text-sm font-medium">
      {sample.label ?? "Assign reviewer"}
    </label>
    <Select defaultValue="isla" defaultOpen>
      <SelectTrigger id="select-story-trigger" className="w-[240px]">
        <SelectValue placeholder="Assign reviewer" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Engineering</SelectLabel>
          <SelectItem value="isla">Isla Fernandes</SelectItem>
          <SelectItem value="marco">Marco Reyes</SelectItem>
          <SelectItem value="dana">Dana Okafor</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Finance</SelectLabel>
          <SelectItem value="priya">Priya Natarajan</SelectItem>
          <SelectItem value="tomas">Tomás Herrera</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
);

const NativeSelectStory: StoryRender = ({ sample }) => (
  <div className="grid w-full max-w-sm gap-2">
    <label htmlFor="native-select-story-country" className="text-sm font-medium">
      {sample.label ?? "Billing country"}
    </label>
    <NativeSelect id="native-select-story-country" defaultValue="de">
      <NativeSelectOptGroup label="Europe">
        <NativeSelectOption value="de">Germany</NativeSelectOption>
        <NativeSelectOption value="fr">France</NativeSelectOption>
        <NativeSelectOption value="gb">United Kingdom</NativeSelectOption>
      </NativeSelectOptGroup>
      <NativeSelectOptGroup label="Americas">
        <NativeSelectOption value="us">United States</NativeSelectOption>
        <NativeSelectOption value="br">Brazil</NativeSelectOption>
      </NativeSelectOptGroup>
    </NativeSelect>
  </div>
);

const SwitchStory: StoryRender = ({ sample }) => {
  const rows = [
    {
      id: "switch-story-payments",
      title: sample.title1 ?? "Failed payment alerts",
      note: "Email the workspace when a charge is declined.",
      checked: true,
    },
    {
      id: "switch-story-digest",
      title: "Weekly revenue summary",
      note: "A Monday digest of paid and outstanding invoices.",
      checked: true,
    },
    {
      id: "switch-story-archive",
      title: "Auto-archive paid invoices",
      note: "Move invoices to the archive 30 days after payment.",
      checked: false,
    },
  ];
  return (
    <div className="grid w-full max-w-md gap-5">
      {rows.map((row) => (
        <div key={row.id} className="flex items-center justify-between gap-4">
          <div className="grid gap-1">
            <label htmlFor={row.id} className="text-sm font-medium">
              {row.title}
            </label>
            <p className="text-sm text-muted-foreground">{row.note}</p>
          </div>
          <Switch id={row.id} defaultChecked={row.checked} />
        </div>
      ))}
    </div>
  );
};

const SliderStory: StoryRender = ({ sample }) => (
  <div className="grid w-full max-w-sm gap-3">
    <div className="flex items-center justify-between text-sm">
      <span className="font-medium">{sample.label ?? "Monthly spend"}</span>
      <span className="text-muted-foreground">{sample.range ?? "$320 – $1,480"}</span>
    </div>
    <Slider defaultValue={[32, 74]} />
    <p className="text-sm text-muted-foreground">Filter invoices by the amount charged each month.</p>
  </div>
);

const CalendarStory: StoryRender = ({ sample }) => (
  <div className="grid justify-items-center gap-3">
    <Calendar mode="single" selected={new Date(2026, 9, 14)} />
    <p className="text-sm text-muted-foreground">
      {sample.caption ?? "Sprint review · October 14, 2026"}
    </p>
  </div>
);

const DatePickerStory: StoryRender = ({ sample }) => (
  <div className="grid w-full max-w-sm gap-2">
    <Label htmlFor="date-picker-story-trigger">{sample.label ?? "Invoice due date"}</Label>
    <Popover defaultOpen>
      <PopoverTrigger asChild>
        <Button
          id="date-picker-story-trigger"
          variant="outline"
          className="w-[240px] justify-start text-left font-normal"
        >
          <CalendarIcon />
          {sample.date ?? "October 21, 2026"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={new Date(2026, 9, 21)} />
      </PopoverContent>
    </Popover>
  </div>
);

const ComboboxStory: StoryRender = ({ sample }) => (
  <Popover defaultOpen>
    <PopoverTrigger asChild>
      <Button variant="outline" role="combobox" className="w-[260px] justify-between">
        {sample.selection ?? "Isla Fernandes"}
        <ChevronsUpDownIcon />
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-[260px] p-0">
      <Command>
        <CommandInput placeholder="Search teammates" />
        <CommandList>
          <CommandEmpty>No teammate found.</CommandEmpty>
          <CommandGroup heading="Engineering">
            <CommandItem value="isla fernandes">
              <CheckIcon />
              Isla Fernandes
            </CommandItem>
            <CommandItem value="marco reyes">
              <CheckIcon />
              Marco Reyes
            </CommandItem>
            <CommandItem value="dana okafor">
              <CheckIcon />
              Dana Okafor
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Finance">
            <CommandItem value="priya natarajan">
              <CheckIcon />
              Priya Natarajan
            </CommandItem>
            <CommandItem value="tomas herrera">
              <CheckIcon />
              Tomás Herrera
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
);

const LabelStory: StoryRender = ({ sample }) => (
  <div className="grid w-full max-w-sm gap-4">
    <div className="grid gap-2">
      <Label htmlFor="label-story-name">{sample.label1 ?? "Full name"}</Label>
      <Input id="label-story-name" defaultValue="Dana Okafor" />
    </div>
    <div className="grid gap-2">
      <Label htmlFor="label-story-email">Work email</Label>
      <Input id="label-story-email" type="email" defaultValue="dana@northwind.test" />
    </div>
    <div className="flex items-center gap-3">
      <Switch id="label-story-reminders" defaultChecked />
      <Label htmlFor="label-story-reminders">Email me invoice reminders</Label>
    </div>
  </div>
);

const AccordionStory: StoryRender = ({ sample }) => (
  <Accordion type="single" collapsible defaultValue="billing" className="w-full max-w-xl">
    <AccordionItem value="billing">
      <AccordionTrigger>{sample.question ?? "How does billing work?"}</AccordionTrigger>
      <AccordionContent>
        Plans are billed monthly per workspace. The Growth tier adds usage-based pricing above 500
        invoices a month.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="import">
      <AccordionTrigger>Can I import invoices from Stripe?</AccordionTrigger>
      <AccordionContent>
        Yes. Connect a Stripe account and open and paid invoices sync into Ledger every hour.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="seats">
      <AccordionTrigger>Do you charge per seat?</AccordionTrigger>
      <AccordionContent>
        Viewer seats are free. You only pay for members who create or send invoices.
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);

const BreadcrumbStory: StoryRender = ({ sample }) => (
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Projects</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Atlas Migration</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbEllipsis />
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>{sample.page ?? "Invoices"}</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
);

const NavigationMenuStory: StoryRender = ({ sample }) => (
  <NavigationMenu defaultValue="platform">
    <NavigationMenuList>
      <NavigationMenuItem value="platform">
        <NavigationMenuTrigger>{sample.menu ?? "Platform"}</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid gap-2 p-2 md:w-[340px]">
            <li>
              <NavigationMenuLink href="#">
                <span className="font-medium">Invoicing</span>
                <span className="text-sm text-muted-foreground">
                  Send, track, and reconcile invoices in one place.
                </span>
              </NavigationMenuLink>
            </li>
            <li>
              <NavigationMenuLink href="#">
                <span className="font-medium">Payments</span>
                <span className="text-sm text-muted-foreground">
                  Card and bank transfers, reconciled automatically.
                </span>
              </NavigationMenuLink>
            </li>
            <li>
              <NavigationMenuLink href="#">
                <span className="font-medium">Reporting</span>
                <span className="text-sm text-muted-foreground">
                  Revenue, aging, and tax reports your accountant will accept.
                </span>
              </NavigationMenuLink>
            </li>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem value="pricing">
        <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
          Pricing
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem value="docs">
        <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
          Docs
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
);

const SidebarStory: StoryRender = ({ sample }) => (
  <SidebarProvider>
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <ReceiptIcon />
              </div>
              <div className="grid flex-1 text-left leading-tight">
                <span className="truncate font-medium">Ledger</span>
                <span className="truncate text-xs text-muted-foreground">Northwind Trading</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive>
                  <LayoutDashboardIcon />
                  Dashboard
                </SidebarMenuButton>
                <SidebarMenuBadge>4</SidebarMenuBadge>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <ReceiptIcon />
                  Invoices
                </SidebarMenuButton>
                <SidebarMenuBadge>12</SidebarMenuBadge>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <UsersIcon />
                  Clients
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <SettingsIcon />
                  Settings
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <UsersIcon />
              Dana Okafor
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
    <SidebarInset>
      <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger />
        <Separator orientation="vertical" className="h-4" />
        <span className="text-sm font-medium">{sample.title ?? "Dashboard"}</span>
      </header>
      <div className="grid gap-2 p-4">
        <p className="text-2xl font-semibold">{sample.value ?? "$48,210"}</p>
        <p className="text-sm text-muted-foreground">
          Revenue this month, up 12.4%. Three invoices are awaiting payment.
        </p>
      </div>
    </SidebarInset>
  </SidebarProvider>
);

const ScrollAreaStory: StoryRender = ({ sample }) => {
  const activity = [
    { title: "INV-2043 paid by Northwind Trading", time: "12 minutes ago" },
    { title: "Reminder sent to Bluebird Studio", time: "1 hour ago" },
    { title: "INV-2039 marked overdue", time: "3 hours ago" },
    { title: "Priya approved INV-2038", time: "Yesterday at 16:40" },
    { title: "Receipt emailed to Harborline Foods", time: "Yesterday at 11:02" },
    { title: "INV-2035 voided by Dana Okafor", time: "October 7" },
    { title: "Stripe payout reconciled", time: "October 6" },
    { title: "Tax report exported for Q3", time: "October 5" },
    { title: "New client added: Meridian Labs", time: "October 3" },
    { title: "Late fee applied to INV-2028", time: "October 1" },
  ];
  return (
    <ScrollArea className="h-72 w-full max-w-sm rounded-md border">
      <div className="p-4">
        <h4 className="mb-3 text-sm font-medium">{sample.title ?? "Recent activity"}</h4>
        <ul className="grid gap-3">
          {activity.map((row) => (
            <li key={row.title} className="grid gap-0.5">
              <span className="text-sm">{row.title}</span>
              <span className="text-xs text-muted-foreground">{row.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </ScrollArea>
  );
};

const ResizableStory: StoryRender = ({ sample }) => (
  <ResizablePanelGroup
    orientation="horizontal"
    className="h-[320px] w-full max-w-2xl rounded-md border"
  >
    <ResizablePanel defaultSize={32}>
      <div className="grid h-full content-start gap-2 p-4">
        <p className="text-sm font-medium">Invoices</p>
        {["INV-2043 · Northwind Trading", "INV-2041 · Bluebird Studio", "INV-2038 · Harborline Foods"].map(
          (row) => (
            <p key={row} className="text-sm text-muted-foreground">
              {row}
            </p>
          ),
        )}
      </div>
    </ResizablePanel>
    <ResizableHandle withHandle />
    <ResizablePanel defaultSize={68}>
      <div className="grid h-full content-start gap-2 p-4">
        <p className="text-sm font-medium">{sample.title ?? "INV-2043 · Northwind Trading"}</p>
        <p className="text-sm text-muted-foreground">
          $12,480.00 due October 21. Net-30 terms, paid by bank transfer. Two line items: migration
          consulting and a support retainer.
        </p>
      </div>
    </ResizablePanel>
  </ResizablePanelGroup>
);

const DialogStory: StoryRender = ({ sample }) => (
  <Dialog defaultOpen>
    <DialogTrigger asChild>
      <Button variant="outline">Invite teammate</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{sample.title ?? "Invite teammate"}</DialogTitle>
        <DialogDescription>
          They get access to the Northwind Trading workspace and its invoices.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-2">
        <Label htmlFor="dialog-story-email">Email address</Label>
        <Input id="dialog-story-email" type="email" placeholder="dana@northwind.test" />
      </div>
      <DialogFooter>
        <Button>Send invite</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

const AlertDialogStory: StoryRender = ({ sample }) => (
  <AlertDialog defaultOpen>
    <AlertDialogTrigger asChild>
      <Button variant="destructive">Delete project</Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogMedia>
          <TriangleAlertIcon />
        </AlertDialogMedia>
        <AlertDialogTitle>{sample.title ?? 'Delete "Atlas Migration"?'}</AlertDialogTitle>
        <AlertDialogDescription>
          This removes 214 invoices and their payment history. The action cannot be undone.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction variant="destructive">Delete project</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

const DrawerStory: StoryRender = ({ sample }) => (
  <Drawer defaultOpen>
    <DrawerTrigger asChild>
      <Button variant="outline">Move invoice</Button>
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>{sample.title ?? "Move INV-2043 to"}</DrawerTitle>
        <DrawerDescription>Pick a folder. You can move it again at any time.</DrawerDescription>
      </DrawerHeader>
      <div className="grid gap-3 px-4">
        <div className="grid gap-0.5">
          <p className="text-sm font-medium">Awaiting payment</p>
          <p className="text-sm text-muted-foreground">Sent invoices with an open balance.</p>
        </div>
        <div className="grid gap-0.5">
          <p className="text-sm font-medium">Paid</p>
          <p className="text-sm text-muted-foreground">Settled invoices, ready for reconciliation.</p>
        </div>
      </div>
      <DrawerFooter>
        <Button>Move invoice</Button>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
);

const PopoverStory: StoryRender = ({ sample }) => (
  <Popover defaultOpen>
    <PopoverTrigger asChild>
      <Button variant="outline">Export dimensions</Button>
    </PopoverTrigger>
    <PopoverContent className="w-72">
      <PopoverHeader>
        <PopoverTitle>{sample.title ?? "Export dimensions"}</PopoverTitle>
        <PopoverDescription>Applied to every PDF you export from this workspace.</PopoverDescription>
      </PopoverHeader>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <div className="grid gap-1.5">
          <Label htmlFor="popover-story-width">Width</Label>
          <Input id="popover-story-width" defaultValue="1200" />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="popover-story-height">Height</Label>
          <Input id="popover-story-height" defaultValue="630" />
        </div>
      </div>
    </PopoverContent>
  </Popover>
);

const HoverCardStory: StoryRender = ({ sample }) => (
  <p className="max-w-md text-sm text-muted-foreground">
    Built by{" "}
    <HoverCard defaultOpen>
      <HoverCardTrigger asChild>
        <a href="#" className="font-medium text-foreground underline underline-offset-4">
          @isla
        </a>
      </HoverCardTrigger>
      <HoverCardContent className="w-72">
        <div className="grid gap-1">
          <p className="text-sm font-medium">{sample.name ?? "Isla Fernandes"}</p>
          <p className="text-sm text-muted-foreground">
            Staff engineer on Ledger. Shipping the billing rework.
          </p>
          <p className="text-xs text-muted-foreground">12 projects · 480 invoices shipped</p>
        </div>
      </HoverCardContent>
    </HoverCard>{" "}
    and the platform team.
  </p>
);

const ContextMenuStory: StoryRender = ({ sample }) => (
  <ContextMenu open onOpenChange={() => {}}>
    <ContextMenuTrigger className="flex h-40 w-full max-w-md items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
      {sample.hint ?? "Right-click an invoice row for actions"}
    </ContextMenuTrigger>
    <ContextMenuContent className="w-56">
      <ContextMenuLabel>INV-2043 · Northwind Trading</ContextMenuLabel>
      <ContextMenuItem>
        Open invoice
        <ContextMenuShortcut>⌘O</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuItem>Copy payment link</ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuCheckboxItem defaultChecked>Mark as paid</ContextMenuCheckboxItem>
      <ContextMenuSub>
        <ContextMenuSubTrigger>Move to</ContextMenuSubTrigger>
        <ContextMenuSubContent>
          <ContextMenuItem>Awaiting payment</ContextMenuItem>
          <ContextMenuItem>Archived</ContextMenuItem>
        </ContextMenuSubContent>
      </ContextMenuSub>
      <ContextMenuSeparator />
      <ContextMenuItem variant="destructive">Delete invoice</ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
);

const MenubarStory: StoryRender = ({ sample }) => (
  <Menubar defaultValue="file">
    <MenubarMenu value="file">
      <MenubarTrigger>{sample.menu1 ?? "File"}</MenubarTrigger>
      <MenubarContent>
        <MenubarItem>
          New invoice
          <MenubarShortcut>⌘N</MenubarShortcut>
        </MenubarItem>
        <MenubarItem>Import CSV</MenubarItem>
        <MenubarSub>
          <MenubarSubTrigger>Export</MenubarSubTrigger>
          <MenubarSubContent>
            <MenubarItem>PDF</MenubarItem>
            <MenubarItem>CSV</MenubarItem>
          </MenubarSubContent>
        </MenubarSub>
        <MenubarSeparator />
        <MenubarItem variant="destructive">Close workspace</MenubarItem>
      </MenubarContent>
    </MenubarMenu>
    <MenubarMenu value="edit">
      <MenubarTrigger>Edit</MenubarTrigger>
      <MenubarContent>
        <MenubarItem>
          Undo
          <MenubarShortcut>⌘Z</MenubarShortcut>
        </MenubarItem>
        <MenubarItem>Redo</MenubarItem>
        <MenubarSeparator />
        <MenubarCheckboxItem defaultChecked>Show archived</MenubarCheckboxItem>
      </MenubarContent>
    </MenubarMenu>
    <MenubarMenu value="view">
      <MenubarTrigger>View</MenubarTrigger>
      <MenubarContent>
        <MenubarRadioGroup defaultValue="month">
          <MenubarRadioItem value="day">Day</MenubarRadioItem>
          <MenubarRadioItem value="week">Week</MenubarRadioItem>
          <MenubarRadioItem value="month">Month</MenubarRadioItem>
        </MenubarRadioGroup>
      </MenubarContent>
    </MenubarMenu>
  </Menubar>
);

export const storyRenders: Record<string, StoryRender> = {
  "shadcn-ui/Field": FieldStory,
  "shadcn-ui/Button Group": ButtonGroupStory,
  "shadcn-ui/Input Group": InputGroupStory,
  "shadcn-ui/Input OTP": InputOTPStory,
  "shadcn-ui/Textarea": TextareaStory,
  "shadcn-ui/Radio Group": RadioGroupStory,
  "shadcn-ui/Select": SelectStory,
  "shadcn-ui/Native Select": NativeSelectStory,
  "shadcn-ui/Switch": SwitchStory,
  "shadcn-ui/Slider": SliderStory,
  "shadcn-ui/Calendar": CalendarStory,
  "shadcn-ui/Date Picker": DatePickerStory,
  "shadcn-ui/Combobox": ComboboxStory,
  "shadcn-ui/Label": LabelStory,
  "shadcn-ui/Accordion": AccordionStory,
  "shadcn-ui/Breadcrumb": BreadcrumbStory,
  "shadcn-ui/Navigation Menu": NavigationMenuStory,
  "shadcn-ui/Sidebar": SidebarStory,
  "shadcn-ui/Scroll Area": ScrollAreaStory,
  "shadcn-ui/Resizable": ResizableStory,
  "shadcn-ui/Dialog": DialogStory,
  "shadcn-ui/Alert Dialog": AlertDialogStory,
  "shadcn-ui/Drawer": DrawerStory,
  "shadcn-ui/Popover": PopoverStory,
  "shadcn-ui/Hover Card": HoverCardStory,
  "shadcn-ui/Context Menu": ContextMenuStory,
  "shadcn-ui/Menubar": MenubarStory,
};
