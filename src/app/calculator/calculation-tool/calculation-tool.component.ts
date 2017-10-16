import { Component, OnInit } from '@angular/core';
import { Route, Router, ActivatedRoute } from '@angular/router';

import { UnitService } from '../unit/unit.service';
import { CalculatorService } from '../calculator-service/calculator.service';
import { EquationService } from '../equation/equation.service';
import { Unit } from '../unit/unit';
import { Calc } from '../calculator-service/calc';
import { SelectionModel } from '@angular/cdk/collections';
import { MatListOption } from '@angular/material';
import { appearOnActive } from '../../animation/animations';

@Component({
  selector: 'dc-calculation-tool',
  templateUrl: './calculation-tool.component.html',
  styleUrls: ['./calculation-tool.component.css'],
  animations: [
    appearOnActive()
  ]
})
export class CalculationToolComponent implements OnInit {
  system: string;
  calculators: Calc.Calc[];
  inputs: Calc.Input[];

  get activeInputs(): Calc.Input[] {
    return this.inputs.filter(i => i.active);
  }

  get completedResults(): Calc.Calc[] {
    return this.calculators.filter(c => (c.output.result(this.inputs) || 0) !== 0);
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private unitService: UnitService,
    private calculatorService: CalculatorService,
    private equationService: EquationService
  ) { }

  ngOnInit() {
    this.calculators = this.activatedRoute.snapshot.data['calculators'];
    this.inputs = this.activatedRoute.snapshot.data['inputs'];

    this.system = Unit.System[Unit.System.metric];
    this.setDefaultUnitSystem(this.system);
  }

  setActiveInputs(selectedOptions: SelectionModel<MatListOption>): void {
    const selectedCalcs: Calc.Calc[] = selectedOptions.selected.map<Calc.Calc>((o: MatListOption) => o.value);
    const inputIdsToActivate = this.calculatorService.getInputIds(selectedCalcs);
    this.calculators.forEach(calc => calc.active = selectedCalcs.includes(calc));
    this.inputs.forEach(input => input.active = inputIdsToActivate.includes(input.id));
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
    const commonSystem: Unit.System = this.calculatorService.commonUnitSystem(this.inputs);
    this.system = commonSystem != null ? Unit.System[commonSystem] : 'mixed';
  }

  unitString(symbol: Unit.Symbol): string {
    return Unit.Symbol[symbol];
  }
}
