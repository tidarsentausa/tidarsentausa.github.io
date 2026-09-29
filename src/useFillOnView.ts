import { useEffect, useRef, useState } from "react";

/* Fills a progress bar when it scrolls into view.

   A bar that renders at its final value from first paint tells the visitor
   nothing — they cannot tell whether they are looking at a loaded state or an
   empty one, and the section reads as static furniture. Filling on approach
   makes it arrive.

   WHY THIS USED TO LOOK BROKEN

   The first version started at the target and *rewound* to zero when the
   observer fired, then filled back up. That rewind was a safety net against
   environments where the observer never fires — a bar frozen at zero
   understates a skill, which is worse than a bar that never animates.

   But the rewind is what killed it. The bar was already full, so the only
   distance the transition had to cover was full -> empty -> full, and with
   `steps(10, end)` on the indicator that whole round trip resolved inside a
   few frames. The bar snapped to full with no perceptible fill. The animation
   existed in the code and was invisible on screen, which is worse than not
   having it, because from the outside it looks deliberate.

   So the bar now starts EMPTY and fills forward.

   THE FALLBACK, AND WHY A TIMER IS THE WRONG SHAPE FOR IT

   The first attempt at the safety net was a plain `setTimeout(fill, 2500)`
   from mount. It works, and it is wrong: the timer starts when the component
   mounts, not when the bar is reachable, so by the time a visitor scrolls to
   Skills the bars are already full and the fill has played out against a
   section 3000px above them. Verified here — Skills sits at y=3025 in a
   5891px document, and the bars were at their target while still below the
   fold. The animation was not broken, it was simply over before anyone could
   see it, which from the visitor's side is identical to it not working.

   A timer can only be correct if the section is above the fold on arrival,
   which is true of the hero and false of everything below it. So the delay
   scales with how far down the page the bar actually is: the further the
   section sits, the longer the wait, because a reader who is going to reach a
   section 5000px down has demonstrably not rushed.

   That is a heuristic and not a guarantee — a fast reader on a short viewport
   can still outrun it. It is the right shape for the failure it covers,
   though: the timer only has to save the case where the observer is entirely
   dead, and a delay that is occasionally too long is a far better outcome
   than the flat 2500ms, which was always too short.

   Idempotent: once filled, the observer disconnects, so scrolling back up does
   not replay it. A bar that empties and refills every time it crosses the
   viewport is worse than one that never animated. */
export function useFillOnView(target: number, threshold = 0.45) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    /* Reduced motion returns the final value and never animates, which is the
       correct reading of the setting: the value is the information, the fill
       is decoration. */
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      setShown(target);
      return;
    }

    let cancelled = false;
    let done = false;

    const fill = () => {
      if (cancelled || done) return;
      done = true;
      observer.disconnect();
      setShown(target);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        fill();
      },
      { threshold },
    );

    observer.observe(node);

    /* The safety net, for observers that never call back.

       Verified necessary rather than theoretical: in the headless browser
       used to check this build, an IntersectionObserver on a progress bar
       never delivers a callback — and neither does requestAnimationFrame. A
       hook that trusted the observer exclusively would leave five empty bars
       on a page that renders correctly everywhere else.

       The delay comes from how far the section actually sits below the fold,
       not a flat number, and the constant is 1ms per pixel. The reasoning is
       that a reader has to scroll that distance to reach the section at all,
       so a millisecond per pixel is a deliberately slow scroll rate: slow
       enough that anyone genuinely travelling to the section beats the timer,
       which is the only race that matters. Erring long costs nothing — the
       worst case is a bar that fills a moment late for a reader who never
       scrolls — whereas erring short spends the animation off screen, which
       is the bug this exists to prevent.

       Measured on this page: Skills sits 2456px below the fold in a 569px
       viewport, so the fallback lands at ~3.5s. An earlier version divided by
       12 instead, which put it at 1.1s — barely better than the flat 2500ms
       it replaced, and still early enough to miss a reader. The scale has to
       be roughly 1:1 with the scroll distance to mean anything.

       A 1s floor covers a bar already in the first screenful, where waiting
       longer than that would just look broken.

       Re-read on resize, so a bar is not scheduled against a stale position
       if the layout settles after first paint. */
    const delay = () => {
      const belowFold = node.getBoundingClientRect().top - window.innerHeight;
      return Math.max(1000, 1000 + belowFold);
    };

    let fallback = window.setTimeout(fill, delay());
    const onResize = () => {
      if (done) return;
      window.clearTimeout(fallback);
      fallback = window.setTimeout(fill, delay());
    };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      cancelled = true;
      window.clearTimeout(fallback);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
    };
  }, [target, threshold]);

  return { ref, value: shown };
}
