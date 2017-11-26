import { combineReducers } from 'redux';
import { routerReducer } from '@angular-redux/router';

import { calcAPIReducer } from '@app/calculator/api/reducer';
import { calcReducer } from '@app/calculator/reducer';
import { IAppState } from '@app/store/models';

export const rootReducer = combineReducers({
  calculator: calcReducer,
  // router: routerReducer,
});
