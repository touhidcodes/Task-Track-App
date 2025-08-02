import { instance as axiosInstance } from "@/helpers/axios/axiosInstance";

export const getNewAccessToken = async () => {
  return await axiosInstance({
    url: `${process.env.NEXT_PUBLIC_LOCAL_URL}/refresh-token`,
    // url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/refresh-token`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
};
