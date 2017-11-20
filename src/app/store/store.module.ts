import { NgModule } from '@angular/core';
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { NgReduxRouterModule, NgReduxRouter } from '@angular-redux/router';

import { createLogger } from 'redux-logger';

import { IAppState } from '@app/store/IAppState';
import { rootReducer } from './reducers';


@NgModule({
  imports: [
    NgReduxModule,
    NgReduxRouterModule
  ],
  declarations: []
})
export class StoreModule {
  constructor(
    public store: NgRedux<IAppState>,
    devTools: DevToolsExtension,
    ngReduxRouter: NgReduxRouter,
  ) {
    store.configureStore(
      rootReducer,
      {},
      [ createLogger() ],
      devTools.isEnabled() ? [ devTools.enhancer() ] : []);

    if (ngReduxRouter) {
      ngReduxRouter.initialize();
    }
  }
}
