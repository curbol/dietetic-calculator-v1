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

  export const inputReadyToCalculate = (input: Calc.Input): boolean => (input != null && input.value != null);
  export const selectionReadyToCalculate = (selection: Calc.Selection): boolean => (selection != null && selection.value != null);

  export const getSelectionIds = (calcs: Calc.Calc[]) => {
    if (!calcs || calcs.length <= 0) {
      return [];
    }

    const mergedSelectionIds: Calc.Selection.Id[] = [].concat.apply([], calcs.map(c => c.selectionIds));
    const distinctSelectionIds: Calc.Selection.Id[] = mergedSelectionIds.filter((v, i, a) => a.indexOf(v) === i);

    return distinctSelectionIds;
  }

  export const getInputIds = (calcs: Calc.Calc[]) => {
    if (!calcs || calcs.length <= 0) {
      return [];
    }

    const mergedInputIds: Calc.Input.Id[] = [].concat.apply([], calcs.map(c => c.inputIds));
    const distinctInputIds: Calc.Input.Id[] = mergedInputIds.filter((v, i, a) => a.indexOf(v) === i);

    return distinctInputIds;
  }

  export const inputConversion = (input: Calc.Input) => (targetSymbol: Unit.Symbol) => {
    const targetUnit = input.group.find(u => u.symbol === targetSymbol);
    return Unit.conversion(input.unit.factor)(targetUnit.factor)(input.value);
  }

  export const getActiveDataCount = (data: Calc.Data[]): number => data.filter(d => d.active).length;
  export const getAllActiveDataCount = (data: (Calc.Input[]|Calc.Selection[]|Calc.Data[])[]): number => getActiveDataCount([].concat.apply([], data));

  export const getActiveFilledDataCount = (data: Calc.Data[]): number => data.filter(d => d.active && d.value).length;
  export const getAllActiveFilledDataCount = (data: (Calc.Input[]|Calc.Selection[]|Calc.Data[])[]): number => getActiveFilledDataCount([].concat.apply([], data));
}
