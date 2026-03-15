"use client";

import { User } from "@/lib/auth/api.auth";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type SessionContextProps = {
  user: User;
  expiresAt: string;
  isAdmin: boolean;
  setUser: (user: User | ((prev: User) => User)) => void;
};

const SessionContext = createContext<SessionContextProps | null>(null);

export function SessionProvider({
  expiresAt,
  user: initialUser,
  children,
}: PropsWithChildren<{ expiresAt: string; user: User }>) {
  const [user, setUserState] = useState<User>(initialUser);

  const setUser = useCallback(
    (update: User | ((prev: User) => User)) => setUserState(update),
    [],
  );

  const value = useMemo<SessionContextProps>(
    () => ({
      user,
      expiresAt,
      isAdmin: user.user_role.toLowerCase() === "admin",
      setUser,
    }),
    [user, expiresAt, setUser],
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
