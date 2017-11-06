import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatListOptionChange } from '@angular/material';

import { Calc } from '@app/calculator/calc';

@Component({
  selector: 'dc-calculator-options',
  templateUrl: './calculator-options.component.html',
  styleUrls: ['./calculator-options.component.css'],
})
export class CalculatorOptionsComponent implements OnInit {
  @Input() calculators: Calc.Calc[];
  @Output() activeCalculatorsChanged = new EventEmitter<Calc.Calc[]>();

  constructor() { }

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

  getCalcGroupString = (group: Calc.Group): string => Calc.Group[group].replace('_', ' ');
}
