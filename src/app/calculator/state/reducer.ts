
import { indexBy, prop } from 'ramda';
import { Action } from 'redux';
import { ICalcState, ICalc, IInput, ISelect } from '@app/calculator/models';
import { CalcActions } from '@app/calculator/state/actions';
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
  const action = a as IAction;

  switch (action.type) {
    case CalcActions.LOAD_CALCS_STARTED:
      return {
        ...state,
        calcs: [],
        loadingCalcs: true,
        calcsLoadError: null,
      };
    case CalcActions.LOAD_CALCS_FINISHED:
      return {
        ...state,
        calcs: action.payload,
        loadingCalcs: false,
        calcsLoadError: action.error,
      };
    case CalcActions.LOAD_INPUTS_STARTED:
      return {
        ...state,
        inputs: [],
        loadingInputs: true,
        inputsLoadError: null,
      };
    case CalcActions.LOAD_INPUTS_FINISHED:
      return {
        ...state,
        inputs: action.payload,
        loadingInputs: false,
        inputsLoadError: action.error,
      };
    case CalcActions.LOAD_SELECTS_STARTED:
      return {
        ...state,
        selects: [],
        loadingSelects: true,
        selectsLoadError: null,
      };
    case CalcActions.LOAD_SELECTS_FINISHED:
      return {
        ...state,
        selects: action.payload,
        loadingSelects: false,
        selectsLoadError: action.error,
      };
    case CalcActions.SET_CALCS_ACTIVE:
      return {
        ...state,
        calcs: state.calcs.map(calc => {
          const data = action.payload.find(i => i.id === calc.id);
          return data ? {...calc, active: data.active } : calc;
        })
      };
    case CalcActions.SET_INPUTS_ACTIVE:
      return {
        ...state,
        inputs: state.inputs.map(input => {
          const data = action.payload.find(i => i.id === input.id);
          return data ? {...input, active: data.active } : input;
        })
      };
    case CalcActions.SET_SELECTS_ACTIVE:
      return {
        ...state,
        selects: state.selects.map(select => {
          const data = action.payload.find(i => i.id === select.id);
          return data ? {...select, active: data.active } : select;
        })
      };
    case CalcActions.SET_INPUTS_UNIT:
      return {
        ...state,
        inputs: state.inputs.map(input => {
          const data = action.payload.find(i => i.id === input.id);
          return data ? {...input, unit: data.symbol } : input;
        })
      };
    case CalcActions.SET_INPUTS_VALUE:
      return {
        ...state,
        inputs: state.inputs.map(input => {
          const data = action.payload.find(i => i.id === input.id);
          return data ? {...input, value: data.value } : input;
        })
      };
    case CalcActions.SET_SELECTS_VALUE:
      return {
        ...state,
        selects: state.selects.map(select => {
          const data = action.payload.find(i => i.id === select.id);
          return data ? {...select, value: data.value } : select;
        })
      };
    default:
      return state;
  }
};
