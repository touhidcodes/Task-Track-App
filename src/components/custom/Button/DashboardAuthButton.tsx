"use client";

import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signOut } from "next-auth/react"; // <--- import signOut here
import TextLoading from "../Loading/TextLoading";

const DashboardAuthButton = () => {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogOut = async () => {
    setIsLoggingOut(true);
    try {
      await signOut({ redirect: false });
      router.push("/");
    } catch (error) {
      console.error("Logout failed", error);
      setIsLoggingOut(false);
    }
  };

  if (isLoggingOut) {
    return <TextLoading />;
  }

  return (
    <Button
      onClick={handleLogOut}
      variant="outline"
      className="text-white px-6 py-3 rounded-full font-medium transition-all duration-200 group bg-[#1C2D37] hover:bg-slate-700 hover:text-white"
    >
      <span className="font-medium">Log Out</span>
      <LogOutIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Button>
  );
};

export default DashboardAuthButton;
