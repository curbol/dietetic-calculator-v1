export interface IUnit {
  readonly symbol: string;
  readonly type: string;
  readonly name: string;
  readonly factor: number;
}

export interface IUnitState {
  readonly units: IUnit[];
  readonly loadingUnits: boolean;
  readonly unitsLoadError: Error;
}

export module Unit {
  export const fromServer = (serverUnit: any): IUnit => ({
    symbol: serverUnit.symbol,
    type: serverUnit.type,
    name: serverUnit.name,
    factor: serverUnit.factor,
  });

  export const find = (units: IUnit[]) => (symbol: string): IUnit =>
    units.find(unit => unit.symbol === symbol);

  export const filterByType = (units: IUnit[]) => (type: string): IUnit[] =>
    units.filter(unit => unit.type.toLowerCase() === type.toLowerCase());

  export const getDefault = (units: IUnit[]): IUnit =>
    units.find(unit => unit.factor === 1);

  export const defaultOfType = (units: IUnit[]) => (type: string): IUnit =>
    getDefault(filterByType(units)(type));

  export const convert = (sourceValue: number) => (sourceFactor: number) => (targetFactor: number): number => {
    if ([sourceFactor, targetFactor, sourceValue].some(v => v === null || v === undefined)) { return null; }
    if (targetFactor === 0) { return undefined; }

    return sourceValue * sourceFactor / targetFactor;
  };
}
