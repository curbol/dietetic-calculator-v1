import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { appearOnActive } from '@app/animation/animations';
import { Calc } from '@app/calculator/calc.model';
import { IUnit } from '@app/unit/unit.model';

@Component({
  selector: 'dc-input-list',
  templateUrl: './input-list.component.html',
  styleUrls: ['./input-list.component.css'],
  animations: [
    appearOnActive()
  ]
})
export class InputListComponent implements OnInit {
  _system: Unit.System;
  get system(): Unit.System { return this._system; }
  @Output() systemChange: EventEmitter<Unit.System> = new EventEmitter<Unit.System>();
  @Input() set system(system: Unit.System) {
    this._system = system;
    this.systemChange.emit(this.system);
    this.setDefaultUnitSystem(this.inputs, this.system);
  }

  @Input() inputs: Calc.IInput[];
  get activeInputs(): Calc.IInput[] {
    if (!this.inputs) { return null; }
    return this.inputs.filter(i => i.active);
  }

  @Input() selections: Calc.ISelection[];
  get activeSelections(): Calc.ISelection[] {
    if (!this.selections) { return null; }
    return this.selections.filter(s => s.active);
  }

  constructor() {}

  ngOnInit() {}

  onUnitChange = () => this.system = this.updatedSystem(this.inputs);
  onSelectionChange = (selection: Calc.ISelection, optionId: number) => selection.value = selection.group.find(o => o.id === optionId);

  getActiveDataCount = (): number => Calc.getAllActiveDataCount([this.inputs, this.selections]);
  getActiveFilledDataCount = (): number => Calc.getAllActiveFilledDataCount([this.inputs, this.selections]);

  clearDataValues = (): void => {
    this.inputs.filter(i => i).forEach(i => i.value = null);
    this.selections.filter(s => s).forEach(s => s.value = null);
  }

  private setDefaultUnitSystem = (inputs: Calc.IInput[], system: Unit.System): void => {
    if (!inputs) { return; }
    const inputsToUpdate = inputs.filter(input => input.unit && input.unit.system !== system);
    inputsToUpdate.forEach(input => {
      const defaultUnit: IUnit = Unit.defaultUnit(input.group)(system);
      if (defaultUnit) { input.unit = defaultUnit; }
    });
  }

  private updatedSystem = (inputs: Calc.IInput[]): Unit.System => {
    if (!inputs) { return null; }
    return Unit.commonSystem(inputs.map(i => i.unit));
  }
}
