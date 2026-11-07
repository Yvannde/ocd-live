import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_DEMO_COOKIE, ADMIN_DEMO_VALUE } from "@/lib/admin-auth";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  if (pathname === "/admin/connexion") {
    const token = request.cookies.get(ADMIN_DEMO_COOKIE)?.value;
    if (token === ADMIN_DEMO_VALUE) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  const token = request.cookies.get(ADMIN_DEMO_COOKIE)?.value;
  if (token !== ADMIN_DEMO_VALUE) {
    return NextResponse.redirect(new URL("/admin/connexion", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
