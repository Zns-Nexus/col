import * as React from "react";
import { parseDate } from "@internationalized/date";
import {
  Button as ButtonPrimitive,
  Calendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  CalendarHeading,
  Cell,
  Column,
  ColumnResizer,
  ComboBox as ComboBoxPrimitive,
  ComboBoxValue as ComboBoxValuePrimitive,
  DateInput,
  DatePicker as DatePickerPrimitive,
  DateSegment,
  Dialog as DialogPrimitive,
  DialogTrigger as DialogTriggerPrimitive,
  FieldError,
  Group,
  Heading,
  Input,
  Label,
  ListBox,
  ListBoxItem,
  ListBoxSection,
  Modal,
  ModalOverlay,
  Popover,
  Row,
  Table as RacTable,
  TableBody as RacBody,
  TableHeader as RacHeader,
  Text,
  TextField as TextFieldPrimitive,
  type ButtonProps,
  type CellProps,
  type ColumnProps,
  type ColumnResizerProps,
  type ComboBoxProps as ComboBoxPrimitiveProps,
  type ComboBoxValueProps,
  type DateValue,
  type DialogProps,
  type HeadingProps,
  type InputProps,
  type ListBoxItemProps,
  type ListBoxProps,
  type ListBoxSectionProps,
  type PopoverProps,
  type RowProps,
  type TableBodyProps,
  type TableHeaderProps,
  type TableProps,
  type TextFieldProps as TextFieldPrimitiveProps,
  type TextProps,
  type ValidationResult,
} from "react-aria-components";
import { CalendarDays, ChevronDown, ChevronLeft, ChevronRight, ChevronsUpDown, X } from "lucide-react";
import type { StoryRender } from "./type";

/**
 * Preview stories for Intent UI. Intent UI is a copy-paste library built on
 * React Aria Components, so each documented component is implemented here the
 * way the official docs install it (registry source under
 * github.com/intentui/intentui), retuned to Col's theme tokens. Sample
 * strings replace display text where a caller relabels the render, and the
 * combo box and date picker render open so a screenshot captures the surface,
 * not just the trigger.
 */

const cx = (...classes: Array<string | undefined | false>) => classes.filter(Boolean).join(" ");

/* ------------------------------------------------------------------ */
/* Button — documented props: intent, size, isCircle over RAC Button.  */
/* ------------------------------------------------------------------ */

type ButtonIntent = "primary" | "secondary" | "warning" | "danger" | "success" | "outline" | "plain";
type ButtonSize = "xs" | "sm" | "md" | "lg" | "sq-xs" | "sq-sm" | "sq-md" | "sq-lg";

interface IntentButtonProps extends Omit<ButtonProps, "className"> {
  intent?: ButtonIntent;
  size?: ButtonSize;
  isCircle?: boolean;
  className?: string;
}

const buttonIntents: Record<ButtonIntent, string> = {
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  warning: "bg-amber-500 text-black",
  danger: "bg-destructive text-primary-foreground",
  success: "bg-emerald-600 text-primary-foreground",
  outline: "border border-border bg-transparent text-foreground",
  plain: "bg-transparent text-foreground",
};

const buttonSizes: Record<ButtonSize, string> = {
  xs: "h-8 px-2.5 text-xs",
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-5 text-base",
  "sq-xs": "size-8",
  "sq-sm": "size-9",
  "sq-md": "size-10",
  "sq-lg": "size-11",
};

const Button = ({ intent = "primary", size = "md", isCircle = false, className, ...props }: IntentButtonProps) => (
  <ButtonPrimitive
    {...props}
    className={cx(
      "inline-flex shrink-0 items-center justify-center gap-2 font-medium",
      buttonIntents[intent],
      buttonSizes[size],
      isCircle ? "rounded-full" : "rounded-md",
      "data-[disabled]:opacity-50",
      className,
    )}
  />
);

/* ------------------------------------------------------------------ */
/* Text Field — documented props: label, description, errorMessage,    */
/* placeholder, prefix, suffix over RAC TextField.                     */
/* ------------------------------------------------------------------ */

interface IntentTextFieldProps extends Omit<TextFieldPrimitiveProps, "className"> {
  className?: string;
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  placeholder?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

const TextField = ({
  label,
  description,
  errorMessage,
  placeholder,
  prefix,
  suffix,
  className,
  ...props
}: IntentTextFieldProps) => (
  <TextFieldPrimitive
    {...props}
    isInvalid={props.isInvalid ?? (errorMessage ? true : undefined)}
    className={cx("group flex w-full flex-col gap-y-1.5", className)}
  >
    {label && <Label className="text-sm font-medium">{label}</Label>}
    <Group className="flex h-10 items-center gap-2 rounded-md border border-border bg-background px-3 text-sm has-data-[disabled]:opacity-50">
      {typeof prefix === "string" ? <span className="text-muted-foreground">{prefix}</span> : prefix}
      <Input
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
      />
      {typeof suffix === "string" ? <span className="text-muted-foreground">{suffix}</span> : suffix}
    </Group>
    {description && (
      <Text slot="description" className="text-sm text-muted-foreground">
        {description}
      </Text>
    )}
    <FieldError className="text-sm text-destructive">{errorMessage}</FieldError>
  </TextFieldPrimitive>
);

/* ------------------------------------------------------------------ */
/* Combo Box — documented components: ComboBox, ComboBoxInput,         */
/* ComboBoxContent (popover prop), ComboBoxItem (intent),              */
/* ComboBoxLabel, ComboBoxDescription, ComboBoxSection (title),        */
/* ComboBoxValue.                                                      */
/* ------------------------------------------------------------------ */

interface IntentComboBoxProps<T extends object> extends Omit<ComboBoxPrimitiveProps<T>, "children" | "className"> {
  className?: string;
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  children: React.ReactNode;
}

function ComboBox<T extends object>({
  label,
  description,
  errorMessage,
  children,
  className,
  ...props
}: IntentComboBoxProps<T>) {
  return (
    <ComboBoxPrimitive
      {...props}
      className={cx("group flex w-full flex-col gap-y-1.5", className)}
    >
      {label && <Label className="text-sm font-medium">{label}</Label>}
      {children}
      {description && (
        <Text slot="description" className="text-sm text-muted-foreground">
          {description}
        </Text>
      )}
      <FieldError className="text-sm text-destructive">{errorMessage}</FieldError>
    </ComboBoxPrimitive>
  );
}

const ComboBoxInput = ({ className, ...props }: Omit<InputProps, "className"> & { className?: string }) => (
  <Group className="flex h-10 items-center gap-2 rounded-md border border-border bg-background px-3 text-sm">
    <Input
      {...props}
      className={cx("min-w-0 flex-1 bg-transparent outline-none placeholder:text-muted-foreground", className)}
    />
    <ButtonPrimitive aria-label="Show all options" className="shrink-0 text-muted-foreground">
      <ChevronsUpDown className="size-4" />
    </ButtonPrimitive>
  </Group>
);

interface IntentComboBoxContentProps<T extends object>
  extends Omit<ListBoxProps<T>, "layout" | "orientation" | "className" | "children"> {
  children: React.ReactNode;
  className?: string;
  popover?: Omit<PopoverProps, "children" | "className"> & { className?: string };
}

function ComboBoxContent<T extends object>({
  children,
  items,
  className,
  popover,
  ...props
}: IntentComboBoxContentProps<T>) {
  const { className: popoverClassName, ...popoverProps } = popover ?? {};
  return (
    <Popover
      {...popoverProps}
      className={cx(
        "min-w-(--trigger-width) rounded-md border border-border bg-popover p-1 text-popover-foreground",
        popoverClassName,
      )}
    >
      <ListBox
        {...props}
        items={items}
        layout="stack"
        orientation="vertical"
        className={cx("max-h-[inherit] overflow-y-auto outline-none", className)}
      >
        {children}
      </ListBox>
    </Popover>
  );
}

interface IntentComboBoxItemProps<T extends object> extends Omit<ListBoxItemProps<T>, "className"> {
  intent?: "danger" | "warning";
  className?: string;
}

function ComboBoxItem<T extends object>({ className, intent, children, ...props }: IntentComboBoxItemProps<T>) {
  return (
    <ListBoxItem
      {...props}
      className={cx(
        "grid cursor-default grid-cols-[1fr_auto] gap-y-0.5 rounded-sm px-2 py-1.5 text-sm outline-none",
        "data-[focused]:bg-secondary data-[hovered]:bg-secondary data-[selected]:text-foreground",
        intent === "danger" && "text-destructive",
        intent === "warning" && "text-amber-500",
        className,
      )}
    >
      {children}
    </ListBoxItem>
  );
}

const ComboBoxLabel = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span {...props} className={cx("col-start-1", className)} />
);

const ComboBoxDescription = ({ className, ...props }: Omit<TextProps, "className"> & { className?: string }) => (
  <Text
    {...props}
    slot="description"
    className={cx("col-start-1 text-xs text-muted-foreground", className)}
  />
);

interface IntentComboBoxSectionProps<T extends object>
  extends Omit<ListBoxSectionProps<T>, "children" | "className"> {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

function ComboBoxSection<T extends object>({ title, children, className, ...props }: IntentComboBoxSectionProps<T>) {
  return (
    <ListBoxSection {...props} className={className}>
      <header className="px-2 pb-1 pt-2 text-xs text-muted-foreground">{title}</header>
      {children}
    </ListBoxSection>
  );
}

const ComboBoxValue = <T extends object,>({
  className,
  ...props
}: Omit<ComboBoxValueProps<T>, "className"> & { className?: string }) => (
  <ComboBoxValuePrimitive {...props} className={cx("truncate", className)} />
);

/* ------------------------------------------------------------------ */
/* Dialog — documented components: DialogTrigger (button), Dialog,     */
/* DialogHeader (title, description), DialogBody, DialogFooter,        */
/* DialogClose (intent, default plain), DialogCloseIcon (isDismissable) */
/* over RAC DialogTrigger/ModalOverlay/Modal.                          */
/* ------------------------------------------------------------------ */

interface IntentDialogProps extends Omit<DialogProps, "className"> {
  className?: string;
}

const Dialog = ({ className, ...props }: IntentDialogProps) => (
  <DialogPrimitive
    {...props}
    className={cx("relative flex max-h-[inherit] flex-col overflow-hidden outline-none", className)}
  />
);

const DialogTrigger = ({ className, ...props }: IntentButtonProps) => (
  <Button {...props} intent={props.intent ?? "primary"} className={className} />
);

interface DialogHeaderProps extends Omit<React.ComponentProps<"div">, "title"> {
  title?: string;
  description?: string;
}

const DialogHeader = ({ className, title, description, children, ...props }: DialogHeaderProps) => (
  <div {...props} className={cx("flex flex-col gap-1 p-6 pb-4", className)}>
    {title && <DialogTitle>{title}</DialogTitle>}
    {description && <DialogDescription>{description}</DialogDescription>}
    {children}
  </div>
);

const DialogTitle = ({ className, ref, ...props }: HeadingProps & { ref?: React.Ref<HTMLHeadingElement> }) => (
  <Heading {...props} slot="title" ref={ref} className={cx("text-base font-semibold", className)} />
);

const DialogDescription = ({ className, ...props }: React.ComponentProps<"div">) => (
  <Text {...props} slot="description" className={cx("text-sm text-muted-foreground", className)} />
);

const DialogBody = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div {...props} className={cx("flex min-h-0 flex-1 flex-col overflow-auto px-6 py-1", className)} />
);

const DialogFooter = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div {...props} className={cx("mt-auto flex justify-end gap-3 p-6 pt-4", className)} />
);

const DialogClose = ({ intent = "plain", className, ...props }: IntentButtonProps) => (
  <Button {...props} slot="close" intent={intent} className={className} />
);

const DialogCloseIcon = ({ className, isDismissable, ...props }: Partial<IntentButtonProps> & { isDismissable?: boolean }) =>
  isDismissable ? (
    <ButtonPrimitive
      {...props}
      slot="close"
      aria-label="Close"
      className={cx("absolute end-2 top-2 grid size-7 place-content-center rounded-md text-muted-foreground hover:bg-secondary", className)}
    >
      <X className="size-4" />
    </ButtonPrimitive>
  ) : null;

/* ------------------------------------------------------------------ */
/* Table — documented props: Table (allowResize, bleed, grid, striped), */
/* TableColumn (isResizable) over RAC Table.                           */
/* ------------------------------------------------------------------ */

interface IntentTableProps extends Omit<TableProps, "className"> {
  allowResize?: boolean;
  bleed?: boolean;
  grid?: boolean;
  striped?: boolean;
  className?: string;
}

const TableContext = React.createContext<{ grid: boolean; striped: boolean }>({ grid: false, striped: false });

const Table = ({ allowResize, bleed, grid, striped, className, children, ...props }: IntentTableProps) => (
  <TableContext.Provider value={{ grid: grid ?? false, striped: striped ?? false }}>
    <div className={cx("flow-root", className)}>
      <div className={cx("overflow-x-auto whitespace-nowrap", !bleed && "px-4")}>
        <RacTable {...props} className="w-full min-w-full text-sm">
          {children}
        </RacTable>
      </div>
    </div>
  </TableContext.Provider>
);

interface IntentTableColumnProps extends Omit<ColumnProps, "className" | "children"> {
  isResizable?: boolean;
  className?: string;
  children: React.ReactNode;
}

const TableColumn = ({ isResizable, className, children, ...props }: IntentTableColumnProps) => (
  <Column
    {...props}
    className={cx("relative border-b border-border px-3 py-2 text-left font-medium text-muted-foreground", className)}
  >
    {children}
    {isResizable && <ColumnResizer className="absolute end-0 top-0 h-full w-px cursor-ew-resize bg-border" />}
  </Column>
);

const TableHeader = <T extends object>({ children, ...props }: TableHeaderProps<T>) => (
  <RacHeader<T> {...props}>{children}</RacHeader>
);

const TableBody = <T extends object>({ children, ...props }: TableBodyProps<T>) => (
  <RacBody<T> {...props}>{children}</RacBody>
);

const TableRow = <T extends object>({
  className,
  children,
  ...props
}: Omit<RowProps<T>, "className"> & { className?: string }) => {
  const { grid, striped } = React.useContext(TableContext);
  return (
    <Row<T>
      {...props}
      className={cx(
        "border-b border-border",
        grid && "divide-x divide-border",
        striped && "even:bg-secondary/40",
        "data-[hovered]:bg-secondary/60",
        className,
      )}
    >
      {children}
    </Row>
  );
};

const TableCell = ({ className, ...props }: Omit<CellProps, "className"> & { className?: string }) => (
  <Cell {...props} className={cx("px-3 py-2 align-middle", className)} />
);

/* ------------------------------------------------------------------ */
/* Date Picker — documented components: DatePicker (label, description, */
/* errorMessage, popover), DatePickerTrigger, DatePickerOverlay        */
/* (pageBehavior, range, visibleDuration) over RAC DatePicker.         */
/* ------------------------------------------------------------------ */

interface IntentDatePickerProps<T extends DateValue>
  extends Omit<React.ComponentProps<typeof DatePickerPrimitive<T>>, "className" | "children"> {
  className?: string;
  children: React.ReactNode;
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  popover?: Omit<PopoverProps, "children" | "className"> & { className?: string };
}

function DatePicker<T extends DateValue>({
  label,
  description,
  errorMessage,
  popover,
  className,
  children,
  ...props
}: IntentDatePickerProps<T>) {
  const { className: popoverClassName, ...popoverProps } = popover ?? {};
  return (
    <DatePickerPrimitive
      {...props}
      className={cx("group flex w-full flex-col gap-y-1.5", className)}
    >
      {label && <Label className="text-sm font-medium">{label}</Label>}
      {children}
      {description && (
        <Text slot="description" className="text-sm text-muted-foreground">
          {description}
        </Text>
      )}
      <FieldError className="text-sm text-destructive">{errorMessage}</FieldError>
      <DatePickerOverlay popover={{ ...popoverProps, className: popoverClassName }} />
    </DatePickerPrimitive>
  );
}

const DatePickerTrigger = ({ className, ...props }: IntentButtonProps) => (
  <Button {...props} intent="plain" size="sm" className={cx("h-8 w-8 px-0 text-muted-foreground", className)}>
    <CalendarDays className="size-4" />
  </Button>
);

interface DatePickerOverlayProps {
  popover?: Omit<PopoverProps, "children" | "className"> & { className?: string };
  range?: boolean;
  visibleDuration?: { months?: number };
  pageBehavior?: "visible" | "single";
}

const DatePickerOverlay = ({ popover, visibleDuration = { months: 1 }, pageBehavior = "visible" }: DatePickerOverlayProps) => {
  const { className: popoverClassName, ...popoverProps } = popover ?? {};
  return (
    <Popover
      {...popoverProps}
      className={cx("w-auto rounded-md border border-border bg-popover p-4 text-popover-foreground", popoverClassName)}
    >
    <Calendar visibleDuration={visibleDuration} pageBehavior={pageBehavior} aria-label="Date">
      <header className="flex items-center justify-between pb-3">
        <ButtonPrimitive slot="previous" aria-label="Previous month" className="rounded-md p-1 text-muted-foreground">
          <ChevronLeft className="size-4" />
        </ButtonPrimitive>
        <CalendarHeading className="text-sm font-medium" />
        <ButtonPrimitive slot="next" aria-label="Next month" className="rounded-md p-1 text-muted-foreground">
          <ChevronRight className="size-4" />
        </ButtonPrimitive>
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
                cx(
                  "flex size-8 items-center justify-center rounded-full text-sm",
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : isDisabled || isOutsideMonth
                      ? "text-muted-foreground"
                      : isToday
                        ? "border border-border text-foreground"
                        : "text-foreground",
                )
              }
            />
          )}
        </CalendarGridBody>
      </CalendarGrid>
    </Calendar>
    </Popover>
  );
};

/* ------------------------------------------------------------------ */
/* Stories                                                             */
/* ------------------------------------------------------------------ */

const ButtonStory: StoryRender = ({ sample }) => (
  <div className="flex flex-wrap items-center justify-center gap-3">
    <Button intent="primary" size="md">
      {sample.primaryLabel ?? "Start free trial"}
    </Button>
    <Button intent="secondary" size="md">
      {sample.secondaryLabel ?? "View the docs"}
    </Button>
    <Button intent="outline" size="md">
      Book a demo
    </Button>
    <Button intent="danger" size="sm">
      Cancel plan
    </Button>
  </div>
);

const ComboBoxStory: StoryRender = ({ sample }) => (
  <div className="w-full max-w-xs">
    <ComboBox menuTrigger="focus" defaultSelectedKey="priya" label={sample.label ?? "Assignee"}>
      <ComboBoxInput autoFocus placeholder="Select a teammate" />
      <ComboBoxContent>
        <ComboBoxItem id="priya" textValue="Priya Raman">
          <ComboBoxLabel>Priya Raman</ComboBoxLabel>
          <ComboBoxDescription>Platform lead</ComboBoxDescription>
        </ComboBoxItem>
        <ComboBoxItem id="jonas" textValue="Jonas Weber">
          <ComboBoxLabel>Jonas Weber</ComboBoxLabel>
          <ComboBoxDescription>Design systems</ComboBoxDescription>
        </ComboBoxItem>
        <ComboBoxItem id="lucia" textValue="Lucía Fernández">
          <ComboBoxLabel>Lucía Fernández</ComboBoxLabel>
          <ComboBoxDescription>Growth engineering</ComboBoxDescription>
        </ComboBoxItem>
        <ComboBoxItem id="mateo" textValue="Mateo Rossi">
          <ComboBoxLabel>Mateo Rossi</ComboBoxLabel>
          <ComboBoxDescription>Accounting</ComboBoxDescription>
        </ComboBoxItem>
      </ComboBoxContent>
    </ComboBox>
  </div>
);

const TextFieldStory: StoryRender = ({ sample }) => (
  <div className="grid w-full max-w-sm gap-4">
    <TextField
      label={sample.label ?? "Monthly limit"}
      description="Caps API spend per workspace. Leave empty for no cap."
      prefix="$"
      suffix="USD"
      defaultValue="2,400"
    />
    <TextField
      label="Billing email"
      defaultValue="priya@"
      errorMessage="Enter a valid email address."
    />
  </div>
);

const DialogStory: StoryRender = ({ sample }) => (
  <DialogTriggerPrimitive defaultOpen>
    <DialogTrigger>Invite teammate</DialogTrigger>
    <ModalOverlay className="fixed inset-0 z-40 bg-black/60">
      <Modal className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <Dialog className="w-full max-w-md rounded-xl border border-border bg-card text-card-foreground">
          <DialogCloseIcon isDismissable />
          <DialogHeader
            title={sample.title ?? "Invite a team member"}
            description="They receive an email with a link to join the Northwind workspace."
          />
          <DialogBody>
            <TextField label="Work email" defaultValue="teammate@northwind.io" />
          </DialogBody>
          <DialogFooter>
            <DialogClose intent="outline">Cancel</DialogClose>
            <Button intent="primary">{sample.actionLabel ?? "Send invite"}</Button>
          </DialogFooter>
        </Dialog>
      </Modal>
    </ModalOverlay>
  </DialogTriggerPrimitive>
);

interface InvoiceRow {
  id: number;
  client: string;
  issued: string;
  due: string;
  amount: string;
  status: string;
}

const invoiceRows: InvoiceRow[] = [
  { id: 1, client: "Northwind Traders", issued: "Oct 1, 2026", due: "Oct 15, 2026", amount: "$4,820.00", status: "Paid" },
  { id: 2, client: "Acme Corp", issued: "Oct 3, 2026", due: "Oct 17, 2026", amount: "$1,260.50", status: "Open" },
  { id: 3, client: "Globex Inc", issued: "Oct 5, 2026", due: "Oct 19, 2026", amount: "$9,140.00", status: "Open" },
  { id: 4, client: "Initech", issued: "Oct 8, 2026", due: "Oct 22, 2026", amount: "$780.25", status: "Overdue" },
];

const TableStory: StoryRender = ({ sample }) => (
  <Table bleed grid className="w-full max-w-2xl rounded-xl border border-border">
    <TableHeader>
      <TableColumn isRowHeader>{sample.column1 ?? "Client"}</TableColumn>
      <TableColumn>Issued</TableColumn>
      <TableColumn>Due</TableColumn>
      <TableColumn>Amount</TableColumn>
      <TableColumn>Status</TableColumn>
    </TableHeader>
    <TableBody items={invoiceRows}>
      {(row) => (
        <TableRow id={row.id}>
          <TableCell>{row.client}</TableCell>
          <TableCell>{row.issued}</TableCell>
          <TableCell>{row.due}</TableCell>
          <TableCell className="tabular-nums">{row.amount}</TableCell>
          <TableCell>{row.status}</TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
);

const DatePickerStory: StoryRender = ({ sample }) => (
  <div className="w-full max-w-xs">
    <DatePicker
      defaultValue={parseDate("2026-11-18")}
      defaultOpen
      label={sample.label ?? "Delivery date"}
      description="Shipments leave the warehouse on weekdays only."
    >
      <Group className="flex h-10 items-center gap-2 rounded-md border border-border bg-background px-3 text-sm">
        <DateInput className="flex flex-1 text-sm">
          {(segment) => (
            <DateSegment
              segment={segment}
              className={({ isPlaceholder }) => (isPlaceholder ? "text-muted-foreground" : "text-foreground")}
            />
          )}
        </DateInput>
        <DatePickerTrigger />
      </Group>
    </DatePicker>
  </div>
);

export const storyRenders: Record<string, StoryRender> = {
  "intent-ui/Button": ButtonStory,
  "intent-ui/Combo Box": ComboBoxStory,
  "intent-ui/Text Field": TextFieldStory,
  "intent-ui/Dialog": DialogStory,
  "intent-ui/Table": TableStory,
  "intent-ui/Date Picker": DatePickerStory,
};
