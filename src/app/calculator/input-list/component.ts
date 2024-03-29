import { Component, OnInit, Input } from '@angular/core';

import { appearOnActive } from '@app/animation/animations';
import { IInput, ISelect } from '@app/calculator/models';
import { IUnit, Unit } from '@app/unit/models';
import { CalcActions } from '@app/calculator/state/actions';


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

  get activeInputs(): IInput[] { return (this.inputs || []).filter(i => i.active); }
  get activeSelects(): ISelect[] { return (this.selects || []).filter(s => s.active); }
  get activeDataCount(): number { return this.activeInputs.length + this.activeSelects.length; }

  get activeFilledInputs(): IInput[] { return (this.activeInputs || []).filter(i => i.value !== null && i.value !== undefined); }
  get activeFilledSelects(): ISelect[] { return (this.activeSelects || []).filter(s => s.value !== null && s.value !== undefined); }
  get activeFilledDataCount(): number { return this.activeFilledInputs.length + this.activeFilledSelects.length; }

  constructor(
    private calcActions: CalcActions,
  ) {}

  ngOnInit() {}

  getSelectKey = (index: number, selection: ISelect) => selection.id;
  getInputKey = (index: number, input: IInput) => input.id;

  getInputUnits = (input: IInput): IUnit[] => input ? Unit.ofType(this.units)(input.type) : [];

  onSelectValueChange = (id: string, value: string) => this.calcActions.setSelectsValue([{id, value}]);
  onInputValueChange = (id: string, value: number) => this.calcActions.setInputsValue([{id, value}]);
  onInputUnitChange = (id: string, symbol: string) => this.calcActions.setInputsUnit([{id, symbol}]);

  clearDataValues = () => {
    this.calcActions.setSelectsValue(this.selects.map(s => ({id: s.id, value: null})));
    this.calcActions.setInputsValue(this.inputs.map(i => ({id: i.id, value: null})));
  }
}
