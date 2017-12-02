import { IUnit } from '@app/unit/models';
import { ICalcState } from '@app/calculator/state/models';

export interface IAppState {
  readonly routes?: any;
  readonly unit?: IUnit[];
  readonly calculator?: ICalcState;
  readonly converter?: { };
}

export interface IAction {
  readonly type: string;
  readonly meta?: any;
  readonly payload?: any;
  readonly error?: Error;
}
