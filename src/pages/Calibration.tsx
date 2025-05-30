
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Gauge, Wrench } from 'lucide-react';

const Calibration = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-normal text-foreground" style={{ fontFamily: 'BNazanin' }}>
          کالیبراسیون
        </h1>
        <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg">
          <Gauge className="w-4 h-4 text-primary" />
          <span className="text-sm text-primary">تنظیمات دقیق</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle className="text-lg font-normal flex items-center gap-2" style={{ fontFamily: 'BNazanin' }}>
              <Settings className="w-5 h-5 text-primary" />
              کالیبراسیون حساسگرها
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground" style={{ fontFamily: 'BNazanin' }}>
              تنظیم دقیق حساسگرها برای بهینه‌سازی دقت تشخیص
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle className="text-lg font-normal flex items-center gap-2" style={{ fontFamily: 'BNazanin' }}>
              <Wrench className="w-5 h-5 text-primary" />
              تنظیمات فنی
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground" style={{ fontFamily: 'BNazanin' }}>
              پیکربندی پارامترهای فنی سیستم برای عملکرد بهینه
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Calibration;
