import { Component, OnInit, DoCheck, OnChanges } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { Location } from '@angular/common';

import { appearOnActive, appearOnTrue } from '@app/animation/animations';
import { CalculatorService } from '@app/calculator/service/calculator.service';
import { Calc } from '@app/calculator/calc';
import { Unit } from '@app/unit/unit';
import { Option } from '@app/calculator/option';

@Component({
  selector: 'dc-calculation-tool',
  templateUrl: './calculation-tool.component.html',
  styleUrls: ['./calculation-tool.component.css'],
  animations: [
    appearOnActive(),
    appearOnTrue(),
  ]
})
export class CalculationToolComponent implements OnInit, DoCheck {
  system: Unit.System;
  calculators: Calc.Calc[] = [];
  inputs: Calc.Input[] = [];
  selections: Calc.Selection[] = [];
  baseUrl: string;
  settingsPath: string;
  previousPath: string;

  readonly calculatorsTitle = 'Select Calculators';
  readonly calculatorsShortTitle = 'Calculators';
  readonly inputsTitle = 'Input Data';
  readonly inputsShortTitle = 'Data';
  readonly outputsTitle = 'View Results';
  readonly outputsShortTitle = 'Results';

  readonly missingInputsMessage = 'Some inputs are missing values.';
  readonly noCalculatorsSelectedMessage = 'No calculators are selected.';

  constructor(
    private activatedRoute: ActivatedRoute,
    private calcService: CalculatorService,
    private location: Location,
  ) {
    this.settingsPath = activatedRoute.snapshot.params['settings'];

    const url: UrlSegment[] = activatedRoute.snapshot.url;
    this.baseUrl = (this.settingsPath ? url.slice(0, -1) : url).join('/');

    this.system = Unit.System.metric;
    this.calculators = activatedRoute.snapshot.data['calculators'];
    this.inputs = activatedRoute.snapshot.data['inputs'];
    this.selections = activatedRoute.snapshot.data['selections'];

    this.calculators.forEach(c => c.active = false);
  }

  ngOnInit() {
    if (this.settingsPath) {
      this.updateFromSettings(this.settingsPath);
      this.updateSystem();
    }
  }

  ngDoCheck() {
    // console.log('calc-tool do-check');
    this.updatePathSettings();
  }

  getActiveDataCount = (): number => Calc.getAllActiveDataCount([this.inputs, this.selections]);
  getActiveFilledDataCount = (): number => Calc.getAllActiveFilledDataCount([this.inputs, this.selections]);
  getActiveCalculators = (): Calc.Calc[] => this.calculators.filter(c => c.active);

  allActiveDataFilled = (): boolean => this.getActiveDataCount() === this.getActiveFilledDataCount();
  notAllActiveDataFilled = (): boolean => !this.allActiveDataFilled();

  getActiveCompletedResults = (): Calc.Calc[] =>
    this.calculators.filter(c => c.active && (this.calcService.getResult(c)(this.inputs)(this.selections) || 0) !== 0)

  allActiveResultsCompleted = (): boolean => this.getActiveCompletedResults().length === this.getActiveCalculators().length;

  onActiveCalculatorsChanged = (activeCalculators: Calc.Calc[]): void => {
    const inputIdsToActivate: Calc.Input.Id[] = Calc.getInputIds(activeCalculators);
    const selectionIdsToActivate: Calc.Selection.Id[] = Calc.getSelectionIds(activeCalculators);

    this.inputs.forEach(input => input.active = inputIdsToActivate.includes(input.id));
    this.selections.forEach(selection => selection.active = selectionIdsToActivate.includes(selection.id));
  }

  private updateSystem = (): void => {
    const commonSystem: Unit.System = Unit.commonSystem(this.inputs.map(i => i.unit));
    this.system = commonSystem != null ? commonSystem : Unit.System.mixed;
  }

  private updatePathSettings = (): void => {
    const path: string = Calc.toPath(this.calculators)(this.selections)(this.inputs);
    if (path === this.previousPath) { return; }
    this.previousPath = path;

    const url: string = this.location.normalize(`${this.baseUrl}/${path}`);
    this.location.replaceState(url);
  }

  private updateFromSettings = (settingsString): void => {
    if (!settingsString) { return; }

    const dataSettings = Calc.fromPath(settingsString);
    if (!dataSettings) { return; }

    dataSettings.calcs.map(id => this.calculators.find(c => c.id === id)).forEach(c => c.active = true);

    dataSettings.selections.forEach(data => {
      const selection = this.selections.find(s => s.id === data.id);
      if (!selection) { return; }
      selection.value = selection.group.find(o => o.id === data.valueId);
    });

    dataSettings.inputs.forEach(data => {
      const input = this.inputs.find(i => i.id === data.id);
      if (!input) { return; }
      input.value = data.value;
      input.unit = input.group.find(u => u.symbol === data.symbol);
    });
  }
}
