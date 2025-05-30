
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MapPin, Activity, Navigation, Map } from 'lucide-react';

interface MinerDevice {
  id: string;
  name: string;
  type: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  hashRate: string;
  temperature: number;
  status: 'active' | 'inactive' | 'detected';
  detectionMethod: string;
  lastSeen: Date;
}

const Index = () => {
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [detectedMiners, setDetectedMiners] = useState<MinerDevice[]>([]);
  const [stats, setStats] = useState({
    totalScanned: 0,
    activeMiners: 0,
    suspiciousActivity: 0,
    networkCoverage: 85
  });

  // شبیه‌سازی اسکن
  useEffect(() => {
    if (isScanning) {
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            setIsScanning(false);
            // شبیه‌سازی کشف دستگاه جدید
            const newMiner: MinerDevice = {
              id: `miner_${Date.now()}`,
              name: `Antminer S19 Pro`,
              type: 'Bitcoin ASIC',
              location: {
                lat: 35.6892 + (Math.random() - 0.5) * 0.1,
                lng: 51.3890 + (Math.random() - 0.5) * 0.1,
                address: 'تهران، منطقه ' + Math.floor(Math.random() * 22 + 1)
              },
              hashRate: `${Math.floor(Math.random() * 100 + 50)}TH/s`,
              temperature: Math.floor(Math.random() * 20 + 60),
              status: 'detected',
              detectionMethod: 'تحلیل ترافیک شبکه',
              lastSeen: new Date()
            };
            setDetectedMiners(prev => [newMiner, ...prev.slice(0, 4)]);
            setStats(prev => ({
              ...prev,
              totalScanned: prev.totalScanned + 1,
              activeMiners: prev.activeMiners + 1
            }));
            return 0;
          }
          return prev + 2;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isScanning]);

  const startScan = () => {
    setIsScanning(true);
    setScanProgress(0);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          سامانه جامع Miner Seeker Azadi
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          سامانه هوشمند کشف، شناسایی و مکان‌یابی دستگاه‌های استخراج رمزارزهای دیجیتال با استفاده از فناوری‌های پیشرفته تشخیص از راه دور و محلی
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">کل اسکن‌شده</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.totalScanned}</div>
            <p className="text-xs text-muted-foreground">دستگاه بررسی شده</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ماینرهای فعال</CardTitle>
            <Activity className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{stats.activeMiners}</div>
            <p className="text-xs text-muted-foreground">در حال استخراج</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">فعالیت مشکوک</CardTitle>
            <Navigation className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{stats.suspiciousActivity}</div>
            <p className="text-xs text-muted-foreground">نیاز به بررسی</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">پوشش شبکه</CardTitle>
            <Map className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.networkCoverage}%</div>
            <p className="text-xs text-muted-foreground">از منطقه هدف</p>
          </CardContent>
        </Card>
      </div>

      {/* Scan Control Section */}
      <Card className="bg-card/50 backdrop-blur-sm border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            کنترل اسکن هوشمند
          </CardTitle>
          <CardDescription>
            شروع اسکن جامع برای کشف دستگاه‌های استخراج رمزارز در محدوده
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Button 
              onClick={startScan} 
              disabled={isScanning}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isScanning ? 'در حال اسکن...' : 'شروع اسکن جامع'}
            </Button>
            
            {isScanning && (
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">پیشرفت اسکن</span>
                  <span className="text-sm font-medium text-primary">{scanProgress}%</span>
                </div>
                <Progress value={scanProgress} className="h-2" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Detections */}
      <Card className="bg-card/50 backdrop-blur-sm border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-accent" />
            آخرین کشف‌ها
          </CardTitle>
          <CardDescription>
            دستگاه‌های اخیراً شناسایی شده
          </CardDescription>
        </CardHeader>
        <CardContent>
          {detectedMiners.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              هنوز دستگاهی شناسایی نشده است. برای شروع اسکن روی دکمه بالا کلیک کنید.
            </div>
          ) : (
            <div className="space-y-4">
              {detectedMiners.map((miner) => (
                <div key={miner.id} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg border border-border">
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-accent rounded-full detection-pulse"></div>
                    <div>
                      <h4 className="font-medium text-foreground">{miner.name}</h4>
                      <p className="text-sm text-muted-foreground">{miner.location.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-left">
                      <div className="text-sm font-medium text-primary">{miner.hashRate}</div>
                      <div className="text-xs text-muted-foreground">{miner.temperature}°C</div>
                    </div>
                    
                    <Badge variant="outline" className="border-accent text-accent">
                      {miner.detectionMethod}
                    </Badge>
                    
                    <Badge 
                      variant={miner.status === 'active' ? 'default' : 'secondary'}
                      className={miner.status === 'active' ? 'bg-accent text-accent-foreground' : ''}
                    >
                      {miner.status === 'active' ? 'فعال' : 
                       miner.status === 'detected' ? 'شناسایی شده' : 'غیرفعال'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* AI Analysis Preview */}
      <Card className="bg-card/50 backdrop-blur-sm border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="w-5 h-5 text-primary" />
            تحلیل هوش مصنوعی
          </CardTitle>
          <CardDescription>
            آنالیز الگوهای شناسایی شده توسط مدل‌های یادگیری ماشین
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-primary/10 rounded-lg">
              <div className="text-2xl font-bold text-primary mb-1">94%</div>
              <div className="text-sm text-muted-foreground">دقت تشخیص</div>
            </div>
            <div className="text-center p-4 bg-accent/10 rounded-lg">
              <div className="text-2xl font-bold text-accent mb-1">12</div>
              <div className="text-sm text-muted-foreground">الگوی شناخته شده</div>
            </div>
            <div className="text-center p-4 bg-secondary/30 rounded-lg">
              <div className="text-2xl font-bold text-foreground mb-1">3.2s</div>
              <div className="text-sm text-muted-foreground">زمان پردازش</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
