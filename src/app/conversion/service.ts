import { Injectable } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { IUnit } from '@app/unit/models';

@Injectable()
export class ConversionService {
  @select(['unit', 'units']) readonly units$: Observable<IUnit[]>;

  private units: IUnit[];

  constructor() {
    this.units$.subscribe(units => this.units = units);
  }

  public convert = (value: number) => (symbol: string) => (targetSymbol: string): number => {
    const unit = this.getUnit(symbol);
    const targetUnit = this.getUnit(targetSymbol);
    if (!(value || value === 0) || !unit || !targetUnit) { return null; }

    return value * (unit.factor / targetUnit.factor);
  }

  private getUnit = (symbol: string) => (this.units || []).find(u => u.symbol === symbol);
}
