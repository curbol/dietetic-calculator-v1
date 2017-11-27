import { OnInit, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { ICalc, IInput, ISelect, Calc } from '@app/calculator/models';
import { CalcAPIService } from '@app/calculator/api/service';
import { CalcActions } from '@app/calculator/state/actions';
import { appearOnActive, appearOnTrue } from '@app/animation/animations';

@Component({
  selector: 'dc-calculator',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
  animations: [
    appearOnActive(),
    appearOnTrue(),
  ]
})
export class CalculatorComponent implements OnInit {
  @select(['calculator', 'calcs']) readonly calcs$: Observable<ICalc[]>;
  @select(['calculator', 'inputs']) readonly inputs$: Observable<IInput[]>;
  @select(['calculator', 'selects']) readonly selects$: Observable<ISelect[]>;

  activeCalcs: ICalc[];
  activeInputs: IInput[];
  activeSelects: ISelect[];

  get activeCalcsCount(): number { return this.activeCalcs.length; }
  get activeDataCount(): number { return this.activeInputs.length + this.activeSelects.length; }

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
    private actions: CalcActions,
  ) {
    actions.loadCalcData();
  }

  onCalcActiveChanged = (event: {id: string, active: boolean}) =>
      this.actions.setCalcsActive([event])

  ngOnInit() {
    this.calcs$.subscribe(calcs => this.activeCalcs = calcs.filter(c => c.active));
    this.inputs$.subscribe(inputs => this.activeInputs = inputs.filter(i => i.active));
    this.selects$.subscribe(selects => this.activeSelects = selects.filter(i => i.active));
  }
}
