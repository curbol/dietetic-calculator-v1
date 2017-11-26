import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';

import { ICalc, Calc, IInput, ISelect } from '@app/calculator/models';
import { IAction } from '@app/store/models';

@Injectable()
export class CalcActions {
  static readonly ACTIVATE_CALC = 'ACTIVATE_CALC';
  static readonly DEACTIVATE_CALC = 'DEACTIVATE_CALC';

  @dispatch()
  activateCalc = (payload: string): IAction => ({
    type: CalcActions.ACTIVATE_CALC,
    payload,
  })

  @dispatch()
  deactivateCalc = (payload: string): IAction => ({
    type: CalcActions.DEACTIVATE_CALC,
    payload,
  })
}
