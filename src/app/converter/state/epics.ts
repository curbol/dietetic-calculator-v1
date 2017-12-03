import { Injectable } from '@angular/core';
import { ConverterActions } from '@app/converter/state/actions';
import { createEpicMiddleware } from 'redux-observable';

@Injectable()
export class ConverterEpics {

  constructor(
    private actions: ConverterActions,
  ) { }

  public createConverterEpicsMiddleware() {
    return [
      // createEpicMiddleware(this.createLoadCalcsEpic()),
    ];
  }

  // private createLoadCalcsEpic(): Epic<IAction, IAppState> {
  //   return (action$, store) => action$
  //     .ofType(CalcActions.LOAD_CALC_DATA)
  //     .filter(() => calcsNotAlreadyFetched(store.getState()))
  //     .switchMap(() =>
  //       this.service.getAllCalcs()
  //       .map(data => this.actions.loadCalcsFinished(data))
  //       .catch(response => Observable.of(this.actions.loadCalcsFinished(null, new Error(response.status))))
  //       .startWith(this.actions.loadCalcsStarted())
  //     );
  // }
}
