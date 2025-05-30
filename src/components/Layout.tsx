
import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Navigation } from "@/components/Navigation";
import { Search, Settings } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Access 2003 Style Header */}
          <header className="access-toolbar flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="access-button" />
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-primary flex items-center justify-center" style={{ border: '1px solid #000' }}>
                  <Search className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-normal text-foreground" style={{ fontFamily: 'BNazanin' }}>
                  Miner Seeker Azadi - سامانه شناسایی ماینر
                </span>
              </div>
            </div>
            
            <Navigation />
            
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4 text-muted-foreground" />
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-2 bg-muted">
            <div className="access-card min-h-full">
              {children}
            </div>
          </main>

          {/* Access 2003 Style Status Bar */}
          <div className="access-status-bar flex items-center justify-between text-xs">
            <span>آماده</span>
            <span>سامانه فعال</span>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
