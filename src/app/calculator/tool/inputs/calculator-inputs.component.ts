import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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
  systemString: string;
  get system(): Unit.System { return Unit.System[this.systemString]; }
  @Output() systemChange: EventEmitter<Unit.System> = new EventEmitter<Unit.System>();
  @Input() set system(system: Unit.System) {
    this.systemString = Unit.System[system];
    this.systemChange.emit(this.system);
  }

  @Input() inputs: Calc.Input[];
  @Input() selections: Calc.Selection[];

  constructor() {}

  ngOnInit() {}

  onUnitChange = (): void => this.updateSystem();
  onSelectionChange = (selection: Calc.Selection, optionId: number) => selection.value = selection.group.find(o => o.id === optionId);
  onSystemChange = (systemString: string): void => {
    this.system = Unit.System[systemString];
    this.setDefaultUnitSystem(this.system);
  }

  getUnitString = (symbol: Unit.Symbol): string => Unit.Symbol[symbol];
  getActiveDataCount = (): number => Calc.getAllActiveDataCount([this.inputs, this.selections]);
  getActiveFilledDataCount = (): number => Calc.getAllActiveFilledDataCount([this.inputs, this.selections]);

  clearDataValues = (): void => {
    this.inputs.forEach(i => i.value = null);
    this.selections.forEach(s => s.value = null);
  }

  private setDefaultUnitSystem = (system: Unit.System): void => {
    const inputsToUpdate = this.inputs.filter(input => input.unit && input.unit.system !== system);
    inputsToUpdate.forEach(input => {
      const defaultUnit: Unit.Unit = Unit.defaultUnit(input.group)(system);
      if (defaultUnit) { input.unit = defaultUnit; }
    });
  }

  private updateSystem = (): void => {
    const commonSystem: Unit.System = Unit.commonSystem(this.inputs.map(i => i.unit));
    this.system = commonSystem != null ? commonSystem : Unit.System.mixed;
  }
}
