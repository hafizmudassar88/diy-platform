// middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Protect ONLY `/templete`
  if (pathname === "/templete" || pathname === "/templete/") {
    const authCookie = request.cookies.get("authToken")?.value; // Replace with your cookie name

    if (!authCookie) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/templete/?$"],
};
