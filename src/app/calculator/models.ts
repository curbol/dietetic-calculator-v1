export interface ICalc {
  readonly id: string;
  readonly type: string;
  readonly title: string;
  readonly subtitle: string;
  readonly inputs: string[];
  readonly selects: string[];
  readonly output: IOutput;
  readonly active: boolean;
}

export interface IInput {
  readonly id: string;
  readonly type: string;
  readonly name: string;
  readonly defaultUnit: string;
  readonly unit: string;
  readonly value: number;
  readonly active: boolean;
}

export interface ISelect {
  readonly id: string;
  readonly name: string;
  readonly options: string[];
  readonly value: string;
  readonly active: boolean;
}

export interface IOutput {
  readonly unit: string;
  readonly convertToUnit: string;
  readonly value: number;
  readonly convertedValue: number;
}

export module Calc {
  export const calcFromServer = (serverCalc: any): ICalc => <ICalc>({
    id: serverCalc.id,
    type: serverCalc.type,
    title: serverCalc.title,
    subtitle: serverCalc.subtitle,
    inputs: <string[]>serverCalc.inputs,
    selects: <string[]>serverCalc.selections,
    output: <IOutput>{
      unit: serverCalc.outputUnit,
      value: null,
      convertToUnit: serverCalc.outputUnit,
      convertedValue: null,
    },
    active: false,
  });

  export const inputFromServer = (serverInput: any): IInput => ({
    id: serverInput.id,
    type: serverInput.type,
    name: serverInput.name,
    defaultUnit: serverInput.defaultUnit,
    unit: serverInput.defaultUnit,
    value: null,
    active: false,
  });

  export const selectFromServer = (serverSelect: any): ISelect => ({
    id: serverSelect.id,
    name: serverSelect.name,
    options: serverSelect.options,
    value: null,
    active: false,
  });
}
