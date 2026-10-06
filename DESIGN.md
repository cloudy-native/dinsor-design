# Design brief — websites

Derived from the Kami sample (https://kami.tw93.fun/index.html). Same intent: a warm paper page, one restrained accent, size-led hierarchy, flat surfaces, editorial rhythm. Not a recolor of Kami.

Read this file before changing UI. Entry point for agents: [AGENTS.md](AGENTS.md). Do not import Kami's ink blue or its serif body.

## Intent

A page should feel like a typeset document on warm paper, then like a modern site. Paper, whitespace, and one deep green do the branding. Decoration does not.

Modern here means the reading text is a sans, sizes are for screens, and labels are plain tracked sans. It does not mean gradients, glass, pills, or a second bright color.

## Locked deviations from Kami

| Kami | This system | Why |
|---|---|---|
| Accent `#1B365D` ink blue | `#1C3D32` ink green | Green is the only chromatic brand color. Same job as Kami's blue: rare, dark, never neon |
| Serif for headlines and body | Serif for display only. Sans for body, UI, captions, labels | Body stays modern. Serif keeps the paper voice where type is large |
| Print body 9.5–10pt | Body 17px | Screen reading size. Do not shrink body to print sizes |
| Serif section overlines | Sans overlines, tracked | UI chrome follows the body face |
| Blue tag tints `#EEF2F7` / `#E4ECF5` | Green-cast tints `#E7EFE9` / `#D9E6DE` | Tags follow the accent. Neutrals stay warm, not green |

Do not "correct" these back toward Kami.

## Constraints

- One accent. Ink green stays under 5% of any viewport. Size, weight, and space create hierarchy. Color does not.
- Breakpoints: 375 / 768 / 1280. Mobile first.
- A11y: WCAG AA. Visible focus. Hit targets at least 44px.
- Motion: none, unless a later brief lists it. Support `prefers-reduced-motion`.
- Do not add colors, type sizes, radii, spacing, or shadows that are not in `tokens/tokens.json`.
- Do not invent marketing copy. Missing strings stay as `[copy]`.

## Voice

Quiet, specific, short. The page sounds like a person who edits, not a brand that announces.

- Do: concrete nouns, short sentences, real names for things.
- Don't: "unlock", "seamless", "elevate", "next-gen", exclamation marks, or a second accent "for emphasis".

## Tokens

Source: [tokens/tokens.json](tokens/tokens.json). Table: [dist/tokens.md](dist/tokens.md). CSS: [dist/tokens.css](dist/tokens.css). Use the variables. Never type a hex, px size, radius, or shadow that is not a token.

### Rules the values cannot say

- Canvas: `--bg` is the page. Never `#fff`, never cool gray. Warm neutrals stay yellow-brown (R ≈ G > B). Do not green-shift the paper.
- Accent: `--accent` is the only chromatic brand color. Links, one primary button, overlines, key numbers. Hover darkens (`--accent-hover`), never brightens.
- Tag fills are solid hex. No `rgba`. No gradients.
- `--danger` is for errors only.
- Dark surfaces only when a brief asks for a dark band. Not the default page.

### Type

Two families. Do not swap their jobs.

- Display `--serif`: headlines, display numbers, pull quotes. Weight 500. Never 600 or higher.
- Body `--sans`: body, nav, buttons, captions, labels, lists. Weight 400. Labels may use 500.
- Mono `--mono`: code, hex, version strings. Tabular figures on metrics.

| role | face | size token | weight | line-height |
|---|---|---|---|---|
| display | serif | `--text-display` 48px | 500 | 1.10 |
| h1 | serif | `--text-h1` 32px | 500 | 1.20 |
| h2 | serif | `--text-h2` 22px | 500 | 1.25 |
| h3 | serif | `--text-h3` 18px | 500 | 1.30 |
| body | sans | `--text-body` 17px | 400 | 1.60 |
| caption | sans | `--text-caption` 14px | 400 | 1.45 |
| label | sans | `--text-label` 12px | 500 | 1.35 |
| metric | serif | `--text-metric` 32px | 500 | 1.10 |

At 375px, display drops to 36px (`--text-display-mobile`). Nothing else shrinks except horizontal padding.

Label tracking: `0.06em`. No small-caps. No italic, except pull quotes.

Pull quote: display serif, italic, 22px, `--olive`, no border and no quotation-mark graphic.

### Space

4px base. Use only `--space-4/8/12/16/24/32/48/64/96`.

| step | use |
|---|---|
| 4–8 | tag padding, inline gaps |
| 12–16 | inside a component |
| 24–32 | between components, card padding |
| 48–64 | under a section title |
| 96 | between major sections |

Max content width 1040px. Page padding 20px under 768, 32px from 768 up.

### Radius and depth

Radii: `--radius-chip` 2px (tags), `--radius-control` 4px (buttons, inputs, code), `--radius-card` 8px (cards).

Flat by default. No drop shadow. A shadow is allowed only on a real floating layer (menu, dialog), and only `--shadow-floating`. Screenshots sit on `--surface` with no shadow.

## Components

Markup for each lives in [components/](components/). Copy it. Do not restyle it.

**Button, primary.** `--accent` fill, `--accent-ink` text, body sans 16px, padding 12px 16px, radius 4px, no shadow. Hover: `--accent-hover`. Focus: 2px `--ink` outline, 2px offset. Disabled: 40% opacity, no pointer.

**Button, secondary.** `--sand` fill, `--ink` text. Same size and radius.

**Button, ghost.** Transparent, 1px `--ink` border. No other button styles. One primary button per view.

**Link.** `--accent`, underline offset 3px. Hover: underline 1px, same color. Not bold.

**Overline.** Label style. `--accent`. Sits 8px above the heading. No rules, numbers, or icons beside it.

**Tag.** Solid `--tag` or `--tag-quiet`, `--ink` text, radius 2px, padding 4px 8px. No border.

**Card.** `--surface` fill, radius 8px, padding 24px. No border, no shadow. Do not add an accent edge.

**Metric.** Serif number in `--accent`, caption label in sans `--olive` under it. No box around the row.

**List.** No bullets. Items separated by 12px. A leading rule is not a bullet.

**Code.** `--surface` background, radius 4px, padding 16px, mono 14px, `--ink`. No border.

**Section break.** Whitespace first. A full-width 1px `--line` only when two regions would otherwise merge.

**Focus.** Every control shows the 2px `--ink` outline. Do not remove outlines.

## References

- https://kami.tw93.fun/index.html — take: parchment canvas, one accent used rarely, warm neutrals, flat cards, whitespace as structure, serif for the largest type. Leave: ink blue, serif body, print-sized body text, blue tag tints.
- Do not take layout from generic SaaS templates. No centered hero over a gradient, no three equal icon columns, no logo cloud.

## Done when

- [ ] Page background is `--bg`, not white
- [ ] The only chromatic color is the ink green, and it covers well under half a screen
- [ ] Body, nav, buttons, and captions are Source Sans 3 (or the named fallback)
- [ ] Headings, display numbers, and pull quotes are Source Serif 4 at weight 500
- [ ] `bun scripts/lint.mjs <your files>` passes. It rejects any color, size, radius, space, shadow, or class outside the system
- [ ] 375 and 1280 both read cleanly, with no horizontal scroll
- [ ] Keyboard focus is visible on every control
