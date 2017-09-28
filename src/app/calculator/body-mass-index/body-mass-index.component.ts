import { Component, OnInit } from '@angular/core';

import { Unit } from '../unit';

@Component({
  selector: 'dc-body-mass-index',
  templateUrl: './body-mass-index.component.html',
  styleUrls: ['./body-mass-index.component.css']
})
export class BodyMassIndexComponent implements OnInit {
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
      unitGroup: Unit.weightUnits,
      selectedUnit: Unit.weightUnits[0],
      value: null,
    };

    this.heightSelection = {
      unitGroup: Unit.lengthUnits,
      selectedUnit: Unit.lengthUnits[0],
      value: null,
    };
  }

  unitString(symbol: Unit.Symbol) {
    return Unit.Symbol[symbol];
  }

  calculateBMI(weight_kg: number, height_m: number): number {
    return weight_kg / (height_m * height_m);
  }
}
