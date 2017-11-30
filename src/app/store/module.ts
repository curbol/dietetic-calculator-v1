import { NgModule } from '@angular/core';
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { NgReduxRouterModule, NgReduxRouter } from '@angular-redux/router';
import { createLogger } from 'redux-logger';
import { environment } from '@env/environment';

import { IAppState } from '@app/store/models';
import { RootEpics } from '@app/store/epics';
import { rootReducer } from '@app/store/reducers';
import { ICalcState } from '@app/calculator/models';
import { freezeStateMiddleware } from '@app/store/freezeState';


@NgModule({
  imports: [
    NgReduxModule,
    NgReduxRouterModule
  ],
  declarations: [],
  providers: [RootEpics],
  exports: [
    NgReduxModule,
    NgReduxRouterModule,
  ]
})
export class StoreModule {
  constructor(
    public store: NgRedux<IAppState>,
    devTools: DevToolsExtension,
    ngReduxRouter: NgReduxRouter,
    rootEpics: RootEpics,
  ) {
    store.configureStore(
      rootReducer,
      {},
      [
        createLogger(),
        ...(!environment.production ? [freezeStateMiddleware] : []),
        ...rootEpics.createEpics(),
      ],
      devTools.isEnabled() ? [ devTools.enhancer() ] : []);

    // if (ngReduxRouter) {
    //   ngReduxRouter.initialize();
    // }
  }
}
