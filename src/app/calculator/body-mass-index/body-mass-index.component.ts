import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dc-body-mass-index',
  templateUrl: './body-mass-index.component.html',
  styleUrls: ['./body-mass-index.component.css']
})
export class BodyMassIndexComponent implements OnInit {
  weightUnit: { value: string, viewValue: string };
  heightUnit: { value: string, viewValue: string };

  units = [
    { value: 'lbs', viewValue: 'lbs' },
    { value: 'kg', viewValue: 'kg' }
  ];

  constructor() { }

  ngOnInit() {
    this.weightUnit = this.units[0];
    this.heightUnit = this.units[0];
  }

  setGlobalUnits(value: string){
    if (value === 'lbs') {
      this.weightUnit = this.units[0];
      this.heightUnit = this.units[0];
    } else {
      this.weightUnit = this.units[1];
      this.heightUnit = this.units[1];
    }
  }
}
