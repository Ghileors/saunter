import { DEFAULT_LOCATION, INITIAL_ROUTE_DATA } from '../../constants/map-constants';
import { IRouteState, RoutesAction, RouteActionTypes, IRoute } from '../../types/route';

const initialState: IRouteState = {
  currentLocation: DEFAULT_LOCATION,
  routesList: [],
  newRoute: INITIAL_ROUTE_DATA,
  newRouteLength: '',
  selectedRoute: null,
  searchQuery: '',
};

export const routesReducer = (state = initialState, action: RoutesAction): IRouteState => {
  switch (action.type) {
    case RouteActionTypes.SET_SELECTED_ROUTE:
      return { ...state, selectedRoute: action.payload };

    case RouteActionTypes.SET_ROUTES:
      return { ...state, routesList: action.payload };

    case RouteActionTypes.UPDATE_NEW_ROUTE_FIELD:
      return { ...state, newRoute: { ...state.newRoute, ...action.payload } };

    case RouteActionTypes.SET_NEW_ROUTE_LENGTH:
      return { ...state, newRouteLength: action.payload };

    case RouteActionTypes.SET_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload };

    case RouteActionTypes.SET_CURRENT_LOCATION:
      return { ...state, currentLocation: action.payload };

    case RouteActionTypes.RESET_NEW_ROUTE_FIELDS:
      return { ...state, newRoute: INITIAL_ROUTE_DATA };

    default:
      return state;
  }
};
