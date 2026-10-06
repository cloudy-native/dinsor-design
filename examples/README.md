# Examples

Demos built on `dist/dinsor.css`. They show the system in use. Nothing here is part of it: classes, copy, and layout stay in the example. Open each `index.html`; no build step.

| Example | Shows |
| --- | --- |
| [shop/](shop/index.html) | Catalog, product, cart, checkout, receipt, reading note |
| [blog/](blog/index.html) | Post list, long-form article with pull quote and code |
| [saas/](saas/index.html) | Product landing page, pricing and FAQ |
| [docs/](docs/index.html) | Sidebar nav, code blocks, table, callout |
| [components/](components/index.html) | One-page catalog: every token, size and component |
| [portfolio/](portfolio/index.html) | Intro, work list with tags, about, contact |

Each page has a theme switcher (`theme-switch.js`, demo only) that sets `data-theme`.

Each has its own small stylesheet for layout only. Run `node scripts/lint.mjs examples/<name>` to check one.
