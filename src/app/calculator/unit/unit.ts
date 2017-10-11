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

export module Calc {
  export enum OptionId {
    bmi, mifflin
  }

  export enum InputId {
    weight, height, age
  }

  export interface Option {
    id: OptionId;
    title: string;
    subTitle: string;
  }

  export interface IdToInput {
    optionId: OptionId;
    inputId: InputId[];
  }

  export interface Input {
    name: string;
    inputId: InputId;
    group: Unit.Unit[];
    unit: Unit.Unit;
    value: number;
  }
}

export const options: Calc.Option[] = [
  {
    id: Calc.OptionId.bmi,
    title: 'Body Mass Index (BMI)',
    subTitle: 'A measure of body fat in adults',
  },
  {
    id: Calc.OptionId.mifflin,
    title: 'Mifflin St. Jeor',
    subTitle: 'Daily calorie needs for adults',
  }
];

export const optionsToInputs: Calc.IdToInput[] = [
  {
    optionId: Calc.OptionId.bmi,
    inputId: [Calc.InputId.height, Calc.InputId.weight]
  },
  {
    optionId: Calc.OptionId.mifflin,
    inputId: [Calc.InputId.height, Calc.InputId.weight, Calc.InputId.age]
  }
];

export const inputs: Calc.Input[] {

}


