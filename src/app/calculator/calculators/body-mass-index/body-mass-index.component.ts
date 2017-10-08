import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UnitService } from '../../unit/unit.service';
import { EquationService } from '../../equation/equation.service';
import { Unit } from '../../unit/unit';
import { IBmiClassification } from './bmi-classification';

@Component({
  selector: 'dc-body-mass-index',
  templateUrl: './body-mass-index.component.html',
  styleUrls: ['./body-mass-index.component.scss']
})
export class BodyMassIndexComponent implements OnInit {
  system: string;
  weightSelection: Unit.ISelection;
  heightSelection: Unit.ISelection;

  bmiClassifications: IBmiClassification[] = [
    { range: '< 18.5', description: 'Underweight', inRange: (bmi: number) => bmi < 18.5 },
    { range: '18.5 - 24.9', description: 'Normal', inRange: (bmi: number) => bmi >= 18.5 && bmi < 25 },
    { range: '25 - 29.9', description: 'Overweight', inRange: (bmi: number) => bmi >= 25 && bmi < 30 },
    { range: '30 - 34.9', description: 'Obesity (Class I)', inRange: (bmi: number) => bmi >= 30 && bmi < 35 },
    { range: '35 - 39.9', description: 'Obesity (Class II)', inRange: (bmi: number) => bmi >= 35 && bmi < 40 },
    { range: '> 40', description: 'Obesity (Class III)', inRange: (bmi: number) => bmi >= 40 },
  ];

  get result(): number {
    if (!this.weightSelection.value || !this.heightSelection.value) {
      return null;
    }

    const weight_kg: number = this.unitService.selectionConversion(this.weightSelection)(Unit.Symbol.kg);
    const height_m: number = this.unitService.selectionConversion(this.heightSelection)(Unit.Symbol.m);
    const bmi: number = this.equationService.bodyMassIndex(weight_kg)(height_m);
    const roundedBmi: number = Math.round(bmi * 10) / 10;

    return roundedBmi;
  }

  constructor(private route: ActivatedRoute, private unitService: UnitService, private equationService: EquationService) {}

  ngOnInit() {
    const weightUnits: Unit.IUnit[] = this.route.snapshot.data['weightUnits'];
    this.weightSelection = { group: weightUnits, unit: null, value: null };

    const heightUnits: Unit.IUnit[] = this.route.snapshot.data['heightUnits'];
    this.heightSelection = { group: heightUnits, unit: null, value: null };

    this.system = Unit.System[Unit.System.metric];
    this.setDefaultUnitSystem(this.system);
  }

  setDefaultUnitSystem(systemString: string): void {
    const system: Unit.System = Unit.System[systemString] || Unit.System.metric;

    this.weightSelection.unit = this.unitService.defaultUnit(this.weightSelection.group)(system);
    this.heightSelection.unit = this.unitService.defaultUnit(this.heightSelection.group)(system);
  }

  updateSystem() {
    if (this.weightSelection.unit.system === this.heightSelection.unit.system) {
      this.system = Unit.System[this.weightSelection.unit.system];
    } else {
      this.system = null;
    }
  }

  unitString(symbol: Unit.Symbol): string {
    return Unit.Symbol[symbol];
  }
}
