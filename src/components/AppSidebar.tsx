
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { MapPin, Navigation, Map } from 'lucide-react';

const menuItems = [
  {
    title: "داشبورد اصلی",
    url: "/",
    icon: MapPin,
    category: "main"
  },
  {
    title: "تشخیص از راه دور",
    url: "/remote-detection", 
    icon: Navigation,
    category: "detection"
  },
  {
    title: "تشخیص محلی",
    url: "/local-detection",
    icon: Map,
    category: "detection"
  },
  {
    title: "نقشه هوشمند",
    url: "/smart-map",
    icon: Map,
    category: "mapping"
  },
  {
    title: "هوش مصنوعی",
    url: "/ai-analysis",
    icon: Navigation,
    category: "ai"
  },
  {
    title: "دیتابیس",
    url: "/database",
    icon: MapPin,
    category: "data"
  },
  {
    title: "تنظیمات سخت‌افزار",
    url: "/hardware",
    icon: Navigation,
    category: "hardware"
  }
];

const categories = {
  main: "داشبورد",
  detection: "تشخیص و شناسایی",
  mapping: "نقشه‌سازی و مسیریابی", 
  ai: "هوش مصنوعی",
  data: "مدیریت داده",
  hardware: "سخت‌افزار"
};

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;

  const groupedItems = Object.entries(categories).map(([key, label]) => ({
    label,
    items: menuItems.filter(item => item.category === key),
    hasActive: menuItems.filter(item => item.category === key).some(item => isActive(item.url))
  }));

  return (
    <Sidebar
      className={`${collapsed ? "w-16" : "w-64"} border-r-2 border-[#8b4513]`}
      style={{ background: 'linear-gradient(135deg, #deb887 0%, #cd853f 100%)' }}
      collapsible="icon"
    >
      <SidebarTrigger className="m-3 access-button" />

      <SidebarContent className="px-3">
        {groupedItems.map((group) => (
          <SidebarGroup
            key={group.label}
            className="mb-4"
          >
            <SidebarGroupLabel 
              className="text-black px-2 py-3 font-bold text-lg"
              style={{ fontFamily: 'Amiri Quran', fontWeight: '700' }}
            >
              {!collapsed && group.label}
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to={item.url} 
                        end 
                        className={({ isActive: linkActive }) => 
                          `sidebar-button ${linkActive ? 'active' : ''}`
                        }
                      >
                        <item.icon className="w-6 h-6 flex-shrink-0" />
                        {!collapsed && (
                          <span className="text-base font-bold overflow-visible whitespace-normal leading-tight">
                            {item.title}
                          </span>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
