import { Injectable } from '@angular/core';
import { createEpicMiddleware, Epic } from 'redux-observable';
import { head, last } from 'ramda';

import { ConverterActions } from '@app/converter/state/actions';
import { IAction, IAppState } from '@app/store/models';
import { Unit, IUnit } from '@app/unit/models';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ConverterEpics {

  constructor(
    private actions: ConverterActions,
  ) { }

  public createConverterEpicsMiddleware() {
    return [
      createEpicMiddleware(this.createSetDefaultUnitEpic(head, s => this.actions.setUnit(s))),
      createEpicMiddleware(this.createSetDefaultUnitEpic(last, s => this.actions.setConvertToUnit(s))),
      createEpicMiddleware(this.createClearValueOnTypeChangeEpic()),
      createEpicMiddleware(this.createClearConvertedValueOnTypeChangeEpic()),
      createEpicMiddleware(this.createCalculateConvertedValueEpic()),
      createEpicMiddleware(this.createCalculateValueEpic()),
    ];
  }

  private createSetDefaultUnitEpic(
    selector: (units: IUnit[]) => IUnit,
    createAction: (symbol: string) => IAction
  ): Epic<IAction, IAppState> {
    return (action$, store) => action$
      .ofType(ConverterActions.SET_TYPE)
      .map(action => Unit.ofType(store.getState().unit.units)(action.payload))
      .filter(unitsOfType => unitsOfType && !!unitsOfType.length)
      .map(unitsOfType => selector(unitsOfType))
      .filter(unit => unit && !!unit.symbol)
      .map(unit => createAction(unit.symbol));
  }

  private createClearValueOnTypeChangeEpic(): Epic<IAction, IAppState> {
    return (action$, store) => action$
      .ofType(ConverterActions.SET_TYPE)
      .filter(action => store.getState().converter.value !== null)
      .map(action => this.actions.setValue(null));
  }

  private createClearConvertedValueOnTypeChangeEpic(): Epic<IAction, IAppState> {
    return (action$, store) => action$
      .ofType(ConverterActions.SET_TYPE)
      .filter(action => store.getState().converter.convertedValue !== null)
      .map(action => this.actions.setConvertedValue(null));
  }

  private createCalculateConvertedValueEpic(): Epic<IAction, IAppState> {
    return (action$, store) => action$
      .ofType(
        ConverterActions.SET_VALUE,
        ConverterActions.SET_UNIT,
        ConverterActions.SET_CONVERT_TO_UNIT,
      )
      .map(action => {
        const state = store.getState();
        const converter = state.converter;
        return Unit.convertSymbols(state.unit.units)(converter.value)(converter.unit)(converter.convertToUnit);
      })
      .filter(convertedValue => convertedValue !== store.getState().converter.convertedValue)
      .map(convertedValue => this.actions.setCalculatedConvertedValue(convertedValue));
  }

  private createCalculateValueEpic(): Epic<IAction, IAppState> {
    return (action$, store) => action$
      .ofType(ConverterActions.SET_CONVERTED_VALUE)
      .map(action => {
        const state = store.getState();
        const converter = state.converter;
        return Unit.convertSymbols(state.unit.units)(converter.convertedValue)(converter.convertToUnit)(converter.unit);
      })
      .filter(value => value !== store.getState().converter.value)
      .map(value => this.actions.setCalculatedValue(value));
  }
}
