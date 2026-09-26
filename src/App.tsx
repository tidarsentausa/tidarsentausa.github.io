import { useEffect, useRef, useState } from "react";
import {
  EyebrowPill,
  GlassCard,
  Goldeneye,
  LogoMarquee,
  MockIDE,
  StatCounter,
  StatusDot,
  StickyBanner,
  type IdeToken,
  type MarqueeItem,
} from "performative-ui";
import {
  education,
  languages,
  profile,
  projects,
  roles,
  skills,
  stats,
  tools,
} from "./data";
import { useTheme } from "./theme";

/* The theme switch.

   A button rather than a checkbox, and labelled by what it DOES rather than by
   what it IS. `aria-label` names the action — "Switch to dark theme" — because
   that is what a screen reader user needs to decide whether to press it. The
   visible glyph is decorative and hidden from assistive tech for the same
   reason: "☀" read aloud is noise, and the two states would otherwise both be
   announced as a bare symbol.

   No aria-pressed here. That attribute describes a toggle button that holds a
   position, and this button has no stable "on" state to report: its meaning is
   entirely in the action it performs. The current theme is conveyed by the
   glyph and by the label, and the page's own colours are the real answer for a
   sighted user.

   The glyph shows the theme you would GET, not the one you are in — the sun
   means "light is available", which is the same convention GitHub and every OS
   use. Getting this backwards (showing a moon on a light page to mean "you are
   in dark mode") is the common mistake and it inverts the user's expectation of
   what the press will do.

   It lives in .rail, stacked above back-to-top, rather than in the hero's CTA
   row: a page-level preference is not one of the three things the hero is
   offering to do, and in the corner it stays reachable from anywhere without
   competing with the pitch. */
function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const next = theme === "dark" ? "light" : "dark";
  const label = `Switch to ${next} theme`;

  return (
    <button
      type="button"
      className="btn btn--theme"
      onClick={toggle}
      aria-label={label}
      title={label}
    >
      <span className="btn__glyph" aria-hidden="true">
        {theme === "dark" ? "☀" : "☾"}
      </span>
      <span className="btn__themelabel">{next}</span>
    </button>
  );
}

/* A little of the workbench, rendered as if it were about to ship.

   Kept client-agnostic on purpose: no brand, client or headline number, so it
   reads as general SEO/analytics tooling rather than one engagement's data.

   Token classes map to the library's palette: com (comment), key (keyword),
   fn (function), str (string), and no class for plain identifiers.

   The snippet is split into two screens so the window can be half as tall.
   Screen one fetches and filters, screen two aggregates and prints; the split
   falls on a blank line so neither screen starts or ends mid-statement. */
const IDE_SCREEN_1: IdeToken[] = [
  { c: "// organic performance → rolling 12 months → by landing page\n", cls: "com" },
  { c: "type ", cls: "key" },
  { c: "QueryRow " },
  { c: "= ", cls: "key" },
  { c: "{\n  query: ", cls: "str" },
  { c: "string" },
  { c: ";\n  clicks: ", cls: "str" },
  { c: "number" },
  { c: ";\n  impressions: ", cls: "str" },
  { c: "number" },
  { c: ";\n  position: ", cls: "str" },
  { c: "number" },
  { c: ";\n};\n\n", cls: "str" },

  { c: "const ", cls: "key" },
  { c: "report" },
  { c: " = await ", cls: "key" },
  { c: "gsc" },
  { c: ".query", cls: "fn" },
  { c: "({\n  dimensions: ", cls: "str" },
  { c: '["query", "clicks", "impressions", "position"]' },
  { c: ',\n  window: ', cls: "str" },
  { c: '"12m"' },
  { c: ",\n});\n\n", cls: "str" },

  { c: "const ", cls: "key" },
  { c: "striking" },
  { c: " = report", cls: "key" },
  { c: ".rows", cls: "fn" },
  { c: ".filter", cls: "fn" },
  { c: "((r: ", cls: "key" },
  { c: "QueryRow" },
  { c: ") => r.clicks > 0 && ", cls: "key" },
  { c: "r.position <= 20", cls: "fn" },
  { c: ");\n", cls: "key" },
];

const IDE_SCREEN_2: IdeToken[] = [
  { c: "// roll up the striking set, then print it\n", cls: "com" },
  { c: "const ", cls: "key" },
  { c: "summary" },
  { c: " = striking", cls: "key" },
  { c: ".reduce", cls: "fn" },
  { c: "((acc, r) => ({\n  queries: ", cls: "key" },
  { c: "acc.queries + 1" },
  { c: ",\n  clicks: ", cls: "key" },
  { c: "acc.clicks + r.clicks" },
  { c: ",\n  impressions: ", cls: "key" },
  { c: "acc.impressions + r.impressions" },
  { c: ",\n  top3: ", cls: "key" },
  { c: "acc.top3 + Number(r.position <= 3)" },
  { c: ",\n}), { queries: ", cls: "key" },
  { c: "0" },
  { c: ", clicks: ", cls: "key" },
  { c: "0" },
  { c: ", impressions: ", cls: "key" },
  { c: "0" },
  { c: ", top3: ", cls: "key" },
  { c: "0" },
  { c: " });\n\n", cls: "key" },

  { c: "const ", cls: "key" },
  { c: "ctr" },
  { c: " = (summary", cls: "key" },
  { c: ".clicks", cls: "fn" },
  { c: " / summary", cls: "key" },
  { c: ".impressions", cls: "fn" },
  { c: ") * 100;\n\n", cls: "key" },

  { c: "console" },
  { c: ".table", cls: "fn" },
  { c: "(\n  " },
  { c: "queries" },
  { c: ": ", cls: "key" },
  { c: "summary" },
  { c: ".queries" },
  { c: ",\n  clicks: ", cls: "key" },
  { c: "summary" },
  { c: ".clicks" },
  { c: ",\n  top3: ", cls: "key" },
  { c: "summary" },
  { c: ".top3" },
  { c: ",\n  ctr: ", cls: "key" },
  { c: "ctr" },
  { c: ".toFixed", cls: "fn" },
  { c: "(2)" },
  { c: ",\n});\n", cls: "key" },
];

/* Real marks where they exist. simple-icons are monochrome by nature, so no
   recoloring is applied; a self-hosted raster keeps its own brand color. */
const MARQUEE: MarqueeItem[] = tools.map((t) => {
  const src =
    t.src ?? (t.slug ? `https://cdn.jsdelivr.net/npm/simple-icons@11/icons/${t.slug}.svg` : null);
  return src
    ? { kind: "img" as const, src, alt: t.name }
    : {
        kind: "node" as const,
        node: <span className="marquee__word">{t.name}</span>,
        key: t.name,
      };
});

/* How far the lens is allowed to reach past the footer's own edges, per side.

   The disc is deliberately wider than the footer band, so it overlaps the
   border and the paper above and below rather than being cut at them. 56px is
   the most the surrounding layout can absorb: the workbench leaves 72px of
   bottom padding above the footer, and anything past that would start covering
   the IDE panel. Kept in one place because the same number is used twice —
   once here for the diameter, and once in app.css as --lens-bleed for the
   footer's horizontal padding, which is what stops the disc being clipped
   sideways at the page's left and right edges. */
const LENS_BLEED = 56;

/* The footer's magnifier.

   Goldeneye is a lens: the base layer paints `text_default`, and a circular
   scope clipped to the cursor's position paints `text_reveal` in the inverse
   colours inside it, over a binary-digit pattern rendered at a second, larger
   size.

   The base layer is the word "resume" and the lens is the name, so hovering
   the footer turns the label into the person it labels. Both layers take the
   library's own defaults now — no size, colour, casing or tracking overrides
   — so the two are the same type at the same size swapping under the circle,
   which is what makes it read as one image changing rather than as two
   pieces of text. The typeface is the library's serif, set through
   --pui-goldeneye-font in app.css.

   The name inside the lens is WIDER than the disc, so the circle shows a
   fragment of it. That is the effect, not a fault: a lens that showed its
   whole subject would be a tooltip.

   `scopeSize` is a DIAMETER, not a radius — the component divides it by two
   internally, so the 300 first passed here was a 150px radius.

   The diameter is tied to the footer's own HEIGHT, not the viewport, so the
   disc scales with the box it sits in. It is deliberately LARGER than that
   box: a circle centred in a band cannot exceed the band's height without
   being cut at its edges, so it overlaps the footer's top and bottom instead,
   over the border and onto the paper either side. LENS_BLEED is how far, and
   the 460px ceiling stops it swallowing the workbench on a tall display.

   Unlike the ASCII canvas this replaced, there is no rAF loop: the lens only
   moves in direct response to pointer movement, so it is not autonomous motion
   and stays under prefers-reduced-motion. */
function FooterLens() {
  /* The diameter is a JS prop, so it cannot be a CSS clamp. Measured from the
     element itself with a ResizeObserver rather than from window.innerWidth:
     the constraint is the footer's box, and it is the footer that can change.

     It is deliberately LARGER than that box. A circle centred in a band cannot
     exceed the band's height without being cut at its edges, which is why
     this was previously h - 24 and why the lens looked small in a footer that
     had just been halved. Growing it means letting the disc overlap the
     footer's own top and bottom edges, over the border and onto the paper
     either side — the workbench leaves 72px of padding above and the page has
     room below, and the disc's overflow is visible, so the circle passes over
     both rather than being clipped at them.

     That is the intended look: a lens resting on the page rather than a
     window cut to fit inside it. LENS_BLEED is how far past the footer the
     disc reaches on each side, and the 460px ceiling stops it swallowing the
     workbench on a tall display. */
  const host = useRef<HTMLDivElement>(null);
  const [diameter, setDiameter] = useState(280);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const h = entry.contentRect.height;
      setDiameter(Math.max(120, Math.min(460, h + LENS_BLEED * 2)));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={host} className="footer__lens">
      <Goldeneye
        className="footer__lens-inner"
        text_default="resume"
        text_reveal={profile.name}
        pattern="0 1 0 1 "
        scopeSize={diameter}
      />
    </div>
  );
}

export default function App() {
  const [temp, setTemp] = useState("funnel");
  const [openRole, setOpenRole] = useState<string | null>(roles[0].company);
  const [ideScreen, setIdeScreen] = useState(0);

  /* Back to top.

     One scrollTo, smooth, plus a single completion check that can only ever
     finish the journey, never interrupt it.

     An earlier version asserted the destination three more times: a
     synchronous root.scrollTop = 0, then a 900ms timer that re-scrolled if
     scrollY was still above 0. The synchronous assignment landed in the same
     frame the smooth scroll was starting and killed it, so the page crept up,
     stopped, and the timer then jumped the rest — the pause-then-jerk. Both
     guards are gone, and with them the only thing that could interrupt a
     smooth scroll this page performs itself.

     What remains is a completion check, and it is deliberately weak: it runs
     on a timer long enough for any real smooth scroll to have finished, and
     it only ever SETS the position to 0. It cannot slow, reverse or restart
     anything, so in the normal case it is a no-op and the single smooth scroll
     is what the user sees. It exists because a smooth scroll can still be cut
     short by a layout change mid-flight — this page swaps the IDE screen on an
     11s interval, which remounts a panel and changes the document height — and
     a jump-to-top that lands at 3800px looks exactly like a button that does
     nothing. Setting 0 in that case is the same destination, reached
     immediately instead of eventually, which is what the user asked for
     either way.

     prefers-reduced-motion is honoured upstream: html sets scroll-behavior auto
     under that media query, and the explicit behavior below matches it. */
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > window.innerHeight * 0.75;
      setShowTop((prev) => (prev === past ? prev : past));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    // Honour a stated preference for reduced motion rather than always asking
    // for the animation. html's scroll-behavior already does this for
    // anchor navigation, but an explicit scrollTo has its own behavior and
    // does not inherit it.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, left: 0, behavior: reduce ? "auto" : "smooth" });

    // Completion check, not a correction. Long enough that a real smooth
    // scroll over ~5000px has finished (measured ~1.1s), and it only ever
    // sets 0, so it can never produce the pause-then-jerk the old synchronous
    // assignment did. Guards the case where a layout change during the
    // animation leaves the page parked partway.
    window.setTimeout(() => {
      if (window.scrollY > 0) {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }
    }, 1600);
  };

  /* Alternate the two IDE screens.

     Each screen gets a React key, so switching remounts MockIDE.Body and the
     snippet retypes from empty. MockIDE's own loop is turned off: left on, it
     would restart the same screen forever and the second half would never
     show. The interval is longer than a screen takes to type, so each screen
     finishes its text before the swap. */
  useEffect(() => {
    const id = setInterval(() => setIdeScreen((n) => (n + 1) % 2), 11000);
    return () => clearInterval(id);
  }, []);

  /* Marquee items carry no label attribute and CSS attr() cannot read an img's
     alt text, so mirror each mark's alt onto its item for the hover label.
     Read from alt rather than by index: the track renders the list twice, so
     positional indexing would mislabel the second pass.

     The library loops via translateX(-50%), so one copy of the items must be
     at least as wide as the visible window or the loop shows a gap. With a
     short list that is not the case, so clone the set until half the track
     comfortably covers the window. */
  const logosRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = logosRef.current;
    if (!root) return;
    const marquee = root.querySelector<HTMLElement>(".pui-marquee");
    const track = root.querySelector<HTMLElement>(".pui-marquee__track");
    if (!marquee || !track) return;

    for (const item of track.querySelectorAll<HTMLElement>(".pui-marquee__item")) {
      if (item.dataset.label) continue;
      const alt = item.querySelector("img")?.getAttribute("alt");
      if (alt) item.dataset.label = alt;
    }

    // This effect runs after every render, so cloning must happen only once.
    if (track.dataset.repeated) return;
    track.dataset.repeated = "true";

    // The library renders the set twice; treat that as one unit.
    const baseCount = track.children.length / 2;
    if (!Number.isInteger(baseCount) || baseCount === 0) return;
    const base = Array.from(track.children).slice(0, baseCount);

    const gap = parseFloat(getComputedStyle(track).getPropertyValue("--pui-logo-gap")) ||
      parseFloat(getComputedStyle(track).getPropertyValue("--pui-marquee-gap")) || 0;
    const setWidth = base.reduce((sum, el) => sum + el.getBoundingClientRect().width, 0) + gap * base.length;
    if (setWidth <= 0) return;

    // The loop shifts by -50%, so HALF the track is what has to cover the
    // window. Half is (sets / 2) copies of one set, so the requirement is
    // (sets / 2) * setWidth >= windowWidth. Solving for sets and then rounding
    // up to an even number keeps the halfway point on a set boundary.
    const windowWidth = marquee.getBoundingClientRect().width;
    const needed = Math.ceil((2 * windowWidth) / setWidth);
    const sets = needed % 2 === 0 ? needed : needed + 1;
    const extra = Math.max(0, sets * baseCount - track.children.length);

    for (let i = 0; i < extra; i++) {
      const clone = base[i % base.length].cloneNode(true) as HTMLElement;
      clone.setAttribute("aria-hidden", "true");
      track.appendChild(clone);
    }
  });

  return (
    <>
      {/* Single message: the copy states the location, so a trailing
          "based in Kuala Lumpur" would just repeat it. Kept in the leading
          span because the narrow-screen rule targets banner__trailing. */}
      <StickyBanner trailing={null}>
        <span className="banner__leading">
          Kuala Lumpur-based SEO Manager
        </span>
      </StickyBanner>
      <main className="page">
        <header className="hero">
          {/* Portrait and identity sit in one row on wide screens. The photo is
              self-hosted (not the GitHub avatar URL) so the page has no runtime
              dependency on a third party, and it carries intrinsic dimensions
              so the box is reserved before the bytes land. Eager, because it is
              above the fold: deferring it would cost a visible pop on the one
              element that introduces the page. */}
          <div className="hero__top">
            <figure className="portrait">
              <img
                className="portrait__img"
                src="/tidar-avatar.jpg"
                alt={`${profile.name}, headshot`}
                width={460}
                height={460}
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </figure>

            <div className="hero__id">
              <EyebrowPill icon={<StatusDot color="#4ade80" />}>
                {stats[0].value}+ years · {tools.length}+ tools in the stack
              </EyebrowPill>

              <h1 className="hero__name">{profile.name}</h1>

              <p className="hero__roles">{profile.roles.join(" / ")}</p>

              <p className="hero__meta">
                {profile.location} · {profile.email} · {profile.phone}
              </p>
            </div>
          </div>

          {/* Summary sits above the actions, unboxed: it is the pitch, and a
              card around it would compete with the stat strip below. */}
          <p className="hero__summary">{profile.summary}</p>

          <div className="hero__cta">
            <a className="btn" href="#experience">
              Experience
            </a>
            <a
              className="btn"
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a className="btn btn--solid" href={`mailto:${profile.email}`}>
              Email
            </a>
          </div>

          <div className="hero__stats">
            {stats.map((s) => (
              <GlassCard key={s.label} className="stat">
                <StatCounter target={s.value} format={(n: number) => n.toLocaleString()} />
                <span className="stat__suffix">{s.suffix}</span>
                <span className="stat__label">{s.label}</span>
              </GlassCard>
            ))}
          </div>
        </header>

        <section className="logos" ref={logosRef}>
          <LogoMarquee logos={MARQUEE} speed={30} fade pauseOnHover />
        </section>

        <section id="experience" className="section">
          <h2 className="section__title">
            01 / Experience
          </h2>

          <div className="roles">
            {roles.map((role) => {
              const open = openRole === role.company;
              return (
                <GlassCard key={role.company} breathing={false} className="role">
                  <button
                    type="button"
                    className="role__head"
                    onClick={() => setOpenRole(open ? null : role.company)}
                    aria-expanded={open}
                  >
                    <div>
                      <h3 className="role__company">{role.company}</h3>
                      <p className="role__title">
                        {role.title}
                        {role.location && (
                          <span className="role__location"> · {role.location}</span>
                        )}
                      </p>
                    </div>
                    <span className="role__period">{role.period}</span>
                  </button>

                  {open && (
                    <div className="role__body">
                      <p className="role__blurb">{role.blurb}</p>
                      <ul className="role__list">
                        {role.highlights.map((h) => (
                          <li key={h}>{h}</li>
                        ))}
                      </ul>
                      {role.url && (
                        <a
                          className="role__link"
                          href={role.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {role.url.replace(/^https?:\/\//, "")}
                        </a>
                      )}
                    </div>
                  )}
                </GlassCard>
              );
            })}
          </div>
        </section>

        <section id="projects" className="section">
          <h2 className="section__title">
            02 / Side projects
          </h2>
          <div className="projects">
            {projects.map((p) => (
              <GlassCard
                key={p.name}
                className={`project${p.wide ? " project--wide" : ""}`}
              >
                <h3>{p.name}</h3>
                <p>{p.blurb}</p>
                {p.bullets && (
                  <ul className="project__bullets">
                    {p.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
                {p.url && (
                  <a href={p.url} target="_blank" rel="noreferrer">
                    {p.url.replace(/^https?:\/\//, "")}
                  </a>
                )}
              </GlassCard>
            ))}
          </div>
        </section>

        <section id="skills" className="section">
          <h2 className="section__title">
            03 / Skills
          </h2>

          <div className="skills">
            <div className="skills__list">
              {skills.map((group) => (
                <GlassCard key={group.group} breathing={false} className="skillgroup">
                  <header>
                    <h3>{group.group}</h3>
                    <span className="skillgroup__level">{group.level}</span>
                  </header>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </GlassCard>
              ))}
            </div>

            <div className="skills__flavor">
              <GlassCard className="engagement">
                <h3>Engagement model</h3>
                <dl className="engagement__list">
                  <dt>Audit only</dt>
                  <dd>
                    Read-only access. I find the leaks, document them, and hand you the
                    list.
                  </dd>
                  <dt>Balanced</dt>
                  <dd>
                    Keyword research, on-page fixes, and steady reporting each month.
                  </dd>
                  <dt>Full funnel</dt>
                  <dd>
                    Content expansion plus a technical revamp, mapped to the stages that
                    actually convert.
                  </dd>
                </dl>
                <p className="engagement__note">
                  Delivered on a comparable engagement: Top 3 rankings 2 → 364, clicks
                  up 1,595%.
                </p>
              </GlassCard>
            </div>
          </div>
        </section>

        <section className="section">
          <h2 className="section__title">04 / Case study</h2>
          <GlassCard breathing={false} className="case">
            <div className="case__col">
              <h3 className="case__head">Before</h3>
              <p className="case__lede">Branded only</p>
              <ul className="case__list">
                <li>Ranking for the brand name and little else</li>
                <li>No technical baseline</li>
                <li>Traffic flat</li>
              </ul>
            </div>
            <div className="case__arrow" aria-hidden="true">
              &rarr;
            </div>
            <div className="case__col">
              <h3 className="case__head">After</h3>
              <p className="case__lede">Full-funnel intent</p>
              <ul className="case__list">
                <li>Generic, high-intent keywords mapped to the funnel</li>
                <li>Top 3 rankings: 2 &rarr; 364</li>
                <li>Clicks up 1,595%</li>
              </ul>
            </div>
          </GlassCard>
        </section>

        <section className="section split">
          <GlassCard className="panel">
            <h3>Education</h3>
            <p className="panel__lead">{education.school}</p>
            <p>{education.degree}</p>
            <p className="panel__meta">{education.period}</p>
          </GlassCard>
          <GlassCard className="panel">
            <h3>Languages</h3>
            {languages.map((l) => (
              <p key={l.name} className="panel__meta">
                <strong>{l.name}</strong> · {l.level}
              </p>
            ))}
          </GlassCard>
        </section>
      </main>

      {/* Purely decorative, so it sits below the content and above the footer. */}
      <div className="workbench">
        <MockIDE
          key={ideScreen}
          filename="organic-report.ts"
          tokens={ideScreen === 0 ? IDE_SCREEN_1 : IDE_SCREEN_2}
          loop={false}
          charMs={[4, 14]}
          thinkingLabel="compiling query set…"
        />
      </div>

      {/* The footer is the lens, and nothing else.

          BigBack is gone entirely: its wordmark, its nav columns and its
          copyright row were the three things competing with the magnifier, and
          with the links removed the only thing in this box is the interaction
          itself. The nav survives in the hero, which already links Experience
          and Email, so nothing becomes unreachable.

          It is a real <footer> now. It was a plain div only while BigBack
          rendered its own footer landmark underneath; with BigBack gone there
          is nothing to nest inside, so the landmark is stated here directly
          and assistive tech gets one contentinfo region rather than none. */}
      <footer className="footer">
        <FooterLens />
      </footer>

      {/* The two floating controls, stacked in one fixed rail.

          The theme switch and back-to-top are the page's only persistent
          controls, and they are stacked rather than placed independently so
          they cannot collide: both are bottom-right, and giving each its own
          `bottom` would mean one of them hardcoding the other's height.

          The rail is a flex column anchored bottom-right, so the theme switch
          sits directly above back-to-top and the pair grows upward — which
          means the bottom offset stays correct no matter how tall either
          button is, including at the narrow breakpoint where both drop their
          labels.

          Back-to-top keeps its own opacity/visibility fade, so it appears and
          disappears inside the rail without the theme switch moving. It is not
          display:none, so its box is always reserved and the theme switch holds
          its position rather than dropping into the gap when it appears. */}
      <div className="rail">
        <ThemeToggle />
        <button
          type="button"
          className={`to-top${showTop ? " to-top--on" : ""}`}
          aria-hidden={!showTop}
          tabIndex={showTop ? 0 : -1}
          onClick={scrollToTop}
        >
          <span aria-hidden="true">↑</span>
          <span className="to-top__label">Top</span>
        </button>
      </div>
    </>
  );
}
