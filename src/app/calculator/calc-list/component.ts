import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatListOptionChange } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { ICalc } from '@app/calculator/models';
import { dispatch } from '@angular-redux/store';
import { CalcActions } from '@app/calculator/actions';

@Component({
  selector: 'dc-calc-list',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
})
export class CalcListComponent implements OnInit {
  @Input() calculators$: Observable<ICalc[]>;
  @Output() activeCalculatorsChanged = new EventEmitter<ICalc[]>();

  constructor(
    private actions: CalcActions,
  ) { }

  ngOnInit() {}

  setCalcActive = (calcId: string, active: boolean) => active ?
    this.actions.activateCalc(calcId) :
    this.actions.deactivateCalc(calcId)
}
