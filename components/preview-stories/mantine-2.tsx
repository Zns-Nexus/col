import * as React from "react";
import {
  Accordion,
  ActionIcon,
  Affix,
  Alert,
  Anchor,
  AppShell,
  AspectRatio,
  Autocomplete,
  Avatar,
  Badge,
  Box,
  Button,
  Center,
  Checkbox,
  Chip,
  Combobox,
  ComboboxPopover,
  DataList,
  Divider,
  Drawer,
  EmptyState,
  Fieldset,
  Grid,
  Group,
  HoverCard,
  Indicator,
  InputBase,
  Menu,
  Menubar,
  MantineProvider,
  Modal,
  MultiSelect,
  Overlay,
  Pagination,
  Paper,
  Pill,
  PillsInput,
  PinInput,
  Progress,
  Rating,
  RingProgress,
  Select,
  SimpleGrid,
  Skeleton,
  Space,
  Stack,
  TagsInput,
  Text,
  Textarea,
  TextInput,
  Toggle,
  Toolbar,
  Tooltip,
  Tour,
  Transition,
  Typography,
  VisuallyHidden,
  useCombobox,
} from "@mantine/core";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bell,
  Bold,
  Check,
  Copy,
  CreditCard,
  Download,
  Inbox,
  Italic,
  MessageCircle,
  MoreHorizontal,
  Play,
  Search,
  Trash2,
  Underline,
  X,
} from "lucide-react";
import type { StoryRender } from "./type";

/**
 * Preview stories for Mantine (batch 2 of 4): each documented component as the
 * installed `@mantine/core` package documents it, with realistic product
 * content. The preview canvas is true-black, so every story renders inside
 * Mantine's provider forced to the dark color scheme. Overlays hold themselves
 * open (`opened`/`defaultOpened`/`defaultDropdownOpened`) so a screenshot
 * captures the interesting surface, not just the trigger. No stylesheet is
 * imported here: the preview page wires Mantine's CSS at merge time.
 */

type StorySample = Readonly<Record<string, string>>;

/** Wraps a story in Mantine's dark color scheme to stay legible on the black canvas. */
function StoryFrame({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider forceColorScheme="dark">
      <div data-mantine-color-scheme="dark">{children}</div>
    </MantineProvider>
  );
}

const BadgeStory: StoryRender = ({ sample }) => (
  <StoryFrame>
    <Group justify="center" gap="sm">
      <Badge variant="light" color="teal" leftSection={<Check size={12} />}>
        {sample.primaryLabel ?? "Stable release"}
      </Badge>
      <Badge variant="dot" color="yellow">
        Beta
      </Badge>
      <Badge variant="outline">v2.4.0</Badge>
      <Badge variant="light" color="red">
        Deprecated
      </Badge>
    </Group>
  </StoryFrame>
);

const ToggleStory: StoryRender = ({ sample }) => (
  <StoryFrame>
    <Group>
      <Toggle aria-label="Bold" defaultActive>
        <Bold size={16} />
      </Toggle>
      <Toggle aria-label="Italic">
        <Italic size={16} />
      </Toggle>
      <Toggle aria-label="Underline">
        <Underline size={16} />
      </Toggle>
      <Toggle autoWidth defaultActive>
        {sample.toggleLabel ?? "Track changes"}
      </Toggle>
    </Group>
  </StoryFrame>
);

const ToolbarStory: StoryRender = () => (
  <StoryFrame>
    <Toolbar aria-label="Text formatting">
      <Toolbar.Group>
        <Toolbar.Toggle aria-label="Bold">
          <Bold size={16} />
        </Toolbar.Toggle>
        <Toolbar.Toggle active aria-label="Italic">
          <Italic size={16} />
        </Toolbar.Toggle>
      </Toolbar.Group>
      <Toolbar.Divider />
      <Toolbar.ToggleGroup type="single" defaultValue="left">
        <Toolbar.ToggleItem value="left" aria-label="Align left">
          <AlignLeft size={16} />
        </Toolbar.ToggleItem>
        <Toolbar.ToggleItem value="center" aria-label="Align center">
          <AlignCenter size={16} />
        </Toolbar.ToggleItem>
        <Toolbar.ToggleItem value="right" aria-label="Align right">
          <AlignRight size={16} />
        </Toolbar.ToggleItem>
      </Toolbar.ToggleGroup>
    </Toolbar>
  </StoryFrame>
);

const TourStory: StoryRender = ({ sample }) => (
  <StoryFrame>
    <Group>
      <Button id="mantine-tour-invoice">{sample.actionLabel ?? "New invoice"}</Button>
      <Button id="mantine-tour-import" variant="default">
        Import CSV
      </Button>
    </Group>
    <Tour active onClose={() => {}}>
      <Tour.Step target="#mantine-tour-invoice" title="Create invoices">
        Draft, send and track customer invoices without leaving the dashboard.
      </Tour.Step>
      <Tour.Step target="#mantine-tour-import" title="Bring your data">
        Import open invoices from Stripe or a CSV export in one step.
      </Tour.Step>
    </Tour>
  </StoryFrame>
);

const TooltipStory: StoryRender = ({ sample }) => (
  <StoryFrame>
    <Tooltip opened withArrow label={sample.tooltipLabel ?? "Copies the install command"}>
      <Button variant="default">npm install @northwind/ui</Button>
    </Tooltip>
  </StoryFrame>
);

const TransitionStory: StoryRender = ({ sample }) => (
  <StoryFrame>
    <Transition mounted transition="fade-up" duration={250}>
      {(styles) => (
        <Group gap="xs" style={styles}>
          <Check size={18} color="var(--mantine-color-teal-4)" />
          <Text size="sm">{sample.message ?? "Draft saved at 14:32 — ready to send"}</Text>
        </Group>
      )}
    </Transition>
  </StoryFrame>
);

const TypographyStory: StoryRender = ({ sample }) => (
  <StoryFrame>
    <Typography>
      <h2>{sample.heading ?? "How we price invoicing"}</h2>
      <p>
        Northwind Ledger charges per workspace, not per seat. Every plan includes the full invoicing
        toolkit, and paid tiers add team seats and priority support.
      </p>
      <ul>
        <li>Unlimited invoices and quotes on every plan</li>
        <li>Automatic Stripe reconciliation every hour</li>
        <li>32 settlement currencies with daily revaluation</li>
      </ul>
    </Typography>
  </StoryFrame>
);

const VisuallyHiddenStory: StoryRender = ({ sample }) => (
  <StoryFrame>
    <Group>
      <Text size="sm">{sample.message ?? "Deployment finished — pricing page is live"}</Text>
      <ActionIcon variant="default" aria-label="Dismiss">
        <X size={16} />
        <VisuallyHidden>Dismiss the deployment notification</VisuallyHidden>
      </ActionIcon>
    </Group>
  </StoryFrame>
);

const DataListStory: StoryRender = ({ sample }) => (
  <StoryFrame>
    <DataList withDivider>
      <DataList.Item>
        <DataList.ItemLabel>Invoice</DataList.ItemLabel>
        <DataList.ItemValue>INV-2041</DataList.ItemValue>
      </DataList.Item>
      <DataList.Item>
        <DataList.ItemLabel>Customer</DataList.ItemLabel>
        <DataList.ItemValue>{sample.customer ?? "Northwind Traders"}</DataList.ItemValue>
      </DataList.Item>
      <DataList.Item>
        <DataList.ItemLabel>Issued</DataList.ItemLabel>
        <DataList.ItemValue>Oct 1, 2026</DataList.ItemValue>
      </DataList.Item>
      <DataList.Item>
        <DataList.ItemLabel>Due</DataList.ItemLabel>
        <DataList.ItemValue>Oct 31, 2026</DataList.ItemValue>
      </DataList.Item>
      <DataList.Item>
        <DataList.ItemLabel>Total</DataList.ItemLabel>
        <DataList.ItemValue>$12,480.00</DataList.ItemValue>
      </DataList.Item>
    </DataList>
  </StoryFrame>
);

const EmptyStateStory: StoryRender = ({ sample }) => (
  <StoryFrame>
    <EmptyState
      icon={<Inbox size={28} />}
      color="teal"
      title={sample.title ?? "No invoices match these filters"}
      description="Try a wider date range or clear the status filter to see more results."
    >
      <EmptyState.Actions>
        <Button variant="default">Clear filters</Button>
        <Button>Create invoice</Button>
      </EmptyState.Actions>
    </EmptyState>
  </StoryFrame>
);

const DividerStory: StoryRender = ({ sample }) => (
  <StoryFrame>
    <Box w="100%" maw={420}>
      <Text size="sm">Exports include every invoice, receipt and credit note.</Text>
      <Divider my="md" label={sample.dividerLabel ?? "or"} labelPosition="center" />
      <Text size="sm">Schedule a monthly export straight to your accounting inbox.</Text>
      <Divider my="md" />
      <Text size="sm" c="dimmed">
        Exports are kept for 90 days.
      </Text>
    </Box>
  </StoryFrame>
);

const AspectRatioStory: StoryRender = ({ sample }) => (
  <StoryFrame>
    <Box w="100%" maw={480}>
      <AspectRatio ratio={16 / 9}>
        <Center h="100%" bg="dark.6" style={{ borderRadius: "var(--mantine-radius-md)" }}>
          <Play size={28} />
        </Center>
      </AspectRatio>
      <Text size="sm" mt="xs">
        {sample.caption ?? "Watch the 2-minute product overview"}
      </Text>
    </Box>
  </StoryFrame>
);

const OverlayStory: StoryRender = ({ sample }) => (
  <StoryFrame>
    <Box pos="relative" w="100%" maw={440} h={220} style={{ overflow: "hidden", borderRadius: "var(--mantine-radius-md)" }}>
      <Box p="md">
        <Text fw={500}>Revenue forecast</Text>
        <Text size="sm" c="dimmed">
          Projected bookings for Q4 across all regions.
        </Text>
        <Text size="xl" fw={700} mt="sm">
          $182,400
        </Text>
      </Box>
      <Overlay
        gradient="linear-gradient(145deg, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.9) 100%)"
        center
        radius="md"
      >
        <Stack gap="xs" align="center" ta="center">
          <Text size="sm" fw={500}>
            {sample.lockLabel ?? "Included in the Pro plan"}
          </Text>
          <Button size="xs">Upgrade</Button>
        </Stack>
      </Overlay>
    </Box>
  </StoryFrame>
);

const AvatarStory: StoryRender = ({ sample }) => (
  <StoryFrame>
    <Group>
      <Avatar.Group spacing="sm">
        <Avatar name="Priya Raghavan" color="initials" />
        <Avatar name="Marco Lindqvist" color="initials" />
        <Avatar name="Amara Koll" color="initials" />
      </Avatar.Group>
      <Box>
        <Text size="sm" fw={500}>
          {sample.headline ?? "Priya, Marco and Amara reviewed INV-2041"}
        </Text>
        <Text size="sm" c="dimmed">
          Approved 2 hours ago
        </Text>
      </Box>
    </Group>
  </StoryFrame>
);

const AlertStory: StoryRender = ({ sample }) => (
  <StoryFrame>
    <Box w="100%" maw={520}>
      <Alert
        variant="light"
        color="yellow"
        icon={<CreditCard size={18} />}
        title={sample.title ?? "Payment method expires soon"}
      >
        The card ending in 4242 expires on Oct 31. Update it to keep subscriptions active.
      </Alert>
    </Box>
  </StoryFrame>
);

const AffixStory: StoryRender = ({ sample }) => (
  <StoryFrame>
    <Text size="sm" c="dimmed">
      Support stays within reach on every page of the app.
    </Text>
    <Affix position={{ bottom: 20, right: 20 }}>
      <Button leftSection={<MessageCircle size={16} />}>{sample.actionLabel ?? "Chat with support"}</Button>
    </Affix>
  </StoryFrame>
);

const FieldsetStory: StoryRender = ({ sample }) => (
  <StoryFrame>
    <Box w="100%" maw={420}>
      <Fieldset legend={sample.legend ?? "Shipping address"}>
        <TextInput label="Street" defaultValue="14 Harbour Road" />
        <TextInput label="City" mt="sm" defaultValue="Copenhagen" />
        <TextInput label="Postal code" mt="sm" defaultValue="2100" />
      </Fieldset>
    </Box>
  </StoryFrame>
);

const CheckboxStory: StoryRender = ({ sample }) => (
  <StoryFrame>
    <Stack gap="md">
      <Checkbox
        defaultChecked
        label={sample.label ?? "Email digests"}
        description="A weekly summary of invoice activity."
      />
      <Checkbox defaultChecked label="Product updates" description="New features and improvements." />
      <Checkbox label="Security alerts" description="Sign-ins from new devices and regions." />
    </Stack>
  </StoryFrame>
);

const assignees = [
  { value: "priya", label: "Priya Raghavan" },
  { value: "marco", label: "Marco Lindqvist" },
  { value: "amara", label: "Amara Koll" },
  { value: "devon", label: "Devon Reyes" },
];

function AssigneeCombobox({ sample }: { sample: StorySample }) {
  const combobox = useCombobox({ defaultOpened: true });
  const [value, setValue] = React.useState("priya");
  const selected = assignees.find((assignee) => assignee.value === value);

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(nextValue) => {
        setValue(nextValue);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          component="button"
          pointer
          rightSection={<Combobox.Chevron />}
          onClick={() => combobox.toggleDropdown()}
        >
          {selected ? selected.label : sample.placeholder ?? "Pick an assignee"}
        </InputBase>
      </Combobox.Target>
      <Combobox.Dropdown>
        <Combobox.Options>
          {assignees.map((assignee) => (
            <Combobox.Option value={assignee.value} key={assignee.value} selected={assignee.value === value}>
              {assignee.label}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}

const ComboboxStory: StoryRender = ({ sample }) => (
  <StoryFrame>
    <Box w="100%" maw={320}>
      <AssigneeCombobox sample={sample} />
    </Box>
  </StoryFrame>
);

const ModalStory: StoryRender = ({ sample }) => (
  <StoryFrame>
    <Modal opened onClose={() => {}} centered title={sample.title ?? "Invite a team member"}>
      <TextInput label="Work email" placeholder="teammate@northwind.dev" />
      <Text size="sm" c="dimmed" mt="xs">
        They receive an email with a link to this workspace.
      </Text>
      <Group justify="flex-end" mt="md">
        <Button variant="default">Cancel</Button>
        <Button>Send invite</Button>
      </Group>
    </Modal>
  </StoryFrame>
);

const DrawerStory: StoryRender = ({ sample }) => (
  <StoryFrame>
    <Drawer opened onClose={() => {}} position="right" title={sample.title ?? "Invoice INV-2041"}>
      <Text size="sm">Northwind Traders — due Oct 31, 2026.</Text>
      <Text size="sm" c="dimmed" mt="xs">
        Total $12,480.00 · Net 30 terms
      </Text>
      <Group mt="lg">
        <Button>Send reminder</Button>
        <Button variant="default">Download PDF</Button>
      </Group>
    </Drawer>
  </StoryFrame>
);

const AccordionStory: StoryRender = ({ sample }) => (
  <StoryFrame>
    <Accordion defaultValue="billing" w="100%">
      <Accordion.Item value="billing">
        <Accordion.Control>{sample.question ?? "How does billing work?"}</Accordion.Control>
        <Accordion.Panel>
          Plans are billed per workspace each month. The Growth tier adds usage-based pricing above
          50,000 tracked invoices per month.
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="integrations">
        <Accordion.Control>Does it connect to Stripe?</Accordion.Control>
        <Accordion.Panel>
          Yes. Connect a Stripe account and open and paid invoices sync into Ledger every hour.
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="security">
        <Accordion.Control>Where is my data stored?</Accordion.Control>
        <Accordion.Panel>
          Data is encrypted at rest in the EU and backed up daily. Our SOC 2 Type II report is
          available on request.
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  </StoryFrame>
);

const PillStory: StoryRender = ({ sample }) => (
  <StoryFrame>
    <Pill.Group>
      <Pill>{sample.label ?? "billing"}</Pill>
      <Pill withRemoveButton onRemove={() => {}}>
        urgent
      </Pill>
      <Pill withRemoveButton onRemove={() => {}}>
        q4-close
      </Pill>
    </Pill.Group>
  </StoryFrame>
);

const PillsInputStory: StoryRender = ({ sample }) => (
  <StoryFrame>
    <Box w="100%" maw={420}>
      <PillsInput label={sample.label ?? "Allowed domains"}>
        <Pill.Group>
          <Pill withRemoveButton onRemove={() => {}}>
            northwind.dev
          </Pill>
          <Pill withRemoveButton onRemove={() => {}}>
            ledger.app
          </Pill>
          <PillsInput.Field placeholder="add a domain" />
        </Pill.Group>
      </PillsInput>
    </Box>
  </StoryFrame>
);

const AutocompleteStory: StoryRender = ({ sample }) => (
  <StoryFrame>
    <Box w="100%" maw={340}>
      <Autocomplete
        label={sample.label ?? "Jump to project"}
        placeholder="Search projects"
        leftSection={<Search size={16} />}
        data={["Northwind Redesign", "Ledger Mobile App", "Harbour Analytics", "Atlas Design System"]}
        defaultDropdownOpened
      />
    </Box>
  </StoryFrame>
);

const TagsInputStory: StoryRender = ({ sample }) => (
  <StoryFrame>
    <Box w="100%" maw={380}>
      <TagsInput
        label={sample.label ?? "Label this release"}
        placeholder="Add a label"
        defaultValue={["invoice-export", "beta"]}
        data={["billing", "export", "mobile", "regression"]}
        defaultDropdownOpened
      />
    </Box>
  </StoryFrame>
);

const SelectStory: StoryRender = ({ sample }) => (
  <StoryFrame>
    <Box w="100%" maw={320}>
      <Select
        label={sample.label ?? "Billing cycle"}
        data={["Monthly", "Quarterly", "Annual"]}
        defaultValue="Annual"
        defaultDropdownOpened
      />
    </Box>
  </StoryFrame>
);

const MultiSelectStory: StoryRender = ({ sample }) => (
  <StoryFrame>
    <Box w="100%" maw={380}>
      <MultiSelect
        label={sample.label ?? "Assign reviewers"}
        data={["Priya Raghavan", "Marco Lindqvist", "Amara Koll", "Devon Reyes"]}
        defaultValue={["Priya Raghavan", "Marco Lindqvist"]}
        searchable
        defaultDropdownOpened
      />
    </Box>
  </StoryFrame>
);

const invoiceStatuses = [
  { value: "open", label: "Open invoices" },
  { value: "paid", label: "Paid invoices" },
  { value: "overdue", label: "Overdue invoices" },
  { value: "draft", label: "Draft invoices" },
];

function StatusComboboxPopover({ sample }: { sample: StorySample }) {
  const [value, setValue] = React.useState<string | null>("open");
  const selected = invoiceStatuses.find((status) => status.value === value);

  return (
    <ComboboxPopover data={invoiceStatuses} value={value} onChange={setValue} defaultDropdownOpened>
      <ComboboxPopover.Target>
        <Button variant="default">{selected ? selected.label : sample.placeholder ?? "Filter invoices"}</Button>
      </ComboboxPopover.Target>
    </ComboboxPopover>
  );
}

const ComboboxPopoverStory: StoryRender = ({ sample }) => (
  <StoryFrame>
    <StatusComboboxPopover sample={sample} />
  </StoryFrame>
);

const PaginationStory: StoryRender = ({ sample }) => (
  <StoryFrame>
    <Group justify="space-between" w="100%">
      <Text size="sm" c="dimmed">
        {sample.caption ?? "Showing 21–30 of 118 invoices"}
      </Text>
      <Pagination total={12} defaultValue={3} />
    </Group>
  </StoryFrame>
);

const AppShellStory: StoryRender = ({ sample }) => (
  <StoryFrame>
    <Box w="100%">
      <AppShell
        mode="static"
        padding="md"
        header={{ height: 56 }}
        navbar={{ width: 200, breakpoint: "sm", collapsed: { mobile: true } }}
      >
        <AppShell.Header px="md">
          <Group h="100%" justify="space-between">
            <Text fw={600}>{sample.brand ?? "Northwind Ledger"}</Text>
            <Text size="sm" c="dimmed">
              priya@northwind.dev
            </Text>
          </Group>
        </AppShell.Header>
        <AppShell.Navbar p="sm">
          <Stack gap="xs">
            <Text size="sm" fw={500}>
              Invoices
            </Text>
            <Text size="sm" c="dimmed">
              Customers
            </Text>
            <Text size="sm" c="dimmed">
              Reports
            </Text>
            <Text size="sm" c="dimmed">
              Settings
            </Text>
          </Stack>
        </AppShell.Navbar>
        <AppShell.Main>
          <Text fw={600}>Overview</Text>
          <Text size="sm" c="dimmed" mt="xs">
            $48,210 billed in the last 30 days across 1,284 invoices.
          </Text>
        </AppShell.Main>
      </AppShell>
    </Box>
  </StoryFrame>
);

const SkeletonStory: StoryRender = () => (
  <StoryFrame>
    <Group w="100%" maw={420}>
      {/* animate={false}: preview stories never run continuous shimmer/pulse animations. */}
      <Skeleton circle height={40} width={40} animate={false} />
      <Stack gap="xs" style={{ flex: 1 }}>
        <Skeleton height={12} width="60%" animate={false} />
        <Skeleton height={12} width="85%" animate={false} />
      </Stack>
    </Group>
  </StoryFrame>
);

const SimpleGridStory: StoryRender = ({ sample }) => (
  <StoryFrame>
    <SimpleGrid cols={{ base: 1, sm: 3 }} w="100%">
      {[
        { label: sample.statLabel ?? "Monthly revenue", value: "$48,210", note: "+12.4% vs September" },
        { label: "Active subscriptions", value: "1,284", note: "+3.1% vs September" },
        { label: "Overdue invoices", value: "17", note: "$9,320 outstanding" },
      ].map((stat) => (
        <Paper key={stat.label} withBorder p="md" radius="md">
          <Text size="sm" c="dimmed">
            {stat.label}
          </Text>
          <Text fw={700} size="xl">
            {stat.value}
          </Text>
          <Text size="xs" c="dimmed">
            {stat.note}
          </Text>
        </Paper>
      ))}
    </SimpleGrid>
  </StoryFrame>
);

const GridStory: StoryRender = ({ sample }) => (
  <StoryFrame>
    <Grid w="100%">
      <Grid.Col span={{ base: 12, md: 8 }}>
        <Text fw={600} size="sm">
          {sample.title ?? "Recent activity"}
        </Text>
        <Stack gap="xs" mt="xs">
          {[
            ["Priya Raghavan", "approved INV-2041", "2h ago"],
            ["Marco Lindqvist", "sent INV-2038", "5h ago"],
            ["Amara Koll", "issued a credit note", "Yesterday"],
          ].map(([name, action, time]) => (
            <Group key={name} justify="space-between">
              <Text size="sm">
                {name} {action}
              </Text>
              <Text size="xs" c="dimmed">
                {time}
              </Text>
            </Group>
          ))}
        </Stack>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 4 }}>
        <Text fw={600} size="sm">
          Outstanding
        </Text>
        <Text fw={700} size="xl">
          $9,320
        </Text>
        <Text size="xs" c="dimmed">
          across 17 invoices
        </Text>
      </Grid.Col>
    </Grid>
  </StoryFrame>
);

const HoverCardStory: StoryRender = ({ sample }) => (
  <StoryFrame>
    <HoverCard initiallyOpened width={280} shadow="md">
      <HoverCard.Target>
        <Anchor href="https://github.com/northwind-studio" target="_blank" rel="noreferrer">
          @northwind-studio
        </Anchor>
      </HoverCard.Target>
      <HoverCard.Dropdown>
        <Group>
          <Avatar name="Northwind Studio" color="initials" />
          <Box>
            <Text size="sm" fw={500}>
              {sample.name ?? "Northwind Studio"}
            </Text>
            <Text size="xs" c="dimmed">
              Design systems and UI tooling
            </Text>
          </Box>
        </Group>
        <Text size="sm" mt="xs">
          42 components published · 3.1k weekly installs
        </Text>
      </HoverCard.Dropdown>
    </HoverCard>
  </StoryFrame>
);

const MenuStory: StoryRender = ({ sample }) => (
  <StoryFrame>
    <Group justify="space-between" w="100%" maw={420}>
      <Text size="sm" fw={500}>
        {sample.rowLabel ?? "Invoice INV-2041"}
      </Text>
      <Menu opened onChange={() => {}} position="bottom-end">
        <Menu.Target>
          <ActionIcon variant="subtle" aria-label="Invoice actions">
            <MoreHorizontal size={16} />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Invoice actions</Menu.Label>
          <Menu.Item leftSection={<Copy size={14} />}>Duplicate</Menu.Item>
          <Menu.Item leftSection={<Download size={14} />}>Download PDF</Menu.Item>
          <Menu.Divider />
          <Menu.Item color="red" leftSection={<Trash2 size={14} />}>
            Delete invoice
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  </StoryFrame>
);

const MenubarStory: StoryRender = ({ sample }) => (
  <StoryFrame>
    <Menubar defaultOpenIndex={0}>
      <Menubar.Menu>
        <Menubar.Target>{sample.menuLabel ?? "File"}</Menubar.Target>
        <Menubar.Dropdown>
          <Menu.Item>New invoice</Menu.Item>
          <Menu.Item>Import CSV</Menu.Item>
          <Menu.Divider />
          <Menu.Item>Print</Menu.Item>
        </Menubar.Dropdown>
      </Menubar.Menu>
      <Menubar.Menu>
        <Menubar.Target>Edit</Menubar.Target>
        <Menubar.Dropdown>
          <Menu.Item>Undo</Menu.Item>
          <Menu.Item>Redo</Menu.Item>
        </Menubar.Dropdown>
      </Menubar.Menu>
      <Menubar.Menu>
        <Menubar.Target>View</Menubar.Target>
        <Menubar.Dropdown>
          <Menu.Item>Show archived</Menu.Item>
        </Menubar.Dropdown>
      </Menubar.Menu>
    </Menubar>
  </StoryFrame>
);

const ProgressStory: StoryRender = ({ sample }) => (
  <StoryFrame>
    <Box w="100%" maw={420}>
      <Group justify="space-between" mb="xs">
        <Text size="sm">{sample.label ?? "Storage used"}</Text>
        <Text size="sm" c="dimmed">
          68.4 GB of 100 GB
        </Text>
      </Group>
      <Progress.Root size="lg">
        <Progress.Section value={68} color="teal">
          <Progress.Label>68%</Progress.Label>
        </Progress.Section>
      </Progress.Root>
    </Box>
  </StoryFrame>
);

const RingProgressStory: StoryRender = ({ sample }) => (
  <StoryFrame>
    <RingProgress
      size={160}
      thickness={14}
      roundCaps
      sections={[{ value: 72, color: "teal" }]}
      label={
        <div>
          <Text ta="center" size="xl" fw={700}>
            72%
          </Text>
          <Text ta="center" size="xs" c="dimmed">
            {sample.label ?? "of quarterly quota"}
          </Text>
        </div>
      }
    />
  </StoryFrame>
);

const ChipStory: StoryRender = ({ sample }) => (
  <StoryFrame>
    <Chip.Group multiple defaultValue={["open", "overdue"]}>
      <Group justify="center">
        <Chip value="open">{sample.chipLabel ?? "Open"}</Chip>
        <Chip value="paid">Paid</Chip>
        <Chip value="overdue">Overdue</Chip>
        <Chip value="draft">Draft</Chip>
      </Group>
    </Chip.Group>
  </StoryFrame>
);

const PinInputStory: StoryRender = ({ sample }) => (
  <StoryFrame>
    <Stack gap="sm" align="center">
      <Text size="sm">{sample.label ?? "Enter the code we sent to priya@northwind.dev"}</Text>
      <PinInput length={6} type="number" defaultValue="492013" />
    </Stack>
  </StoryFrame>
);

const RatingStory: StoryRender = ({ sample }) => (
  <StoryFrame>
    <Stack gap="xs" align="center">
      <Text size="sm">{sample.label ?? "How was your onboarding?"}</Text>
      <Rating defaultValue={4} size="lg" />
    </Stack>
  </StoryFrame>
);

const SpaceStory: StoryRender = ({ sample }) => (
  <StoryFrame>
    <Box w="100%" maw={360}>
      <Text fw={600}>{sample.title ?? "Deploy to production"}</Text>
      <Text size="sm" c="dimmed">
        This publishes the pricing page to all visitors.
      </Text>
      <Space h="xl" />
      <Group gap={0}>
        <Button>Deploy</Button>
        <Space w="sm" />
        <Button variant="default">
          Schedule
        </Button>
      </Group>
    </Box>
  </StoryFrame>
);

const IndicatorStory: StoryRender = ({ sample }) => (
  <StoryFrame>
    <Group>
      <Indicator inline label={12} size={18} color="red" offset={6} withBorder>
        <ActionIcon variant="default" size="lg" aria-label="Inbox">
          <Bell size={18} />
        </ActionIcon>
      </Indicator>
      <Box>
        <Text size="sm" fw={500}>
          {sample.label ?? "12 unread notifications"}
        </Text>
        <Text size="sm" c="dimmed">
          Invoices, mentions and deployment alerts
        </Text>
      </Box>
    </Group>
  </StoryFrame>
);

const TextareaStory: StoryRender = ({ sample }) => (
  <StoryFrame>
    <Box w="100%" maw={420}>
      <Textarea
        label={sample.label ?? "Reason for the refund"}
        description="This is shared with the customer."
        placeholder="Add context for the finance team"
        autosize
        minRows={3}
        defaultValue="Duplicate charge after the September plan change — refunding the difference."
      />
    </Box>
  </StoryFrame>
);

export const storyRenders: Record<string, StoryRender> = {
  "mantine/Badge": BadgeStory,
  "mantine/Toggle": ToggleStory,
  "mantine/Toolbar": ToolbarStory,
  "mantine/Tour": TourStory,
  "mantine/Tooltip": TooltipStory,
  "mantine/Transition": TransitionStory,
  "mantine/Typography": TypographyStory,
  "mantine/VisuallyHidden": VisuallyHiddenStory,
  "mantine/DataList": DataListStory,
  "mantine/EmptyState": EmptyStateStory,
  "mantine/Divider": DividerStory,
  "mantine/AspectRatio": AspectRatioStory,
  "mantine/Overlay": OverlayStory,
  "mantine/Avatar": AvatarStory,
  "mantine/Alert": AlertStory,
  "mantine/Affix": AffixStory,
  "mantine/Fieldset": FieldsetStory,
  "mantine/Checkbox": CheckboxStory,
  "mantine/Combobox": ComboboxStory,
  "mantine/Modal": ModalStory,
  "mantine/Drawer": DrawerStory,
  "mantine/Accordion": AccordionStory,
  "mantine/Pill": PillStory,
  "mantine/PillsInput": PillsInputStory,
  "mantine/Autocomplete": AutocompleteStory,
  "mantine/TagsInput": TagsInputStory,
  "mantine/Select": SelectStory,
  "mantine/MultiSelect": MultiSelectStory,
  "mantine/ComboboxPopover": ComboboxPopoverStory,
  "mantine/Pagination": PaginationStory,
  "mantine/AppShell": AppShellStory,
  "mantine/Skeleton": SkeletonStory,
  "mantine/SimpleGrid": SimpleGridStory,
  "mantine/Grid": GridStory,
  "mantine/HoverCard": HoverCardStory,
  "mantine/Menu": MenuStory,
  "mantine/Menubar": MenubarStory,
  "mantine/Progress": ProgressStory,
  "mantine/RingProgress": RingProgressStory,
  "mantine/Chip": ChipStory,
  "mantine/PinInput": PinInputStory,
  "mantine/Rating": RatingStory,
  "mantine/Space": SpaceStory,
  "mantine/Indicator": IndicatorStory,
  "mantine/Textarea": TextareaStory,
};
