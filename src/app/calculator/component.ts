import { Component, OnInit, DoCheck, OnChanges } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { Location } from '@angular/common';
import { select, select$ } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { pipe, values, sortBy, prop, groupBy } from 'ramda';

import { appearOnActive, appearOnTrue } from '@app/animation/animations';
import { ICalc, Calc, IInput, ISelect } from '@app/calculator/models';
import { CalcAPIService } from '@app/calculator/api/service';
import { CalcAPIActions } from '@app/calculator/api/actions';

export const calcValues = (calcDictionary$: Observable<{[id: string]: ICalc}>) =>
  calcDictionary$.map(values).do(a => console.log('test' + a));

@Component({
  selector: 'dc-calculator',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
  animations: [
    appearOnActive(),
    appearOnTrue(),
  ]
})
export class CalculatorComponent implements OnInit, DoCheck {
  @select$(['calculator', 'calcs'], calcValues)
  readonly calculators$: Observable<ICalc[]>;

  inputs: IInput[] = [];
  selections: ISelect[] = [];
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
    private calcService: CalcAPIService,
    private location: Location,
    private actions: CalcAPIActions,
  ) {
    actions.loadCalcs();
    // this.settingsPath = activatedRoute.snapshot.params['settings'];

    // const url: UrlSegment[] = activatedRoute.snapshot.url;
    // this.baseUrl = (this.settingsPath ? url.slice(0, -1) : url).join('/');

    // this.calculators = activatedRoute.snapshot.data['calculators'];
    // this.inputs = activatedRoute.snapshot.data['inputs'];
    // this.selections = activatedRoute.snapshot.data['selections'];

    // this.calculators.forEach(c => c.active = false);
  }

  ngOnInit() {
    if (this.settingsPath) {
      // this.updateFromSettings(this.settingsPath);
    }
  }

  ngDoCheck() {
    // console.log('calc-tool do-check');
    // this.updatePathSettings();
  }

  getActiveDataCount = (): number => Calc.getAllActiveDataCount([this.inputs, this.selections]);
  getActiveFilledDataCount = (): number => Calc.getAllActiveFilledDataCount([this.inputs, this.selections]);
  getActiveCalculators = (): ICalc[] => []; // this.calculators.filter(c => c.active);

  allActiveDataFilled = (): boolean => this.getActiveDataCount() === this.getActiveFilledDataCount();
  notAllActiveDataFilled = (): boolean => !this.allActiveDataFilled();

  // getActiveCompletedResults = (): ICalc[] =>
  //   this.calculators.filter(c => c.active && (this.calcService.getResult(c)(this.inputs)(this.selections) || 0) !== 0)

  // allActiveResultsCompleted = (): boolean => this.getActiveCompletedResults().length === this.getActiveCalculators().length;

  // onActiveCalculatorsChanged = (activeCalculators: ICalc[]): void => {
  //   const inputIdsToActivate: Calc.Input.Id[] = Calc.getInputIds(activeCalculators);
  //   const selectionIdsToActivate: Calc.Selection.Id[] = Calc.getSelectionIds(activeCalculators);

  //   this.inputs.forEach(input => input.active = inputIdsToActivate.includes(input.id));
  //   this.selections.forEach(selection => selection.active = selectionIdsToActivate.includes(selection.id));
  // }

  // private updatePathSettings = (): void => {
  //   const path: string = Calc.toPath(this.calculators)(this.selections)(this.inputs);
  //   if (path === this.previousPath) { return; }
  //   this.previousPath = path;

  //   const url: string = this.location.normalize(`${this.baseUrl}/${path}`);
  //   this.location.replaceState(url);
  // }

  // private updateFromSettings = (settingsString): void => {
  //   if (!settingsString) { return; }
  //   const dataSettings = Calc.fromPath(settingsString);
  //   if (!dataSettings) { return; }

  //   if (dataSettings.calcs) {
  //     dataSettings.calcs.forEach(data => {
  //       const calc = this.calculators.find(s => s.id === data.id);
  //       if (!calc) { return; }
  //       calc.active = true;
  //       if (data.outputSymbol !== null && data.outputSymbol !== undefined) {
  //         calc.output.convertSymbol = data.outputSymbol;
  //       }
  //     });
  //   }

  //   if (dataSettings.selections) {
  //     dataSettings.selections.forEach(data => {
  //       const selection = this.selections.find(s => s.id === data.id);
  //       if (!selection) { return; }
  //       selection.value = selection.group.find(o => o.id === data.valueId);
  //     });
  //   }

  //   if (dataSettings.inputs) {
  //     dataSettings.inputs.forEach(data => {
  //       const input = this.inputs.find(i => i.id === data.id);
  //       if (!input) { return; }
  //       input.value = data.value;
  //       input.unit = input.group.find(u => u.symbol === data.symbol) || input.group[0];
  //     });
  //   }
  // }
}
