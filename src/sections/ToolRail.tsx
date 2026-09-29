import { tools } from "../data";

/* Where each mark comes from.

   Eight tools load as SVGs from the simple-icons CDN, which is monochrome by
   design. Ahrefs, Screaming Frog and Microsoft Clarity are not in simple-icons
   — Ahrefs for trademark reasons, the other two because it does not carry
   them — so they are self-hosted in public/.

   All three self-hosted files are black-on-transparent, converted from the
   official colour artwork by tools/monochrome-icons.py. Keeping the official
   silhouette and dropping only the hue is the point: these are trademarks, and
   a hand-drawn approximation would be subtly wrong in a way nobody could later
   pin down. Run that script to regenerate them from a new source image. */
function toolSrc(t: (typeof tools)[number]) {
  return t.src ?? `https://cdn.jsdelivr.net/npm/simple-icons@11/icons/${t.slug}.svg`;
}

/* The tool stack, as a marquee.

   Sits directly under the hero, full-bleed, because that is where a
   visitor's eye lands after the name and the summary — the stack is the
   evidence for "I do SEO" and belongs with the pitch, not buried above the
   footer.

   The strip is rendered twice: the second copy is what makes the -50%
   translate loop without a visible seam. It is `aria-hidden`, so a screen
   reader hears each tool once rather than twice. */
export default function ToolRail() {
  return (
    <div className="rail">
      <div className="rail__track">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex items-center gap-12"
            aria-hidden={copy === 1 || undefined}
          >
            {tools.map((t) => (
              <span key={t.name} className="flex shrink-0 items-center gap-3">
                {/* alt="" because the name is right beside it as text; an empty
                    alt is correct here, not a missing one. */}
                <img src={toolSrc(t)} alt="" className="size-7" loading="lazy" />
                <span className="display whitespace-nowrap text-sm font-bold uppercase tracking-wide">
                  {t.name}
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
