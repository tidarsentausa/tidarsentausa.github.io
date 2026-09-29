import { GraduationCap, Languages as LanguagesIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Progress } from "@/ui/progress";
import { education, languages } from "../data";
import { useFillOnView } from "../useFillOnView";

/* One language bar, filling as it scrolls into view.

   Unlike the skill bars these carry a real `aria-label` rather than being
   hidden: "Indonesian: Native" is a claim about ability, not a restatement of
   a badge, so it is worth having in the accessibility tree. */
function LanguageBar({ level, label }: { level: string; label: string }) {
  const target = level === "Native" ? 100 : 80;
  const { ref, value } = useFillOnView(target);

  return (
    <div ref={ref}>
      <Progress value={value} className="mt-2" aria-label={label} />
    </div>
  );
}

/* The facts that aren't a list of tools and aren't a list of jobs: languages
   and education.

   The tool marquee used to live here. It now sits under the hero as
   ToolRail, where it reads as evidence for the pitch rather than a footnote
   above the footer — which leaves this section with just the two cards, and
   so without a heading of its own. */
export default function Toolkit() {
  return (
    <section
      id="toolkit"
      className="section band-info border-t-3 border-foreground"
      data-pattern="grid-sm"
    >
      <div className="shell">
        <p className="eyebrow">Background</p>
        <h2 className="display mt-4 text-3xl font-bold uppercase md:text-5xl">
          Languages &amp; education
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LanguagesIcon className="size-5" aria-hidden="true" />
                Languages
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {languages.map((l) => (
                <div key={l.name}>
                  <div className="flex items-baseline justify-between">
                    <span className="font-bold">{l.name}</span>
                    <span className="text-sm font-bold uppercase text-muted-foreground">
                      {l.level}
                    </span>
                  </div>
                  {/* A 100% bar on "Native" is the claim itself, so it is worth
                      drawing; "Fluent" sits below it deliberately, because
                      fluent is not native.

                      Fills as it scrolls into view, like the skill bars. The
                      wrapper is the observed element because the bar itself is
                      short and `aria-hidden`. */}
                  <LanguageBar level={l.level} label={`${l.name}: ${l.level}`} />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="size-5" aria-hidden="true" />
                Education
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="display text-lg font-bold uppercase">
                {education.school}
              </p>
              <p className="mt-1 text-muted-foreground">{education.degree}</p>
              <p className="mt-1 text-sm font-bold uppercase tracking-wide text-muted-foreground">
                {education.period}
              </p>
              <a
                href={education.url}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-5 inline-block font-bold underline decoration-4 underline-offset-4 hover:bg-accent"
              >
                Visit university
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
