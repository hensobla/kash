# Kash: sitter guide microsite

Single-page React site that babysitters use as a care guide for Kash. Mobile-first, hosted on GitHub Pages.

**Live:** https://hensobla.github.io/kash/
**Repo:** https://github.com/hensobla/kash

## Session continuity

If `HANDOFF.md` exists in the project root, read it first before doing anything else. It contains the state of the previous session and immediate next steps.

## Stack

- Vite 6 + React 18 + Tailwind 3.4 + lucide-react
- Deployed via GitHub Actions on push to `main`

## Commands

- `npm run dev`: dev server at http://localhost:5173/
- `npm run build`: production build to `dist/`

## Project shape

- Everything is in `src/App.jsx`, one file with helpers (`Section`, `Bullet`, `Callout`, `CrinkleImage`, `StairsIcon`) at the top.
- Reference `public/` assets via `` `${import.meta.env.BASE_URL}name.jpg` `` so they resolve in both dev and production.
- `vite.config.js` sets `base` conditionally: `/kash/` only on build, `/` in dev (so the Preview MCP can reach it from root).

## Design language

- Palette: cream `#FBF7EE`, butter `#F4E7CC`, tan `#E0CCA1`, deep `#2A1812`, mid `#7A6450`, persimmon `#E26240`, sage `#6E8B5C`, rust `#B53321`
- Fonts: Fraunces (display serif), Inter (body sans), via Google Fonts
- Layout: max-w-md single column, rounded-3xl cards with thin tan borders

## Photos

HEIC source photos are gitignored (`*.heic`). Convert before referencing:

```bash
sips -s format jpeg -s formatOptions 85 -Z 1400 src.heic --out public/name.jpg
```

## Content rules

- Don't invent content. User provides copy; placeholders go in `[brackets]` and look clearly unfinished.
- Don't assume the sitter is at Kash's home. They may be at their own place. Location-specific guidance goes in explicit conditional callouts ("If you're at Kash's home").
- Kash is sweet, shy, loves cuddles, food-motivated. Not goofy.
