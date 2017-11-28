import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatListOptionChange } from '@angular/material';

import { ICalc } from '@app/calculator/models';
import { CalcActions } from '@app/calculator/state/actions';

@Component({
  selector: 'dc-calc-list',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
})
export class CalcListComponent implements OnInit {
  @Input() calcs: ICalc[];

  constructor(
    private calcActions: CalcActions,
  ) {}

  ngOnInit() {}

  onSelectionChange = (event: MatListOptionChange) => {
    const calc: ICalc = event.source.value;
    const active: boolean = event.selected;
    if (calc.active !== active) { this.calcActions.setCalcsActive([{id: calc.id, active}]); }
  }

  activateAll = () => this.calcActions.setCalcsActive(this.calcs.map(c => ({id: c.id, active: true})));
  deactivateAll = () => this.calcActions.setCalcsActive(this.calcs.map(c => ({id: c.id, active: false})));
}
