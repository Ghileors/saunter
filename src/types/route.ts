import { ILatLng, LatLngLiteral } from './google';

export interface IRoute {
  id?: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  routeLength: string;
  isFavorite: boolean;
  waypoints: ILatLng[];
}

export type ToggleFavorite = {
  routeId: string;
  isFavorite: boolean;
};

export interface IRouteState {
  currentLocation: LatLngLiteral;
  routesList: IRoute[];
  newRoute: IRoute;
  selectedRoute: Required<IRoute> | null;
  searchQuery: string;
}

export enum RouteActionTypes {
  SET_ROUTES = 'SET_ROUTES',
  SET_CURRENT_LOCATION = 'SET_CURRENT_LOCATION',
  SET_SELECTED_ROUTE = 'SET_SELECTED_ROUTE',
  UPDATE_NEW_ROUTE_FIELD = 'UPDATE_NEW_ROUTE_FIELD',
  SET_SEARCH_QUERY = 'SET_SEARCH_QUERY',
}

export interface IAction {
  readonly type: string;
  readonly payload?: any;
}
