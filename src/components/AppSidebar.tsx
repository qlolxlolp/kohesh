
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
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary/20 text-primary font-medium border-r-2 border-primary" 
      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground";

  const groupedItems = Object.entries(categories).map(([key, label]) => ({
    label,
    items: menuItems.filter(item => item.category === key),
    hasActive: menuItems.filter(item => item.category === key).some(item => isActive(item.url))
  }));

  return (
    <Sidebar
      className={`${collapsed ? "w-14" : "w-72"} border-r border-border bg-sidebar`}
      collapsible="icon"
    >
      <SidebarTrigger className="m-2 self-end text-sidebar-foreground hover:bg-sidebar-accent" />

      <SidebarContent className="px-2">
        {groupedItems.map((group) => (
          <SidebarGroup
            key={group.label}
            className="mb-2"
          >
            <SidebarGroupLabel className="text-sidebar-primary font-medium px-3 py-2">
              {!collapsed && group.label}
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="mb-1">
                      <NavLink 
                        to={item.url} 
                        end 
                        className={({ isActive }) => 
                          `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${getNavCls({ isActive })}`
                        }
                      >
                        <item.icon className="w-5 h-5 flex-shrink-0" />
                        {!collapsed && (
                          <span className="text-sm font-medium">{item.title}</span>
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
