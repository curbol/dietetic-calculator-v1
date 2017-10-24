import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Calc } from '../../calc';
import { Unit } from '../../../unit/unit';
import { UnitService } from '../../../unit/unit.service';
import { CalculatorService } from '../../service/calculator.service';
import { appearOnActive } from '../../../animation/animations';

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

  constructor(private unitService: UnitService, private calcService: CalculatorService) {}

  ngOnInit() {}

  onUnitChange = (): void => this.updateSystem();
  onSelectionChange = (selection: Calc.Selection, optionId: number) => selection.value = selection.group.find(o => o.id === optionId);
  onSystemChange = (systemString: string): void => {
    this.system = Unit.System[systemString];
    this.setDefaultUnitSystem(this.system);
  }

  getUnitString = (symbol: Unit.Symbol): string => Unit.Symbol[symbol];
  getActiveDataCount = (): number => this.calcService.getAllActiveCount([this.inputs, this.selections]);
  getActiveFilledDataCount = (): number => this.calcService.getAllActiveFilledCount([this.inputs, this.selections]);

  clearDataValues = (): void => {
    this.inputs.forEach(i => i.value = null);
    this.selections.forEach(s => s.value = null);
  }

  private setDefaultUnitSystem = (system: Unit.System): void => {
    const inputsToUpdate = this.inputs.filter(input => input.unit && input.unit.system !== system);
    inputsToUpdate.forEach(input => {
      const defaultUnit: Unit.Unit = this.unitService.defaultUnit(input.group)(system);
      if (defaultUnit) { input.unit = defaultUnit; }
    });
  }

  private updateSystem = (): void => {
    const commonSystem: Unit.System = this.unitService.commonSystem(this.inputs.map(i => i.unit));
    this.system = commonSystem != null ? commonSystem : Unit.System.mixed;
  }
}
