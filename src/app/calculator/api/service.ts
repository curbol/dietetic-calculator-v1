import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Calc, ICalc, IInput, ISelect } from '@app/calculator/models';
import { Observable } from 'rxjs/Observable';

const URL = {
  calcs: `${location.origin}/api/calcs.json`,
  inputs: `${location.origin}/api/inputs.json`,
  selects: `${location.origin}/api/selections.json`,
};

@Injectable()
export class CalcAPIService {
  constructor(
    private http: Http,
  ) {}

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
}
