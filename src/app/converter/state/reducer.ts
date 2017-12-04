
import { indexBy, prop } from 'ramda';
import { Action } from 'redux';

import { IAction } from '@app/store/models';
import { IConverterState } from '@app/converter/state/models';
import { ConverterActions } from '@app/converter/state/actions';

const INITIAL_STATE: IConverterState = {
    type: null,
    value: null,
    unit: null,
    convertedValue: null,
    convertToUnit: null,
    converting: false,
};

export const convertReducer = (state: IConverterState = INITIAL_STATE, a: Action): IConverterState => {
  const action = a as IAction;

  switch (action.type) {
    case ConverterActions.SET_TYPE:
      return {...state, type: action.payload};
    case ConverterActions.SET_VALUE:
      return {...state, value: action.payload};
    case ConverterActions.SET_UNIT:
      return {...state, unit: action.payload};
    case ConverterActions.SET_CONVERTED_VALUE:
      return {...state, convertedValue: action.payload};
    case ConverterActions.SET_CONVERT_TO_UNIT:
      return {...state, convertToUnit: action.payload};
    case ConverterActions.SET_CONVERTING:
      return {...state, converting: action.payload};
    default:
      return state;
  }
};
