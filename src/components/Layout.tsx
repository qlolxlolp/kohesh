
import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Navigation } from "@/components/Navigation";
import { MapPin, Activity, Wifi } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full gradient-bg">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header with Navigation */}
          <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-primary hover:bg-primary/10" />
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary-foreground" />
                </div>
                <h1 className="text-lg font-normal text-foreground" style={{ fontFamily: 'BNazanin' }}>
                  سامانه Miner Seeker Azadi
                </h1>
              </div>
            </div>
            
            <Navigation />
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-accent/20 rounded-lg">
                <Activity className="w-4 h-4 text-accent detection-pulse" />
                <span className="text-sm text-accent font-medium">در حال اسکن</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-lg">
                <Wifi className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">آنلاین</span>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
