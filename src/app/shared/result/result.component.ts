import { Component, OnInit, Input, Output } from '@angular/core';

import { Unit } from '@app/unit/unit';
import { UnitService } from '@app/unit/unit.service';

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
    this.convertedValue = value;
  }

  get defaultSymbol(): Unit.Symbol { return Unit.Symbol[this.unitText]; }
  private _unitText: string;
  get unitText(): string { return this._unitText; }
  @Input() set unitText(value: string) {
    this._unitText = value;
    this.setDefaultValues(this.defaultSymbol);
  }

  selectedUnit: Unit.Unit;
  defaultUnit: Unit.Unit;
  unitGroup: Unit.Unit[];

  constructor(private unitService: UnitService) { }

  ngOnInit() { }

  setDefaultValues = (symbol: Unit.Symbol): void => {
    if (symbol === null || symbol === undefined) { return; }

    this.unitService.getUnit(symbol)
    .then((unit: Unit.Unit) => {
      this.defaultUnit = unit;
      this.selectedUnit = unit;
      return this.unitService.getUnitsOfType(unit.type.id);
    }).then((unitsOfType: Unit.Unit[]) => {
      this.unitGroup = unitsOfType;
    });
  }

  getUnitString = (symbol: Unit.Symbol): string => Unit.Symbol[symbol];

  onUnitChange = (unit: Unit.Unit): void => this.updateUnits(unit);

  updateUnits = (unit: Unit.Unit): void => {
    if (!this.selectedUnit || !unit) { return; }
    this.convertedValue = Unit.conversion(this.defaultUnit.factor)(unit.factor)(this.value);
  }
}
