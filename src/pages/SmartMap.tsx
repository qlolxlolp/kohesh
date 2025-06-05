
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Map, MapPin, Navigation, Zap, Thermometer, Wifi } from 'lucide-react';

interface MinerLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  address: string;
  status: 'active' | 'inactive' | 'suspected';
  hashRate: string;
  confidence: number;
  temperature: number;
  signal: number;
}

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

const SmartMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [selectedMiner, setSelectedMiner] = useState<MinerLocation | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  
  const minerLocations: MinerLocation[] = [
    {
      id: '1',
      name: 'Antminer S19 Pro',
      lat: 35.6892,
      lng: 51.3890,
      address: 'تهران، پونک، خیابان آزادی',
      status: 'active',
      hashRate: '110 TH/s',
      confidence: 94,
      temperature: 65,
      signal: 85
    },
    {
      id: '2', 
      name: 'Unknown ASIC',
      lat: 35.7219,
      lng: 51.3347,
      address: 'تهران، ونک، خیابان ولیعصر',
      status: 'suspected',
      hashRate: '85 TH/s',
      confidence: 67,
      temperature: 72,
      signal: 78
    },
    {
      id: '3',
      name: 'Whatsminer M30S',
      lat: 35.6961,
      lng: 51.4231,
      address: 'تهران، نارمک، خیابان دماوند',
      status: 'active',
      hashRate: '88 TH/s',
      confidence: 91,
      temperature: 58,
      signal: 92
    }
  ];

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google) {
        initializeMap();
        return;
      }

      window.initMap = initializeMap;
      
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dOWTgHz-5kbGdI&callback=initMap&libraries=geometry,places`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    };

    const initializeMap = () => {
      if (!mapRef.current || !window.google) return;

      const googleMap = new window.google.maps.Map(mapRef.current, {
        zoom: 11,
        center: { lat: 35.6892, lng: 51.3890 },
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
        styles: [
          {
            featureType: "all",
            elementType: "labels.text.fill",
            stylers: [{ color: "#000000" }]
          }
        ]
      });

      minerLocations.forEach((miner) => {
        const marker = new window.google.maps.Marker({
          position: { lat: miner.lat, lng: miner.lng },
          map: googleMap,
          title: miner.name,
          icon: {
            url: miner.status === 'active' 
              ? 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iOCIgZmlsbD0iIzAwRkYwMCIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc+'
              : miner.status === 'suspected'
              ? 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iOCIgZmlsbD0iI0ZGRkYwMCIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc+'
              : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iOCIgZmlsbD0iI0ZGMDAwMCIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc+',
            scaledSize: new window.google.maps.Size(32, 32)
          }
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="font-family: 'Amiri Quran', serif; direction: rtl; color: black;">
              <h3 style="font-weight: bold; margin: 0 0 8px 0;">${miner.name}</h3>
              <p style="margin: 4px 0;"><strong>آدرس:</strong> ${miner.address}</p>
              <p style="margin: 4px 0;"><strong>نرخ هش:</strong> ${miner.hashRate}</p>
              <p style="margin: 4px 0;"><strong>اطمینان:</strong> ${miner.confidence}%</p>
              <p style="margin: 4px 0;"><strong>دما:</strong> ${miner.temperature}°C</p>
              <p style="margin: 4px 0;"><strong>سیگنال:</strong> ${miner.signal}%</p>
            </div>
          `
        });

        marker.addListener('click', () => {
          infoWindow.open(googleMap, marker);
          setSelectedMiner(miner);
        });
      });

      setMap(googleMap);
      setIsMapLoaded(true);
    };

    loadGoogleMaps();
  }, []);

  const routeToLocation = (miner: MinerLocation) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const origin = `${position.coords.latitude},${position.coords.longitude}`;
        const destination = `${miner.lat},${miner.lng}`;
        const url = `https://www.google.com/maps/dir/${origin}/${destination}`;
        window.open(url, '_blank');
      });
    } else {
      const destination = `${miner.lat},${miner.lng}`;
      const url = `https://www.google.com/maps/search/${destination}`;
      window.open(url, '_blank');
    }
  };

  return (
    <div className="space-y-6 p-6" style={{ background: 'linear-gradient(135deg, #f5f5dc 0%, #deb887 100%)', minHeight: '100vh' }}>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-black mb-4" style={{ fontFamily: 'Amiri Quran' }}>
          نقشه هوشمند تشخیص ماینرها
        </h1>
        <p className="text-black text-lg" style={{ fontFamily: 'Amiri Quran' }}>
          نمایش مکان دستگاه‌های شناسایی شده روی نقشه واقعی گوگل، مسیریابی و تحلیل جغرافیایی
        </p>
      </div>

      {/* Google Map Container */}
      <Card className="access-card map-container">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-black text-xl" style={{ fontFamily: 'Amiri Quran' }}>
            <MapPin className="w-6 h-6 text-black" />
            نقشه تعاملی Google Maps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div 
            ref={mapRef}
            className="w-full h-96 rounded-lg border-2 border-[#8b4513]"
            style={{ background: isMapLoaded ? 'transparent' : '#f5f5dc' }}
          >
            {!isMapLoaded && (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Map className="w-16 h-16 text-black mx-auto mb-4" />
                  <p className="text-black text-lg font-bold" style={{ fontFamily: 'Amiri Quran' }}>
                    در حال بارگذاری نقشه Google Maps...
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Detected Locations List */}
      <Card className="access-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-black text-xl" style={{ fontFamily: 'Amiri Quran' }}>
            <Navigation className="w-6 h-6 text-black" />
            فهرست دستگاه‌های کشف شده
          </CardTitle>
          <CardDescription className="text-black" style={{ fontFamily: 'Amiri Quran' }}>
            جزئیات کامل دستگاه‌های شناسایی شده با اطلاعات دقیق مکان و عملکرد
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {minerLocations.map((miner) => (
              <div 
                key={miner.id}
                className={`p-6 rounded-lg border-2 border-[#8b4513] cursor-pointer transition-all duration-300 ${
                  selectedMiner?.id === miner.id 
                    ? 'bg-gradient-to-r from-[#daa520] to-[#b8860b] shadow-lg transform scale-105' 
                    : 'bg-gradient-to-r from-[#f5f5dc] to-[#deb887] hover:shadow-md hover:transform hover:scale-102'
                }`}
                onClick={() => setSelectedMiner(miner)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className={`w-6 h-6 rounded-full border-2 border-black ${
                      miner.status === 'active' ? 'bg-green-500' :
                      miner.status === 'suspected' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                    
                    <div>
                      <h4 className="font-bold text-xl text-black mb-2" style={{ fontFamily: 'Amiri Quran' }}>
                        {miner.name}
                      </h4>
                      <p className="text-black text-base mb-2" style={{ fontFamily: 'Amiri Quran' }}>
                        {miner.address}
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-blue-600" />
                          <span className="text-black font-bold" style={{ fontFamily: 'Amiri Quran' }}>
                            {miner.hashRate}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Thermometer className="w-4 h-4 text-red-600" />
                          <span className="text-black font-bold" style={{ fontFamily: 'Amiri Quran' }}>
                            {miner.temperature}°C
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Wifi className="w-4 h-4 text-green-600" />
                          <span className="text-black font-bold" style={{ fontFamily: 'Amiri Quran' }}>
                            {miner.signal}%
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-black font-bold" style={{ fontFamily: 'Amiri Quran' }}>
                            اطمینان: {miner.confidence}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Badge 
                      className={`px-4 py-2 text-base font-bold border-2 ${
                        miner.status === 'active' ? 'bg-green-500 border-green-700 text-white' :
                        miner.status === 'suspected' ? 'bg-yellow-500 border-yellow-700 text-black' :
                        'bg-red-500 border-red-700 text-white'
                      }`}
                      style={{ fontFamily: 'Amiri Quran' }}
                    >
                      {miner.status === 'active' ? 'فعال' :
                       miner.status === 'suspected' ? 'مشکوک' : 'غیرفعال'}
                    </Badge>
                    
                    <Button 
                      className="access-button text-base"
                      onClick={(e) => {
                        e.stopPropagation();
                        routeToLocation(miner);
                      }}
                    >
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
        <Card className="access-card">
          <CardHeader>
            <CardTitle className="text-black text-xl" style={{ fontFamily: 'Amiri Quran' }}>
              جزئیات کامل مکان انتخاب شده
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-bold text-black" style={{ fontFamily: 'Amiri Quran' }}>
                    نام دستگاه
                  </Label>
                  <p className="text-black text-lg" style={{ fontFamily: 'Amiri Quran' }}>
                    {selectedMiner.name}
                  </p>
                </div>
                <div>
                  <Label className="text-base font-bold text-black" style={{ fontFamily: 'Amiri Quran' }}>
                    آدرس کامل
                  </Label>
                  <p className="text-black text-lg" style={{ fontFamily: 'Amiri Quran' }}>
                    {selectedMiner.address}
                  </p>
                </div>
                <div>
                  <Label className="text-base font-bold text-black" style={{ fontFamily: 'Amiri Quran' }}>
                    مختصات جغرافیایی
                  </Label>
                  <p className="text-black text-lg font-mono">
                    {selectedMiner.lat.toFixed(6)}, {selectedMiner.lng.toFixed(6)}
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-bold text-black" style={{ fontFamily: 'Amiri Quran' }}>
                    نرخ هش
                  </Label>
                  <p className="text-black font-bold text-lg" style={{ fontFamily: 'Amiri Quran' }}>
                    {selectedMiner.hashRate}
                  </p>
                </div>
                <div>
                  <Label className="text-base font-bold text-black" style={{ fontFamily: 'Amiri Quran' }}>
                    درصد اطمینان
                  </Label>
                  <p className="text-black font-bold text-lg" style={{ fontFamily: 'Amiri Quran' }}>
                    {selectedMiner.confidence}%
                  </p>
                </div>
                <div>
                  <Label className="text-base font-bold text-black" style={{ fontFamily: 'Amiri Quran' }}>
                    وضعیت عملکرد
                  </Label>
                  <Badge 
                    className={`px-4 py-2 text-base font-bold border-2 ${
                      selectedMiner.status === 'active' ? 'bg-green-500 border-green-700 text-white' :
                      selectedMiner.status === 'suspected' ? 'bg-yellow-500 border-yellow-700 text-black' :
                      'bg-red-500 border-red-700 text-white'
                    }`}
                    style={{ fontFamily: 'Amiri Quran' }}
                  >
                    {selectedMiner.status === 'active' ? 'فعال' :
                     selectedMiner.status === 'suspected' ? 'مشکوک' : 'غیرفعال'}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4 mt-8">
              <Button 
                className="access-button text-base"
                onClick={() => routeToLocation(selectedMiner)}
              >
                مسیریابی به این مکان
              </Button>
              <Button 
                className="access-button text-base"
                onClick={() => {
                  navigator.clipboard.writeText(`${selectedMiner.lat}, ${selectedMiner.lng}`);
                  alert('مختصات کپی شد');
                }}
              >
                کپی مختصات
              </Button>
              <Button 
                className="access-button text-base"
                onClick={() => {
                  const report = `گزارش دستگاه: ${selectedMiner.name}\nآدرس: ${selectedMiner.address}\nنرخ هش: ${selectedMiner.hashRate}\nاطمینان: ${selectedMiner.confidence}%`;
                  navigator.clipboard.writeText(report);
                  alert('گزارش کپی شد');
                }}
              >
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
