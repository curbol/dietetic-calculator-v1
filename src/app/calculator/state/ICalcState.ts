import { ICalc, Calc } from "@app/calculator/calc.model";

export interface ICalcState {
  readonly calcs: ICalc[];
  activeCalcs: ICalc[];
  loadingCalcs: boolean;
  readonly inputs: Calc.IInput[];
  activeInputs: Calc.IInput[];
  loadingInputs: boolean;
  readonly selections: Calc.ISelection[];
  activeSelections: Calc.ISelection[];
  loadingSelections: boolean;
}
