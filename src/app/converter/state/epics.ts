import { Injectable } from '@angular/core';
import { createEpicMiddleware, Epic } from 'redux-observable';

import { ConverterActions } from '@app/converter/state/actions';
import { IAction, IAppState } from '@app/store/models';
import { Unit } from '@app/unit/models';

@Injectable()
export class ConverterEpics {

  constructor(
    private actions: ConverterActions,
  ) { }

  public createConverterEpicsMiddleware() {
    return [
      createEpicMiddleware(this.createCalculateConvertToTargetEpic()),
    ];
  }

  private createCalculateConvertToTargetEpic(): Epic<IAction, IAppState> {
    return (action$, store) => action$
      .ofType(
        ConverterActions.SET_VALUE,
        ConverterActions.SET_UNIT,
        ConverterActions.SET_CONVERT_TO_UNIT,
      )
      .map(action => {
        const state = store.getState();
        const convert = state.converter;
        const units = state.unit.units;
        const convertedValue = Unit.convertSymbols(units)(convert.value)(convert.unit)(convert.convertToUnit);
        return convertedValue;
      })
      .filter(convertedValue => convertedValue !== store.getState().converter.convertedValue)
      .map(convertedValue => this.actions.setConvertedValue(convertedValue));
  }
}
