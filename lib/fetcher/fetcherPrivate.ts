"use server";

import { cookies } from "next/headers";
import { AUTH_CONFIG } from "../constants";

export async function fetcherPrivate(url: string, init?: RequestInit) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(AUTH_CONFIG.cookieName)?.value;

  return fetch(`${process.env.API_URL}${url}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Cookie: `${AUTH_CONFIG.cookieName}=${sessionCookie?.toString()}`,
      ...init?.headers,
    },
    signal: AbortSignal.timeout(30000),
    credentials: "include",
    ...init,
  });
}
