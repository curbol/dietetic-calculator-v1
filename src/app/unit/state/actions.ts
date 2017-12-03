import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';

import { IAction } from '@app/store/models';
import { IUnit } from '@app/unit/models';

@Injectable()
export class UnitActions {
  static readonly LOAD_UNIT_DATA = 'unit/LOAD_UNIT_DATA';
  static readonly LOAD_UNITS_STARTED = 'unit/LOAD_UNITS_STARTED';
  static readonly LOAD_UNITS_FINISHED = 'unit/LOAD_UNITS_FINISHED';

  @dispatch()
  loadUnitData = (): IAction => ({
    type: UnitActions.LOAD_UNIT_DATA,
  })

  loadUnitsStarted = (): IAction => ({
    type: UnitActions.LOAD_UNITS_STARTED,
  })

  loadUnitsFinished = (payload: IUnit[], error: Error = null): IAction => ({
    type: UnitActions.LOAD_UNITS_FINISHED,
    payload,
    error
  })
}
