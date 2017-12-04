import { Component, OnInit } from '@angular/core';
import { select, dispatch } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { difference } from 'ramda';

import { IUnit, Unit } from '@app/unit/models';
import { Num } from '@app/shared/num';
import { UnitActions } from '@app/unit/state/actions';
import { ConverterActions } from '@app/converter/state/actions';

@Component({
  selector: 'dc-converter',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
})
export class ConverterComponent implements OnInit {
  @select(['unit', 'units']) readonly units$: Observable<IUnit[]>;
  @select(['converter', 'type']) readonly type$: Observable<string>;
  @select(['converter', 'value']) readonly value$: Observable<number>;
  @select(['converter', 'unit']) readonly unit$: Observable<string>;
  @select(['converter', 'convertedValue']) readonly convertedValue$: Observable<number>;
  @select(['converter', 'convertToUnit']) readonly convertToUnit$: Observable<string>;

  private units: IUnit[];
  unitsOfType: IUnit[];
  types: string[];

  constructor(
    private unitActions: UnitActions,
    private converterActions: ConverterActions,
  ) {
    unitActions.loadUnitData();
  }

  ngOnInit() {
    this.units$.subscribe(units => {
      this.units = units;
      if (!this.units || !this.units.length) { return; }
      this.types = (Unit.types(this.units) || [])
        .filter(type => (Unit.ofType(this.units)(type) || []).length > 1);
      if (!this.types || !this.types.length) { return; }
      this.onTypeChange((this.types || [null])[0]);
    });

    this.type$.subscribe(type => {
      this.unitsOfType = Unit.ofType(this.units)(type);
    });
  }

  rounded = (value: number) => Num.round(value, 5);

  getInputName = (symbol: string): string => {
    const unit = Unit.find(this.units)(symbol);
    return unit && unit.name ? `${unit.name} Value` : 'Value';
  }

  @dispatch() onTypeChange = (type: string) => this.converterActions.setType(type);
  @dispatch() onValueChange = (value: number) => this.converterActions.setValue(value);
  @dispatch() onUnitChange = (symbol: string) => this.converterActions.setUnit(symbol);
  @dispatch() onConvertedValueChange = (value: number) => this.converterActions.setConvertedValue(value);
  @dispatch() onConvertToUnitChange = (symbol: string) => this.converterActions.setConvertToUnit(symbol);
}
