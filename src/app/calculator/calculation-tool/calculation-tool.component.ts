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

  get result(): number {
    return 123;

    // if (this.weightSelector === null || this.heightSelector === null) {
    //   return null;
    // }

    // const weight_kg: number = this.calculatorService.inputConversion(this.weightSelector)(Unit.Symbol.kg);
    // const height_m: number = this.calculatorService.inputConversion(this.heightSelector)(Unit.Symbol.m);
    // const bmi: number = this.equationService.bodyMassIndex(weight_kg)(height_m);
    // const roundedBmi: number = Math.round(bmi * 10) / 10;

    // return roundedBmi;
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

  setActiveUnits(selectedCalcs: SelectionModel<MatListOption>): void {
    const calcs: Calc.Calc[] = selectedCalcs.selected.map<Calc.Calc>((o: MatListOption) => o.value);
    const mergedInputIds: Calc.Input.Id[] = [].concat.apply([], calcs.map(i => i.inputIds));
    const inputIdsToActivate: Calc.Input.Id[] = mergedInputIds.filter((v, i, a) => a.indexOf(v) === i);

    this.inputs.forEach(input => input.active = inputIdsToActivate.includes(input.id));
  }

  setDefaultUnitSystem(systemString: string): void {
    const system: Unit.System = Unit.System[systemString] || Unit.System.metric;
    this.inputs.filter(input => input.unit && input.unit.system !== system).forEach(input => {
      const defaultUnit: Unit.Unit = this.unitService.defaultUnit(input.group)(system);
      if (defaultUnit) { input.unit = defaultUnit; }
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
