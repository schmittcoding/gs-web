import {
  IconArrowRight,
  IconGift,
  IconShieldCheck,
  IconSword,
  IconUserCheck,
  IconUserPlus,
} from "@tabler/icons-react";

const STEPS = [
  {
    number: 1,
    icon: IconUserPlus,
    title: "Invite Friends",
    description: "Share your referral code or link with your friends.",
  },
  {
    number: 2,
    icon: IconUserCheck,
    title: "They Sign Up",
    description: "Your friend registers using your referral code.",
  },
  {
    number: 3,
    icon: IconSword,
    title: "They Play",
    description: "Your friend reaches and completes in-game goals.",
  },
  {
    number: 4,
    icon: IconGift,
    title: "You Earn Rewards",
    description: "You earn exclusive items based on your friend's progress.",
  },
] as const;

export function ReferralHowItWorks() {
  return (
    <section className="space-y-6">
      {/* Section title */}
      <section className="flex items-center gap-4">
        <div className="flex-1 h-px bg-linear-to-r from-transparent to-primary/30" />
        <p className="text-[10px] font-semibold uppercase tracking-widest text-primary whitespace-nowrap px-2">
          How It Works
        </p>
        <div className="flex-1 h-px bg-linear-to-l from-transparent to-primary/30" />
      </section>

      {/* Steps grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-0 items-center">
        {STEPS.map((step, index) => {
          const Icon = step.icon;
          const isLast = index === STEPS.length - 1;

          return (
            <section
              key={step.number}
              className="contents lg:flex lg:items-center"
            >
              {/* Step card */}
              <section className="shape-main border border-gray-800 bg-gray-950/60 p-2 flex flex-col items-center text-center gap-3 relative overflow-hidden lg:flex-1 group/step hover:border-primary/30 transition-colors">
                {/* Ambient glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover/step:opacity-[0.04] transition-opacity pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, var(--color-orange-peel-500), transparent 70%)",
                  }}
                />

                {/* Number badge */}
                <div className="absolute top-3 left-3 size-5 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
                  <span className="text-[9px] font-black text-primary">
                    {step.number}
                  </span>
                </div>

                {/* Icon */}
                <div className="size-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mt-2">
                  <Icon className="size-6 text-primary" />
                </div>

                {/* Text */}
                <section className="space-y-1.5">
                  <p className="text-xs font-black uppercase tracking-wide text-foreground">
                    {step.title}
                  </p>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </section>

                {/* Accent line */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover/step:w-full bg-linear-to-r from-primary to-transparent transition-all duration-500" />
              </section>

              {/* Arrow connector between steps */}
              {!isLast && (
                <div className="hidden lg:flex items-center justify-center px-2 shrink-0">
                  <IconArrowRight className="size-4 text-primary/40" />
                </div>
              )}
            </section>
          );
        })}
      </section>

      {/* Footer line */}
      <section className="flex items-center justify-center gap-2 text-muted-foreground">
        <IconShieldCheck className="size-3.5 text-primary/60 shrink-0" />
        <p className="text-[11px] tracking-wide">
          The more your friends play, the more you earn!
        </p>
      </section>
    </section>
  );
}
