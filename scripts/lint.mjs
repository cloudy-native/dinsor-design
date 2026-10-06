// Usage: bun scripts/lint.mjs [path ...]   (files or dirs; default: whole repo)
// Fails on anything outside tokens/tokens.json. No dependencies.
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { dirname, join, resolve, relative, extname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const tokens = JSON.parse(readFileSync(join(root, "tokens/tokens.json"), "utf8"));
const px = (g) => new Set(Object.values(tokens[g]).map((t) => t.value));
const hexes = new Set(Object.values(tokens.color).map((t) => t.value.toLowerCase()));
for (const v of Object.values(tokens.themes)) if (typeof v === "object") hexes.add(v.value.toLowerCase());
const themesPath = join(root, "dist/themes.css");
if (existsSync(themesPath)) for (const m of readFileSync(themesPath, "utf8").matchAll(/#[0-9a-fA-F]{6}\b/g)) hexes.add(m[0].toLowerCase());
const sizes = px("size");
const radii = px("radius");
const spaces = new Set([...px("space"), "0px", tokens.layout["page-padding"].value]);
const shadows = px("shadow");
const norm = (s) => s.replace(/\s+/g, " ").trim();

const SKIP = new Set(["node_modules", ".git", "fonts", "docs"]);
const walk = (p, acc = []) => {
  if (statSync(p).isFile()) return acc.push(p), acc;
  for (const f of readdirSync(p)) if (!SKIP.has(f)) walk(join(p, f), acc);
  return acc;
};

const classesIn = (css) => new Set([...css.replace(/url\([^)]*\)/g, "").matchAll(/\.([a-zA-Z][\w-]*)/g)].map((m) => m[1]));
const libClasses = new Set();
for (const f of ["base", "components"]) classesIn(readFileSync(join(root, `src/${f}.css`), "utf8")).forEach((c) => libClasses.add(c));

const problems = [];
const lineAt = (text, i) => text.slice(0, i).split("\n").length;

function lintCss(css, file, lineOffset = 0, text = css) {
  const body = css.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " ")).replace(/@font-face\s*\{[^}]*\}/g, (m) => m.replace(/[^\n]/g, " "));
  const bad = (i, msg) => problems.push(`${relative(root, file)}:${lineAt(body, i) + lineOffset}  ${msg}`);
  const isTokensFile = file.endsWith("tokens.css");

  for (const m of body.matchAll(/#[0-9a-fA-F]{3,8}\b/g)) if (!hexes.has(m[0].toLowerCase())) bad(m.index, `color ${m[0]} is not a token`);
  for (const m of body.matchAll(/\b(rgba?|hsla?|hwb|lab|lch|oklab|oklch)\([^)]*\)/g)) if (!shadows.has(norm(m[0])) && ![...shadows].some((s) => s.includes(norm(m[0])))) bad(m.index, `${m[0]} is not a token`);
  for (const m of body.matchAll(/:\s*(white|black)\s*[;}]/gi)) bad(m.index, `named color ${m[1]}. Use a token`);
  for (const m of body.matchAll(/gradient\(/g)) bad(m.index, "gradients are not allowed");
  for (const m of body.matchAll(/(?<![\w-])(box|text)-shadow\s*:\s*([^;}]+)/g)) {
    const v = norm(m[2]);
    if (v !== "none" && v !== "var(--shadow-floating)" && !shadows.has(v)) bad(m.index, `shadow "${v}" is not a token`);
  }
  for (const m of body.matchAll(/(?<![\w-])font-weight\s*:\s*([^;}]+)/g)) if (!/^(400|500|normal|inherit)$/.test(norm(m[1]))) bad(m.index, `font-weight ${norm(m[1])}. Use 400 or 500`);
  for (const m of body.matchAll(/(?<![\w-])font-size\s*:\s*([^;}]+)/g)) {
    const v = norm(m[1]);
    for (const p of v.match(/[\d.]+px/g) ?? []) if (!sizes.has(p)) bad(m.index, `font-size ${p} is not a token`);
    if (/[\d.]+(rem|em|pt)\b/.test(v) && !isTokensFile) bad(m.index, `font-size ${v}. Use a --text-* token`);
  }
  for (const m of body.matchAll(/(?<![\w-])border(?:-[a-z]+)*-radius\s*:\s*([^;}]+)/g))
    for (const p of m[1].match(/[\d.]+px/g) ?? []) if (!radii.has(p)) bad(m.index, `radius ${p} is not a token`);
  for (const m of body.matchAll(/(?<![\w-])(margin|padding|gap|row-gap|column-gap)(?:-[a-z]+)*\s*:\s*([^;}]+)/g))
    for (const p of m[2].match(/-?[\d.]+px/g) ?? []) if (!spaces.has(p.replace("-", ""))) bad(m.index, `spacing ${p} is not on the scale`);
}

function lintHtml(html, file) {
  const dir = dirname(file);
  const known = new Set(libClasses);
  const rel = (p) => relative(root, file) + ":" + p;
  for (const m of html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)) {
    lintCss(m[1], file, lineAt(html, m.index) - 1);
    classesIn(m[1]).forEach((c) => known.add(c));
  }
  for (const m of html.matchAll(/style="([^"]*)"/g)) lintCss(`x{${m[1]}}`, file, lineAt(html, m.index) - 1);
  for (const m of html.matchAll(/<link[^>]+href="([^"]+\.css)"/g)) {
    const p = resolve(dir, m[1]);
    if (existsSync(p) && !p.startsWith(join(root, "dist"))) classesIn(readFileSync(p, "utf8")).forEach((c) => known.add(c));
  }
  for (const m of html.matchAll(/class="([^"]*)"/g))
    for (const c of m[1].split(/\s+/).filter(Boolean)) if (!known.has(c)) problems.push(rel(lineAt(html, m.index)) + `  unknown class "${c}". Not in the system or this page's CSS`);
  if (!/<html[^>]+lang=/.test(html) && /<html/.test(html)) problems.push(rel(1) + "  <html> needs lang");
  for (const m of html.matchAll(/<img\b(?![^>]*\balt=)[^>]*>/g)) problems.push(rel(lineAt(html, m.index)) + "  <img> needs alt");
}

const targets = process.argv.length > 2 ? process.argv.slice(2).map((p) => resolve(p)) : [root];
let n = 0;
for (const t of targets) for (const f of walk(t)) {
  const ext = extname(f);
  if (ext !== ".css" && ext !== ".html") continue;
  if (f.includes("/dist/") && ext === ".css" && !f.endsWith("dinsor.css")) continue; // dist parts are checked via src/
  n++;
  const text = readFileSync(f, "utf8");
  ext === ".css" ? lintCss(text, f) : lintHtml(text, f);
}
if (problems.length) {
  console.error(problems.join("\n") + `\n\n${problems.length} problem(s) in ${n} file(s)`);
  process.exit(1);
}
console.log(`ok: ${n} file(s) clean`);
