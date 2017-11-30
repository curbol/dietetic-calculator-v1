import { Injectable } from '@angular/core';
import { Epic, createEpicMiddleware } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { CalcAPIService } from '@app/calculator/api/service';
import { CalcActions } from '@app/calculator/state/actions';
import { IAppState, IAction } from '@app/store/models';
import { IInput, ISelect, ICalc } from '@app/calculator/models';
import { difference } from 'ramda';
import { EquationService } from '@app/calculator/equation/service';

const calcsNotAlreadyFetched = (state: IAppState): boolean =>
  !(state.calculator && state.calculator.calcs && state.calculator.calcs.length);

const inputsNotAlreadyFetched = (state: IAppState): boolean =>
  !(state.calculator && state.calculator.inputs && state.calculator.inputs.length);

const selectsNotAlreadyFetched = (state: IAppState): boolean =>
  !(state.calculator && state.calculator.selects && state.calculator.selects.length);

@Injectable()
export class CalcEpics {
  constructor(
    private service: CalcAPIService,
    private actions: CalcActions,
    private equations: EquationService
  ) {}

  public createCalcEpicsMiddleware() {
    return [
      createEpicMiddleware(this.createLoadCalcsEpic()),
      createEpicMiddleware(this.createLoadInputsEpic()),
      createEpicMiddleware(this.createLoadSelectsEpic()),
      createEpicMiddleware(this.createSetActiveInputsEpic()),
      createEpicMiddleware(this.createSetActiveSelectsEpic()),
      createEpicMiddleware(this.createCalculateOutputsEpic()),
    ];
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
      .filter(() => inputsNotAlreadyFetched(store.getState()))
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
      .filter(() => selectsNotAlreadyFetched(store.getState()))
      .switchMap(() =>
        this.service.getAllSelects()
        .map(data => this.actions.loadSelectsFinished(data))
        .catch(response => Observable.of(this.actions.loadSelectsFinished(null, new Error(response.status))))
        .startWith(this.actions.loadSelectsStarted())
      );
  }

  private createSetActiveInputsEpic(): Epic<IAction, IAppState> {
    return (action$, store) => action$
      .ofType(CalcActions.SET_CALCS_ACTIVE)
      .map(action => {
        const state = store.getState();
        const activeInputIds: string[] = state.calculator.calcs
          .filter(c => c.active)
          .map(c => c.inputs)
          .reduce((acc, cur) => [...acc, ...difference(cur, acc)], []);

        return state.calculator.inputs
          .filter(i => i.active !== activeInputIds.includes(i.id))
          .map(i => ({ id: i.id, active: !i.active }));
      })
      .map(data => this.actions.setInputsActive(data));
  }

  private createSetActiveSelectsEpic(): Epic<IAction, IAppState> {
    return (action$, store) => action$
      .ofType(CalcActions.SET_CALCS_ACTIVE)
      .map(action => {
        const state = store.getState();
        const activeSelectIds: string[] = state.calculator.calcs
          .filter(c => c.active)
          .map(c => c.selects)
          .reduce((acc, cur) => [...acc, ...difference(cur, acc)], []);

        return state.calculator.selects
          .filter(s => s.active !== activeSelectIds.includes(s.id))
          .map(s => ({ id: s.id, active: !s.active }));
      })
      .map(data => this.actions.setSelectsActive(data));
  }

  private createCalculateOutputsEpic(): Epic<IAction, IAppState> {
    return (action$, store) => action$
      .ofType(
        CalcActions.SET_INPUTS_UNIT,
        CalcActions.SET_INPUTS_VALUE,
        CalcActions.SET_SELECTS_VALUE,
        CalcActions.SET_OUTPUTS_UNIT,
      )
      .map(action => {
        const state = store.getState();
        return state.calculator.calcs
          .map(calc => ({
            id: calc.id,
            inputs: calc.inputs
              .map<IInput>(id => state.calculator.inputs.find(input => input.id === id))
              .map(input => ({ id: input.id, value: input.value, unit: input.unit })),
            selects: calc.selects
              .map<ISelect>(id => state.calculator.selects.find(select => select.id === id))
              .map(input => ({ id: input.id, value: input.value })),
          }));
      })
      .map(equationData => equationData
        .map<{id: string, value: number}>(data => ({
          id: data.id,
          value: this.equations.getEquation(data.id)(data.inputs, data.selects)
        }))
        .filter(output => output.value || output.value === 0)
      )
      .map(data => this.actions.setOutputsValue(data));
  }
}
