import { Injectable } from '@angular/core';
import { Epic, createEpicMiddleware } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { difference } from 'ramda';

import { CalcAPIService } from '@app/calculator/api/service';
import { CalcActions } from '@app/calculator/state/actions';
import { IAppState, IAction } from '@app/store/models';
import { IInput, ISelect, ICalc } from '@app/calculator/models';
import { Equations } from '@app/calculator/equation/service';
import { ICalcState } from '@app/calculator/state/models';
import { Unit } from '@app/unit/models';

const calcsNotAlreadyFetched = (state: IAppState): boolean =>
  !(state.calculator && state.calculator.calcs && state.calculator.calcs.length);

const inputsNotAlreadyFetched = (state: IAppState): boolean =>
  !(state.calculator && state.calculator.inputs && state.calculator.inputs.length);

const selectsNotAlreadyFetched = (state: IAppState): boolean =>
  !(state.calculator && state.calculator.selects && state.calculator.selects.length);

const getEquationData = (calc: ICalc, state: ICalcState) => ({
  id: calc.id,
  inputs: calc.inputs
    .map<IInput>(id => state.inputs.find(input => input.id === id))
    .map(input => ({ id: input.id, value: input.value, unit: input.unit })),
  selects: calc.selects
    .map<ISelect>(id => state.selects.find(select => select.id === id))
    .map(input => ({ id: input.id, value: input.value })),
});

@Injectable()
export class CalcEpics {
  constructor(
    private service: CalcAPIService,
    private actions: CalcActions,
    private equations: Equations,
  ) {}

  public createCalcEpicsMiddleware() {
    return [
      createEpicMiddleware(this.createLoadCalcsEpic()),
      createEpicMiddleware(this.createLoadInputsEpic()),
      createEpicMiddleware(this.createLoadSelectsEpic()),
      createEpicMiddleware(this.createSetActiveInputsEpic()),
      createEpicMiddleware(this.createSetActiveSelectsEpic()),
      createEpicMiddleware(this.createCalculateOutputsEpic()),
      createEpicMiddleware(this.createOutputsConversionEpic()),
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
        const state = store.getState().calculator;
        const activeInputIds: string[] = state.calcs
          .filter(calc => calc.active)
          .map(calc => calc.inputs)
          .reduce((acc, cur) => [...acc, ...difference(cur, acc)], []);

        return state.inputs
          .filter(input => input.active !== activeInputIds.includes(input.id))
          .map(input => ({ id: input.id, active: !input.active }));
      })
      .filter(data => !!data && !!data.length)
      .map(data => this.actions.setInputsActive(data));
  }

  private createSetActiveSelectsEpic(): Epic<IAction, IAppState> {
    return (action$, store) => action$
      .ofType(CalcActions.SET_CALCS_ACTIVE)
      .map(action => {
        const state = store.getState().calculator;
        const activeSelectIds: string[] = state.calcs
          .filter(calc => calc.active)
          .map(calc => calc.selects)
          .reduce((acc, cur) => [...acc, ...difference(cur, acc)], []);

        return state.selects
          .filter(select => select.active !== activeSelectIds.includes(select.id))
          .map(select => ({ id: select.id, active: !select.active }));
      })
      .filter(data => !!data && !!data.length)
      .map(data => this.actions.setSelectsActive(data));
  }

  private createCalculateOutputsEpic(): Epic<IAction, IAppState> {
    return (action$, store) => action$
      .ofType(
        CalcActions.SET_INPUTS_UNIT,
        CalcActions.SET_INPUTS_VALUE,
        CalcActions.SET_SELECTS_VALUE,
      )
      .map(action => {
        const state = store.getState();
        return state.calculator.calcs
          .map(calc => getEquationData(calc, state.calculator))
          .map(data => ({
            id: data.id,
            value: this.equations.getEquation(data.id)(state.unit.units)(data.inputs)(data.selects)
          }))
          .filter(result => state.calculator.calcs.find(c => c.id === result.id).output.value !== result.value);
      })
      .filter(data => !!data && !!data.length)
      .map(data => this.actions.setOutputsValue(data));
  }

  private createOutputsConversionEpic(): Epic<IAction, IAppState> {
    return (action$, store) => action$
      .ofType(
        CalcActions.SET_OUTPUTS_UNIT,
        CalcActions.SET_OUTPUTS_VALUE,
      )
      .map(action => {
        const state = store.getState();
        return state.calculator.calcs
          .map(calc => ({
            id: calc.id,
            convertedValue: calc.output.value && calc.output.unit && calc.output.convertToUnit
              ? Unit.convertSymbols(state.unit.units)(calc.output.value)(calc.output.unit)(calc.output.convertToUnit)
              : null
          }))
          .filter(result => state.calculator.calcs.find(c => c.id === result.id).output.convertedValue !== result.convertedValue);
      })
      .filter(data => !!data && !!data.length)
      .map(data => this.actions.setOutputsConvertedValue(data));
  }
}
