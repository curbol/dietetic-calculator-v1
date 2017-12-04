import { Component, Input, OnInit } from '@angular/core';

import { appearOnActive } from '@app/animation/animations';
import { ICalc } from '@app/calculator/models';
import { IUnit, Unit } from '@app/unit/models';
import { CalcActions } from '@app/calculator/state/actions';
import { pipe } from 'ramda';
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

  getOutputConvertedValue = (calc: ICalc): number => Num.round(calc && calc.output ? calc.output.convertedValue : null, 2);
  getOutputConvertToUnit = (calc: ICalc): string => calc && calc.output ? calc.output.convertToUnit || calc.output.unit : null;
  getOutputUnits = (calc: ICalc): IUnit[] =>
    calc && calc.output ? pipe(Unit.symbolType(this.units), Unit.ofType(this.units))(calc.output.unit) : null

  onOutputUnitChange = (id: string, symbol: string) => this.calcActions.setOutputsUnit([{id, symbol}]);
}
