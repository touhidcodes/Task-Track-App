"use client";

import { useSession } from "next-auth/react";

export function useAuth() {
  const { data: session, status } = useSession();

  return {
    user: session?.user,
    isLoading: status === "loading",
    isAuthenticated: !!session,
    isInstructor: session?.user?.role === "INSTRUCTOR",
    isStudent: session?.user?.role === "STUDENT",
    accessToken: session?.accessToken,
  };
}
