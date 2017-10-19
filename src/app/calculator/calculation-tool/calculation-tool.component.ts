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
  system: Unit.System;
  calculators: Calc.Calc[];
  inputs: Calc.Input[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private unitService: UnitService,
    private calculatorService: CalculatorService,
  ) {
    this.system = Unit.System.metric;
  }

  ngOnInit() {
    this.calculators = this.activatedRoute.snapshot.data['calculators'];
    this.inputs = this.activatedRoute.snapshot.data['inputs'];
  }

  getActiveInputs = (): Calc.Input[] => this.inputs.filter(i => i.active);

  getCompletedResults = (): Calc.Calc[] => this.calculators.filter(c => (c.output.result(this.inputs) || 0) !== 0);

  onActiveCalculatorsChanged(activeCalculators: Calc.Calc[]): void {
    const inputIdsToActivate = this.calculatorService.getInputIds(activeCalculators);
    this.inputs.forEach(input => input.active = inputIdsToActivate.includes(input.id));
  }
}
