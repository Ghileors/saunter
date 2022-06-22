import { markerId, LatLng } from '../types/google-types';

export interface LatLngInterface extends google.maps.LatLngLiteral {
  readonly id?: markerId;
  latLng: LatLng;
}
