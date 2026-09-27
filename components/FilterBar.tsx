"use client";

import { useRef, useState, type ReactNode } from "react";
import { ChevronDown, RotateCcw, SlidersHorizontal } from "lucide-react";
import { CATEGORIES, STACKS, USE_CASES, type Category, type Stack, type UseCase } from "@/data/libraries";
import type { DirectoryFacetCounts } from "@/lib/directory";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Sidebar,
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
}

function FacetGroup<T extends string>({ label, allLabel, total, id, options, selected, counts, onSelect, onClear, expanded, onExpandedChange, selectionMode }: FacetGroupProps<T>) {
  const allValue = "__all__";

  return (
    <SidebarGroup className="directory-facet-group">
      <button
        type="button"
        className="directory-facet-heading"
        aria-expanded={expanded}
        aria-controls={id}
        onClick={onExpandedChange}
      >
        <span className="flex min-w-0 items-center gap-2">
          <ChevronDown className="directory-facet-heading-icon" aria-hidden />
          <span className="truncate">{label}</span>
        </span>
        <span className="directory-facet-summary" aria-live="polite">
          {selected.length > 0 ? `${selected.length} selected` : "All"}
        </span>
      </button>
      <SidebarGroupContent id={id} className="directory-facet-collapse" data-expanded={expanded} aria-hidden={!expanded} inert={!expanded}>
        <div className="directory-facet-collapse-inner">
        {selectionMode === "single" ? (
          <ToggleGroup
            type="single"
            value={selected[0] ?? allValue}
            onValueChange={(value) => value === allValue || value === "" ? onClear() : onSelect(value as T)}
            className="directory-facet-options directory-facet-options-single"
            aria-label={`${label} options`}
          >
            <ToggleGroupItem value={allValue} className="directory-facet-option">
              <span className="directory-facet-option-label">{allLabel}</span>
              <span className="directory-facet-count">{total}</span>
            </ToggleGroupItem>
            {options.map((option) => {
              const count = counts.get(option) ?? 0;
              return (
                <ToggleGroupItem key={option} value={option} disabled={count === 0 && selected[0] !== option} className={`directory-facet-option${count === 0 && selected[0] !== option ? " directory-facet-option-disabled" : ""}`}>
                  <span className="directory-facet-option-label">{option}</span>
                  <span className="directory-facet-count">{count}</span>
                </ToggleGroupItem>
              );
            })}
          </ToggleGroup>
        ) : (
          <div className="directory-facet-options" aria-label={`${label} options`}>
            <label htmlFor={`${id}-all`} className="directory-facet-option">
              <Checkbox id={`${id}-all`} checked={selected.length === 0} onCheckedChange={onClear} />
              <span className="directory-facet-option-label">{allLabel}</span>
              <span className="directory-facet-count">{total}</span>
            </label>
            {options.map((option) => {
              const isActive = selected.includes(option);
              const count = counts.get(option) ?? 0;
              const optionId = `${id}-${option.toLowerCase().replaceAll(" ", "-")}`;
              return (
                <label key={option} htmlFor={optionId} className={`directory-facet-option${count === 0 && !isActive ? " directory-facet-option-disabled" : ""}`}>
                  <Checkbox id={optionId} checked={isActive} disabled={count === 0 && !isActive} onCheckedChange={() => onSelect(option)} />
                  <span className="directory-facet-option-label">{option}</span>
                  <span className="directory-facet-count">{count}</span>
                </label>
              );
            })}
          </div>
        )}
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

      {hasFilters && (footer ?? <SidebarFooter>
        <Button type="button" variant="outline" onClick={onClearAll} className="min-h-11 w-full">
          <RotateCcw aria-hidden /> Clear filters
        </Button>
      </SidebarFooter>)}
    </>
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
  const { openMobile, setOpenMobile } = useSidebar();
  const filterTriggerRef = useRef<HTMLButtonElement>(null);
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

      <Sidebar collapsible="none" className="directory-sidebar directory-filter-panel hidden lg:flex" aria-label="Library filters">
        <FilterPanel {...panelProps} idSuffix="" />
      </Sidebar>

      <Sheet open={openMobile} onOpenChange={handleMobileOpenChange}>
        <SheetContent side="left" className="w-[16rem] gap-0 bg-sidebar p-0 lg:hidden">
          <SheetTitle className="sr-only">Library filters</SheetTitle>
          <div className="directory-filter-panel flex h-full min-h-0 flex-col pt-14">
            <FilterPanel {...panelProps} idSuffix="-mobile" />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
