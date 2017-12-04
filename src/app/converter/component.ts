import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
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

  constructor(
    private unitActions: UnitActions,
    private converterActions: ConverterActions,
  ) {
    unitActions.loadUnitData();
  }

  ngOnInit() {
    this.units$.subscribe(units => {
      this.units = units;
      if (!units) { return; }

      this.type$.subscribe(type => {
        if (!type) { this.onTypeChange((this.getUnitTypes() || [null])[0]); }
      });
    });
  }

  getUnitTypes = (): string[] => (Unit.types(this.units) || []).filter(type => (this.getUnitsOfType(type) || []).length > 1);
  getUnitsOfType = (type: string): IUnit[] => Unit.ofType(this.units)(type);
  getInputName = (symbol: string): string => {
    const unit = Unit.find(this.units)(symbol);
    return unit && unit.name ? `${unit.name} Value` : 'Value';
  }

  onTypeChange = (type: string) => {
    this.converterActions.setType(type);
    const unitGroup = this.getUnitsOfType(type);

    if (unitGroup.length > 1) {
      this.onUnitChange(unitGroup[0].symbol);
      this.onConvertToUnitChange(unitGroup[1].symbol);
    }
  }

  onValueChange = (value: number) => this.converterActions.setValue(value);
  onUnitChange = (symbol: string) => this.converterActions.setUnit(symbol);
  onConvertedValueChange = (value: number) => this.converterActions.setConvertedValue(value);
  onConvertToUnitChange = (symbol: string) => this.converterActions.setConvertToUnit(symbol);
}
