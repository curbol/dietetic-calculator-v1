import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { IUnit, Unit } from '@app/unit/models';

const URL = {
  units: 'http://www.dieteticcalc.com/api/units.json',
};

@Injectable()
export class UnitAPIService {
  constructor(
    private http: Http
  ) {}

  getAllUnits = (): Observable<IUnit[]> =>
    this.http.get(URL.units)
      .map(response => response.json())
      .map(serverUnits => serverUnits.map(Unit.fromServer))
}
