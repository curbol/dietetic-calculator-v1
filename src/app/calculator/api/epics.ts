import { Injectable } from '@angular/core';
import { Epic, createEpicMiddleware } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { CalcAPIService } from '@app/calculator/api/service';
import { CalcAPIActions, LoadCalcsAction } from '@app/calculator/api/actions';
import { IAppState } from '@app/store/models';


const calcsNotAlreadyFetched = (state: IAppState): boolean =>
  !(state.calc && state.calc.calcs && Object.keys(state.calc.calcs).length);

@Injectable()
export class CalcAPIEpics {
  constructor(
    private service: CalcAPIService,
    private actions: CalcAPIActions,
  ) {}

  public createLoadCalcsEpicMiddleware() {
    return createEpicMiddleware(this.createLoadCalcsEpic());
  }

  private createLoadCalcsEpic(): Epic<LoadCalcsAction, IAppState> {
    return (action$, store) => action$
      .ofType(CalcAPIActions.LOAD_CALCS)
      .filter(() => calcsNotAlreadyFetched(store.getState()))
      .switchMap(() =>
        this.service.getAllCalcs()
        .map(data => this.actions.loadCalcsFinished(data))
        .catch(response => Observable.of(this.actions.loadCalcsFinished(null, new Error(response.status))))
        .startWith(this.actions.loadCalcsStarted())
      );
  }
}
