# Design brief — websites

Derived from the Kami sample (https://kami.tw93.fun/index.html). Same intent: a warm paper page, one restrained accent, size-led hierarchy, flat surfaces, editorial rhythm. Not a recolor of Kami.

Read this file before changing UI. Do not import Kami's ink blue or its serif body.

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
- Do not add colors, type sizes, radii, or shadows that are not in this file.
- Do not invent marketing copy. Missing strings stay as `[copy]`.

## Voice

Quiet, specific, short. The page sounds like a person who edits, not a brand that announces.

- Do: concrete nouns, short sentences, real names for things.
- Don't: "unlock", "seamless", "elevate", "next-gen", exclamation marks, or a second accent "for emphasis".

## Tokens

Use these names as CSS variables. No other colors.

### Canvas

| token | hex | use |
|---|---|---|
| `--bg` | `#F5F4ED` | page background. Never `#fff`, never cool gray |
| `--surface` | `#FAF9F5` | cards, code blocks, elevated paper |
| `--sand` | `#E8E6DC` | secondary buttons, interactive fills |
| `--ink` | `#141413` | primary text. Not pure black |
| `--ink-soft` | `#3D3D3A` | secondary text |
| `--olive` | `#504E49` | quotes, captions, de-emphasized text |
| `--stone` | `#6B6A64` | footnotes, meta |
| `--line` | `#D9D6CC` | the one hairline, only when a boundary must be explicit |

Warm neutrals stay yellow-brown (R ≈ G > B). Do not green-shift the paper.

### Accent

| token | hex | use |
|---|---|---|
| `--accent` | `#1C3D32` | links, one primary button, overlines, key numbers |
| `--accent-ink` | `#FAF9F5` | text on `--accent`. Ivory, not pure white |
| `--accent-hover` | `#143028` | primary button hover. Darken, do not brighten |
| `--tag-quiet` | `#E7EFE9` | receding tag fill |
| `--tag` | `#D9E6DE` | default tag fill |
| `--danger` | `#B53333` | errors only. Not a brand color |

Tag fills are solid hex. No `rgba`. No gradients.

### Dark surfaces

Only when a brief asks for a dark band. Not the default page.

| token | hex | use |
|---|---|---|
| `--dark` | `#141413` | dark page base |
| `--dark-surface` | `#30302E` | dark containers |
| `--accent-on-dark` | `#8FBFAB` | links and labels on `--dark`. Still one green |

### Type

Two families. Do not swap their jobs.

- Display: `"Source Serif 4", "Iowan Old Style", Palatino, "Palatino Linotype", serif`. Headlines, display numbers, pull quotes. Weight 500. Never 600 or higher.
- Body: `"Source Sans 3", "Avenir Next", "Segoe UI", sans-serif`. Body, nav, buttons, captions, labels, lists. Weight 400. Labels may use 500.
- Mono: `"JetBrains Mono", ui-monospace, monospace`. Code, hex, version strings. Tabular figures on metrics.

| role | face | size | weight | line-height |
|---|---|---|---|---|
| display | serif | 48px | 500 | 1.10 |
| h1 | serif | 32px | 500 | 1.20 |
| h2 | serif | 22px | 500 | 1.25 |
| h3 | serif | 18px | 500 | 1.30 |
| body | sans | 17px | 400 | 1.60 |
| caption | sans | 14px | 400 | 1.45 |
| label | sans | 12px | 500 | 1.35 |
| metric | serif | 32px | 500 | 1.10 |

At 375px, display drops to 36px. Nothing else shrinks except horizontal padding.

Label tracking: `0.06em`. No small-caps. No italic, except pull quotes.

Pull quote: display serif, italic, 22px, `--olive`, no border and no quotation-mark graphic.

### Space

4px base. Use only: 4, 8, 12, 16, 24, 32, 48, 64, 96.

| step | use |
|---|---|
| 4–8 | tag padding, inline gaps |
| 12–16 | inside a component |
| 24–32 | between components, card padding |
| 48–64 | under a section title |
| 96 | between major sections |

Max content width: 1040px. Page padding: 20px under 768, 32px from 768 up.

### Radius and depth

| token | value | use |
|---|---|---|
| `--radius-chip` | 2px | tags |
| `--radius-control` | 4px | buttons, inputs, code |
| `--radius-card` | 8px | cards |

Flat by default. No drop shadow. A shadow is allowed only on a real floating layer (menu, dialog) and only as `0 8px 24px rgba(20, 20, 19, 0.08)`. Screenshots sit on `--surface` with no shadow.

## Components

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
- [ ] No size, color, radius, or shadow from outside this file
- [ ] 375 and 1280 both read cleanly, with no horizontal scroll
- [ ] Keyboard focus is visible on every control
