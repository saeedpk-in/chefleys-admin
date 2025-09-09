"use client"
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import React from "react";

interface BreadcrumbItem {
  link: string;
  title: string;
}

export function BreadcrumbDynamic() {
  const pathname  = usePathname()
  
  // Function to generate breadcrumb items from the pathname
  const generateBreadcrumbItems = () => {
    const segments = pathname.split("/").filter(Boolean);
    const breadcrumbItems: BreadcrumbItem[] = [];
    let currentLink = "";  // Start from the dashboard

    // Loop through each segment in the path
    segments.forEach((segment) => {
      currentLink += `/${segment}`;  // Build the full link as we go
      // Capitalize the first letter of each segment for display (you can customize this logic)
      const title = segment.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
      breadcrumbItems.push({
        link: currentLink,
        title,
      });
    });

    return breadcrumbItems;
  };

  const items = generateBreadcrumbItems();

  return (
    <Breadcrumb className="">
      <BreadcrumbList>
        {/* Always display the dashboard item */}
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
        {/* Dynamic breadcrumb items */}
        {items.slice(1).map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbSeparator className="hidden md:block " />
            <BreadcrumbItem className="text-brand-color">
              <BreadcrumbLink href={item.link}>{item.title}</BreadcrumbLink>
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
