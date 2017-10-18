import { Component, OnInit, Input } from '@angular/core';

import { appearOnActive } from '../../../animation/animations';
import { Calc } from '../../calculator-service/calc';

@Component({
  selector: 'dc-calculator-outputs',
  templateUrl: './calculator-outputs.component.html',
  styleUrls: ['./calculator-outputs.component.css'],
  animations: [
    appearOnActive()
  ]
})
export class CalculatorOutputsComponent implements OnInit {
  @Input() calculators: Calc.Calc[];
  @Input() inputs: Calc.Input[];

  constructor() { }

  ngOnInit() {}
}
