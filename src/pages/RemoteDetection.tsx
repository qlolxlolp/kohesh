
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Navigation, Wifi, Activity } from 'lucide-react';

const RemoteDetection = () => {
  const [networkScan, setNetworkScan] = useState({
    enabled: true,
    range: '192.168.1.0/24',
    progress: 0,
    scanning: false
  });

  const [trafficAnalysis, setTrafficAnalysis] = useState({
    enabled: true,
    threshold: 80,
    analyzing: false
  });

  const [powerConsumption, setPowerConsumption] = useState({
    enabled: false,
    monitoring: false
  });

  const startNetworkScan = () => {
    setNetworkScan(prev => ({ ...prev, scanning: true, progress: 0 }));
    
    const interval = setInterval(() => {
      setNetworkScan(prev => {
        if (prev.progress >= 100) {
          clearInterval(interval);
          return { ...prev, scanning: false, progress: 100 };
        }
        return { ...prev, progress: prev.progress + 5 };
      });
    }, 200);
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          تشخیص از راه دور
        </h1>
        <p className="text-muted-foreground">
          شناسایی دستگاه‌های استخراج رمزارز با استفاده از تحلیل ترافیک شبکه، الگوهای مصرف برق و روش‌های تشخیص غیرمستقیم
        </p>
      </div>

      <Tabs defaultValue="network" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-secondary">
          <TabsTrigger value="network">تحلیل شبکه</TabsTrigger>
          <TabsTrigger value="traffic">آنالیز ترافیک</TabsTrigger>
          <TabsTrigger value="power">مصرف برق</TabsTrigger>
        </TabsList>

        {/* Network Analysis Tab */}
        <TabsContent value="network" className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Navigation className="w-5 h-5 text-primary" />
                اسکن شبکه محلی
              </CardTitle>
              <CardDescription>
                جستجو برای دستگاه‌های متصل که الگوهای ماینر را نشان می‌دهند
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ip-range">محدوده IP</Label>
                  <Input
                    id="ip-range"
                    value={networkScan.range}
                    onChange={(e) => setNetworkScan(prev => ({ ...prev, range: e.target.value }))}
                    placeholder="192.168.1.0/24"
                  />
                </div>
                
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Switch
                    id="network-scan"
                    checked={networkScan.enabled}
                    onCheckedChange={(checked) => setNetworkScan(prev => ({ ...prev, enabled: checked }))}
                  />
                  <Label htmlFor="network-scan">فعال‌سازی اسکن شبکه</Label>
                </div>
              </div>

              <div className="space-y-4">
                <Button 
                  onClick={startNetworkScan}
                  disabled={!networkScan.enabled || networkScan.scanning}
                  className="bg-primary hover:bg-primary/90"
                >
                  {networkScan.scanning ? 'در حال اسکن...' : 'شروع اسکن شبکه'}
                </Button>

                {networkScan.scanning && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>پیشرفت اسکن</span>
                      <span>{networkScan.progress}%</span>
                    </div>
                    <Progress value={networkScan.progress} />
                  </div>
                )}
              </div>

              {/* Results */}
              <div className="space-y-3">
                <h4 className="font-medium">نتایج اسکن شبکه:</h4>
                <div className="grid gap-3">
                  <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-accent rounded-full"></div>
                      <div>
                        <div className="font-medium">192.168.1.45</div>
                        <div className="text-sm text-muted-foreground">پورت‌های مشکوک: 4028, 8080</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-accent text-accent">
                      احتمال بالا
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                      <div>
                        <div className="font-medium">192.168.1.78</div>
                        <div className="text-sm text-muted-foreground">API ماینر شناسایی شد</div>
                      </div>
                    </div>
                    <Badge variant="default" className="bg-primary text-primary-foreground">
                      تایید شده
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Traffic Analysis Tab */}
        <TabsContent value="traffic" className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wifi className="w-5 h-5 text-accent" />
                تحلیل ترافیک شبکه
              </CardTitle>
              <CardDescription>
                آنالیز الگوهای ترافیک برای شناسایی فعالیت استخراج
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="threshold">آستانه تشخیص (%)</Label>
                  <Input
                    id="threshold"
                    type="number"
                    value={trafficAnalysis.threshold}
                    onChange={(e) => setTrafficAnalysis(prev => ({ ...prev, threshold: parseInt(e.target.value) }))}
                    min="50"
                    max="100"
                  />
                </div>
                
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Switch
                    id="traffic-analysis"
                    checked={trafficAnalysis.enabled}
                    onCheckedChange={(checked) => setTrafficAnalysis(prev => ({ ...prev, enabled: checked }))}
                  />
                  <Label htmlFor="traffic-analysis">تحلیل ترافیک</Label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-primary/10 rounded-lg">
                  <div className="text-xl font-bold text-primary">15.2 GB</div>
                  <div className="text-sm text-muted-foreground">ترافیک ماینینگ</div>
                </div>
                <div className="text-center p-4 bg-accent/10 rounded-lg">
                  <div className="text-xl font-bold text-accent">7</div>
                  <div className="text-sm text-muted-foreground">استراتژی Pool</div>
                </div>
                <div className="text-center p-4 bg-secondary/30 rounded-lg">
                  <div className="text-xl font-bold text-foreground">94%</div>
                  <div className="text-sm text-muted-foreground">دقت تشخیص</div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">اتصالات مشکوک:</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                    <div>
                      <div className="font-medium text-destructive">stratum+tcp://pool.example.com:4444</div>
                      <div className="text-sm text-muted-foreground">ترافیک: 2.1 GB/ساعت</div>
                    </div>
                    <Badge variant="destructive">
                      Bitcoin Pool
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-accent/10 rounded-lg border border-accent/20">
                    <div>
                      <div className="font-medium text-accent">eth-pool.example.com:8008</div>
                      <div className="text-sm text-muted-foreground">ترافیک: 890 MB/ساعت</div>
                    </div>
                    <Badge variant="outline" className="border-accent text-accent">
                      Ethereum Pool
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Power Consumption Tab */}
        <TabsContent value="power" className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                تحلیل مصرف برق
              </CardTitle>
              <CardDescription>
                نظارت بر الگوهای مصرف برق برای تشخیص فعالیت ماینینگ
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2 space-x-reverse mb-4">
                <Switch
                  id="power-monitoring"
                  checked={powerConsumption.enabled}
                  onCheckedChange={(checked) => setPowerConsumption(prev => ({ ...prev, enabled: checked }))}
                />
                <Label htmlFor="power-monitoring">نظارت بر مصرف برق</Label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-destructive/10 rounded-lg">
                  <div className="text-xl font-bold text-destructive">3.2 kW</div>
                  <div className="text-sm text-muted-foreground">مصرف غیرعادی</div>
                </div>
                <div className="text-center p-4 bg-primary/10 rounded-lg">
                  <div className="text-xl font-bold text-primary">24/7</div>
                  <div className="text-sm text-muted-foreground">فعالیت مداوم</div>
                </div>
                <div className="text-center p-4 bg-accent/10 rounded-lg">
                  <div className="text-xl font-bold text-accent">18</div>
                  <div className="text-sm text-muted-foreground">الگوی آنومالی</div>
                </div>
                <div className="text-center p-4 bg-secondary/30 rounded-lg">
                  <div className="text-xl font-bold text-foreground">87%</div>
                  <div className="text-sm text-muted-foreground">بار پایدار</div>
                </div>
              </div>

              <div className="p-4 bg-muted/20 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>نکته:</strong> برای استفاده از این ویژگی، نیاز به اتصال سنسور مصرف برق یا دسترسی به API شرکت برق دارید.
                  در بخش تنظیمات سخت‌افزار می‌توانید دستگاه‌های مربوطه را پیکربندی کنید.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RemoteDetection;
