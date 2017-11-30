import { ICalcState } from '@app/calculator/models';
import { Unit, IUnit } from '@app/unit/models';

export interface IAppState {
  readonly routes?: any;
  readonly unit?: IUnit[];
  calculator?: ICalcState;
  readonly converter?: { };
}

export interface IAction {
  readonly type: string;
  readonly meta?: any;
  readonly payload?: any;
  readonly error?: Error;
}
