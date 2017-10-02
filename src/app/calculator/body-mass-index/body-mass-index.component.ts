import { Component, OnInit } from '@angular/core';

import { UnitService } from '../unit/unit.service';
import { EquationService } from '../equation/equation.service';
import { Unit } from '../unit/unit';
import { CanActivate, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'dc-body-mass-index',
  templateUrl: './body-mass-index.component.html',
  styleUrls: ['./body-mass-index.component.scss']
})
export class BodyMassIndexComponent implements OnInit {
  system: string;
  weightSelection: Unit.IUnitSelection;
  heightSelection: Unit.IUnitSelection;

  bmiClassifications: { range: string, description: string }[] = [
    { range: '< 18.5', description: 'Underweight' },
    { range: '18.5 - 25', description: 'Normal' },
    { range: '25 - 30', description: 'Overweight' },
    { range: '30 - 35', description: 'Obesity (Class I)' },
    { range: '35 - 40', description: 'Obesity (Class II)' },
    { range: '> 40', description: 'Obesity (Class III)' },
  ];

  get result(): number {
    if (!this.weightSelection.value || !this.heightSelection.value) {
      return null;
    }

    const weight_kg: number = this.unitService.selectionConversion(this.weightSelection)(Unit.Symbol.kg);
    const height_m: number = this.unitService.selectionConversion(this.heightSelection)(Unit.Symbol.m);

    return this.equationService.bodyMassIndex(weight_kg)(height_m);
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
