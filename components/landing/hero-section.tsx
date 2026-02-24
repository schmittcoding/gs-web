import {
  ArrowRight,
  DownloadSimple,
  Lightning,
  Shield,
  Skull,
  Users,
} from "@phosphor-icons/react/dist/ssr"

import { Button } from "@/components/ui/button"

const STATS = [
  { icon: Users, label: "Online Now", value: "2,847" },
  { icon: Lightning, label: "EXP Rate", value: "50×" },
  { icon: Skull, label: "PvP Kills Today", value: "48k+" },
  { icon: Shield, label: "Guilds Active", value: "138" },
]

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-16">
      {/* ── Background layers ── */}
      <div className="absolute inset-0 bg-background" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(var(--color-cod-gray-400) 1px, transparent 1px),
            linear-gradient(90deg, var(--color-cod-gray-400) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Orange radial glow — top right */}
      <div
        className="absolute -right-32 -top-32 h-[600px] w-[600px] rounded-full opacity-[0.07]"
        style={{
          background: "radial-gradient(circle, var(--color-orange-peel-500), transparent 70%)",
        }}
      />

      {/* Diagonal split accent */}
      <div className="absolute inset-y-0 right-[33%] hidden w-px bg-[var(--color-cod-gray-800)] md:block" />
      <div
        className="absolute inset-y-0 right-[33%] hidden w-px md:block"
        style={{ background: "linear-gradient(to bottom, transparent, var(--color-orange-peel-500) 50%, transparent)" }}
      />

      {/* Animated scan line */}
      <div
        className="ran-scan-fx pointer-events-none absolute inset-x-0 top-0 h-px opacity-30"
        style={{ background: "linear-gradient(90deg, transparent, var(--color-orange-peel-400), transparent)" }}
      />

      {/* Large decorative "RAN" watermark */}
      <div
        className="pointer-events-none absolute -right-8 top-1/2 hidden -translate-y-1/2 select-none font-black uppercase leading-none text-primary md:block"
        style={{ fontSize: "clamp(160px, 22vw, 320px)", opacity: 0.045, letterSpacing: "-0.04em" }}
        aria-hidden
      >
        RAN
      </div>

      {/* ── Content ── */}
      <div className="relative mx-auto w-full max-w-7xl px-4 py-24 md:px-8">
        <div className="max-w-2xl">
          {/* Live badge */}
          <div className="ran-fade-up-1 mb-8 flex items-center gap-3">
            <span className="ran-glow-pulse inline-block h-2 w-2 rounded-full bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Server Online · Season 3
            </span>
          </div>

          {/* Headline */}
          <h1 className="mb-8 font-black uppercase leading-[0.88] tracking-tight">
            <span className="ran-fade-up-1 block text-[clamp(3rem,8vw,6rem)] text-foreground">
              The Academy
            </span>
            <span className="ran-fade-up-2 relative block text-[clamp(3rem,8vw,6rem)]">
              <span className="relative text-primary">
                War
                {/* Animated underline sweep */}
                <span
                  className="ran-sweep-line absolute -bottom-2 left-0 block h-1 w-full bg-primary"
                  aria-hidden
                />
              </span>
              <span className="text-foreground"> Never</span>
            </span>
            <span className="ran-fade-up-3 block text-[clamp(3rem,8vw,6rem)] text-foreground">
              Ends.
            </span>
          </h1>

          {/* Sub-headline */}
          <p className="ran-fade-up-4 mb-10 max-w-lg text-base leading-relaxed text-[var(--color-cod-gray-400)] md:text-lg">
            Enter the deadliest private server in Ran Online history. 10,000+ warriors
            battle for campus supremacy across faction-driven PvP, custom dungeons,
            and nonstop events.
          </p>

          {/* CTAs */}
          <div className="ran-fade-up-5 mb-16 flex flex-wrap gap-3">
            <Button
              size="lg"
              className="h-12 gap-2 px-7 text-sm font-bold uppercase tracking-wider"
            >
              <DownloadSimple size={18} data-icon="inline-start" weight="bold" />
              Download &amp; Play Free
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-12 gap-2 border-[var(--color-cod-gray-700)] px-7 text-sm font-bold uppercase tracking-wider hover:border-primary/40 hover:bg-primary/5"
            >
              Patch Notes
              <ArrowRight size={16} data-icon="inline-end" />
            </Button>
          </div>

          {/* Stats strip */}
          <div className="ran-fade-up-5 flex flex-wrap gap-x-8 gap-y-4 border-t border-[var(--color-cod-gray-800)] pt-8">
            {STATS.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3">
                <Icon
                  size={20}
                  weight="duotone"
                  className="text-primary opacity-70"
                />
                <div>
                  <div className="font-black text-xl leading-none tracking-tight text-foreground">
                    {value}
                  </div>
                  <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-widest text-[var(--color-cod-gray-500)]">
                    {label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade to next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
