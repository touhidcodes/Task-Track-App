import {
  PersonStanding,
  HomeIcon,
  ShoppingCart,
  LayoutDashboard,
  Users,
  Star,
  KeyRound,
  FileText,
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
  const defaultItems: SidebarGroup[] = [
    {
      section: "Profile",
      items: [
        {
          label: "Profile",
          href: "/dashboard/profile",
          icon: PersonStanding,
        },
      ],
    },
    {
      section: "Settings",
      items: [
        {
          label: "Change Password",
          href: "/dashboard/change-password",
          icon: KeyRound,
        },
      ],
    },
  ];

  switch (role) {
    case USER_ROLE.INSTRUCTOR:
      return [
        {
          section: "Main",
          items: [
            {
              label: "Home",
              href: "/dashboard/instructor/overview",
              icon: LayoutDashboard,
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
              label: "Submissions",
              href: "/dashboard/instructor/submissions",
              icon: ShoppingCart,
            },
            {
              label: "Students",
              href: "/dashboard/instructor/students",
              icon: Users,
            },
          ],
        },
        ...defaultItems,
      ];

    case USER_ROLE.STUDENT:
      return [
        {
          section: "Main",
          items: [
            {
              label: "Home",
              href: "/dashboard/student/overview",
              icon: LayoutDashboard,
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
            {
              label: "Grades",
              href: "/dashboard/student/grades",
              icon: Star,
            },
          ],
        },
        ...defaultItems,
      ];

    default:
      return defaultItems;
  }
};
