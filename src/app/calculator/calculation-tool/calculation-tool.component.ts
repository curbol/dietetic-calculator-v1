import { Component, OnInit } from '@angular/core';
import { Route, Router, ActivatedRoute } from '@angular/router';

import { UnitService } from '../unit/unit.service';
import { CalculatorService } from '../calculator-service/calculator.service';
import { EquationService } from '../equation/equation.service';
import { Unit } from '../unit/unit';
import { Calc } from '../calculator-service/calc';

@Component({
  selector: 'dc-calculation-tool',
  templateUrl: './calculation-tool.component.html',
  styleUrls: ['./calculation-tool.component.css']
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

  setDefaultUnitSystem(systemString: string): void {
    // const system: Unit.System = Unit.System[systemString] || Unit.System.metric;
    // [this.weightSelector, this.heightSelector].forEach(s => s.unit = this.unitService.defaultUnit(s.group)(system));
  }

  updateSystem(): void {
    // const commonSystem: Unit.System = this.calculatorService.commonUnitSystem([this.weightSelector, this.heightSelector]);
    // this.system = commonSystem ? Unit.System[commonSystem] : null;
  }

  unitString(symbol: Unit.Symbol): string {
    return Unit.Symbol[symbol];
  }
}
