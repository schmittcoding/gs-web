import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { AUTH_CONFIG } from "../constants";
import { SessionPayload, validateToken } from "./api.auth";

/**
 * Retrieves the current user session from cookies.
 *
 * This function is cached and asynchronously validates the authentication token
 * stored in cookies. If no token is present or validation fails, returns null.
 *
 * @returns {Promise<SessionPayload | null>} A promise that resolves to the session payload if a valid token exists, or null if no token is found or validation fails.
 */
export const getSession = cache(async (): Promise<SessionPayload | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_CONFIG.cookieName)?.value;

  if (!token) return null;

  return validateToken(token);
});

/**
 * Retrieves the current session and ensures the user is authenticated.
 *
 * @returns {Promise<SessionPayload>} The current session payload if the user is authenticated.
 * @throws {RedirectError} Redirects to the login path if no session exists.
 *
 * @example
 * ```ts
 * const session = await requireSession();
 * ```
 */
export async function requireSession(): Promise<SessionPayload> {
  const session = await getSession();

  if (!session) {
    redirect(AUTH_CONFIG.loginPath);
  }

  return session;
}
