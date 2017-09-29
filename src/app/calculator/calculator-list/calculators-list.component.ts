import { Component, OnInit } from '@angular/core';

import { CalculatorListService } from '../calculator-list-service/calculator-list.service';
import { ICalculatorListItem } from '../calculator-list-service/calculator-list-item';

@Component({
  selector: 'dc-calculators-list',
  templateUrl: './calculators-list.component.html',
  styleUrls: ['./calculators-list.component.css']
})
export class CalculatorsListComponent implements OnInit {
  calculatorList: ICalculatorListItem[];
  errorMessage: string;

  constructor(private calculatorListService: CalculatorListService) { }

  ngOnInit() {
    this.calculatorListService.getCalculators().subscribe(
      calculators => {
        this.calculatorList = calculators;
      },
      error => this.errorMessage = <any>error
    );
  }
}
