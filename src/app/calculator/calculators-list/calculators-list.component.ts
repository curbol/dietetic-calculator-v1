import { Component, OnInit } from '@angular/core';

import { ICalculator } from '../calculator';
import { CalculatorService } from '../calculator-service/calculator.service';

@Component({
  selector: 'app-calculators-list',
  templateUrl: './calculators-list.component.html',
  styleUrls: ['./calculators-list.component.css'],
})
export class CalculatorsListComponent implements OnInit {
  calculators: ICalculator[];
  errorMessage: string;

  constructor(private _calculatorService: CalculatorService) { }

  ngOnInit() {
    this._calculatorService.getCalculators().subscribe(
      calculators => {
        this.calculators = calculators;
      },
      error => this.errorMessage = <any>error
    );
  }
}