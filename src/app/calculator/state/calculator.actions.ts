import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';

import { IAppState } from '@app/store/IAppState';
import { CalculatorService } from '@app/calculator/service/calculator.service';
import { UnitService } from '@app/unit/unit.service';

export const REQUEST_CALCS_SUCCESS = 'calc/REQUEST_CALCS_SUCCESS';
export const CHOOSE_CALCS = 'calc/CHOOSE_CALCS';

@Injectable()
export class CalculatorActions {

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private calcService: CalculatorService,
    private unitService: UnitService,
  ) {}

  getCalculators = () => this.calcService.getAllCalcs().subscribe(calcs => this.ngRedux.dispatch({
    type: REQUEST_CALCS_SUCCESS,
    calcs,
  }))

  chooseCalculators = (searchText: string) => this.ngRedux.dispatch({
    type: CHOOSE_CALCS,
    searchText,
  })

}
