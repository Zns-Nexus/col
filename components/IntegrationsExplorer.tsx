"use client";

import { useEffect, useMemo, useState } from "react";
import { SearchX } from "lucide-react";
import { CLIENTS, INTEGRATION_TYPES, integrations, type Client, type IntegrationType } from "@/data/integrations";
import { createIntegrationSearch, PUBLISHERS, type IntegrationFacetCounts, type Publisher } from "@/lib/integration-directory";
import { directoryQuery, useDirectoryQuery } from "@/lib/directory-query";
import { SidebarContent, SidebarProvider } from "@/components/ui/sidebar";
import { FacetGroup, FilterReset, FilterSidebar } from "./FilterBar";
import { IntegrationRow } from "./IntegrationRow";

const searchIntegrations = createIntegrationSearch(integrations);

interface Filters {
  type: IntegrationType | null;
  client: Client | null;
  publisher: Publisher | null;
}

const NO_FILTERS: Filters = { type: null, client: null, publisher: null };

/** Toggles a single-select facet: picking the active option clears it. */
const toggle = <T,>(current: T | null, value: T) => (current === value ? null : value);

interface FilterPanelProps {
  filters: Filters;
  counts: IntegrationFacetCounts;
  onChange: (filters: Filters) => void;
  onClearAll: () => void;
  hasFilters: boolean;
  idSuffix: string;
}

function IntegrationFilterPanel({ filters, counts, onChange, onClearAll, hasFilters, idSuffix }: FilterPanelProps) {
  const [expanded, setExpanded] = useState({ type: true, client: true, publisher: true });
  const flip = (group: keyof typeof expanded) => () => setExpanded((current) => ({ ...current, [group]: !current[group] }));

  return (
    <>
      <SidebarContent>
        <FacetGroup
          label="Type"
          allLabel="All types"
          total={counts.total.type}
          id={`integration-type-options${idSuffix}`}
          options={INTEGRATION_TYPES}
          selected={filters.type === null ? [] : [filters.type]}
          counts={counts.type}
          onSelect={(type) => onChange({ ...filters, type: toggle(filters.type, type) })}
          onClear={() => onChange({ ...filters, type: null })}
          selectionMode="single"
          expanded={expanded.type}
          onExpandedChange={flip("type")}
        />
        <FacetGroup
          label="Client"
          allLabel="All clients"
          total={counts.total.client}
          id={`integration-client-options${idSuffix}`}
          options={CLIENTS}
          selected={filters.client === null ? [] : [filters.client]}
          counts={counts.client}
          onSelect={(client) => onChange({ ...filters, client: toggle(filters.client, client) })}
          onClear={() => onChange({ ...filters, client: null })}
          selectionMode="single"
          expanded={expanded.client}
          onExpandedChange={flip("client")}
        />
        <FacetGroup
          label="Publisher"
          allLabel="All publishers"
          total={counts.total.publisher}
          id={`integration-publisher-options${idSuffix}`}
          options={PUBLISHERS}
          selected={filters.publisher === null ? [] : [filters.publisher]}
          counts={counts.publisher}
          onSelect={(publisher) => onChange({ ...filters, publisher: toggle(filters.publisher, publisher) })}
          onClear={() => onChange({ ...filters, publisher: null })}
          selectionMode="single"
          expanded={expanded.publisher}
          onExpandedChange={flip("publisher")}
        />
      </SidebarContent>
      {hasFilters && <FilterReset onClick={onClearAll} />}
    </>
  );
}

/** The integration directory: search from the sidebar field, filter by type, client, and publisher. */
export function IntegrationsExplorer({ initialQuery = "" }: { initialQuery?: string }) {
  // The search field lives in the sidebar (or the mobile top bar); both share this query.
  const query = useDirectoryQuery();
  const [filters, setFilters] = useState<Filters>(NO_FILTERS);

  const results = useMemo(() => searchIntegrations({ query, ...filters }), [query, filters]);
  const counts = useMemo(() => searchIntegrations.facetCounts({ query, ...filters }), [query, filters]);

  useEffect(() => {
    directoryQuery.set(initialQuery);
    return () => directoryQuery.set("");
  }, [initialQuery]);

  const hasFilters = query.trim() !== "" || filters.type !== null || filters.client !== null || filters.publisher !== null;
  const clearFilters = () => {
    directoryQuery.set("");
    setFilters(NO_FILTERS);
  };

  return (
    <section className="directory-section w-full px-0">
      <SidebarProvider className="directory-layout min-h-[calc(100dvh-var(--site-header-height))] flex-col lg:flex-row">
        <FilterSidebar
          label="Integration filters"
          hasFilters={hasFilters}
          renderPanel={(idSuffix) => (
            <IntegrationFilterPanel filters={filters} counts={counts} onChange={setFilters} onClearAll={clearFilters} hasFilters={hasFilters} idSuffix={idSuffix} />
          )}
        />

        <div className={`directory-results-pane min-w-0 flex-1 px-5 py-4 sm:px-8 lg:px-8 lg:py-6 ${results.length ? "pb-40" : ""}`}>
          <div className="dir-toolbar">
            <div className="dir-toolbar-title">
              <h1>{hasFilters ? "Results" : "All integrations"}</h1>
              <p role="status" className="dir-count">
                {results.length}
                {results.length !== integrations.length && <span> / {integrations.length}</span>}
                <span className="sr-only"> integrations shown</span>
              </p>
            </div>
          </div>

          {results.length ? (
            <div className="directory-gallery mt-5 grid grid-cols-1 gap-3">
              {results.map((integration) => (
                <div key={integration.slug} className="directory-gallery-item">
                  <IntegrationRow integration={integration} />
                </div>
              ))}
            </div>
          ) : (
            <div className="theme-border mt-6 flex flex-col items-center border border-dashed py-24 text-center">
              <SearchX className="theme-muted size-7" aria-hidden />
              <p className="theme-text mt-5 font-medium">Nothing matches that search</p>
              <p className="theme-muted mt-1.5 text-sm">Try another keyword or clear the filters.</p>
            </div>
          )}
        </div>
      </SidebarProvider>
    </section>
  );
}
