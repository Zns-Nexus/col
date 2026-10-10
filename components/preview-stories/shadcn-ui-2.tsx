import * as React from "react";
import { Toast } from "@base-ui/react";
import { Questionnaire as QuestionnairePrimitive } from "@shadcn/react/questionnaire";
import {
  ArrowDownIcon,
  ArrowUpDownIcon,
  ArrowUpIcon,
  BellIcon,
  BoldIcon,
  BookOpenIcon,
  CalendarIcon,
  ChevronsUpDownIcon,
  CircleCheckIcon,
  CreditCardIcon,
  DownloadIcon,
  FileCodeIcon,
  FileTextIcon,
  FolderIcon,
  GitBranchIcon,
  InfoIcon,
  ItalicIcon,
  Loader2Icon,
  MailIcon,
  OctagonXIcon,
  RotateCcwIcon,
  SettingsIcon,
  TriangleAlertIcon,
  UnderlineIcon,
  XIcon,
} from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { toast as sonnerToast } from "sonner";
import {
  createColumnHelper,
  createSortedRowModel,
  rowSortingFeature,
  sortFn_basic,
  sortFn_text,
  tableFeatures,
  useTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment";
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from "@/components/ui/avatar";
import { Bubble, BubbleContent, BubbleGroup, BubbleReactions } from "@/components/ui/bubble";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { DirectionProvider, useDirection } from "@/components/ui/direction";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "@/components/ui/message";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Progress } from "@/components/ui/progress";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
import type { StoryRender } from "./type";

/**
 * Preview stories for shadcn/ui (chunk 2 of 2): the very component code the
 * library documents, as it ships in this app's `components/ui`, rendered with
 * realistic content. Sample strings replace the display text where a caller
 * labels the render. Toast, Typeset, and Questionnaire ship no registry recipe
 * into `components/ui`, so their documented APIs are implemented in this
 * module the same way shadcn's own copy-paste recipes implement them.
 */

// ---------------------------------------------------------------------------
// Toast (ui.shadcn.com/docs/components/base/toast). The documented recipe wraps
// Base UI's toast manager behind `toast.add` with title, description, type, and
// actionProps, plus a `Toaster` with a built-in status-icon renderer that
// recognizes success, info, warning, error, and loading.
// ---------------------------------------------------------------------------

const toast = Toast.createToastManager();

const toastTypeIcons = {
  success: CircleCheckIcon,
  info: InfoIcon,
  warning: TriangleAlertIcon,
  error: OctagonXIcon,
  loading: Loader2Icon,
} satisfies Record<string, React.ComponentType<{ className?: string }>>;

function Toaster() {
  return (
    <Toast.Provider toastManager={toast} timeout={0}>
      <ToasterViewport />
    </Toast.Provider>
  );
}

function ToasterViewport() {
  const { toasts } = Toast.useToastManager();
  return (
    <Toast.Portal>
        <Toast.Viewport className="fixed bottom-4 right-4 z-50 flex w-80 flex-col gap-2">
          {toasts.map((item) => {
            const TypeIcon = item.type ? toastTypeIcons[item.type as keyof typeof toastTypeIcons] : undefined;
            return (
              <Toast.Root
                key={item.id}
                toast={item}
                className="rounded-lg border border-border bg-popover p-4 text-popover-foreground"
              >
                <Toast.Content>
                  <div className="flex items-start gap-2.5">
                    {TypeIcon ? <TypeIcon className="mt-0.5 size-4 shrink-0" /> : null}
                    <div className="grid gap-1">
                      <Toast.Title className="text-sm font-semibold" />
                      <Toast.Description className="text-sm text-muted-foreground" />
                    </div>
                  </div>
                  <Toast.Action className="mt-3 rounded-md border border-border px-3 py-1.5 text-sm" />
                </Toast.Content>
              </Toast.Root>
            );
          })}
        </Toast.Viewport>
      </Toast.Portal>
  );
}

// ---------------------------------------------------------------------------
// Questionnaire (ui.shadcn.com/docs/components/base/questionnaire). The
// documented recipe is a styled copy-paste wrapper over the headless
// `@shadcn/react/questionnaire` parts: Questionnaire owns the ordered items,
// active item, answer state, validation, progress, and navigation, and the
// styled parts below give each its documented markup and look.
// ---------------------------------------------------------------------------

type QuestionnaireNavProps = React.ComponentProps<typeof QuestionnairePrimitive.Next> &
  Pick<React.ComponentProps<typeof Button>, "variant" | "size">;

function Questionnaire({ className, ...props }: React.ComponentProps<typeof QuestionnairePrimitive.Root>) {
  return <QuestionnairePrimitive.Root {...props} className={cn("grid w-full gap-6", className)} />;
}

function QuestionnaireProgress({ className, ...props }: React.ComponentProps<typeof QuestionnairePrimitive.Progress>) {
  return (
    <QuestionnairePrimitive.Progress
      {...props}
      className={cn("h-1.5 w-full overflow-hidden rounded-full bg-muted", className)}
      render={(progressProps, state) => (
        <div {...(progressProps as React.ComponentPropsWithoutRef<"div">)}>
          <div
            className="h-full rounded-full bg-primary"
            style={{ width: `${state.total ? Math.round((state.current / state.total) * 100) : 0}%` }}
          />
        </div>
      )}
    />
  );
}

function QuestionnaireItem({ className, ...props }: React.ComponentProps<typeof QuestionnairePrimitive.Item>) {
  return (
    <QuestionnairePrimitive.Item
      {...props}
      className={cn("grid min-w-0 gap-3 border-0 p-0 text-sm", className)}
    />
  );
}

function QuestionnaireTitle({ className, ...props }: React.ComponentProps<typeof QuestionnairePrimitive.Title>) {
  return <QuestionnairePrimitive.Title {...props} className={cn("text-base font-medium", className)} />;
}

function QuestionnaireDescription({
  className,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Description>) {
  return (
    <QuestionnairePrimitive.Description {...props} className={cn("text-sm text-muted-foreground", className)} />
  );
}

function QuestionnaireChoices({ className, ...props }: React.ComponentProps<typeof QuestionnairePrimitive.Choices>) {
  return <QuestionnairePrimitive.Choices {...props} className={cn("grid gap-2", className)} />;
}

function QuestionnaireChoice({ children, className, ...props }: React.ComponentProps<typeof QuestionnairePrimitive.Choice>) {
  return (
    <QuestionnairePrimitive.Choice
      {...props}
      className={cn("flex items-start gap-3 rounded-md border border-border p-3", className)}
    >
      <QuestionnairePrimitive.ChoiceInput className="mt-0.5 size-4" style={{ accentColor: "var(--primary)" }} />
      <QuestionnairePrimitive.ChoiceLabel className="flex flex-col gap-0.5">{children}</QuestionnairePrimitive.ChoiceLabel>
    </QuestionnairePrimitive.Choice>
  );
}

function QuestionnaireInput({ className, ...props }: React.ComponentProps<typeof QuestionnairePrimitive.Input>) {
  return (
    <QuestionnairePrimitive.Input
      {...props}
      className={cn(
        "mt-1 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm placeholder:text-muted-foreground",
        className,
      )}
    />
  );
}

function QuestionnaireError({ className, ...props }: React.ComponentProps<typeof QuestionnairePrimitive.Error>) {
  return <QuestionnairePrimitive.Error {...props} className={cn("text-sm text-destructive", className)} />;
}

function QuestionnaireActions({ className, ...props }: React.ComponentProps<"div">) {
  return <div {...props} className={cn("flex items-center gap-2", className)} />;
}

function QuestionnairePrevious({ variant = "outline", size = "sm", ...props }: QuestionnaireNavProps) {
  return <QuestionnairePrimitive.Previous {...props} render={<Button variant={variant} size={size} />} />;
}

function QuestionnaireSkip({ variant = "ghost", size = "sm", ...props }: QuestionnaireNavProps) {
  return <QuestionnairePrimitive.Skip {...props} render={<Button variant={variant} size={size} />} />;
}

function QuestionnaireNext({ variant = "default", size = "sm", ...props }: QuestionnaireNavProps) {
  return <QuestionnairePrimitive.Next {...props} render={<Button variant={variant} size={size} />} />;
}

function QuestionnaireSubmit({ variant = "default", size = "sm", ...props }: QuestionnaireNavProps) {
  return <QuestionnairePrimitive.Submit {...props} render={<Button variant={variant} size={size} />} />;
}

// ---------------------------------------------------------------------------
// Typeset (ui.shadcn.com/docs/typeset). Typeset is one CSS file you own: a
// `typeset` container class driven by three rhythm controls — size, leading,
// and flow — with preset classes per context. The documented stylesheet and
// preset are reproduced here so the story renders on the same API.
// ---------------------------------------------------------------------------

const typesetStylesheet = `
.typeset {
  --typeset-font-body: inherit;
  --typeset-font-heading: inherit;
  --typeset-font-mono: ui-monospace, SFMono-Regular, Menlo, monospace;
  --typeset-size: 1em;
  --typeset-leading: 1.75;
  --typeset-flow: 1.25em;
  font-family: var(--typeset-font-body);
  font-size: var(--typeset-size);
  line-height: var(--typeset-leading);
}
.typeset-docs {
  --typeset-size: 15px;
  --typeset-leading: 1.75;
  --typeset-flow: 1.4em;
}
.typeset :where(h1, h2, h3, h4, h5, h6) {
  font-family: var(--typeset-font-heading);
  font-size: calc(var(--typeset-size) * 1.375);
  line-height: 1.3;
  font-weight: 600;
}
.typeset :where(h1) { font-size: calc(var(--typeset-size) * 1.75); margin-block-start: calc(var(--typeset-flow) * 2); }
.typeset :where(h2) { margin-block-start: calc(var(--typeset-flow) * 1.75); }
.typeset :where(h3) { font-size: calc(var(--typeset-size) * 1.125); margin-block-start: calc(var(--typeset-flow) * 1.5); }
.typeset :where(p, ul, ol, blockquote, pre, table, hr) { margin-block-start: var(--typeset-flow); }
.typeset :where(ul, ol) { padding-inline-start: calc(var(--typeset-flow) * 1.25); }
.typeset :where(li) { margin-block-start: calc(var(--typeset-flow) * 0.4); }
.typeset :where(code, kbd, pre) { font-family: var(--typeset-font-mono); }
.typeset :where(code) { font-size: 0.9em; }
.typeset :where(blockquote) { border-inline-start: 2px solid var(--border); padding-inline-start: var(--typeset-flow); color: var(--muted-foreground); }
.typeset :where(hr) { border: 0; border-block-start: 1px solid var(--border); }
.typeset :where(a) { color: var(--primary); text-underline-offset: 0.2em; }
.typeset :where(table) { width: 100%; border-collapse: collapse; font-size: 0.925em; }
.typeset :where(th, td) { padding: calc(var(--typeset-flow) * 0.35) 0.5em; border-block-end: 1px solid var(--border); text-align: start; }
.typeset-scroll { overflow-x: auto; }
`;

// ---------------------------------------------------------------------------

const CommandStory: StoryRender = ({ sample }) => (
  <Command className="w-full max-w-sm rounded-lg border border-border">
    <CommandInput placeholder={sample.placeholder ?? "Search the workspace…"} />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Jump to">
        <CommandItem>
          <BookOpenIcon />
          Component index
          <CommandShortcut>G C</CommandShortcut>
        </CommandItem>
        <CommandItem>
          <CalendarIcon />
          Release calendar
          <CommandShortcut>G R</CommandShortcut>
        </CommandItem>
        <CommandItem>
          <CreditCardIcon />
          Billing
          <CommandShortcut>G B</CommandShortcut>
        </CommandItem>
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Actions">
        <CommandItem>
          <GitBranchIcon />
          New preview run
          <CommandShortcut>⌘ N</CommandShortcut>
        </CommandItem>
        <CommandItem>
          <SettingsIcon />
          Workspace settings
          <CommandShortcut>⌘ ,</CommandShortcut>
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>
);

const AlertStory: StoryRender = ({ sample }) => (
  <div className="grid w-full max-w-xl gap-3">
    <Alert>
      <CircleCheckIcon />
      <AlertTitle>{sample.title1 ?? "Trial ends in 5 days"}</AlertTitle>
      <AlertDescription>
        Your trial runs through October 15. Add a payment method to keep preview generation running.
      </AlertDescription>
    </Alert>
    <Alert variant="destructive">
      <TriangleAlertIcon />
      <AlertTitle>{sample.title2 ?? "Preview build failed"}</AlertTitle>
      <AlertDescription>
        The screenshot run for shadcn-ui/Button exited before rendering. Re-run the build to regenerate it.
      </AlertDescription>
    </Alert>
  </div>
);

const ToastStory: StoryRender = ({ sample }) => {
  React.useEffect(() => {
    const deploymentId = toast.add({
      type: "success",
      title: sample.title ?? "Deployment complete",
      description: "checkout-service v2.4.1 is live in production.",
      actionProps: {
        children: "View logs",
        onClick: () => toast.close(deploymentId),
      },
    });
    const buildId = toast.add({
      type: "error",
      title: "Build failed",
      description: "The typecheck step failed in 3 files on main.",
    });
    return () => {
      toast.close(deploymentId);
      toast.close(buildId);
    };
  }, [sample.title]);
  return <Toaster />;
};

const SonnerStory: StoryRender = ({ sample }) => {
  React.useEffect(() => {
    const savedId = sonnerToast.success(sample.title ?? "Settings saved", {
      description: "Preview themes now apply to every generated screenshot.",
      duration: 600000,
    });
    const inviteId = sonnerToast.info("Invite sent", {
      description: "priya@acme.dev can now edit the Acme workspace.",
      duration: 600000,
    });
    return () => {
      sonnerToast.dismiss(savedId);
      sonnerToast.dismiss(inviteId);
    };
  }, [sample.title]);
  return (
    <div className="flex w-full max-w-md items-center justify-between gap-4">
      <div>
        <p className="text-sm font-medium">Deploy alerts</p>
        <p className="text-sm text-muted-foreground">Post a notification when a preview finishes.</p>
      </div>
      <Button
        onClick={() =>
          sonnerToast.success("Settings saved", {
            description: "Preview themes now apply to every generated screenshot.",
            duration: 600000,
          })
        }
      >
        Save changes
      </Button>
      <SonnerToaster />
    </div>
  );
};

const ProgressStory: StoryRender = ({ sample }) => (
  <div className="grid w-full max-w-md gap-2">
    <div className="flex items-baseline justify-between text-sm">
      <p className="font-medium">{sample.label ?? "Restoring workspace"}</p>
      <p className="text-muted-foreground">64%</p>
    </div>
    <Progress value={64} aria-label="Restore progress" />
    <p className="text-sm text-muted-foreground">18 of 28 collections imported from the archive.</p>
  </div>
);

const SpinnerStory: StoryRender = ({ sample }) => (
  <div className="flex items-center gap-3">
    <Button disabled>
      <Spinner />
      {sample.label ?? "Deploying…"}
    </Button>
    <p className="text-sm text-muted-foreground">checkout-service v2.4.1 is rolling out to production.</p>
  </div>
);

const EmptyStory: StoryRender = ({ sample }) => (
  <Empty className="w-full">
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <FolderIcon />
      </EmptyMedia>
      <EmptyTitle>{sample.title ?? "No projects yet"}</EmptyTitle>
      <EmptyDescription>Create a project to start comparing UI libraries in real scenes.</EmptyDescription>
    </EmptyHeader>
    <EmptyContent>
      <div className="flex gap-2">
        <Button>New project</Button>
        <Button variant="outline">Import from GitHub</Button>
      </div>
    </EmptyContent>
  </Empty>
);

const AvatarStory: StoryRender = ({ sample }) => (
  <div className="flex w-full max-w-md items-center gap-4">
    <Avatar size="lg">
      <AvatarImage src="/brand/col-mark.png" alt="Col workspace" />
      <AvatarFallback>CO</AvatarFallback>
    </Avatar>
    <div>
      <p className="text-sm font-medium">{sample.name ?? "Col design system"}</p>
      <p className="text-sm text-muted-foreground">Reviewers</p>
    </div>
    <AvatarGroup className="ml-auto">
      <Avatar>
        <AvatarFallback>PR</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>SK</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>MA</AvatarFallback>
      </Avatar>
      <AvatarGroupCount>+5</AvatarGroupCount>
    </AvatarGroup>
  </div>
);

const invoiceRows = [
  { id: "INV-2291", status: "Paid", method: "Visa •••• 4242", amount: "$4,820.00" },
  { id: "INV-2292", status: "Pending", method: "Mastercard •••• 8210", amount: "$1,260.00" },
  { id: "INV-2293", status: "Overdue", method: "Wire transfer", amount: "$9,340.00" },
  { id: "INV-2294", status: "Paid", method: "Visa •••• 4242", amount: "$620.00" },
];

const TableStory: StoryRender = ({ sample }) => (
  <Table className="w-full">
    <TableCaption>{sample.caption ?? "October invoices for the Acme workspace."}</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead>Invoice</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Method</TableHead>
        <TableHead className="text-right">Amount</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {invoiceRows.map((invoice) => (
        <TableRow key={invoice.id}>
          <TableCell className="font-medium">{invoice.id}</TableCell>
          <TableCell>{invoice.status}</TableCell>
          <TableCell className="text-muted-foreground">{invoice.method}</TableCell>
          <TableCell className="text-right">{invoice.amount}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

type Deployment = {
  id: string;
  service: string;
  environment: string;
  status: string;
  buildSeconds: number;
};

const deploymentRows: Deployment[] = [
  { id: "dpl_8f2", service: "checkout-service", environment: "Production", status: "Live", buildSeconds: 134 },
  { id: "dpl_7c1", service: "preview-web", environment: "Preview", status: "Live", buildSeconds: 96 },
  { id: "dpl_6b9", service: "billing-worker", environment: "Staging", status: "Rolled back", buildSeconds: 212 },
  { id: "dpl_5a4", service: "docs-site", environment: "Production", status: "Live", buildSeconds: 71 },
  { id: "dpl_4e8", service: "auth-gateway", environment: "Staging", status: "Failed", buildSeconds: 158 },
];

function formatBuildTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  return minutes > 0 ? `${minutes}m ${totalSeconds % 60}s` : `${totalSeconds}s`;
}

const deploymentFeatures = tableFeatures({
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
  sortFns: { basic: sortFn_basic, text: sortFn_text },
});

type DeploymentFeatures = typeof deploymentFeatures;

const deploymentColumnHelper = createColumnHelper<DeploymentFeatures, Deployment>();

const deploymentColumns: ColumnDef<DeploymentFeatures, Deployment>[] = deploymentColumnHelper.columns([
  deploymentColumnHelper.accessor("service", { header: "Service", sortFn: "text" }),
  deploymentColumnHelper.accessor("environment", { header: "Environment", sortFn: "text" }),
  deploymentColumnHelper.accessor("status", { header: "Status", sortFn: "text" }),
  deploymentColumnHelper.accessor("buildSeconds", {
    sortFn: "basic",
    header: ({ column }) => {
      const sorted = column.getIsSorted();
      return (
        <button
          type="button"
          onClick={column.getToggleSortingHandler()}
          className="inline-flex items-center gap-2 font-medium"
        >
          Build time
          {sorted === "asc" ? (
            <ArrowUpIcon className="size-3.5" />
          ) : sorted === "desc" ? (
            <ArrowDownIcon className="size-3.5" />
          ) : (
            <ArrowUpDownIcon className="size-3.5 opacity-50" />
          )}
        </button>
      );
    },
    cell: ({ row }) => <div className="text-right">{formatBuildTime(row.original.buildSeconds)}</div>,
  }),
]);

const DataTableStory: StoryRender = ({ sample }) => {
  const table = useTable({
    features: deploymentFeatures,
    data: deploymentRows,
    columns: deploymentColumns,
    initialState: { sorting: [{ id: "buildSeconds", desc: true }] },
  });
  return (
    <div className="w-full">
      <p className="mb-3 text-sm font-medium">{sample.title ?? "Recent deployments"}</p>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className={header.column.id === "buildSeconds" ? "text-right" : undefined}>
                  {header.isPlaceholder ? null : <table.FlexRender header={header} />}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getAllCells().map((cell) => (
                <TableCell key={cell.id} className={cell.column.id === "buildSeconds" ? "text-right" : undefined}>
                  <table.FlexRender cell={cell} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const revenueData = [
  { month: "May", revenue: 32400, cost: 21800 },
  { month: "Jun", revenue: 35100, cost: 22400 },
  { month: "Jul", revenue: 38900, cost: 23100 },
  { month: "Aug", revenue: 41200, cost: 24800 },
  { month: "Sep", revenue: 45600, cost: 25900 },
  { month: "Oct", revenue: 48210, cost: 26400 },
];

const revenueConfig = {
  revenue: { label: "Revenue", color: "var(--primary)" },
  cost: { label: "Cost", color: "var(--muted-foreground)" },
} satisfies ChartConfig;

const ChartStory: StoryRender = ({ sample }) => (
  <div className="w-full max-w-xl">
    <p className="text-sm font-medium">{sample.title ?? "Monthly revenue"}</p>
    <p className="text-sm text-muted-foreground">Last 6 months, stacked against operating cost.</p>
    <ChartContainer config={revenueConfig} className="mt-3 aspect-video w-full">
      <AreaChart data={revenueData} margin={{ left: 8, right: 8 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Area dataKey="cost" type="natural" stackId="a" fill="var(--color-cost)" fillOpacity={0.5} stroke="var(--color-cost)" />
        <Area
          dataKey="revenue"
          type="natural"
          stackId="a"
          fill="var(--color-revenue)"
          fillOpacity={0.6}
          stroke="var(--color-revenue)"
        />
      </AreaChart>
    </ChartContainer>
  </div>
);

const testimonials = [
  {
    quote: "Col's preview scenes settled a week of design debate in one meeting. We shipped the redesign the same day.",
    name: "Priya Raman",
    role: "Design lead at Northwind",
  },
  {
    quote: "We compared eleven libraries against our own content before writing a single line of migration code.",
    name: "Marcus Webb",
    role: "Staff engineer at Acme",
  },
  {
    quote: "The MCP previews show up right in our agent threads. Reviewing components is finally a two-minute job.",
    name: "Sofia Lindqvist",
    role: "Frontend architect at Helio",
  },
];

const CarouselStory: StoryRender = ({ sample }) => (
  <div className="w-full max-w-md px-12">
    <Carousel className="w-full">
      <CarouselContent>
        {testimonials.map((testimonial, index) => (
          <CarouselItem key={testimonial.name}>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm">{index === 0 ? sample.quote1 ?? testimonial.quote : testimonial.quote}</p>
                <p className="mt-4 text-sm text-muted-foreground">
                  {testimonial.name} · {testimonial.role}
                </p>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  </div>
);

const AspectRatioStory: StoryRender = ({ sample }) => (
  <div className="w-full max-w-md">
    <AspectRatio ratio={16 / 9}>
      <img
        src="/col-social-preview.jpg"
        alt="Col workspace banner"
        className="h-full w-full rounded-md object-cover"
      />
    </AspectRatio>
    <p className="mt-2 text-sm text-muted-foreground">
      {sample.caption ?? "Featured library cover, held at 16:9 on every screen."}
    </p>
  </div>
);

const TypesetStory: StoryRender = ({ sample }) => (
  <div className="w-full max-w-xl">
    <style>{typesetStylesheet}</style>
    <article className="typeset typeset-docs">
      <h2>{sample.title ?? "Reading rhythm from three controls"}</h2>
      <p>
        Typeset is one CSS file that styles everything inside a <code>typeset</code> container. Size, leading, and flow
        drive the whole reading rhythm — heading sizes and block spacing derive from them.
      </p>
      <h3>What the controls set</h3>
      <ul>
        <li>
          <code>--typeset-size</code> sets the base text size and follows the surrounding layout.
        </li>
        <li>
          <code>--typeset-leading</code> sets the space between lines.
        </li>
        <li>
          <code>--typeset-flow</code> sets the space between blocks.
        </li>
      </ul>
      <h3>Where each preset fits</h3>
      <div className="typeset-scroll">
        <table>
          <thead>
            <tr>
              <th>Preset</th>
              <th>Size</th>
              <th>Flow</th>
              <th>Best for</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>typeset-docs</td>
              <td>15px</td>
              <td>1.4em</td>
              <td>Articles and documentation</td>
            </tr>
            <tr>
              <td>typeset-chat</td>
              <td>1em</td>
              <td>1em</td>
              <td>Streaming assistant replies</td>
            </tr>
          </tbody>
        </table>
      </div>
    </article>
  </div>
);

const ItemStory: StoryRender = () => (
  <ItemGroup className="w-full max-w-md">
    <Item>
      <ItemMedia variant="icon">
        <GitBranchIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Repository sync</ItemTitle>
        <ItemDescription>Import registries from screen-gd/col every hour.</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button variant="outline" size="sm">
          Connect
        </Button>
      </ItemActions>
    </Item>
    <ItemSeparator />
    <Item>
      <ItemMedia variant="icon">
        <BellIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Preview alerts</ItemTitle>
        <ItemDescription>Notify this workspace when a screenshot run fails.</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button variant="outline" size="sm">
          Configure
        </Button>
      </ItemActions>
    </Item>
    <ItemSeparator />
    <Item>
      <ItemMedia variant="icon">
        <MailIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Weekly digest</ItemTitle>
        <ItemDescription>Send the component coverage report every Monday.</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button variant="outline" size="sm">
          Enabled
        </Button>
      </ItemActions>
    </Item>
  </ItemGroup>
);

const KbdStory: StoryRender = ({ sample }) => (
  <div className="flex w-full max-w-md items-center justify-between gap-4">
    <div>
      <p className="text-sm font-medium">{sample.label ?? "Command menu"}</p>
      <p className="text-sm text-muted-foreground">Search components and previews from anywhere.</p>
    </div>
    <KbdGroup>
      <Kbd>Ctrl</Kbd>
      <Kbd>K</Kbd>
    </KbdGroup>
  </div>
);

const CollapsibleStory: StoryRender = ({ sample }) => (
  <Collapsible defaultOpen className="w-full max-w-md">
    <CollapsibleTrigger className="flex w-full items-center justify-between gap-4 px-1 py-2 text-sm font-medium">
      {sample.label ?? "v2.4 migration notes"}
      <ChevronsUpDownIcon className="size-4 text-muted-foreground" />
    </CollapsibleTrigger>
    <CollapsibleContent className="px-1 pt-2 text-sm text-muted-foreground">
      Badge and Tabs now read their variants from the theme tokens. The old size helpers are gone — pass
      <code> size</code> props where you composed custom headers.
    </CollapsibleContent>
  </Collapsible>
);

const ToggleStory: StoryRender = ({ sample }) => (
  <div className="grid gap-2">
    <p className="text-sm font-medium">{sample.label ?? "Text style"}</p>
    <div className="flex items-center gap-1">
      <Toggle defaultPressed variant="outline" aria-label="Toggle bold">
        <BoldIcon />
      </Toggle>
      <Toggle variant="outline" aria-label="Toggle italic">
        <ItalicIcon />
      </Toggle>
      <Toggle variant="outline" aria-label="Toggle underline">
        <UnderlineIcon />
      </Toggle>
    </div>
  </div>
);

const PaginationStory: StoryRender = () => (
  <div className="w-full max-w-md">
    <p className="mb-3 text-sm text-muted-foreground">Showing 25–48 of 248 documented components.</p>
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">12</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  </div>
);

function DirectionReadout() {
  const direction = useDirection();
  return <p className="mt-3 text-xs text-muted-foreground">Current direction: {direction}</p>;
}

const DirectionStory: StoryRender = ({ sample }) => (
  <DirectionProvider dir="rtl" direction="rtl">
    <div className="w-full max-w-xs">
      <div dir="rtl">
        <p className="text-sm font-medium">{sample.title ?? "إعدادات الحساب"}</p>
        <ul className="mt-2 grid gap-2 text-sm text-muted-foreground">
          <li>الإشعارات</li>
          <li>الفواتير</li>
          <li>الأمان</li>
        </ul>
      </div>
      <DirectionReadout />
    </div>
  </DirectionProvider>
);

const AttachmentStory: StoryRender = () => (
  <div className="grid w-full max-w-sm gap-2">
    <Attachment>
      <AttachmentMedia>
        <FileTextIcon />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>sales-dashboard.pdf</AttachmentTitle>
        <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label="Download sales-dashboard.pdf">
          <DownloadIcon />
        </AttachmentAction>
        <AttachmentAction aria-label="Remove sales-dashboard.pdf">
          <XIcon />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
    <Attachment state="uploading">
      <AttachmentMedia>
        <FileCodeIcon />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>message-renderer.tsx</AttachmentTitle>
        <AttachmentDescription>Uploading · 64%</AttachmentDescription>
      </AttachmentContent>
    </Attachment>
    <Attachment state="error">
      <AttachmentMedia>
        <FileCodeIcon />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>financial-model.xlsx</AttachmentTitle>
        <AttachmentDescription>Upload failed. Try again.</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label="Retry financial-model.xlsx">
          <RotateCcwIcon />
        </AttachmentAction>
        <AttachmentAction aria-label="Remove financial-model.xlsx">
          <XIcon />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
  </div>
);

const BubbleStory: StoryRender = ({ sample }) => (
  <BubbleGroup className="w-full max-w-md gap-5">
    <Bubble variant="secondary">
      <BubbleContent>Can you pull the error from last night's preview run?</BubbleContent>
    </Bubble>
    <Bubble align="end">
      <BubbleContent>
        {sample.text1 ?? "Found it — the chart container rendered before hydration finished."}
      </BubbleContent>
    </Bubble>
    <Bubble variant="secondary">
      <BubbleContent>Fix is in PR #812. Tests passed on the first try, all 142 of them.</BubbleContent>
      <BubbleReactions role="img" aria-label="Reactions: thumbs up, fire, and 3 more">
        <span>👍</span>
        <span>🔥</span>
        <span>+3</span>
      </BubbleReactions>
    </Bubble>
  </BubbleGroup>
);

const MarkerStory: StoryRender = () => (
  <div className="grid w-full max-w-md gap-3">
    <Marker variant="separator">
      <MarkerContent>Today</MarkerContent>
    </Marker>
    <Marker>
      <MarkerIcon>
        <GitBranchIcon />
      </MarkerIcon>
      <MarkerContent>Switched to release-candidate</MarkerContent>
    </Marker>
    <Marker variant="border">
      <MarkerIcon>
        <FileTextIcon />
      </MarkerIcon>
      <MarkerContent>Opened implementation notes</MarkerContent>
    </Marker>
    <Marker>
      <MarkerIcon>
        <CircleCheckIcon />
      </MarkerIcon>
      <MarkerContent>Reviewed 8 related files</MarkerContent>
    </Marker>
  </div>
);

const MessageStory: StoryRender = ({ sample }) => (
  <MessageGroup className="w-full max-w-md">
    <Message>
      <MessageAvatar>
        <Avatar>
          <AvatarFallback>PR</AvatarFallback>
        </Avatar>
      </MessageAvatar>
      <MessageContent>
        <MessageHeader>Priya</MessageHeader>
        <Bubble variant="secondary">
          <BubbleContent>Can you share the exact error from the preview run?</BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
    <Message align="end">
      <MessageContent>
        <Bubble>
          <BubbleContent>{sample.text1 ?? "It's the chart container — fixed in PR #812."}</BubbleContent>
        </Bubble>
        <MessageFooter>Delivered · 4:55 PM</MessageFooter>
      </MessageContent>
    </Message>
  </MessageGroup>
);

type TranscriptRow =
  | { id: string; marker: string }
  | { id: string; sender: string; initials: string; text: string; align: "start" | "end" };

const transcriptRows: TranscriptRow[] = [
  { id: "msg-1", marker: "Today" },
  {
    id: "msg-2",
    sender: "Priya",
    initials: "PR",
    text: "The scroll behavior in the chat is jumping around while the reply streams.",
    align: "start",
  },
  {
    id: "msg-3",
    sender: "You",
    initials: "YO",
    text: "That's the auto-scroll fighting the reader. The scroller should follow only while you're at the live edge.",
    align: "end",
  },
  {
    id: "msg-4",
    sender: "Priya",
    initials: "PR",
    text: "So anchoring moves the new turn near the top and keeps a peek of the previous one?",
    align: "start",
  },
  {
    id: "msg-5",
    sender: "You",
    initials: "YO",
    text: "Exactly. And new messages that arrive while you scroll up come in offscreen — the jump-to-latest button lights up instead.",
    align: "end",
  },
];

const MessageScrollerStory: StoryRender = () => (
  <div className="h-80 w-full max-w-md">
    <MessageScrollerProvider>
      <MessageScroller>
        <MessageScrollerViewport>
          <MessageScrollerContent>
            {transcriptRows.map((row) => (
              <MessageScrollerItem key={row.id} messageId={row.id} scrollAnchor={"sender" in row && row.align === "end"}>
                {"marker" in row ? (
                  <Marker variant="separator">
                    <MarkerContent>{row.marker}</MarkerContent>
                  </Marker>
                ) : (
                  <Message align={row.align}>
                    {row.align === "start" ? (
                      <MessageAvatar>
                        <Avatar>
                          <AvatarFallback>{row.initials}</AvatarFallback>
                        </Avatar>
                      </MessageAvatar>
                    ) : null}
                    <MessageContent>
                      {row.align === "start" ? <MessageHeader>{row.sender}</MessageHeader> : null}
                      <Bubble variant={row.align === "end" ? "default" : "secondary"}>
                        <BubbleContent>{row.text}</BubbleContent>
                      </Bubble>
                    </MessageContent>
                  </Message>
                )}
              </MessageScrollerItem>
            ))}
          </MessageScrollerContent>
        </MessageScrollerViewport>
        <MessageScrollerButton />
      </MessageScroller>
    </MessageScrollerProvider>
  </div>
);

type StoryChoice = { value: string; label: string; description?: string };

type StoryQuestion = {
  name: string;
  required?: boolean;
  prompt: string;
  description: string;
  choices: readonly StoryChoice[];
  input?: { label: string; placeholder: string };
};

const questionnaireItems: readonly StoryQuestion[] = [
  {
    name: "direction",
    required: true,
    prompt: "Which library should the preview cover next?",
    description: "Choose a direction or write your own.",
    choices: [
      {
        value: "charts",
        label: "Chart libraries",
        description: "Show data visualisation components in a dashboard scene.",
      },
      {
        value: "forms",
        label: "Form libraries",
        description: "Show inputs and validation in a signup flow.",
      },
      { value: "motion", label: "Motion libraries" },
    ],
    input: { label: "Another answer", placeholder: "Type another answer…" },
  },
  {
    name: "detail",
    required: false,
    prompt: "How much detail should the write-up include?",
    description: "Skip this if you are not sure yet.",
    choices: [
      { value: "focused", label: "Focused" },
      { value: "complete", label: "Complete flow" },
    ],
  },
];

const QuestionnaireStory: StoryRender = ({ sample }) => (
  <Questionnaire
    className="max-w-lg"
    items={questionnaireItems}
    onSubmit={(event: React.FormEvent<HTMLFormElement>) => event.preventDefault()}
  >
    <QuestionnaireProgress />
    {questionnaireItems.map((question, questionIndex) => (
      <QuestionnaireItem key={question.name} name={question.name} required={question.required}>
        <QuestionnaireTitle>
          {questionIndex === 0 ? sample.prompt1 ?? question.prompt : question.prompt}
        </QuestionnaireTitle>
        <QuestionnaireDescription>{question.description}</QuestionnaireDescription>
        <QuestionnaireChoices>
          {question.choices.map((choice, choiceIndex) => (
            <QuestionnaireChoice
              key={choice.value}
              value={choice.value}
              defaultChecked={questionIndex === 0 && choiceIndex === 0}
            >
              <span className="font-medium">{choice.label}</span>
              {choice.description ? <span className="text-muted-foreground">{choice.description}</span> : null}
            </QuestionnaireChoice>
          ))}
          {question.input ? (
            <QuestionnaireInput aria-label={question.input.label} placeholder={question.input.placeholder} />
          ) : null}
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>
    ))}
    <QuestionnaireActions>
      <QuestionnairePrevious />
      <QuestionnaireSkip />
      <QuestionnaireNext />
      <QuestionnaireSubmit />
    </QuestionnaireActions>
  </Questionnaire>
);

export const storyRenders: Record<string, StoryRender> = {
  "shadcn-ui/Command": CommandStory,
  "shadcn-ui/Alert": AlertStory,
  "shadcn-ui/Toast": ToastStory,
  "shadcn-ui/Sonner": SonnerStory,
  "shadcn-ui/Progress": ProgressStory,
  "shadcn-ui/Spinner": SpinnerStory,
  "shadcn-ui/Empty": EmptyStory,
  "shadcn-ui/Avatar": AvatarStory,
  "shadcn-ui/Table": TableStory,
  "shadcn-ui/Data Table": DataTableStory,
  "shadcn-ui/Chart": ChartStory,
  "shadcn-ui/Carousel": CarouselStory,
  "shadcn-ui/Aspect Ratio": AspectRatioStory,
  "shadcn-ui/Typeset": TypesetStory,
  "shadcn-ui/Item": ItemStory,
  "shadcn-ui/Kbd": KbdStory,
  "shadcn-ui/Collapsible": CollapsibleStory,
  "shadcn-ui/Toggle": ToggleStory,
  "shadcn-ui/Pagination": PaginationStory,
  "shadcn-ui/Direction": DirectionStory,
  "shadcn-ui/Attachment": AttachmentStory,
  "shadcn-ui/Bubble": BubbleStory,
  "shadcn-ui/Marker": MarkerStory,
  "shadcn-ui/Message": MessageStory,
  "shadcn-ui/Message Scroller": MessageScrollerStory,
  "shadcn-ui/Questionnaire": QuestionnaireStory,
};
