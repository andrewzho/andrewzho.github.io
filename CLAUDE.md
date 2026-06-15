# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start        # dev server at localhost:3000
npm run build    # production build
npm run deploy   # build + copy index.html → 404.html (GitHub Pages SPA fallback) + push to gh-pages
```

## Architecture

Single-page React app (Create React App, React 17) deployed to GitHub Pages at `andrewzho.github.io`. No UI framework — the entire look is a hand-rolled CSS design system. Dark, minimal, monochrome ("OLED Lively"): Archivo + Space Grotesk, with subtle motion.

**Routing** (`src/App.js`): React Router v6 with two routes — `/` (Home, a single-page scroller) and `/resume` (inline PDF viewer). Any unknown path redirects to `/`.

**The design system lives in one file: `src/style.css`.** It holds the color tokens (`--bg`, `--fg`, `--muted`, `--line`…), every component class, the responsive breakpoints, and a `prefers-reduced-motion` block. There is no CSS-in-JS and no Bootstrap — edit `style.css` to change the look.

**Components** (`src/components/`):
- `Ambient.js` — renders the three fixed background layers (drifting grid, cursor-following spotlight, film grain) and drives two effects in JS: the spotlight (rAF lerp toward the pointer) and scroll-reveal (an `IntersectionObserver` that adds `.in` to every `.reveal` element, re-scanned on route change). Respects reduced-motion.
- `Navbar.js` — sticky nav. Section links (`Work`/`Now`/`Life`/`Contact`) scroll to an id on Home; if you're on `/resume` they navigate home first, then scroll. `Résumé` is a real route link.
- `Footer.js` — the global "Let's talk" contact section (`id="contact"`); renders on every page.
- `Home/Home.js` — the whole landing page: hero (per-letter hover, typed role via `Type.js`), a skills marquee, **Work** (tilt-on-hover project cards), **Currently** ("now" strip), and **Off the clock** (life tiles). Content is hard-coded in the `PROJECTS` / `NOW` / `MARQUEE` arrays at the top.
- `Home/Type.js` — rotating role line (typewriter-effect).
- `Resume/ResumeNew.js` — renders `src/Assets/Resume.pdf` inline via `react-pdf` (worker from cdnjs, pinned to the bundled `pdfjs.version`) plus download buttons.

## Content to update

All personal content is hard-coded in component files — no CMS or data files:
- Projects → `PROJECTS` array in `src/components/Home/Home.js`
- "Currently" / "Off the clock" → `NOW` array and the life tiles in `Home.js`
- Hero copy, eyebrow, lead → `Home.js`; rotating roles → `Home/Type.js`
- Résumé PDF → `src/Assets/Resume.pdf` (served by the Resume page and the hero "Download CV")
- Social links → `src/components/Footer.js`

## Motion conventions

When adding a section that should animate in, give its wrapper the `reveal` class — `Ambient.js` will observe it automatically. Keep transitions in the 150–400ms range and behind `transform`/`opacity` so they stay on the GPU, and make sure anything new degrades under the `prefers-reduced-motion` block in `style.css`.

## Deployment note

The `predeploy` script copies `build/index.html` → `build/404.html` so GitHub Pages serves the SPA correctly on direct navigation to a client-side route (e.g. `/resume`): Pages returns the 404 page, which is really the app, and React Router takes over.
