import { combineReducers } from 'redux';
import { routerReducer } from '@angular-redux/router';

import { IAppState } from '@app/store/models';
import { calcReducer } from '@app/calculator/state/reducer';
import { unitReducer } from '@app/unit/state/reducer';
import { convertReducer } from '@app/converter/state/reducer';

export const rootReducer = combineReducers<IAppState>({
  calculator: calcReducer,
  converter: convertReducer,
  unit: unitReducer,
  // router: routerReducer,
});
