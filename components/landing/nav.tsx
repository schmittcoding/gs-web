"use client"

import { useState } from "react"
import { DownloadSimple, List, Sword, X } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Classes", href: "#classes" },
  { label: "Content", href: "#content" },
  { label: "News", href: "#news" },
  { label: "Shop", href: "#shop" },
]

export function LandingNav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--color-cod-gray-800)] bg-background/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <nav className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex select-none items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded border border-primary/30 bg-primary/10">
              <Sword size={16} weight="fill" className="text-primary" />
            </div>
            <span className="font-black text-lg tracking-widest uppercase">
              <span className="text-primary">RAN</span>
              <span className="text-foreground">GS</span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-semibold uppercase tracking-widest text-[var(--color-cod-gray-400)] transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden items-center gap-2 md:flex">
            <Button variant="ghost" size="sm" className="text-[var(--color-cod-gray-400)]">
              Sign In
            </Button>
            <Button size="sm">
              <DownloadSimple data-icon="inline-start" weight="bold" />
              Download
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            className="rounded p-1 text-foreground transition-colors hover:text-primary md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation"
          >
            {open ? <X size={22} /> : <List size={22} />}
          </button>
        </nav>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "overflow-hidden border-t border-[var(--color-cod-gray-800)] bg-background transition-all duration-200 md:hidden",
          open ? "max-h-96" : "max-h-0"
        )}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-[var(--color-cod-gray-900)] py-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-cod-gray-400)] transition-colors hover:text-foreground last:border-0"
            >
              {link.label}
            </a>
          ))}
          <div className="flex flex-col gap-2 pt-3">
            <Button variant="ghost" size="sm" className="justify-start text-[var(--color-cod-gray-400)]">
              Sign In
            </Button>
            <Button size="sm">
              <DownloadSimple data-icon="inline-start" weight="bold" />
              Download Free
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
