import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';

import { ICalc, Calc, IInput, ISelect } from '@app/calculator/models';
import { IAction } from '@app/store/models';

export type LoadCalcsAction = IAction<ICalc[]>;
export type LoadInputsAction = IAction<IInput[]>;
export type LoadSelectsAction = IAction<ISelect[]>;

@Injectable()
export class CalcAPIActions {
  static readonly LOAD_CALCS = 'LOAD_CALCS';
  static readonly LOAD_CALCS_STARTED = 'LOAD_CALCS_STARTED';
  static readonly LOAD_CALCS_FINISHED = 'LOAD_CALCS_FINISHED';

  static readonly LOAD_INPUTS = 'LOAD_INPUTS';
  static readonly LOAD_INPUTS_STARTED = 'LOAD_INPUTS_STARTED';
  static readonly LOAD_INPUTS_FINISHED = 'LOAD_INPUTS_FINISHED';

  static readonly LOAD_SELECTS = 'LOAD_SELECTS';
  static readonly LOAD_SELECTS_STARTED = 'LOAD_SELECTS_STARTED';
  static readonly LOAD_SELECTS_FINISHED = 'LOAD_SELECTS_FINISHED';

  @dispatch()
  loadCalcs = (): LoadCalcsAction => ({
    type: CalcAPIActions.LOAD_CALCS,
  })

  loadCalcsStarted = (): LoadCalcsAction => ({
    type: CalcAPIActions.LOAD_CALCS_STARTED,
  })

  loadCalcsFinished = (payload: ICalc[], error: Error = null): LoadCalcsAction => ({
    type: CalcAPIActions.LOAD_CALCS_FINISHED,
    payload,
    error
  })

  @dispatch()
  loadInputs = (): LoadInputsAction => ({
    type: CalcAPIActions.LOAD_INPUTS,
  })

  loadInputsStarted = (): LoadInputsAction => ({
    type: CalcAPIActions.LOAD_INPUTS_STARTED,
  })

  loadInputsFinished = (payload: IInput[], error: Error = null): LoadInputsAction => ({
    type: CalcAPIActions.LOAD_INPUTS_FINISHED,
    payload,
    error
  })

  @dispatch()
  loadSelects = (): LoadSelectsAction => ({
    type: CalcAPIActions.LOAD_SELECTS,
  })

  loadSelectsStarted = (): LoadSelectsAction => ({
    type: CalcAPIActions.LOAD_SELECTS_STARTED,
  })

  loadSelectsFinished = (payload: ISelect[], error: Error = null): LoadSelectsAction => ({
    type: CalcAPIActions.LOAD_SELECTS_FINISHED,
    payload,
    error
  })
}
