import { Component, OnInit } from '@angular/core';

import { ICalculatorListItem } from './calculator-list-item';
import { Router, Route } from '@angular/router';

@Component({
  selector: 'dc-calculators-list',
  templateUrl: './calculators-list.component.html',
  styleUrls: ['./calculators-list.component.css']
})
export class CalculatorsListComponent implements OnInit {
  calculatorList: ICalculatorListItem[];
  errorMessage: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.calculatorList = this.router.config
      .filter((c: Route) => c.path && c.data && c.data.calc)
      .map<ICalculatorListItem>((c: Route) => {
        return {
          stub: `${c.path}`,
          title: `${c.data.title}`,
          subTitle: `${c.data.subtitle}`,
        };
      });
  }
}
