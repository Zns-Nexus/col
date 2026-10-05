# Col

Col is a community-maintained catalog that helps frontend developers choose UI libraries and connect their AI clients to UI and design tools, always pointing to official sources.

## Catalog

**Library**:
A UI toolkit, component collection, or design resource that a developer installs, copies into a project, or browses for reference.
_Avoid_: package, framework, kit

**Component**:
A named UI element that a library documents on its own page. Col lists only components it has verified, so coverage is always partial.
_Avoid_: widget, block (when meaning a single component)

**Integration**:
A service or server an AI client connects to so an agent can work with a UI library or design tool. Integrations have their own directory, separate from libraries.
_Avoid_: plugin, extension, tool, resource

**Provider**:
The person or organization that publishes and maintains an integration.
_Avoid_: author, vendor

**Official**:
An integration whose provider also makes the product it serves, such as Figma's server for Figma.
_Avoid_: verified, first-party

**Community**:
An integration published by someone other than the maker of the product it serves.
_Avoid_: unofficial, third-party

## Setup

**Setup path**:
One way to start using an integration in a client. Every integration has at least one, and its types come from its setup paths.
_Avoid_: install method, variant

**MCP server**:
A setup path where the user adds the server to a client's MCP configuration, either as a local command or as a remote URL.
_Avoid_: MCP, server (alone), tool server

**Connector**:
A setup path where the user enables the integration from an AI app's own directory and signs in there, with no configuration file.
_Avoid_: app, plugin (the names some AI apps use for the same thing)

**Client**:
The AI app or coding agent that a user connects an integration to, such as Claude Code, Cursor, or ChatGPT.
_Avoid_: host, IDE, editor

**Transport**:
How a client reaches an MCP server: locally, by starting it as a process, or remotely, over HTTP.
_Avoid_: protocol, connection type
