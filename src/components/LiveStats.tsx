
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Zap, Target, Database, Signal } from 'lucide-react';

export const LiveStats = () => {
  const [stats, setStats] = useState({
    detectionRange: 0,
    signalStrength: 0,
    targetCount: 0,
    dataProcessed: 0,
    systemLoad: 0
  });

  const [sensorData, setSensorData] = useState({
    magnetometer: { x: 0, y: 0, z: 0 },
    groundPenetration: 0,
    metalDetection: 0,
    frequencyAnalysis: []
  });

  // Real hardware simulation
  useEffect(() => {
    const updateStats = () => {
      // Simulate real hardware readings
      const detectionRange = Math.floor(Math.random() * 50) + 100; // 100-150m
      const signalStrength = Math.floor(Math.random() * 30) + 60; // 60-90%
      const targetCount = Math.floor(Math.random() * 8) + 2; // 2-10 targets
      const dataProcessed = Math.floor(Math.random() * 1000) + 5000; // 5000-6000 KB/s
      const systemLoad = Math.floor(Math.random() * 25) + 15; // 15-40%

      setStats({
        detectionRange,
        signalStrength,
        targetCount,
        dataProcessed,
        systemLoad
      });

      // Simulate magnetometer readings
      setSensorData({
        magnetometer: {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          z: (Math.random() - 0.5) * 100
        },
        groundPenetration: Math.floor(Math.random() * 20) + 30, // 30-50cm
        metalDetection: Math.floor(Math.random() * 60) + 20, // 20-80%
        frequencyAnalysis: Array.from({ length: 10 }, () => Math.floor(Math.random() * 100))
      });
    };

    const interval = setInterval(updateStats, 3000);
    updateStats();

    return () => clearInterval(interval);
  }, []);

  const statCards = [
    {
      title: 'برد تشخیص',
      value: `${stats.detectionRange} متر`,
      icon: Target,
      color: 'text-blue-600',
      status: stats.detectionRange > 120 ? 'عالی' : 'متوسط'
    },
    {
      title: 'قدرت سیگنال',
      value: `${stats.signalStrength}%`,
      icon: Signal,
      color: 'text-green-600',
      status: stats.signalStrength > 75 ? 'قوی' : 'متوسط'
    },
    {
      title: 'اهداف شناسایی شده',
      value: `${stats.targetCount} هدف`,
      icon: Activity,
      color: 'text-orange-600',
      status: stats.targetCount > 5 ? 'زیاد' : 'عادی'
    },
    {
      title: 'حجم داده پردازش شده',
      value: `${stats.dataProcessed.toLocaleString()} کیلوبایت/ثانیه`,
      icon: Database,
      color: 'text-purple-600',
      status: 'فعال'
    },
    {
      title: 'بار سیستم',
      value: `${stats.systemLoad}%`,
      icon: Zap,
      color: 'text-red-600',
      status: stats.systemLoad < 30 ? 'عادی' : 'بالا'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Main Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((stat, index) => (
          <Card key={index} className="bg-card border border-black">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs flex items-center gap-2 text-black" style={{
                fontFamily: 'BNazanin',
                fontWeight: 'normal'
              }}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-black mb-1" style={{ fontWeight: 'bold' }}>
                {stat.value}
              </div>
              <div className={`text-xs ${stat.color}`} style={{ fontWeight: 'normal' }}>
                {stat.status}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sensor Data */}
      <Card className="bg-card border border-black">
        <CardHeader>
          <CardTitle className="text-base text-black" style={{
            fontFamily: 'BNazanin',
            fontWeight: 'normal'
          }}>
            داده‌های حسگرها (زمان واقعی)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Magnetometer */}
            <div className="equipment-panel">
              <h4 className="text-sm mb-3 text-black" style={{ fontFamily: 'BNazanin', fontWeight: 'normal' }}>
                مگنتومتر سه محوره
              </h4>
              <table className="data-table w-full">
                <tbody>
                  <tr>
                    <td>محور X</td>
                    <td>{sensorData.magnetometer.x.toFixed(2)} µT</td>
                  </tr>
                  <tr>
                    <td>محور Y</td>
                    <td>{sensorData.magnetometer.y.toFixed(2)} µT</td>
                  </tr>
                  <tr>
                    <td>محور Z</td>
                    <td>{sensorData.magnetometer.z.toFixed(2)} µT</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Ground Penetration */}
            <div className="equipment-panel">
              <h4 className="text-sm mb-3 text-black" style={{ fontFamily: 'BNazanin', fontWeight: 'normal' }}>
                نفوذ در خاک
              </h4>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  {sensorData.groundPenetration} سانتی‌متر
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(sensorData.groundPenetration / 50) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Metal Detection */}
            <div className="equipment-panel">
              <h4 className="text-sm mb-3 text-black" style={{ fontFamily: 'BNazanin', fontWeight: 'normal' }}>
                شدت تشخیص فلز
              </h4>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">
                  {sensorData.metalDetection}%
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${sensorData.metalDetection}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Frequency Analysis */}
          <div className="mt-6 equipment-panel">
            <h4 className="text-sm mb-3 text-black" style={{ fontFamily: 'BNazanin', fontWeight: 'normal' }}>
              تحلیل فرکانس (کیلوهرتز)
            </h4>
            <div className="flex items-end justify-between gap-1 h-24">
              {sensorData.frequencyAnalysis.map((freq, index) => (
                <div
                  key={index}
                  className="bg-purple-500 rounded-t transition-all duration-500"
                  style={{
                    height: `${freq}%`,
                    width: '8%'
                  }}
                  title={`${(index + 1) * 0.5} kHz: ${freq}%`}
                ></div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-black mt-2">
              <span>0.5</span>
              <span>2.5</span>
              <span>5.0 kHz</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
