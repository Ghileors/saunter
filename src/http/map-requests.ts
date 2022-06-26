import { ILatLng } from '../types/google';

export const fetchDirection = (markers: ILatLng[]) => {
  const length = markers.length;
  if (!length) return;
  const start = markers[0].position;
  const end = markers[length - 1].position;

  if (start && end) {
    const waypoints = markers.map(({ position }) => {
      return {
        location: `${position.lat},${position.lng}`,
        stopover: false,
      };
    });
    const service = new google.maps.DirectionsService();
    return service.route(
      {
        origin: start,
        destination: end,
        waypoints,
        travelMode: google.maps.TravelMode.WALKING,
      },
      (response, status) => {
        if (status === 'OK' && response) {
          return response;
        }
      }
    );
  }
};
