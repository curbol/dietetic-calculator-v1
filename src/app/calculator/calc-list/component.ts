import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatListOptionChange } from '@angular/material';

import { ICalc } from '@app/calculator/models';

@Component({
  selector: 'dc-calc-list',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
})
export class CalcListComponent implements OnInit {
  @Input() calculators: ICalc[];
  @Output() activeCalculatorsChanged = new EventEmitter<ICalc[]>();

  constructor() { }

  ngOnInit() {
    this.updateActiveCalculators();
  }

  onSelectionChange(event: MatListOptionChange) {
    const calc: ICalc = event.source.value;
    calc.active = event.selected;

    this.updateActiveCalculators();
  }

  updateActiveCalculators = (): void => {
    const activeCalcs: ICalc[] = this.calculators.filter(c => c.active);
    this.activeCalculatorsChanged.emit(activeCalcs);
  }
}
