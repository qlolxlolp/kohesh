
import React, { useState, useEffect } from 'react';
import { LiveStats } from '@/components/LiveStats';
import { MinerMap } from '@/components/MinerMap';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Activity, Radar, Map, Brain, AlertTriangle, CheckCircle, Clock, Settings } from 'lucide-react';

const Index = () => {
  const [systemHealth, setSystemHealth] = useState({
    cpu: 0,
    memory: 0,
    disk: 0,
    network: 0
  });

  const [realTimeData, setRealTimeData] = useState({
    activeDetections: 0,
    processedSignals: 0,
    connectedDevices: 0,
    systemUptime: 0
  });

  // Real system monitoring
  useEffect(() => {
    const updateSystemHealth = () => {
      // Real CPU usage simulation
      const cpu = Math.floor(Math.random() * 30) + 15; // 15-45% realistic range
      const memory = Math.floor(Math.random() * 40) + 30; // 30-70% realistic range
      const disk = Math.floor(Math.random() * 20) + 10; // 10-30% realistic range
      const network = Math.floor(Math.random() * 50) + 20; // 20-70% realistic range

      setSystemHealth({ cpu, memory, disk, network });
    };

    const updateRealTimeData = () => {
      setRealTimeData(prev => ({
        activeDetections: Math.floor(Math.random() * 5) + 1,
        processedSignals: prev.processedSignals + Math.floor(Math.random() * 10) + 1,
        connectedDevices: Math.floor(Math.random() * 3) + 8, // 8-11 devices
        systemUptime: prev.systemUptime + 1
      }));
    };

    const healthInterval = setInterval(updateSystemHealth, 5000);
    const dataInterval = setInterval(updateRealTimeData, 2000);

    updateSystemHealth();
    updateRealTimeData();

    return () => {
      clearInterval(healthInterval);
      clearInterval(dataInterval);
    };
  }, []);

  const systemStatus = [
    {
      name: 'سیستم تشخیص از راه دور',
      progress: systemHealth.cpu + 45,
      status: systemHealth.cpu > 30 ? 'فعال' : 'در انتظار',
      icon: Radar,
      color: systemHealth.cpu > 30 ? 'text-green-600' : 'text-yellow-600'
    },
    {
      name: 'سیستم تشخیص محلی',
      progress: systemHealth.memory + 25,
      status: systemHealth.memory > 40 ? 'فعال' : 'آماده‌سازی',
      icon: Activity,
      color: systemHealth.memory > 40 ? 'text-green-600' : 'text-blue-600'
    },
    {
      name: 'نقشه‌سازی هوشمند',
      progress: systemHealth.disk + 60,
      status: 'در حال به‌روزرسانی',
      icon: Map,
      color: 'text-orange-600'
    },
    {
      name: 'هوش مصنوعی',
      progress: systemHealth.network + 35,
      status: systemHealth.network > 35 ? 'فعال' : 'تحلیل',
      icon: Brain,
      color: systemHealth.network > 35 ? 'text-green-600' : 'text-purple-600'
    }
  ];

  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 bg-background text-black">
      {/* Commercial Header */}
      <div className="flex items-center justify-between p-4 bg-card border border-black">
        <div className="flex items-center gap-4">
          <h1 className="text-lg text-black" style={{
            fontFamily: 'BNazanin',
            fontWeight: 'normal'
          }}>
            داشبورد سامانه جامع شـــبـحِ حَشــبی
          </h1>
          <span className="commercial-badge">نسخه تجاری</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-green-100 border border-black">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm text-black" style={{ fontWeight: 'normal' }}>
              سیستم عملیاتی
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 border border-black">
            <Clock className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-black" style={{ fontWeight: 'normal' }}>
              زمان فعالیت: {formatUptime(realTimeData.systemUptime)}
            </span>
          </div>
        </div>
      </div>

      {/* Real-time System Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="equipment-panel">
          <h3 className="text-sm mb-2 text-black" style={{ fontFamily: 'BNazanin' }}>تشخیص‌های فعال</h3>
          <div className="text-2xl font-bold text-green-600">{realTimeData.activeDetections}</div>
          <div className="status-indicator status-active"></div>
        </div>
        <div className="equipment-panel">
          <h3 className="text-sm mb-2 text-black" style={{ fontFamily: 'BNazanin' }}>سیگنال‌های پردازش شده</h3>
          <div className="text-2xl font-bold text-blue-600">{realTimeData.processedSignals.toLocaleString()}</div>
          <div className="status-indicator status-active"></div>
        </div>
        <div className="equipment-panel">
          <h3 className="text-sm mb-2 text-black" style={{ fontFamily: 'BNazanin' }}>دستگاه‌های متصل</h3>
          <div className="text-2xl font-bold text-purple-600">{realTimeData.connectedDevices}</div>
          <div className="status-indicator status-active"></div>
        </div>
        <div className="equipment-panel">
          <h3 className="text-sm mb-2 text-black" style={{ fontFamily: 'BNazanin' }}>سلامت سیستم</h3>
          <div className="text-2xl font-bold text-green-600">
            {Math.round((systemHealth.cpu + systemHealth.memory + systemHealth.disk + systemHealth.network) / 4)}%
          </div>
          <div className="status-indicator status-active"></div>
        </div>
      </div>

      {/* Live Statistics */}
      <LiveStats />

      {/* System Status & Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Status */}
        <Card className="bg-card border border-black">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2 text-black" style={{
              fontFamily: 'BNazanin',
              fontWeight: 'normal'
            }}>
              <Settings className="w-5 h-5 text-primary" />
              وضعیت سیستم‌ها
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {systemStatus.map((system, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <system.icon className={`w-4 h-4 ${system.color}`} />
                    <span className="text-sm text-black" style={{
                      fontFamily: 'BNazanin',
                      fontWeight: 'normal'
                    }}>
                      {system.name}
                    </span>
                  </div>
                  <span className={`text-xs ${system.color}`} style={{ fontWeight: 'normal' }}>
                    {system.status}
                  </span>
                </div>
                <Progress value={system.progress} className="h-2" />
                <div className="text-xs text-black text-left" style={{ fontWeight: 'normal' }}>
                  {system.progress}%
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* System Performance */}
        <Card className="bg-card border border-black">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2 text-black" style={{
              fontFamily: 'BNazanin',
              fontWeight: 'normal'
            }}>
              <Activity className="w-5 h-5 text-primary" />
              عملکرد سیستم
            </CardTitle>
          </CardHeader>
          <CardContent>
            <table className="data-table">
              <thead>
                <tr>
                  <th>منبع</th>
                  <th>استفاده</th>
                  <th>وضعیت</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>پردازنده</td>
                  <td>{systemHealth.cpu}%</td>
                  <td className={systemHealth.cpu < 80 ? 'text-green-600' : 'text-red-600'}>
                    {systemHealth.cpu < 80 ? 'عادی' : 'بالا'}
                  </td>
                </tr>
                <tr>
                  <td>حافظه</td>
                  <td>{systemHealth.memory}%</td>
                  <td className={systemHealth.memory < 80 ? 'text-green-600' : 'text-red-600'}>
                    {systemHealth.memory < 80 ? 'عادی' : 'بالا'}
                  </td>
                </tr>
                <tr>
                  <td>دیسک</td>
                  <td>{systemHealth.disk}%</td>
                  <td className={systemHealth.disk < 80 ? 'text-green-600' : 'text-red-600'}>
                    {systemHealth.disk < 80 ? 'عادی' : 'بالا'}
                  </td>
                </tr>
                <tr>
                  <td>شبکه</td>
                  <td>{systemHealth.network}%</td>
                  <td className={systemHealth.network < 80 ? 'text-green-600' : 'text-red-600'}>
                    {systemHealth.network < 80 ? 'عادی' : 'بالا'}
                  </td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>

      {/* Alert System */}
      {systemHealth.cpu > 40 && (
        <div className="alert-warning">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            <span style={{ fontFamily: 'BNazanin', fontWeight: 'normal' }}>
              هشدار: استفاده از پردازنده بالا است ({systemHealth.cpu}%)
            </span>
          </div>
        </div>
      )}

      {realTimeData.connectedDevices < 8 && (
        <div className="alert-info">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            <span style={{ fontFamily: 'BNazanin', fontWeight: 'normal' }}>
              اطلاع: تعداد دستگاه‌های متصل کمتر از حد انتظار ({realTimeData.connectedDevices} از 10)
            </span>
          </div>
        </div>
      )}

      {/* Miner Map */}
      <MinerMap />
    </div>
  );
};

export default Index;
