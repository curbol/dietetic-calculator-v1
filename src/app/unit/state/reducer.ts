import { Action } from 'redux';

import { IUnit } from '@app/unit/models';
import { IAction } from '@app/store/models';
import { UnitActions } from '@app/unit/state/actions';
import { IUnitState } from '@app/unit/state/models';

const INITIAL_STATE: IUnitState = {
  units: null,
  loadingUnits: false,
  unitsLoadError: null,
};

export const unitReducer = (state: IUnitState = INITIAL_STATE, a: Action): IUnitState => {
  const action = a as IAction;

    switch (action.type) {
      case UnitActions.LOAD_UNITS_STARTED:
        return {
          ...state,
          units: [],
          loadingUnits: true,
          unitsLoadError: null,
        };
      case UnitActions.LOAD_UNITS_FINISHED:
        return {
          ...state,
          units: action.payload,
          loadingUnits: false,
          unitsLoadError: action.error,
        };
      default:
        return state;
    }
};
