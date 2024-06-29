import { type NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/"];

export default function middleware(request: NextRequest) {
  const session = request.cookies.get("user_session")?.value || "";

  // Redirect to home if session is set and user tries to access root
  if (session && request.nextUrl.pathname === "/login") {
    const absoluteURL = new URL("/", request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}
