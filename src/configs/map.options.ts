import { MapOptions } from '../types/google';

export const mapOptions: MapOptions = {
  mapId: '6b00247e8652e506',
  disableDefaultUI: true,
  clickableIcons: false,
  scrollwheel: true,
};

export const markerOptions = {
  icon: './marker.png',
};

export const directionOptions: google.maps.DirectionsRendererOptions = {
  polylineOptions: {
    zIndex: 50,
    strokeColor: '#1976D2',
    strokeWeight: 5,
  },
  markerOptions,
};
