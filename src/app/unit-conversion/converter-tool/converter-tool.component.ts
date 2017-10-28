import { Component, OnInit } from '@angular/core';
import { Calc } from '../../calculator/calc';
import { Unit } from '../../unit/unit';
import { UnitService } from '../../unit/unit.service';
import { Enum } from '../../shared/enum';
import { Num } from '../../shared/num';

@Component({
  selector: 'dc-converter-tool',
  templateUrl: './converter-tool.component.html',
  styleUrls: ['./converter-tool.component.css'],
})
export class ConverterToolComponent implements OnInit {
  selectedTypeId: Unit.Type.Id;
  unitTypeIds: Unit.Type.Id[];
  allUnits: {[type: number]: Unit.Unit[]};

  _sourceValue: number;
  get sourceValue(): number {
    return this._sourceValue;
  }
  set sourceValue(value: number) {
    const roundValue = Num.round(value, 5);
    console.log(`set source: ${roundValue}`);
    if (roundValue === this._sourceValue) { return; }
    this._sourceValue = Num.round(roundValue, 5);
    this._targetValue = Num.round(this.getConversion(this.sourceUnit)(this.targetUnit)(this.sourceValue), 5);
  }

  _sourceUnit: Unit.Unit;
  get sourceUnit(): Unit.Unit {
    return this._sourceUnit;
  }
  set sourceUnit(value: Unit.Unit) {
    if (value === this._sourceUnit) { return; }
    this._sourceUnit = value;
    this._targetValue = Num.round(this.getConversion(this.sourceUnit)(this.targetUnit)(this.sourceValue), 5);
  }

  _targetValue: number;
  get targetValue(): number {
    return this._targetValue;
  }
  set targetValue(value: number) {
    const roundValue = Num.round(value, 5);
    console.log(`set target: ${roundValue}`);
    if (roundValue === this._targetValue) { return; }
    this._targetValue = Num.round(roundValue, 5);
    this._sourceValue = Num.round(this.getConversion(this.targetUnit)(this.sourceUnit)(this.targetValue), 5);
  }

  _targetUnit: Unit.Unit;
  get targetUnit(): Unit.Unit {
    return this._targetUnit;
  }
  set targetUnit(value: Unit.Unit) {
    if (value === this._targetUnit) { return; }
    this._targetUnit = value;
    this._sourceValue = Num.round(this.getConversion(this.targetUnit)(this.sourceUnit)(this.targetValue), 5);
  }

  constructor(unitService: UnitService) {
    this.unitTypeIds = Enum.getValues(Unit.Type.Id);

    unitService.getAllUnits().then(units => {
      this.allUnits = units;
      this.selectedTypeId = this.unitTypeIds[0];
      this.onTypeChange(this.selectedTypeId);
    });
  }

  ngOnInit() {}

  onTypeChange = (typeId: Unit.Type.Id) => {
    const unitGroup: Unit.Unit[] = this.allUnits[typeId];
    this.sourceUnit = unitGroup[0];
    this.targetUnit = unitGroup[0];
  }

  getConversion = (sourceUnit: Unit.Unit) => (targetUnit: Unit.Unit) => (sourceValue: number) => {
    if (!sourceUnit || !targetUnit || !sourceValue) { return; }
    return Unit.conversion(sourceUnit.factor)(targetUnit.factor)(sourceValue);
  }

  getTypeString = (typeId: Unit.Type.Id): string => Unit.Type.Id[typeId];

  getUnitString = (symbol: Unit.Symbol): string => Unit.Symbol[symbol];

  private updateSourceValue = () => {
    this.sourceValue = this.getConversion(this.targetUnit)(this.sourceUnit)(this.targetValue);
    console.log('update source');
  }

  private updateTargetValue = () => {
    this.targetValue = this.getConversion(this.sourceUnit)(this.targetUnit)(this.sourceValue);
    console.log('update target');
  }
}
