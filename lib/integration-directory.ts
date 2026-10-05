import type { Client, Integration, IntegrationType } from "../data/integrations";
import { CLIENTS, INTEGRATION_TYPES, integrationClients, integrationTypes } from "../data/integrations.ts";

/**
 * Search and facet counts for the integration directory, mirroring the
 * library directory in `lib/directory.ts`: every token must match, filters
 * combine with AND, and each facet is counted with its own selection cleared.
 */

export const PUBLISHERS = ["Official", "Community"] as const;
export type Publisher = (typeof PUBLISHERS)[number];

export const publisherOf = (integration: Integration): Publisher => (integration.official ? "Official" : "Community");

export interface IntegrationQuery {
  query: string;
  type: IntegrationType | null;
  client: Client | null;
  publisher: Publisher | null;
}

export interface IntegrationFacetCounts {
  type: ReadonlyMap<IntegrationType, number>;
  client: ReadonlyMap<Client, number>;
  publisher: ReadonlyMap<Publisher, number>;
  total: { type: number; client: number; publisher: number };
}

interface IndexedIntegration {
  integration: Integration;
  name: string;
  haystack: string;
  types: readonly IntegrationType[];
  clients: readonly Client[];
  publisher: Publisher;
}

const normalize = (text: string) => text.toLowerCase().trim().replace(/\s+/g, " ");

/** Name matches lead, then the registry's curated order. */
function nameTier({ name }: IndexedIntegration, query: string): number {
  if (query === "" || name === query) return 0;
  return name.includes(query) ? 1 : 2;
}

/** Builds a searcher over a fixed registry. Call once and reuse; every field is flattened up front. */
export function createIntegrationSearch(registry: readonly Integration[]) {
  const index: IndexedIntegration[] = registry.map((integration) => {
    const types = integrationTypes(integration);
    const clients = integrationClients(integration);
    const publisher = publisherOf(integration);
    return {
      integration,
      name: integration.name.toLowerCase(),
      types,
      clients,
      publisher,
      haystack: normalize([
        integration.name,
        integration.description,
        integration.provider.name,
        integration.library?.replaceAll("-", " ") ?? "",
        publisher,
        ...types,
        ...clients,
        ...(integration.tags ?? []),
      ].join(" ")),
    };
  });

  const matching = ({ query, type, client, publisher }: IntegrationQuery) => {
    const normalized = normalize(query);
    const tokens = normalized.split(" ").filter(Boolean);
    return index
      .filter((entry) =>
        tokens.every((token) => entry.haystack.includes(token)) &&
        (type === null || entry.types.includes(type)) &&
        (client === null || entry.clients.includes(client)) &&
        (publisher === null || entry.publisher === publisher),
      )
      // Array.prototype.sort is stable, so equal tiers keep curated order.
      .sort((a, b) => nameTier(a, normalized) - nameTier(b, normalized));
  };

  function searchIntegrations(query: IntegrationQuery): Integration[] {
    return matching(query).map(({ integration }) => integration);
  }

  searchIntegrations.facetCounts = (query: IntegrationQuery): IntegrationFacetCounts => {
    const byType = matching({ ...query, type: null });
    const byClient = matching({ ...query, client: null });
    const byPublisher = matching({ ...query, publisher: null });
    const count = <T extends string>(options: readonly T[], entries: IndexedIntegration[], has: (entry: IndexedIntegration, option: T) => boolean) =>
      new Map(options.map((option) => [option, entries.filter((entry) => has(entry, option)).length]));

    return {
      type: count(INTEGRATION_TYPES, byType, (entry, option) => entry.types.includes(option)),
      client: count(CLIENTS, byClient, (entry, option) => entry.clients.includes(option)),
      publisher: count(PUBLISHERS, byPublisher, (entry, option) => entry.publisher === option),
      total: { type: byType.length, client: byClient.length, publisher: byPublisher.length },
    };
  };

  return searchIntegrations;
}
