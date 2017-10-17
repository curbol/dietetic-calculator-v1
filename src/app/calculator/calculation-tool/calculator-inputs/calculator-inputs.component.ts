import { Component, OnInit, Input } from '@angular/core';

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
  @Input() system: string = null;

  @Input() inputs: Calc.Input[];

  constructor(private unitService: UnitService) { }

  ngOnInit() {
    if (this.system === null) {
      this.system = Unit.System[Unit.System.metric];
      this.setDefaultUnitSystem(this.system);
    }
  }

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
    this.system = commonSystem != null ? Unit.System[commonSystem] : 'mixed';
  }

  unitString(symbol: Unit.Symbol): string {
    return Unit.Symbol[symbol];
  }
}
