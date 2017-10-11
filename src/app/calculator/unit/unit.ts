export module Unit {
  export interface Unit {
    name: string;
    symbol: Symbol;
    type: Type;
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
    in, ft, cm, m, // length
    y, // age
  }

  export enum Type {
    weight, length, age
  }
}

export interface Calc {
  id: Calc.Id;
  title: string;
  subTitle: string;
  inputIds: Input.Id[];
}

export module Calc {
  export enum Id {
    bmi, mifflin
  }
}

export interface Input {
  name: string;
  id: Input.Id;
  type: Unit.Type;
  group: Unit.Unit[];
  unit: Unit.Unit;
  value: number;
}

export module Input {
  export enum Id {
    weight, height, age
  }
}

export const calcs: Calc[] = [
  {
    id: Calc.Id.bmi,
    title: 'Body Mass Index (BMI)',
    subTitle: 'A measure of body fat in adults',
    inputIds: [Input.Id.height, Input.Id.weight]
  },
  {
    id: Calc.Id.mifflin,
    title: 'Mifflin St. Jeor',
    subTitle: 'Daily calorie needs for adults',
    inputIds: [Input.Id.height, Input.Id.weight, Input.Id.age]
  }
];
