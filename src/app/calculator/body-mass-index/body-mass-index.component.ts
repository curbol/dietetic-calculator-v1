import { Component, OnInit } from '@angular/core';

import { Unit } from '../unit';

@Component({
  selector: 'dc-body-mass-index',
  templateUrl: './body-mass-index.component.html',
  styleUrls: ['./body-mass-index.component.css']
})
export class BodyMassIndexComponent implements OnInit {
  weightUnits: Unit.IUnit[];
  heightUnits: Unit.IUnit[];
  weightUnit: Unit.IUnit;
  heightUnit: Unit.IUnit;
  weightValue: number;
  heightValue: number;

  get result(): number {
    if (!this.weightValue || !this.heightValue) {
      return;
    }

    return this.calculateBMI(this.weightValue, this.heightValue);
  }

  constructor() { }

  ngOnInit() {
    this.weightUnits = Unit.weightUnits;
    this.heightUnits = Unit.lengthUnits;
    this.weightUnit = this.weightUnits[0];
    this.heightUnit = this.heightUnits[0];
  }

  unitString(symbol: Unit.Symbol) {
    return Unit.Symbol[symbol];
  }

  calculateBMI(weight_kg: number, height_m: number): number {
    return weight_kg / (height_m * height_m);
  }
}
