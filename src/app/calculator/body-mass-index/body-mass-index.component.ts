import { Component, OnInit } from '@angular/core';

import { IUnit, UnitSymbol } from '../unit';

@Component({
  selector: 'dc-body-mass-index',
  templateUrl: './body-mass-index.component.html',
  styleUrls: ['./body-mass-index.component.css']
})
export class BodyMassIndexComponent implements OnInit {
  weightUnit: IUnit;
  heightUnit: IUnit;
  weightValue: number;
  heightValue: number;

  get result(): number {
    if (!this.weightValue || !this.heightValue) {
      return;
    }

    return this.calculateBMI(this.weightValue, this.heightValue);
  }

  weightUnits: IUnit[] = [
    { symbol: UnitSymbol.lbs, name: 'pounds' },
    { symbol: UnitSymbol.kg, name: 'kilograms' }
  ];

  heightUnits: IUnit[] = [
    { symbol: UnitSymbol.in, name: 'inches' },
    { symbol: UnitSymbol.ft, name: 'feet' },
    { symbol: UnitSymbol.cm, name: 'centimeters' },
    { symbol: UnitSymbol.m, name: 'meters' }
  ];

  constructor() { }

  ngOnInit() {
    this.weightUnit = this.weightUnits[0];
    this.heightUnit = this.heightUnits[0];
  }

  unitString(unit: UnitSymbol) {
    return UnitSymbol.toString(unit);
  }

  calculateBMI(weight_kg: number, height_m: number): number {
    return weight_kg / (height_m * height_m);
  }
}
