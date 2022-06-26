import { LatLngLiteral } from '../types/google';

export const getBrowserLocation = (): Promise<LatLngLiteral> => {
  return new Promise((resolve, reject) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude: lat, longitude: lng } = pos.coords;
          resolve({ lat, lng });
        },
        (error) => {
          console.log(error);
        }
      );
    }
  });
};
