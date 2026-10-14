import { useState } from "react";
import Contact from "./sections/Contact";
import Experience from "./sections/Experience";
import FloatingControls from "./sections/FloatingControls";
import Footer from "./sections/Footer";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import ToolRail from "./sections/ToolRail";
import Toolkit from "./sections/Toolkit";
import "./app.css";

/* Section links for the sticky header.

   Kept as one array so the nav and the smooth-scroll offset can never point
   at different ids — a stale anchor here is a nav link that silently does
   nothing, which is the one bug on a one-page site nobody can miss.

   Experience is deliberately absent. It is the first section below the hero
   and the hero already ends with a "See the work" button pointing straight at
   it, so a link to it in the header duplicated a call to action already
   placed directly in the reader's eye — and it was the only one of the five
   that led somewhere you were already going. The nav is now the sections a
   reader has to be told exist, which is what it is for.

   The fifth link reads "Background" rather than "Toolkit". The tool marquee
   moved out of that section and up under the hero, so the section that
   `#toolkit` points at now holds only languages and education; labelling it
   "Toolkit" sent you to a page with no tools on it. */
const NAV = [
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#toolkit", label: "Background" },
  { href: "#contact", label: "Contact" },
] as const;

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div id="top" className="min-h-screen bg-background">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:border-3 focus:border-foreground focus:bg-accent focus:px-4 focus:py-2 focus:font-bold focus:uppercase"
      >
        Skip to content
      </a>

      {/* `band-accent` — the theme's orange.

         The header was `bg-background`, the same paper as the hero directly
         beneath it. A sticky bar in the same colour as the content it sits on
         has no edge: on scroll the hero's fill and the nav's are identical, so
         the bar stops reading as a bar and the section boundary under it
         vanishes.

         Orange is the strongest available contrast against paper, and paper is
         what fills the top of the page. It does repeat — Skills is also
         orange — but the header only ever overlaps the *top* of the viewport,
         and Skills is the fourth section down, so the two are never actually
         adjacent; where they do briefly meet there is a 3px border between
         them. A colour that comes back once every few screens is a rhythm
         rather than a clash.

         No `band-ink-light` here. That class exists for the dark bands, and
         orange is a *light* fill — inverting it put the nav links at 2.04:1,
         measured, which is the worst of any option. Left on the theme's
         near-black they are 7.9:1. The rule the ink classes actually encode is
         "does this fill need inverting", and orange does not. */}
      <header className="band-accent sticky top-0 z-40 border-b-3 border-foreground">
        <div className="shell flex items-center py-2.5">
          <a
            href="#top"
            className="text-sm font-bold uppercase tracking-wide underline-offset-4 hover:underline md:hidden"
          >
            Tidar Sentausa
          </a>
          {/* Desktop nav: horizontal row, right-aligned. Hidden below md,
              where the hamburger takes over so the sticky bar stays one line
              tall instead of wrapping to 111px. */}
          <nav
            aria-label="Sections"
            className="ml-auto hidden min-w-0 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] md:block [&::-webkit-scrollbar]:hidden"
          >
            <ul className="flex items-center gap-5 whitespace-nowrap">
              {NAV.map(({ href, label }) => (
                <li key={href}>
                  {/* py-2.5 takes the hit area to 40px. The text is 17px tall
                      on its own, which is under the 44px touch target guidance
                      and genuinely hard to hit on a phone — the header is the
                      one place on this page a visitor aims at while scrolling. */}
                  <a
                    href={href}
                    className="inline-block py-2.5 text-sm font-bold uppercase tracking-wide underline-offset-4 hover:underline"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          {/* Mobile hamburger: a classic three-stripe icon in a bordered
              square, matching the neubrutalist buttons. Three plain spans
              rather than a lucide icon so the glyph is exactly three bars
              whatever the icon set ships. Toggles the dropdown below. */}
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
            className="ml-auto flex h-11 w-11 flex-col items-center justify-center gap-[5px] border-3 border-foreground bg-background text-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] transition-transform duration-200 ease-out active:translate-x-[4px] active:translate-y-[4px] active:shadow-none md:hidden"
          >
            <span aria-hidden="true" className="block h-[3px] w-6 bg-current" />
            <span aria-hidden="true" className="block h-[3px] w-6 bg-current" />
            <span aria-hidden="true" className="block h-[3px] w-6 bg-current" />
          </button>
        </div>
        {/* Mobile dropdown panel. Absolute so opening it never grows the
            sticky bar itself; bordered top + hard shadow to read as part of
            the header. `md:hidden` so a resized-open menu can't linger on
            desktop. Links close the menu on activation. */}
        {menuOpen && (
          <nav
            id="mobile-nav"
            aria-label="Sections"
            className="absolute inset-x-0 top-full border-b-3 border-foreground bg-background text-foreground shadow-[0_4px_0_0_hsl(var(--shadow-color))] md:hidden"
          >
            <ul className="shell flex flex-col py-2">
              {NAV.map(({ href, label }) => (
                <li key={href} className="border-b-2 border-foreground/10 last:border-b-0">
                  <a
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-3 text-base font-bold uppercase tracking-wide underline-offset-4 hover:underline"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>

      <main id="main">
        <Hero />

        {/* The tool stack, directly under the hero. */}
        <ToolRail />

        {/* Each section carries its own flat colour band, separated by a hard
            3px border. Alternating paper / colour / paper down the page means
            the boundary is legible while scrolling rather than only where a
            heading happens to announce it. The classes are defined together
            in app.css so the palette can be retuned in one place. */}
        <Experience />
        <Projects />
        <Skills />
        <Toolkit />
        <Contact />
      </main>

      <Footer />

      {/* Last in the DOM, so it is the last thing in the tab order after the
          header and the page content. */}
      <FloatingControls />
    </div>
  );
}
