import { Injectable } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { IUnit } from '@app/unit/models';

@Injectable()
export class ConversionService {
  @select(['unit', 'units']) readonly units$: Observable<IUnit[]>;

  constructor() { }

  public convert = (value: number) => (symbol: string) => (targetSymbol: string): Observable<number> => {
    return this.units$.map(units => );
  }
}
