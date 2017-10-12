import { Component, OnInit } from '@angular/core';
import { Route, Router, ActivatedRoute } from '@angular/router';

import { ICalculatorListItem } from '../calculator-list/calculator-list-item';
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
  calculatorOptions: ICalculatorListItem[];

  system: string;
  weightSelector: Calc.Input;
  heightSelector: Calc.Input;

  get result(): number {
    if (this.weightSelector === null || this.heightSelector === null) {
      return null;
    }

    const weight_kg: number = this.calculatorService.inputConversion(this.weightSelector)(Unit.Symbol.kg);
    const height_m: number = this.calculatorService.inputConversion(this.heightSelector)(Unit.Symbol.m);
    const bmi: number = this.equationService.bodyMassIndex(weight_kg)(height_m);
    const roundedBmi: number = Math.round(bmi * 10) / 10;

    return roundedBmi;
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private unitService: UnitService,
    private calculatorService: CalculatorService,
    private equationService: EquationService
  ) { }

  ngOnInit() {
    this.calculatorOptions = this.router.config
      .filter((c: Route) => c.path && c.data && c.data.calc)
      .map<ICalculatorListItem>((c: Route) => {
        return {
          stub: `${c.path}`,
          title: `${c.data.title}`,
          subTitle: `${c.data.subtitle}`,
        };
      });

    const weightUnits: Calc.Input[] = this.activatedRoute.snapshot.data['weightUnits'];
    const heightUnits: Calc.Input[] = this.activatedRoute.snapshot.data['heightUnits'];

    this.weightSelector = {
      name: 'Weight',
      group: weightUnits,
      unit: null,
      value: null,
    };

    this.heightSelector = {
      name: 'Height',
      group: heightUnits,
      unit: null,
      value: null,
    };

    this.system = Unit.System[Unit.System.metric];
    this.setDefaultUnitSystem(this.system);
  }

  setDefaultUnitSystem(systemString: string): void {
    const system: Unit.System = Unit.System[systemString] || Unit.System.metric;
    [this.weightSelector, this.heightSelector].forEach(s => s.unit = this.unitService.defaultUnit(s.group)(system));
  }

  updateSystem(): void {
    const commonSystem: Unit.System = this.unitService.getCommonSystem([this.weightSelector, this.heightSelector]);
    this.system = commonSystem ? Unit.System[commonSystem] : null;
  }

  unitString(symbol: Unit.Symbol): string {
    return Unit.Symbol[symbol];
  }
}
