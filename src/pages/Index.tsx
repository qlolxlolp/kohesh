import React from 'react';
import { LiveStats } from '@/components/LiveStats';
import { MinerMap } from '@/components/MinerMap';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Activity, Radar, Map, Brain } from 'lucide-react';
const Index = () => {
  const systemStatus = [{
    name: 'سیستم تشخیص از راه دور',
    progress: 87,
    status: 'فعال'
  }, {
    name: 'سیستم تشخیص محلی',
    progress: 94,
    status: 'فعال'
  }, {
    name: 'نقشه‌سازی هوشمند',
    progress: 76,
    status: 'در حال به‌روزرسانی'
  }, {
    name: 'هوش مصنوعی',
    progress: 91,
    status: 'فعال'
  }];
  return <div className="space-y-6 bg-[#a86e22]/10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg text-foreground" style={{
        fontFamily: 'BNazanin',
        fontWeight: 'normal'
      }}>
          داشبورد سامانه جامع شـــبـحِ حَشــبی
        </h1>
        <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg">
          <Activity className="w-4 h-4 text-primary" />
          <span className="text-sm text-primary" style={{
          fontWeight: 'normal'
        }}>سیستم آماده به کار</span>
        </div>
      </div>

      {/* Live Statistics */}
      <LiveStats />

      {/* System Status & Miner Map */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Status */}
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2" style={{
            fontFamily: 'BNazanin',
            fontWeight: 'normal'
          }}>
              <Radar className="w-5 h-5 text-primary" />
              وضعیت سیستم‌ها
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {systemStatus.map((system, index) => <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm" style={{
                fontFamily: 'BNazanin',
                fontWeight: 'normal'
              }}>
                    {system.name}
                  </span>
                  <span className="text-xs text-muted-foreground" style={{
                fontWeight: 'normal'
              }}>{system.status}</span>
                </div>
                <Progress value={system.progress} className="h-2" />
                <div className="text-xs text-muted-foreground text-left" style={{
              fontWeight: 'normal'
            }}>
                  {system.progress}%
                </div>
              </div>)}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2" style={{
            fontFamily: 'BNazanin',
            fontWeight: 'normal'
          }}>
              <Brain className="w-5 h-5 text-primary" />
              عملیات سریع
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            {[{
            title: 'شروع اسکن',
            desc: 'تشخیص از راه دور',
            icon: Radar,
            color: 'bg-blue-500/20 text-blue-500'
          }, {
            title: 'اسکن محلی',
            desc: 'تشخیص نزدیک',
            icon: Activity,
            color: 'bg-green-500/20 text-green-500'
          }, {
            title: 'نمایش نقشه',
            desc: 'مکان‌یابی',
            icon: Map,
            color: 'bg-purple-500/20 text-purple-500'
          }, {
            title: 'تحلیل AI',
            desc: 'پردازش هوشمند',
            icon: Brain,
            color: 'bg-orange-500/20 text-orange-500'
          }].map((action, index) => <div key={index} className={`p-4 rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer ${action.color}`}>
                <action.icon className="w-6 h-6 mb-2" />
                <h3 className="text-sm mb-1" style={{
              fontFamily: 'BNazanin',
              fontWeight: 'normal'
            }}>{action.title}</h3>
                <p className="text-xs opacity-70" style={{
              fontWeight: 'normal'
            }}>{action.desc}</p>
              </div>)}
          </CardContent>
        </Card>
      </div>

      {/* Miner Map */}
      <MinerMap />
    </div>;
};
export default Index;