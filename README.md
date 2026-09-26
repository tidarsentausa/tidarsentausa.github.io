# Tidar Sentausa

**SEO Manager · Digital Project Manager · SEO Strategist**
Kuala Lumpur, Malaysia · [tidar.sentausa@gmail.com](mailto:tidar.sentausa@gmail.com) · [+60 16 226 5070](tel:+60162265070)

[LinkedIn](https://linkedin.com/in/tidar-sentausa) · [GitHub](https://github.com/tidarsentausa)

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

## Languages

Indonesian (native), English (fluent).

---

## About this site

This is my résumé, built to be read rather than skimmed. Static React and Vite,
styled in a neobrutalist system — sharp corners, hard borders, offset shadows,
monospace throughout. The decorative terminal below the content retypes an
analytics script on a loop; it illustrates the tooling work above, it isn't a
portfolio piece.

All copy and content live in [`src/data.ts`](src/data.ts) — that's the file to
edit for anything you'd read on the page. Layout is in
[`App.tsx`](src/App.tsx), the design system in [`app.css`](src/app.css).

```bash
npm install
npm run dev       # local dev server
npm run build     # production build into dist/
npm run preview   # serve the build locally
```

Pushes to `main` deploy to GitHub Pages. Built on
[performative-ui](https://github.com/vorpus/performativeUI) for the logo
marquee and a few other components, consumed as an ordinary npm dependency.

Most tool logos load as SVGs from the simple-icons CDN. Ahrefs, Screaming Frog,
and Microsoft Clarity are self-hosted in `public/` because simple-icons doesn't
carry them; if the CDN changes, the rest will 404 silently. `Moz` resolves to
the Mozilla mark, as simple-icons has no Moz entry.
