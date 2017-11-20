import { Calc } from '@app/calculator/calc';
import { Unit } from '@app/unit/unit';

export interface ICalcState {
  readonly calcs: Calc.Calc[];
  activeCalcs: Calc.Calc[];
  readonly inputs: Calc.Input[];
  activeInputs: Calc.Input[];
}
