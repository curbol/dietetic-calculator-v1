export module Unit {
  export interface IUnit {
    name: string;
    symbol: Symbol;
    baseSymbol: Symbol;
    convertToBase(value: number): number;
    convertFromBase(value: number): number;
  }

  export enum Symbol {
    st, lb, kg, g, // weight
    in, ft, cm, m, // distance
  }

  export const units: IUnit[] = [
    {
      name: "pound",
      symbol: Symbol.lb,
      baseSymbol: Symbol.g,
      convertToBase: (value: number) => value / 0.0022046,
      convertFromBase: (value: number) => value * 0.0022046,
    },
    {
      name: "inch",
      symbol: Symbol.in,
      baseSymbol: Symbol.m,
      convertToBase: (value: number) => value / 39.370,
      convertFromBase: (value: number) => value * 39.370,
    }
  ];

  export const getWeightUnits = () => Unit.units.filter(u => u.baseSymbol === Symbol.g);
  export const getLengthUnits = () => Unit.units.filter(u => u.baseSymbol === Symbol.m);

  export const convertUnits = (sourceSymbol: Symbol) => (targetSymbol: Symbol) => (sourceValue: number) => {
    const sourceUnit: IUnit = units[sourceSymbol];
    const targetUnit: IUnit = units[targetSymbol];
    if (!sourceUnit || !targetUnit) {
      throw Error(`Source or target unit does not exist. 
        Source: {${Symbol[sourceUnit.baseSymbol]}: ${sourceUnit}}, 
        Target: {${Symbol[targetUnit.baseSymbol]}: ${targetUnit}}`);
    }
    if (sourceUnit.baseSymbol !== targetUnit.baseSymbol) {
      throw Error(`Units must have the same base unit. Source: ${Symbol[sourceUnit.baseSymbol]}, Target: ${Symbol[targetUnit.baseSymbol]}`);
    }

    const baseValue: number = sourceUnit.convertToBase(sourceValue);
    const targetValue: number = targetUnit.convertFromBase(baseValue);
    return targetValue;
  }
}
