import { NextResponse, type NextRequest } from "next/server";

import {
  ADMIN_SESSION_COOKIE,
  verifyAdminSessionToken,
} from "@/shared/lib/admin-session";

const PUBLIC_ADMIN_PATHS = ["/admin/login", "/api/admin/auth/login"];

function isPublicAdminPath(pathname: string): boolean {
  return PUBLIC_ADMIN_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}

function requiresAdminAuth(pathname: string): boolean {
  if (pathname.startsWith("/admin") && !isPublicAdminPath(pathname)) {
    return true;
  }
  if (pathname.startsWith("/api/admin/") && !isPublicAdminPath(pathname)) {
    return true;
  }
  return false;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin") {
    const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
    const session = token ? await verifyAdminSessionToken(token) : null;
    if (!session) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if (!requiresAdminAuth(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const session = token ? await verifyAdminSessionToken(token) : null;

  if (session) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/admin/")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = "/admin/login";
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/api/admin/:path*"],
};
