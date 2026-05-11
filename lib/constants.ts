// Centralized auth configuration — change once, applied everywhere.

export const CSRF_CONFIG = {
  /** Cookie name for the double-submit CSRF token (non-httpOnly, readable by JS) */
  cookieName: "csrf_token",

  /** Secret used to HMAC-sign CSRF tokens — must be set in production */
  secret: process.env.CSRF_SECRET!,
} as const;

export const AUTH_CONFIG = {
  /** Base URL of your Rust authentication API */
  apiUrl: process.env.API_URL!,

  /** Name of the cookie set by the Rust API */
  cookieName: process.env.AUTH_COOKIE_NAME ?? "auth_token",

  /** How long (in seconds) to cache a validated session server-side */
  sessionCacheTtl: Number(process.env.SESSION_CACHE_TTL ?? 300),

  /** Routes that don't require authentication */
  publicRoutes: ["/", "/login", "/register", "/forgot-password", "/api/health"],

  /** Where to redirect unauthenticated users */
  loginPath: "/login",

  /** Where to redirect after successful login */
  defaultRedirect: "/",
} as const;
