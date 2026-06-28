import { NextResponse, type NextRequest } from "next/server";

const PUBLIC_ADMIN_PATHS = ["/admin/login", "/admin/forgot-password"];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  if (!path.startsWith("/admin") || PUBLIC_ADMIN_PATHS.includes(path)) return NextResponse.next();
  const token = request.cookies.get("hvac_admin_token")?.value;
  if (!token) return NextResponse.redirect(new URL("/admin/login", request.url));
  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*"] };
