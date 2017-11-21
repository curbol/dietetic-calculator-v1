import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Calc, ICalc, IInput, ISelect } from '@app/calculator/models';
import { Observable } from 'rxjs/Observable';

const URL = {
  calcs: 'http://www.dieteticcalc.com/api/calcs.json',
  inputs: 'http://www.dieteticcalc.com/api/inputs.json',
  selects: 'http://www.dieteticcalc.com/api/selections.json',
};

@Injectable()
export class CalcAPIService {
  // private resultMap: {[key: string]: (inputs: {[key: string]: number}) => (selections: {[key: string]: string}) => number} = {
  //   'bmi': (inputs: {[key: string]: number}) => (selections: {[key: string]: string}): number => {
  //     const weight = inputs['weight'];
  //     const height = inputs['height'];
  //     return this.equationService.bodyMassIndex(weight)(height);
  //   },
  //   'ibw': (inputs: {[key: string]: number}) => (selections: {[key: string]: string}): number => {
  //     const gender = selections['gender'];
  //     const height = inputs['height'];
  //     return this.equationService.idealBodyWeight(gender)(height);
  //   },
  //   'abw': (inputs: {[key: string]: number}) => (selections: {[key: string]: string}): number => {
  //     const gender = selections['gender'];
  //     const weight = inputs['weight'];
  //     const height = inputs['height'];
  //     return this.equationService.adjustedBodyWeight(gender)(weight)(height);
  //   },
  //   'mifflin': (inputs: {[key: string]: number}) => (selections: {[key: string]: string}): number => {
  //     const gender = selections['gender'];
  //     const weight = inputs['weight'];
  //     const height = inputs['height'];
  //     const age = inputs['age'];
  //     return this.equationService.mifflinStJeor(gender)(weight)(height)(age);
  //   },
  // };

  constructor(
    private http: Http,
  ) { }

  getAllCalcs = (): Observable<ICalc[]> =>
    this.http.get(URL.calcs)
      .map(response => response.json())
      .map(serverCalcs => serverCalcs.map(Calc.calcFromServer))

  getAllInputs = (): Observable<IInput[]> =>
    this.http.get(URL.inputs)
      .map(response => response.json())
      .map(serverInputs => serverInputs.map(Calc.inputFromServer))

  getAllSelects = (): Observable<ISelect[]> =>
    this.http.get(URL.selects)
      .map(response => response.json())
      .map(serverSelects => serverSelects.map(Calc.selectFromServer))

  // getResult = (calc: ICalc) => (inputs: IInput[]) => (selections: ISelect[]): number => {
  //   const inputConversions: {[key: string]: number} = this.getInputConversions(calc.inputs)(inputs);
  //   const selectedValues: {[key: string]: string} = this.getSelectedValues(calc.selections)(selections);

  //   if (Object.values(inputConversions).some(a => a === null) ||
  //       Object.values(selectedValues).some(a => a === null)) { return null; }

  //   return this.resultMap[calc.id](inputConversions)(selectedValues);
  // }

  // private getInputConversions = (requests: {id: string; unit: string}[]) => (inputs: IInput[]) => {
  //   const result: {[key: string]: number} = {};
  //   requests.forEach(request => {
  //     const input: IInput = inputs.find(s => s.id === request.id);
  //     const conversion: number = input && input.value ? Calc.inputConversion(input)(request.unit) : null;
  //     result[request.id] = conversion;
  //   });
  //   return result;
  // }

  // private getSelectedValues = (selectionIds: string[]) => (selections: ISelect[]) => {
  //   const result: {[key: string]: string} = {};
  //   selectionIds.forEach(id => {
  //     const selection: ISelect = selections.find(s => s.id === id);
  //     result[id] = selection ? selection.value : null;
  //   });
  //   return result;
  // }
}
