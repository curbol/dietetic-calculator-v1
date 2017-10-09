import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UnitService } from '../../unit/unit.service';
import { EquationService } from '../../equation/equation.service';
import { Unit } from '../../unit/unit';

@Component({
  selector: 'dc-mifflin-st-jeor',
  templateUrl: './mifflin-st-jeor.component.html',
  styleUrls: ['./mifflin-st-jeor.component.css']
})
export class MifflinStJeorComponent implements OnInit {
  system: string;
  weightSelector: Unit.ISelection;
  heightSelector: Unit.ISelection;

  get result(): number {
    if (this.weightSelector === null || this.heightSelector === null) {
      return null;
    }

    const weight_kg: number = this.unitService.selectionConversion(this.weightSelector)(Unit.Symbol.kg);
    const height_m: number = this.unitService.selectionConversion(this.heightSelector)(Unit.Symbol.m);
    const bmi: number = this.equationService.bodyMassIndex(weight_kg)(height_m);
    const roundedBmi: number = Math.round(bmi * 10) / 10;

    return roundedBmi;
  }

  constructor(private route: ActivatedRoute, private unitService: UnitService, private equationService: EquationService) {}

  ngOnInit() {
    const weightUnits: Unit.IUnit[] = this.route.snapshot.data['weightUnits'];
    const heightUnits: Unit.IUnit[] = this.route.snapshot.data['heightUnits'];

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
