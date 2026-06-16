# Handoff: Kash sitter-guide microsite, shipped to GitHub Pages

**Updated:** 2026-06-16
**Branch:** `main` (clean, all changes pushed)
**Live URL:** https://hensobla.github.io/kash/
**Repo:** https://github.com/hensobla/kash

## Current goal

The microsite is live and being shared with the dog sitter. Active work this session was scaffolding the project, iterating on design (palette, typography, photo treatment, accordion structure), wiring up the Kash photo + feeding-toy photos, and tightening copy so it doesn't assume the sitter is at Kash's home. **No outstanding tasks.** The user signaled "yes" to deploy the last copy fix and it shipped successfully.

## State right now

- Vite + React + Tailwind app, single-page, mobile-first, max-w-md container.
- Everything lives in [src/App.jsx](src/App.jsx), one monolithic component file (~620 lines). Helper components (`Section`, `Bullet`, `Callout`, `CrinkleImage`, `StairsIcon`) are defined at the top.
- Deployed via [.github/workflows/deploy.yml](.github/workflows/deploy.yml) on every push to `main`. Two successful deploys so far.
- Dev server runs via `npm run dev` at `http://localhost:5173/` (Vite base is conditional: `/kash/` only on production build).
- Preview tooling: [.claude/launch.json](.claude/launch.json) registers the dev server with the Claude Preview MCP under the name `kash-dev`. Gitignored.

## What was done this session

- Scaffolded the project from scratch: `package.json`, `vite.config.js`, `tailwind.config.js`, `postcss.config.js`, `index.html`, `src/main.jsx`, `src/App.jsx`, `src/index.css`, `.github/workflows/deploy.yml`, `.gitignore`. Mirrored the user's Departures App pattern.
- Built the full microsite content from the user's markdown outline. **No content was invented.** When location-specific info was missing, I left a clearly marked placeholder (later removed).
- Designed a warm cream/persimmon palette and Fraunces+Inter typography (in [tailwind.config.js](tailwind.config.js) and [index.html](index.html)).
- Wrote a `Section` accordion component that supports both uncontrolled and controlled `open` state, plus a `rust` accent variant for the Vet section.
- Sticky header with persistent **Emergency Vet** button that scrolls to + auto-expands the vet section (controlled state, `emergencyOpen`, in [src/App.jsx](src/App.jsx)).
- `CrinkleImage` component: SVG mask via inline data URL with quadratic-Bézier scallops (softened from initial sharp zigzag). Supports `indents` and `depth` props.
- Converted three HEIC photos (`IMG_1615.heic`, `public/food-ball.heic`, `public/food-bottle.heic`) to JPGs in `public/` via `sips`. HEICs added to `.gitignore`.
- Wired Kash photo above hero: 37.5% width, left-aligned, `rotate-[-4deg]`, with soft crinkle edge.
- Wired feeding-toy photos in the Feeding accordion: white bg, thin tan outline, `object-contain` (the bottle is portrait 621×1200, the ball is near-square 1200×1150).
- Updated hero copy: "sweet, shy, loves a cuddle, and is deeply food-motivated" (was "sweet, food-motivated goofball").
- Reordered sections so Potty sits right after Feeding.
- Restructured **Leaving Him Alone**: removed the "You'll be at Kash's home" assumption; added a butter-colored conditional callout "If you're at Kash's home" containing both the familiar-turf line and the **30 minutes max** sentence; preview text now "Anxious boi".
- Tightened **Potty** ("He's potty trained, so this is mostly straightforward") and **Sleep** ("He has his own bed if you'd rather...") to remove residual home assumptions.
- Created the GitHub repo `kash` (public), enabled Pages with `build_type=workflow`, pushed twice. Live deploy verified via `curl`.

## Key decisions and why

| Decision | Rationale | Alternatives rejected |
|---|---|---|
| Vite + React + Tailwind + lucide-react | Mirrors user's existing Departures App so they know how to edit it | Plain HTML/CSS (user said they don't care as long as it can look nice) |
| Vet section is a Section accordion (collapsed by default) with `accent="rust"` | User asked to make it collapsible like the others, but it still needs to be unmistakable | Keep it always-expanded (rejected: user explicitly wanted it collapsible) |
| Vite base path is conditional (`/kash/` only on `command === 'build'`) | Dev server serves at `/` so Preview MCP can reach it without path tricks | Hardcoded `/kash/` base (broke the preview panel; root URL only showed the cream bg) |
| `import.meta.env.BASE_URL` prefix on all `public/` asset src | Works in dev (`/`) and production (`/kash/`) with the same code | Hardcoded `/kash.jpg` (would 404 in dev) |
| HEIC to JPG conversion via `sips -Z 1200 -s formatOptions 85` | HEIC doesn't render in most browsers; resize keeps payload small | Leaving as HEIC and `<picture>` fallback (overkill for a private microsite) |
| Soft scalloped crinkle (quadratic Bézier) instead of sharp zigzag | User asked to soften the edges | Rounded zigzag with small radius at apex (rejected: chose smoother wave look) |
| Photo `object-contain` (not cover) for feeding toys | Bottle is 621×1200 portrait, so `cover` would crop the bottle awkwardly | `aspect-square` + `object-cover` (works for ball, mutilates bottle) |
| Removed the "If you're somewhere else" placeholder block | User asked to remove it after the at-home block absorbed the "30 minutes max" line | Keep as a permanent stub (user explicitly said remove) |

## Files touched

- **Created:** [src/App.jsx](src/App.jsx), the entire site
- **Created:** [src/main.jsx](src/main.jsx), [src/index.css](src/index.css), [index.html](index.html)
- **Created:** [tailwind.config.js](tailwind.config.js), custom palette (cream, butter, tan, deep, mid, soft, persimmon, sage, rust) + Fraunces/Inter fonts
- **Created:** [postcss.config.js](postcss.config.js), [vite.config.js](vite.config.js), [package.json](package.json), [.gitignore](.gitignore)
- **Created:** [.github/workflows/deploy.yml](.github/workflows/deploy.yml), Pages deploy on push to main
- **Created:** [.claude/launch.json](.claude/launch.json), Preview MCP dev-server registration (gitignored)
- **Created:** [public/kash.jpg](public/kash.jpg), [public/food-ball.jpg](public/food-ball.jpg), [public/food-bottle.jpg](public/food-bottle.jpg), converted from HEIC
- **Referenced (not modified):** `/Users/blakehenson/Desktop/Departures App/*`, used as the pattern reference for the scaffold (deploy.yml, vite.config.js, package.json shape)

## Git state

```
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
```

Two commits on `main`:
- `0533966` Drop the assumption sitter is at Kash's home
- `2481f53` Initial commit, Kash sitter guide

## Immediate next steps

There are no required next steps. The site is shipped and being shared. Possible follow-ups if the user asks:

1. Add not-home guidance for **Leaving Him Alone**. The "If you're somewhere else" block was deliberately removed but might come back if the user wants location-specific guidance for that scenario.
2. Update workflow actions to Node 24. The deploy.yml gets a deprecation warning (`actions/checkout@v4` etc. running on Node 20). Non-blocking until 2026-09-16.
3. Add an icon/favicon. Currently no `<link rel="icon">`. Browser tab shows the default globe.
4. Improve the Stairs section. It's very brief; user may want more detail.
5. Re-export `IMG_1615.heic` if the user takes a better Kash photo. The conversion command is `sips -s format jpeg -s formatOptions 85 -Z 1400 IMG_1615.heic --out public/kash.jpg`.

## Gotchas for the next session

- **HEIC photos** are gitignored (`*.heic` rule). If the user drops a new HEIC into the project, convert it with `sips` first (see commands above) and reference the JPG in code. Don't try to render `.heic` directly. Safari shows it, Chrome/Firefox don't.
- **Vite base path** is conditional in [vite.config.js](vite.config.js). Dev runs at `/`, build outputs for `/kash/`. Always use `${import.meta.env.BASE_URL}filename.jpg` when referencing `public/` assets. Never hardcode `/kash/...`.
- **Preview MCP** needs [.claude/launch.json](.claude/launch.json) to know about the dev server. If it isn't there, the preview panel just shows the cream `background: #FBF7EE` from the inline style in [index.html](index.html) and nothing else. That's the React app failing to load via the preview tooling, not a code bug.
- **The Vet section is controlled** by `emergencyOpen` state in `App` so the sticky header link can both scroll to it AND open it. Other Section instances are uncontrolled (own `useState` inside). Don't accidentally convert the vet section to uncontrolled, or the sticky button will stop working.
- **`CrinkleImage` uses a CSS mask**, not a clip-path. Drop-shadow follows the mask via the `filter` style. The image also has `aspect-square` baked in. For non-square subjects, change the component.
- **Tailwind arbitrary values** are used in spots: `w-[37.5%]`, `rotate-[-4deg]`, `transition-[grid-template-rows]`, `grid-rows-[1fr]`/`grid-rows-[0fr]` (the accordion animation trick). All work with Tailwind 3.4. Careful if upgrading Tailwind.
- **Local git config only.** `git config user.name "hensobla"` and `user.email "hensobla@gmail.com"` are set on this repo (no global config). New repos in this user's environment will need the same.
- **Content rule**: the user said "Don't invent content I didn't give you. If something's missing, leave a clearly marked placeholder." Honor this. Don't write copy for sections the user hasn't given.
- **Tone**: Kash is "sweet, shy, loves a cuddle, food-motivated." NOT goofy. The user corrected this explicitly mid-session.
- **No em-dashes ever.** The user explicitly forbade em-dashes. Use periods, commas, parentheses, or colons instead. This applies to user-facing copy, code comments, docs, and conversational text alike.
