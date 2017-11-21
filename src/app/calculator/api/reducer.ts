
import { indexBy, prop } from 'ramda';
import { Action } from 'redux';
import { ICalcState } from '@app/calculator/models';
import { LoadCalcsAction, LoadInputsAction, LoadSelectsAction, CalcAPIActions } from '@app/calculator/api/actions';

const INITIAL_STATE: ICalcState = {
  calcs: {},
  loadingCalcs: false,
  calcsLoadError: null,
  inputs: {},
  loadingInputs: false,
  inputsLoadError: null,
  selects: {},
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
        calcs: action.payload ? indexBy(prop('id'), action.payload) : null,
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
        inputs: action.payload ? indexBy(prop('id'), action.payload) : null,
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
        selects: action.payload ? indexBy(prop('id'), action.payload) : null,
        loadingSelects: false,
        selectsLoadError: action.error,
      };
    default:
      return state;
  }
};
