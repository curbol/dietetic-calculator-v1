import { Calc } from '@app/calculator/calc';
import { Unit } from '@app/unit/unit';
import { ICalcState } from '@app/calculator/state/ICalcState';

export interface IAppState {
  routes?: any;
  calc?: ICalcState;
  convert?: {
    readonly unitTypes: Unit.Type[];
    UnitType: Unit.Type;
    readonly unitGroups: {[type: number]: Unit.Unit[]};
    unitGroup: Unit.Unit[];
    sourceValue: number;
    sourceUnit: Unit.Unit;
    targetValue: number;
    targetUnit: Unit.Unit;
  };
}
