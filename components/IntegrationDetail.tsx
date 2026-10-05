import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowLeft, ArrowUpRight, GitBranch, KeyRound, UsersRound } from "lucide-react";
import { connectorPaths, integrationClients, integrationTypes, mcpServerPaths, type Integration, type SecretEnv } from "@/data/integrations";
import type { Library } from "@/data/libraries";
import { publisherOf } from "@/lib/integration-directory";
import { accessLabels, agentPrompt, clientSetups, transportLabel } from "@/lib/integration-setup";
import { libraryPath } from "@/lib/site";
import { hostname } from "@/lib/utils";
import { AgentPrompt, InstallTabs } from "./LibraryDetailParts";
import { LibraryLogo } from "./LibraryLogo";

interface IntegrationDetailProps {
  integration: Integration;
  /** The Col library this integration serves, when it is listed. */
  library?: Library;
}

/** Staggered entrance order for each block of the page. */
const reveal = (index: number) => ({ "--i": index }) as CSSProperties;

const newTab = { target: "_blank", rel: "noopener noreferrer" } as const;

/** Detail page for one integration, built on the library page layout. Setup snippets and the prompt are generated from the entry. */
export function IntegrationDetail({ integration, library }: IntegrationDetailProps) {
  const servers = mcpServerPaths(integration);
  const connectors = connectorPaths(integration);
  const setups = clientSetups(integration);
  const secrets: SecretEnv[] = servers.flatMap(({ server }) => (server.transport === "http" && server.auth.kind === "api-key" ? [server.auth.secret] : []));
  const facts = [
    { term: "Type", values: integrationTypes(integration) },
    { term: "Publisher", values: [publisherOf(integration), integration.provider.name] },
    { term: "Transport", values: [...new Set(servers.map(({ server }) => transportLabel(server)))] },
    { term: "Access", values: accessLabels(integration) },
    { term: "Clients", values: integrationClients(integration) },
  ].filter(({ values }) => values.length > 0);

  return (
    <article className="ld">
      <Link href="/integrations" className="ld-back ld-reveal" style={reveal(0)}>
        <ArrowLeft aria-hidden />
        <span className="cap">Integrations</span>
      </Link>

      <div className="ld-layout">
        <div className="ld-main">
          <header className="ld-head ld-reveal" style={reveal(1)}>
            <div className="ld-identity">
              <span className="ld-logo">
                <LibraryLogo url={integration.provider.url} name={integration.provider.name} size={26} />
              </span>
              <div className="ld-identity-text">
                <h1>{integration.name}</h1>
                <a href={integration.url} {...newTab} className="ld-host">
                  <span className="cap">{hostname(integration.url)}</span>
                  <ArrowUpRight aria-hidden />
                </a>
              </div>
            </div>
            <p className="ld-description">{integration.description}</p>
            {(!integration.official || secrets.length > 0) && (
              <div className="ld-notices">
                {!integration.official && (
                  <p className="ld-notice">
                    <UsersRound aria-hidden />
                    <span><strong>Community integration.</strong> Published by {integration.provider.name}{library ? `, not by the ${library.name} team` : ""}.</span>
                  </p>
                )}
                {secrets.map((secret) => (
                  <p key={secret.name} className="ld-notice">
                    <KeyRound aria-hidden />
                    <span>
                      <strong>Needs a {secret.label}.</strong> Create one at <a href={secret.url} {...newTab}>{hostname(secret.url)}</a> and set it as <code>{secret.name}</code> in your environment.
                    </span>
                  </p>
                ))}
              </div>
            )}
          </header>

          {integration.notes && integration.notes.length > 0 && (
            <section className="ld-section ld-reveal" style={reveal(3)} aria-labelledby="ld-notes">
              <h2 id="ld-notes">Before you start</h2>
              <ol className="ld-timeline">
                {integration.notes.map((note, index) => (
                  <li key={index}>
                    <span className="ld-timeline-dot" aria-hidden>{index + 1}</span>
                    <p>{note}</p>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {setups.length > 0 && (
            <section className="ld-section ld-reveal" style={reveal(4)} aria-labelledby="ld-setup">
              <h2 id="ld-setup">MCP server setup</h2>
              <InstallTabs
                label="Client"
                steps={setups.map(({ client, file, language, code, next }) => ({
                  label: client,
                  command: code,
                  language,
                  caption: <>Add to <code>{file}</code>. {next}</>,
                }))}
              />
            </section>
          )}

          {connectors.length > 0 && (
            <section className="ld-section ld-reveal" style={reveal(5)} aria-labelledby="ld-connectors">
              <h2 id="ld-connectors">Connectors</h2>
              <p className="ld-section-note">Add it from the app&apos;s directory and sign in with your {integration.provider.name} account. No config file.</p>
              <ul className="ld-related-list">
                {connectors.map(({ client, url }) => (
                  <li key={client}>
                    <a href={url} {...newTab} className="ld-related-row">
                      <span className="ld-related-logo"><LibraryLogo url={url} name={client} size={20} /></span>
                      <span className="ld-related-copy">
                        <span className="ld-related-name">{client}</span>
                        <span className="ld-related-meta">{hostname(url)}</span>
                      </span>
                      <ArrowUpRight aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="ld-section ld-reveal" style={reveal(6)} aria-labelledby="ld-agent">
            <h2 id="ld-agent">Agent setup prompt</h2>
            <p className="ld-section-note">Paste this into a coding agent to set {integration.name} up in the client you use.</p>
            <AgentPrompt prompt={agentPrompt(integration)} />
          </section>
        </div>

        <aside className="ld-side ld-reveal" style={reveal(2)} aria-label={`About ${integration.name}`}>
          <div className="ld-side-card">
            <div className="ld-side-body">
              <div className="ld-actions">
                <a href={integration.url} {...newTab} className="ld-button ld-button-primary">
                  <span className="cap">Setup guide</span>
                  <ArrowUpRight aria-hidden />
                </a>
                {integration.repoUrl && (
                  <div className="ld-actions-row">
                    <a href={integration.repoUrl} {...newTab} className="ld-button">
                      <GitBranch aria-hidden />
                      <span className="cap">Source</span>
                    </a>
                  </div>
                )}
              </div>

              <dl className="ld-facts">
                {facts.map(({ term, values }) => (
                  <div key={term}>
                    <dt>{term}</dt>
                    <dd>{values.map((value) => <span key={value} className="ld-chip"><span className="cap">{value}</span></span>)}</dd>
                  </div>
                ))}
                {library && (
                  <div>
                    <dt>Library</dt>
                    <dd>
                      <Link href={libraryPath(library.slug)} className="ld-chip ld-chip-link"><span className="cap">{library.name}</span></Link>
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}
