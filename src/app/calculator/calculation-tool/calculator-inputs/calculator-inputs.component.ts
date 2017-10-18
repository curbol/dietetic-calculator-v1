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
  systemText: string;
  get system(): string {
    return this.systemText;
  }
  @Input() set system(system: string) {
    this.systemText = system;
    this.systemChange.emit(this.systemText);
  }
  @Output() systemChange: EventEmitter<string>;

  @Input() inputs: Calc.Input[];

  get activeInputs(): Calc.Input[] {
    return this.inputs.filter(i => i.active);
  }

  constructor(private unitService: UnitService) {
    this.systemChange = new EventEmitter<string>();
  }

  ngOnInit() {}

  setDefaultUnitSystem(systemString: string): void {
    const system: Unit.System = Unit.System[systemString] || Unit.System.metric;
    const inputsToUpdate = this.inputs.filter(input => input.unit && input.unit.system !== system);

    inputsToUpdate.forEach(input => {
      const defaultUnit: Unit.Unit = this.unitService.defaultUnit(input.group)(system);
      if (defaultUnit) {
        input.unit = defaultUnit;
      }
    });
  }

  updateSystem(): void {
    const commonSystem: Unit.System = this.unitService.commonSystem(this.inputs.map(i => i.unit));
    this.system = commonSystem != null ? Unit.System[commonSystem] : Unit.System[Unit.System.mixed];
  }

  unitString(symbol: Unit.Symbol): string {
    return Unit.Symbol[symbol];
  }
}
