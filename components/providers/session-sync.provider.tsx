"use client";

import { User } from "@/lib/auth/api.auth";
import { useEffect } from "react";
import { useSession } from "./session.provider";

type SessionSyncProps = {
  user: Partial<User> & Pick<User, "web_points" | "mileage_points">;
};

export function SessionSync({ user }: SessionSyncProps) {
  const { setUser } = useSession();

  useEffect(() => {
    setUser((prev) => ({
      ...prev,
      web_points: user.web_points,
      mileage_points: user.mileage_points,
    }));
  }, [user.web_points, user.mileage_points, setUser]);

  return null;
}
