import { type NextRequest, NextResponse } from "next/server";
import { AUTH_CONFIG } from "./lib/constants";

export const CSRF_COOKIE = "csrf_token";

// ── Web-API helpers (Edge Runtime safe) ──────────────────────────────────────

function base64urlEncode(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

function base64urlDecode(str: string): Uint8Array {
  const base64 = str
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .padEnd(str.length + ((4 - (str.length % 4)) % 4), "=");
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function importHmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

// Returns "token.hmac" — the token is random bytes, the hmac signs it.
async function generateSignedToken(secret: string): Promise<string> {
  const tokenBytes = new Uint8Array(32);
  crypto.getRandomValues(tokenBytes);
  const token = base64urlEncode(tokenBytes);

  const key = await importHmacKey(secret);
  const sigBuffer = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(token),
  );

  return `${token}.${base64urlEncode(new Uint8Array(sigBuffer))}`;
}

// Verifies "token.hmac" was signed by our secret and returns the raw token.
async function verifySignedToken(
  signedToken: string,
  secret: string,
): Promise<string | null> {
  const dot = signedToken.lastIndexOf(".");
  if (dot === -1) return null;

  const token = signedToken.slice(0, dot);
  const signature = signedToken.slice(dot + 1);
  if (!token || !signature) return null;

  let sigBytes: ArrayBuffer;
  try {
    sigBytes = base64urlDecode(signature).buffer as ArrayBuffer;
  } catch {
    return null;
  }

  const key = await importHmacKey(secret);
  const valid = await crypto.subtle.verify(
    "HMAC",
    key,
    sigBytes,
    new TextEncoder().encode(token),
  );

  return valid ? token : null;
}

// ── CSRF validation for mutating API routes ───────────────────────────────────

async function validateCsrf(
  request: NextRequest,
  secret: string,
): Promise<NextResponse | null> {
  const isMutatingApiRoute =
    ["POST", "PUT", "PATCH", "DELETE"].includes(request.method) &&
    request.nextUrl.pathname.startsWith("/api/");

  if (!isMutatingApiRoute) return null;

  const csrfHeader = request.headers.get("x-csrf-token");
  const csrfCookie = request.cookies.get(CSRF_COOKIE)?.value;

  if (!csrfHeader || !csrfCookie) {
    return new NextResponse("CSRF validation failed", { status: 403 });
  }

  const rawToken = await verifySignedToken(csrfCookie, secret);
  if (!rawToken || csrfHeader !== rawToken) {
    return new NextResponse("CSRF validation failed", { status: 403 });
  }

  return null;
}

// ── Main proxy ────────────────────────────────────────────────────────────────

export async function proxy(request: NextRequest) {
  const secret = process.env.CSRF_SECRET;

  if (!secret) {
    console.error(
      "[CSRF] CSRF_SECRET env var is not set — CSRF protection is DISABLED",
    );
  }

  // Validate CSRF before any auth or routing logic.
  if (secret) {
    const csrfError = await validateCsrf(request, secret);
    if (csrfError) return csrfError;
  }

  const { pathname } = request.nextUrl;

  if (isPublicRoute(pathname) || isStaticAsset(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get(AUTH_CONFIG.cookieName);

  if (!token?.value) {
    const loginUrl = new URL(AUTH_CONFIG.loginPath, request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const response = NextResponse.next();

  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // Issue a CSRF cookie if the user doesn't have one yet.
  if (secret && !request.cookies.get(CSRF_COOKIE)?.value) {
    const signedToken = await generateSignedToken(secret);
    response.cookies.set(CSRF_COOKIE, signedToken, {
      httpOnly: false, // Must be readable by client JS to build the X-CSRF-Token header.
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, // 24 h
    });
  }

  return response;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function isPublicRoute(pathname: string): boolean {
  return AUTH_CONFIG.publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

function isStaticAsset(pathname: string): boolean {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/health") ||
    pathname.includes(".") // files with extensions (favicon.ico, images, etc.)
  );
}

// ─── Apply proxy to all routes except static files ───
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
