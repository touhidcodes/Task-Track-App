import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Define route configurations
const routeConfig = {
  // Public routes - no authentication required
  publicRoutes: ["/", "/auth", "/about", "/contact", "/terms", "/privacy"],

  // Role-based routes
  roleBasedRoutes: {
    INSTRUCTOR: [
      "/dashboard/instructor",
      "/courses/create",
      "/courses/edit",
      "/courses/manage",
    ],
    STUDENT: [
      "/dashboard/student",
      "/courses/enrolled",
      "/courses/browse",
      "/booking",
      "/checkout",
      "/review",
    ],
  },

  // Shared routes - accessible by multiple roles
  sharedRoutes: [
    "/assignments",
    "/settings",
    "/notifications",
    "/courses/view",
    "/messages",
    "/help",
    "/support",
  ],
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip middleware for static files and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Get NextAuth session token
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const userRole = token?.role as string;

  // Allow public routes
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // If no token, redirect to auth
  if (!token) {
    return redirectToAuth(req, pathname);
  }

  // Redirect authenticated users away from auth pages
  if (pathname.startsWith("/auth")) {
    const dashboardUrl = getDashboardUrl(userRole);
    return NextResponse.redirect(new URL(dashboardUrl, req.url));
  }

  // Check if user has access to this route
  if (hasRouteAccess(pathname, userRole)) {
    return NextResponse.next();
  }

  // If route is not found or unauthorized, redirect to auth
  return redirectToAuth(req, pathname);
}

// Helper function to redirect to auth page
function redirectToAuth(req: NextRequest, pathname: string) {
  const authUrl = new URL("/auth", req.url);
  authUrl.searchParams.set("callbackUrl", pathname);
  return NextResponse.redirect(authUrl);
}

// Helper function to check if route is public
function isPublicRoute(pathname: string): boolean {
  return routeConfig.publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );
}

// Helper function to check if user has access to a specific route
function hasRouteAccess(pathname: string, userRole: string): boolean {
  // Check shared routes first
  if (routeConfig.sharedRoutes.some((route) => pathname.startsWith(route))) {
    return true;
  }

  // Check role-based routes
  const roleRoutes =
    routeConfig.roleBasedRoutes[
      userRole as keyof typeof routeConfig.roleBasedRoutes
    ];
  if (roleRoutes?.some((route) => pathname.startsWith(route))) {
    return true;
  }

  return false;
}

// Helper function to get dashboard URL based on role
function getDashboardUrl(role: string): string {
  switch (role) {
    case "INSTRUCTOR":
      return "/dashboard/instructor/overview";
    case "STUDENT":
      return "/dashboard/student/overview";
    default:
      return "/dashboard/student/overview";
  }
}

export const config = {
  matcher: [
    // Include all routes except static files and API routes
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
