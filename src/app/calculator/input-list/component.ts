import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { appearOnActive } from '@app/animation/animations';
import { Calc, IInput, ISelect } from '@app/calculator/models';
import { CalcActions } from '@app/calculator/state/actions';
import { IUnit } from '@app/unit/models';

@Component({
  selector: 'dc-input-list',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
  animations: [
    appearOnActive()
  ]
})
export class InputListComponent implements OnInit {
  @Input() inputs: IInput[];
  @Input() selects: ISelect[];
  @Input() units: IUnit[];

  get activeInputs(): IInput[] { return this.inputs.filter(i => i.active); }
  get activeSelects(): ISelect[] { return this.selects.filter(s => s.active); }
  get activeDataCount(): number { return this.activeInputs.length + this.activeSelects.length; }

  get activeFilledInputs(): IInput[] { return this.activeInputs.filter(i => ![null, undefined].includes(i.value)); }
  get activeFilledSelects(): ISelect[] { return this.activeSelects.filter(s => ![null, undefined].includes(s.value)); }
  get activeFilledDataCount(): number { return this.activeFilledInputs.length + this.activeFilledSelects.length; }

  constructor(
    private calcActions: CalcActions,
  ) {}

  ngOnInit() {}

  getSelectKey = (index: number, selection: ISelect) => selection.id;
  getInputKey = (index: number, input: IInput) => input.id;

  getInputUnits = (type: string): IUnit[] => this.units ? this.units.filter(u => u.type === type) : null;

  onSelectValueChange = (id: string, value: string) => this.calcActions.setSelectsValue([{id, value}]);
  onInputValueChange = (id: string, value: number) => this.calcActions.setInputsValue([{id, value}]);
  onInputUnitChange = (id: string, symbol: string) => this.calcActions.setInputsUnit([{id, symbol}]);

  clearDataValues = () => {
    this.calcActions.setSelectsValue(this.selects.map(s => ({id: s.id, value: null})));
    this.calcActions.setInputsValue(this.inputs.map(i => ({id: i.id, value: null})));
  }
}
