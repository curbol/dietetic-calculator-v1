import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http';

import { Unit, IUnit } from './unit.model';
import { Observable } from 'rxjs/Observable';

const URL = {
  units: 'http://www.dieteticcalc.com/api/units.json',
};

@Injectable()
export class UnitService {
  constructor(private http: Http) {}

  getAll = (): Observable<IUnit[]> =>
    this.http.get(URL.units)
      .map(response => response.json())
      .map(units => units.map(Unit.fromServer))
}
