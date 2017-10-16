import { Unit } from '../unit/unit';

export module Calc {
  export interface Calc {
    id: Calc.Id;
    title: string;
    subTitle: string;
    active: boolean;
    inputIds: Calc.Input.Id[];
    output: Output;
  }

  export enum Id {
    bmi, mifflin
  }

  export interface Input {
    name: string;
    id: Input.Id;
    group: Unit.Unit[];
    unit: Unit.Unit;
    active: boolean;
    value: number;
  }

  export module Input {
    export enum Id {
      weight, height, age,
    }

    export interface Settings {
      name: string;
      id: Id;
      typeId: Unit.Type.Id;
      symbolsFilter: Unit.Symbol[];
      defaultSymbol: Unit.Symbol;
    }
  }

  export interface Output {
    unitText: string;
    result(inputs: Calc.Input[]): number;
  }
}
