import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { appearOnActive } from '../../animation/animations';
import { UnitService } from '../unit/unit.service';
import { CalculatorService } from '../calculator-service/calculator.service';
import { Calc } from '../calculator-service/calc';
import { Unit } from '../unit/unit';

@Component({
  selector: 'dc-calculation-tool',
  templateUrl: './calculation-tool.component.html',
  styleUrls: ['./calculation-tool.component.css'],
  animations: [
    appearOnActive()
  ]
})
export class CalculationToolComponent implements OnInit {
  system: string;
  calculators: Calc.Calc[];
  inputs: Calc.Input[];

  get activeInputs(): Calc.Input[] {
    return this.inputs.filter(i => i.active);
  }

  get completedResults(): Calc.Calc[] {
    return this.calculators.filter(c => (c.output.result(this.inputs) || 0) !== 0);
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private unitService: UnitService,
    private calculatorService: CalculatorService,
  ) { }

  ngOnInit() {
    this.calculators = this.activatedRoute.snapshot.data['calculators'];
    this.inputs = this.activatedRoute.snapshot.data['inputs'];
    this.system = Unit.System[Unit.System.metric];
  }

  setActiveInputs(activeCalculators: Calc.Calc[]): void {
    const inputIdsToActivate = this.calculatorService.getInputIds(activeCalculators);
    this.inputs.forEach(input => input.active = inputIdsToActivate.includes(input.id));
  }

  test(): string {
    return JSON.stringify(this.calculators);
  }
}
