import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Define route configurations
const routeConfig = {
  // Public routes - no authentication required
  publicRoutes: [
    "/",
    "/auth",
    "/unauthorized",
    "/about",
    "/contact",
    "/terms",
    "/privacy",
  ],

  // Protected routes that require authentication but no specific role
  protectedRoutes: ["/profile", "/settings", "/notifications"],

  // Role-based routes
  roleBasedRoutes: {
    INSTRUCTOR: [
      "/dashboard/instructor",
      "/dashboard/instructor/assignments",
      "/dashboard/instructor/assignments/add",
      "/dashboard/instructor/courses",
      "/dashboard/instructor/students",
      "/dashboard/instructor/analytics",
      "/dashboard/instructor/settings",
      "/courses/create",
      "/courses/edit",
      "/courses/manage",
    ],
    STUDENT: [
      "/dashboard/student",
      "/dashboard/student/courses",
      "/dashboard/student/progress",
      "/dashboard/student/certificates",
      "/dashboard/student/settings",
      "/courses/enrolled",
      "/courses/browse",
      "/booking",
      "/checkout",
      "/review",
    ],
  },

  // Shared routes - accessible by multiple roles
  sharedRoutes: {
    "INSTRUCTOR,STUDENT": ["/courses/view", "/messages", "/help", "/support"],
  },
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  console.log(`🔍 Middleware: Checking route: ${pathname}`);

  // 🔹 1. Get NextAuth session token
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  console.log("🎫 Token exists:", !!token);
  if (token) {
    console.log("👤 User role:", token.role);
    console.log("📧 User email:", token.email);
  }

  // 🔹 2. Handle public routes (accessible without authentication)
  if (isPublicRoute(pathname)) {
    console.log("🌍 Public route - allowing access");
    return NextResponse.next();
  }

  // 🔹 3. If no token and route requires auth, redirect to login
  if (!token) {
    console.log("❌ No token - redirecting to auth");
    const loginUrl = new URL("/auth", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 🔹 4. Redirect authenticated users away from auth pages
  if (pathname.startsWith("/auth")) {
    console.log(
      "🔄 Authenticated user on auth page - redirecting to dashboard"
    );
    const redirectUrl = getDashboardUrl(token.role as string);
    return NextResponse.redirect(new URL(redirectUrl, req.url));
  }

  // 🔹 5. Check role-based route access
  const userRole = token.role as string;

  // Check if user has access to this route
  if (hasRouteAccess(pathname, userRole)) {
    console.log("✅ Route access granted");
    return NextResponse.next();
  }

  // 🔹 6. Check if it's a protected route (requires auth but no specific role)
  if (isProtectedRoute(pathname)) {
    console.log("✅ Protected route access granted (authenticated user)");
    return NextResponse.next();
  }

  // 🔹 7. Unauthorized access - handle gracefully
  console.log(
    `❌ Unauthorized access: ${userRole} trying to access ${pathname}`
  );

  // Option 1: Redirect to unauthorized page with details
  if (isRoleBasedRoute(pathname) && !hasRouteAccess(pathname, userRole)) {
    console.log("🚫 Role-based route access denied");
    const unauthorizedUrl = new URL("/unauthorized", req.url);
    unauthorizedUrl.searchParams.set("reason", "insufficient_permissions");
    unauthorizedUrl.searchParams.set(
      "required_role",
      getRequiredRole(pathname)
    );
    unauthorizedUrl.searchParams.set("user_role", userRole);
    return NextResponse.redirect(unauthorizedUrl);
  }

  // Option 2: Fallback to user's dashboard
  console.log("🔄 Redirecting to user dashboard");
  const fallbackUrl = getDashboardUrl(userRole);
  return NextResponse.redirect(new URL(fallbackUrl, req.url));
}

// Helper function to check if route is public
function isPublicRoute(pathname: string): boolean {
  return routeConfig.publicRoutes.some((route) => {
    if (route === pathname) return true;
    // Support for dynamic routes like /about/terms
    if (route.endsWith("*")) {
      const baseRoute = route.replace("*", "");
      return pathname.startsWith(baseRoute);
    }
    return false;
  });
}

// Helper function to check if route is protected (requires auth but no specific role)
function isProtectedRoute(pathname: string): boolean {
  return routeConfig.protectedRoutes.some((route) => {
    return pathname.startsWith(route);
  });
}

// Helper function to check if user has access to a specific route
function hasRouteAccess(pathname: string, userRole: string): boolean {
  // Check role-based routes
  const roleRoutes =
    routeConfig.roleBasedRoutes[
      userRole as keyof typeof routeConfig.roleBasedRoutes
    ];
  if (roleRoutes) {
    const hasRoleAccess = roleRoutes.some((route) =>
      pathname.startsWith(route)
    );
    if (hasRoleAccess) return true;
  }

  // Check shared routes
  for (const [roles, routes] of Object.entries(routeConfig.sharedRoutes)) {
    if (roles.split(",").includes(userRole)) {
      const hasSharedAccess = routes.some((route) =>
        pathname.startsWith(route)
      );
      if (hasSharedAccess) return true;
    }
  }

  return false;
}

// Helper function to get dashboard URL based on role
function getDashboardUrl(role: string): string {
  switch (role) {
    case "INSTRUCTOR":
      return "/dashboard/instructor";
    case "STUDENT":
      return "/dashboard/student";
    default:
      return "/dashboard/student"; // Default fallback
  }
}

// Helper function to check if route is role-based
function isRoleBasedRoute(pathname: string): boolean {
  const allRoleRoutes = Object.values(routeConfig.roleBasedRoutes).flat();
  return allRoleRoutes.some((route) => pathname.startsWith(route));
}

// Helper function to get required role for a route
function getRequiredRole(pathname: string): string {
  for (const [role, routes] of Object.entries(routeConfig.roleBasedRoutes)) {
    if (routes.some((route) => pathname.startsWith(route))) {
      return role;
    }
  }
  return "UNKNOWN";
}

// More specific matcher to avoid unnecessary middleware runs
export const config = {
  matcher: [
    // Include all routes except static files and API routes
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
