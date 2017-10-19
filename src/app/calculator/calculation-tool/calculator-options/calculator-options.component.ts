import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatListOption, MatListOptionChange } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

import { CalculatorService } from '../../calculator-service/calculator.service';
import { Calc } from '../../calculator-service/calc';

@Component({
  selector: 'dc-calculator-options',
  templateUrl: './calculator-options.component.html',
  styleUrls: ['./calculator-options.component.css'],
})
export class CalculatorOptionsComponent implements OnInit {
  @Input() calculators: Calc.Calc[];
  @Output() activeCalculatorsChanged = new EventEmitter<Calc.Calc[]>();

  constructor(private calculatorService: CalculatorService) { }

  ngOnInit() {}

  onSelectionChange(event: MatListOptionChange) {
    const calc: Calc.Calc = event.source.value;
    calc.active = event.selected;

    const selectedCalcs: Calc.Calc[] = this.calculators.filter(c => c.active);
    this.activeCalculatorsChanged.emit(selectedCalcs);
  }
}
