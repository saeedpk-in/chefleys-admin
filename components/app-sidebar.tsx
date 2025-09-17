"use client";

import * as React from "react";
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconMap2,
  IconReport,
  IconSearch,
  IconSettings,
  IconTruck,
  IconUsers,
  IconUsersGroup,
} from "@tabler/icons-react";

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useSession } from "next-auth/react";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Users",
      url: "/dashboard/users",
      icon: IconUsers,
    },
    {
      title: "Create Admin",
      url: "/dashboard/create-admin",
      icon: IconListDetails,
    },
    {
      title: "Create Food Item",
      url: "/dashboard/create-food-item",
      icon: IconChartBar,
    },
    {
      title: "Tier Creation",
      url: "/dashboard/tier-creation",
      icon: IconFolder,
    },
    {
      title: "Create Address Route",
      url: "/dashboard/create-address-route",
      icon: IconMap2,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      title: "Chef Data",
      url: "/dashboard/chef-data",
      icon: IconDatabase,
    },
    {
      title: "Pack Admin Data",
      url: "/dashboard/pack-data",
      icon: IconReport,
    },
    {
      title: "Delivery Admin Data",
      url: "/dashboard/delivery-data",
      icon: IconTruck,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();

  const user = {
    name: session?.user?.name || "cloud kitchen",
    email: session?.user?.email || "m@example.com",
    role: session?.user?.role || "role",
    avatar: session?.user?.image || "/avatars/shadcn.jpg",
  };
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="#">
                {/* <IconInnerShadowTop className="!size-5" /> */}
                <span className="text-lg font-semibold text-brand-color">Chefly Admin</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
