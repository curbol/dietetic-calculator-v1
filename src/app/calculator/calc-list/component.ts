import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatListOptionChange } from '@angular/material';

import { ICalc } from '@app/calculator/models';

@Component({
  selector: 'dc-calc-list',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
})
export class CalcListComponent implements OnInit {
  @Input() calcs: ICalc[];
  @Output() calcActiveChanged = new EventEmitter<{id: string, active: boolean}>();

  constructor() { }

  ngOnInit() {}

  onSelectionChange = (event: MatListOptionChange) => {
    const calc = event.source.value;
    const active = event.selected;

    if (calc.active !== active) {
      this.calcActiveChanged.emit({id: calc.id, active});
    }
  }
}
