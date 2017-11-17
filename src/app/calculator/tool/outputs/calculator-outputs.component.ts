import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { appearOnActive } from '@app/animation/animations';
import { CalculatorService } from '@app/calculator/service/calculator.service';
import { Calc } from '@app/calculator/calc';
import { Unit } from '@app/unit/unit';
import { UnitService } from '@app/unit/unit.service';

@Component({
  selector: 'dc-calculator-outputs',
  templateUrl: './calculator-outputs.component.html',
  styleUrls: ['./calculator-outputs.component.css'],
  animations: [
    appearOnActive()
  ]
})
export class CalculatorOutputsComponent implements OnInit {
  _system: Unit.System;
  get system(): Unit.System { return this._system; }
  set system(system: Unit.System) {
    this._system = system;
    this.setDefaultUnitSystem(this.calculators, this.system);
  }

  @Input() calculators: Calc.Calc[];
  get activeCalculators(): Calc.Calc[] {
    if (!this.calculators) { return null; }
    return this.calculators.filter(c => c.active);
  }

  @Input() inputs: Calc.Input[];
  @Input() selections: Calc.Selection[];

  constructor(
    private calcService: CalculatorService,
    private unitService: UnitService,
  ) { }

  ngOnInit() {}

  getResult = (calc: Calc.Calc): number => {
    return this.calcService.getResult(calc)(this.inputs)(this.selections);
  }

  private setDefaultUnitSystem = (calcs: Calc.Calc[], system: Unit.System): void => {
    calcs.filter(c => c && c.output && c.output.symbol !== null && c.output.symbol !== undefined).forEach(calc => {
      this.unitService.getUnit(calc.output.symbol).then(unit => {
        if (unit) {
          return this.unitService.getUnitsOfType(unit.type.id);
        }
      }).then(units => {
        const defaultUnit: Unit.Unit = Unit.defaultUnit(units)(system);
        if (defaultUnit) { calc.output.convertSymbol = defaultUnit.symbol; }
      });
    });
  }

  private updateSystem = (calcs: Calc.Calc[]): void => {
    if (!calcs) { return null; }
    const outputSymbols = calcs.map(c => c.output ? c.output.convertSymbol : null).filter(s => s !== null && s !== undefined);
    this.unitService.getUnits(outputSymbols).then(units => {
      this.system = Unit.commonSystem(units);
    });
  }
}
