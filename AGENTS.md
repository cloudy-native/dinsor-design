# dinsor-design: agent guide

Warm paper, one ink green. Serif display, sans body. Flat. Use this system for any UI you build.

## Use it

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/cloudy-native/dinsor-design@main/dist/dinsor.css">
```

Or copy `dist/` and `fonts/` together (the CSS loads `../fonts/`). Tailwind: `presets: [require("./dist/tailwind.preset.cjs")]`.

Start from [templates/page.html](templates/page.html). Copy markup from [components/](components/). Do not write new CSS unless no component fits. If you must, use only `var(--*)` tokens.

## Read order

1. This file.
2. [components/](components/): one snippet per component.
3. [dist/tokens.md](dist/tokens.md): every allowed value.
4. [DESIGN.md](DESIGN.md): rationale, only if a rule is unclear.

## Hard rules

- Colors, sizes, radii, spacing, shadows: tokens only. No hex, no `rgba`, no gradients, no `#fff`.
- One accent. Ink green under 5% of the viewport. One primary button per view.
- Serif (`--serif`) for display only, weight 500. Everything else is sans.
- Flat. No shadow except `--shadow-floating` on a menu or dialog.
- Body 17px. Hit targets at least 44px. Visible focus. WCAG AA.
- Breakpoints 375 / 768 / 1280, mobile first. No horizontal scroll.
- No invented copy. Missing strings stay `[copy]`.
- No new classes that duplicate an existing one. Page-specific layout goes in your own stylesheet, built from tokens.

## Check your work

```
node scripts/lint.mjs path/to/your/files
```

Fails on off-token color, font size, weight, radius, spacing or shadow, gradients, unknown classes, missing `alt`/`lang`. Fix every line it prints.

## Change the system

Edit `tokens/tokens.json` or `src/*.css`, then `npm run build`. Never edit `dist/` by hand. CI fails if `dist/` is stale.

`examples/` are demos built on the system. They are not part of it. Do not copy their classes.
