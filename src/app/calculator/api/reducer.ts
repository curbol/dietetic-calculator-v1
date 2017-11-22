
import { indexBy, prop } from 'ramda';
import { Action } from 'redux';
import { ICalcState, ICalc, IInput, ISelect } from '@app/calculator/models';
import { LoadCalcsAction, LoadInputsAction, LoadSelectsAction, CalcAPIActions } from '@app/calculator/api/actions';
import { IAction } from '@app/store/models';

const INITIAL_STATE: ICalcState = {
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
  const action = a as LoadCalcsAction|LoadInputsAction|LoadSelectsAction;

  switch (action.type) {
    case CalcAPIActions.LOAD_CALCS_STARTED:
      return {
        ...state,
        calcs: {},
        loadingCalcs: true,
        calcsLoadError: null,
      };
    case CalcAPIActions.LOAD_CALCS_FINISHED:
      return {
        ...state,
        calcs: indexBy(prop('id'), action.payload),
        loadingCalcs: false,
        calcsLoadError: action.error,
      };
    case CalcAPIActions.LOAD_INPUTS_STARTED:
      return {
        ...state,
        inputs: {},
        loadingInputs: true,
        inputsLoadError: null,
      };
    case CalcAPIActions.LOAD_INPUTS_FINISHED:
      return {
        ...state,
        inputs: indexBy(prop('id'), action.payload),
        loadingInputs: false,
        inputsLoadError: action.error,
      };
    case CalcAPIActions.LOAD_SELECTS_STARTED:
      return {
        ...state,
        selects: {},
        loadingSelects: true,
        selectsLoadError: null,
      };
    case CalcAPIActions.LOAD_SELECTS_FINISHED:
      return {
        ...state,
        selects: indexBy(prop('id'), action.payload),
        loadingSelects: false,
        selectsLoadError: action.error,
      };
    default:
      return state;
  }
};
