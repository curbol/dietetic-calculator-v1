import { Component, OnInit } from '@angular/core';
import { Calc } from '../../calculator/calc';
import { Unit } from '../../unit/unit';
import { UnitService } from '../../unit/unit.service';
import { Enum } from '../../shared/enum';

@Component({
  selector: 'dc-converter-tool',
  templateUrl: './converter-tool.component.html',
  styleUrls: ['./converter-tool.component.css'],
})
export class ConverterToolComponent implements OnInit {
  unitTypeIds: Unit.Type.Id[];
  allUnits: {[type: number]: Unit.Unit[]};

  constructor(unitService: UnitService) {
    this.unitTypeIds = Enum.getValues(Unit.Type.Id);

    unitService.getAllUnits().then(units => {
      this.allUnits = units;
    });
  }

  ngOnInit() {}

  onTypeChange = (type: string) => {};

  getConversion = (sourceUnit: Unit.Unit) => (targetUnit: Unit.Unit) => (sourceValue: number) => {
    if (!sourceUnit || !targetUnit || !sourceValue) { return; }
    return Unit.conversion(sourceUnit.factor)(targetUnit.factor)(sourceValue);
  }

  getTypeString = (typeId: Unit.Type.Id): string => Unit.Type.Id[typeId];

  getUnitString = (symbol: Unit.Symbol): string => Unit.Symbol[symbol];
}
