import {
  DiscordLogo,
  DownloadSimple,
  FacebookLogo,
  Sword,
  YoutubeLogo,
} from "@phosphor-icons/react/dist/ssr"

import { Button } from "@/components/ui/button"

const FOOTER_LINKS = {
  Game: ["Download", "Patch Notes", "Game Guide", "Classes", "Dungeons"],
  Account: ["Register", "Sign In", "Item Mall", "Top-Up", "Support"],
  Community: ["Discord", "Facebook", "Forum", "Rankings", "Events"],
}

const SOCIAL = [
  { icon: DiscordLogo, label: "Discord", href: "#" },
  { icon: FacebookLogo, label: "Facebook", href: "#" },
  { icon: YoutubeLogo, label: "YouTube", href: "#" },
]

export function LandingFooter() {
  return (
    <footer className="border-t border-[var(--color-cod-gray-800)] bg-[var(--color-cod-gray-950)]">
      {/* Download CTA strip */}
      <div className="border-b border-[var(--color-cod-gray-800)] bg-primary/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-center md:flex-row md:text-left md:px-8">
          <div>
            <p className="font-black text-lg uppercase tracking-tight text-foreground">
              Join 10,000+ Warriors Today
            </p>
            <p className="text-sm text-[var(--color-cod-gray-500)]">
              Free to play · No pay-to-win · Your campus awaits
            </p>
          </div>
          <Button size="lg" className="h-11 gap-2 px-8 text-sm font-bold uppercase tracking-wider">
            <DownloadSimple size={18} data-icon="inline-start" weight="bold" />
            Download Free
          </Button>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <div className="grid gap-10 md:grid-cols-[auto_1fr]">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded border border-primary/30 bg-primary/10">
                <Sword size={16} weight="fill" className="text-primary" />
              </div>
              <span className="font-black text-lg tracking-widest uppercase">
                <span className="text-primary">RAN</span>
                <span className="text-foreground">GS</span>
              </span>
            </div>
            <p className="max-w-[200px] text-xs leading-relaxed text-[var(--color-cod-gray-600)]">
              Urban warfare forged in code. A private Ran Online server built by veterans, for veterans.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-2">
              {SOCIAL.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded border border-[var(--color-cod-gray-800)] text-[var(--color-cod-gray-500)] transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
            {Object.entries(FOOTER_LINKS).map(([group, links]) => (
              <div key={group}>
                <p className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-cod-gray-600)]">
                  {group}
                </p>
                <ul className="flex flex-col gap-2">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-xs text-[var(--color-cod-gray-500)] transition-colors hover:text-foreground"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-[var(--color-cod-gray-800)] pt-6 md:flex-row">
          <p className="text-[10px] text-[var(--color-cod-gray-700)]">
            © 2026 RanGS. Not affiliated with Gravity Co., Ltd. or Level Up! Games.
          </p>
          <div className="flex gap-4 text-[10px] text-[var(--color-cod-gray-700)]">
            <a href="#" className="hover:text-[var(--color-cod-gray-500)] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[var(--color-cod-gray-500)] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
