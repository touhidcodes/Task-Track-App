// Helper function to refresh access token
export async function refreshAccessToken(refreshToken: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Token refresh failed");
    }

    return {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };
  } catch (error) {
    console.error("Refresh token error:", error);
    throw error;
  }
}
