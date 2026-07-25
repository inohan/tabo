<!-- BEGIN:nestjs-agent-rules -->

# This is NOT the Nest.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Use 'nestjs-best-practice' skills. Heed deprecation notices.

<!-- END:nestjs-agent-rules -->

# Domain Driven Design

This project follows a strict DDD pattern.

- The [presentation layer](./src/api/) contains Nestjs-related controllers, guards, modules, etc.
- The project is separated into different bounded contexts
  - Shared: Shared context, including repositories, Tabbycat clients, etc.
  - Identity: Responsible for authentication / authorization. Uses `better-auth` for the main logic.
  - Exporter: Exports results to slide-like format (Google Slides, PowerPoint, Canva, etc.)
  - Importer: Imports table-like data (Excel, Google Spreadsheets, etc.) into Tabbycat
  - Discord: Manages discord connection
  - Visualizer: Visualizes round status, feedback, check-in status, etc.
- Components related to the presentation layer (especially decorators) should not leak into bounded contexts
- Bounded contexts are isolated; databases are isolated, there are no foreign key constraints across contexts, and the presentation layer should be responsible for orchestrating different services / use cases from multiple bounded contexts.
