import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { appearOnActive } from '@app/animation/animations';
import { Calc, IInput, ISelect } from '@app/calculator/models';
import { IUnit } from '@app/unit/models';
import { Observable } from 'rxjs/Observable';

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

  constructor() {}

  ngOnInit() {}

  // onSelectionChange = (selection: Calc.ISelection, optionId: number) => selection.value = selection.group.find(o => o.id === optionId);

  // clearDataValues = (): void => {
  //   this.inputs.filter(i => i).forEach(i => i.value = null);
  //   this.selections.filter(s => s).forEach(s => s.value = null);
  // }

  getSelectKey(index: number, selection: ISelect) { return selection.id; }
  getInputKey(index: number, input: IInput) { return input.id; }
}
