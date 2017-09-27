export interface IUnit {
  symbol: UnitSymbol;
  name: string;
}

export interface Map<T2> {
  [key: string]: T2;
}

export interface IUnitConversion {
  map: Map<Map<(sourceValue: number) => number>>;
}

export interface IUnitGroup {
  name: string;
  units: IUnit[];
  baseUnit: IUnit;
  conversions: IUnitConversion[];
}

export enum UnitSymbol {
  lbs, kg, g, // weight
  in, ft, cm, m, // distance
}

export module UnitSymbol {
  export function toString(unit: UnitSymbol) {
      return UnitSymbol[unit];
  }

  export function parse(unit: string) {
      return UnitSymbol[unit];
  }
}

export module Units {

  const conversions: IUnitConversion = { map: Map};

  map: ['a']['b'] = (sourceValue: number) => sourceValue;

  // const weightUnits: IUnit[] = [
  //   { type: UnitSymbol.lbs, name: 'pounds' },
  //   { type: UnitSymbol.kg, name: 'kilograms' }
  // ];
}
