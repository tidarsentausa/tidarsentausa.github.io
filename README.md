# Tidar Sentausa

**SEO Manager · Digital Project Manager · SEO Strategist**
Kuala Lumpur, Malaysia · [LinkedIn](https://linkedin.com/in/tidar-sentausa) ·
[Portfolio](https://tidarsentausa.github.io)

---

I lead SEO at **LegalBison**, a legal tech platform, where I own organic search
end to end — strategy, technical audits, content, and the reporting that proves
whether any of it worked. Ten years in search, across B2B and B2C, mostly
inside Samsung's orbit: Cheil Worldwide on regional SEO, then Samsung Indonesia
in a B2B digital project management seat.

Alongside that I run **UrbanIdea ID** and **Essential Gear ID**, Indonesian
commerce and media properties, and consult freelance on SEO strategy.

## What I actually do

**SEO and content strategy.** Keyword research, technical and on-page audits,
content architecture, and link building — with the judgement to know which of
those a stalled site actually needs.

**Project management.** The part of the job that isn't SEO. Stakeholder
management across marketing, product, and engineering, workflow design, and
shipping campaigns that other people depend on.

**Analytics and reporting.** GA4, Search Console, Data Studio, Tag Manager,
Clarity. If a dashboard doesn't change a decision, it isn't worth building.

**AI-assisted tooling.** The newer thread. I build LLM-driven pipelines that
turn raw search data into answers — a browser-agent workflow that automates
Search Console extraction, a GSC analysis pipeline that surfaces query- and
page-level uplift, and rapid prototyping with AI coding agents and MCP. The
aim is to remove the reporting drag that eats the week.

## Tools

Ahrefs · Semrush · Screaming Frog · Moz · Google Search Console · Google
Analytics · Google Data Studio · Google Tag Manager · Microsoft Clarity ·
Similarweb

## Career

| | | |
|---|---|---|
| **Dec 2025 –** | LegalBison.com | SEO Manager |
| **Jan 2025 –** | Self-Employed | SEO Strategy Consultant |
| **Jan 2024 – Dec 2024** | Samsung Indonesia | B2B Digital Project Manager |
| **Dec 2021 – Aug 2024** | Cheil Worldwide (Samsung B2C) | Regional SEO Analyst |
| **Dec 2020 – Dec 2021** | AMAAN Indonesia | Web & App Content Specialist |
| **Dec 2019 – Dec 2020** | Chilibeli | SEO Content Marketing Specialist |
| **Jan 2017 – Dec 2019** | BukaReview by Bukalapak | SEO Content Writer |
| **Oct 2011 – Oct 2017** | Early career (5 roles) | Copywriter / Content Writer |

## Languages

Indonesian (native), English (fluent).

---

## About this site

This is my résumé, built to be read rather than skimmed. Static React and Vite,
styled in a neobrutalist system — sharp corners, hard borders, offset shadows.

All copy and content live in [`src/data.ts`](src/data.ts) — that's the file to
edit for anything you'd read on the page. The page itself is assembled in
[`App.tsx`](src/App.tsx) from one component per section, in `src/sections/`.

### The UI layer

Styling comes from [**BoldKit**](https://github.com/ANIBIT14/boldkit), a
neubrutalism component library built on shadcn/ui. Its components are vendored
as source, not installed from npm — each file under `src/ui/` came from
`https://boldkit.dev/r/<name>.json` and is updated by re-fetching that URL.
That is deliberate: shadcn components are meant to be owned and edited, not
pinned in `node_modules`.

- `src/styles/globals.css` — the BoldKit theme (HSL tokens, motion system).
  Re-fetch with `curl https://boldkit.dev/r/styles.json` if you want to upgrade.
- `src/styles/motion.css` — the animation keyframes the theme references.
- `src/lib/utils.ts` — the `cn()` class helper the components import.
- `src/app.css` — page structure only. It deliberately overrides no BoldKit
  token; section rhythm, the marquee rail, and the display type live there.

To add a BoldKit component, drop the registry JSON into the repo root and copy
its files into `src/ui/`:

```bash
curl -sSL https://boldkit.dev/r/<component>.json -o tmp.json
# then move the `files[].content` entries from tmp.json into src/ui/
```

The `@/` alias that those components import through is set in both
`vite.config.ts` and `tsconfig.json`.

```bash
npm install
npm run dev       # local dev server
npm run build     # production build into dist/
npm run preview   # serve the build locally
```

Pushes to `main` deploy to GitHub Pages.

Most tool logos load as SVGs from the simple-icons CDN. Ahrefs, Screaming Frog,
and Microsoft Clarity are not in simple-icons, so they are self-hosted in
`public/`; if the CDN changes, the rest will 404 silently. `Moz` resolves to
the Mozilla mark, as simple-icons has no Moz entry.

The three self-hosted marks are black-on-transparent, converted from the
official colour artwork by [`tools/monochrome-icons.py`](tools/monochrome-icons.py)
so they match the CDN glyphs instead of reading as two coloured errors. To
rebuild them from a fresh download:

```bash
git checkout -- public/clarity.png public/sf-favicon.png   # undo a previous run
python tools/monochrome-icons.py
```

The script is not idempotent — it reads luminance, and an already-black image
has none — so always start from the committed originals.
