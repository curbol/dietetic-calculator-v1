import { Injectable } from '@angular/core';
import { createEpicMiddleware, Epic } from 'redux-observable';
import { Observable } from 'rxjs/Observable';

import { UnitAPIService } from '@app/unit/api/service';
import { UnitActions } from '@app/unit/state/actions';
import { IAction, IAppState } from '@app/store/models';

const unitsNotAlreadyFetched = (state: IAppState): boolean =>
  !(state.unit && state.unit.length);

@Injectable()
export class UnitEpics {
  constructor(
    private service: UnitAPIService,
    private actions: UnitActions,
  ) {}

  public createUnitEpicsMiddleware() {
    return [
      createEpicMiddleware(this.createLoadUnitsEpic()),
    ];
  }

  private createLoadUnitsEpic(): Epic<IAction, IAppState> {
    return (action$, store) => action$
      .ofType(UnitActions.LOAD_UNIT_DATA)
      .filter(() => unitsNotAlreadyFetched(store.getState()))
      .switchMap(() =>
        this.service.getAllUnits()
        .map(data => this.actions.loadUnitsFinished(data))
        .catch(response => Observable.of(this.actions.loadUnitsFinished(null, new Error(response.status))))
        .startWith(this.actions.loadUnitsStarted())
      );
  }
}
