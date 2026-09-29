import { ArrowDown, Mail } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { profile, stats } from "../data";
import { useCountUp } from "../useCountUp";

/* One stat, with its own count-up.

   Split out so each number owns its observer and its rAF loop. A single hook
   call in the parent driving four values cannot express "this one is on
   screen and that one isn't" — which is the whole reason for using an
   intersection observer rather than just running on mount. */
function Stat({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const { ref, value: shown } = useCountUp(value);

  return (
    /* `bk-lift` is the page's one hover, same as the buttons and contact
       tiles. The card is a `<div>` with no link in it, so this is purely
       decorative feedback — it signals "this is a number worth reading"
       rather than promising an action, which is why it does not also change
       cursor or gain a focus ring. */
    <div className="bk-lift border-3 border-foreground bg-card p-5 shadow-[4px_4px_0px_hsl(var(--shadow-color))]">
      {/* The label is the accessible name for the number; without it a screen
          reader would announce "10,000" with nothing to attach it to. */}
      <dt className="sr-only">{label}</dt>
      <dd>
        <span ref={ref} className="stat-value block">
          {/* Deliberately not aria-live: this text changes ~60 times a second
              and announcing each change would flood a screen reader. The final
              value is what carries information, and it lands as plain text. */}
          {shown.toLocaleString("en-US")}
          <span className="text-primary" aria-hidden="true">
            {suffix}
          </span>
        </span>
        {/* Visible restatement of the sr-only label above, so it is decorative. */}
        <span
          aria-hidden="true"
          className="mt-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground"
        >
          {label}
        </span>
      </dd>
    </div>
  );
}

/* The hero.

   One job: say who this is and what they do, then offer the two things a
   visitor actually came for — email, or the CV. Everything else on the page
   is evidence for those two claims.

   `band-paper` — the theme's own default light background — rather than a
   saturated colour. Cherry red and deep green were both tried here and both
   read as "the theme picked a colour for the hero" rather than as the page
   opening; a neutral lets the name and the portrait carry the top of the page,
   which is what a hero is for.

   It still needs to be a *named band* rather than a bare `bg-background`. The
   difference is not the colour — they are the same token — it is that the
   section participates in the band's system, so the sticky header's paper
   reads as a bar sitting on the page rather than as the page's own top edge
   being the nav. The other sections each take a colour; the hero and
   Experience share paper, which is deliberate: they are the two ends of the
   page's argument and they are the two that do not need to shout.

   No `band-ink-light`, so the type stays the theme's near-black at 16.1:1. */
export default function Hero() {
  return (
    <header className="band-paper border-b-3 border-foreground" data-pattern="dots">
      <div className="shell py-16 md:py-24">
        {/* The layout.

            `order-2` on the text block and `order-1` on the portrait puts the
            picture first on a phone. It used to come after, so a visitor landed
            on a wall of prose before seeing whose site this was — the name is
            the first thing worth knowing, and the portrait is the second. On a
            375px screen the two cannot sit side by side at any useful size, so
            the choice is which one leads, and the picture wins. The md:
            variants restore source order above the breakpoint, where the grid
            puts the portrait in the second column.

            `md:items-center` vertically centres the portrait against the text
            block. It was `items-start`, which pinned both to the same top edge
            regardless of height: a 224px photo beside 432px of copy hung off
            the top with 208px of dead space beneath it, and read as
            misaligned rather than as a deliberate top alignment. Centring puts
            the photo's middle against the copy's middle, which is what a
            portrait column wants.

            The column is `minmax(0,1fr)` and the portrait is pushed to the end
            with `justify-self-end`. The gap is then whatever the grid gap says,
            and nothing else.

            Getting here took three arrangements, all measured:

            `1fr` with the summary capped at `max-w-2xl` — the column took all
            888px of slack but the text inside it only filled 672px, so the
            slack collected *after* the text: ~216px of gap.

            Capping the column at `26rem` — fixed that side, broke the other.
            The second column is `auto` and the portrait is 224px, so `auto`
            resolved against the remaining space and left 448px of dead black
            to the right of the photo. The hero read lopsided the other way.

            `justify-between` on top of a capped column — pushed the photo to
            the row edge correctly, but the text was then pinned at 512px
            inside a 1216px shell, so 416px of empty space sat between the
            summary and the photo at every width above 1280. Wide gaps, not
            tight ones.

            The actual answer is that the *text has to fill its column*. A
            capped paragraph inside an uncapped column is what produced every
            one of those gaps; the fix is to let the column take the slack and
            let the paragraph be as wide as that column is. `max-w-2xl` comes
            off the summary, and the line length is governed by the column
            instead — which is the same constraint, expressed on the element
            that actually owns the width. `justify-self-end` then places the
            portrait at the grid's right edge, level with the stat row below.

            The portrait is placed with `md:justify-self-end`.

            `justify-self-end` is md-only, and deliberately. It was
            unconditioned, which meant the 160px avatar on a 375px screen was
            pushed to the right edge of its 335px column — a small square
            floating alone against the far edge, with 175px of nothing to its
            left and no relationship to the name below it. On a stacked layout
            the photo belongs to the left margin, where the text starts and
            where the eye enters the block. On a two-column layout it belongs
            at the far right, level with the stat row below.

            So the two cases want opposite alignment, and the breakpoint is
            exactly where the layout changes shape.
        */}
        <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:gap-10 lg:gap-16">
          <div className="order-2 md:order-1">
            <Badge variant="success">Open to work</Badge>

            <h1 className="display-xl mt-6">
              {profile.name}
            </h1>

            <p className="display mt-4 text-lg font-bold uppercase tracking-wide md:text-2xl">
              {profile.roles.join(" · ")}
            </p>

            {/* Back to `text-muted-foreground`.

               It was `band-sub` for as long as the hero was a saturated
               band, because --muted-foreground is a dark grey meant for light
               backgrounds and was invisible on red. The hero is paper again,
               so the token is correct here and `band-sub` would only be
               applying a 0.72 alpha for no reason. */}
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              {profile.summary}
            </p>

            {/* No `animation="pop"` here or on the footer's email button.

                That variant adds `hover:animate-[brutal-pop]` and
                `active:scale-95` on top of the library's own translate-and-
                drop-shadow hover. The two fight: the keyframe animation
                animates `transform` while the hover utility animates
                `translate` and `box-shadow`, so on hover the button scaled up
                and slid at once and the shadow snapped off separately. That
                split-timing is the jank — it read as a wobble rather than a
                press. The static press is the house style and now lives in
                one place (.bk-lift), so these two buttons match the contact
                tiles and each other. */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg" className="bk-lift">
                <a href={`mailto:${profile.email}`}>
                  <Mail aria-hidden="true" />
                  Get in touch
                </a>
              </Button>

              <Button asChild variant="outline" size="lg" className="bk-lift">
                <a href="#experience">
                  <ArrowDown aria-hidden="true" />
                  See the work
                </a>
              </Button>
            </div>
          </div>

          {/* The portrait, as a plain card.

              There is no offset slab behind it any more. The yellow rectangle
              existed to fake a second stacked card, and it fought the theme: on
              hover the photo slid off it, leaving a bare orange block exposed,
              which read as a rendering fault rather than a hover. With cherry's
              deep red primary and orange accent, a saturated slab behind a
              photograph is also just loud. The hard border and the offset
              shadow are enough — that is the neubrutalist signature on its
              own.

              The hover is the same `.bk-lift` every other raised element uses,
              so the photo presses like a button instead of doing the library
              Avatar's own thing. That default has to be cancelled explicitly:
              Avatar ships with `hover:translate-x-[4px] hover:translate-y-[4px]
              hover:shadow-none`, which is badge-identical on a bare avatar but
              meaningless here, since there is no slab for it to slide off and
              its `transition duration-200` would fight the shared rule's own
              timing. `bk-lift` is listed after those so it wins. */}
          <Avatar className="relative order-1 aspect-square h-auto w-40 shrink-0 border-3 border-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] bk-lift md:order-2 md:w-56 md:justify-self-end">
            <AvatarImage src="/tidar-avatar.jpg" alt="" />
            {/* Initials, not a name: the h1 directly above already names the
                person, so repeating it here would be read twice. */}
            <AvatarFallback className="display text-4xl font-bold">
              TS
            </AvatarFallback>
          </Avatar>
        </div>

        {/* The headline numbers, kept in the hero because they are the
            summary — the rest of the page is the evidence. */}
        <dl className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s) => (
            <Stat key={s.label} {...s} />
          ))}
        </dl>
      </div>
    </header>
  );
}
