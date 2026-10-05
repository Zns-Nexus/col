"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type FocusEvent, type MouseEvent, type ReactNode } from "react";
import { Check, ChevronDown, RotateCcw, SlidersHorizontal } from "lucide-react";
import { categoryIcons, Icons, type IconComponent } from "./MaskIcon";
import { CATEGORIES, STACKS, USE_CASES, type Category, type Stack, type UseCase } from "@/data/libraries";
import type { DirectoryFacetCounts } from "@/lib/directory";
import { SidebarSlot } from "./SidebarSlot";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  useSidebar,
} from "@/components/ui/sidebar";

interface FilterDropdownProps {
  label: string;
  value: string;
  items: readonly { label: string; value: string }[];
  onValueChange: (value: string) => void;
  className?: string;
}

export function FilterDropdown({ label, value, items, onValueChange, className = "" }: FilterDropdownProps) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="outline" className={`coss-trigger ${className}`}>
          <span className="truncate">{label}</span>
          <ChevronDown className="coss-chevron ml-auto size-3.5 opacity-60" aria-hidden />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" sideOffset={6} className="coss-menu min-w-[var(--radix-dropdown-menu-trigger-width)]">
        <DropdownMenuRadioGroup value={value} onValueChange={onValueChange}>
          {items.map((item) => (
            <DropdownMenuRadioItem key={item.value} value={item.value} className="coss-menu-item">
              {item.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const CATEGORY_ICONS = categoryIcons;

interface FacetGroupProps<T extends string> {
  label: string;
  allLabel: string;
  total: number;
  id: string;
  options: readonly T[];
  selected: readonly T[];
  counts: ReadonlyMap<T, number>;
  onSelect: (value: T) => void;
  onClear: () => void;
  expanded: boolean;
  onExpandedChange: () => void;
  selectionMode: "single" | "multiple";
  icons?: Partial<Record<T, IconComponent>>;
}

/** Moves an absolutely positioned pill onto `target`, relative to `container`. */
function placePill(pill: HTMLElement | null, target: HTMLElement | null) {
  if (!pill) return;
  if (!target) {
    pill.style.opacity = "0";
    return;
  }
  pill.style.transform = `translateY(${target.offsetTop}px)`;
  pill.style.height = `${target.offsetHeight}px`;
  pill.style.opacity = "1";
}

/** One collapsible filter section. Single-select groups get an "all" row and a sliding pill; multi-select groups get checkboxes. */
export function FacetGroup<T extends string>({ label, allLabel, total, id, options, selected, counts, onSelect, onClear, expanded, onExpandedChange, selectionMode, icons }: FacetGroupProps<T>) {
  const listRef = useRef<HTMLDivElement>(null);
  const activePillRef = useRef<HTMLSpanElement>(null);
  const hoverPillRef = useRef<HTMLSpanElement>(null);
  const single = selectionMode === "single";
  const selectedKey = selected.join("|");

  const syncActivePill = useCallback(() => {
    if (!single) return;
    placePill(activePillRef.current, listRef.current?.querySelector<HTMLElement>('[aria-pressed="true"]') ?? null);
  }, [single]);

  useLayoutEffect(() => {
    syncActivePill();
    const frame = requestAnimationFrame(() => {
      if (activePillRef.current) activePillRef.current.dataset.ready = "true";
    });
    return () => cancelAnimationFrame(frame);
  }, [selectedKey, expanded, syncActivePill]);

  useEffect(() => {
    const list = listRef.current;
    if (!list || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(syncActivePill);
    observer.observe(list);
    return () => observer.disconnect();
  }, [syncActivePill]);

  const hoverHandlers = {
    onMouseEnter: (event: MouseEvent<HTMLButtonElement>) => placePill(hoverPillRef.current, event.currentTarget),
    onFocus: (event: FocusEvent<HTMLButtonElement>) => placePill(hoverPillRef.current, event.currentTarget),
  };

  const renderOption = (value: T | null, optionLabel: string, count: number) => {
    const isActive = value === null ? selected.length === 0 : selected.includes(value);
    const disabled = value !== null && count === 0 && !isActive;
    const Icon: IconComponent | undefined = value === null ? Icons.allLibraries : icons?.[value];
    return (
      <button
        key={value ?? "__all__"}
        type="button"
        role={single ? undefined : "checkbox"}
        aria-pressed={single ? isActive : undefined}
        aria-checked={single ? undefined : isActive}
        disabled={disabled}
        data-active={isActive}
        className="facet-option"
        onClick={() => (value === null ? onClear() : onSelect(value))}
        {...hoverHandlers}
      >
        {single ? (
          Icon && <Icon className="facet-option-icon" />
        ) : (
          <span className="facet-check" aria-hidden><Check /></span>
        )}
        <span className="facet-option-label cap">{optionLabel}</span>
        <span className="facet-option-count cap">{count}</span>
      </button>
    );
  };

  return (
    <SidebarGroup className="facet-group">
      <button type="button" className="facet-heading-row" aria-expanded={expanded} aria-controls={id} onClick={onExpandedChange}>
        <span className="facet-heading cap">{label}</span>
        {!single && selected.length > 0 && <span className="facet-selected-count" aria-label={`${selected.length} selected`}><span className="cap">{selected.length}</span></span>}
        <ChevronDown className="facet-heading-icon" aria-hidden />
      </button>
      <SidebarGroupContent id={id} className="facet-collapse" data-expanded={expanded} aria-hidden={!expanded} inert={!expanded}>
        <div className="facet-collapse-inner">
          <div
            ref={listRef}
            className="facet-options"
            role="group"
            aria-label={`${label} options`}
            onMouseLeave={() => { if (hoverPillRef.current) hoverPillRef.current.style.opacity = "0"; }}
            onBlur={(event) => {
              if (!(event.relatedTarget instanceof Node) || !event.currentTarget.contains(event.relatedTarget)) {
                if (hoverPillRef.current) hoverPillRef.current.style.opacity = "0";
              }
            }}
          >
            <span ref={hoverPillRef} className="facet-hover-pill" aria-hidden />
            {single && <span ref={activePillRef} className="facet-active-pill" aria-hidden />}
            {single && renderOption(null, allLabel, total)}
            {options.map((option) => renderOption(option, option, counts.get(option) ?? 0))}
          </div>
        </div>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

interface FilterPanelProps {
  showSaved: boolean;
  activeCategory: Category | null;
  activeStacks: Stack[];
  activeUseCases: UseCase[];
  query: string;
  onCategoryChange: (category: Category | null) => void;
  onStackChange: (stack: Stack | null) => void;
  onUseCaseChange: (useCase: UseCase | null) => void;
  onClearAll: () => void;
  facetCounts: DirectoryFacetCounts;
  /** Keeps the two rendered copies of this panel from sharing element ids. */
  idSuffix: string;
  footer?: ReactNode;
}

/**
 * Body of the filter panel, shared by the desktop sidebar and the mobile sheet
 * so the two can never drift apart.
 */
function FilterPanel({ showSaved, activeCategory, activeStacks, activeUseCases, query, onCategoryChange, onStackChange, onUseCaseChange, onClearAll, facetCounts, idSuffix, footer }: FilterPanelProps) {
  const hasFilters = showSaved || query.trim() !== "" || activeCategory !== null || activeStacks.length > 0 || activeUseCases.length > 0;

  const [expandedGroups, setExpandedGroups] = useState(() => ({
    category: true,
    stack: activeStacks.length > 0,
    useCase: activeUseCases.length > 0,
  }));

  return (
    <>
      <SidebarContent>
        <FacetGroup
          label="Category"
          allLabel="All libraries"
          total={facetCounts.total.category}
          id={`directory-category-options${idSuffix}`}
          options={CATEGORIES}
          selected={activeCategory === null ? [] : [activeCategory]}
          counts={facetCounts.category}
          onSelect={(value) => onCategoryChange(activeCategory === value ? null : value)}
          onClear={() => onCategoryChange(null)}
          selectionMode="single"
          icons={CATEGORY_ICONS}
          expanded={expandedGroups.category}
          onExpandedChange={() => setExpandedGroups((current) => ({ ...current, category: !current.category }))}
        />
        <FacetGroup
          label="Stack"
          allLabel="All stacks"
          total={facetCounts.total.stack}
          id={`directory-stack-options${idSuffix}`}
          options={STACKS}
          selected={activeStacks}
          counts={facetCounts.stack}
          onSelect={(value) => onStackChange(value)}
          onClear={() => onStackChange(null)}
          selectionMode="multiple"
          expanded={expandedGroups.stack}
          onExpandedChange={() => setExpandedGroups((current) => ({ ...current, stack: !current.stack }))}
        />
        <FacetGroup
          label="Use case"
          allLabel="All use cases"
          total={facetCounts.total.useCase}
          id={`directory-use-case-options${idSuffix}`}
          options={USE_CASES}
          selected={activeUseCases}
          counts={facetCounts.useCase}
          onSelect={(value) => onUseCaseChange(value)}
          onClear={() => onUseCaseChange(null)}
          selectionMode="multiple"
          expanded={expandedGroups.useCase}
          onExpandedChange={() => setExpandedGroups((current) => ({ ...current, useCase: !current.useCase }))}
        />
      </SidebarContent>

      {hasFilters && (footer ?? <FilterReset onClick={onClearAll} />)}
    </>
  );
}

/** Footer button that clears every filter in a panel. */
export function FilterReset({ onClick }: { onClick: () => void }) {
  return (
    <SidebarFooter>
      <button type="button" onClick={onClick} className="facet-reset">
        <RotateCcw aria-hidden /> <span className="cap">Reset all filters</span>
      </button>
    </SidebarFooter>
  );
}

interface FilterBarProps {
  showSaved: boolean;
  activeCategory: Category | null;
  activeStacks: Stack[];
  activeUseCases: UseCase[];
  query: string;
  facetCounts: DirectoryFacetCounts;
  onCategoryChange: (category: Category | null) => void;
  onStackChange: (stack: Stack | null) => void;
  onUseCaseChange: (useCase: UseCase | null) => void;
  onClearAll: () => void;
}

export function FilterBar({ showSaved, activeCategory, activeStacks, activeUseCases, query, onCategoryChange, onStackChange, onUseCaseChange, onClearAll, facetCounts }: FilterBarProps) {
  const hasFilters = showSaved || query.trim() !== "" || activeCategory !== null || activeStacks.length > 0 || activeUseCases.length > 0;

  const panelProps = {
    showSaved,
    activeCategory,
    activeStacks,
    activeUseCases,
    query,
    onCategoryChange,
    onStackChange,
    onUseCaseChange,
    onClearAll,
    facetCounts,
  } satisfies Omit<FilterPanelProps, "idSuffix" | "footer">;

  return <FilterSidebar label="Library filters" hasFilters={hasFilters} renderPanel={(idSuffix) => <FilterPanel {...panelProps} idSuffix={idSuffix} />} />;
}

interface FilterSidebarProps {
  /** Accessible name of the filter region, for example "Library filters". */
  label: string;
  hasFilters: boolean;
  /** Renders the panel body. Called once for the desktop sidebar and once for the mobile sheet, with an id suffix that keeps their element ids apart. */
  renderPanel: (idSuffix: string) => ReactNode;
}

/**
 * Places a directory's filter panel in the app frame's sidebar on desktop and
 * in a sheet behind a "Filters" button on small screens.
 */
export function FilterSidebar({ label, hasFilters, renderPanel }: FilterSidebarProps) {
  const { openMobile, setOpenMobile } = useSidebar();
  const filterTriggerRef = useRef<HTMLButtonElement>(null);

  const handleMobileOpenChange = (nextOpen: boolean) => {
    setOpenMobile(nextOpen);
    if (!nextOpen && window.innerWidth < 1024) {
      requestAnimationFrame(() => filterTriggerRef.current?.focus());
    }
  };

  return (
    <>
      <Button
        type="button"
        variant="outline"
        className="directory-filter-trigger mx-5 mt-4 min-h-11 self-start lg:hidden"
        ref={filterTriggerRef}
        onClick={() => setOpenMobile(true)}
        aria-label="Open filters"
      >
        <SlidersHorizontal aria-hidden /> Filters{hasFilters ? " · Active" : ""}
      </Button>

      <SidebarSlot mobile="hidden">
        <div className="directory-sidebar directory-filter-panel" role="region" aria-label={label}>
          {renderPanel("")}
        </div>
      </SidebarSlot>

      <Sheet open={openMobile} onOpenChange={handleMobileOpenChange}>
        <SheetContent side="left" className="w-[16rem] gap-0 bg-sidebar p-0 lg:hidden">
          <SheetTitle className="sr-only">{label}</SheetTitle>
          <div className="directory-filter-panel flex h-full min-h-0 flex-col pt-14">
            {renderPanel("-mobile")}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
