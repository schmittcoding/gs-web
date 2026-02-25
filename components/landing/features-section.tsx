import {
  IconCalendar,
  IconHeadset,
  IconBolt,
  IconShield,
  IconSword,
  IconTrophy,
} from "@tabler/icons-react"

import { cn } from "@/lib/utils"

const FEATURES = [
  {
    icon: IconBolt,
    title: "50× EXP & DROP",
    description:
      "High rates tuned for fast progression without sacrificing the grind culture that defines Ran Online.",
  },
  {
    icon: IconSword,
    title: "Custom Weapons",
    description:
      "Exclusive gear, weapon skins, and set bonuses crafted specifically for RanGS — unavailable anywhere else.",
  },
  {
    icon: IconTrophy,
    title: "Campus War",
    description:
      "Weekend-wide Campus Wars where every faction fights for dominance across all three schools.",
  },
  {
    icon: IconCalendar,
    title: "Regular Events",
    description:
      "Monthly content updates, seasonal events, and GM-hosted activities keeping the world alive.",
  },
  {
    icon: IconShield,
    title: "Anti-Cheat",
    description:
      "Zero tolerance enforcement. Real-time monitoring ensures every kill and drop is earned, not exploited.",
  },
  {
    icon: IconHeadset,
    title: "Active GM Team",
    description:
      "Dedicated support staff online daily. Bug reports acted on within 24 hours. Community-first culture.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="bg-[var(--color-cod-gray-950)] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Section header */}
        <div className="mb-16">
          <div className="mb-3 flex items-center gap-3">
            <span className="h-px w-8 bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Why RanGS
            </span>
          </div>
          <h2 className="font-black text-3xl uppercase tracking-tight text-foreground md:text-4xl">
            Built for Combat.
            <br />
            <span className="text-[var(--color-cod-gray-500)]">Refined for Veterans.</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid gap-px bg-[var(--color-cod-gray-800)] sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, description }, i) => (
            <div
              key={title}
              className={cn(
                "group relative flex flex-col gap-4 bg-[var(--color-cod-gray-950)] p-8 transition-colors hover:bg-card",
                i === 0 && "border-l-2 border-l-primary"
              )}
            >
              {/* Corner accent on hover */}
              <div className="absolute right-0 top-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />

              <div className="flex h-10 w-10 items-center justify-center rounded border border-[var(--color-cod-gray-800)] bg-primary/10 transition-colors group-hover:border-primary/40 group-hover:bg-primary/15">
                <Icon size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="mb-1.5 font-bold text-sm uppercase tracking-widest text-foreground">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--color-cod-gray-500)]">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
