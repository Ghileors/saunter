import { combineReducers } from '@reduxjs/toolkit';
import { routesReducer } from './routes/reducer';

const rootReducer = combineReducers({
  routes: routesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
