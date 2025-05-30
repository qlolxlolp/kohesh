
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation2, MapPin, Route } from 'lucide-react';

const Routing = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-normal text-foreground" style={{ fontFamily: 'BNazanin' }}>
          سیستم مسیریابی
        </h1>
        <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg">
          <Route className="w-4 h-4 text-primary" />
          <span className="text-sm text-primary">آماده مسیریابی</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle className="text-lg font-normal flex items-center gap-2" style={{ fontFamily: 'BNazanin' }}>
              <Navigation2 className="w-5 h-5 text-primary" />
              مسیریابی هوشمند
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground" style={{ fontFamily: 'BNazanin' }}>
              سیستم مسیریابی بهینه برای رسیدن به ماینرهای شناسایی شده با در نظر گیری عوامل ترافیک و فاصله
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle className="text-lg font-normal flex items-center gap-2" style={{ fontFamily: 'BNazanin' }}>
              <MapPin className="w-5 h-5 text-primary" />
              نقاط مقصد
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground" style={{ fontFamily: 'BNazanin' }}>
              مدیریت نقاط مقصد و تعریف مسیرهای بهینه برای دسترسی به ماینرها
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Routing;
