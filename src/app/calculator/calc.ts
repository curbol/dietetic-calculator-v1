import { Option } from './option';
import { Unit } from '../unit/unit';

export module Calc {
  export interface Calc {
    id: Calc.Id;
    title: string;
    subTitle: string;
    active: boolean;
    inputIds: Input.Id[];
    selectionIds: Selection.Id[];
    output: Output;
  }

  export enum Id {
    bmi, mifflin
  }

  export interface Data {
    name: string;
    active: boolean;
    value: number;
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

  export interface Selection {
    id: Selection.Id;
    name: string;
    group: Option.Option[];
    value: Option.Option;
    active: boolean;
  }

  export module Selection {
    export enum Id {
      gender
    }
  }

  export interface Output {
    unitText: string;
    result: (inputs: Calc.Input[]) => (selections: Calc.Selection[]) => number;
  }
}
