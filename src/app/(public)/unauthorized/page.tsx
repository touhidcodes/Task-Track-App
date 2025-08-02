// app/unauthorized/page.tsx
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Shield, ArrowLeft, User, AlertTriangle } from "lucide-react";

const UnauthorizedPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session } = useSession();

  const reason = searchParams.get("reason");
  const requiredRole = searchParams.get("required_role");
  const userRole = searchParams.get("user_role");

  const getDashboardUrl = () => {
    if (session?.user?.role === "INSTRUCTOR") {
      return "/dashboard/instructor";
    }
    return "/dashboard/student";
  };

  const getErrorMessage = () => {
    switch (reason) {
      case "insufficient_permissions":
        return {
          title: "Access Restricted",
          description: `This page requires ${requiredRole} privileges. You are currently logged in as a ${userRole}.`,
          icon: <Shield className="w-16 h-16 text-red-500" />,
        };
      case "session_expired":
        return {
          title: "Session Expired",
          description:
            "Your session has expired. Please log in again to continue.",
          icon: <AlertTriangle className="w-16 h-16 text-yellow-500" />,
        };
      default:
        return {
          title: "Access Denied",
          description: "You don't have permission to access this page.",
          icon: <Shield className="w-16 h-16 text-red-500" />,
        };
    }
  };

  const { title, description, icon } = getErrorMessage();

  const handleGoToDashboard = () => {
    router.push(getDashboardUrl());
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleSwitchRole = () => {
    // If you want to allow role switching, implement this
    // For now, redirect to dashboard
    router.push(getDashboardUrl());
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">{icon}</div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{title}</h1>

        {/* Description */}
        <p className="text-gray-600 mb-6">{description}</p>

        {/* User Info */}
        {session?.user && (
          <div className="bg-gray-100 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-700">
              <User className="w-4 h-4" />
              <span>
                Logged in as: <strong>{session.user.role}</strong>
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">{session.user.email}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button onClick={handleGoToDashboard} className="w-full">
            Go to My Dashboard
          </Button>

          <Button onClick={handleGoBack} variant="outline" className="w-full">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>

          {/* Optional: Add role switching if you implement it */}
          {requiredRole && userRole && requiredRole !== userRole && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700 mb-2">
                Need {requiredRole} access?
              </p>
              <Button
                onClick={handleSwitchRole}
                variant="outline"
                size="sm"
                className="text-blue-600 border-blue-300 hover:bg-blue-100"
              >
                Contact Administrator
              </Button>
            </div>
          )}
        </div>

        {/* Help Text */}
        <div className="mt-6 text-xs text-gray-500">
          If you believe this is an error, please contact your administrator.
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
