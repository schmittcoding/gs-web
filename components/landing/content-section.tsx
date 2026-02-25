import type { Icon } from "@tabler/icons-react"
import {
  IconArrowRight,
  IconBuildingCastle,
  IconCrown,
  IconFlame,
  IconNews,
  IconSkull,
  IconSword,
  IconTarget,
  IconTree,
  IconTrophy,
} from "@tabler/icons-react"

import { Button } from "@/components/ui/button"

const PVP_CONTENT = [
  {
    icon: IconSword,
    title: "Campus War",
    description:
      "The defining battle of RanGS. Every weekend, all three schools clash in a massive server-wide war for campus supremacy.",
  },
  {
    icon: IconTrophy,
    title: "Arena Tournament",
    description:
      "Weekly ranked 1v1 and team-based arena brackets. Climb the ladder and claim exclusive rank titles and gear.",
  },
  {
    icon: IconSkull,
    title: "PK System",
    description:
      "Open-world player killing in designated zones. Hunt your enemies or become the hunted — no safe havens.",
  },
  {
    icon: IconBuildingCastle,
    title: "Siege Warfare",
    description:
      "Guild alliances fight to claim and defend fortress territories. Control territory, control resources.",
  },
]

const PVE_CONTENT = [
  {
    icon: IconFlame,
    title: "Field Bosses",
    description:
      "Massive world bosses that spawn across campuses. Coordinate your guild for rare drops and legendary weapons.",
  },
  {
    icon: IconTarget,
    title: "Dungeon Raids",
    description:
      "Squad-based instanced dungeons with multi-phase bosses, trap mechanics, and high-tier reward pools.",
  },
  {
    icon: IconNews,
    title: "Quest Chains",
    description:
      "Story-driven quest arcs with faction-specific lore, unlocking exclusive skills and cosmetic rewards.",
  },
  {
    icon: IconTree,
    title: "Event Instances",
    description:
      "Limited-time seasonal instances with exclusive drops. Miss the season, miss the gear — permanently.",
  },
]

function ContentList({
  items,
}: {
  items: { icon: Icon; title: string; description: string }[]
}) {
  return (
    <ul className="flex flex-col gap-6">
      {items.map(({ icon: Icon, title, description }) => (
        <li key={title} className="flex gap-4">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded border border-[var(--color-cod-gray-800)] bg-[var(--color-cod-gray-900)]">
            <Icon size={18} className="text-primary" />
          </div>
          <div>
            <h4 className="mb-0.5 font-bold text-sm uppercase tracking-wider text-foreground">
              {title}
            </h4>
            <p className="text-sm leading-relaxed text-[var(--color-cod-gray-500)]">
              {description}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}

export function ContentSection() {
  return (
    <section id="content" className="bg-[var(--color-cod-gray-950)] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Section header */}
        <div className="mb-16">
          <div className="mb-3 flex items-center gap-3">
            <span className="h-px w-8 bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Gameplay
            </span>
          </div>
          <h2 className="font-black text-3xl uppercase tracking-tight text-foreground md:text-4xl">
            Endless Reasons
            <br />
            <span className="text-[var(--color-cod-gray-500)]">to Log Back In.</span>
          </h2>
        </div>

        {/* Two-panel layout */}
        <div className="grid gap-4 lg:grid-cols-2">
          {/* PvP Panel */}
          <div className="rounded-lg border border-[var(--color-cod-gray-800)] bg-card p-8">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-destructive opacity-80" />
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-destructive">
                    PvP Warfare
                  </span>
                </div>
                <h3 className="font-black text-xl uppercase tracking-tight text-foreground">
                  Player vs Player
                </h3>
              </div>
              <IconCrown size={32} className="text-[var(--color-cod-gray-700)]" />
            </div>
            <ContentList items={PVP_CONTENT} />
            <div className="mt-8 border-t border-[var(--color-cod-gray-800)] pt-6">
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 border-[var(--color-cod-gray-700)] text-xs uppercase tracking-widest hover:border-destructive/40 hover:text-destructive"
              >
                View PvP Rankings
                <IconArrowRight size={14} data-icon="inline-end" />
              </Button>
            </div>
          </div>

          {/* PvE Panel */}
          <div className="rounded-lg border border-[var(--color-cod-gray-800)] bg-card p-8">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-primary opacity-80" />
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-primary">
                    PvE Conquest
                  </span>
                </div>
                <h3 className="font-black text-xl uppercase tracking-tight text-foreground">
                  Player vs Environment
                </h3>
              </div>
              <IconFlame size={32} className="text-[var(--color-cod-gray-700)]" />
            </div>
            <ContentList items={PVE_CONTENT} />
            <div className="mt-8 border-t border-[var(--color-cod-gray-800)] pt-6">
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 border-[var(--color-cod-gray-700)] text-xs uppercase tracking-widest hover:border-primary/40 hover:text-primary"
              >
                View Dungeon Guides
                <IconArrowRight size={14} data-icon="inline-end" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
