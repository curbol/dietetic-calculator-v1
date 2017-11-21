
import { indexBy, prop } from 'ramda';
import { Action } from 'redux';
import { ICalcState } from '@app/calculator/calc.models';
import { LoadCalcsAction, LoadInputsAction, LoadSelectionsAction, CalcApiActions } from '@app/calculator/api/actions';

const INITIAL_STATE: ICalcState = {
  calcs: {},
  loadingCalcs: false,
  calcsLoadError: null,
  inputs: {},
  loadingInputs: false,
  inputsLoadError: null,
  selections: {},
  loadingSelections: false,
  selectionsLoadError: null,
};

export const calcReducer = (state: ICalcState = INITIAL_STATE, a: Action): ICalcState => {
  const action = a as LoadCalcsAction|LoadInputsAction|LoadSelectionsAction;

  switch (action.type) {
    case CalcApiActions.LOAD_CALCS_STARTED:
      return {
        ...state,
        calcs: {},
        loadingCalcs: true,
        calcsLoadError: null,
      };
    case CalcApiActions.LOAD_CALCS_FINISHED:
      return {
        ...state,
        calcs: action.payload ? indexBy(prop('id'), action.payload) : null,
        loadingCalcs: false,
        calcsLoadError: action.error,
      };
    case CalcApiActions.LOAD_INPUTS_STARTED:
      return {
        ...state,
        inputs: {},
        loadingInputs: true,
        inputsLoadError: null,
      };
    case CalcApiActions.LOAD_INPUTS_FINISHED:
      return {
        ...state,
        inputs: action.payload ? indexBy(prop('id'), action.payload) : null,
        loadingInputs: false,
        inputsLoadError: action.error,
      };
    case CalcApiActions.LOAD_SELECTIONS_STARTED:
      return {
        ...state,
        selections: {},
        loadingSelections: true,
        selectionsLoadError: null,
      };
    case CalcApiActions.LOAD_SELECTIONS_FINISHED:
      return {
        ...state,
        selections: action.payload ? indexBy(prop('id'), action.payload) : null,
        loadingSelections: false,
        selectionsLoadError: action.error,
      };
    default:
      return state;
  }
};
