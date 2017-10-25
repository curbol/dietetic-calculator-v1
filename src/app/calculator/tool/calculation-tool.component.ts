import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { Location } from '@angular/common';

import { appearOnActive, appearOnTrue } from '../../animation/animations';
import { CalculatorService } from '../service/calculator.service';
import { Calc } from '../calc';
import { Unit } from '../../unit/unit';
import { Option } from '../option';

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
  baseUrl: string;
  settings: string;

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
    private location: Location,
  ) {
    this.settings = activatedRoute.snapshot.params['settings'];

    const url: UrlSegment[] = activatedRoute.snapshot.url;
    this.baseUrl = (this.settings ? url.slice(0, -1) : url).join('/');

    this.system = Unit.System.metric;
    this.calculators = activatedRoute.snapshot.data['calculators'];
    this.inputs = activatedRoute.snapshot.data['inputs'];
    this.selections = activatedRoute.snapshot.data['selections'];
  }

  ngOnInit() {}

  getCalcURL = (): string => {
    const stubs: string[] = [];

    if (this.getActiveCalculators().length) {
      const calcsStub = `c-${this.getActiveCalculators().map(c => Calc.Id[c.id]).join('-')}`;
      stubs.push(calcsStub);
    }

    if (Unit.System[this.system]) {
      const systemStub = `s-${Unit.System[this.system]}`;
      stubs.push(systemStub);
    }

    const activeFilledSelecitons: Calc.Selection[] = this.selections.filter(s => s.active && s.value);
    if (activeFilledSelecitons.length) {
      const selectionsStub = activeFilledSelecitons.map(s => `o-${Calc.Selection.Id[s.id]}-${Option.Id[s.value.id]}`).join(',');
      stubs.push(selectionsStub);
    }

    const activeFilledSelections: Calc.Input[] = this.inputs.filter(i => i.active && i.value);
    if (activeFilledSelections.length) {
      const inputsStub = activeFilledSelections.map(i => `i-${Calc.Input.Id[i.id]}-${i.value}-${Unit.Symbol[i.unit.symbol]}`).join(',');
      stubs.push(inputsStub);
    }

    const url = stubs.join(',');

    this.location.replaceState(`${this.activatedRoute.snapshot.url[0]}/${url}`);

    return this.location.normalize(url);
  }

  getActiveDataCount = (): number => this.calcService.getAllActiveDataCount([this.inputs, this.selections]);
  getActiveFilledDataCount = (): number => this.calcService.getAllActiveFilledDataCount([this.inputs, this.selections]);
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
