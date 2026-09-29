import { ChevronDown, ExternalLink, MapPin } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/ui/accordion";
import { Badge } from "@/ui/badge";
import { roles, type Role } from "../data";

/* A role whose period ends in "Present" is the current one, and it gets a
   badge. Derived from the data rather than hardcoded to index 0, so
   reordering `roles` in data.ts can never leave the marker on the wrong job. */
function isCurrent(role: Role) {
  return /present/i.test(role.period);
}

/* Experience, as a collapsible list.

   Every role starts closed, so the section is scannable rather than a wall: a
   recruiter reads company and title off the collapsed headers and opens only
   what interests them.

   The timeline spine is gone along with the expand. A vertical rail only
   makes sense when every entry is open and evenly spaced; against arbitrary
   heights with most rows shut it would be a broken ruler. The period moves
   into the trigger instead, where it is still visible when collapsed — which
   is the information that actually decides whether a row is worth opening.

   `type="single" collapsible` rather than `multiple`: this is a CV, and one
   row open at a time stops the page jumping several thousand pixels as a
   visitor works down the list. */
export default function Experience() {
  return (
    <section
      id="experience"
      className="section band-paper border-t-3 border-foreground"
      data-pattern="grid-lg"
    >
      <div className="shell">
        <p className="eyebrow">Experience</p>
        <h2 className="display mt-4 text-3xl font-bold uppercase md:text-5xl">
          Where I&apos;ve worked
        </h2>

        {/* BoldKit's AccordionItem draws its own stacked borders
            (`border-b-0 last:border-b-3`) for items flush against each other.
            These are separated by a gap instead, so every item opts back into
            a full border; the arbitrary variant is what cancels the library's
            `last:` rule, which would otherwise leave the final row borderless.

            `timeline-rail` draws the vertical rule down the left (see app.css).
            The pl-12 is its gutter — rail plus marker plus air — so the cards
            sit clear of it instead of on top of it. */}
        <Accordion
          type="single"
          collapsible
          className="timeline-rail mt-12 flex flex-col gap-4 pl-12 [&>*:last-child]:border-b-3"
        >
          {roles.map((role) => {
            const current = isCurrent(role);

            return (
              <AccordionItem
                key={`${role.company}-${role.period}`}
                value={`${role.company}-${role.period}`}
                className="relative border-3"
              >
                {/* The marker on the rail.

                    Positioned rather than laid out: it sits in the list's
                    left gutter (-left-12 puts it back over the pl-12 padding),
                    so the card's own box and its border are untouched and the
                    rail reads as passing behind.

                    `top-3.5` lines it up with the first line of the trigger,
                    which carries py-4 — so the text starts 16px down and a
                    32px marker centred on that line needs ~18px more. It is the
                    one value here tuned rather than derived, and it is tuned
                    against the trigger's padding.

                    `aria-hidden` because it is purely the visual marker — the
                    role is already the trigger's own text, and a stray empty
                    node in the accessibility tree is noise. The current-role
                    marker is filled rather than outlined, and the word
                    "Current" beside it carries the same fact in text. */}
                <span
                  aria-hidden="true"
                  className={`timeline-dot absolute -left-12 top-3.5 ${
                    current ? "timeline-dot--current" : ""
                  }`}
                />
                {/* Stacks on a phone, side by side from md up.

                    The period is a 116px unbreakable block. Beside the title on
                    a 250px row it left the text column about 94px, which
                    wrapped "Cheil Worldwide, Samsung B2C" onto four lines and
                    pushed the trigger past 200px tall — the section read as a
                    stack of slabs rather than a list of jobs. Dropping it to
                    its own line under md gives the title the full width, and
                    there is room to spare for it there. */}
                {/* The chevron rotation is a descendant selector, because Radix
                    puts data-state on the trigger and not on the icon, so a
                    data-state variant written on the icon never matches.

                    The value is a raw `transform: rotate(180deg)` rather than
                    Tailwind's `rotate-180`, which compiles to the standalone
                    CSS `rotate` property. The two are equivalent in every real
                    browser; the older spelling is used because the headless
                    browser used to verify this build ignores `rotate` values
                    outright — even an inline `style.rotate` — and computes them
                    as 0deg, which makes the rotation impossible to confirm
                    here. Worth an eyeball in a real browser. */}
                <AccordionTrigger className="flex-col items-stretch gap-2.5 md:flex-row md:items-center md:gap-4 [&[data-state=open]_svg]:[transform:rotate(180deg)]">
                  <span className="flex min-w-0 flex-col items-start gap-1 text-left">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="display text-lg font-bold uppercase md:text-xl">
                        {role.company}
                      </span>
                      {current && <Badge>Current</Badge>}
                    </span>

                    <span className="text-sm font-bold text-muted-foreground">
                      {role.title}
                    </span>

                    {role.location && (
                      <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin className="size-4 shrink-0" aria-hidden="true" />
                        {role.location}
                      </span>
                    )}
                  </span>

                  {/* The period sits outside the collapsible content so it
                      stays visible when the row is shut — it is what a visitor
                      scans to decide whether to open a row at all. */}
                  <span className="flex items-center justify-between gap-3 md:ml-auto md:justify-end">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {role.period}
                    </span>
                    {/* The rotation is a descendant selector on the trigger
                        (see the className above) rather than a data-state
                        variant here: Radix puts data-state on the trigger, not
                        on the icon, so `data-[state=open]:` on this element
                        would never match. */}
                    <ChevronDown
                      className="h-5 w-5 shrink-0 stroke-[3] transition-transform duration-200"
                      aria-hidden="true"
                    />
                  </span>
                </AccordionTrigger>

                <AccordionContent>
                  {/* `text-pretty` on the description and the bullets.

                     `pretty` is the CSS property for exactly the problem the
                     bullets had: it stops a line ending on a single short word
                     — "over", "to", "of" — by pulling it down to the previous
                     line and accepting the looser rag. `balance` is the
                     alternative but it only applies up to a limited number of
                     lines (browsers cap it at around six), and these
                     descriptions run to five or six, so past the cap it does
                     nothing and the orphan returns. `pretty` has no such cap.

                     Both are progressive enhancements: a browser without
                     `text-wrap: pretty` simply wraps normally, which is what
                     this looked like before.

                     `text-wrap: pretty` is the preferred spelling of the
                     `text-wrap-style: pretty` it replaces; both are honoured
                     where only one is implemented, so both are declared. */}
                  <p className="text-pretty leading-relaxed">{role.blurb}</p>

                  <ul className="mt-5 space-y-2.5">
                    {role.highlights.map((h) => (
                      <li key={h} className="flex gap-3 text-pretty leading-relaxed">
                        {/* Decorative — the list semantics already carry the
                            structure, so the bullet is hidden from AT. */}
                        <span
                          aria-hidden="true"
                          className="mt-2 size-2.5 shrink-0 border-2 border-foreground bg-accent"
                        />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {role.url && (
                    <a
                      href={role.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="mt-6 inline-flex items-center gap-1.5 font-bold underline decoration-4 underline-offset-4 hover:bg-accent"
                    >
                      {role.company}
                      <ExternalLink className="size-4" aria-hidden="true" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  )}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </section>
  );
}
