
declare global {
  interface Window {
    google?: {
      maps: {
        Map: any;
        MapTypeId: {
          ROADMAP: string;
        };
        Size: any;
        Marker: any;
        DirectionsService: any;
        DirectionsRenderer: any;
        TravelMode: {
          DRIVING: string;
        };
      };
    };
  }
}

export {};
