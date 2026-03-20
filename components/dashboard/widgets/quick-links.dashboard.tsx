import { cn } from "@/lib/utils";
import {
  IconBasketFilled,
  IconBrandDiscordFilled,
  IconBrandFacebookFilled,
  IconCoinFilled,
  IconTrophy,
  IconUser,
} from "@tabler/icons-react";
import Link from "next/link";

const LINKS = [
  {
    href: "/item-shop",
    label: "Item Shop",
    icon: IconBasketFilled,
    color: "text-primary hover:border-primary/40 hover:bg-primary/5",
  },
  {
    href: "/recharge",
    label: "Recharge",
    icon: IconCoinFilled,
    color: "text-yellow-400 hover:border-yellow-400/40 hover:bg-yellow-400/5",
  },
  {
    href: "/rankings",
    label: "Rankings",
    icon: IconTrophy,
    color: "text-amber-500 hover:border-amber-500/40 hover:bg-amber-500/5",
  },
  {
    href: "/profile",
    label: "My Profile",
    icon: IconUser,
    color: "text-blue-400 hover:border-blue-400/40 hover:bg-blue-400/5",
  },
] as const;

const SOCIAL_LINKS = [
  {
    env: "NEXT_PUBLIC_DISCORD_LINK",
    label: "Discord",
    icon: IconBrandDiscordFilled,
    color: "text-[#7289da] hover:border-[#7289da]/40 hover:bg-[#7289da]/5",
  },
  {
    env: "NEXT_PUBLIC_FACEBOOK_LINK",
    label: "Facebook",
    icon: IconBrandFacebookFilled,
    color: "text-[#3b5998] hover:border-[#3b5998]/40 hover:bg-[#3b5998]/5",
  },
] as const;

function QuickLinks() {
  return (
    <div className="col-span-1 md:col-span-3 lg:col-span-2 relative overflow-hidden shape-main border border-gray-800 bg-gray-950 h-max">
      {/* Header */}
      <div className="px-5 py-3 border-b border-gray-800 bg-gray-900/50">
        <h2 className="text-sm font-bold uppercase tracking-wider">
          Quick Links
        </h2>
      </div>

      {/* Links grid */}
      <div className="p-3 grid grid-cols-2 gap-2">
        {LINKS.map(({ href, label, icon: Icon, color }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex flex-col items-center justify-center gap-2 p-3 rounded-sm border border-gray-800 bg-gray-900/30",
              "transition-all duration-200",
              color,
            )}
          >
            <Icon className="size-5" />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-300">
              {label}
            </span>
          </Link>
        ))}
        {SOCIAL_LINKS.map(({ env, label, icon: Icon, color }) => {
          const href = process.env[env];
          if (!href) return null;
          return (
            <Link
              key={env}
              href={href}
              target="_blank"
              className={cn(
                "flex flex-col items-center justify-center gap-2 p-3 rounded-sm border border-gray-800 bg-gray-900/30",
                "transition-all duration-200",
                color,
              )}
            >
              <Icon className="size-5" />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-300">
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export { QuickLinks };
