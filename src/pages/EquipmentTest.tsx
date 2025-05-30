
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TestTube, CheckCircle, AlertTriangle } from 'lucide-react';

const EquipmentTest = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-normal text-foreground" style={{ fontFamily: 'BNazanin' }}>
          تست تجهیزات
        </h1>
        <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg">
          <TestTube className="w-4 h-4 text-primary" />
          <span className="text-sm text-primary">آزمایش سیستم</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle className="text-lg font-normal flex items-center gap-2" style={{ fontFamily: 'BNazanin' }}>
              <CheckCircle className="w-5 h-5 text-primary" />
              تست عملکرد
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground" style={{ fontFamily: 'BNazanin' }}>
              بررسی عملکرد تجهیزات و اطمینان از صحت عملکرد
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle className="text-lg font-normal flex items-center gap-2" style={{ fontFamily: 'BNazanin' }}>
              <AlertTriangle className="w-5 h-5 text-primary" />
              تشخیص خرابی
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground" style={{ fontFamily: 'BNazanin' }}>
              شناسایی مشکلات و خرابی‌های احتمالی در تجهیزات
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EquipmentTest;
