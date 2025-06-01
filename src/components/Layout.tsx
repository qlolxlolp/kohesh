
import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Navigation } from "@/components/Navigation";
import { Search, Settings, CheckCircle } from 'lucide-react';

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
                <span className="text-sm text-black" style={{ fontFamily: 'BNazanin', fontWeight: 'normal', color: '#000 !important' }}>
                  شـــبـحِ حَشــبی - سامانه شناسایی پیشرفته
                </span>
                <span className="commercial-badge">تجاری</span>
              </div>
            </div>
            
            <Navigation />
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-green-100 border border-black">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-xs text-black" style={{ fontWeight: 'normal' }}>
                  مجوز تجاری فعال
                </span>
              </div>
              <Settings className="w-4 h-4 text-black" />
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-2 bg-muted">
            <div className="access-card min-h-full bg-white">
              {children}
            </div>
          </main>

          {/* Footer with Company Information */}
          <footer className="access-status-bar">
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-black">سیستم آماده - نسخه تجاری فعال</span>
                <span className="text-black">سامانه عملیاتی</span>
              </div>
              <div className="company-info text-center border-t border-black pt-1">
                <div className="mb-1 text-black">
                  © کلیه حقوق محفوظ است - طراحی، توسعه و اجرا: عرفان رجبی
                </div>
                <div className="flex flex-col lg:flex-row justify-center items-center gap-2 text-xs">
                  <span className="text-black">شرکت تلاشگر ایلام (سهامی خاص)</span>
                  <span className="text-black">|</span>
                  <span className="text-black">اسفند 1402، بهار 1404</span>
                  <span className="text-black">|</span>
                  <span dir="ltr" className="text-black">Erfanrajabee@gmail.com</span>
                </div>
                <div className="text-xs mt-1 text-black">
                  آدرس دفتر: ایلام - خیابان سعدی شمالی - مجتمع اداری تجاری رجبی - طبقه آخر
                </div>
                <div className="text-xs mt-1 text-black font-bold">
                  سامانه جامع شـــبـحِ حَشــبی - نسخه تجاری مجاز
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
