import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { appearOnActive } from '@app/animation/animations';
import { CalculatorService } from '@app/calculator/service/calculator.service';
import { UnitService } from '@app/unit/unit.service';
import { ICalc, Calc } from '@app/calculator/calc.model';
import { IUnit } from '@app/unit/unit.model';

@Component({
  selector: 'dc-output-list',
  templateUrl: './output-list.component.html',
  styleUrls: ['./output-list.component.css'],
  animations: [
    appearOnActive()
  ]
})
export class OutputListComponent implements OnInit {
  _system: Unit.System;
  get system(): Unit.System { return this._system; }
  set system(system: Unit.System) {
    this._system = system;
    this.setDefaultUnitSystem(this.calculators, this.system);
  }

  @Input() calculators: ICalc[];
  get activeCalculators(): ICalc[] {
    if (!this.calculators) { return null; }
    return this.calculators.filter(c => c.active);
  }

  @Input() inputs: Calc.IInput[];
  @Input() selections: Calc.ISelection[];

  constructor(
    private calcService: CalculatorService,
    private unitService: UnitService,
  ) { }

  ngOnInit() {}

  getResult = (calc: ICalc): number => {
    return this.calcService.getResult(calc)(this.inputs)(this.selections);
  }

  getActiveCompletedResults = (): ICalc[] =>
    this.calculators.filter(c => c.active && (this.calcService.getResult(c)(this.inputs)(this.selections) || 0) !== 0)

  private setDefaultUnitSystem = (calcs: ICalc[], system: Unit.System): void => {
    calcs.filter(c => c && c.output && c.output.symbol !== null && c.output.symbol !== undefined).forEach(calc => {
      this.unitService.getUnit(calc.output.symbol).then(unit => {
        if (unit) {
          return this.unitService.getUnitsOfType(unit.type.id);
        }
      }).then(units => {
        const defaultUnit: IUnit = Unit.defaultUnit(units)(system);
        if (defaultUnit) { calc.output.convertSymbol = defaultUnit.symbol; }
      });
    });
  }

  private updateSystem = (calcs: ICalc[]): void => {
    if (!calcs) { return null; }
    const outputSymbols = calcs.map(c => c.output ? c.output.convertSymbol : null).filter(s => s !== null && s !== undefined);
    this.unitService.getUnits(outputSymbols).then(units => {
      this.system = Unit.commonSystem(units);
    });
  }
}
