import { ExternalLink, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { projects } from "../data";

export default function Projects() {
  return (
    <section
      id="projects"
      className="section band-secondary band-ink-light border-t-3 border-foreground"
    >
      <div className="shell">
        <p className="eyebrow">Projects</p>
        <h2 className="display mt-4 text-3xl font-bold uppercase md:text-5xl">
          Things I built
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <Card
              key={p.name}
              /* A card with a long case study earns the full row; the two
                 short ones share one. Driven by the data's own `wide` flag so
                 adding a project doesn't have to come back here. */
              className={p.wide ? "md:col-span-2" : undefined}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {p.wide && (
                    <Sparkles className="size-5 text-primary" aria-hidden="true" />
                  )}
                  {p.name}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="leading-relaxed text-muted-foreground">
                  {p.blurb}
                </p>

                {p.bullets && (
                  /* No band-sub here. An earlier pass added it on the theory
                     that these bullets sat on the red band; they are inside
                     CardContent, so they sit on the near-white card. Light ink
                     on white measured 1.04:1 — the text was effectively
                     invisible. The band-ink-light rule reaches this subtree
                     because the card is a descendant of the section, which is
                     exactly the case a section-level ink class has to exempt:
                     see the .band-ink-light reset on cards in app.css. */
                  <ul className="mt-5 space-y-2.5">
                    {p.bullets.map((b) => (
                      <li key={b} className="flex gap-3 leading-relaxed">
                        <span
                          aria-hidden="true"
                          className="mt-2 size-2.5 shrink-0 border-2 border-foreground bg-secondary"
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {p.url && (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-6 inline-flex items-center gap-1.5 font-bold underline decoration-4 underline-offset-4 hover:bg-accent"
                  >
                    Visit {p.name}
                    <ExternalLink className="size-4" aria-hidden="true" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
