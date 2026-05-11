import "server-only";

import { headers } from "next/headers";

// Domains allowed to invoke server actions.
// Must match next.config.ts serverActions.allowedOrigins exactly.
const ALLOWED_ORIGINS = new Set([
  "https://dashboard.ranonlinegs.com",
  ...(process.env.NODE_ENV !== "production"
    ? ["http://localhost:3000", "http://ranonlinegs.local:3000"]
    : []),
]);

/**
 * Validates the Origin header inside a server action.
 *
 * Next.js already enforces allowedOrigins at the framework level, but an
 * attacker on a same-eTLD+1 subdomain (e.g. promo.ranonlinegs.com) can bypass
 * sameSite=lax cookies. This provides an explicit, in-action check as a
 * defense-in-depth layer.
 *
 * Throws a plain Error (surfaces as a 500 to the client) when the origin is
 * present but not in the allowlist.
 */
export async function requireCsrf(): Promise<void> {
  const headersList = await headers();
  const origin = headersList.get("origin");

  // No Origin header means a same-origin browser request — allow it.
  if (!origin) return;

  if (!ALLOWED_ORIGINS.has(origin)) {
    throw new Error("Forbidden: cross-origin request rejected");
  }
}
