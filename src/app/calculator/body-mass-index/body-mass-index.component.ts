import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dc-body-mass-index',
  templateUrl: './body-mass-index.component.html',
  styleUrls: ['./body-mass-index.component.css']
})
export class BodyMassIndexComponent implements OnInit { 
  selectedUnit: string;
  units = [
    { value: 'lbs', viewValue: 'lbs' },
    { value: 'kg', viewValue: 'kg' }
  ];

  constructor() { }

  ngOnInit() {
    this.selectedUnit = this.units[0].value;
  }
}
