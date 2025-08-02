import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    error?: string | Record<string, unknown>;
    user: {
      id: string;
      email: string;
      name: string;
      role: "INSTRUCTOR" | "STUDENT";
    };
  }

  interface User {
    id: string;
    email: string;
    username: string;
    role: "INSTRUCTOR" | "STUDENT";
    accessToken: string;
    refreshToken?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    refreshToken?: string | null;
    role: "INSTRUCTOR" | "STUDENT";
    error?: string;
  }
}
