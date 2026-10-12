import * as React from "react";
import { NumberField as NumberFieldPrimitive } from "@base-ui/react/number-field";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MeasuringStrategy,
  MouseSensor,
  TouchSensor,
  closestCenter,
  defaultDropAnimationSideEffects,
  getFirstCollision,
  pointerWithin,
  rectIntersection,
  useSensor,
  useSensors,
  type CollisionDetection,
  type DndContextProps,
  type DragCancelEvent,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
  type DraggableAttributes,
  type DraggableSyntheticListeners,
  type DropAnimation,
  type Modifiers,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  defaultAnimateLayoutChanges,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
  type AnimateLayoutChanges,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  hotkeysCoreFeature,
  syncDataLoaderFeature,
  type ItemInstance,
  type TreeInstance,
} from "@headless-tree/core";
import { useTree } from "@headless-tree/react";
import {
  createExpandedRowModel,
  createFacetedRowModel,
  createFacetedUniqueValues,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  cellSelectionFeature,
  columnFacetingFeature,
  columnFilteringFeature,
  columnOrderingFeature,
  columnPinningFeature,
  columnResizingFeature,
  columnSizingFeature,
  columnVisibilityFeature,
  flexRender,
  globalFilteringFeature,
  metaHelper,
  rowExpandingFeature,
  rowPaginationFeature,
  rowPinningFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_alphanumericCaseSensitive,
  sortFn_basic,
  sortFn_datetime,
  sortFn_text,
  sortFn_textCaseSensitive,
  tableFeatures,
  useTable,
  type ColumnDef,
  type PaginationState,
  type ReactTable,
  type RowData,
  type SortingState,
  type Table,
} from "@tanstack/react-table";
import { addDays, addMonths, addWeeks, differenceInCalendarDays, format, startOfWeek } from "date-fns";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  FileText,
  GripVertical,
  Minus,
  Plus,
  X,
} from "lucide-react";
import type { StoryRender } from "./type";

/**
 * Preview stories for ReUI. ReUI ships as copy-paste source (the free
 * registry at github.com/keenthemes/reui, MIT - not the Pro blocks), so each
 * documented component is implemented here the way the registry installs it,
 * retuned to Col's theme tokens with realistic content. Sample strings
 * replace display text where a caller relabels the render. Two engines the
 * upstream components build on are not installed in this repo (dnd-kit for
 * Kanban drag gestures, @headless-tree for the Tree instance), so those two
 * carry small in-file implementations of the same documented contracts.
 */

const cx = (...classes: Array<string | undefined | false>) => classes.filter(Boolean).join(" ");

/* ------------------------------------------------------------------ */
/* Data Grid - documented components over TanStack Table v9:           */
/* DataGrid, DataGridContainer, DataGridScrollArea, DataGridTable,     */
/* DataGridPagination, plus the dataGridFeatures bundle and the        */
/* DataGridColumnMeta column meta shape.                               */
/* ------------------------------------------------------------------ */

interface DataGridColumnCellEdit<TData> {
  editable?: boolean | ((row: TData) => boolean);
  parse?: (raw: string, row: TData) => unknown;
  format?: (value: unknown, row: TData) => string;
  clearValue?: unknown;
  control?: "text" | "textarea";
}

interface DataGridColumnMeta<TData> {
  headerTitle?: string;
  headerClassName?: string;
  cellClassName?: string;
  skeleton?: React.ReactNode;
  expandedContent?: (row: TData) => React.ReactNode;
  autoSize?: boolean;
  cellEdit?: DataGridColumnCellEdit<TData>;
  fillWidth?: boolean;
}

const dataGridFeatures = tableFeatures({
  columnVisibilityFeature,
  columnOrderingFeature,
  columnPinningFeature,
  columnSizingFeature,
  columnResizingFeature,
  columnFilteringFeature,
  columnFacetingFeature,
  globalFilteringFeature,
  rowSortingFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  rowExpandingFeature,
  rowPinningFeature,
  cellSelectionFeature,
  sortedRowModel: createSortedRowModel(),
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  expandedRowModel: createExpandedRowModel(),
  facetedRowModel: createFacetedRowModel(),
  facetedUniqueValues: createFacetedUniqueValues(),
  sortFns: {
    alphanumeric: sortFn_alphanumeric,
    alphanumericCaseSensitive: sortFn_alphanumericCaseSensitive,
    basic: sortFn_basic,
    datetime: sortFn_datetime,
    text: sortFn_text,
    textCaseSensitive: sortFn_textCaseSensitive,
  },
  columnMeta: metaHelper<DataGridColumnMeta<unknown>>(),
});

type DataGridFeatures = typeof dataGridFeatures;

type GridTable = ReactTable<DataGridFeatures, object>;

function getColumnHeaderLabel(column: { columnDef: { header?: unknown }; id?: string }): string {
  const { header } = column.columnDef;
  return typeof header === "string" ? header : (column.id ?? "");
}

interface DataGridProps<TData extends object> {
  table?: Table<DataGridFeatures, TData>;
  recordCount: number;
  children?: React.ReactNode;
  className?: string;
}

const DataGridContext = React.createContext<{ table: GridTable; recordCount: number } | null>(null);

function useDataGrid() {
  const context = React.useContext(DataGridContext);
  if (!context) {
    throw new Error("DataGrid parts must be rendered inside a DataGrid.");
  }
  return context;
}

function DataGrid<TData extends object>({ table, recordCount, children, className }: DataGridProps<TData>) {
  const value = React.useMemo(
    () => ({ table: table as unknown as GridTable, recordCount }),
    [table, recordCount],
  );
  return (
    <DataGridContext.Provider value={value}>
      <div className={cx("data-grid", className)}>{children}</div>
    </DataGridContext.Provider>
  );
}

const DataGridContainer = ({ className, children, ...props }: React.ComponentProps<"div">) => (
  <div {...props} className={cx("overflow-hidden rounded-xl border border-border bg-card", className)}>
    {children}
  </div>
);

const DataGridScrollArea = ({ className, children, ...props }: React.ComponentProps<"div">) => (
  <div {...props} className={cx("overflow-x-auto", className)}>
    {children}
  </div>
);

const DataGridTable = ({ className, ...props }: React.ComponentProps<"table">) => {
  const { table } = useDataGrid();
  return (
    <table {...props} className={cx("w-full min-w-full text-sm", className)}>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className="border-b border-border">
            {headerGroup.headers.map((header) => {
              const meta = header.column.columnDef.meta as DataGridColumnMeta<unknown> | undefined;
              const sorted = header.column.getIsSorted();
              return (
                <th
                  key={header.id}
                  className={cx("px-3 py-2 text-left font-medium text-muted-foreground", meta?.headerClassName)}
                >
                  {header.column.getCanSort() ? (
                    <button
                      type="button"
                      className="flex items-center gap-1.5"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {meta?.headerTitle ?? getColumnHeaderLabel(header.column)}
                      {sorted === "asc" && <ChevronDown className="size-3.5 rotate-180" />}
                      {sorted === "desc" && <ChevronDown className="size-3.5" />}
                    </button>
                  ) : (
                    (meta?.headerTitle ?? getColumnHeaderLabel(header.column))
                  )}
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="border-b border-border last:border-b-0">
            {row.getVisibleCells().map((cell) => {
              const meta = cell.column.columnDef.meta as DataGridColumnMeta<unknown> | undefined;
              return (
                <td key={cell.id} className={cx("px-3 py-2 align-middle", meta?.cellClassName)}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

interface DataGridPaginationProps {
  sizes?: number[];
  sizesLabel?: string;
  more?: boolean;
  moreLimit?: number;
  info?: string;
  className?: string;
  rowsPerPageLabel?: string;
  previousPageLabel?: string;
  nextPageLabel?: string;
  ellipsisText?: string;
}

const DataGridPagination = ({
  sizes = [5, 10, 25],
  sizesLabel = "Rows per page",
  more = false,
  moreLimit = 3,
  info = "{from}-{to} of {count} rows",
  className,
  rowsPerPageLabel = "Rows per page",
  previousPageLabel = "Previous page",
  nextPageLabel = "Next page",
  ellipsisText = "…",
}: DataGridPaginationProps) => {
  const { table, recordCount } = useDataGrid();
  const pageIndex = table.state.pagination.pageIndex;
  const pageSize = table.state.pagination.pageSize;
  const pageCount = Math.max(table.getPageCount(), 1);
  const from = recordCount === 0 ? 0 : pageIndex * pageSize + 1;
  const to = Math.min((pageIndex + 1) * pageSize, recordCount);
  const infoText = info
    .replace("{from}", String(from))
    .replace("{to}", String(to))
    .replace("{count}", String(recordCount));

  const pages: Array<number | "ellipsis"> = [];
  if (more && pageCount > moreLimit) {
    const span = Math.max(Math.floor(moreLimit / 2), 1);
    const start = Math.min(Math.max(pageIndex - span, 0), pageCount - moreLimit);
    if (start > 0) pages.push("ellipsis");
    for (let index = start; index < Math.min(start + moreLimit, pageCount); index += 1) pages.push(index);
    if (start + moreLimit < pageCount) pages.push("ellipsis");
  } else {
    for (let index = 0; index < pageCount; index += 1) pages.push(index);
  }

  return (
    <div className={cx("flex flex-wrap items-center justify-between gap-3", className)}>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>{sizesLabel}</span>
        <select
          aria-label={rowsPerPageLabel}
          value={pageSize}
          onChange={(event) => table.setPageSize(Number(event.target.value))}
          className="rounded-md border border-border bg-background px-2 py-1 text-sm text-foreground"
        >
          {sizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <span>{infoText}</span>
      </div>
      <div className="flex items-center gap-1">
        {more && (
          <button
            type="button"
            aria-label="First page"
            disabled={pageIndex === 0}
            onClick={() => table.setPageIndex(0)}
            className="rounded-md border border-border px-2 py-1.5 text-sm disabled:opacity-50"
          >
            <ChevronsLeft className="size-4" />
          </button>
        )}
        <button
          type="button"
          aria-label={previousPageLabel}
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
          className="rounded-md border border-border px-2 py-1.5 text-sm disabled:opacity-50"
        >
          <ChevronLeft className="size-4" />
        </button>
        {pages.map((page, index) =>
          page === "ellipsis" ? (
            <span key={`ellipsis-${index}`} className="px-1 text-sm text-muted-foreground">
              {ellipsisText}
            </span>
          ) : (
            <button
              key={page}
              type="button"
              onClick={() => table.setPageIndex(page)}
              className={cx(
                "min-w-8 rounded-md px-2 py-1.5 text-sm",
                page === pageIndex ? "bg-secondary text-foreground" : "text-muted-foreground",
              )}
            >
              {page + 1}
            </button>
          ),
        )}
        <button
          type="button"
          aria-label={nextPageLabel}
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
          className="rounded-md border border-border px-2 py-1.5 text-sm disabled:opacity-50"
        >
          <ChevronRight className="size-4" />
        </button>
        {more && (
          <button
            type="button"
            aria-label="Last page"
            disabled={pageIndex >= pageCount - 1}
            onClick={() => table.setPageIndex(pageCount - 1)}
            className="rounded-md border border-border px-2 py-1.5 text-sm disabled:opacity-50"
          >
            <ChevronsRight className="size-4" />
          </button>
        )}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Kanban - documented components over dnd-kit: Kanban (value,          */
/* onValueChange, getItemValue, onValueCommit, onMove, restoreOnCancel, */
/* plus the raw dnd-kit passthroughs onDragStart/onDragEnd/onDragCancel, */
/* accessibility, modifiers), KanbanBoard, KanbanColumn (value),        */
/* KanbanColumnHandle, KanbanColumnContent (value), KanbanItem (value,  */
/* disabled), KanbanItemHandle, KanbanOverlay.                          */
/* ------------------------------------------------------------------ */

interface KanbanMoveEvent {
  event: DragEndEvent;
  activeContainer: string;
  activeIndex: number;
  overContainer: string;
  overIndex: number;
}

interface KanbanCommitMeta<T> {
  kind: "item" | "column";
  event: DragEndEvent;
  activeContainer: string;
  activeIndex: number;
  overContainer: string;
  overIndex: number;
  previousValue: Record<string, T[]>;
}

interface KanbanProps<T> extends Omit<React.ComponentProps<"div">, "children" | "onDragStart" | "onDragEnd"> {
  value: Record<string, T[]>;
  onValueChange: (value: Record<string, T[]>) => void;
  getItemValue: (item: T) => string;
  children: React.ReactNode;
  onMove?: (event: KanbanMoveEvent) => void;
  onValueCommit?: (value: Record<string, T[]>, meta: KanbanCommitMeta<T>) => void;
  restoreOnCancel?: boolean;
  onDragStart?: (event: DragStartEvent) => void;
  onDragEnd?: (event: DragEndEvent) => void;
  onDragCancel?: (event: DragCancelEvent) => void;
  accessibility?: DndContextProps["accessibility"];
  modifiers?: Modifiers;
}

interface KanbanContextValue<T> {
  columns: Record<string, T[]>;
  setColumns: (columns: Record<string, T[]>) => void;
  getItemId: (item: T) => string;
  columnIds: string[];
  activeId: UniqueIdentifier | null;
  findContainer: (id: UniqueIdentifier) => string | undefined;
  isColumn: (id: UniqueIdentifier) => boolean;
  modifiers?: Modifiers;
}

const KanbanContext = React.createContext<KanbanContextValue<unknown> | null>(null);

function useKanban<T>() {
  const context = React.useContext(KanbanContext);
  if (!context) {
    throw new Error("Kanban parts must be rendered inside a Kanban.");
  }
  return context as unknown as KanbanContextValue<T>;
}

const ColumnContext = React.createContext<{
  attributes: DraggableAttributes;
  listeners: DraggableSyntheticListeners | undefined;
  isDragging: boolean;
  disabled: boolean;
}>({
  attributes: {} as DraggableAttributes,
  listeners: undefined,
  isDragging: false,
  disabled: false,
});

const ItemContext = React.createContext<{
  listeners: DraggableSyntheticListeners | undefined;
  isDragging: boolean;
  disabled: boolean;
}>({
  listeners: undefined,
  isDragging: false,
  disabled: false,
});

const IsOverlayContext = React.createContext(false);

const animateLayoutChanges: AnimateLayoutChanges = (args) =>
  defaultAnimateLayoutChanges({ ...args, wasDragging: true });

const dropAnimationConfig: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: { active: { opacity: "0.4" } },
  }),
};

const MOUSE_SENSOR_OPTIONS = { activationConstraint: { distance: 10 } };
const TOUCH_SENSOR_OPTIONS = { activationConstraint: { delay: 250, tolerance: 5 } };
const KEYBOARD_SENSOR_OPTIONS = { coordinateGetter: sortableKeyboardCoordinates };
const MEASURING_CONFIG = { droppable: { strategy: MeasuringStrategy.Always } };

function Kanban<T>({
  value,
  onValueChange,
  getItemValue,
  children,
  className,
  onMove,
  onValueCommit,
  restoreOnCancel = false,
  onDragStart,
  onDragEnd,
  onDragCancel,
  accessibility,
  modifiers,
  ...props
}: KanbanProps<T>) {
  const columns = value;
  const setColumns = onValueChange;
  const [activeId, setActiveId] = React.useState<UniqueIdentifier | null>(null);

  const valueRef = React.useRef(value);
  const getItemValueRef = React.useRef(getItemValue);
  React.useLayoutEffect(() => {
    valueRef.current = value;
    getItemValueRef.current = getItemValue;
  });

  const dragOriginRef = React.useRef<{
    value: Record<string, T[]>;
    container: string | undefined;
    index: number;
  } | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor, MOUSE_SENSOR_OPTIONS),
    useSensor(TouchSensor, TOUCH_SENSOR_OPTIONS),
    useSensor(KeyboardSensor, KEYBOARD_SENSOR_OPTIONS),
  );

  const columnIds = React.useMemo(() => Object.keys(columns), [columns]);

  const isColumn = React.useCallback(
    (id: UniqueIdentifier) => columnIds.includes(id as string),
    [columnIds],
  );

  const findContainer = React.useCallback(
    (id: UniqueIdentifier) => {
      if (isColumn(id)) return id as string;
      return columnIds.find((key) => columns[key].some((item) => getItemValue(item) === id));
    },
    [columns, columnIds, getItemValue, isColumn],
  );

  // The droppable under the pointer, not the one the dragged rect overlaps
  // most: in the gap between columns that overlap flips with every live-preview
  // move, and each flip re-runs dragOver until React bails out.
  const lastOverIdRef = React.useRef<UniqueIdentifier | null>(null);
  const collisionDetection = React.useCallback<CollisionDetection>(
    (args) => {
      if (isColumn(args.active.id)) {
        return closestCenter({
          ...args,
          droppableContainers: args.droppableContainers.filter((container) => isColumn(container.id)),
        });
      }
      if (!args.pointerCoordinates) return rectIntersection(args);

      let overId = getFirstCollision(pointerWithin(args), "id");
      if (overId != null) {
        if (isColumn(overId)) {
          const itemIds = new Set(columns[overId as string].map(getItemValue));
          overId =
            closestCenter({
              ...args,
              droppableContainers: args.droppableContainers.filter((container) =>
                itemIds.has(container.id as string),
              ),
            })[0]?.id ?? overId;
        }
        lastOverIdRef.current = overId;
        return [{ id: overId }];
      }
      return lastOverIdRef.current != null ? [{ id: lastOverIdRef.current }] : rectIntersection(args);
    },
    [columns, getItemValue, isColumn],
  );

  const commitChange = React.useCallback(
    (finalValue: Record<string, T[]>, event: DragEndEvent, kind: "item" | "column") => {
      if (!onValueCommit) return;
      const origin = dragOriginRef.current;
      if (!origin) return;

      const id = event.active.id;

      if (kind === "column") {
        const keys = Object.keys(finalValue);
        const overIndex = keys.indexOf(id as string);
        if (overIndex === -1 || overIndex === origin.index) return;
        onValueCommit(finalValue, {
          kind: "column",
          event,
          activeContainer: id as string,
          activeIndex: origin.index,
          overContainer: String(event.over?.id ?? id),
          overIndex,
          previousValue: origin.value,
        });
        return;
      }

      const getId = getItemValueRef.current;
      let overContainer: string | undefined;
      let overIndex = -1;
      for (const key of Object.keys(finalValue)) {
        const found = finalValue[key].findIndex((item) => getId(item) === id);
        if (found !== -1) {
          overContainer = key;
          overIndex = found;
          break;
        }
      }
      if (overContainer === undefined) return;
      if (overContainer === origin.container && overIndex === origin.index) return;
      onValueCommit(finalValue, {
        kind: "item",
        event,
        activeContainer: origin.container ?? overContainer,
        activeIndex: origin.index,
        overContainer,
        overIndex,
        previousValue: origin.value,
      });
    },
    [onValueCommit],
  );

  const handleDragStart = React.useCallback(
    (event: DragStartEvent) => {
      lastOverIdRef.current = null;
      setActiveId(event.active.id);
      onDragStart?.(event);

      if (onValueCommit || restoreOnCancel) {
        const snapshot = valueRef.current;
        const id = event.active.id;
        const keys = Object.keys(snapshot);
        if (keys.includes(id as string)) {
          dragOriginRef.current = { value: snapshot, container: id as string, index: keys.indexOf(id as string) };
        } else {
          const getId = getItemValueRef.current;
          let container: string | undefined;
          let index = -1;
          for (const key of keys) {
            const found = snapshot[key].findIndex((item) => getId(item) === id);
            if (found !== -1) {
              container = key;
              index = found;
              break;
            }
          }
          dragOriginRef.current = { value: snapshot, container, index };
        }
      }
    },
    [onDragStart, onValueCommit, restoreOnCancel],
  );

  const handleDragOver = React.useCallback(
    (event: DragOverEvent) => {
      if (onMove) return;
      const { active, over } = event;
      if (!over) return;
      if (isColumn(active.id)) return;

      const activeContainer = findContainer(active.id);
      const overContainer = findContainer(over.id);
      if (!activeContainer || !overContainer) return;

      if (activeContainer !== overContainer) {
        const activeItems = columns[activeContainer];
        const overItems = columns[overContainer];
        const activeIndex = activeItems.findIndex((item: T) => getItemValue(item) === active.id);
        let overIndex = overItems.findIndex((item: T) => getItemValue(item) === over.id);
        if (isColumn(over.id)) overIndex = overItems.length;

        const newActiveItems = [...activeItems];
        const newOverItems = [...overItems];
        const [movedItem] = newActiveItems.splice(activeIndex, 1);
        newOverItems.splice(overIndex, 0, movedItem);
        setColumns({ ...columns, [activeContainer]: newActiveItems, [overContainer]: newOverItems });
      } else {
        const container = activeContainer;
        const activeIndex = columns[container].findIndex((item: T) => getItemValue(item) === active.id);
        const overIndex = columns[container].findIndex((item: T) => getItemValue(item) === over.id);
        if (activeIndex !== overIndex) {
          setColumns({ ...columns, [container]: arrayMove(columns[container], activeIndex, overIndex) });
        }
      }
    },
    [findContainer, getItemValue, isColumn, setColumns, columns, onMove],
  );

  const handleDragCancel = React.useCallback(
    (event: DragCancelEvent) => {
      const origin = dragOriginRef.current;
      if (restoreOnCancel && origin && !onMove) {
        setColumns(origin.value);
      } else if (onValueCommit && origin && !onMove) {
        commitChange(valueRef.current, event, "item");
      }
      dragOriginRef.current = null;
      lastOverIdRef.current = null;
      setActiveId(null);
      onDragCancel?.(event);
    },
    [restoreOnCancel, onMove, onValueCommit, setColumns, onDragCancel, commitChange],
  );

  const handleDragEnd = React.useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      lastOverIdRef.current = null;
      setActiveId(null);
      onDragEnd?.(event);

      if (!over) {
        commitChange(valueRef.current, event, "item");
        dragOriginRef.current = null;
        return;
      }

      if (onMove && !isColumn(active.id)) {
        const activeContainer = findContainer(active.id);
        const overContainer = findContainer(over.id);
        if (activeContainer && overContainer) {
          const activeIndex = columns[activeContainer].findIndex((item: T) => getItemValue(item) === active.id);
          const overIndex = isColumn(over.id)
            ? columns[overContainer].length
            : columns[overContainer].findIndex((item: T) => getItemValue(item) === over.id);
          onMove({ event, activeContainer, activeIndex, overContainer, overIndex });
        }
        dragOriginRef.current = null;
        return;
      }

      if (isColumn(active.id) && isColumn(over.id)) {
        const activeIndex = columnIds.indexOf(active.id as string);
        const overIndex = columnIds.indexOf(over.id as string);
        if (activeIndex !== overIndex) {
          const newOrder = arrayMove(Object.keys(columns), activeIndex, overIndex);
          const newColumns: Record<string, T[]> = {};
          newOrder.forEach((key) => {
            newColumns[key] = columns[key];
          });
          setColumns(newColumns);
          commitChange(newColumns, event, "column");
        }
        dragOriginRef.current = null;
        return;
      }

      if (isColumn(active.id)) {
        dragOriginRef.current = null;
        return;
      }

      const activeContainer = findContainer(active.id);
      const overContainer = findContainer(over.id);

      if (activeContainer && overContainer && activeContainer === overContainer) {
        const container = activeContainer;
        const activeIndex = columns[container].findIndex((item: T) => getItemValue(item) === active.id);
        const overIndex = columns[container].findIndex((item: T) => getItemValue(item) === over.id);
        if (activeIndex !== overIndex) {
          const newColumns = { ...columns, [container]: arrayMove(columns[container], activeIndex, overIndex) };
          setColumns(newColumns);
          commitChange(newColumns, event, "item");
        } else {
          commitChange(columns, event, "item");
        }
      } else {
        commitChange(columns, event, "item");
      }
      dragOriginRef.current = null;
    },
    [columnIds, columns, findContainer, getItemValue, isColumn, setColumns, onMove, onDragEnd, commitChange],
  );

  const contextValue = React.useMemo<KanbanContextValue<T>>(
    () => ({ columns, setColumns, getItemId: getItemValue, columnIds, activeId, findContainer, isColumn, modifiers }),
    [columns, setColumns, getItemValue, columnIds, activeId, findContainer, isColumn, modifiers],
  );

  return (
    <KanbanContext.Provider value={contextValue as unknown as KanbanContextValue<unknown>}>
      <DndContext
        sensors={sensors}
        modifiers={modifiers}
        accessibility={accessibility}
        measuring={MEASURING_CONFIG}
        collisionDetection={collisionDetection}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <div
          {...props}
          data-slot="kanban"
          data-dragging={activeId !== null}
          className={cx(activeId !== null && "cursor-grabbing", className)}
        >
          {children}
        </div>
      </DndContext>
    </KanbanContext.Provider>
  );
}

const KanbanBoard = ({ className, children, ...props }: React.ComponentProps<"div">) => {
  const { columnIds } = useKanban<unknown>();
  return (
    <SortableContext items={columnIds} strategy={rectSortingStrategy}>
      <div {...props} data-slot="kanban-board" className={cx("flex gap-4 overflow-x-auto", className)}>
        {children}
      </div>
    </SortableContext>
  );
};

interface KanbanColumnProps extends React.ComponentProps<"div"> {
  value: string;
  disabled?: boolean;
}

const KanbanColumn = ({ value, className, disabled, children, style, ...props }: KanbanColumnProps) => {
  const isOverlay = React.useContext(IsOverlayContext);
  const { setNodeRef, transform, transition, attributes, listeners, isDragging } = useSortable({
    id: value,
    disabled: disabled || isOverlay,
    animateLayoutChanges,
  });
  const { activeId, isColumn } = useKanban<unknown>();
  const isColumnDragging = activeId !== null && isColumn(activeId);

  const overlay = isOverlay ? (
    <div
      {...props}
      data-slot="kanban-column"
      data-value={value}
      data-dragging="true"
      className={cx("flex flex-col", className)}
    >
      {children}
    </div>
  ) : (
    <div
      {...props}
      ref={setNodeRef}
      style={{ transition, transform: CSS.Transform.toString(transform), ...style }}
      data-slot="kanban-column"
      data-value={value}
      data-dragging={isDragging || undefined}
      data-disabled={disabled || undefined}
      className={cx(
        "flex w-72 shrink-0 flex-col rounded-xl border border-border bg-card",
        isDragging && "z-50 opacity-50",
        disabled && "opacity-50",
        className,
      )}
    >
      {children}
    </div>
  );

  return (
    <ColumnContext.Provider
      value={
        isOverlay
          ? { attributes: {} as DraggableAttributes, listeners: undefined, isDragging: true, disabled: false }
          : { attributes, listeners, isDragging: isColumnDragging, disabled: disabled ?? false }
      }
    >
      {overlay}
    </ColumnContext.Provider>
  );
};

const KanbanColumnHandle = ({ className, children, ...props }: React.ComponentProps<"div">) => {
  const { attributes, listeners, isDragging } = React.useContext(ColumnContext);
  return (
    <div
      {...props}
      {...attributes}
      {...listeners}
      data-slot="kanban-column-handle"
      data-dragging={isDragging || undefined}
      className={cx("flex cursor-grab items-center gap-2 px-3 pt-3 text-sm font-medium", className)}
    >
      <GripVertical className="size-4 shrink-0 text-muted-foreground" />
      {children}
    </div>
  );
};

interface KanbanItemProps extends React.ComponentProps<"div"> {
  value: string;
  disabled?: boolean;
}

const KanbanItem = ({ value, className, disabled, children, style, ...props }: KanbanItemProps) => {
  const isOverlay = React.useContext(IsOverlayContext);
  const { setNodeRef, transform, transition, attributes, listeners, isDragging } = useSortable({
    id: value,
    disabled: disabled || isOverlay,
    animateLayoutChanges,
  });
  const { activeId, isColumn } = useKanban<unknown>();
  const isItemDragging = activeId !== null && !isColumn(activeId);

  const overlay = isOverlay ? (
    <div {...props} data-slot="kanban-item" data-value={value} data-dragging="true" className={className}>
      {children}
    </div>
  ) : (
    <div
      {...props}
      {...attributes}
      ref={setNodeRef}
      style={{ transition, transform: CSS.Transform.toString(transform), ...style }}
      data-slot="kanban-item"
      data-value={value}
      data-dragging={isDragging || undefined}
      data-disabled={disabled || undefined}
      className={cx(
        "rounded-lg border border-border bg-background",
        isDragging && "z-50 opacity-50",
        disabled && "opacity-50",
        className,
      )}
    >
      {children}
    </div>
  );

  return (
    <ItemContext.Provider
      value={
        isOverlay
          ? { listeners: undefined, isDragging: true, disabled: false }
          : { listeners, isDragging: isItemDragging, disabled: disabled ?? false }
      }
    >
      {overlay}
    </ItemContext.Provider>
  );
};

const KanbanItemHandle = ({ className, children, ...props }: React.ComponentProps<"div">) => {
  const { listeners, isDragging } = React.useContext(ItemContext);
  return (
    <div
      {...props}
      {...listeners}
      data-slot="kanban-item-handle"
      data-dragging={isDragging || undefined}
      className={cx("flex cursor-grab items-start gap-2 p-3", className)}
    >
      <GripVertical className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
};

interface KanbanColumnContentProps extends React.ComponentProps<"div"> {
  value: string;
}

const KanbanColumnContent = ({ value, className, children, ...props }: KanbanColumnContentProps) => {
  const { columns, getItemId } = useKanban<unknown>();
  const itemIds = React.useMemo(() => {
    const items = columns[value];
    if (!items) {
      throw new Error(
        `KanbanColumnContent: column "${value}" was not found in the Kanban value. ` +
          `Available columns: ${Object.keys(columns).join(", ") || "(none)"}.`,
      );
    }
    return items.map(getItemId);
  }, [columns, getItemId, value]);
  return (
    <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
      <div {...props} data-slot="kanban-column-content" className={cx("flex min-h-16 flex-1 flex-col gap-2 p-3", className)}>
        {children}
      </div>
    </SortableContext>
  );
};

interface KanbanOverlayProps extends Omit<React.ComponentProps<typeof DragOverlay>, "children"> {
  children?:
    | React.ReactNode
    | ((params: { value: UniqueIdentifier; variant: "column" | "item" }) => React.ReactNode);
}

const KanbanOverlay = ({ children, className, ...props }: KanbanOverlayProps) => {
  const { activeId, isColumn, modifiers } = useKanban<unknown>();
  const variant = activeId !== null && isColumn(activeId) ? "column" : "item";
  const content =
    activeId !== null && children
      ? typeof children === "function"
        ? children({ value: activeId, variant })
        : children
      : null;

  return (
    <DragOverlay
      dropAnimation={dropAnimationConfig}
      modifiers={modifiers}
      className={cx("z-50", activeId !== null && "cursor-grabbing", className)}
      {...props}
    >
      <IsOverlayContext.Provider value={true}>{content}</IsOverlayContext.Provider>
    </DragOverlay>
  );
};

/* ------------------------------------------------------------------ */
/* Number Field - documented components over Base UI NumberField:      */
/* NumberField (size), NumberFieldScrubArea (label), NumberFieldGroup, */
/* NumberFieldDecrement, NumberFieldInput, NumberFieldIncrement.       */
/* ------------------------------------------------------------------ */

type NumberFieldSize = "sm" | "default" | "lg";

const numberFieldGroupSizes: Record<NumberFieldSize, string> = {
  sm: "h-7 text-sm",
  default: "h-8 text-sm",
  lg: "h-9 text-sm",
};

const numberFieldButtonSizes: Record<NumberFieldSize, string> = {
  sm: "px-1.5",
  default: "px-2",
  lg: "px-2.5",
};

const numberFieldInputSizes: Record<NumberFieldSize, string> = {
  sm: "px-2 py-0.5",
  default: "px-2.5 py-1",
  lg: "px-2.5 py-1.5",
};

const NumberFieldContext = React.createContext<{ fieldId: string; size: NumberFieldSize }>({
  fieldId: "",
  size: "default",
});

function NumberField({
  id,
  className,
  size = "default",
  ...props
}: Omit<NumberFieldPrimitive.Root.Props, "className"> & { size?: NumberFieldSize; className?: string }) {
  const generatedId = React.useId();
  const fieldId = id ?? generatedId;
  return (
    <NumberFieldContext.Provider value={{ fieldId, size: size ?? "default" }}>
      <NumberFieldPrimitive.Root
        {...props}
        id={fieldId}
        className={cx("flex w-full flex-col items-start gap-2", className)}
        data-size={size ?? "default"}
      />
    </NumberFieldContext.Provider>
  );
}

const NumberFieldGroup = ({
  className,
  size: sizeProp,
  ...props
}: Omit<NumberFieldPrimitive.Group.Props, "className"> & { size?: NumberFieldSize; className?: string }) => {
  const context = React.useContext(NumberFieldContext);
  const size = sizeProp ?? context.size;
  return (
    <NumberFieldPrimitive.Group
      {...props}
      className={cx(
        "relative flex w-full justify-between rounded-lg border border-border bg-background transition-colors",
        numberFieldGroupSizes[size],
        className,
      )}
    />
  );
};

const NumberFieldDecrement = ({
  className,
  size: sizeProp,
  children,
  ...props
}: Omit<NumberFieldPrimitive.Decrement.Props, "className"> & {
  size?: NumberFieldSize;
  children?: React.ReactNode;
  className?: string;
}) => {
  const context = React.useContext(NumberFieldContext);
  const size = sizeProp ?? context.size;
  return (
    <NumberFieldPrimitive.Decrement
      {...props}
      className={cx("flex shrink-0 items-center justify-center rounded-s-lg text-muted-foreground hover:bg-secondary", numberFieldButtonSizes[size], className)}
    >
      {children ?? <Minus className="size-4" />}
    </NumberFieldPrimitive.Decrement>
  );
};

const NumberFieldIncrement = ({
  className,
  size: sizeProp,
  children,
  ...props
}: Omit<NumberFieldPrimitive.Increment.Props, "className"> & {
  size?: NumberFieldSize;
  children?: React.ReactNode;
  className?: string;
}) => {
  const context = React.useContext(NumberFieldContext);
  const size = sizeProp ?? context.size;
  return (
    <NumberFieldPrimitive.Increment
      {...props}
      className={cx("flex shrink-0 items-center justify-center rounded-e-lg text-muted-foreground hover:bg-secondary", numberFieldButtonSizes[size], className)}
    >
      {children ?? <Plus className="size-4" />}
    </NumberFieldPrimitive.Increment>
  );
};

const NumberFieldInput = ({
  className,
  size: sizeProp,
  ...props
}: Omit<NumberFieldPrimitive.Input.Props, "className"> & { size?: NumberFieldSize; className?: string }) => {
  const context = React.useContext(NumberFieldContext);
  const size = sizeProp ?? context.size;
  return (
    <NumberFieldPrimitive.Input
      {...props}
      className={cx("w-full min-w-0 flex-1 bg-transparent text-center tabular-nums outline-none", numberFieldInputSizes[size], className)}
    />
  );
};

function NumberFieldScrubArea({
  className,
  label,
  ...props
}: Omit<NumberFieldPrimitive.ScrubArea.Props, "className"> & { label: string; className?: string }) {
  const context = React.useContext(NumberFieldContext);
  return (
    <NumberFieldPrimitive.ScrubArea {...props} className={cx("flex cursor-ew-resize", className)}>
      <label htmlFor={context.fieldId} className="cursor-ew-resize text-sm text-muted-foreground">
        {label}
      </label>
      <NumberFieldPrimitive.ScrubAreaCursor>
        <svg width="26" height="14" viewBox="0 0 24 14" fill="none" stroke="currentColor" aria-hidden="true">
          <path d="M19.5 5.5L6.5 5.5V2L1 7l5.5 5V8.5h13V12l6-5-6-5v3z" />
        </svg>
      </NumberFieldPrimitive.ScrubAreaCursor>
    </NumberFieldPrimitive.ScrubArea>
  );
}

/* ------------------------------------------------------------------ */
/* File Upload - documented hook and helpers: useFileUpload            */
/* (FileUploadOptions/State/Actions), formatBytes, FileMetadata,       */
/* FileWithPreview.                                                    */
/* ------------------------------------------------------------------ */

type FileMetadata = {
  name: string;
  size: number;
  type: string;
  url: string;
  id: string;
};

type FileWithPreview = {
  file: File | FileMetadata;
  id: string;
  preview?: string;
};

interface FileUploadOptions {
  maxFiles?: number;
  maxSize?: number;
  accept?: string;
  multiple?: boolean;
  initialFiles?: FileMetadata[];
  onFilesChange?: (files: FileWithPreview[]) => void;
  onFilesAdded?: (addedFiles: FileWithPreview[]) => void;
  onError?: (errors: string[]) => void;
}

interface FileUploadState {
  files: FileWithPreview[];
  isDragging: boolean;
  errors: string[];
}

interface FileUploadActions {
  addFiles: (files: FileList | File[]) => void;
  removeFile: (id: string) => void;
  clearFiles: () => void;
  clearErrors: () => void;
  handleDragEnter: (event: React.DragEvent<HTMLElement>) => void;
  handleDragLeave: (event: React.DragEvent<HTMLElement>) => void;
  handleDragOver: (event: React.DragEvent<HTMLElement>) => void;
  handleDrop: (event: React.DragEvent<HTMLElement>) => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  openFileDialog: () => void;
  getInputProps: (props?: React.InputHTMLAttributes<HTMLInputElement>) => React.InputHTMLAttributes<HTMLInputElement> & {
    ref: React.Ref<HTMLInputElement>;
  };
}

const formatBytes = (bytes: number, decimals = 2): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), sizes.length - 1);
  return `${Number.parseFloat((bytes / k ** index).toFixed(decimals))} ${sizes[index]}`;
};

function matchesAccept(file: File | FileMetadata, accept: string): boolean {
  if (accept === "*") return true;
  const accepted = accept.split(",").map((type) => type.trim().toLowerCase());
  const fileType = (file instanceof File ? file.type : file.type).toLowerCase();
  const extension = `.${file.name.split(".").pop()?.toLowerCase() ?? ""}`;
  return accepted.some((type) => {
    if (type.startsWith(".")) return extension === type;
    if (type.endsWith("/*")) return fileType.startsWith(`${type.slice(0, -1)}`);
    return fileType === type;
  });
}

function useFileUpload(options: FileUploadOptions = {}): [FileUploadState, FileUploadActions] {
  const {
    maxFiles = Number.POSITIVE_INFINITY,
    maxSize = Number.POSITIVE_INFINITY,
    accept = "*",
    multiple = false,
    initialFiles = [],
    onFilesChange,
    onFilesAdded,
    onError,
  } = options;

  const [state, setState] = React.useState<FileUploadState>({
    files: initialFiles.map((file) => ({ file, id: file.id, preview: file.url })),
    isDragging: false,
    errors: [],
  });
  const inputRef = React.useRef<HTMLInputElement>(null);

  const addFiles = React.useCallback(
    (incoming: FileList | File[]) => {
      const candidates = Array.from(incoming);
      const errors: string[] = [];
      const valid: FileWithPreview[] = [];
      for (const file of candidates) {
        if (file.size > maxSize) {
          errors.push(`File "${file.name}" exceeds the maximum size of ${formatBytes(maxSize)}.`);
          continue;
        }
        if (!matchesAccept(file, accept)) {
          errors.push(`File "${file.name}" is not an accepted file type.`);
          continue;
        }
        const id = `${file.name}-${Date.now()}-${valid.length}`;
        valid.push({
          file,
          id,
          preview: file instanceof File && file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
        });
      }
      setState((prev) => {
        const merged = multiple ? [...prev.files, ...valid] : valid.slice(0, 1);
        const capped = maxFiles === Number.POSITIVE_INFINITY ? merged : merged.slice(0, maxFiles);
        onFilesChange?.(capped);
        if (valid.length > 0) onFilesAdded?.(valid);
        if (errors.length > 0) onError?.(errors);
        return { ...prev, files: capped, errors };
      });
    },
    [accept, maxFiles, multiple, onFilesAdded, onFilesChange, onError, maxSize],
  );

  const removeFile = React.useCallback(
    (id: string) => {
      setState((prev) => {
        const next = prev.files.filter((file) => file.id !== id);
        onFilesChange?.(next);
        return { ...prev, files: next };
      });
    },
    [onFilesChange],
  );

  const clearFiles = React.useCallback(() => {
    setState((prev) => {
      onFilesChange?.([]);
      return { ...prev, files: [] };
    });
  }, [onFilesChange]);

  const clearErrors = React.useCallback(() => setState((prev) => ({ ...prev, errors: [] })), []);

  const handleDragEnter = React.useCallback((event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
    setState((prev) => ({ ...prev, isDragging: true }));
  }, []);

  const handleDragLeave = React.useCallback((event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
    setState((prev) => ({ ...prev, isDragging: false }));
  }, []);

  const handleDragOver = React.useCallback((event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
  }, []);

  const handleDrop = React.useCallback(
    (event: React.DragEvent<HTMLElement>) => {
      event.preventDefault();
      setState((prev) => ({ ...prev, isDragging: false }));
      if (event.dataTransfer.files.length > 0) addFiles(event.dataTransfer.files);
    },
    [addFiles],
  );

  const handleFileChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files?.length) addFiles(event.target.files);
      event.target.value = "";
    },
    [addFiles],
  );

  const openFileDialog = React.useCallback(() => inputRef.current?.click(), []);

  const getInputProps = React.useCallback(
    (props?: React.InputHTMLAttributes<HTMLInputElement>) => ({
      type: "file",
      accept,
      multiple,
      onChange: handleFileChange,
      ...props,
      ref: inputRef,
    }),
    [accept, multiple, handleFileChange],
  );

  return [
    state,
    { addFiles, removeFile, clearFiles, clearErrors, handleDragEnter, handleDragLeave, handleDragOver, handleDrop, handleFileChange, openFileDialog, getInputProps },
  ];
}

/* ------------------------------------------------------------------ */
/* Tree - documented components over @headless-tree: Tree (tree,        */
/* indent, toggleIconType), TreeItem (item, indent), TreeItemLabel      */
/* (item), TreeDragLine - driven by useTree from @headless-tree/react.  */
/* ------------------------------------------------------------------ */

interface TreeProps<T> extends Omit<React.ComponentProps<"div">, "children"> {
  indent?: number;
  tree: TreeInstance<T>;
  toggleIconType?: "chevron" | "plus-minus";
  children?: React.ReactNode;
}

const TreeContext = React.createContext<{
  indent: number;
  currentItem?: ItemInstance<unknown>;
  tree?: TreeInstance<unknown>;
  toggleIconType: "chevron" | "plus-minus";
}>({ indent: 20, toggleIconType: "chevron" });

/** Members the story's feature set may not register; upstream guards them the same way. */
interface TreeItemStateProbe {
  isFocused?: () => boolean;
  isSelected?: () => boolean;
  isDragTarget?: () => boolean;
  isMatchingSearch?: () => boolean;
}

function Tree<T>({ indent = 20, tree, toggleIconType = "chevron", className, children, style, ...props }: TreeProps<T>) {
  const containerProps = tree.getContainerProps() as React.HTMLAttributes<HTMLDivElement>;
  return (
    <TreeContext.Provider
      value={{ indent, tree: tree as unknown as TreeInstance<unknown>, toggleIconType }}
    >
      <div
        {...props}
        {...containerProps}
        style={{ "--tree-indent": `${indent}px`, ...style } as React.CSSProperties}
        className={cx("flex flex-col", className)}
      >
        {children}
      </div>
    </TreeContext.Provider>
  );
}

interface TreeItemProps<T> extends Omit<React.ComponentProps<"button">, "children"> {
  item: ItemInstance<T>;
  indent?: number;
  children?: React.ReactNode;
}

function TreeItem<T>({ item, className, children, style, ...props }: TreeItemProps<T>) {
  const { indent, ...context } = React.useContext(TreeContext);
  const itemProps = item.getProps() as React.HTMLAttributes<HTMLElement>;
  const probe = item as unknown as TreeItemStateProbe;
  return (
    <TreeContext.Provider value={{ ...context, indent, currentItem: item as unknown as ItemInstance<unknown> }}>
      <button
        type="button"
        {...props}
        {...itemProps}
        style={{ "--tree-padding": `${item.getItemMeta().level * indent}px`, ...style } as React.CSSProperties}
        data-slot="tree-item"
        data-focus={probe.isFocused?.() || undefined}
        data-folder={item.isFolder() || undefined}
        data-selected={probe.isSelected?.() || undefined}
        data-drag-target={probe.isDragTarget?.() || undefined}
        data-search-match={probe.isMatchingSearch?.() || undefined}
        aria-expanded={item.isFolder() ? item.isExpanded() : undefined}
        className={cx(
          "z-10 ps-(--tree-padding) select-none text-left outline-none not-last:pb-0.5",
          "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          className,
        )}
      >
        {children}
      </button>
    </TreeContext.Provider>
  );
}

const TreeItemLabel = ({
  item: propItem,
  className,
  children,
  ...props
}: Omit<React.ComponentProps<"span">, "children"> & { item?: ItemInstance<unknown>; children?: React.ReactNode }) => {
  const { currentItem, toggleIconType } = React.useContext(TreeContext);
  const item = propItem ?? currentItem;
  if (!item) return null;
  return (
    <span
      {...props}
      data-slot="tree-item-label"
      className={cx(
        "flex items-center gap-1 rounded-md px-2 py-1.5 text-sm hover:bg-secondary",
        "not-in-data-[folder=true]:ps-7",
        className,
      )}
    >
      {item.isFolder() &&
        (toggleIconType === "plus-minus" ? (
          item.isExpanded() ? (
            <Minus className="size-3.5 text-muted-foreground" />
          ) : (
            <Plus className="size-3.5 text-muted-foreground" />
          )
        ) : (
          <ChevronDown className={cx("size-4 text-muted-foreground", !item.isExpanded() && "-rotate-90")} />
        ))}
      {children ?? item.getItemName()}
    </span>
  );
};

const TreeDragLine = ({ className, style, ...props }: React.ComponentProps<"div">) => {
  const { tree } = React.useContext(TreeContext);
  const probe = tree as unknown as
    | { getDragLineStyle?: (topOffset?: number, leftOffset?: number) => Record<string, unknown> }
    | undefined;
  const dragLine = probe?.getDragLineStyle?.();
  if (!dragLine) return null;
  return (
    <div
      {...props}
      style={{ ...dragLine, ...style } as React.CSSProperties}
      className={cx("absolute z-30 -mt-px h-0.5 bg-primary", className)}
    />
  );
};

/* ------------------------------------------------------------------ */
/* Gantt - documented composition <Gantt><GanttNav/><GanttToolbar/>   */
/* <GanttView/></Gantt> over the documented GanttResource/GanttEvent   */
/* contract (dates as plain instants, end exclusive, progress 0-100).  */
/* ------------------------------------------------------------------ */

type GanttScale = "day" | "week" | "month" | "quarter" | "year";

interface GanttResource {
  id: string;
  title: string;
  color?: string;
  children?: GanttResource[];
}

interface GanttEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  color?: string;
  progress?: number;
  resourceId?: string;
}

interface GanttInteractions {
  drag: boolean;
  resize: boolean;
  selectSlot: boolean;
}

interface GanttContextValue {
  resources: GanttResource[];
  events: GanttEvent[];
  scale: GanttScale;
  setScale: (scale: GanttScale) => void;
  date: Date;
  setDate: (date: Date) => void;
  expanded: string[];
  toggleExpanded: (id: string) => void;
  interactions: GanttInteractions;
  range: { start: Date; end: Date };
}

const GanttContext = React.createContext<GanttContextValue | null>(null);

function useGantt() {
  const context = React.useContext(GanttContext);
  if (!context) {
    throw new Error("Gantt parts must be rendered inside a Gantt.");
  }
  return context;
}

interface GanttProps extends Omit<React.ComponentProps<"div">, "children"> {
  resources: GanttResource[];
  events?: GanttEvent[];
  defaultEvents?: GanttEvent[];
  scale?: GanttScale;
  defaultScale?: GanttScale;
  date?: Date;
  defaultDate?: Date;
  interactions?: GanttInteractions;
  children?: React.ReactNode;
}

function Gantt({
  resources,
  events,
  defaultEvents,
  scale,
  defaultScale,
  date,
  defaultDate,
  interactions = { drag: true, resize: true, selectSlot: true },
  className,
  children,
  ...props
}: GanttProps) {
  const [scaleState, setScaleState] = React.useState<GanttScale>(defaultScale ?? "week");
  const [dateState, setDateState] = React.useState<Date>(defaultDate ?? new Date());
  const [expanded, setExpanded] = React.useState<string[]>(
    resources.filter((resource) => resource.children?.length).map((resource) => resource.id),
  );

  const currentScale = scale ?? scaleState;
  const currentDate = date ?? dateState;
  const currentEvents = events ?? defaultEvents ?? [];

  const range = React.useMemo(() => {
    switch (currentScale) {
      case "day":
        return { start: currentDate, end: addDays(currentDate, 1) };
      case "month":
        return { start: addMonths(startOfWeek(currentDate, { weekStartsOn: 1 }), -1), end: addMonths(startOfWeek(currentDate, { weekStartsOn: 1 }), 2) };
      case "quarter":
      case "year":
        return { start: addMonths(currentDate, -3), end: addMonths(currentDate, 6) };
      default:
        return { start: startOfWeek(currentDate, { weekStartsOn: 1 }), end: addWeeks(startOfWeek(currentDate, { weekStartsOn: 1 }), 4) };
    }
  }, [currentScale, currentDate]);

  const contextValue = React.useMemo<GanttContextValue>(
    () => ({
      resources,
      events: currentEvents,
      scale: currentScale,
      setScale: setScaleState,
      date: currentDate,
      setDate: setDateState,
      expanded,
      toggleExpanded: (id) =>
        setExpanded((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id])),
      interactions,
      range,
    }),
    [resources, currentEvents, currentScale, currentDate, expanded, interactions, range],
  );

  return (
    <GanttContext.Provider value={contextValue}>
      <div {...props} className={cx("flex flex-col overflow-hidden rounded-xl border border-border bg-card", className)}>
        {children}
      </div>
    </GanttContext.Provider>
  );
}

const GANTT_SCALES: GanttScale[] = ["day", "week", "month"];

const GanttNav = ({ className, children, ...props }: React.ComponentProps<"div">) => {
  const { date, setDate, scale, setScale } = useGantt();
  return (
    <div {...props} className={cx("flex flex-wrap items-center gap-2 border-b border-border px-3 py-2", className)}>
      {children ?? (
        <>
          <button
            type="button"
            onClick={() => setDate(new Date())}
            className="rounded-md border border-border px-3 py-1.5 text-sm"
          >
            Today
          </button>
          <div className="flex items-center rounded-md border border-border p-0.5">
            {GANTT_SCALES.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setScale(item)}
                className={cx(
                  "rounded-sm px-2.5 py-1 text-sm capitalize",
                  scale === item ? "bg-secondary text-foreground" : "text-muted-foreground",
                )}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="flex items-center">
            <button
              type="button"
              aria-label="Previous period"
              onClick={() => setDate(addWeeks(date, -1))}
              className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Next period"
              onClick={() => setDate(addWeeks(date, 1))}
              className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
          <p className="text-sm font-medium">{format(date, "MMMM yyyy")}</p>
          <div className="grow" />
        </>
      )}
    </div>
  );
};

const GanttToolbar = ({ className, children, ...props }: React.ComponentProps<"div">) => (
  <div {...props} className={cx("flex items-center gap-2 px-3 py-2", className)}>
    {children}
  </div>
);

function flattenResources(resources: GanttResource[], expanded: string[]): Array<{ resource: GanttResource; level: number; isGroup: boolean }> {
  const out: Array<{ resource: GanttResource; level: number; isGroup: boolean }> = [];
  const walk = (nodes: GanttResource[], level: number) => {
    for (const node of nodes) {
      const isGroup = (node.children?.length ?? 0) > 0;
      out.push({ resource: node, level, isGroup });
      if (isGroup && expanded.includes(node.id)) walk(node.children ?? [], level + 1);
    }
  };
  walk(resources, 0);
  return out;
}

function extentOfEvents(events: GanttEvent[], resource: GanttResource): { start: Date; end: Date; progress: number } | null {
  const collect = (node: GanttResource): string[] => [node.id, ...(node.children ?? []).flatMap(collect)];
  const ids = new Set(collect(resource));
  const relevant = events.filter((event) => event.resourceId && ids.has(event.resourceId));
  if (relevant.length === 0) return null;
  const start = new Date(Math.min(...relevant.map((event) => event.start.getTime())));
  const end = new Date(Math.max(...relevant.map((event) => event.end.getTime())));
  const progress = relevant.reduce((sum, event) => sum + (event.progress ?? 0), 0) / relevant.length;
  return { start, end, progress };
}

const GanttView = ({ className, ...props }: React.ComponentProps<"div">) => {
  const { resources, events, expanded, toggleExpanded, range, scale, interactions } = useGantt();
  const rows = flattenResources(resources, expanded);
  const totalDays = Math.max(differenceInCalendarDays(range.end, range.start), 1);
  const dayWidth = scale === "day" ? 96 : scale === "month" ? 28 : 44;
  const timelineWidth = totalDays * dayWidth;
  const todayOffset = differenceInCalendarDays(new Date(), range.start);

  const headerDays = Array.from({ length: totalDays }, (_, index) => addDays(range.start, index));

  return (
    <div {...props} className={cx("flex", className)}>
      <div className="w-60 shrink-0 border-r border-border">
        <div className="flex h-14 items-end border-b border-border px-3 pb-2 text-xs text-muted-foreground">
          Tasks
        </div>
        {rows.map(({ resource, level, isGroup }) => (
          <div
            key={resource.id}
            className="flex h-12 items-center gap-1.5 border-b border-border px-3 text-sm"
            style={{ paddingLeft: `${12 + level * 16}px` }}
          >
            {isGroup ? (
              <button
                type="button"
                aria-label={expanded.includes(resource.id) ? "Collapse" : "Expand"}
                onClick={() => toggleExpanded(resource.id)}
                className="rounded-sm p-0.5 text-muted-foreground hover:bg-secondary"
              >
                <ChevronRight
                  className={cx("size-3.5", expanded.includes(resource.id) && "rotate-90")}
                />
              </button>
            ) : (
              <span className="w-[22px]" />
            )}
            <span className={cx("truncate", isGroup ? "font-medium" : "text-muted-foreground")}>
              {resource.title}
            </span>
          </div>
        ))}
      </div>
      <div className="relative flex-1 overflow-x-auto">
        <div style={{ width: timelineWidth }}>
          <div className="flex h-14 border-b border-border">
            {headerDays.map((day) => (
              <div
                key={day.toISOString()}
                className={cx(
                  "flex shrink-0 flex-col items-center justify-end gap-0.5 border-r border-border/60 pb-1.5 text-xs text-muted-foreground",
                  (day.getDay() === 0 || day.getDay() === 6) && "bg-secondary/40",
                )}
                style={{ width: dayWidth }}
              >
                <span>{format(day, "EEE")}</span>
                <span className="text-foreground">{format(day, "d")}</span>
              </div>
            ))}
          </div>
          {rows.map(({ resource, isGroup }) => {
            const extent = extentOfEvents(events, resource);
            const bars = events.filter((event) => event.resourceId === resource.id);
            return (
              <div key={resource.id} className="relative h-12 border-b border-border">
                {headerDays.map((day) => (
                  <div
                    key={day.toISOString()}
                    className={cx(
                      "absolute inset-y-0 border-r border-border/40",
                      (day.getDay() === 0 || day.getDay() === 6) && "bg-secondary/40",
                    )}
                    style={{ left: differenceInCalendarDays(day, range.start) * dayWidth, width: dayWidth }}
                  />
                ))}
                {isGroup && extent && (
                  <div
                    className="absolute top-3.5 h-5 rounded bg-secondary"
                    style={{
                      left: differenceInCalendarDays(extent.start, range.start) * dayWidth,
                      width: Math.max(differenceInCalendarDays(extent.end, extent.start) * dayWidth, dayWidth),
                    }}
                  >
                    <div
                      className="h-full rounded bg-primary/60"
                      style={{ width: `${extent.progress}%` }}
                    />
                  </div>
                )}
                {bars.map((event) => {
                  const left = differenceInCalendarDays(event.start, range.start) * dayWidth;
                  const width = Math.max(differenceInCalendarDays(event.end, event.start) * dayWidth, dayWidth);
                  return (
                    <div
                      key={event.id}
                      className={cx(
                        "absolute top-2 h-7 overflow-hidden rounded-md border border-border bg-background text-xs",
                        interactions.drag && "cursor-grab",
                      )}
                      style={{ left, width }}
                    >
                      <div
                        className="absolute inset-y-0 left-0"
                        style={{
                          width: `${event.progress ?? 0}%`,
                          backgroundColor: event.color ?? "var(--primary)",
                          opacity: 0.45,
                        }}
                      />
                      <p className="relative truncate px-2 py-1 text-foreground">{event.title}</p>
                    </div>
                  );
                })}
              </div>
            );
          })}
          {todayOffset >= 0 && todayOffset <= totalDays && (
            <div
              className="absolute inset-y-0 w-px bg-destructive"
              style={{ left: todayOffset * dayWidth }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Stories                                                             */
/* ------------------------------------------------------------------ */

interface InvoiceRow {
  id: string;
  invoice: string;
  client: string;
  issued: string;
  due: string;
  amount: string;
  status: string;
}

const invoiceRows: InvoiceRow[] = [
  { id: "1", invoice: "INV-2026-0871", client: "Northwind Traders", issued: "Oct 1, 2026", due: "Oct 15, 2026", amount: "$4,820.00", status: "Paid" },
  { id: "2", invoice: "INV-2026-0872", client: "Acme Corp", issued: "Oct 3, 2026", due: "Oct 17, 2026", amount: "$1,260.50", status: "Open" },
  { id: "3", invoice: "INV-2026-0873", client: "Globex Inc", issued: "Oct 5, 2026", due: "Oct 19, 2026", amount: "$9,140.00", status: "Open" },
  { id: "4", invoice: "INV-2026-0874", client: "Initech", issued: "Oct 8, 2026", due: "Oct 22, 2026", amount: "$780.25", status: "Overdue" },
  { id: "5", invoice: "INV-2026-0875", client: "Umbrella Group", issued: "Oct 9, 2026", due: "Oct 23, 2026", amount: "$3,410.00", status: "Paid" },
  { id: "6", invoice: "INV-2026-0876", client: "Stark Industries", issued: "Oct 10, 2026", due: "Oct 24, 2026", amount: "$12,500.00", status: "Draft" },
  { id: "7", invoice: "INV-2026-0877", client: "Wayne Enterprises", issued: "Oct 11, 2026", due: "Oct 25, 2026", amount: "$2,075.75", status: "Open" },
  { id: "8", invoice: "INV-2026-0878", client: "Wonka Industries", issued: "Oct 12, 2026", due: "Oct 26, 2026", amount: "$640.00", status: "Paid" },
];

const DataGridStory: StoryRender = ({ sample }) => {
  const [pagination, setPagination] = React.useState<PaginationState>({ pageIndex: 0, pageSize: 5 });
  const [sorting, setSorting] = React.useState<SortingState>([{ id: "invoice", desc: false }]);

  const columns = React.useMemo<ColumnDef<DataGridFeatures, InvoiceRow>[]>(
    () => [
      {
        accessorKey: "invoice",
        header: sample.column1 ?? "Invoice",
        size: 160,
        meta: { headerClassName: "", cellClassName: "" },
      },
      {
        accessorKey: "client",
        header: sample.column2 ?? "Client",
        size: 180,
        meta: { headerClassName: "", cellClassName: "" },
      },
      {
        accessorKey: "due",
        header: "Due",
        size: 120,
        meta: { headerClassName: "", cellClassName: "" },
      },
      {
        accessorKey: "amount",
        header: "Amount",
        size: 110,
        meta: { headerClassName: "text-right rtl:text-left", cellClassName: "text-right tabular-nums" },
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 100,
        meta: { headerClassName: "", cellClassName: "" },
      },
    ],
    [sample],
  );

  const table = useTable({
    features: dataGridFeatures,
    columns,
    data: invoiceRows,
    pageCount: Math.ceil(invoiceRows.length / pagination.pageSize),
    getRowId: (row: InvoiceRow) => row.id,
    state: { pagination, sorting },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
  });

  return (
    <DataGrid table={table} recordCount={invoiceRows.length}>
      <div className="w-full max-w-3xl space-y-3">
        <DataGridContainer>
          <DataGridScrollArea>
            <DataGridTable />
          </DataGridScrollArea>
        </DataGridContainer>
        <DataGridPagination more moreLimit={3} />
      </div>
    </DataGrid>
  );
};

interface Task {
  id: string;
  title: string;
  assignee: string;
  dueDate: string;
}

const initialBoard: Record<string, Task[]> = {
  backlog: [
    { id: "t1", title: "Audit invoice export flow", assignee: "Priya Raman", dueDate: "Oct 21" },
    { id: "t2", title: "Design empty states for billing", assignee: "Jonas Weber", dueDate: "Oct 24" },
    { id: "t3", title: "Draft SSO migration plan", assignee: "Lucía Fernández", dueDate: "Oct 28" },
  ],
  inProgress: [
    { id: "t4", title: "Rebuild usage dashboard queries", assignee: "Mateo Rossi", dueDate: "Oct 18" },
    { id: "t5", title: "Fix timezone drift in scheduled reports", assignee: "Priya Raman", dueDate: "Oct 19" },
  ],
  review: [
    { id: "t6", title: "Add CSV mapping to invoice import", assignee: "Jonas Weber", dueDate: "Oct 16" },
    { id: "t7", title: "Update seat-count proration docs", assignee: "Lucía Fernández", dueDate: "Oct 17" },
  ],
};

const columnTitles: Record<string, string> = {
  backlog: "Backlog",
  inProgress: "In Progress",
  review: "Review",
};

const KanbanStory: StoryRender = ({ sample }) => {
  const [board, setBoard] = React.useState(initialBoard);
  return (
    <Kanban value={board} onValueChange={setBoard} getItemValue={(task: Task) => task.id}>
      <KanbanBoard>
        {Object.entries(board).map(([id, tasks]) => (
          <KanbanColumn key={id} value={id}>
            <KanbanColumnHandle>
              <span className="flex-1">{id === "backlog" ? (sample.column1 ?? columnTitles[id]) : columnTitles[id]}</span>
              <span className="text-xs text-muted-foreground">{tasks.length}</span>
            </KanbanColumnHandle>
            <KanbanColumnContent value={id}>
              {tasks.map((task) => (
                <KanbanItem key={task.id} value={task.id}>
                  <KanbanItemHandle>
                    <p className="text-sm font-medium">{task.title}</p>
                    <div className="mt-2 flex items-center justify-between gap-2 text-xs text-muted-foreground">
                      <span>{task.assignee}</span>
                      <span className="tabular-nums">{task.dueDate}</span>
                    </div>
                  </KanbanItemHandle>
                </KanbanItem>
              ))}
            </KanbanColumnContent>
          </KanbanColumn>
        ))}
      </KanbanBoard>
      <KanbanOverlay>
        <div className="rounded-md bg-muted px-3 py-2 text-sm">Moving card.</div>
      </KanbanOverlay>
    </Kanban>
  );
};

const GanttStory: StoryRender = ({ sample }) => {
  const launchStart = startOfWeek(new Date(), { weekStartsOn: 1 });
  const day = (offset: number) => addDays(launchStart, offset);

  const resources: GanttResource[] = [
    {
      id: "design",
      title: "Design",
      children: [
        { id: "wireframes", title: "Wireframes" },
        { id: "visual", title: "Visual design" },
      ],
    },
    {
      id: "build",
      title: "Build",
      children: [
        { id: "frontend", title: "Frontend" },
        { id: "backend", title: "API and billing" },
      ],
    },
    { id: "launch", title: "Launch prep" },
  ];

  const events: GanttEvent[] = [
    { id: "e1", title: "Wireframes", resourceId: "wireframes", start: day(-6), end: day(-1), progress: 100, color: "#4f7cff" },
    { id: "e2", title: "Visual design", resourceId: "visual", start: day(-1), end: day(5), progress: 60, color: "#9a6aff" },
    { id: "e3", title: "Frontend", resourceId: "frontend", start: day(2), end: day(11), progress: 25, color: "#2fb37a" },
    { id: "e4", title: "API and billing", resourceId: "backend", start: day(4), end: day(13), progress: 10, color: "#d99a2b" },
    { id: "e5", title: "Launch prep", resourceId: "launch", start: day(12), end: day(17), progress: 0, color: "#d95a5a" },
  ];

  return (
    <Gantt resources={resources} events={events} defaultScale="week" defaultDate={new Date()} className="w-full max-w-3xl">
      <GanttNav />
      <GanttToolbar>
        <p className="text-sm text-muted-foreground">{sample.title ?? "White-label billing launch"}</p>
      </GanttToolbar>
      <GanttView />
    </Gantt>
  );
};

const FileUploadStory: StoryRender = ({ sample }) => {
  const [
    { files, isDragging, errors },
    { removeFile, openFileDialog, getInputProps, handleDragEnter, handleDragLeave, handleDragOver, handleDrop },
  ] = useFileUpload({
    accept: ".png,.pdf,.csv",
    multiple: true,
    maxFiles: 3,
    maxSize: 10 * 1024 * 1024,
    initialFiles: [
      { id: "f1", name: "campaign-hero.png", size: 2_411_520, type: "image/png", url: "" },
      { id: "f2", name: "q3-invoice-export.csv", size: 184_320, type: "text/csv", url: "" },
    ],
  });

  return (
    <div className="w-full max-w-lg">
      <div
        className={cx(
          "flex items-center gap-3 rounded-lg border border-dashed p-4",
          isDragging ? "border-primary" : "border-border",
        )}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input {...getInputProps()} className="sr-only" aria-label="Upload files" tabIndex={-1} />
        <button
          type="button"
          onClick={openFileDialog}
          className="rounded-md bg-primary px-3 py-1.5 text-sm text-primary-foreground"
        >
          <Plus className="mr-1 inline size-4 align-[-2px]" />
          Add files
        </button>
        <p className="text-sm text-muted-foreground">
          {files.length === 0
            ? "Drop files here or click to browse (max 3 files)"
            : (sample.label ?? `${files.length} of 3 files attached`)}
        </p>
      </div>
      <ul className="mt-3 grid gap-2">
        {files.map((entry) => (
          <li key={entry.id} className="flex items-center gap-3 rounded-lg border border-border px-3 py-2">
            <FileText className="size-5 shrink-0 text-muted-foreground" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm">{entry.file.name}</p>
              <p className="text-xs text-muted-foreground">{formatBytes(entry.file.size)}</p>
            </div>
            <button
              type="button"
              aria-label={`Remove ${entry.file.name}`}
              onClick={() => removeFile(entry.id)}
              className="rounded-md p-1 text-muted-foreground hover:bg-secondary"
            >
              <X className="size-4" />
            </button>
          </li>
        ))}
      </ul>
      {errors.map((error) => (
        <p key={error} className="mt-2 text-sm text-destructive">
          {error}
        </p>
      ))}
    </div>
  );
};

const NumberFieldStory: StoryRender = ({ sample }) => (
  <div className="flex w-full max-w-md flex-wrap items-end gap-8">
    <div className="w-48">
      <NumberField defaultValue={24} min={0} max={999}>
        <NumberFieldScrubArea label={sample.label ?? "Team seats"} />
        <NumberFieldGroup>
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>
    </div>
    <div className="w-48">
      <NumberField defaultValue={5} min={0} max={100} size="sm">
        <NumberFieldScrubArea label="Revisions" />
        <NumberFieldGroup>
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>
    </div>
  </div>
);

interface ProjectItem {
  name: string;
  children?: string[];
}

const projectItems: Record<string, ProjectItem> = {
  workspace: {
    name: "Northwind workspace",
    children: ["billing", "product", "marketing"],
  },
  billing: {
    name: "Billing",
    children: ["invoices", "subscriptions"],
  },
  invoices: { name: "Invoices" },
  subscriptions: { name: "Subscriptions" },
  product: {
    name: "Product",
    children: ["roadmap", "releases"],
  },
  roadmap: { name: "Roadmap" },
  releases: { name: "Releases" },
  marketing: {
    name: "Marketing",
    children: ["campaigns"],
  },
  campaigns: { name: "Campaigns" },
};

const TreeStory: StoryRender = ({ sample }) => {
  const indent = 20;
  const tree = useTree<ProjectItem>({
    initialState: { expandedItems: ["workspace", "billing", "product"] },
    indent,
    rootItemId: "workspace",
    getItemName: (item) => item.getItemData().name,
    isItemFolder: (item) => (item.getItemData().children?.length ?? 0) > 0,
    dataLoader: {
      getItem: (itemId) => projectItems[itemId],
      getChildren: (itemId) => projectItems[itemId].children ?? [],
    },
    features: [syncDataLoaderFeature, hotkeysCoreFeature],
  });

  return (
    <div className="w-full max-w-xs">
      <Tree indent={indent} tree={tree} toggleIconType="chevron">
        {tree.getItems().map((item) => (
          <TreeItem key={item.getId()} item={item}>
            <TreeItemLabel>
              {item.getId() === "workspace" ? (sample.title ?? item.getItemName()) : item.getItemName()}
            </TreeItemLabel>
          </TreeItem>
        ))}
      </Tree>
    </div>
  );
};

export const storyRenders: Record<string, StoryRender> = {
  "reui/Data Grid": DataGridStory,
  "reui/Kanban": KanbanStory,
  "reui/Gantt": GanttStory,
  "reui/File Upload": FileUploadStory,
  "reui/Number Field": NumberFieldStory,
  "reui/Tree": TreeStory,
};
