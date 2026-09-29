import { Halftone } from "@/ui/canvas-effects/Halftone";
import { profile } from "../data";

/* The name, set as large as the viewport allows and allowed to run off both
   sides.

   This is the only element left in the footer, and it is sized to the space
   rather than placed in it: `text-[19vw]` is deliberately wider than any
   viewport, so on a desktop the two words overflow the screen and are clipped
   by the footer's own `overflow-hidden`. That is the point — a name that bleeds
   off both edges reads as a poster rather than as a caption, and it means the
   mark is the same physical size relative to the screen on every device
   instead of reflowing into a tidy two lines on a phone.

   The negative left margin pulls the first word back under the left edge so
   the overflow is symmetric; without it the text is centred as a block and
   only clips on the right.

   `aria-hidden`: the name is the document's h1, stated in the hero. A second
   copy in the accessibility tree is a repeat, not a heading.

   `select-none` so dragging across the footer does not start a text
   selection over what is decoration. */
function NameBleed() {
  return (
    <p
      aria-hidden="true"
      className="display pointer-events-none absolute inset-x-0 bottom-0 -ml-[6vw] select-none whitespace-nowrap text-center text-[19vw] leading-[0.72] font-bold tracking-tighter text-background/10"
    >
      {profile.name}
    </p>
  );
}

/* The halftone field.

   Now the footer's primary content rather than a band above a card, so it gets
   the whole area: `h-[26rem]` on desktop, half that on a phone. That size is
   the point of the move — the CTA left the footer, and the space it was
   occupying (plus the padding that cleared it) is what the pointer effect
   needed. At the old 384px the spotlight had a strip to move through; at
   416px+ it has a field.

   The effect tracks the pointer itself: moving the cursor brightens the dots
   around it and pushes the pattern outward, like a lamp held over a
   halftone screen. That needs the canvas to receive pointer events, so there
   is deliberately no `pointer-events-none` here — an earlier version had it,
   added to stop the band swallowing clicks, and it silently killed the one
   thing the effect is for. There is no longer any content layered over the
   canvas for it to swallow clicks from.

   The gradient is the one exception. It is a full-bleed overlay fading the dots
   into the black below, and it sits on top of the canvas, so it is the first
   thing a pointer meets — it has to be transparent to input or the effect
   never sees a move.

   `aria-hidden` throughout: the canvas paints pixels and carries no text, and
   the contact details in the section above say everything it is here to
   suggest.

   `useCanvasEffect` pauses the loop when the element scrolls out of view, so an
   off-screen footer costs nothing, and it freezes on a single frame under
   `prefers-reduced-motion`. */
function HalftoneField() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden border-t-3 border-foreground"
    >
      <div className="h-[13rem] md:h-[26rem]">
        <Halftone
          /* Literal hex, not the theme's CSS variables: canvas 2D fillStyle
             cannot read a custom property, so the values are cherry's accent
             and foreground converted to hex by hand (#f39c12 / #1f1919). If
             the theme ever changes, these two need updating with it — they are
             the one place on the page that cannot follow a token
             automatically. */
          color="#1f1919"
          bgColor="#f39c12"
          gap={18}
          maxScale={0.7}
          speed={0.6}
          /* 14 gap-units is a ~250px radius on this grid, against the
             component's default of 5 (~90px). The default was tuned for a
             small decorative band; the footer is 416px tall and 1252px wide,
             and at 90px the spotlight was a coin-sized dimple you had to hunt
             for. At 14 the whole field lights up around the cursor and the
             effect is unmissable.

             The falloff is linear from the centre (`1 - d / reach`), so a
             wider radius also means a gentler gradient across it — which is
             what keeps a large pool from looking like a hard-edged circle. */
          reach={14}
        />
      </div>

      {/* Dissolves the dot field into the black below, so the transition is a
          fade rather than a hard horizontal cut. `pointer-events-none` for the
          reason above: it is painted over the canvas. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[13rem] bg-gradient-to-b from-transparent to-foreground md:h-[26rem]" />
    </div>
  );
}

export default function Footer() {
  return (
    /* `band-ink-light` rather than a name tied to a colour: the footer is
       filled with --foreground, and cherry's foreground is a very dark warm
       brown, so the same light-ink treatment the dark bands need applies
       here. Naming the class after the ink rather than the fill is what lets
       one rule serve several sections. */
    <footer className="band-ink-light relative isolate overflow-hidden bg-foreground">
      <HalftoneField />
      <NameBleed />

      {/* No spacer element, deliberately.

         The footer was 704px tall because of an empty
         `<div className="relative h-[44rem]" />` stacked after the field. It
         rendered fine and it held the height — and because it was in normal
         flow *after* the absolutely-positioned field, it painted on top of the
         canvas and swallowed every pointer event. Hit-testing anywhere in the
         upper 500px returned that div rather than the canvas, so the
         halftone's pointer tracking received nothing and the effect was dead.

         The height now comes from the canvas wrapper itself, which is the
         element that has to be there anyway. One box instead of two, and the
         pointer reaches the thing that is listening. */}
      <div className="pointer-events-none relative h-[30rem] md:h-[44rem]" />
    </footer>
  );
}
