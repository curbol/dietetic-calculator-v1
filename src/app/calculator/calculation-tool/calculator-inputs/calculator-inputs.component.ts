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
  @Output() systemChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() set system(system: string) {
    this.systemText = system;
    this.systemChange.emit(this.systemText);
  }

  @Input() inputs: Calc.Input[];

  get activeInputs(): Calc.Input[] {
    return this.inputs.filter(i => i.active);
  }

  constructor(private unitService: UnitService) {}

  ngOnInit() {}

  onSystemChange(systemString: string): void {
    const system: Unit.System = Unit.System[systemString];
    if (system === null || system === undefined) { return; }

    this.system = systemString;
    this.setDefaultUnitSystem(system);
  }

  onUnitChange(): void {
    this.updateSystem();
  }

  unitString(symbol: Unit.Symbol): string {
    return Unit.Symbol[symbol];
  }

  private setDefaultUnitSystem(system: Unit.System): void {
    const inputsToUpdate = this.inputs.filter(input => input.unit && input.unit.system !== system);
    inputsToUpdate.forEach(input => {
      const defaultUnit: Unit.Unit = this.unitService.defaultUnit(input.group)(system);
      if (defaultUnit) { input.unit = defaultUnit; }
    });
  }

  private updateSystem(): void {
    const commonSystem: Unit.System = this.unitService.commonSystem(this.inputs.map(i => i.unit));
    this.system = commonSystem != null ? Unit.System[commonSystem] : Unit.System[Unit.System.mixed];
  }
}
