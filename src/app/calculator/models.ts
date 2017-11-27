export interface ICalc {
  readonly id: string;
  readonly type: string;
  readonly title: string;
  readonly subtitle: string;
  readonly inputs: {id: string; unit: string}[];
  readonly selects: string[];
  readonly outputUnit: string;
  active: boolean;
}

export interface ICalcState {
  calcs: ICalc[];
  loadingCalcs: boolean;
  calcsLoadError: Error;

  inputs: IInput[];
  loadingInputs: boolean;
  inputsLoadError: Error;

  selects: ISelect[];
  loadingSelects: boolean;
  selectsLoadError: Error;
}

export interface IData {
  readonly name: string;
  active: boolean;
  value: number;
}

export interface IInput {
  readonly id: string;
  readonly type: string;
  readonly name: string;
  readonly defaultUnit: string;
  selectedUnit: string;
  active: boolean;
  value: number;
}

export interface ISelect {
  readonly id: string;
  readonly name: string;
  readonly options: string[];
  active: boolean;
  value: string;
}

export module Calc {
  export const calcFromServer = (serverCalc: any): ICalc => ({
    id: serverCalc.id,
    type: serverCalc.type,
    title: serverCalc.title,
    subtitle: serverCalc.subtitle,
    inputs: serverCalc.inputs,
    selects: serverCalc.selections,
    outputUnit: serverCalc.outputUnit,
    active: false,
  });

  export const inputFromServer = (serverInput: any): IInput => ({
    id: serverInput.id,
    type: serverInput.type,
    name: serverInput.name,
    defaultUnit: serverInput.defaultUnit,
    selectedUnit: null,
    active: false,
    value: null,
  });

  export const selectFromServer = (serverSelect: any): ISelect => ({
    id: serverSelect.id,
    name: serverSelect.name,
    options: serverSelect.options,
    active: false,
    value: null,
  });

  export const inputReadyToCalculate = (input: IInput): boolean => (input != null && input.value != null);
  export const selectionReadyToCalculate = (selection: ISelect): boolean => (selection != null && selection.value != null);

  // export const getSelectionIds = (calcs: ICalc[]) => {
  //   if (!calcs || calcs.length <= 0) { return []; }

  //   const mergedSelectionIds: Calc.Selection.Id[] = [].concat.apply([], calcs.map(c => c.selectionIds));
  //   const distinctSelectionIds: Calc.Selection.Id[] = mergedSelectionIds.filter((v, i, a) => a.indexOf(v) === i);

  //   return distinctSelectionIds;
  // };

  // export const getInputIds = (calcs: ICalc[]) => {
  //   if (!calcs || calcs.length <= 0) { return []; }

  //   const mergedInputIds: Calc.Input.Id[] = calcs.map(c => c.inputs.map(i => i.id)).reduce((a, b) => [...a, ...b]);
  //   const distinctInputIds: Calc.Input.Id[] = mergedInputIds.filter((id, index, ids) => ids.indexOf(id) === index);
  //   return distinctInputIds;
  // };

  // export const inputConversion = (input: IInput) => (unit: string) => {
  //   const targetUnit = input.group.find(u => u.symbol === targetSymbol);
  //   if (!input || !input.unit || !targetUnit) { return null; }
  //   return Unit.conversion(input.unit.factor)(targetUnit.factor)(input.value);
  // };

  export const getActiveDataCount = (data: IData[]): number => data.filter(d => d.active).length;
  export const getAllActiveDataCount = (data: (IInput[]|ISelect[]|IData[])[]): number =>
    getActiveDataCount([].concat.apply([], data));

  export const getActiveFilledDataCount = (data: IData[]): number => data.filter(d => d.active && d.value).length;
  export const getAllActiveFilledDataCount = (data: (IInput[]|ISelect[]|IData[])[]): number =>
    getActiveFilledDataCount([].concat.apply([], data));

//   export const toPath = (calcs: ICalc[]) => (selections: Selection[]) => (inputs: IInput[]): string => {
//     const stubs: string[] = [];

//     const activeCalculators: ICalc[] = calcs.filter(c => c.active);
//     if (activeCalculators.length) {
//       const calcsStub = activeCalculators.map(c => `c-${Calc.Id[c.id]}-${Unit.Symbol[c.output.convertSymbol] || ''}`).join(',');
//       stubs.push(calcsStub);
//     }

//     const activeFilledSelecitons: Selection[] = selections.filter(s => s.active && s.value);
//     if (activeFilledSelecitons.length) {
//       const selectionsStub = activeFilledSelecitons.map(s => `o-${Calc.Selection.Id[s.id]}-${Option.Id[s.value.id]}`).join(',');
//       stubs.push(selectionsStub);
//     }

//     const activeFilledInputs: Input[] = inputs.filter(i => i.active && i.value);
//     if (activeFilledInputs.length) {
//       const inputsStub = activeFilledInputs.map(i => `i-${Calc.Input.Id[i.id]}-${i.value}-${Unit.Symbol[i.unit.symbol]}`).join(',');
//       stubs.push(inputsStub);
//     }

//     return stubs.join(',');
//   };

//   const calcFromParts = (parts: string[]): {id: Id, outputSymbol: Unit.Symbol} => {
//     return {id: Id[parts[0]], outputSymbol: Unit.Symbol[parts[1]]};
//   };

//   const selectionFromParts = (parts: string[]): {id: Selection.Id, valueId: Option.Id} => {
//     return {id: Selection.Id[parts[0]], valueId: Option.Id[parts[1]]};
//   };

//   const inputFromParts = (parts: string[]): {id: Input.Id, value: number, symbol: Unit.Symbol} => {
//     return {id: Input.Id[parts[0]], value: +parts[1], symbol: Unit.Symbol[parts[2]]};
//   };

//   export const fromPath = (path: string): {
//     calcs: {id: Id, outputSymbol: Unit.Symbol}[],
//     selections: {id: Selection.Id, valueId: Option.Id}[],
//     inputs: {id: Input.Id, value: number, symbol: Unit.Symbol}[]
//   } => {
//     if (!path) { return; }

//     const calcs: {id: Id, outputSymbol: Unit.Symbol}[] = [];
//     const selections: {id: Selection.Id, valueId: Option.Id}[] = [];
//     const inputs: {id: Input.Id, value: number, symbol: Unit.Symbol}[] = [];

//     const stubs: string[] = path.split(',');
//     stubs.forEach(stub => {
//       if (!stub) { return; }

//       const parts: string[] = stub.split('-');
//       const partsType: string = parts[0];
//       const partsData: string[] = parts.slice(1);
//       if (partsType === 'c') {
//         calcs.push(calcFromParts(partsData));
//       } else if (partsType === 'o') {
//         selections.push(selectionFromParts(partsData));
//       } else if (partsType === 'i') {
//         inputs.push(inputFromParts(partsData));
//       }
//     });

//     return { calcs, selections, inputs };
//   };
}
