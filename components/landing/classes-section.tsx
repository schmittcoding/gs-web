import { IconAtom, IconCrosshair, IconSword, IconWaveSine } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const CLASSES = [
  {
    icon: IconSword,
    name: "Swordsman",
    school: "Sacred Gate",
    roles: ["Melee", "Tank", "DPS"],
    color: "from-[var(--color-orange-peel-950)] to-transparent",
    accentClass: "text-[var(--color-orange-peel-400)]",
    borderClass: "hover:border-[var(--color-orange-peel-500)]",
    description:
      "Masters of close-quarters combat. Sacred Gate's frontline warriors wield heavy blades with terrifying precision, built to absorb punishment and devastate in equal measure.",
    weapons: ["Great Sword", "Battle Axe", "Dual Blades"],
  },
  {
    icon: IconCrosshair,
    name: "Archer",
    school: "Mystic Peak",
    roles: ["Ranged", "DPS", "Agility"],
    color: "from-blue-950/60 to-transparent",
    accentClass: "text-blue-400",
    borderClass: "hover:border-blue-500/60",
    description:
      "Mystic Peak's precision hunters. Archers control the battlefield from afar, raining elemental arrows on enemies before they can close the gap.",
    weapons: ["Long Bow", "Cross Bow", "Dual Arrow"],
  },
  {
    icon: IconWaveSine,
    name: "Shaman",
    school: "Sacred Gate",
    roles: ["Support", "Healer", "Buffer"],
    color: "from-violet-950/60 to-transparent",
    accentClass: "text-violet-400",
    borderClass: "hover:border-violet-500/60",
    description:
      "Spiritual channelers who keep their faction alive and empowered. A skilled Shaman turns an average team into an unstoppable force through precise buffs and critical heals.",
    weapons: ["Staff", "Wand", "Sacred Book"],
  },
  {
    icon: IconAtom,
    name: "Scientist",
    school: "Phoenix",
    roles: ["Summoner", "Tech", "Hybrid"],
    color: "from-emerald-950/60 to-transparent",
    accentClass: "text-emerald-400",
    borderClass: "hover:border-emerald-500/60",
    description:
      "Phoenix faction's tactical innovators. Scientists deploy mechanical sentinels, synthesize battle serums, and overwhelm enemies through sheer technological supremacy.",
    weapons: ["Launcher", "Syringe", "Turret"],
  },
]

export function ClassesSection() {
  return (
    <section id="classes" className="bg-card py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Section header */}
        <div className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-8 bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Character Classes
              </span>
            </div>
            <h2 className="font-black text-3xl uppercase tracking-tight text-foreground md:text-4xl">
              Choose Your Weapon.
              <br />
              <span className="text-[var(--color-cod-gray-500)]">Define Your War.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-[var(--color-cod-gray-500)]">
            Four battle-tested classes across three rival academies. Master one —
            or combine roles to control the campus.
          </p>
        </div>

        {/* Class cards */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {CLASSES.map(({ icon: Icon, name, school, roles, color, accentClass, borderClass, description, weapons }) => (
            <div
              key={name}
              className={cn(
                "group relative flex flex-col overflow-hidden rounded-lg border border-[var(--color-cod-gray-800)] bg-[var(--color-cod-gray-950)] transition-all duration-300",
                borderClass,
                "hover:-translate-y-1 hover:shadow-xl"
              )}
            >
              {/* Gradient header */}
              <div className={cn("relative flex h-28 items-center justify-center bg-gradient-to-b", color)}>
                <Icon
                  size={52}
                  className={cn("transition-transform duration-300 group-hover:scale-110", accentClass)}
                />
                {/* Top-right corner accent */}
                <div className="absolute right-0 top-0 h-8 w-8 overflow-hidden">
                  <div
                    className={cn(
                      "absolute -right-4 -top-4 h-8 w-8 rotate-45 opacity-40",
                      accentClass.replace("text-", "bg-")
                    )}
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col gap-3 p-5">
                <div>
                  <h3 className="font-black text-base uppercase tracking-wider text-foreground">
                    {name}
                  </h3>
                  <p className={cn("text-xs font-semibold uppercase tracking-widest", accentClass)}>
                    {school}
                  </p>
                </div>

                {/* Role tags */}
                <div className="flex flex-wrap gap-1.5">
                  {roles.map((role) => (
                    <Badge key={role} variant="outline" className="text-[10px] uppercase tracking-wider">
                      {role}
                    </Badge>
                  ))}
                </div>

                <p className="text-xs leading-relaxed text-[var(--color-cod-gray-500)]">
                  {description}
                </p>

                {/* Weapons */}
                <div className="mt-auto border-t border-[var(--color-cod-gray-800)] pt-3">
                  <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-[var(--color-cod-gray-600)]">
                    Weapons
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {weapons.map((w) => (
                      <span
                        key={w}
                        className="rounded bg-[var(--color-cod-gray-900)] px-2 py-0.5 text-[10px] text-[var(--color-cod-gray-400)]"
                      >
                        {w}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
