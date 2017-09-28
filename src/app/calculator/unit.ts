export module Unit {
  export interface IUnit {
    name: string;
    symbol: Symbol;
    baseSymbol: Symbol;
    system: System;
    convertToBase(value: number): number;
    convertFromBase(value: number): number;
  }

  export enum System {
    metric, imperial
  }

  export enum Symbol {
    st, lb, kg, g, // weight
    in, ft, cm, m, // distance
  }

  export const weightUnits: IUnit[] = [
    {
      name: "kilograms",
      symbol: Symbol.kg,
      baseSymbol: Symbol.g,
      system: System.metric,
      convertToBase: (value: number) => value / 0.001,
      convertFromBase: (value: number) => value * 0.001,
    },
    {
      name: "grams",
      symbol: Symbol.g,
      baseSymbol: Symbol.g,
      system: System.metric,
      convertToBase: (value: number) => value,
      convertFromBase: (value: number) => value,
    },
    {
      name: "pounds",
      symbol: Symbol.lb,
      baseSymbol: Symbol.g,
      system: System.imperial,
      convertToBase: (value: number) => value / 0.0022046,
      convertFromBase: (value: number) => value * 0.0022046,
    },
    {
      name: "stone",
      symbol: Symbol.st,
      baseSymbol: Symbol.g,
      system: System.imperial,
      convertToBase: (value: number) => value / 0.00015747,
      convertFromBase: (value: number) => value * 0.00015747,
    },
  ];

  export const lengthUnits: IUnit[] = [
    {
      name: "centimeters",
      symbol: Symbol.cm,
      baseSymbol: Symbol.m,
      system: System.metric,
      convertToBase: (value: number) => value / 100,
      convertFromBase: (value: number) => value * 100,
    },
    {
      name: "meters",
      symbol: Symbol.m,
      baseSymbol: Symbol.m,
      system: System.metric,
      convertToBase: (value: number) => value,
      convertFromBase: (value: number) => value,
    },
    {
      name: "inches",
      symbol: Symbol.in,
      baseSymbol: Symbol.m,
      system: System.imperial,
      convertToBase: (value: number) => value / 39.37,
      convertFromBase: (value: number) => value * 39.37,
    },
    {
      name: "feet",
      symbol: Symbol.ft,
      baseSymbol: Symbol.m,
      system: System.imperial,
      convertToBase: (value: number) => value / 3.2808,
      convertFromBase: (value: number) => value * 3.2808,
    },
  ];

  export const convertUnits = (sourceUnit: IUnit) => (targetUnit: IUnit) => (sourceValue: number) => {
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
