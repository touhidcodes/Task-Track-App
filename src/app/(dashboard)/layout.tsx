"use client";

import { useState } from "react";
import { PanelRightOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Sidebar from "@/components/dashboard/SideBar/SideBar";
import DynamicBreadcrumb from "@/components/custom/Breadcrumb/DynamicBreadcrumb";
import DashboardAuthButton from "@/components/custom/Button/DashboardAuthButton";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        isCollapsed={!sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content */}
      <div
        className={cn(
          "flex flex-col flex-1 transition-all duration-300",
          sidebarOpen ? "lg:ml-64" : "lg:ml-20"
        )}
      >
        {/* Header */}
        <header className="relative z-50 flex items-center justify-between px-4 py-3 border-b bg-white">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
              <PanelRightOpen className="w-7 h-7" />
            </Button>
            <span className="font-semibold text-lg hidden md:block text-black">
              <DynamicBreadcrumb />
            </span>
          </div>
          <DashboardAuthButton />
        </header>

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
