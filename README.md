# Tidar Sentausa

**SEO Manager · Digital Project Manager · SEO Strategist**
Kuala Lumpur, Malaysia · [LinkedIn](https://linkedin.com/in/tidar-sentausa) ·
[Portfolio](https://tidarsentausa.github.io)

---

I am Tidar Sentausa. I work in Kuala Lumpur, Malaysia. I am an SEO Manager.
I am also a Digital Project Manager and an SEO Strategist.

I lead SEO at a **global corporate service provider**. The company provides
corporate services for FinTech and digital assets.
I manage organic search. This includes strategy, technical audits, and content.
This also includes reporting. Reporting shows if the work is effective.
I have ten years of experience in search. I have worked in B2B and in B2C.
I worked at Cheil Worldwide on regional SEO.
I worked at Samsung Indonesia in B2B digital project management.

I also operate **UrbanIdea ID** and **Essential Gear ID**.
These are Indonesian commerce and media properties.
I also work as a freelance SEO strategy consultant.

## What I Do

**SEO and content strategy.** I do keyword research. I do technical audits.
I do on-page audits. I design content architecture. I build links.
I identify the action that a stalled site needs.

**Project management.** I manage stakeholders. Stakeholders are in marketing,
product, and engineering. I design workflows. I deliver campaigns.
Other persons depend on these campaigns.

**Analytics and reporting.** I use GA4. I use Search Console. I use Data
Studio. I use Tag Manager. I use Clarity. A dashboard must support a decision.
If it does not support a decision, do not build it.

**AI-assisted tooling.** I build LLM-driven pipelines. These pipelines change
raw search data into answers. I use a browser-agent workflow. It automates
Search Console extraction. I use a GSC analysis pipeline. It shows uplift at
query level and at page level. I also prototype with AI coding agents and MCP.
The objective is to remove reporting work. Reporting work uses much time.

## Tools

Ahrefs · Semrush · Screaming Frog · Moz · Google Search Console · Google
Analytics · Google Data Studio · Google Tag Manager · Microsoft Clarity ·
Similarweb

## Career

| | | |
|---|---|---|
| **Dec 2025 –** | Global corporate service provider | SEO Manager |
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

## About This Site

This site is my résumé. It uses static React and Vite.
It uses a neobrutalist system. The system has sharp corners.
It has hard borders. It has offset shadows.

All text and content are in [`src/data.ts`](src/data.ts).
To change text on the page, edit that file.
The page structure is in [`App.tsx`](src/App.tsx).
Each section is one component in `src/sections/`.

### The UI Layer

The styling uses [**BoldKit**](https://github.com/ANIBIT14/boldkit).
BoldKit is a neubrutalism component library. It is built on shadcn/ui.
Its components are vendored as source. They are not installed from npm.
Each file in `src/ui/` comes from `https://boldkit.dev/r/<name>.json`.
To update a file, fetch that URL again.
This is intentional. You must own and edit shadcn components.
Do not pin them in `node_modules`.

- `src/styles/globals.css` — the BoldKit theme. It contains the HSL tokens
  and the motion system. To upgrade, re-fetch with
  `curl https://boldkit.dev/r/styles.json`.
- `src/styles/motion.css` — the animation keyframes. The theme refers to
  these keyframes.
- `src/lib/utils.ts` — the `cn()` class helper. The components import it.
- `src/app.css` — the page structure only. It overrides no BoldKit token.
  Section rhythm, the marquee rail, and the display type are in this file.

To add a BoldKit component, do these steps:

1. Download the registry JSON into the repo root.
2. Copy its files into `src/ui/`.

```bash
curl -sSL https://boldkit.dev/r/<component>.json -o tmp.json
# then move the `files[].content` entries from tmp.json into src/ui/
```

The `@/` alias is set in two files: `vite.config.ts` and `tsconfig.json`.
The components import through this alias.

To run the site, do these steps:

1. Install the dependencies.
2. Start the local dev server, or build the site, or preview the build.

```bash
npm install
npm run dev       # local dev server
npm run build     # production build into dist/
npm run preview   # serve the build locally
```

Pushes to `main` deploy to GitHub Pages.

Most tool logos load as SVGs from the simple-icons CDN. Ahrefs, Screaming Frog,
and Microsoft Clarity are not in simple-icons. Therefore they are self-hosted
in `public/`. If the CDN changes, the other logos will return 404 without a
message. `Moz` resolves to the Mozilla mark. Simple-icons has no Moz entry.

The three self-hosted marks are black-on-transparent. They were converted from
the official colour artwork by
[`tools/monochrome-icons.py`](tools/monochrome-icons.py).
The conversion makes them match the CDN glyphs.
To rebuild them from a new download, do these steps:

1. Restore the committed originals.
2. Run the script.

```bash
git checkout -- public/clarity.png public/sf-favicon.png   # undo a previous run
python tools/monochrome-icons.py
```

The script is not idempotent. It reads luminance. An image that is already
black has no luminance. Therefore always start from the committed originals.
