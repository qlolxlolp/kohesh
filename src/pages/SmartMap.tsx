
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Radar, Route } from 'lucide-react';

const SmartMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);

  // Load Google Maps API
  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google?.maps) {
        setIsLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBDaeWicvigtP9xPv919E-RNoxfvC-Hqik&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => setIsLoaded(true);
      script.onerror = () => console.error('خطا در بارگذاری Google Maps');
      
      document.head.appendChild(script);

      // Cleanup function
      return () => {
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
      };
    };

    const cleanup = loadGoogleMaps();
    return cleanup;
  }, []);

  // Initialize map when API is loaded
  useEffect(() => {
    if (!isLoaded || !mapRef.current || map || !window.google?.maps) return;

    try {
      const initialMap = new window.google.maps.Map(mapRef.current, {
        center: { lat: 35.6892, lng: 51.3890 }, // Tehran coordinates
        zoom: 10,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
        styles: [
          {
            featureType: "all",
            elementType: "geometry",
            stylers: [{ color: "#f5f5dc" }]
          }
        ]
      });

      setMap(initialMap);
      console.log('نقشه Google Maps با موفقیت بارگذاری شد');
    } catch (error) {
      console.error('خطا در ایجاد نقشه:', error);
    }
  }, [isLoaded, map]);

  // Get user location
  useEffect(() => {
    if (!map || !window.google?.maps) return;

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
          
          // Add marker for user location
          new window.google!.maps.Marker({
            position: location,
            map: map,
            title: 'موقعیت شما',
            icon: {
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="red">
                  <circle cx="12" cy="12" r="8"/>
                </svg>
              `),
              scaledSize: new window.google!.maps.Size(24, 24)
            }
          });

          map.setCenter(location);
          console.log('موقعیت کاربر:', location);
        },
        (error) => console.log('خطا در دریافت موقعیت:', error),
        { enableHighAccuracy: true, timeout: 10000 }
      );
    }
  }, [map]);

  const handleRouting = () => {
    if (!map || !userLocation || !window.google?.maps) {
      console.log('نقشه یا موقعیت کاربر در دسترس نیست');
      return;
    }

    console.log('مسیریابی شروع شد از موقعیت:', userLocation);
    
    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();
    
    directionsRenderer.setMap(map);
    
    // Example destination (can be made dynamic)
    const destination = { lat: 35.7575, lng: 51.4280 }; // Milad Tower
    
    directionsService.route({
      origin: userLocation,
      destination: destination,
      travelMode: window.google.maps.TravelMode.DRIVING
    }, (result, status) => {
      if (status === 'OK' && result) {
        directionsRenderer.setDirections(result);
        console.log('مسیر محاسبه شد:', result);
      } else {
        console.error('خطا در مسیریابی:', status);
      }
    });
  };

  const handleDetection = () => {
    if (!map || !window.google?.maps) return;
    
    console.log('تشخیص هوشمند شروع شد');
    
    // Simulate detection points
    const detectionPoints = [
      { lat: 35.6892, lng: 51.3890, type: 'normal' },
      { lat: 35.7000, lng: 51.4000, type: 'suspicious' },
      { lat: 35.6800, lng: 51.3800, type: 'clear' }
    ];

    detectionPoints.forEach((point, index) => {
      setTimeout(() => {
        const color = point.type === 'suspicious' ? 'red' : 
                     point.type === 'normal' ? 'yellow' : 'green';
        
        new window.google!.maps.Marker({
          position: { lat: point.lat, lng: point.lng },
          map: map,
          title: `نقطه تشخیص ${index + 1}`,
          icon: {
            url: `data:image/svg+xml;charset=UTF-8,` + encodeURIComponent(`
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="${color}">
                <circle cx="10" cy="10" r="8" stroke="black" stroke-width="1"/>
              </svg>
            `),
            scaledSize: new window.google!.maps.Size(20, 20)
          }
        });
        
        console.log(`نقطه تشخیص ${index + 1} اضافه شد:`, point);
      }, index * 1000);
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-black" style={{ fontFamily: 'Amiri Quran' }}>
          نقشه هوشمند و مسیریابی
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Control Panel */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="access-card">
            <CardHeader>
              <CardTitle className="text-base font-bold text-black flex items-center gap-2" style={{ fontFamily: 'Amiri Quran' }}>
                <Navigation className="w-5 h-5 text-black" />
                کنترل نقشه
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button onClick={handleRouting} className="w-full access-button">
                <Route className="w-4 h-4 ml-2" />
                مسیریابی هوشمند
              </Button>
              
              <Button onClick={handleDetection} className="w-full access-button">
                <Radar className="w-4 h-4 ml-2" />
                تشخیص نقاط
              </Button>

              <div className="text-sm space-y-2" style={{ fontFamily: 'Amiri Quran', color: 'black' }}>
                <p><strong>وضعیت نقشه:</strong> {isLoaded ? 'بارگذاری شده' : 'در حال بارگذاری...'}</p>
                <p><strong>موقعیت:</strong> {userLocation ? 'شناسایی شده' : 'در حال جستجو...'}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Map Container */}
        <div className="lg:col-span-3">
          <Card className="access-card">
            <CardHeader>
              <CardTitle className="text-base font-bold text-black flex items-center gap-2" style={{ fontFamily: 'Amiri Quran' }}>
                <MapPin className="w-5 h-5 text-black" />
                نقشه تعاملی
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                ref={mapRef}
                className="w-full h-96 bg-gray-100 border-2 border-gray-300 rounded-lg"
                style={{ minHeight: '400px' }}
              >
                {!isLoaded && (
                  <div className="flex items-center justify-center h-full text-black" style={{ fontFamily: 'Amiri Quran' }}>
                    در حال بارگذاری نقشه Google Maps...
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SmartMap;
