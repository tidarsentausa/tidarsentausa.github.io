import { Badge } from "@/ui/badge";
import { Progress } from "@/ui/progress";
import { skills } from "../data";
import { useFillOnView } from "../useFillOnView";

/* Self-assessed proficiency, as a number the bars can be drawn from.

   A bar is a claim about a person's ceiling, so the wording is deliberately
   coarse — "Expert" and "Advanced" are what the CV says, and the bar is only
   there to make the list scannable, not to imply a measured score. Anything
   finer would be invented precision. */
const LEVEL_PCT: Record<string, number> = {
  Expert: 92,
  Advanced: 75,
  Intermediate: 55,
};

function pct(level: string) {
  return LEVEL_PCT[level] ?? 60;
}

/* One skill group's bar.

   Split out so each bar owns its own observer: a single hook in the parent
   would have to decide which of the five groups is on screen, which is exactly
   the per-element question the observer exists to answer. */
function SkillBar({ level }: { level: string }) {
  const target = pct(level);
  const { ref, value } = useFillOnView(target);

  // The wrapper is what gets observed, not the Progress itself: the bar is
  // `aria-hidden` (see below) and is a few pixels tall, so it makes a poor
  // intersection target at a 0.45 threshold on a fast scroll.
  return (
    <div ref={ref}>
      <Progress
        value={value}
        variant="stepped"
        className="mt-5"
        aria-hidden="true"
      />
    </div>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="section band-accent border-t-3 border-foreground"
      data-pattern="halftone"
    >
      <div className="shell">
        <p className="eyebrow">Skills</p>
        <h2 className="display mt-4 text-3xl font-bold uppercase md:text-5xl">
          What I work with
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {skills.map((group) => (
            <div
              key={group.group}
              className="border-3 border-foreground bg-card p-6 shadow-[4px_4px_0px_hsl(var(--shadow-color))]"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="display text-lg font-bold uppercase">
                  {group.group}
                </h3>
                <Badge variant={group.level === "Expert" ? "default" : "secondary"}>
                  {group.level}
                </Badge>
              </div>

              {/* The bar restates the badge numerically, and fills as it comes
                  into view. It is a visual echo of the same fact rather than
                  new information, so it stays hidden from assistive tech —
                  announcing a level that the badge beside it already
                  announced would be a duplicate. */}
              <SkillBar level={group.level} />

              <ul className="mt-6 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item}>
                    <Badge variant="outline">{item}</Badge>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
