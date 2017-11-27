import { Injectable } from '@angular/core';
import { Epic, createEpicMiddleware } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { CalcAPIService } from '@app/calculator/api/service';
import { CalcActions } from '@app/calculator/state/actions';
import { IAppState, IAction } from '@app/store/models';
import { IInput } from '@app/calculator/models';
import { difference } from 'ramda';

const calcsNotAlreadyFetched = (state: IAppState): boolean =>
  !(state.calculator && state.calculator.calcs && Object.keys(state.calculator.calcs).length);

@Injectable()
export class CalcEpics {
  constructor(
    private service: CalcAPIService,
    private actions: CalcActions,
  ) {}

  public createLoadCalcsEpicMiddleware() {
    return createEpicMiddleware(this.createLoadCalcsEpic());
  }

  public createLoadInputsEpicMiddleware() {
    return createEpicMiddleware(this.createLoadInputsEpic());
  }

  public createLoadSelectsEpicMiddleware() {
    return createEpicMiddleware(this.createLoadSelectsEpic());
  }

  public createSetActiveInputsEpicMiddleware() {
    return createEpicMiddleware(this.createSetActiveInputsEpic());
  }

  private createLoadCalcsEpic(): Epic<IAction, IAppState> {
    return (action$, store) => action$
      .ofType(CalcActions.LOAD_CALC_DATA)
      .filter(() => calcsNotAlreadyFetched(store.getState()))
      .switchMap(() =>
        this.service.getAllCalcs()
        .map(data => this.actions.loadCalcsFinished(data))
        .catch(response => Observable.of(this.actions.loadCalcsFinished(null, new Error(response.status))))
        .startWith(this.actions.loadCalcsStarted())
      );
  }

  private createLoadInputsEpic(): Epic<IAction, IAppState> {
    return (action$, store) => action$
      .ofType(CalcActions.LOAD_CALC_DATA)
      .filter(() => calcsNotAlreadyFetched(store.getState()))
      .switchMap(() =>
        this.service.getAllInputs()
        .map(data => this.actions.loadInputsFinished(data))
        .catch(response => Observable.of(this.actions.loadInputsFinished(null, new Error(response.status))))
        .startWith(this.actions.loadInputsStarted())
      );
  }

  private createLoadSelectsEpic(): Epic<IAction, IAppState> {
    return (action$, store) => action$
      .ofType(CalcActions.LOAD_CALC_DATA)
      .filter(() => calcsNotAlreadyFetched(store.getState()))
      .switchMap(() =>
        this.service.getAllSelects()
        .map(data => this.actions.loadSelectsFinished(data))
        .catch(response => Observable.of(this.actions.loadSelectsFinished(null, new Error(response.status))))
        .startWith(this.actions.loadSelectsStarted())
      );
  }

  private createSetActiveInputsEpic(): Epic<IAction, IAppState> {
    return (action$, store) => action$
      .ofType(CalcActions.SET_CALC_ACTIVE)
      .map(action => {
        const calc = store.getState().calculator.calcs.find(c => c.id === action.payload.id);
        if (!calc) { return null; }

        return {
          inputs: calc.inputs.map(i => i.id),
          active: action.payload.active,
        };
      })
      .filter(data => data !== null)
      .map(data => this.actions.setInputsActive(data.inputs, data.active));
  }
}
