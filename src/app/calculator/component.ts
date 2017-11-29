import { OnInit, Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { ICalc, IInput, ISelect, Calc } from '@app/calculator/models';
import { IUnit } from '@app/unit/models';
import { CalcAPIService } from '@app/calculator/api/service';
import { CalcActions } from '@app/calculator/state/actions';
import { UnitActions } from '@app/unit/state/actions';
import { appearOnActive, appearOnTrue } from '@app/animation/animations';

@Component({
  selector: 'dc-calculator',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
  animations: [
    appearOnActive(),
    appearOnTrue(),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalculatorComponent implements OnInit {
  @select(['calculator', 'calcs']) readonly calcs$: Observable<ICalc[]>;
  @select(['calculator', 'inputs']) readonly inputs$: Observable<IInput[]>;
  @select(['calculator', 'selects']) readonly selects$: Observable<ISelect[]>;
  @select(['unit', 'units']) readonly units$: Observable<IUnit[]>;

  activeCalcs: ICalc[];
  activeInputs: IInput[];
  activeSelects: ISelect[];

  get activeCalcsCount(): number { return this.activeCalcs.length; }
  get activeDataCount(): number { return this.activeInputs.length + this.activeSelects.length; }
  get activeFilledDataCount(): number {
    return this.activeInputs.filter(i => i.value).length + this.activeSelects.filter(s => s.value).length;
  }

  readonly missingInputsMessage = 'Some inputs are missing values.';
  readonly noCalculatorsSelectedMessage = 'No calculators are selected.';
  readonly titles = {
    calc: { long: 'Select Calculators', short: 'Calculators' },
    input: { long: 'Input Data', short: 'Data' },
    output: { long: 'View Results', short: 'Results' },
  };

  constructor(
    private calcActions: CalcActions,
    private unitActions: UnitActions,
  ) {
    calcActions.loadCalcData();
    unitActions.loadUnitData();
  }

  ngOnInit() {
    this.calcs$.subscribe(calcs => this.activeCalcs = calcs.filter(c => c.active));
    this.inputs$.subscribe(inputs => this.activeInputs = inputs.filter(i => i.active));
    this.selects$.subscribe(selects => this.activeSelects = selects.filter(i => i.active));
  }
}
