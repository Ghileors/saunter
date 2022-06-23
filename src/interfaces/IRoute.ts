import { ILatLng } from "./ILatLng";

export interface IRoute {
  id?: string;
  name: string;
  desc: string;
  length: string;
  isFavorite: boolean;
  markers: ILatLng[];
}
