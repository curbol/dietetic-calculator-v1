import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dc-body-mass-index',
  templateUrl: './body-mass-index.component.html',
  styleUrls: ['./body-mass-index.component.css']
})
export class BodyMassIndexComponent implements OnInit {
  weightUnit: { unit: string, description: string };
  heightUnit: { unit: string, description: string };
  weightValue: number;
  heightValue: number;

  get result(): number {
    if (!this.weightValue || !this.heightValue)
      return;

    return this.calculateBMI(this.weightValue, this.heightValue);
  }

  weightUnits = [
    { unit: 'lbs', description: 'pounds' },
    { unit: 'kg', description: 'kilograms' }
  ];

  heightUnits = [
    { unit: 'in', description: 'inches' },
    { unit: 'ft', description: 'feet' },
    { unit: 'cm', description: 'centimeters' },
    { unit: 'm', description: 'meters' }
  ];

  constructor() { }

  ngOnInit() {
    this.weightUnit = this.weightUnits[0];
    this.heightUnit = this.heightUnits[0];
  }

  calculateBMI(weight_kg: number, height_m: number): number {
    return weight_kg / (height_m * height_m);
  }
}
