import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { Calc } from '@app/calculator/calc';
import { Unit } from '@app/unit/unit';
import { appearOnActive } from '@app/animation/animations';

@Component({
  selector: 'dc-calculator-inputs',
  templateUrl: './calculator-inputs.component.html',
  styleUrls: ['./calculator-inputs.component.css'],
  animations: [
    appearOnActive()
  ]
})
export class CalculatorInputsComponent implements OnInit {
  _system: Unit.System;
  get system(): Unit.System { return this._system; }
  @Output() systemChange: EventEmitter<Unit.System> = new EventEmitter<Unit.System>();
  @Input() set system(system: Unit.System) {
    this._system = system;
    this.systemChange.emit(this.system);
    this.setDefaultUnitSystem(this.inputs, this.system);
  }

  @Input() inputs: Calc.Input[];
  @Input() selections: Calc.Selection[];

  constructor() {}

  ngOnInit() {}

  onUnitChange = (): void => this.updateSystem();
  onSelectionChange = (selection: Calc.Selection, optionId: number) => selection.value = selection.group.find(o => o.id === optionId);

  getActiveDataCount = (): number => Calc.getAllActiveDataCount([this.inputs, this.selections]);
  getActiveFilledDataCount = (): number => Calc.getAllActiveFilledDataCount([this.inputs, this.selections]);

  clearDataValues = (): void => {
    this.inputs.forEach(i => i.value = null);
    this.selections.forEach(s => s.value = null);
  }

  private setDefaultUnitSystem = (inputs: Calc.Input[], system: Unit.System): void => {
    if (!inputs) { return; }
    const inputsToUpdate = inputs.filter(input => input.unit && input.unit.system !== system);
    inputsToUpdate.forEach(input => {
      const defaultUnit: Unit.Unit = Unit.defaultUnit(input.group)(system);
      if (defaultUnit) { input.unit = defaultUnit; }
    });
  }

  private updateSystem = (): void => {
    if (!this.inputs) { return; }
    const commonSystem: Unit.System = Unit.commonSystem(this.inputs.map(i => i.unit));
    this.system = commonSystem != null ? commonSystem : Unit.System.mixed;
  }
}
