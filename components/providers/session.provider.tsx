"use client";

import { User } from "@/lib/auth/api.auth";
import { createContext, PropsWithChildren, useContext, useMemo } from "react";

type SessionContextProps = {
  user: User;
  expiresAt: string;
  isAdmin: boolean;
};

const SessionContext = createContext<SessionContextProps | null>(null);

export function SessionProvider({
  expiresAt,
  user,
  children,
}: PropsWithChildren<Omit<SessionContextProps, "isAdmin">>) {
  console.log({ user });
  const value = useMemo<SessionContextProps>(
    () => ({
      user,
      expiresAt,
      isAdmin: user.role === "admin",
    }),
    [user, expiresAt],
  );

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSession(): SessionContextProps {
  const ctx = useContext(SessionContext);

  if (!ctx) {
    throw new Error(
      "useSession() must be used within a SessionProvider. Make sure your component is inside the (auth) route group.",
    );
  }

  return ctx;
}
