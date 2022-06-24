import { Dispatch } from 'redux';
import { getRoutes, createRoute, toggleFavorite } from '../../firebase/services';
import { LatLngLiteral } from '../../types/google';
import { IAction, IRoute, RouteActionTypes } from '../../types/route';

export const fetchRoutes = () => async (dispatch: Dispatch<IAction>) => {
  const routes = await getRoutes();
  dispatch({ type: RouteActionTypes.SET_ROUTES, payload: routes });
};

export const fetchCreateRoute = (route: IRoute) => async (dispatch: Dispatch<IAction>) => {
  await createRoute(route);
  const routes = await getRoutes();
  dispatch({ type: RouteActionTypes.SET_ROUTES, payload: routes });
};

export const fetchToggleFavorite =
  (routeId: string, isFavorite: boolean) => async (dispatch: Dispatch<IAction>) => {
    await toggleFavorite(routeId, isFavorite);
    const routes = await getRoutes();
    dispatch({ type: RouteActionTypes.SET_ROUTES, payload: routes });
  };

export const setSelectedRoute = (route: IRoute) => async (dispatch: Dispatch<IAction>) => {
  dispatch({ type: RouteActionTypes.SET_SELECTED_ROUTE, payload: route });
};

export const updateNewRouteField =
  (field: Partial<IRoute>) => async (dispatch: Dispatch<IAction>) => {
    dispatch({ type: RouteActionTypes.UPDATE_NEW_ROUTE_FIELD, payload: field });
  };

export const updateCenter = (center: LatLngLiteral) => async (dispatch: Dispatch<IAction>) => {
  dispatch({ type: RouteActionTypes.UPDATE_CENTER, payload: center });
};
