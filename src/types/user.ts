export interface TUser {
  id: string;
  email: string;
  name: string;
  role: "INSTRUCTOR" | "STUDENT";
  accessToken: string;
  refreshToken?: string | null;
}
