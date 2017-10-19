import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Calc } from '../../calculator-service/calc';
import { Unit } from '../../unit/unit';
import { UnitService } from '../../unit/unit.service';
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

  constructor(private unitService: UnitService) {}

  ngOnInit() {}

  onSystemChange(systemString: string): void {
    const system: Unit.System = Unit.System[systemString];
    if (system === null || system === undefined) { return; }

    this.system = system;
    this.setDefaultUnitSystem(system);
  }

  onUnitChange = (): void => this.updateSystem();

  getUnitString = (symbol: Unit.Symbol): string => Unit.Symbol[symbol];

  getActiveInputs = (): Calc.Input[] => this.inputs.filter(i => i.active);

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
