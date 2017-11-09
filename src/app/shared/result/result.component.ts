import { Component, OnInit, Input, Output } from '@angular/core';

import { Unit } from '@app/unit/unit';
import { UnitService } from '@app/unit/unit.service';
import { Num } from '@app/shared/num';

@Component({
  selector: 'dc-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  @Input() title: string;

  convertedValue: number;
  private _value: number;
  get value(): number { return this._value; }
  @Input() set value(value: number) {
    this._value = value;
    this.convertedValue = this.convertValue(this.selectedUnit) || value;
  }

  get defaultSymbol(): Unit.Symbol { return Unit.Symbol[this.unitText]; }
  private _unitText: string;
  get unitText(): string { return this._unitText; }
  @Input() set unitText(value: string) {
    this._unitText = value;
    this.setDefaultValues(this.defaultSymbol);
  }

  get showUnitOptions(): boolean { return this.selectedUnit && this.unitGroup.length > 1; }

  selectedUnit: Unit.Unit;
  defaultUnit: Unit.Unit;
  unitGroup: Unit.Unit[];

  constructor(private unitService: UnitService) { }

  ngOnInit() {
    this.convertedValue = this.value;
  }

  setDefaultValues = (symbol: Unit.Symbol): void => {
    if (symbol === null || symbol === undefined) { return; }

    this.unitService.getUnit(symbol)
    .then((unit: Unit.Unit) => {
      this.defaultUnit = unit;
      this.selectedUnit = unit;
      this.convertedValue = this.convertValue(this.selectedUnit) || this.value;
      return this.unitService.getUnitsOfType(unit.type.id);
    }).then((unitsOfType: Unit.Unit[]) => {
      this.unitGroup = unitsOfType;
    });
  }

  getUnitString = (symbol: Unit.Symbol): string => Unit.Symbol[symbol];

  onUnitChange = (unit: Unit.Unit): number => this.convertedValue = this.convertValue(unit) || this.value;

  convertValue = (unit: Unit.Unit): number => {
    if (!this.selectedUnit || !unit) { return null; }
    return Unit.conversion(this.defaultUnit.factor)(unit.factor)(this.value);
  }
}
