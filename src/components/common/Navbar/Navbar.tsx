"use client";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Menu, Plus, LogOut, ArrowRight, LogIn } from "lucide-react";

// Desktop Navigation
const DesktopNav = ({ session }: { session: any }) => {
  const dashboardHref =
    session?.user?.role === "INSTRUCTOR"
      ? "/dashboard/instructor/overview"
      : "/dashboard/student/overview";

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Assignments", href: "/assignments" },
    { name: "About", href: "/about" },
    session && { name: "Dashboard", href: dashboardHref },
  ].filter(Boolean) as { name: string; href: string }[];

  return (
    <NavigationMenu>
      <NavigationMenuList className="flex-row items-center gap-8">
        {menuItems.map((item) => (
          <NavigationMenuItem key={item.name}>
            <NavigationMenuLink asChild>
              <Link
                href={item.href}
                className="block text-sm font-medium text-white/80 hover:text-white transition-colors duration-200 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-200 group-hover:w-full"></span>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

// Mobile Navigation
const MobileNav = ({
  session,
  handleLogout,
}: {
  session: any;
  handleLogout: () => void;
}) => {
  const dashboardHref =
    session?.user?.role === "INSTRUCTOR"
      ? "/dashboard/instructor/overview"
      : "/dashboard/student/overview";

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Assignments", href: "/assignments" },
    { name: "About", href: "/about" },
    session && { name: "Dashboard", href: dashboardHref },
  ].filter(Boolean) as { name: string; href: string }[];

  return (
    <div className="flex flex-col space-y-4 mt-6">
      {menuItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 py-2"
        >
          {item.name}
        </Link>
      ))}

      {/* Mobile Auth Section */}
      <div className="border-t pt-4 mt-4 space-y-3">
        {session ? (
          <>
            <div className="text-xs text-gray-500">
              Signed in as{" "}
              <span className="font-medium">
                {session.user?.name || session.user?.email}
              </span>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="w-full justify-start"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </>
        ) : (
          <Link href="/auth">
            <Button className="w-full">Sign In</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

// Main Navbar
const Navbar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  const handleAddAssignment = () => {
    if (session?.user?.role === "INSTRUCTOR") {
      router.push("/dashboard/instructor/assignments/add");
    } else {
      router.push("/assignments");
    }
  };

  const getAddButtonText = () => {
    return session?.user?.role === "INSTRUCTOR"
      ? "Add Assignment"
      : "View Assignments";
  };

  return (
    <nav className="h-16 bg-[#1C2D37] border-b border-white/10 shadow-lg">
      <div className="h-full flex items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">T</span>
          </div>
          <span className="font-bold text-lg text-white">Task Track</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:block">
          <DesktopNav session={session} />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Add Assignment Button - Only show if logged in */}
          {session && (
            <Button
              variant="outline"
              className="bg-transparent border-slate-600 text-white hover:bg-white hover:text-primary hover:border-white rounded-full px-6 py-2 font-medium transition-all duration-200 group"
            >
              <Link
                href={
                  session?.user?.role === "INSTRUCTOR"
                    ? "/dashboard/instructor/assignments/add"
                    : "/assignments"
                }
              >
                {getAddButtonText()}
              </Link>
              <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          )}

          {/* Auth Button */}
          {status === "loading" ? (
            <Button
              onClick={handleAddAssignment}
              variant="outline"
              className="bg-transparent border-slate-600 text-white hover:bg-white hover:text-primary hover:border-white rounded-full px-6 py-2 font-medium transition-all duration-200 group"
            >
              {getAddButtonText()}
              <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          ) : session ? (
            <div className="hidden sm:flex items-center gap-3">
              <Button
                onClick={handleLogout}
                variant="outline"
                className="bg-white border-slate-600 text-black hover:bg-white hover:text-primary hover:border-white rounded-full px-6 py-2 font-medium transition-all duration-200 group"
              >
                <span className="font-medium">Log Out</span>
                <LogOut className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          ) : (
            <Link href="/auth">
              <Button
                variant="outline"
                className="bg-white border-slate-600 text-black hover:bg-white hover:text-primary hover:border-white rounded-full px-6 py-2 font-medium transition-all duration-200 group"
              >
                <span className="font-medium">Login</span>
                <LogIn className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          )}

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-white/20 text-white/80 hover:text-white hover:bg-white/10"
                >
                  <Menu className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="p-4 bg-white">
                <div className="flex items-center gap-2 font-bold text-lg border-b pb-3 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center">
                    <span className="text-white font-bold text-xs">A</span>
                  </div>
                  AssignTracker
                </div>
                <MobileNav session={session} handleLogout={handleLogout} />

                {/* Mobile Add Assignment Button */}
                {session && (
                  <div className="mt-4 pt-4 border-t">
                    <Button
                      onClick={handleAddAssignment}
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      {getAddButtonText()}
                    </Button>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
