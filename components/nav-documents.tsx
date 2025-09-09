"use client"

import {
  IconDots,
  IconFolder,
  IconShare3,
  IconTrash,
  type Icon,
} from "@tabler/icons-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import Link from "next/link"

export function NavDocuments({
  items,
}: {
  items: {
    title: string
    url: string
    icon: Icon
  }[]
}) {

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Data</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild  className="hover:bg-brand-color/15">
              <Link href={item.url} >
                <item.icon className="text-brand-color"/>
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction
                  showOnHover
                  className="data-[state=open]:bg-accent rounded-sm"
                >
                  <IconDots />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-24 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem>
                  <IconFolder />
                  <span>Open</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <IconShare3 />
                  <span>Share</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  <IconTrash />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
