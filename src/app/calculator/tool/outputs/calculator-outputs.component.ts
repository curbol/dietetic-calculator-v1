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
  @Output() systemChange: EventEmitter<Unit.System> = new EventEmitter<Unit.System>();
  @Input() set system(system: Unit.System) {
    this._system = system;
    this.systemChange.emit(this.system);
    // this.setDefaultUnitSystem(this.calculators, this.system);
  }

  @Input() calculators: Calc.Calc[];
  @Input() inputs: Calc.Input[];
  @Input() selections: Calc.Selection[];

  constructor(private calcService: CalculatorService) { }

  ngOnInit() {}

  getResult = (calc: Calc.Calc): number => {
    return this.calcService.getResult(calc)(this.inputs)(this.selections);
  }

  // private setDefaultUnitSystem = (calcs: Calc.Calc[], system: Unit.System): void => {
  //   if (!calcs) { return; }
  //   const outputsToUpdate = calcs.filter(calc => calc.output && calc.output.convertSymbol && calc.output.convertSymbol !== system);
  //   outputsToUpdate.forEach(calc => {
  //     const defaultSymbol: Unit.Symbol = Unit.defaultUnit(calc.group)(system);
  //     if (defaultSymbol) { calc.output.convertSymbol = defaultSymbol; }
  //   });
  // }
}
