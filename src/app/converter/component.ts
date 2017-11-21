import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'dc-converter',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
})
export class ConverterComponent implements OnInit {
  selectedTypeId: Unit.Type.Id;
  unitTypeIds: Unit.Type.Id[];
  allUnits: {[type: number]: Unit.Unit[]};
  sourceInput: Calc.IInput;
  targetInput: Calc.IInput;

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

  updateTargetValue = () => {
    const conversion: number = this.getConversion(this.sourceInput.unit)(this.targetInput.unit)(this.sourceInput.value);
    this.targetInput.value = Num.round(conversion, 5);
  }

  updateSourceValue = () => {
    const conversion: number = this.getConversion(this.targetInput.unit)(this.sourceInput.unit)(this.targetInput.value);
    this.sourceInput.value = Num.round(conversion, 5);
  }

  getConversion = (sourceUnit: IUnit) => (targetUnit: IUnit) => (sourceValue: number) => {
    if (!sourceUnit || !targetUnit || !sourceValue) { return; }
    return Unit.conversion(sourceUnit.factor)(targetUnit.factor)(sourceValue);
  }

  getTypeString = (typeId: Unit.Type.Id): string => Unit.Type.Id[typeId];
  getUnitString = (symbol: Unit.Symbol): string => Unit.Symbol[symbol];

  updateInputNames = () => {
    this.sourceInput = Object.assign({}, this.sourceInput, {name: `${this.sourceInput.unit.name} Value`});
    this.targetInput = Object.assign({}, this.targetInput, {name: `${this.targetInput.unit.name} Value`});
  }

  private setUnitGroup = (unitGroup: IUnit[]) => {
    const firstUnit = unitGroup  && unitGroup.length > 0 ? unitGroup[0] : null;
    const secondUnit = unitGroup && unitGroup.length > 1 ? unitGroup[1] : null;

    this.sourceInput = Object.assign({}, this.sourceInput, {group: unitGroup, unit: firstUnit});
    this.targetInput = Object.assign({}, this.targetInput, {group: unitGroup, unit: secondUnit});

    this.updateInputNames();
  }
}
