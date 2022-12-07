import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const token = await getToken({ req });

  if (pathname.startsWith("/app") && !token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (pathname.startsWith("/api/user") && !token) {
    return NextResponse.redirect(new URL("/api/unauthorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/user/:path*", "/app/:path*"],
};
