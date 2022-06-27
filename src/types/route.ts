import { ILatLng, LatLngLiteral } from './google';

export interface IRoute {
  id: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  routeLength: string;
  isFavorite: boolean;
  waypoints: ILatLng[];
}

export type NewRoute = Omit<IRoute, 'id'>;

export type ToggleFavorite = {
  routeId: string;
  isFavorite: boolean;
};

export interface IRouteState {
  currentLocation: LatLngLiteral;
  routesList: IRoute[];
  newRoute: NewRoute;
  selectedRoute: Required<IRoute> | null;
  searchQuery: string;
}

export enum RouteActionTypes {
  SET_ROUTES = 'SET_ROUTES',
  SET_CURRENT_LOCATION = 'SET_CURRENT_LOCATION',
  SET_SELECTED_ROUTE = 'SET_SELECTED_ROUTE',
  UPDATE_NEW_ROUTE_FIELD = 'UPDATE_NEW_ROUTE_FIELD',
  RESET_NEW_ROUTE_FIELDS = 'RESET_NEW_ROUTE_FIELDS',
  SET_SEARCH_QUERY = 'SET_SEARCH_QUERY',
}

interface SetSelectedRoute {
  type: RouteActionTypes.SET_SELECTED_ROUTE;
  payload: Required<IRoute> | null;
}

interface SetRoutes {
  type: RouteActionTypes.SET_ROUTES;
  payload: IRoute[];
}

interface UpdateNewRoute {
  type: RouteActionTypes.UPDATE_NEW_ROUTE_FIELD;
  payload: Partial<NewRoute>;
}

interface SetSearchQ {
  type: RouteActionTypes.SET_SEARCH_QUERY;
  payload: string;
}

interface SetCurLoc {
  type: RouteActionTypes.SET_CURRENT_LOCATION;
  payload: LatLngLiteral;
}

interface ResetNewRoute {
  type: RouteActionTypes.RESET_NEW_ROUTE_FIELDS;
}

export type RoutesAction =
  | SetSelectedRoute
  | SetRoutes
  | UpdateNewRoute
  | SetSearchQ
  | SetCurLoc
  | ResetNewRoute;

export interface IAction {
  readonly type: string;
  readonly payload?: any;
}
