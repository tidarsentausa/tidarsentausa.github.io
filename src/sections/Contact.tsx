import { Link, Mail, MapPin } from "lucide-react";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Card } from "@/ui/card";
import { profile } from "../data";

/* One card, holding the pitch and every way to act on it.

   There is no longer a tile grid beneath it. The four tiles that used to sit
   here — email, phone, location, LinkedIn — put four contact methods at the
   same visual weight as the CTA directly above them, which made the section
   read as a list of equally-weighted options. It is not one: the copy asks
   for email, and the button offers it. The email tile restated the button and
   the phone tile restated a detail the email signature already carries.

   What is left inside the card is the pitch, the button, and the two pieces
   of supporting context that a reader wants before writing — where the work
   happens from, and where to verify the roles listed above. */

export default function Contact() {
  return (
    <section
      id="contact"
      className="section band-muted border-t-3 border-foreground"
      data-pattern="diagonal"
    >
      <div className="shell">
        <p className="eyebrow">Contact</p>
        <h2 className="display mt-4 text-3xl font-bold uppercase md:text-5xl">
          Get in touch
        </h2>

        {/* The pitch, before the addresses.

           This was the footer's only content. Moved up here because it is not
           a closing line — it is the argument for the contact section, and it
           belongs directly under the heading that section is named for. In the
           footer it was a full-width orange card hanging below four contact
           tiles, asking for the email that the tile two lines above already
           offers.

           It keeps the orange accent, which on this grey band is the strongest
           contrast available and reads as a deliberate call to action rather
           than as another band. `text-foreground` is stated because the section
           is `band-muted`, not `band-ink-light`, so it does not inherit the
           light ink that would make black-on-orange impossible. */}
        {/* No `bk-lift` on the card itself.

           The card is a container, not a control. Pressing it told you
           nothing and moved a large block of text on hover, which made the
           section feel like it was loading. Only the two actual affordances
           inside it move: the Email me button and the Available badge, both of
           which are things you can act on. */}
        {/* `band-accent` rather than `bg-accent`.

           The card is the one large orange surface inside a section, and it
           was painted with the `bg-accent` utility — which resolves to
           --accent, and --accent is a *token*. In light mode that is the same
           orange as the band and nobody can tell the difference. In dark mode
           --accent is still a bright orange, so the card stayed at full
           lightness while every other saturated surface on the page was
           darkened for contrast: its heading measured 2.04:1 against its own
           background.

           Going through `band-accent` puts it under the same dark-mode fill
           rule as the Skills section, so it darkens with everything else and
           keeps its near-black text at a passing ratio. One class does the
           work in both modes, and the card can never drift out of step with
           the palette again. */}
        <Card className="band-accent mt-8 border-foreground text-foreground">
          <div className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <div>
              <Badge
                variant="default"
                className="bk-lift bg-foreground text-background"
              >
                Available
              </Badge>

              <h3 className="display mt-4 text-2xl font-bold uppercase md:text-4xl">
                Got an SEO problem?
              </h3>

              <p className="mt-2 text-foreground/75">
                The quickest way to start is email. I read all of it.
              </p>

              {/* Location and LinkedIn live here now, not in a tile grid below.

                 They used to sit in a 2x2 grid with an email tile and a phone
                 tile. That put the four contact methods at the same visual
                 weight as the CTA directly above them, so the section read as
                 a list of equal options — but email is the only one the copy
                 actually asks for, and the button already offers it. Two of the
                 four tiles were restating a link that was one click away, and
                 the phone number was a second copy of a detail the email
                 signature already carries.

                 What remains is the supporting detail: where the work happens
                 from, and the one place a recruiter can verify the roles
                 listed above. Both are context for the pitch rather than
                 competing calls to action, so they read as a footer line
                 inside the card. Wrapping is allowed, so the email address —
                 the longest value on the page — drops to its own row on a
                 phone rather than overflowing. */}
              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                <span className="flex items-center gap-2">
                  <MapPin className="size-4 shrink-0" aria-hidden="true" />
                  {profile.location}
                </span>

                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-2 font-bold underline decoration-2 underline-offset-4 hover:opacity-70"
                >
                  {/* `Link`, not a LinkedIn glyph: lucide-react dropped its
                      brand icons, and the text beside it already says
                      LinkedIn, so the mark is decorative work only. */}
                  <Link className="size-4 shrink-0" aria-hidden="true" />
                  in/tidar-sentausa
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </div>
            </div>

            <Button
              asChild
              size="lg"
              className="bk-lift shrink-0 border-foreground bg-foreground text-background"
            >
              <a href={`mailto:${profile.email}`}>
                <Mail aria-hidden="true" />
                Email me
              </a>
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}
