
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Map, MapPin, Navigation } from 'lucide-react';

interface MinerLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  address: string;
  status: 'active' | 'inactive' | 'suspected';
  hashRate: string;
  confidence: number;
}

const SmartMap = () => {
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);
  const [selectedMiner, setSelectedMiner] = useState<MinerLocation | null>(null);
  
  const minerLocations: MinerLocation[] = [
    {
      id: '1',
      name: 'Antminer S19 Pro',
      lat: 35.6892,
      lng: 51.3890,
      address: 'تهران، پونک، خیابان آزادی',
      status: 'active',
      hashRate: '110 TH/s',
      confidence: 94
    },
    {
      id: '2', 
      name: 'Unknown ASIC',
      lat: 35.7219,
      lng: 51.3347,
      address: 'تهران، ونک، خیابان ولیعصر',
      status: 'suspected',
      hashRate: '85 TH/s',
      confidence: 67
    },
    {
      id: '3',
      name: 'Whatsminer M30S',
      lat: 35.6961,
      lng: 51.4231,
      address: 'تهران، نارمک، خیابان دماوند',
      status: 'active',
      hashRate: '88 TH/s',
      confidence: 91
    }
  ];

  const connectMapbox = () => {
    if (mapboxToken.trim()) {
      setShowTokenInput(false);
      console.log('Mapbox connected with token:', mapboxToken);
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          نقشه هوشمند
        </h1>
        <p className="text-muted-foreground">
          نمایش مکان دستگاه‌های شناسایی شده روی نقشه، مسیریابی و تحلیل جغرافیایی
        </p>
      </div>

      {/* Mapbox Token Input */}
      {showTokenInput && (
        <Card className="bg-amber-500/10 border-amber-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-300">
              <Map className="w-5 h-5" />
              اتصال به Mapbox
            </CardTitle>
            <CardDescription className="text-amber-600 dark:text-amber-400">
              برای نمایش نقشه، لطفاً کلید API مپ‌باکس خود را وارد کنید
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mapbox-token">Mapbox Public Token</Label>
              <Input
                id="mapbox-token"
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                placeholder="pk.eyJ1IjoieW91ciB1c2VybmFtZSIsImEiOiJjbGV..."
                type="password"
              />
            </div>
            <Button 
              onClick={connectMapbox}
              disabled={!mapboxToken.trim()}
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              اتصال به نقشه
            </Button>
            <p className="text-sm text-muted-foreground">
              برای دریافت کلید API به 
              <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline mx-1">
                mapbox.com
              </a>
              مراجعه کنید
            </p>
          </CardContent>
        </Card>
      )}

      {/* Map Container */}
      <Card className="bg-card/50 backdrop-blur-sm border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            نقشه تعاملی کشف‌ها
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-96 bg-muted/20 rounded-lg flex items-center justify-center border-2 border-dashed border-border">
            {showTokenInput ? (
              <div className="text-center space-y-2">
                <Map className="w-12 h-12 text-muted-foreground mx-auto" />
                <p className="text-muted-foreground">لطفاً ابتدا کلید API مپ‌باکس را وارد کنید</p>
              </div>
            ) : (
              <div className="text-center space-y-2">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Map className="w-16 h-16 text-primary mx-auto mb-2" />
                    <p className="text-lg font-medium text-foreground">نقشه Mapbox</p>
                    <p className="text-sm text-muted-foreground">در حال بارگذاری...</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Detected Locations List */}
      <Card className="bg-card/50 backdrop-blur-sm border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="w-5 h-5 text-accent" />
            مکان‌های شناسایی شده
          </CardTitle>
          <CardDescription>
            فهرست دستگاه‌های کشف شده با جزئیات مکان و وضعیت
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {minerLocations.map((miner) => (
              <div 
                key={miner.id}
                className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                  selectedMiner?.id === miner.id 
                    ? 'bg-primary/10 border-primary' 
                    : 'bg-secondary/30 border-border hover:bg-secondary/50'
                }`}
                onClick={() => setSelectedMiner(miner)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-4 h-4 rounded-full ${
                      miner.status === 'active' ? 'bg-accent detection-pulse' :
                      miner.status === 'suspected' ? 'bg-primary' : 'bg-muted-foreground'
                    }`}></div>
                    
                    <div>
                      <h4 className="font-medium text-foreground">{miner.name}</h4>
                      <p className="text-sm text-muted-foreground">{miner.address}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-primary font-medium">{miner.hashRate}</span>
                        <span className="text-xs text-muted-foreground">
                          • اطمینان: {miner.confidence}%
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Badge 
                      variant={miner.status === 'active' ? 'default' : 'outline'}
                      className={
                        miner.status === 'active' ? 'bg-accent text-accent-foreground' :
                        miner.status === 'suspected' ? 'border-primary text-primary' :
                        'border-muted-foreground text-muted-foreground'
                      }
                    >
                      {miner.status === 'active' ? 'فعال' :
                       miner.status === 'suspected' ? 'مشکوک' : 'غیرفعال'}
                    </Badge>
                    
                    <Button size="sm" variant="outline">
                      مسیریابی
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Location Details */}
      {selectedMiner && (
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle>جزئیات مکان انتخاب شده</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">نام دستگاه</Label>
                  <p className="text-foreground">{selectedMiner.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">آدرس</Label>
                  <p className="text-foreground">{selectedMiner.address}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">مختصات</Label>
                  <p className="text-foreground">
                    {selectedMiner.lat.toFixed(6)}, {selectedMiner.lng.toFixed(6)}
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">نرخ هش</Label>
                  <p className="text-primary font-medium">{selectedMiner.hashRate}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">درصد اطمینان</Label>
                  <p className="text-accent font-medium">{selectedMiner.confidence}%</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">وضعیت</Label>
                  <Badge 
                    variant={selectedMiner.status === 'active' ? 'default' : 'outline'}
                    className={selectedMiner.status === 'active' ? 'bg-accent text-accent-foreground' : ''}
                  >
                    {selectedMiner.status === 'active' ? 'فعال' :
                     selectedMiner.status === 'suspected' ? 'مشکوک' : 'غیرفعال'}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <Button className="bg-primary hover:bg-primary/90">
                مسیریابی به این مکان
              </Button>
              <Button variant="outline">
                اشتراک‌گذاری مختصات
              </Button>
              <Button variant="outline">
                ایجاد گزارش
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SmartMap;
