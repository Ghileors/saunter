import { Dispatch } from 'redux';
import { getRoutes, createRoute, toggleFavorite, removeRoute } from '../../firebase/services';
import { LatLngLiteral } from '../../types/google';
import { IAction, IRoute, RouteActionTypes } from '../../types/route';

export const fetchRoutes = () => async (dispatch: Dispatch<IAction>) => {
  const routes = await getRoutes();
  dispatch({ type: RouteActionTypes.SET_ROUTES, payload: routes });
};

export const fetchCreateRoute = (route: IRoute) => async (dispatch: any) => {
  await createRoute(route);
  dispatch(fetchRoutes());
};

export const setSelectedRoute = (route: IRoute | null) => async (dispatch: Dispatch<IAction>) => {
  dispatch({ type: RouteActionTypes.SET_SELECTED_ROUTE, payload: route });
};

export const fetchToggleFavorite = (route: IRoute) => async (dispatch: any) => {
  await toggleFavorite(route.id as string, route.isFavorite);
  dispatch(fetchRoutes());
  dispatch(setSelectedRoute({ ...route, isFavorite: !route.isFavorite }));
};
export const fetchRemoveRoute = (routeId: string) => async (dispatch: any) => {
  await removeRoute(routeId);
  dispatch(fetchRoutes());
  dispatch(setSelectedRoute(null));
};

export const updateNewRouteField =
  (field: Partial<IRoute>) => async (dispatch: Dispatch<IAction>) => {
    dispatch({ type: RouteActionTypes.UPDATE_NEW_ROUTE_FIELD, payload: field });
  };

export const updateCenter = (center: LatLngLiteral) => async (dispatch: Dispatch<IAction>) => {
  dispatch({ type: RouteActionTypes.UPDATE_CENTER, payload: center });
};
