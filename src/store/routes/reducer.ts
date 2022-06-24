import { IRouteState, IAction, RouteActionTypes } from '../../types/route';

export {};

const initialState: IRouteState = {
  center: {
    lat: 43,
    lng: -80,
  },
  routesList: [],
  newRoute: {
    name: '',
    shortDesc: '',
    fullDesc: '',
    routeLength: '',
    isFavorite: false,
    waypoints: [],
  },
  selectedRoute: null,
  searchQuery: '',
};

export const routesReducer = (state = initialState, action: IAction): IRouteState => {
  switch (action.type) {
    case RouteActionTypes.SET_SELECTED_ROUTE:
      return { ...state, selectedRoute: action.payload };

    case RouteActionTypes.SET_ROUTES:
      return { ...state, routesList: action.payload };

    case RouteActionTypes.UPDATE_NEW_ROUTE_FIELD:
      return { ...state, newRoute: { ...state.newRoute, ...action.payload } };

    case RouteActionTypes.SET_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload };

    default:
      return state;
  }
};
