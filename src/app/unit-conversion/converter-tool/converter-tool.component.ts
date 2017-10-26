import { Component, OnInit } from '@angular/core';
import { Calc } from '../../calculator/calc';
import { Unit } from '../../unit/unit';
import { UnitService } from '../../unit/unit.service';

@Component({
  selector: 'dc-converter-tool',
  templateUrl: './converter-tool.component.html',
  styleUrls: ['./converter-tool.component.css'],
})
export class ConverterToolComponent implements OnInit {
  unitTypes: string[];
  sourceValue: number;
  targetValue: number;
  sourceUnit: Unit.Unit;
  targetUnit: Unit.Unit;
  allUnits: {[type: number]: Unit.Unit[]};
  unitGroup: Unit.Unit[];

  constructor(unitService: UnitService) {
    this.unitTypes = Object.keys(Unit.Type.Id).map(k => Unit.Type.Id[k]).filter(v => typeof v === 'string');

    unitService.getAllUnits().then(units => {
      this.allUnits = units;
      this.unitGroup = units[0];
    });
  }

  ngOnInit() {}

  getUnitString = (symbol: Unit.Symbol): string => Unit.Symbol[symbol];
}
