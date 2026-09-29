import { useEffect, useState } from "react";
import { ArrowUp, Moon, Sun } from "lucide-react";

const STORAGE_KEY = "tidar-theme";

type Theme = "light" | "dark";

/* Writes the theme to the document and remembers it.

   Module-level rather than inside a component so the toggle and anything else
   that needs to change the theme share one implementation, with no context
   provider and no prop threading for a value that has exactly one writer.

   The two attributes are not redundant: `.dark` is what the theme's selectors
   match on, and `data-theme` is the same state as a queryable attribute —
   which is what the inline script in index.html reads and writes, before React
   exists. Both are set here so the two can never disagree.

   Storage is wrapped because it throws in Safari private mode and in sandboxed
   iframes. Failing to *remember* the preference is acceptable; letting the
   throw escape would take the click handler with it and leave the button
   inert. */
function applyTheme(next: Theme) {
  const root = document.documentElement;
  root.dataset.theme = next;
  root.classList.toggle("dark", next === "dark");

  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* Theme applies for this page view; it just will not persist. */
  }
}

/* What is on right now, read from the DOM.

   Not from state: the inline script in index.html sets the theme before the
   first paint and React mounts after that. A hook initialised to "light" would
   render the wrong glyph on an already-dark page and correct itself a frame
   later. */
function readTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(readTheme);

  /* Mirror the DOM into state, so the glyph stays right if the theme changes
     from anywhere other than this button — an OS-level flip to dark while the
     tab sits in the background being the realistic case. */
  useEffect(() => {
    const observer = new MutationObserver(() => setTheme(readTheme()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => {
        applyTheme(next);
        setTheme(next);
      }}
      className="float-btn"
      /* Named for the action, not the state. A screen reader user deciding
         whether to press this needs to know what pressing it will do — "switch
         to light theme" — not "dark mode", which describes what is already on.
         The glyph is decorative and hidden: "☀" read aloud is noise, and both
         states would otherwise be announced as a bare symbol. */
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
    >
      {theme === "dark" ? (
        <Sun className="size-6" aria-hidden="true" />
      ) : (
        <Moon className="size-6" aria-hidden="true" />
      )}
    </button>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      /* Some way down, not an arbitrary pixel count. The control exists to
         undo a scroll, and at the top of the page there is nothing to undo —
         showing it there would be a button that does nothing. 0.6 of a
         viewport is roughly where a visitor decides they have seen enough,
         which puts it in view a little before the very bottom. */
      setVisible(window.scrollY > window.innerHeight * 0.6);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href="#top"
      /* An anchor, not a scrollTo call. It works before React hydrates, it is
         announced as a link rather than as an unlabelled button, and the
         browser's own scroll handles the reduced-motion preference — a
         scripted scrollIntoView would have to reimplement that. */
      className={`float-btn ${visible ? "" : "float-btn--hidden"}`}
      aria-label="Back to top"
      title="Back to top"
      /* Out of the tab order while hidden. `.float-btn--hidden` already sets
         `visibility: hidden`, which removes it from focus; tabIndex makes the
         intent explicit and survives any future change to that rule. */
      tabIndex={visible ? undefined : -1}
      aria-hidden={visible ? undefined : true}
    >
      <ArrowUp className="size-6" aria-hidden="true" />
    </a>
  );
}

/* The floating pair: a theme switch stacked above a back-to-top, bottom right.

   This follows the BoldKit blog template's floating control — a 56px button
   with a hard border and offset shadow at `bottom-6 right-6`, matched here in
   `.float-btn`. The styling lives in one CSS class rather than on each button
   so the two are guaranteed identical.

   What is NOT copied is the template's full-screen transition overlay: a
   `fixed inset-0 z-[100] bg-foreground` div that fades in and out around the
   swap. That is the screen flash. It is a deliberate wipe, meant to be seen as
   a hard cut, but on a content site it reads as the page blinking, and on a
   slow machine it becomes a long dark wash over text somebody is reading. The
   swap here is instant and silent, which is what a preference toggle should
   be.

   DOM order is theme first, then back-to-top, matching the visual stack and
   the keyboard order: the global preference, then the navigation. */
export default function FloatingControls() {
  return (
    <div className="float-stack">
      <ThemeToggle />
      <BackToTop />
    </div>
  );
}
