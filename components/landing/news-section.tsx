import { IconArrowRight, IconClock } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const NEWS = [
  {
    category: "Event",
    categoryVariant: "default" as const,
    date: "Feb 20, 2026",
    title: "Campus War Season 3 Championship — Final Results",
    excerpt:
      "Sacred Gate claimed the throne after a brutal 4-hour finale against Mystic Peak. Highlights, MVP awards, and next season's prize pool announced.",
    hot: true,
  },
  {
    category: "Update",
    categoryVariant: "outline" as const,
    date: "Feb 15, 2026",
    title: "New Dungeon: The Sacred Gate Crypt",
    excerpt:
      "Descend into the ancient crypt beneath Sacred Gate Academy. Three wings, seven boss encounters, and the long-awaited Crimson Set drop pool.",
    hot: false,
  },
  {
    category: "Patch",
    categoryVariant: "outline" as const,
    date: "Feb 10, 2026",
    title: "Balance Patch v2.4.1 — Shaman & Scientist Adjustments",
    excerpt:
      "Shaman buff durations increased, Scientist turret cooldowns reduced. PK zone boundaries in Mystic Peak updated. Full patch notes inside.",
    hot: false,
  },
]

export function NewsSection() {
  return (
    <section id="news" className="bg-card py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Section header */}
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-8 bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                News &amp; Updates
              </span>
            </div>
            <h2 className="font-black text-3xl uppercase tracking-tight text-foreground md:text-4xl">
              Latest from
              <br />
              <span className="text-[var(--color-cod-gray-500)]">the Front Lines.</span>
            </h2>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-fit gap-1.5 border-[var(--color-cod-gray-700)] text-xs uppercase tracking-widest hover:border-primary/40"
          >
            All News
            <IconArrowRight size={14} data-icon="inline-end" />
          </Button>
        </div>

        {/* News grid */}
        <div className="grid gap-4 md:grid-cols-3">
          {NEWS.map(({ category, categoryVariant, date, title, excerpt, hot }) => (
            <article
              key={title}
              className={cn(
                "group relative flex flex-col gap-4 rounded-lg border bg-[var(--color-cod-gray-950)] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg",
                hot
                  ? "border-primary/30 hover:border-primary/60"
                  : "border-[var(--color-cod-gray-800)] hover:border-[var(--color-cod-gray-700)]"
              )}
            >
              {/* Hot indicator */}
              {hot && (
                <div className="absolute right-0 top-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
              )}

              {/* Meta */}
              <div className="flex items-center justify-between">
                <Badge variant={categoryVariant} className="text-[10px] uppercase tracking-wider">
                  {category}
                </Badge>
                <span className="flex items-center gap-1.5 text-[10px] text-[var(--color-cod-gray-600)]">
                  <IconClock size={11} />
                  {date}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="mb-2 font-bold text-sm leading-snug text-foreground transition-colors group-hover:text-primary">
                  {title}
                </h3>
                <p className="text-xs leading-relaxed text-[var(--color-cod-gray-500)]">
                  {excerpt}
                </p>
              </div>

              {/* Read more */}
              <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-[var(--color-cod-gray-600)] transition-colors group-hover:text-primary">
                Read More
                <IconArrowRight size={11} className="transition-transform group-hover:translate-x-0.5" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
