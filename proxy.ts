import { type NextRequest, NextResponse } from "next/server";
import { AUTH_CONFIG } from "./lib/constants";

export function proxy(request: NextRequest) {
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

  return response;
}

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
