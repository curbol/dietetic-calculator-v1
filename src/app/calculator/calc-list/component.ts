import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatListOptionChange } from '@angular/material';
import { ICalc } from '@app/calculator/calc.model';


@Component({
  selector: 'dc-calc-list',
  templateUrl: './calc-list.component.html',
  styleUrls: ['./calc-list.component.css'],
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

  getCalcGroupString = (group: Calc.Group): string => Calc.Group[group].replace('_', ' ');
}
