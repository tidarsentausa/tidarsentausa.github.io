import { useCallback, useEffect, useState } from "react";

/* The two themes, and the one piece of state that decides between them.

   The attribute is `data-theme` on <html> for two reasons. The library already
   ships a `[data-theme=light]` token block, so using its name means the
   performative-ui components we do not override (the IDE's own chrome, the
   spinners) follow the page instead of staying stuck on their dark defaults.
   And a CSS attribute selector re-derives every token on toggle with no React
   render, so the repaint is one style recalculation rather than a re-render of
   seven role cards and the marquee.

   Why "light" is the default rather than the system preference: this is a
   printed-document design — cream paper, hard ink, a graph-paper grid — and it
   was built and art-directed in that palette. Honoring a dark OS preference
   here would ship a theme nobody has looked at to a first-time visitor. So the
   stored choice wins, and absent one the page stays light. The system
   preference is still worth reading for the toggle's INITIAL icon, so a visitor
   who has dark set sees a moon rather than a sun, but it does not move the
   page on them.

   Both the stored key and the attribute are single-sourced here so the
   pre-paint script in index.html and this module cannot disagree about the
   spelling. That script is what prevents the flash: React cannot set the
   attribute early enough, so without it a returning dark-mode visitor sees a
   cream page for one frame before it corrects. */

export type Theme = "light" | "dark";

/** The localStorage key. Also hardcoded in the pre-paint script in index.html. */
export const THEME_KEY = "tidar-theme";

/**
 * Read the stored choice, ignoring anything that is not a theme name.
 *
 * localStorage is not merely a string store that the app wrote to: it is
 * writable by any script on the origin, it survives site edits, and it throws
 * outright in Safari private mode and in sandboxed iframes. Every one of those
 * is a way to end up with a value that is null, absent, or not one of the two
 * names, and each is handled by falling through to the default rather than
 * being allowed to set data-theme to something with no rules attached.
 */
function storedTheme(): Theme | null {
  try {
    const value = window.localStorage.getItem(THEME_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

function systemTheme(): Theme {
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function useTheme() {
  /* Initialized from the DOM rather than recomputed here. The pre-paint script
     has already set the attribute by the time this module runs, so reading it
     back is how React agrees with what is on screen — and it means a returning
     dark-mode visitor never renders one frame of light first, which is the
     entire reason that script exists.

     The read is defensive for the same reason as storedTheme: a hand-edited
     document, or the pre-paint script failing on a localStorage throw, can
     leave the attribute absent. */
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.dataset.theme === "dark" ? "dark" : "light",
  );

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      try {
        window.localStorage.setItem(THEME_KEY, next);
      } catch {
        /* Nothing to do. The attribute is already set, so the toggle still
           works for this visit; it just will not be remembered. A failed write
           is not worth interrupting the click for. */
      }
      return next;
    });
  }, []);

  /* Keep the UA's idea of the page in step with the attribute, so the scrollbar
     gutter, the caret and any UA-rendered control follow the theme rather than
     the color-scheme declared in the stylesheet's static :root.

     This is only needed while the visitor has NOT chosen for themselves: once
     they toggle, the stored value takes over and the OS preference is no
     longer consulted, so changing it at the OS level must not yank the page
     out from under them. */
  useEffect(() => {
    if (storedTheme()) return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => {
      const next: Theme = e.matches ? "dark" : "light";
      document.documentElement.dataset.theme = next;
      setTheme(next);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return { theme, toggle };
}
