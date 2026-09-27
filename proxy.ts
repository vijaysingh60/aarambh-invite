import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

const VIEWER_ALLOWED_PATHS = ["/admin/attendees", "/admin/login", "/class-login"];

export default auth((req) => {
  const role = (req.auth?.user as { role?: string } | undefined)?.role;
  if (role !== "VIEWER") return;

  const { pathname } = req.nextUrl;
  if (VIEWER_ALLOWED_PATHS.some((p) => pathname === p)) return;

  return NextResponse.redirect(new URL("/admin/attendees", req.url));
});

export const config = {
  matcher: ["/admin/:path*"],
};
