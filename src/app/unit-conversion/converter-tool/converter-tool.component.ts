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
  sourceInput: Calc.Input;
  targetInput: Calc.Input;

  constructor(private activatedRoute: ActivatedRoute) {
    this.sourceInput = {
      name: 'Value',
      id: null,
      group: null,
      unit: null,
      active: true,
      value: null,
    };
    this.targetInput = {
      name: 'Value',
      id: null,
      group: null,
      unit: null,
      active: true,
      value: null,
    };

    this.allUnits = activatedRoute.snapshot.data['allUnits'];
    this.unitTypeIds = Enum.getValues(Unit.Type.Id);
    this.selectedTypeId = this.unitTypeIds[0];
  }

  ngOnInit() {
    this.setUnitGroup(this.allUnits[this.selectedTypeId]);
  }

  onTypeChange = () => this.setUnitGroup(this.allUnits[this.selectedTypeId]);

  onUnitChange = () => {
    this.updateTargetValue();
    this.updateInputNames();
  }

  getConversion = (sourceUnit: Unit.Unit) => (targetUnit: Unit.Unit) => (sourceValue: number) => {
    if (!sourceUnit || !targetUnit || !sourceValue) { return; }
    return Unit.conversion(sourceUnit.factor)(targetUnit.factor)(sourceValue);
  }

  getTypeString = (typeId: Unit.Type.Id): string => Unit.Type.Id[typeId];
  getUnitString = (symbol: Unit.Symbol): string => Unit.Symbol[symbol];

  updateSourceValue = () => {
    const conversion: number = this.getConversion(this.targetInput.unit)(this.sourceInput.unit)(this.targetInput.value);
    this.sourceInput.value = Num.round(conversion, 5);
  }

  updateTargetValue = () => {
    const conversion: number = this.getConversion(this.sourceInput.unit)(this.targetInput.unit)(this.sourceInput.value);
    this.targetInput.value = Num.round(conversion, 5);
  }

  updateInputNames = () => {
    this.sourceInput.name = `${this.sourceInput.unit.name} Value`;
    this.targetInput.name = `${this.targetInput.unit.name} Value`;
  }

  private setUnitGroup = (unitGroup: Unit.Unit[]) => {
    this.sourceInput.group = unitGroup;
    this.sourceInput.unit = unitGroup[0];

    this.targetInput.group = unitGroup;
    this.targetInput.unit = unitGroup[1] || unitGroup[0];

    this.updateInputNames();
  }
}
