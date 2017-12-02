import { ICalc, IInput, ISelect } from '@app/calculator/models';

export interface ICalcState {
    readonly calcs: ICalc[];
    readonly loadingCalcs: boolean;
    readonly calcsLoadError: Error;

    readonly inputs: IInput[];
    readonly loadingInputs: boolean;
    readonly inputsLoadError: Error;

    readonly selects: ISelect[];
    readonly loadingSelects: boolean;
    readonly selectsLoadError: Error;
}
