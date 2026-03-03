"use client";

import { User } from "@/lib/auth/api.auth";
import { IconMenu2 } from "@tabler/icons-react";
import Image from "next/image";
import Coin from "../common/coin";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { useSidebar } from "../ui/sidebar";

type DashboardHeaderProps = {
  user: User;
};

export default function DashboardHeader({ user }: DashboardHeaderProps) {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="flex justify-between w-full px-5 pt-4 h-max">
      <section className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon-sm"
          className="md:hidden"
          onClick={toggleSidebar}
        >
          <IconMenu2 />
          <span className="sr-only">Open menu</span>
        </Button>
        <Image src="/logo.png" alt="Ran Online GS" width={150} height={72} />
      </section>
      <section className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Avatar size="lg">
            <AvatarFallback className="shape-hexagon bg-primary text-primary-foreground">
              K
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold text-gray-400 uppercase">
              {user.user_name}
            </p>
            <Coin
              className="flex-row-reverse gap-1"
              size="sm"
              value={user.web_points}
            />
          </div>
        </div>
      </section>
    </header>
  );
}
