import { ICalcState } from '@app/calculator/models';
import { Unit, IUnit } from '@app/unit/models';

export interface IAppState {
  routes?: any;
  calculator?: ICalcState;
  converter?: { };
}

export interface IAction {
  type: string;
  meta?: any;
  payload?: any;
  error?: Error;
}
