import { Unit } from '../unit/unit';

export module Calc {
  export interface Calc {
    id: Calc.Id;
    title: string;
    subTitle: string;
    inputIds: Calc.Input.Id[];
  }

  export enum Id {
    bmi, mifflin
  }

  export interface InputSettings {
    name: string;
    id: Input.Id;
    type: Unit.Type;
  }

  export interface Input {
    name: string;
    id: Input.Id;
    group: Unit.Unit[];
    unit: Unit.Unit;
    value: number;
  }

  export module Input {
    export enum Id {
      weight, height, age
    }
  }

  export interface Output {
    name: string;
    unit: string;
    calcId: Calc.Id.bmi;
    value: number;
  }
}
