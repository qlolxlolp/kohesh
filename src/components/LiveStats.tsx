
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Wifi, MapPin, Database, Cpu, Shield } from 'lucide-react';

interface StatData {
  value: number;
  change: number;
  unit: string;
}

interface LiveStatsData {
  activeMiners: StatData;
  hashRate: StatData;
  detectedDevices: StatData;
  networkSignals: StatData;
  cpuUsage: StatData;
  memoryUsage: StatData;
}

export function LiveStats() {
  const [stats, setStats] = useState<LiveStatsData>({
    activeMiners: { value: 1247, change: 2.3, unit: 'دستگاه' },
    hashRate: { value: 12.7, change: 5.1, unit: 'TH/s' },
    detectedDevices: { value: 89, change: -1.2, unit: 'دستگاه' },
    networkSignals: { value: 342, change: 3.7, unit: 'سیگنال' },
    cpuUsage: { value: 67, change: -2.1, unit: '%' },
    memoryUsage: { value: 4.2, change: 1.8, unit: 'GB' }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        activeMiners: {
          ...prev.activeMiners,
          value: prev.activeMiners.value + Math.floor(Math.random() * 5) - 2,
          change: (Math.random() - 0.5) * 10
        },
        hashRate: {
          ...prev.hashRate,
          value: +(prev.hashRate.value + (Math.random() - 0.5) * 2).toFixed(1),
          change: (Math.random() - 0.5) * 20
        },
        detectedDevices: {
          ...prev.detectedDevices,
          value: prev.detectedDevices.value + Math.floor(Math.random() * 3) - 1,
          change: (Math.random() - 0.5) * 8
        },
        networkSignals: {
          ...prev.networkSignals,
          value: prev.networkSignals.value + Math.floor(Math.random() * 10) - 5,
          change: (Math.random() - 0.5) * 15
        },
        cpuUsage: {
          ...prev.cpuUsage,
          value: Math.max(10, Math.min(95, prev.cpuUsage.value + Math.floor(Math.random() * 6) - 3)),
          change: (Math.random() - 0.5) * 12
        },
        memoryUsage: {
          ...prev.memoryUsage,
          value: +(Math.max(1, Math.min(8, prev.memoryUsage.value + (Math.random() - 0.5) * 0.5))).toFixed(1),
          change: (Math.random() - 0.5) * 6
        }
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const statCards = [
    {
      title: "ماینرهای فعال",
      icon: Activity,
      data: stats.activeMiners,
      color: "text-green-500"
    },
    {
      title: "نرخ هش کل",
      icon: Cpu,
      data: stats.hashRate,
      color: "text-blue-500"
    },
    {
      title: "دستگاه‌های شناسایی شده",
      icon: MapPin,
      data: stats.detectedDevices,
      color: "text-yellow-500"
    },
    {
      title: "سیگنال‌های شبکه",
      icon: Wifi,
      data: stats.networkSignals,
      color: "text-purple-500"
    },
    {
      title: "استفاده CPU",
      icon: Shield,
      data: stats.cpuUsage,
      color: "text-red-500"
    },
    {
      title: "استفاده حافظه",
      icon: Database,
      data: stats.memoryUsage,
      color: "text-orange-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {statCards.map((card, index) => (
        <Card key={index} className="bg-card/50 backdrop-blur-sm border-border hover:bg-card/70 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-normal text-muted-foreground" style={{ fontFamily: 'BNazanin' }}>
              {card.title}
            </CardTitle>
            <card.icon className={`h-4 w-4 ${card.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground" style={{ fontFamily: 'BNazanin' }}>
              {card.data.value.toLocaleString('fa-IR')} {card.data.unit}
            </div>
            <p className={`text-xs ${card.data.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {card.data.change >= 0 ? '+' : ''}{card.data.change.toFixed(1)}% از ساعت گذشته
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
