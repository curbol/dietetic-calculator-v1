import { Component, OnInit } from '@angular/core';
import { Calc } from '../../calculator/calc';
import { Unit } from '../../unit/unit';
import { UnitService } from '../../unit/unit.service';
import { Enum } from '../../shared/enum';
import { Num } from '../../shared/num';
import { ActivatedRoute } from '@angular/router';

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
    this._sourceValue = Num.round(value, 5) || 0;
    this.updateTargetValue();
  }

  _sourceUnit: Unit.Unit;
  get sourceUnit(): Unit.Unit {
    return this._sourceUnit;
  }
  set sourceUnit(value: Unit.Unit) {
    this._sourceUnit = value;
    this.updateTargetValue();
  }

  _targetValue: number;
  get targetValue(): number {
    return this._targetValue;
  }
  set targetValue(value: number) {
    this._targetValue = Num.round(value, 5) || 0;
    this.updateSourceValue();
  }

  _targetUnit: Unit.Unit;
  get targetUnit(): Unit.Unit {
    return this._targetUnit;
  }
  set targetUnit(value: Unit.Unit) {
    this._targetUnit = value;
    this.updateTargetValue();
  }

  constructor(private activatedRoute: ActivatedRoute) {
    this.allUnits = activatedRoute.snapshot.data['allUnits'];
    this.unitTypeIds = Enum.getValues(Unit.Type.Id);
    this.selectedTypeId = this.unitTypeIds[0];
    this._sourceUnit = this.allUnits[this.selectedTypeId][0];
    this._targetUnit = this.allUnits[this.selectedTypeId][1];
    this._sourceValue = 0;
    this._targetValue = 0;
  }

  ngOnInit() {}

  onTypeChange = () => {
    const unitGroup: Unit.Unit[] = this.allUnits[this.selectedTypeId];
    this._sourceUnit = unitGroup[0];
    this._targetUnit = unitGroup[1];
  }

  getConversion = (sourceUnit: Unit.Unit) => (targetUnit: Unit.Unit) => (sourceValue: number) => {
    if (!sourceUnit || !targetUnit || !sourceValue) { return; }
    return Unit.conversion(sourceUnit.factor)(targetUnit.factor)(sourceValue);
  }

  getTypeString = (typeId: Unit.Type.Id): string => Unit.Type.Id[typeId];
  getUnitString = (symbol: Unit.Symbol): string => Unit.Symbol[symbol];

  private updateSourceValue = () =>
    this._sourceValue = Num.round(this.getConversion(this.targetUnit)(this.sourceUnit)(this.targetValue), 5)

  private updateTargetValue = () =>
    this._targetValue = Num.round(this.getConversion(this.sourceUnit)(this.targetUnit)(this.sourceValue), 5)
}
