import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { appearOnActive, appearOnTrue } from '../../animation/animations';
import { CalculatorService } from '../service/calculator.service';
import { Calc } from '../calc';
import { Unit } from '../../unit/unit';

@Component({
  selector: 'dc-calculation-tool',
  templateUrl: './calculation-tool.component.html',
  styleUrls: ['./calculation-tool.component.css'],
  animations: [
    appearOnActive(),
    appearOnTrue(),
  ]
})
export class CalculationToolComponent implements OnInit {
  system: Unit.System;
  calculators: Calc.Calc[] = [];
  inputs: Calc.Input[] = [];
  selections: Calc.Selection[] = [];

  calculatorsTitle = '1. Select Calculators';
  calculatorsShortTitle = 'Calculators';
  inputsTitle = '2. Input Data';
  inputsShortTitle = 'Data';
  outputsTitle = '3. View Results';
  outputsShortTitle = 'Results';

  missingInputsMessage = 'Some inputs are missing values.';
  noCalculatorsSelectedMessage = 'No calculators are selected.';

  constructor(
    private activatedRoute: ActivatedRoute,
    private calcService: CalculatorService,
  ) {
    this.system = Unit.System.metric;
    this.calculators = this.activatedRoute.snapshot.data['calculators'];
    this.inputs = this.activatedRoute.snapshot.data['inputs'];
    this.selections = this.activatedRoute.snapshot.data['selections'];
  }

  ngOnInit() {}

  getActiveDataCount = (): number => this.calcService.getAllActiveCount([this.inputs, this.selections]);
  getActiveFilledDataCount = (): number => this.calcService.getAllActiveFilledCount([this.inputs, this.selections]);
  getActiveCalculators = (): Calc.Calc[] => this.calculators.filter(c => c.active);

  allActiveDataFilled = (): boolean => this.getActiveDataCount() === this.getActiveFilledDataCount();
  notAllActiveDataFilled = (): boolean => !this.allActiveDataFilled();

  getActiveCompletedResults = (): Calc.Calc[] =>
    this.calculators.filter(c => c.active && (c.output.result(this.inputs)(this.selections) || 0) !== 0)

  allActiveResultsCompleted = (): boolean => this.getActiveCompletedResults().length === this.getActiveCalculators().length;

  onActiveCalculatorsChanged(activeCalculators: Calc.Calc[]): void {
    const inputIdsToActivate: Calc.Input.Id[] = this.calcService.getInputIds(activeCalculators);
    const selectionIdsToActivate: Calc.Selection.Id[] = this.calcService.getSelectionIds(activeCalculators);

    this.inputs.forEach(input => input.active = inputIdsToActivate.includes(input.id));
    this.selections.forEach(selection => selection.active = selectionIdsToActivate.includes(selection.id));
  }
}
