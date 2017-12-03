import { IUnit } from '@app/unit/models';

export interface IUnitState {
    readonly units: IUnit[];
    readonly loadingUnits: boolean;
    readonly unitsLoadError: Error;
}
