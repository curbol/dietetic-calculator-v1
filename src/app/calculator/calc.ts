import { Option } from './option';
import { Unit } from '../unit/unit';

export module Calc {
  export interface Calc {
    readonly id: Calc.Id;
    readonly title: string;
    readonly subTitle: string;
    readonly group: Group;
    readonly inputs: {id: Calc.Input.Id; targetSymbol: Unit.Symbol}[];
    readonly selectionIds: Selection.Id[];
    readonly output: Output;
    active: boolean;
  }

  export enum Id {
    bmi = 1, mifflin, ibw, abw
  }

  export enum Group {
    anthropometric = 1, nutritional_needs
  }

  export interface Data {
    readonly name: string;
    active: boolean;
    value: number;
  }

  export interface Input {
    readonly name: string;
    readonly id: Input.Id;
    readonly group: Unit.Unit[];
    unit: Unit.Unit;
    active: boolean;
    value: number;
  }

  export module Input {
    export enum Id {
      weight = 1, height, age,
    }

    export interface Settings {
      readonly name: string;
      readonly id: Id;
      readonly typeId: Unit.Type.Id;
      readonly symbolsFilter: Unit.Symbol[];
      readonly defaultSymbol: Unit.Symbol;
    }
  }

  export interface Selection {
    readonly id: Selection.Id;
    readonly name: string;
    readonly group: Option.Option[];
    value: Option.Option;
    active: boolean;
  }

  export module Selection {
    export enum Id {
      gender = 1
    }
  }

  export interface Output {
    readonly symbolText: string;
    readonly symbol: Unit.Symbol;
    convertSymbol: Unit.Symbol;
  }

  export const inputReadyToCalculate = (input: Calc.Input): boolean => (input != null && input.value != null);
  export const selectionReadyToCalculate = (selection: Calc.Selection): boolean => (selection != null && selection.value != null);

  export const getSelectionIds = (calcs: Calc.Calc[]) => {
    if (!calcs || calcs.length <= 0) { return []; }

    const mergedSelectionIds: Calc.Selection.Id[] = [].concat.apply([], calcs.map(c => c.selectionIds));
    const distinctSelectionIds: Calc.Selection.Id[] = mergedSelectionIds.filter((v, i, a) => a.indexOf(v) === i);

    return distinctSelectionIds;
  };

  export const getInputIds = (calcs: Calc.Calc[]) => {
    if (!calcs || calcs.length <= 0) { return []; }

    const mergedInputIds: Calc.Input.Id[] = calcs.map(c => c.inputs.map(i => i.id)).reduce((a, b) => [...a, ...b]);
    const distinctInputIds: Calc.Input.Id[] = mergedInputIds.filter((id, index, ids) => ids.indexOf(id) === index);
    return distinctInputIds;
  };

  export const inputConversion = (input: Calc.Input) => (targetSymbol: Unit.Symbol) => {
    const targetUnit = input.group.find(u => u.symbol === targetSymbol);
    if (!input || !input.unit || !targetUnit) { return null; }
    return Unit.conversion(input.unit.factor)(targetUnit.factor)(input.value);
  };

  export const getActiveDataCount = (data: Calc.Data[]): number => data.filter(d => d.active).length;
  export const getAllActiveDataCount = (data: (Calc.Input[]|Calc.Selection[]|Calc.Data[])[]): number =>
    getActiveDataCount([].concat.apply([], data));

  export const getActiveFilledDataCount = (data: Calc.Data[]): number => data.filter(d => d.active && d.value).length;
  export const getAllActiveFilledDataCount = (data: (Calc.Input[]|Calc.Selection[]|Calc.Data[])[]): number =>
    getActiveFilledDataCount([].concat.apply([], data));

  export const toPath = (calcs: Calc[]) => (selections: Selection[]) => (inputs: Input[]): string => {
    const stubs: string[] = [];

    const activeCalculators: Calc[] = calcs.filter(c => c.active);
    if (activeCalculators.length) {
      const calcsStub = activeCalculators.map(c => `c-${Calc.Id[c.id]}-${Unit.Symbol[c.output.convertSymbol] || ''}`).join(',');
      stubs.push(calcsStub);
    }

    const activeFilledSelecitons: Selection[] = selections.filter(s => s.active && s.value);
    if (activeFilledSelecitons.length) {
      const selectionsStub = activeFilledSelecitons.map(s => `o-${Calc.Selection.Id[s.id]}-${Option.Id[s.value.id]}`).join(',');
      stubs.push(selectionsStub);
    }

    const activeFilledInputs: Input[] = inputs.filter(i => i.active && i.value);
    if (activeFilledInputs.length) {
      const inputsStub = activeFilledInputs.map(i => `i-${Calc.Input.Id[i.id]}-${i.value}-${Unit.Symbol[i.unit.symbol]}`).join(',');
      stubs.push(inputsStub);
    }

    return stubs.join(',');
  };

  const calcFromParts = (parts: string[]): {id: Id, outputSymbol: Unit.Symbol} => {
    return {id: Id[parts[0]], outputSymbol: Unit.Symbol[parts[1]]};
  };

  const selectionFromParts = (parts: string[]): {id: Selection.Id, valueId: Option.Id} => {
    return {id: Selection.Id[parts[0]], valueId: Option.Id[parts[1]]};
  };

  const inputFromParts = (parts: string[]): {id: Input.Id, value: number, symbol: Unit.Symbol} => {
    return {id: Input.Id[parts[0]], value: +parts[1], symbol: Unit.Symbol[parts[2]]};
  };

  export const fromPath = (path: string): {
    calcs: {id: Id, outputSymbol: Unit.Symbol}[],
    selections: {id: Selection.Id, valueId: Option.Id}[],
    inputs: {id: Input.Id, value: number, symbol: Unit.Symbol}[]
  } => {
    if (!path) { return; }

    const calcs: {id: Id, outputSymbol: Unit.Symbol}[] = [];
    const selections: {id: Selection.Id, valueId: Option.Id}[] = [];
    const inputs: {id: Input.Id, value: number, symbol: Unit.Symbol}[] = [];

    const stubs: string[] = path.split(',');
    stubs.forEach(stub => {
      if (!stub) { return; }

      const parts: string[] = stub.split('-');
      const partsType: string = parts[0];
      const partsData: string[] = parts.slice(1);
      if (partsType === 'c') {
        calcs.push(calcFromParts(partsData));
      } else if (partsType === 'o') {
        selections.push(selectionFromParts(partsData));
      } else if (partsType === 'i') {
        inputs.push(inputFromParts(partsData));
      }
    });

    return { calcs, selections, inputs };
  };
}
