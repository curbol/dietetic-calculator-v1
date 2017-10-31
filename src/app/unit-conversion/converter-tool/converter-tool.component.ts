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
  sourceUnit: Unit.Unit;
  targetUnit: Unit.Unit;

  _sourceValue: number;
  get sourceValue(): number {
    return this._sourceValue;
  }
  set sourceValue(value: number) {
    this._sourceValue = Num.round(value, 5) || 0;
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

  constructor(private activatedRoute: ActivatedRoute) {
    this.allUnits = activatedRoute.snapshot.data['allUnits'];
    this.unitTypeIds = Enum.getValues(Unit.Type.Id);
    this.selectedTypeId = this.unitTypeIds[0];
    this._sourceValue = 0;
    this._targetValue = 0;

    this.setDefaultUnits(this.allUnits[this.selectedTypeId]);
  }

  ngOnInit() {}

  onTypeChange = () => this.setDefaultUnits(this.allUnits[this.selectedTypeId]);

  onUnitChange = () => this.updateTargetValue();

  getConversion = (sourceUnit: Unit.Unit) => (targetUnit: Unit.Unit) => (sourceValue: number) => {
    if (!sourceUnit || !targetUnit || !sourceValue) { return; }
    return Unit.conversion(sourceUnit.factor)(targetUnit.factor)(sourceValue);
  }

  getTypeString = (typeId: Unit.Type.Id): string => Unit.Type.Id[typeId];
  getUnitString = (symbol: Unit.Symbol): string => Unit.Symbol[symbol];

  private setDefaultUnits = (unitGroup: Unit.Unit[]) => {
    this.sourceUnit = unitGroup[0];
    this.targetUnit = unitGroup[1];
  }

  private updateSourceValue = () => {
    const conversion: number = this.getConversion(this.targetUnit)(this.sourceUnit)(this.targetValue);
    this._sourceValue = Num.round(conversion, 5) || 0;
  }

  private updateTargetValue = () => {
    const conversion: number = this.getConversion(this.sourceUnit)(this.targetUnit)(this.sourceValue);
    this._targetValue = Num.round(conversion, 5) || 0;
  }
}
