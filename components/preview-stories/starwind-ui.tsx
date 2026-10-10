import * as React from "react";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { Check, ChevronDown, ChevronLeft, ChevronRight, Mail, X } from "lucide-react";
import type { StoryRender } from "./type";

/**
 * Preview stories for Starwind UI. The library ships source-owned components
 * (the CLI copies them into projects), so each documented component is
 * implemented here from the official source at starwind.dev / the starwind-ui
 * repository. The React flavor normally runs on the `@starwind-ui/react`
 * runtime; that package is not installed here, so the behavior (dialog state,
 * accordion expansion, tab selection, select listbox, embla-backed carousel)
 * lives in this module, styled through Col's theme tokens.
 */

function classNames(...values: Array<string | false | undefined>): string {
  return values.filter(Boolean).join(" ");
}

/*
 * The runtime's event-detail types are re-declared minimally because
 * `@starwind-ui/react` is absent; each carries the value the docs describe.
 */
type AccordionValue = string | string[] | null;
type AccordionValueChangeDetails = { value: AccordionValue };
type TabsValue = string | null;
type TabsValueChangeDetails = { value: TabsValue };
type SelectOpenChangeDetails = { open: boolean };
type SelectValueChangeDetails = { value: string | null };
type DialogOpenChangeDetails = { open: boolean };
type DialogCloseCompleteDetails = Record<string, never>;

// ---------------------------------------------------------------------------
// Button — https://starwind.dev/docs/components/button/
// ---------------------------------------------------------------------------

type ButtonVariant =
  | "default"
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "info"
  | "success"
  | "warning"
  | "error";
type ButtonSize = "sm" | "md" | "lg" | "icon-sm" | "icon" | "icon-lg";

const buttonVariantClasses: Record<ButtonVariant, string> = {
  default: "bg-foreground text-background hover:bg-foreground/90",
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  outline: "border border-border bg-transparent text-foreground hover:bg-muted",
  ghost: "text-foreground hover:bg-muted",
  info: "bg-ring text-background hover:bg-ring/90",
  success: "bg-[var(--color-5)] text-background hover:opacity-90",
  warning: "bg-[var(--color-1)] text-background hover:opacity-90",
  error: "bg-destructive text-primary-foreground hover:bg-destructive/90",
};

const buttonSizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-base",
  lg: "h-12 px-8 text-lg",
  "icon-sm": "size-9",
  icon: "size-11",
  "icon-lg": "size-12",
};

function buttonClasses(variant: ButtonVariant, size: ButtonSize, className?: string): string {
  return classNames(
    "inline-flex items-center justify-center gap-1.5 rounded-md font-medium whitespace-nowrap transition-colors outline-none",
    "disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50",
    buttonVariantClasses[variant],
    buttonSizeClasses[size],
    className,
  );
}

type ButtonProps = Omit<React.ComponentPropsWithoutRef<"button">, "type"> & {
  as?: "button" | "a";
  type?: "button" | "submit" | "reset";
  href?: string;
  target?: React.ComponentPropsWithoutRef<"a">["target"];
  rel?: string;
  download?: string | boolean;
  "data-slot"?: string;
  focusableWhenDisabled?: boolean;
  ref?: React.Ref<HTMLButtonElement | HTMLAnchorElement>;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

function Button({
  variant = "default",
  size = "md",
  as,
  href,
  disabled = false,
  focusableWhenDisabled,
  "data-slot": dataSlot = "button",
  tabIndex,
  className,
  children,
  type = "button",
  ref,
  ...rest
}: ButtonProps) {
  if (as === "a" || href !== undefined) {
    return (
      <a
        className={buttonClasses(variant, size, className)}
        href={disabled ? undefined : href}
        aria-disabled={disabled ? "true" : undefined}
        data-disabled={disabled ? "" : undefined}
        tabIndex={disabled ? -1 : tabIndex}
        data-slot={dataSlot}
        ref={ref as React.Ref<HTMLAnchorElement>}
        {...(rest as React.ComponentPropsWithoutRef<"a">)}
      >
        {children}
      </a>
    );
  }
  return (
    <button
      type={type}
      className={buttonClasses(variant, size, className)}
      disabled={disabled || undefined}
      data-disabled={disabled ? "" : undefined}
      tabIndex={disabled && focusableWhenDisabled ? 0 : tabIndex}
      data-slot={dataSlot}
      ref={ref as React.Ref<HTMLButtonElement>}
      {...rest}
    >
      {children}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Dialog — https://starwind.dev/docs/components/dialog/
// ---------------------------------------------------------------------------

interface DialogContextValue {
  open: boolean;
  setOpen: (open: boolean, details: DialogOpenChangeDetails) => void;
  requestClose: () => void;
  closeOnOutsideInteract: boolean;
}

const DialogContext = React.createContext<DialogContextValue | null>(null);

function useDialog(part: string): DialogContextValue {
  const context = React.useContext(DialogContext);
  if (!context) throw new Error(`${part} must be used within Dialog`);
  return context;
}

/** Clones an `asChild` trigger/close child so it inherits the dialog's action. */
function withDialogAction(
  children: React.ReactNode,
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined,
  action: () => void,
): React.ReactNode {
  if (React.isValidElement<{ onClick?: React.MouseEventHandler<HTMLButtonElement> }>(children)) {
    const childOnClick = children.props.onClick;
    return React.cloneElement(children, {
      onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
        childOnClick?.(event);
        onClick?.(event);
        action();
      },
    });
  }
  return children;
}

type DialogProps = React.ComponentPropsWithoutRef<"div"> & {
  defaultOpen?: boolean;
  open?: boolean;
  closeOnEscape?: boolean;
  closeOnOutsideInteract?: boolean;
  modal?: boolean;
  onCloseComplete?: (details: DialogCloseCompleteDetails) => void;
  onOpenChange?: (open: boolean, details: DialogOpenChangeDetails) => void;
};

function Dialog({
  defaultOpen = false,
  open: controlledOpen,
  closeOnEscape = true,
  closeOnOutsideInteract = true,
  modal: _modal = true,
  onCloseComplete,
  onOpenChange,
  className,
  children,
  onKeyDown,
  ...rest
}: DialogProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const open = controlledOpen ?? uncontrolledOpen;

  const setOpen = React.useCallback(
    (next: boolean, details: DialogOpenChangeDetails) => {
      if (controlledOpen === undefined) setUncontrolledOpen(next);
      onOpenChange?.(next, details);
    },
    [controlledOpen, onOpenChange],
  );

  const requestClose = React.useCallback(() => {
    setOpen(false, { open: false });
    onCloseComplete?.({});
  }, [onCloseComplete, setOpen]);

  return (
    <DialogContext.Provider value={{ open, setOpen, requestClose, closeOnOutsideInteract }}>
      <div
        className={className}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (closeOnEscape && event.key === "Escape") requestClose();
        }}
        {...rest}
        data-slot="dialog"
      >
        {children}
      </div>
    </DialogContext.Provider>
  );
}

type DialogTriggerProps = React.ComponentPropsWithoutRef<"button"> & {
  asChild?: boolean;
  targetId?: string;
};

function DialogTrigger({ asChild = false, targetId: _targetId, onClick, children, ...rest }: DialogTriggerProps) {
  const dialog = useDialog("DialogTrigger");
  if (asChild) return <>{withDialogAction(children, onClick, () => dialog.setOpen(true, { open: true }))}</>;
  return (
    <button
      type="button"
      onClick={(event) => {
        onClick?.(event);
        dialog.setOpen(true, { open: true });
      }}
      {...rest}
      data-slot="dialog-trigger"
    >
      {children}
    </button>
  );
}

type DialogContentProps = React.ComponentPropsWithoutRef<"div"> & {
  backdrop?: React.ReactNode;
  icon?: React.ReactNode;
};

function DialogContent({ className, children, backdrop, icon, ...rest }: DialogContentProps) {
  const dialog = useDialog("DialogContent");
  return (
    <>
      {dialog.open ? (
        <>
          {backdrop ?? (
            <div
              className="fixed inset-0 z-40 bg-black/60"
              onClick={() => {
                if (dialog.closeOnOutsideInteract) dialog.requestClose();
              }}
              data-slot="dialog-backdrop"
            />
          )}
          <div
            role="dialog"
            aria-modal="true"
            className={classNames(
              "fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border bg-card p-8 text-card-foreground shadow-lg",
              className,
            )}
            {...rest}
            data-slot="dialog-content"
          >
            {children}
            <Button
              variant="ghost"
              size="icon-sm"
              className="absolute right-4 top-4 text-muted-foreground"
              aria-label="Close dialog"
              onClick={() => dialog.requestClose()}
              data-slot="dialog-close"
            >
              {icon ?? <X className="size-5" />}
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </>
      ) : null}
    </>
  );
}

function DialogHeader({ className, ...rest }: React.ComponentPropsWithoutRef<"div">) {
  return <div className={classNames("flex flex-col gap-2 text-left", className)} {...rest} data-slot="dialog-header" />;
}

function DialogTitle({ className, ...rest }: React.ComponentPropsWithoutRef<"h2">) {
  return <h2 className={classNames("text-xl font-semibold leading-none tracking-tight", className)} {...rest} data-slot="dialog-title" />;
}

function DialogDescription({ className, ...rest }: React.ComponentPropsWithoutRef<"p">) {
  return <p className={classNames("text-muted-foreground", className)} {...rest} data-slot="dialog-description" />;
}

function DialogFooter({ className, ...rest }: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={classNames("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}
      {...rest}
      data-slot="dialog-footer"
    />
  );
}

type DialogCloseProps = React.ComponentPropsWithoutRef<"button"> & { asChild?: boolean };

function DialogClose({ asChild = false, onClick, children = "Close", ...rest }: DialogCloseProps) {
  const dialog = useDialog("DialogClose");
  if (asChild) return <>{withDialogAction(children, onClick, dialog.requestClose)}</>;
  return (
    <button
      type="button"
      onClick={(event) => {
        onClick?.(event);
        dialog.requestClose();
      }}
      {...rest}
      data-slot="dialog-close"
    >
      {children}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Accordion — https://starwind.dev/docs/components/accordion/
// ---------------------------------------------------------------------------

interface AccordionContextValue {
  openValues: string[];
  toggle: (value: string) => void;
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null);
const AccordionItemContext = React.createContext<string | null>(null);

function useAccordion(part: string): AccordionContextValue {
  const context = React.useContext(AccordionContext);
  if (!context) throw new Error(`${part} must be used within Accordion`);
  return context;
}

type AccordionProps = React.ComponentPropsWithoutRef<"div"> & {
  type?: "single" | "multiple";
  defaultValue?: string | string[];
  value?: AccordionValue;
  collapsible?: boolean;
  onValueChange?: (details: AccordionValueChangeDetails) => void;
};

function Accordion({
  type = "single",
  defaultValue,
  value: controlledValue,
  collapsible = true,
  onValueChange,
  className,
  children,
  ...rest
}: AccordionProps) {
  const initial = React.useMemo(() => {
    if (defaultValue === undefined) return [];
    return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
  }, [defaultValue]);
  const [openValues, setOpenValues] = React.useState<string[]>(initial);

  const emit = (next: string[]) => {
    if (controlledValue === undefined) setOpenValues(next);
    onValueChange?.({ value: type === "single" ? (next[0] ?? null) : next });
  };

  const toggle = (itemValue: string) => {
    const isOpen = openValues.includes(itemValue);
    if (type === "multiple") {
      emit(isOpen ? openValues.filter((entry) => entry !== itemValue) : [...openValues, itemValue]);
      return;
    }
    if (isOpen) {
      emit(collapsible ? [] : openValues);
    } else {
      emit([itemValue]);
    }
  };

  return (
    <AccordionContext.Provider value={{ openValues, toggle }}>
      <div className={className} {...rest} data-slot="accordion">
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

type AccordionItemProps = React.ComponentPropsWithoutRef<"div"> & {
  value: string;
  disabled?: boolean;
};

function AccordionItem({ value, disabled = false, className, children, ...rest }: AccordionItemProps) {
  return (
    <AccordionItemContext.Provider value={value}>
      <div
        className={classNames("border-border [&:not(:last-child)]:border-b", disabled && "opacity-50", className)}
        data-disabled={disabled ? "" : undefined}
        {...rest}
        data-slot="accordion-item"
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

type AccordionTriggerProps = React.ComponentPropsWithoutRef<"button"> & {
  icon?: React.ReactNode;
};

function AccordionTrigger({ className, children, icon, ...rest }: AccordionTriggerProps) {
  const accordion = useAccordion("AccordionTrigger");
  const value = React.useContext(AccordionItemContext);
  const isOpen = value !== null && accordion.openValues.includes(value);
  return (
    <button
      type="button"
      aria-expanded={isOpen}
      data-state={isOpen ? "open" : "closed"}
      className={classNames(
        "flex w-full items-center justify-between gap-4 rounded-md py-4 text-left font-medium hover:text-muted-foreground",
        "[&[data-state=open]>svg]:rotate-180 [&>svg]:transition-transform",
        className,
      )}
      onClick={() => value !== null && accordion.toggle(value)}
      {...rest}
      data-slot="accordion-trigger"
    >
      {children}
      {icon ?? <ChevronDown className="size-5 shrink-0" />}
    </button>
  );
}

function AccordionContent({ className, children, ...rest }: React.ComponentPropsWithoutRef<"div">) {
  const accordion = useAccordion("AccordionContent");
  const value = React.useContext(AccordionItemContext);
  const isOpen = value !== null && accordion.openValues.includes(value);
  return (
    <div
      data-state={isOpen ? "open" : "closed"}
      className={classNames(!isOpen && "hidden", className)}
      {...rest}
      data-slot="accordion-content"
    >
      <div className="pt-0 pb-4">{children}</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Tabs — https://starwind.dev/docs/components/tabs/
// ---------------------------------------------------------------------------

interface TabsContextValue {
  value: TabsValue;
  select: (value: string) => void;
  orientation: "horizontal" | "vertical";
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

/** `syncKey` keeps sibling tab groups with the same key in step, as documented. */
const tabSyncGroups = new Map<string, Set<(value: string) => void>>();

function useTabs(part: string): TabsContextValue {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error(`${part} must be used within Tabs`);
  return context;
}

type TabsProps = Omit<React.ComponentPropsWithoutRef<"div">, "defaultValue" | "onChange" | "value"> & {
  defaultValue?: TabsValue;
  onValueChange?: (value: TabsValue, details: TabsValueChangeDetails) => void;
  orientation?: "horizontal" | "vertical";
  syncKey?: string;
  value?: TabsValue;
};

function Tabs({
  defaultValue,
  onValueChange,
  orientation = "horizontal",
  syncKey,
  value: controlledValue,
  className,
  children,
  ...rest
}: TabsProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState<TabsValue>(defaultValue ?? null);
  const value = controlledValue ?? uncontrolledValue;

  const select = React.useCallback(
    (next: string) => {
      if (controlledValue === undefined) setUncontrolledValue(next);
      onValueChange?.(next, { value: next });
    },
    [controlledValue, onValueChange],
  );

  React.useEffect(() => {
    if (!syncKey) return;
    let group = tabSyncGroups.get(syncKey);
    if (!group) {
      group = new Set();
      tabSyncGroups.set(syncKey, group);
    }
    group.add(select);
    return () => {
      group?.delete(select);
      if (group?.size === 0) tabSyncGroups.delete(syncKey);
    };
  }, [select, syncKey]);

  const selectSynced = React.useCallback(
    (next: string) => {
      select(next);
      if (syncKey) {
        for (const update of tabSyncGroups.get(syncKey) ?? []) {
          if (update !== select) update(next);
        }
      }
    },
    [select, syncKey],
  );

  return (
    <TabsContext.Provider value={{ value, select: selectSynced, orientation }}>
      <div data-orientation={orientation} className={className} {...rest} data-slot="tabs">
        {children}
      </div>
    </TabsContext.Provider>
  );
}

type TabsListProps = React.ComponentPropsWithoutRef<"div"> & {
  activateOnFocus?: boolean;
  loopFocus?: boolean;
};

function TabsList({ activateOnFocus: _activateOnFocus, loopFocus: _loopFocus, className, ...rest }: TabsListProps) {
  const tabs = useTabs("TabsList");
  return (
    <div
      role="tablist"
      aria-orientation={tabs.orientation}
      className={classNames("bg-muted text-muted-foreground inline-flex w-fit items-center justify-center rounded-md p-1", className)}
      {...rest}
      data-slot="tabs-list"
    />
  );
}

type TabsTriggerProps = Omit<React.ComponentPropsWithoutRef<"button">, "type" | "value"> & {
  disabled?: boolean;
  value: string;
};

function TabsTrigger({ disabled = false, value, className, children, ...rest }: TabsTriggerProps) {
  const tabs = useTabs("TabsTrigger");
  const isActive = tabs.value === value;
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      disabled={disabled}
      data-state={isActive ? "active" : "inactive"}
      className={classNames(
        "inline-flex grow items-center justify-center gap-2 rounded-sm border border-transparent px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors",
        "data-[state=active]:border-border data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        "disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      onClick={() => tabs.select(value)}
      {...rest}
      data-slot="tabs-trigger"
    >
      {children}
    </button>
  );
}

type TabsContentProps = React.ComponentPropsWithoutRef<"div"> & {
  keepMounted?: boolean;
  value: string;
};

function TabsContent({ keepMounted = false, value, className, children, ...rest }: TabsContentProps) {
  const tabs = useTabs("TabsContent");
  const isActive = tabs.value === value;
  if (!isActive && !keepMounted) return null;
  return (
    <div
      role="tabpanel"
      hidden={!isActive}
      className={classNames("mt-2", className)}
      {...rest}
      data-slot="tabs-content"
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Select — https://starwind.dev/docs/components/select/
// ---------------------------------------------------------------------------

interface SelectContextValue {
  value: string | null;
  valueLabel: string | null;
  open: boolean;
  disabled: boolean;
  setOpen: (open: boolean) => void;
  select: (value: string | null, label: string | null) => void;
  registerLabel: (value: string, label: string) => void;
}

const SelectContext = React.createContext<SelectContextValue | null>(null);
const SelectItemContext = React.createContext<string | null>(null);

function useSelect(part: string): SelectContextValue {
  const context = React.useContext(SelectContext);
  if (!context) throw new Error(`${part} must be used within Select`);
  return context;
}

type SelectProps = Omit<React.ComponentPropsWithoutRef<"div">, "defaultValue" | "onChange"> & {
  autoComplete?: string;
  defaultOpen?: boolean;
  defaultValue?: string | null;
  disabled?: boolean;
  form?: string;
  highlightItemOnHover?: boolean;
  modal?: boolean;
  name?: string;
  open?: boolean;
  readOnly?: boolean;
  required?: boolean;
  value?: string | null;
  onOpenChange?: (open: boolean, details: SelectOpenChangeDetails) => void;
  onValueChange?: (value: string | null, details: SelectValueChangeDetails) => void;
};

function Select({
  autoComplete: _autoComplete,
  defaultOpen = false,
  defaultValue = null,
  disabled = false,
  form: _form,
  highlightItemOnHover: _highlightItemOnHover = true,
  modal: _modal = true,
  name,
  open: controlledOpen,
  readOnly = false,
  required = false,
  value: controlledValue,
  onOpenChange,
  onValueChange,
  className,
  children,
  ...rest
}: SelectProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const [uncontrolledValue, setUncontrolledValue] = React.useState<string | null>(defaultValue);
  const [valueLabel, setValueLabel] = React.useState<string | null>(null);
  const open = controlledOpen ?? uncontrolledOpen;
  const value = controlledValue ?? uncontrolledValue;

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (controlledOpen === undefined) setUncontrolledOpen(next);
      onOpenChange?.(next, { open: next });
    },
    [controlledOpen, onOpenChange],
  );

  const select = React.useCallback(
    (next: string | null, label: string | null) => {
      if (controlledValue === undefined) setUncontrolledValue(next);
      setValueLabel(next === null ? null : label);
      setOpen(false);
      onValueChange?.(next, { value: next });
    },
    [controlledValue, onValueChange, setOpen],
  );

  const registerLabel = React.useCallback((labelValue: string, label: string) => {
    if (value === labelValue) setValueLabel(label);
  }, [value]);

  return (
    <SelectContext.Provider value={{ value, valueLabel, open, disabled, setOpen, select, registerLabel }}>
      <div className={classNames("relative", className)} {...rest} data-slot="select">
        {children}
        {name ? <input type="hidden" name={name} value={value ?? ""} required={required} disabled={disabled} readOnly={readOnly} /> : null}
      </div>
    </SelectContext.Provider>
  );
}

type SelectTriggerProps = React.ComponentPropsWithoutRef<"button"> & {
  asChild?: boolean;
  iconClass?: string;
  placeholder?: string;
  showIcon?: boolean;
  size?: "sm" | "md" | "lg";
  valueClass?: string;
  icon?: React.ReactNode;
};

const selectTriggerSizes: Record<"sm" | "md" | "lg", string> = {
  sm: "h-9 px-2 text-sm",
  md: "h-11 px-3 text-base",
  lg: "h-12 px-4 text-lg",
};

function SelectTrigger({
  asChild = false,
  className,
  iconClass,
  placeholder,
  showIcon = true,
  size = "md",
  valueClass,
  icon,
  children,
  ...rest
}: SelectTriggerProps) {
  const select = useSelect("SelectTrigger");
  return (
    <button
      type="button"
      role="combobox"
      aria-expanded={select.open}
      disabled={select.disabled}
      data-placeholder={select.value === null ? "" : undefined}
      data-size={size}
      className={classNames(
        "border-input flex w-full items-center justify-between gap-2 rounded-md border border-border bg-transparent shadow-xs select-none",
        "data-[placeholder]:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        selectTriggerSizes[size],
        className,
      )}
      onClick={() => select.setOpen(!select.open)}
      {...rest}
      data-slot="select-trigger"
    >
      {asChild && children ? (
        children
      ) : (
        <SelectValue placeholder={placeholder} className={valueClass} data-slot="select-value" />
      )}
      {!asChild && showIcon ? (
        <span className={classNames("text-muted-foreground pointer-events-none size-4", iconClass)} data-slot="select-icon">
          {icon ?? <ChevronDown className="size-4" />}
        </span>
      ) : null}
    </button>
  );
}

type SelectValueProps = React.ComponentPropsWithoutRef<"span"> & { placeholder?: string };

function SelectValue({ placeholder, className, children, ...rest }: SelectValueProps) {
  const select = useSelect("SelectValue");
  return (
    <span className={classNames("pointer-events-none flex flex-1 text-left", className)} {...rest} data-slot="select-value">
      {children ?? select.valueLabel ?? placeholder}
    </span>
  );
}

type SelectContentProps = React.ComponentPropsWithoutRef<"div"> & {
  align?: "start" | "center" | "end";
  alignOffset?: number;
  alignItemWithTrigger?: boolean;
  avoidCollisions?: boolean;
  keepMounted?: boolean;
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
  size?: "sm" | "md" | "lg";
};

function SelectContent({
  align: _align = "start",
  alignOffset: _alignOffset = 0,
  alignItemWithTrigger: _alignItemWithTrigger = true,
  avoidCollisions: _avoidCollisions = true,
  keepMounted = false,
  side = "bottom",
  sideOffset: _sideOffset = 4,
  size = "md",
  className,
  children,
  ...rest
}: SelectContentProps) {
  const select = useSelect("SelectContent");
  if (!select.open && !keepMounted) return null;
  return (
    <div
      data-side={side}
      data-size={size}
      className={classNames(
        "bg-popover text-popover-foreground absolute left-0 z-50 min-w-[8rem] overflow-hidden rounded-md border border-border shadow-md",
        side === "top" ? "bottom-full mb-1" : "top-full mt-1",
        size === "sm" ? "text-sm" : size === "lg" ? "text-lg" : "text-base",
        "w-full",
        className,
      )}
      {...rest}
      data-slot="select-content"
    >
      <div className="max-h-96 overflow-y-auto p-1" data-slot="select-list">
        {children}
      </div>
    </div>
  );
}

type SelectItemProps = Omit<React.ComponentPropsWithoutRef<"div">, "role"> & {
  disabled?: boolean;
  indicatorClass?: string;
  inset?: boolean;
  showIndicator?: boolean;
  value: string;
  indicator?: React.ReactNode;
};

function SelectItem({
  className,
  disabled = false,
  indicatorClass,
  inset = false,
  showIndicator = true,
  value,
  children,
  indicator,
  ...rest
}: SelectItemProps) {
  const select = useSelect("SelectItem");
  const isSelected = select.value === value;
  const label = typeof children === "string" ? children : value;

  React.useEffect(() => {
    if (isSelected) select.registerLabel(value, label);
  }, [isSelected, label, select, value]);

  return (
    <SelectItemContext.Provider value={value}>
      <div
        role="option"
        aria-selected={isSelected}
        data-state={isSelected ? "checked" : "unchecked"}
        data-disabled={disabled ? "" : undefined}
        onClick={() => {
          if (!disabled) select.select(value, label);
        }}
        className={classNames(
          "data-highlighted:bg-accent relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 outline-none select-none hover:bg-accent hover:text-accent-foreground",
          inset && "pl-8",
          disabled && "pointer-events-none opacity-50",
          className,
        )}
        {...rest}
        data-slot="select-item"
      >
        <SelectItemText>{children}</SelectItemText>
        {showIndicator ? (
          <SelectItemIndicator className={indicatorClass}>{indicator ?? <Check className="size-4" />}</SelectItemIndicator>
        ) : null}
      </div>
    </SelectItemContext.Provider>
  );
}

function SelectItemText({ className, ...rest }: React.ComponentPropsWithoutRef<"span">) {
  return <span className={classNames("flex flex-1 shrink-0 gap-2 whitespace-nowrap", className)} {...rest} data-slot="select-item-text" />;
}

function SelectItemIndicator({ className, children, ...rest }: React.ComponentPropsWithoutRef<"span">) {
  const select = useSelect("SelectItemIndicator");
  const value = React.useContext(SelectItemContext);
  const isSelected = value !== null && select.value === value;
  return (
    <span
      data-state={isSelected ? "checked" : "unchecked"}
      className={classNames(
        "pointer-events-none absolute right-2 flex size-4 items-center justify-center opacity-0",
        isSelected && "opacity-100",
        className,
      )}
      {...rest}
      data-slot="select-item-indicator"
    >
      {children}
    </span>
  );
}

function SelectGroup({ className, ...rest }: React.ComponentPropsWithoutRef<"div">) {
  return <div className={className} {...rest} data-slot="select-group" />;
}

function SelectLabel({ className, ...rest }: React.ComponentPropsWithoutRef<"div">) {
  return <div className={classNames("text-muted-foreground px-2 py-1.5 text-sm font-medium", className)} {...rest} data-slot="select-label" />;
}

function SelectSeparator({ className, ...rest }: React.ComponentPropsWithoutRef<"div">) {
  return <div className={classNames("bg-border -mx-1 my-1 h-px", className)} {...rest} data-slot="select-separator" />;
}

// ---------------------------------------------------------------------------
// Carousel — https://starwind.dev/docs/components/carousel/
// (the documented Embla Carousel behavior, via the installed embla-carousel-react)
// ---------------------------------------------------------------------------

type CarouselOptionsType = NonNullable<Parameters<typeof useEmblaCarousel>[0]>;
type CarouselApiType = UseEmblaCarouselType[1];

interface CarouselContextValue {
  api: CarouselApiType;
  orientation: "horizontal" | "vertical";
  viewportRef: UseEmblaCarouselType[0];
}

const CarouselContext = React.createContext<CarouselContextValue | null>(null);

type CarouselProps = React.ComponentPropsWithoutRef<"div"> & {
  orientation?: "horizontal" | "vertical";
  opts?: CarouselOptionsType;
  plugins?: Parameters<typeof useEmblaCarousel>[1];
  setApi?: (api: NonNullable<CarouselApiType>) => void;
};

function Carousel({ orientation = "horizontal", opts, plugins, setApi, className, children, ...rest }: CarouselProps) {
  const [viewportRef, api] = useEmblaCarousel(
    { axis: orientation === "vertical" ? "y" : "x", ...opts },
    plugins,
  );

  React.useEffect(() => {
    if (api && setApi) setApi(api);
  }, [api, setApi]);

  return (
    <CarouselContext.Provider value={{ api, orientation, viewportRef }}>
      <div
        data-axis={orientation === "vertical" ? "y" : "x"}
        className={classNames("group/carousel relative", className)}
        {...rest}
        data-slot="carousel"
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

function useCarousel(part: string): CarouselContextValue {
  const context = React.useContext(CarouselContext);
  if (!context) throw new Error(`${part} must be used within Carousel`);
  return context;
}

function CarouselContent({ className, children, ...rest }: React.ComponentPropsWithoutRef<"div">) {
  const { orientation, viewportRef } = useCarousel("CarouselContent");
  return (
    <div ref={viewportRef} className="overflow-hidden" data-slot="carousel-content">
      <div
        className={classNames("flex", orientation === "vertical" ? "flex-col" : "-ml-4", className)}
        {...rest}
        data-slot="carousel-container"
      >
        {children}
      </div>
    </div>
  );
}

type CarouselItemProps = React.ComponentPropsWithoutRef<"div">;

function CarouselItem({ className, ...rest }: CarouselItemProps) {
  const { orientation } = useCarousel("CarouselItem");
  return (
    <div
      className={classNames(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "vertical" ? "pt-4" : "pl-4",
        className,
      )}
      {...rest}
      data-slot="carousel-item"
    />
  );
}

type CarouselControlProps = React.ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

function CarouselPrevious({ variant = "outline", size = "icon", className, children, ...rest }: CarouselControlProps) {
  const { api, orientation } = useCarousel("CarouselPrevious");
  return (
    <Button
      variant={variant}
      size={size}
      aria-label="Previous slide"
      className={classNames(
        "absolute size-8 rounded-full",
        orientation === "vertical"
          ? "-top-12 left-1/2 -translate-x-1/2 rotate-90"
          : "top-1/2 -left-12 -translate-y-1/2",
        className,
      )}
      onClick={() => api?.scrollPrev()}
      {...rest}
      data-slot="carousel-previous"
    >
      {children ?? (
        <>
          <ChevronLeft aria-hidden="true" className="size-4" />
          <span className="sr-only">Previous slide</span>
        </>
      )}
    </Button>
  );
}

function CarouselNext({ variant = "outline", size = "icon", className, children, ...rest }: CarouselControlProps) {
  const { api, orientation } = useCarousel("CarouselNext");
  return (
    <Button
      variant={variant}
      size={size}
      aria-label="Next slide"
      className={classNames(
        "absolute size-8 rounded-full",
        orientation === "vertical"
          ? "-bottom-12 left-1/2 -translate-x-1/2 rotate-90"
          : "top-1/2 -right-12 -translate-y-1/2",
        className,
      )}
      onClick={() => api?.scrollNext()}
      {...rest}
      data-slot="carousel-next"
    >
      {children ?? (
        <>
          <ChevronRight aria-hidden="true" className="size-4" />
          <span className="sr-only">Next slide</span>
        </>
      )}
    </Button>
  );
}

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

const ButtonStory: StoryRender = ({ sample }) => (
  <div className="flex w-full max-w-xl flex-col items-center gap-6">
    <div className="text-center">
      <h2 className="text-2xl font-semibold">{sample.headline ?? "Ship your support desk in an afternoon"}</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        {sample.support ?? "Start on the free plan — no credit card, no sales call."}
      </p>
    </div>
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button variant="primary">{sample.primaryLabel ?? "Start free trial"}</Button>
      <Button variant="outline">{sample.secondaryLabel ?? "View the docs"}</Button>
      <Button variant="ghost">Talk to sales</Button>
      <Button size="icon" aria-label="Open messages">
        <Mail className="size-5" />
      </Button>
    </div>
  </div>
);

const DialogStory: StoryRender = ({ sample }) => (
  <Dialog defaultOpen>
    <DialogTrigger asChild>
      <Button variant="outline">Invite member</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[450px]">
      <DialogHeader>
        <DialogTitle>{sample.title ?? "Invite a team member"}</DialogTitle>
        <DialogDescription>
          {sample.description ?? "They receive an email with a link to join this workspace."}
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-2 py-4">
        <label htmlFor="starwind-dialog-email" className="text-sm font-medium">
          Email address
        </label>
        <input
          id="starwind-dialog-email"
          type="email"
          defaultValue="teammate@example.com"
          className="border-input h-11 w-full rounded-md border border-border bg-transparent px-3 text-base"
        />
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button variant="primary">Send invite</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

const AccordionStory: StoryRender = ({ sample }) => (
  <Accordion defaultValue="billing" className="w-full max-w-xl">
    <AccordionItem value="billing">
      <AccordionTrigger>{sample.question1 ?? "How does billing work?"}</AccordionTrigger>
      <AccordionContent>
        {sample.answer1 ??
          "Every plan includes the full component set. Paid tiers add team seats, priority support, and SSO."}
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="license">
      <AccordionTrigger>Can I use the components commercially?</AccordionTrigger>
      <AccordionContent>
        Yes. The code the CLI copies into your project is yours, per the MIT license the library ships under.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="frameworks">
      <AccordionTrigger>Does it work with my framework?</AccordionTrigger>
      <AccordionContent>
        Each component page lists the frameworks and versions the library documents support for.
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);

const TabsStory: StoryRender = ({ sample }) => (
  <Tabs defaultValue="overview" className="w-full max-w-md">
    <TabsList>
      <TabsTrigger value="overview">Overview</TabsTrigger>
      <TabsTrigger value="members">Members</TabsTrigger>
      <TabsTrigger value="billing">Billing</TabsTrigger>
    </TabsList>
    <TabsContent value="overview">
      <p className="text-sm text-muted-foreground">
        {sample.overview ?? "Traffic grew 18% this week, led by the pricing page."}
      </p>
    </TabsContent>
    <TabsContent value="members">
      <p className="text-sm text-muted-foreground">12 members, 3 pending invitations, 2 admins.</p>
    </TabsContent>
    <TabsContent value="billing">
      <p className="text-sm text-muted-foreground">The Team plan renews on November 3rd — $48 per seat, billed monthly.</p>
    </TabsContent>
  </Tabs>
);

const SelectStory: StoryRender = ({ sample }) => (
  <div className="flex w-full max-w-sm flex-col gap-2">
    <Select name="framework" defaultValue="react" defaultOpen>
      <SelectTrigger placeholder="Choose a framework" aria-label={sample.label ?? "Choose a framework"} />
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Frontend</SelectLabel>
          <SelectItem value="react">React</SelectItem>
          <SelectItem value="vue">Vue</SelectItem>
          <SelectItem value="svelte">Svelte</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Meta-frameworks</SelectLabel>
          <SelectItem value="astro">Astro</SelectItem>
          <SelectItem value="next">Next.js</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    <p className="text-xs text-muted-foreground">{sample.hint ?? "Used to generate your starter workspace."}</p>
  </div>
);

interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

const CarouselStory: StoryRender = ({ sample }) => {
  const slides: Testimonial[] = [
    {
      quote: sample.quote1 ?? "We replaced three internal tools with one Col tab. The preview scenes settled the argument.",
      name: "Priya Raman",
      role: "Head of Platform, Northwind",
    },
    { quote: "Our design review went from a week to an afternoon — everyone looked at the same rendered component.", name: "Jonas Weber", role: "Staff Engineer, Kite" },
    { quote: "The catalog finally matches what our docs claim ships. That alone paid for the migration.", name: "Amara Koll", role: "Design Systems Lead, Ferry" },
  ];
  return (
    <Carousel opts={{ align: "start" }} className="mx-auto w-full max-w-xs">
      <CarouselContent>
        {slides.map((slide) => (
          <CarouselItem key={slide.name}>
            <figure className="flex h-44 flex-col justify-between rounded-xl border border-border bg-card p-5 text-card-foreground">
              <blockquote className="text-sm">&ldquo;{slide.quote}&rdquo;</blockquote>
              <figcaption className="text-xs text-muted-foreground">
                <span className="text-sm font-medium text-foreground">{slide.name}</span>
                {" — "}
                {slide.role}
              </figcaption>
            </figure>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export const storyRenders: Record<string, StoryRender> = {
  "starwind-ui/Button": ButtonStory,
  "starwind-ui/Dialog": DialogStory,
  "starwind-ui/Accordion": AccordionStory,
  "starwind-ui/Tabs": TabsStory,
  "starwind-ui/Select": SelectStory,
  "starwind-ui/Carousel": CarouselStory,
};
