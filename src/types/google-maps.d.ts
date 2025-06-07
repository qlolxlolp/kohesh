
declare global {
  interface Window {
    google: any;
  }
}

declare namespace google {
  namespace maps {
    class Map {
      constructor(mapDiv: HTMLElement, options?: any);
      fitBounds(bounds: any): void;
      setCenter(center: any): void;
      setZoom(zoom: number): void;
    }
    
    class Marker {
      constructor(options?: any);
      setMap(map: Map | null): void;
      getPosition(): any;
      addListener(event: string, callback: Function): void;
    }
    
    class InfoWindow {
      constructor(options?: any);
      open(map: Map, marker: Marker): void;
      setContent(content: string): void;
    }
    
    class LatLngBounds {
      constructor();
      extend(point: any): void;
    }
    
    class DirectionsService {
      constructor();
      route(request: any, callback: Function): void;
    }
    
    class DirectionsRenderer {
      constructor();
      setMap(map: Map): void;
      setDirections(result: any): void;
    }
    
    class Size {
      constructor(width: number, height: number);
    }
    
    enum MapTypeId {
      ROADMAP = 'roadmap',
      SATELLITE = 'satellite',
      HYBRID = 'hybrid',
      TERRAIN = 'terrain'
    }
    
    enum TravelMode {
      DRIVING = 'DRIVING',
      WALKING = 'WALKING',
      BICYCLING = 'BICYCLING',
      TRANSIT = 'TRANSIT'
    }
  }
}

export {};
