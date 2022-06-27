import { Dispatch } from 'redux';
import { getRoutes, createRoute, toggleFavorite, removeRoute } from '../../firebase/services';
import { LatLngLiteral } from '../../types/google';
import { RoutesAction, IRoute, RouteActionTypes, NewRoute } from '../../types/route';

export const fetchRoutes = () => async (dispatch: Dispatch<RoutesAction>) => {
  const routes = await getRoutes();
  dispatch({ type: RouteActionTypes.SET_ROUTES, payload: routes as IRoute[] });
};

export const setSelectedRoute =
  (route: Required<IRoute> | null) => async (dispatch: Dispatch<RoutesAction>) => {
    dispatch({ type: RouteActionTypes.SET_SELECTED_ROUTE, payload: route });
  };

export const resetNewRouteFields = () => async (dispatch: Dispatch<RoutesAction>) => {
  dispatch({ type: RouteActionTypes.RESET_NEW_ROUTE_FIELDS });
};

export const fetchCreateRoute = (route: NewRoute) => async (dispatch: any) => {
  const id = await createRoute(route);
  dispatch(fetchRoutes());
  dispatch(setSelectedRoute({ ...route, id }));
  dispatch(resetNewRouteFields());
};

export const fetchToggleFavorite = (route: IRoute) => async (dispatch: any) => {
  await toggleFavorite(route.id as string, route.isFavorite);
  dispatch(fetchRoutes());
  dispatch(setSelectedRoute({ ...route, isFavorite: !route.isFavorite } as Required<IRoute>));
};

export const fetchRemoveRoute = (routeId: string) => async (dispatch: any) => {
  await removeRoute(routeId);
  dispatch(fetchRoutes());
  dispatch(setSelectedRoute(null));
};

export const updateNewRouteField =
  (field: Partial<NewRoute>) => async (dispatch: Dispatch<RoutesAction>) => {
    dispatch({ type: RouteActionTypes.UPDATE_NEW_ROUTE_FIELD, payload: field });
  };

export const setCurrentLocation =
  (center: LatLngLiteral) => async (dispatch: Dispatch<RoutesAction>) => {
    dispatch({ type: RouteActionTypes.SET_CURRENT_LOCATION, payload: center });
  };

export const setSearchQuery = (query: string) => (dispatch: Dispatch<RoutesAction>) => {
  dispatch({ type: RouteActionTypes.SET_SEARCH_QUERY, payload: query });
};
