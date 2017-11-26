
import { indexBy, prop } from 'ramda';
import { Action } from 'redux';
import { ICalcState, ICalc, IInput, ISelect } from '@app/calculator/models';
import { IAction } from '@app/store/models';
import { CalcActions } from '@app/calculator/actions';

const INITIAL_STATE = {
  calcs: null,
  loadingCalcs: false,
  calcsLoadError: null,
  inputs: null,
  loadingInputs: false,
  inputsLoadError: null,
  selects: null,
  loadingSelects: false,
  selectsLoadError: null,
};

export const calcReducer = (state: ICalcState = INITIAL_STATE, a: Action): ICalcState => {
  const action = a as IAction;

  switch (action.type) {
    case CalcActions.ACTIVATE_CALC:
      return {
        ...state,
        calcs: {
          ...state.calcs,
          [action.payload]: {
            ...state.calcs[action.payload],
            active: true,
          }
        },
      };
    case CalcActions.DEACTIVATE_CALC:
      return {
        ...state,
        calcs: {
          ...state.calcs,
          [action.payload]: {
            ...state.calcs[action.payload],
            active: false,
          }
        },
      };
    default:
      return state;
  }
};
