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

  get activeInputs(): IInput[] { return this.inputs.filter(i => i.active); }
  get activeFilledInputs(): IInput[] { return this.activeInputs.filter(i => ![null, undefined].includes(i.value)); }

  get activeSelects(): ISelect[] { return this.selects.filter(s => s.active); }
  get activeFilledSelects(): ISelect[] { return this.activeSelects.filter(s => ![null, undefined].includes(s.value)); }

  get activeDataCount(): number { return this.activeInputs.length + this.activeSelects.length; }
  get activeFilledDataCount(): number { return this.activeFilledInputs.length + this.activeFilledSelects.length; }

  constructor() {}

  ngOnInit() {}

  // onSelectionChange = (selection: Calc.ISelection, optionId: number) => selection.value = selection.group.find(o => o.id === optionId);

  // getActiveDataCount = (): number => Calc.getAllActiveDataCount([this.inputs, this.selections]);
  // getActiveFilledDataCount = (): number => Calc.getAllActiveFilledDataCount([this.inputs, this.selections]);

  // clearDataValues = (): void => {
  //   this.inputs.filter(i => i).forEach(i => i.value = null);
  //   this.selections.filter(s => s).forEach(s => s.value = null);
  // }

  // private setDefaultUnitSystem = (inputs: Calc.IInput[], system: Unit.System): void => {
  //   if (!inputs) { return; }
  //   const inputsToUpdate = inputs.filter(input => input.unit && input.unit.system !== system);
  //   inputsToUpdate.forEach(input => {
  //     const defaultUnit: IUnit = Unit.defaultUnit(input.group)(system);
  //     if (defaultUnit) { input.unit = defaultUnit; }
  //   });
  // }

  // private updatedSystem = (inputs: Calc.IInput[]): Unit.System => {
  //   if (!inputs) { return null; }
  //   return Unit.commonSystem(inputs.map(i => i.unit));
  // }
}
