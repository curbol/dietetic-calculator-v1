import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatListOption, MatListOptionChange } from '@angular/material';

import { Calc } from '../../calc';
import { CalculatorService } from '../../service/calculator.service';

@Component({
  selector: 'dc-calculator-options',
  templateUrl: './calculator-options.component.html',
  styleUrls: ['./calculator-options.component.css'],
})
export class CalculatorOptionsComponent implements OnInit {
  @Input() calculators: Calc.Calc[];
  @Output() activeCalculatorsChanged = new EventEmitter<Calc.Calc[]>();

  constructor(private calculatorService: CalculatorService) { }

  ngOnInit() {
    this.updateActiveCalculators();
  }

  onSelectionChange(event: MatListOptionChange) {
    const calc: Calc.Calc = event.source.value;
    calc.active = event.selected;

    this.updateActiveCalculators();
  }

  updateActiveCalculators = (): void => {
    const activeCalcs: Calc.Calc[] = this.calculators.filter(c => c.active);
    this.activeCalculatorsChanged.emit(activeCalcs);
  }
}
