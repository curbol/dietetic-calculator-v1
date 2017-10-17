import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatListOption } from '@angular/material';

import { Calc } from '../../calculator-service/calc';
import { CalculatorService } from '../../calculator-service/calculator.service';

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
  }

  setActiveCalculators(selectedOptions: SelectionModel<MatListOption>): void {
    const selectedCalcs: Calc.Calc[] = selectedOptions.selected.map<Calc.Calc>((o: MatListOption) => o.value);

    this.calculators.forEach(calc => calc.active = selectedCalcs.includes(calc));
    this.activeCalculatorsChanged.emit(selectedCalcs);
  }
}
