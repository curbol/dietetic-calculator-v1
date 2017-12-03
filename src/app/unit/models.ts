import { compose, difference } from 'ramda';

export interface IUnit {
  readonly symbol: string;
  readonly type: string;
  readonly name: string;
  readonly factor: number;
}

export module Unit {
  export const fromServer = (serverUnit: any): IUnit => ({
    symbol: serverUnit.symbol,
    type: serverUnit.type,
    name: serverUnit.name,
    factor: serverUnit.factor,
  });

  export const find = (units: IUnit[]) => (symbol: string): IUnit =>
    (units || []).find(unit => unit.symbol === symbol);

  export const ofType = (units: IUnit[]) => (type: string): IUnit[] =>
    (units || []).filter(unit => unit && unit.type && type && unit.type.toLowerCase() === type.toLowerCase());

  export const types = (units: IUnit[]): string[] =>
    (units || []).map(unit => unit.type).reduce((acc, cur) => [...acc, ...difference([cur], acc)], []);

  export const getDefault = (units: IUnit[]): IUnit =>
    (units || []).find(unit => unit.factor === 1);

  export const defaultOfType = (units: IUnit[]) => (type: string): IUnit =>
    compose(getDefault, ofType(units))(type);

  export const convertSymbols = (units: IUnit[]) => (value: number) => (symbol: string) => (targetSymbol: string) =>
    convertUnits(value)(find(units)(symbol))(find(units)(symbol));

  export const convertUnits = (value: number) => (unit: IUnit) => (targetUnit: IUnit) =>
    convert(value)(unit.factor)(targetUnit.factor);

  export const convert = (value: number) => (factor: number) => (targetFactor: number): number => {
    if ([value, factor, targetFactor].some(x => x === null || x === undefined)) { return null; }
    if (targetFactor === 0) { return undefined; }

    return value * (factor / targetFactor);
  };
}
