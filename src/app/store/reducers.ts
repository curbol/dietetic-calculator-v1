import { combineReducers } from 'redux';
import { routerReducer } from '@angular-redux/router';

import { calcReducer } from '@app/calculator/api/reducer';
import { IAppState } from '@app/store/models';

export const rootReducer = combineReducers({
  calculator: calcReducer,
  // router: routerReducer,
});
