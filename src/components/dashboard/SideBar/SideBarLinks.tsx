import {
  PersonStanding,
  HomeIcon,
  ShoppingCart,
  LayoutDashboard,
  Users,
  Star,
  KeyRound,
  FileText,
  Home,
} from "lucide-react";

export const USER_ROLE = {
  INSTRUCTOR: "INSTRUCTOR",
  STUDENT: "STUDENT",
} as const;

export type TUserRole = keyof typeof USER_ROLE;

// Sidebar item type
type SidebarGroup = {
  section: string;
  items: {
    label: string;
    href: string;
    icon: React.ElementType;
  }[];
};

export const getSidebarLinks = (role: TUserRole): SidebarGroup[] => {
  switch (role) {
    case USER_ROLE.INSTRUCTOR:
      return [
        {
          section: "Main",
          items: [
            {
              label: "Home",
              href: "/dashboard/instructor/overview",
              icon: Home,
            },
          ],
        },
        {
          section: "Manage",
          items: [
            {
              label: "Assignments",
              href: "/dashboard/instructor/assignments",
              icon: FileText,
            },
            {
              label: "Create Assignments",
              href: "/dashboard/instructor/assignments/add",
              icon: FileText,
            },
            {
              label: "Submissions",
              href: "/dashboard/instructor/submissions",
              icon: ShoppingCart,
            },
          ],
        },
      ];

    case USER_ROLE.STUDENT:
      return [
        {
          section: "Main",
          items: [
            {
              label: "Home",
              href: "/dashboard/student/overview",
              icon: Home,
            },
          ],
        },
        {
          section: "My Activity",
          items: [
            {
              label: "Assignments",
              href: "/dashboard/student/assignments",
              icon: FileText,
            },
            {
              label: "Submissions",
              href: "/dashboard/student/submissions",
              icon: ShoppingCart,
            },
          ],
        },
      ];
  }
};
