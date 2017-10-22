import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { appearOnActive } from '../../animation/animations';
import { CalculatorService } from '../service/calculator.service';
import { Calc } from '../calc';
import { Unit } from '../../unit/unit';

@Component({
  selector: 'dc-calculation-tool',
  templateUrl: './calculation-tool.component.html',
  styleUrls: ['./calculation-tool.component.css'],
  animations: [
    appearOnActive(),
  ]
})
export class CalculationToolComponent implements OnInit {
  system: Unit.System;
  calculators: Calc.Calc[] = [];
  inputs: Calc.Input[] = [];
  selections: Calc.Selection[] = [];

  calculatorsTitle = '1. Select Calculators';
  calculatorsShortTitle = '1. Calculators';
  inputsTitle = '2. Input Data';
  inputsShortTitle = '2. Data';
  outputsTitle = '3. View Results';
  outputsShortTitle = '3. Results';

  missingInputsMessage = 'Some inputs are missing values.';
  noCalculatorsSelectedMessage = 'No calculators are selected.';

  constructor(
    private activatedRoute: ActivatedRoute,
    private calculatorService: CalculatorService,
  ) {
    this.system = Unit.System.metric;
    this.calculators = this.activatedRoute.snapshot.data['calculators'];
    this.inputs = this.activatedRoute.snapshot.data['inputs'];
    this.selections = this.activatedRoute.snapshot.data['selections'];
  }

  ngOnInit() {}

  private getActiveInputs = (): Calc.Input[] => this.inputs.filter(i => i.active);
  private getActiveFilledInputs = (): Calc.Input[] => this.inputs.filter(i => i.active && i.value);

  private getActiveSelections = (): Calc.Selection[] => this.selections.filter(s => s.active);
  private getActiveFilledSelections = (): Calc.Selection[] => this.selections.filter(s => s.active && s.value);

  getActiveCalculators = (): Calc.Calc[] => this.calculators.filter(c => c.active);

  getActiveDataCount = (): number => this.getActiveInputs().length + this.getActiveSelections().length;
  getActiveFilledDataCount = (): number => this.getActiveFilledInputs().length + this.getActiveFilledSelections().length;

  isMissingInputsOrSelections = (): boolean =>
    this.getActiveFilledInputs().length !== this.getActiveInputs().length ||
    this.getActiveSelections().length !== this.getActiveFilledSelections().length

  getActiveCompletedResults = (): Calc.Calc[] =>
    this.calculators.filter(c => c.active && (c.output.result(this.inputs)(this.selections) || 0) !== 0)

  onActiveCalculatorsChanged(activeCalculators: Calc.Calc[]): void {
    const inputIdsToActivate = this.calculatorService.getInputIds(activeCalculators);
    const selectionIdsToActivate = this.calculatorService.getSelectionIds(activeCalculators);

    this.inputs.forEach(input => input.active = inputIdsToActivate.includes(input.id));
    this.selections.forEach(selection => selection.active = selectionIdsToActivate.includes(selection.id));
  }
}
