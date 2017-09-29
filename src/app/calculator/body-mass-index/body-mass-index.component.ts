import { Component, OnInit } from '@angular/core';

import { Unit } from '../unit';

@Component({
  selector: 'dc-body-mass-index',
  templateUrl: './body-mass-index.component.html',
  styleUrls: ['./body-mass-index.component.css']
})
export class BodyMassIndexComponent implements OnInit {
  system: string;
  weightSelection: Unit.IUnitSelection;
  heightSelection: Unit.IUnitSelection;

  get result(): number {
    if (!this.weightSelection.value || !this.heightSelection.value) {
      return;
    }

    const weight_kg: number = Unit.selectionConversion(this.weightSelection)(Unit.Symbol.kg);
    const height_m: number = Unit.selectionConversion(this.heightSelection)(Unit.Symbol.m);

    return this.calculateBMI(weight_kg, height_m);
  }

  constructor() { }

  ngOnInit() {
    this.weightSelection = {
      group: Unit.weightUnits,
      unit: Unit.weightUnits[0],
      value: null,
    };

    this.heightSelection = {
      group: Unit.lengthUnits,
      unit: Unit.lengthUnits[0],
      value: null,
    };

    this.system = Unit.System[Unit.System.metric];
    this.setDefaultUnitSystem(this.system);
  }

  setDefaultUnitSystem(systemString: string): void {
    const system: Unit.System = Unit.System[systemString] || Unit.System.metric;

    this.weightSelection.unit = Unit.defaultUnit(this.weightSelection.group)(system);
    this.heightSelection.unit = Unit.defaultUnit(this.heightSelection.group)(system);
  }

  updateSystem() {
    if (this.weightSelection.unit.system === this.heightSelection.unit.system) {
      this.system = Unit.System[this.weightSelection.unit.system];
    }
  }

  unitString(symbol: Unit.Symbol): string {
    return Unit.Symbol[symbol];
  }

  calculateBMI(weight_kg: number, height_m: number): number {
    return weight_kg / (height_m * height_m);
  }
}
