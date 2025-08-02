import axios from "axios";
import { getSession, signOut } from "next-auth/react";

// Create Axios instance
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 60000,
});

// Token refresh state
let isRefreshing = false;
let refreshSubscribers = [] as ((token: string) => void)[];

const subscribeTokenRefresh = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

// === Request Interceptor ===
instance.interceptors.request.use(
  async (config) => {
    // Get session from NextAuth instead of cookies
    const session = await getSession();

    if (session?.accessToken) {
      config.headers.Authorization = session.accessToken;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// === Response Interceptor ===
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check for 401 (Unauthorized) instead of 500
    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          // Try to refresh the session
          const session = await getSession();

          if (session?.error === "RefreshAccessTokenError") {
            // If refresh failed, sign out the user
            await signOut({ callbackUrl: "/auth" });
            return Promise.reject(error);
          }

          // If we have a valid session, retry the request
          if (session?.accessToken) {
            onRefreshed(session.accessToken);
            isRefreshing = false;

            // Retry the original request
            originalRequest.headers.Authorization = `Bearer ${session.accessToken}`;
            return instance(originalRequest);
          }
        } catch (err) {
          isRefreshing = false;
          console.error("Token refresh failed:", err);
          await signOut({ callbackUrl: "/auth" });
          return Promise.reject(err);
        }
      }

      // If already refreshing, wait for it to complete
      return new Promise((resolve, reject) => {
        subscribeTokenRefresh((newAccessToken) => {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          resolve(instance(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  }
);

export { instance };
