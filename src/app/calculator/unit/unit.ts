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
    group: IUnit[];
    unit: IUnit;
    value: number;
  }

  export enum System {
    metric, imperial
  }

  export enum Symbol {
    st, lb, kg, g, // weight
    in, ft, cm, m, // distance
  }

  export enum Type {
    weight, distance
  }
}
