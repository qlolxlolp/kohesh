
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Map, Navigation } from 'lucide-react';

const LocalDetection = () => {
  const [rfScan, setRfScan] = useState({
    enabled: true,
    frequency: [2400],
    scanning: false,
    progress: 0
  });

  const [magneticScan, setMagneticScan] = useState({
    enabled: true,
    sensitivity: [75],
    scanning: false
  });

  const [thermalScan, setThermalScan] = useState({
    enabled: false,
    threshold: 65,
    scanning: false
  });

  const startRFScan = () => {
    setRfScan(prev => ({ ...prev, scanning: true, progress: 0 }));
    
    const interval = setInterval(() => {
      setRfScan(prev => {
        if (prev.progress >= 100) {
          clearInterval(interval);
          return { ...prev, scanning: false, progress: 100 };
        }
        return { ...prev, progress: prev.progress + 3 };
      });
    }, 150);
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          تشخیص محلی
        </h1>
        <p className="text-muted-foreground">
          شناسایی دستگاه‌های استخراج رمزارز در محدوده نزدیک با استفاده از اسکن امواج رادیویی، مغناطیسی و تحلیل حرارتی
        </p>
      </div>

      <Tabs defaultValue="rf" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-secondary">
          <TabsTrigger value="rf">اسکن رادیویی</TabsTrigger>
          <TabsTrigger value="magnetic">تحلیل مغناطیسی</TabsTrigger>
          <TabsTrigger value="thermal">تصویربرداری حرارتی</TabsTrigger>
        </TabsList>

        {/* RF Scanning Tab */}
        <TabsContent value="rf" className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Navigation className="w-5 h-5 text-primary" />
                اسکن امواج رادیویی
              </CardTitle>
              <CardDescription>
                تشخیص فرکانس‌های منحصربفرد دستگاه‌های ماینر و تداخلات الکترومغناطیسی
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <Label>فرکانس اسکن (MHz)</Label>
                  <Slider
                    value={rfScan.frequency}
                    onValueChange={(value) => setRfScan(prev => ({ ...prev, frequency: value }))}
                    max={5000}
                    min={100}
                    step={10}
                    className="w-full"
                  />
                  <div className="text-sm text-muted-foreground text-center">
                    {rfScan.frequency[0]} MHz
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Switch
                    id="rf-scan"
                    checked={rfScan.enabled}
                    onCheckedChange={(checked) => setRfScan(prev => ({ ...prev, enabled: checked }))}
                  />
                  <Label htmlFor="rf-scan">فعال‌سازی اسکن RF</Label>
                </div>
              </div>

              <div className="space-y-4">
                <Button 
                  onClick={startRFScan}
                  disabled={!rfScan.enabled || rfScan.scanning}
                  className="bg-primary hover:bg-primary/90"
                >
                  {rfScan.scanning ? 'در حال اسکن...' : 'شروع اسکن رادیویی'}
                </Button>

                {rfScan.scanning && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>پیشرفت اسکن فرکانس</span>
                      <span>{rfScan.progress}%</span>
                    </div>
                    <Progress value={rfScan.progress} />
                  </div>
                )}
              </div>

              {/* RF Detection Results */}
              <div className="space-y-3">
                <h4 className="font-medium">سیگنال‌های شناسایی شده:</h4>
                <div className="grid gap-3">
                  <div className="flex items-center justify-between p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-destructive rounded-full detection-pulse"></div>
                      <div>
                        <div className="font-medium text-destructive">2.4 GHz - قوی</div>
                        <div className="text-sm text-muted-foreground">الگوی ASIC Miner شناسایی شد</div>
                      </div>
                    </div>
                    <Badge variant="destructive">
                      احتمال 96%
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-accent/10 rounded-lg border border-accent/20">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-accent rounded-full"></div>
                      <div>
                        <div className="font-medium text-accent">1.8 GHz - متوسط</div>
                        <div className="text-sm text-muted-foreground">تداخل الکترومغناطیسی مشکوک</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-accent text-accent">
                      احتمال 67%
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-muted-foreground rounded-full"></div>
                      <div>
                        <div className="font-medium">900 MHz - ضعیف</div>
                        <div className="text-sm text-muted-foreground">سیگنال‌های معمولی شبکه</div>
                      </div>
                    </div>
                    <Badge variant="secondary">
                      عادی
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-muted/20 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>نیاز به سخت‌افزار:</strong> برای عملکرد بهینه، نیاز به آنتن RF و SDR (Software Defined Radio) دارید.
                  دستگاه‌های پیشنهادی: RTL-SDR، HackRF One، BladeRF
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Magnetic Scan Tab */}
        <TabsContent value="magnetic" className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Map className="w-5 h-5 text-accent" />
                تحلیل میدان مغناطیسی
              </CardTitle>
              <CardDescription>
                شناسایی تغییرات میدان مغناطیسی ناشی از دستگاه‌های پردازشی قدرتمند
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <Label>حساسیت سنسور (%)</Label>
                  <Slider
                    value={magneticScan.sensitivity}
                    onValueChange={(value) => setMagneticScan(prev => ({ ...prev, sensitivity: value }))}
                    max={100}
                    min={10}
                    step={5}
                    className="w-full"
                  />
                  <div className="text-sm text-muted-foreground text-center">
                    {magneticScan.sensitivity[0]}% حساسیت
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Switch
                    id="magnetic-scan"
                    checked={magneticScan.enabled}
                    onCheckedChange={(checked) => setMagneticScan(prev => ({ ...prev, enabled: checked }))}
                  />
                  <Label htmlFor="magnetic-scan">سنسور مغناطیسی</Label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-primary/10 rounded-lg">
                  <div className="text-xl font-bold text-primary">432 μT</div>
                  <div className="text-sm text-muted-foreground">شدت میدان</div>
                </div>
                <div className="text-center p-4 bg-destructive/10 rounded-lg">
                  <div className="text-xl font-bold text-destructive">+15%</div>
                  <div className="text-sm text-muted-foreground">افزایش آنومالی</div>
                </div>
                <div className="text-center p-4 bg-accent/10 rounded-lg">
                  <div className="text-xl font-bold text-accent">3</div>
                  <div className="text-sm text-muted-foreground">نقاط مشکوک</div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">آنومالی‌های مغناطیسی:</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                    <div>
                      <div className="font-medium text-destructive">موقعیت شمال‌شرقی - 15 متری</div>
                      <div className="text-sm text-muted-foreground">تغییرات پریودیک میدان: 60Hz</div>
                    </div>
                    <Badge variant="destructive">
                      قوی
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-accent/10 rounded-lg border border-accent/20">
                    <div>
                      <div className="font-medium text-accent">موقعیت غربی - 8 متری</div>
                      <div className="text-sm text-muted-foreground">میدان ثابت افزایش یافته</div>
                    </div>
                    <Badge variant="outline" className="border-accent text-accent">
                      متوسط
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-muted/20 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>سخت‌افزار مورد نیاز:</strong> مگنتومتر دقیق (HMC5883L، QMC5883) یا سنسور Hall Effect قوی
                  برای تشخیص دقیق‌تر از کامپاس دیجیتال سه‌محوره استفاده کنید.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Thermal Scan Tab */}
        <TabsContent value="thermal" className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Navigation className="w-5 h-5 text-primary" />
                تصویربرداری حرارتی
              </CardTitle>
              <CardDescription>
                تشخیص نقاط داغ و الگوهای حرارتی مشخصه دستگاه‌های ماینر
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="thermal-threshold">آستانه دمایی (°C)</Label>
                  <Input
                    id="thermal-threshold"
                    type="number"
                    value={thermalScan.threshold}
                    onChange={(e) => setThermalScan(prev => ({ ...prev, threshold: parseInt(e.target.value) }))}
                    min="30"
                    max="100"
                  />
                </div>
                
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Switch
                    id="thermal-scan"
                    checked={thermalScan.enabled}
                    onCheckedChange={(checked) => setThermalScan(prev => ({ ...prev, enabled: checked }))}
                  />
                  <Label htmlFor="thermal-scan">دوربین حرارتی</Label>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-destructive/10 rounded-lg">
                  <div className="text-lg font-bold text-destructive">85°C</div>
                  <div className="text-xs text-muted-foreground">بیشترین دما</div>
                </div>
                <div className="text-center p-3 bg-accent/10 rounded-lg">
                  <div className="text-lg font-bold text-accent">12</div>
                  <div className="text-xs text-muted-foreground">نقاط داغ</div>
                </div>
                <div className="text-center p-3 bg-primary/10 rounded-lg">
                  <div className="text-lg font-bold text-primary">47°C</div>
                  <div className="text-xs text-muted-foreground">میانگین دما</div>
                </div>
                <div className="text-center p-3 bg-secondary/30 rounded-lg">
                  <div className="text-lg font-bold text-foreground">320x240</div>
                  <div className="text-xs text-muted-foreground">رزولوشن</div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">مناطق حرارتی مشکوک:</h4>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                    <div>
                      <div className="font-medium text-destructive">منطقه A - 85°C</div>
                      <div className="text-sm text-muted-foreground">الگوی حرارتی منظم و مداوم</div>
                    </div>
                    <Badge variant="destructive">حرارت بالا</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-accent/10 rounded-lg border border-accent/20">
                    <div>
                      <div className="font-medium text-accent">منطقه B - 72°C</div>
                      <div className="text-sm text-muted-foreground">تجمع چندین نقطه داغ</div>
                    </div>
                    <Badge variant="outline" className="border-accent text-accent">مشکوک</Badge>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-amber-500/10 rounded-lg border border-amber-500/20">
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  <strong>هشدار:</strong> این ویژگی نیاز به دوربین حرارتی (FLIR، Seek Thermal) دارد.
                  برای استفاده در تلفن همراه، از ماژول‌های حرارتی سازگار با USB-C استفاده کنید.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LocalDetection;
