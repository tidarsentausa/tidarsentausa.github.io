# tidarsentausa.github.io

Static résumé site for Tidar Sentausa, SEO Manager. React + Vite + TypeScript,
styled in a neobrutalist system (sharp corners, hard borders, offset shadows,
monospace throughout).

Live at **https://tidarsentausa.github.io**

## Stack

- React 19, Vite 6, TypeScript (strict)
- [performative-ui](https://github.com/vorpus/performativeUI) for the logo
  marquee and other components, consumed as a normal npm dependency

## Commands

```bash
npm install       # install dependencies
npm run dev       # local dev server
npm run build     # production build into dist/
npm run preview   # serve the production build locally
npx tsc -p tsconfig.json --noEmit   # typecheck
```

## Deploying

Pushes to `main` trigger `.github/workflows/deploy.yml`, which typechecks,
builds, and publishes `dist/` to GitHub Pages. First-time setup is one-time
only: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

## Layout

```
src/
  App.tsx      page composition, logo marquee, hover-label wiring
  data.ts      all résumé content and the tool list (edit copy here)
  app.css      the neobrutalist design system
public/        self-hosted logo assets
```

Copy and content changes belong in `data.ts`; layout and styling in
`App.tsx` and `app.css`.

## Notes on assets

Most tool logos load as SVGs from the simple-icons CDN. Three are self-hosted
in `public/` because simple-icons does not carry them: Ahrefs (the standalone
"a" mark, not the wordmark), Screaming Frog, and Microsoft Clarity. If the CDN
changes, those marks will 404 silently.

`Moz` resolves to the Mozilla mark, as simple-icons has no Moz entry.
