import { IUnit } from '@app/unit/models';
import { ICalcState } from '@app/calculator/state/models';
import { IConverterState } from '@app/converter/state/models';
import { IUnitState } from '@app/unit/state/models';

export interface IAppState {
  readonly calculator?: ICalcState;
  readonly converter?: IConverterState;
  readonly unit?: IUnitState;
  readonly router?: any;
}

export interface IAction {
  readonly type: string;
  readonly meta?: any;
  readonly payload?: any;
  readonly error?: Error;
}
