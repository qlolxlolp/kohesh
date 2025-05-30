
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Activity, Users } from 'lucide-react';

const Statistics = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-normal text-foreground" style={{ fontFamily: 'BNazanin' }}>
          آمارها
        </h1>
        <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg">
          <PieChart className="w-4 h-4 text-primary" />
          <span className="text-sm text-primary">آمارگیری فعال</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle className="text-lg font-normal flex items-center gap-2" style={{ fontFamily: 'BNazanin' }}>
              <Activity className="w-5 h-5 text-primary" />
              آمار فعالیت
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground" style={{ fontFamily: 'BNazanin' }}>
              نمایش آمار کامل فعالیت‌های سیستم و ماینرهای شناسایی شده
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle className="text-lg font-normal flex items-center gap-2" style={{ fontFamily: 'BNazanin' }}>
              <Users className="w-5 h-5 text-primary" />
              آمار کاربری
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground" style={{ fontFamily: 'BNazanin' }}>
              تحلیل آماری استفاده از سیستم و عملکرد کاربران
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Statistics;
