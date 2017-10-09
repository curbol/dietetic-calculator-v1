export module Unit {
  export interface IUnit {
    name: string;
    symbol: Symbol;
    type: Type;
    baseSymbol: Symbol;
    system: System;
    convertToBase(value: number): number;
    convertFromBase(value: number): number;
  }

  export interface ISelection {
    name: string;
    group: IUnit[];
    unit: IUnit;
    value: number;
  }

  export enum System {
    metric, imperial
  }

  export enum Symbol {
    st, lb, kg, g, // weight
    in, ft, cm, m, // length
  }

  export enum Type {
    weight, length
  }
}
