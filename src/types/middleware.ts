import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    // Redirect authenticated users from auth page
    if (pathname.startsWith("/auth") && token) {
      const redirectUrl =
        token.role === "INSTRUCTOR"
          ? "/dashboard/instructor"
          : "/dashboard/student";
      return NextResponse.redirect(new URL(redirectUrl, req.url));
    }

    // Role-based access control
    if (
      pathname.startsWith("/dashboard/instructor") &&
      token?.role !== "INSTRUCTOR"
    ) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    if (
      pathname.startsWith("/dashboard/student") &&
      token?.role !== "STUDENT"
    ) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        const publicRoutes = ["/", "/auth", "/unauthorized"];

        if (publicRoutes.includes(pathname)) return true;
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)", "/"],
};
