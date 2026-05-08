"use client";

import { cn } from "@/lib/utils";
import type { EventCategory } from "@/types/event";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

type Tab = { label: string; href: string; type: string };

const ALL_TABS: Tab[] = [
  { label: "Schedule", href: "", type: "" },
  { label: "Guild vs Guild", href: "/leaderboard?type=gvg", type: "gvg" },
  { label: "King of the Hill", href: "/leaderboard?type=koth", type: "koth" },
  { label: "Snapshots", href: "/snapshots", type: "" },
];

function getTabsForCategory(category: EventCategory): Tab[] {
  switch (category) {
    case "gvg_koth":
      return ALL_TABS;
    case "gvg":
      return ALL_TABS.filter((t) => t.type !== "koth");
    case "koth":
      return ALL_TABS.filter((t) => t.type !== "gvg");
    default:
      return [];
  }
}

type EventTabNavProps = {
  eventSlug: string;
  eventCategory: EventCategory;
};

export default function EventTabNav({
  eventSlug,
  eventCategory,
}: EventTabNavProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const base = `/events/${eventSlug}`;
  const tabs = getTabsForCategory(eventCategory);

  if (tabs.length === 0) return null;

  return (
    <nav className="flex flex-wrap gap-2 mb-4">
      {tabs.map(({ label, href, type: eventType }) => {
        const fullHref = `${base}${href}`;
        const typeParam = searchParams.get("type");

        const isActive =
          href === ""
            ? pathname === base
            : typeParam
              ? fullHref.startsWith(pathname) &&
                typeParam.toLowerCase() === eventType.toLowerCase()
              : pathname === fullHref;
        return (
          <Link
            key={label}
            href={fullHref}
            className={cn(
              "relative inline-flex items-center gap-2 py-2 px-6 text-sm cursor-pointer outline-none whitespace-nowrap shape-main transition-colors duration-300 bg-gray-900",
              "before:absolute before:bottom-0 before:left-0 before:size-2 before:border-b-2 before:border-l-2 before:border-gray-900",
              "after:absolute after:top-0 after:right-0 after:size-2 after:border-t-2 after:border-r-2 after:border-gray-900",
              isActive
                ? "bg-primary text-primary-foreground before:border-primary after:border-primary"
                : "text-muted-foreground hover:bg-primary/90 hover:text-primary-foreground hover:before:border-primary/90 hover:after:border-primary/90",
            )}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
