import { useEffect, useRef, useState } from "react";

/* Counts a number up when it scrolls into view.

   Two things this deliberately does not do:

   It does not start on mount. The hero stats are above the fold, so an
   intersection observer fires almost immediately and the count would run
   before the visitor has read the label — the animation would finish before
   it registered as an animation. The observer is the honest trigger: the
   number counts when the number becomes visible.

   It does not run at all under `prefers-reduced-motion`. A count-up is
   exactly the kind of decorative motion that setting exists to suppress, and
   the final value is the only thing carrying information. When motion is
   reduced the hook returns the target immediately rather than animating to
   it, so the number is correct from the first frame.

   The rAF loop cancels itself on unmount and on a second trigger, so a fast
   scroll past several stats does not leave several loops running. */
export function useCountUp(target: number, durationMs = 1400) {
  const ref = useRef<HTMLSpanElement>(null);
  // Starts at the target, not at zero. The count-up is an enhancement layered
  // on top of a number that must already be correct: if the observer never
  // fires, rAF is throttled (background tab, some embedded webviews), or JS
  // is slow, the honest result is the real figure — not a row of zeros that
  // quietly understates the CV. The animation is the treat, not the message.
  const [value, setValue] = useState(target);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) return;

    let frame = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;

        observer.disconnect();
        setValue(0);

        const start = performance.now();

        const tick = (now: number) => {
          const elapsed = now - start;
          // Linear ramp, not eased: an eased count makes the last digits crawl
          // and then snap, which reads as a glitch rather than a finish.
          const progress = Math.min(1, elapsed / durationMs);
          setValue(Math.round(target * progress));

          if (progress < 1) {
            frame = requestAnimationFrame(tick);
          }
        };

        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, durationMs]);

  return { ref, value };
}
