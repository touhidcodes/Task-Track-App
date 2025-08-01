import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { Menu } from "lucide-react";

const DesktopNav = () => (
  <NavigationMenu>
    <NavigationMenuList className="flex-row items-center gap-6">
      {["Home", "Blog", "About", "Contact Us"].map((item) => (
        <NavigationMenuItem key={item}>
          <NavigationMenuLink asChild>
            <Link
              href="#"
              className="block text-sm font-medium hover:text-primary transition-colors"
            >
              {item}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      ))}
    </NavigationMenuList>
  </NavigationMenu>
);

const MobileNav = () => (
  <div className="flex flex-col space-y-4 mt-4">
    {["Home", "Blog", "About", "Contact Us"].map((item) => (
      <Link
        key={item}
        href="#"
        className="text-sm font-medium hover:text-primary transition-colors"
      >
        {item}
      </Link>
    ))}
  </div>
);

const Navbar = () => {
  return (
    <nav className="h-16 bg-background border-b">
      <div className="h-full flex items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="font-bold text-lg">Task Track</div>

        {/* Desktop Menu */}
        <div className="hidden md:block">
          <DesktopNav />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <Button variant="outline" className="hidden sm:inline-flex">
            Sign In
          </Button>
          <Button>Get Started</Button>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-4">
                <div className="font-bold text-lg border-b pb-2">
                  Task Track
                </div>
                <MobileNav />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
