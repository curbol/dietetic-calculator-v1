import { Component, Input, OnInit } from '@angular/core';

import { appearOnActive } from '@app/animation/animations';
import { ICalc } from '@app/calculator/models';
import { IUnit } from '@app/unit/models';
import { CalcActions } from '@app/calculator/state/actions';
import { compose } from 'ramda';
import { Num } from '@app/shared/num';

@Component({
  selector: 'dc-output-list',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
  animations: [
    appearOnActive()
  ]
})
export class OutputListComponent implements OnInit {
  @Input() calcs: ICalc[];
  @Input() units: IUnit[];

  constructor(
    private calcActions: CalcActions,
  ) { }

  ngOnInit() {}

  getCalcKey = (index: number, calc: ICalc) => calc.id;

  getUnitFromSymbol = (symbol: string): IUnit => this.units && symbol ? this.units.find(u => u.symbol === symbol) : null;
  getUnitTypeFromSymbol = (symbol: string): string => (this.getUnitFromSymbol(symbol) || {type: null}).type;
  getUnitsOfType = (type: string): IUnit[] => this.units && type ? this.units.filter(u => u.type === type) : null;
  getOutputDefaultUnit = (calc: ICalc): string => calc && calc.output ? calc.output.unit : null;
  getOutputConvertToUnit = (calc: ICalc): string => calc && calc.output ? calc.output.convertToUnit : this.getOutputDefaultUnit(calc);
  getOutputUnits = (calc: ICalc): IUnit[] => compose(this.getUnitsOfType, this.getUnitTypeFromSymbol, this.getOutputDefaultUnit)(calc);
  getOutputConvertedValue = (calc: ICalc): number => Num.round(calc && calc.output ? calc.output.convertedValue : null, 2);

  onOutputUnitChange = (id: string, symbol: string) => this.calcActions.setOutputsUnit([{id, symbol}]);
}
