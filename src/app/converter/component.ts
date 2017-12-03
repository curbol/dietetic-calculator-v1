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
    this.units$.subscribe(units => this.units = units);
  }

  getUnitTypes = (): string[] => Unit.types(this.units);
  getUnitsOfType = (type: string): IUnit[] => Unit.ofType(this.units)(type);
  getInputName = (symbol: string): string => {
    const unit = Unit.find(this.units)(symbol);
    return unit && unit.name ? `${unit.name} Value` : 'Value';
  }

  onTypeChange = (type: string) => this.converterActions.setType(type);
  onValueChange = (value: number) => this.converterActions.setValue(value);
  onUnitChange = (symbol: string) => this.converterActions.setUnit(symbol);
  onConvertedValueChange = (value: number) => this.converterActions.setConvertedValue(value);
  onConvertToUnitChange = (symbol: string) => this.converterActions.setConvertToUnit(symbol);

  // onUnitChange = () => {
  //   this.updateTargetValue();
  //   this.updateInputNames();
  // }

  // updateTargetValue = () => {
  //   const conversion: number = this.getConversion(this.sourceInput.unit)(this.targetInput.unit)(this.sourceInput.value);
  //   this.targetInput.value = Num.round(conversion, 5);
  // }

  // updateSourceValue = () => {
  //   const conversion: number = this.getConversion(this.targetInput.unit)(this.sourceInput.unit)(this.targetInput.value);
  //   this.sourceInput.value = Num.round(conversion, 5);
  // }

  // getConversion = (sourceUnit: IUnit) => (targetUnit: IUnit) => (sourceValue: number) => {
  //   if (!sourceUnit || !targetUnit || !sourceValue) { return; }
  //   return Unit.conversion(sourceUnit.factor)(targetUnit.factor)(sourceValue);
  // }
}
