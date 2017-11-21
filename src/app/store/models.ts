import { ICalcState } from '@app/calculator/models';
import { Unit, IUnit } from '@app/unit/models';

export interface IAppState {
  routes?: any;
  calc: ICalcState;
  convert?: {
    readonly unitTypes: Unit.Type[];
    UnitType: Unit.Type;
    readonly unitGroups: {[type: number]: IUnit[]};
    unitGroup: IUnit[];
    sourceValue: number;
    sourceUnit: IUnit;
    targetValue: number;
    targetUnit: IUnit;
  };
}

export interface IAction<T> {
  type: string;
  meta?: any;
  payload?: T;
  error?: Error;
}
