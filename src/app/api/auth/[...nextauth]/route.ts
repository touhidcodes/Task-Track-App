import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { userLogin } from "@/services/actions/userLogin";
import { refreshAccessToken } from "@/services/actions/refreshAccessToken";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        identifier: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.identifier || !credentials?.password) {
          return null;
        }

        try {
          const response = await userLogin({
            identifier: credentials.identifier,
            password: credentials.password,
          });

          if (response?.data?.token && response?.data?.id) {
            return {
              id: response.data.id,
              email: response.data.email,
              username: response.data.username,
              role: response.data.role,
              accessToken: response.data.token,
            };
          }

          console.error(
            "Login failed:",
            response?.message || "Invalid credentials"
          );
          return null;
        } catch (error: any) {
          console.error("Login error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          role: user.role,
        };
      }

      if (token.refreshToken && isTokenExpired(token.accessToken)) {
        console.log("Token expired, attempting refresh...");
        try {
          const refreshedTokens = await refreshAccessToken(token.refreshToken);
          return {
            ...token,
            accessToken: refreshedTokens.accessToken,
            refreshToken: refreshedTokens.refreshToken || token.refreshToken,
          };
        } catch (error) {
          return { ...token, error: "RefreshAccessTokenError" };
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub as string;
        (session.user.email = token.email as string),
          (session.user.role = token.role);
        session.accessToken = token.accessToken;

        if (token.error) {
          session.error = token.error;
        }
      }

      return session;
    },
  },
  pages: {
    signIn: "/auth",
    error: "/auth",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
