import { markerId, LatLng, LatLngLiteral } from '../types/google-types';

export interface LatLngInterface {
  readonly id?: markerId;
  location: LatLngLiteral;
  latLng: LatLng;
}
