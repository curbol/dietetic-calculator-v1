import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';

import { ICalc, Calc, IInput, ISelect } from '@app/calculator/models';
import { IAction } from '@app/store/models';

@Injectable()
export class CalcActions {
  static readonly LOAD_CALC_DATA = 'LOAD_CALC_DATA';
  static readonly LOAD_CALCS_STARTED = 'LOAD_CALCS_STARTED';
  static readonly LOAD_CALCS_FINISHED = 'LOAD_CALCS_FINISHED';
  static readonly LOAD_INPUTS_STARTED = 'LOAD_INPUTS_STARTED';
  static readonly LOAD_INPUTS_FINISHED = 'LOAD_INPUTS_FINISHED';
  static readonly LOAD_SELECTS_STARTED = 'LOAD_SELECTS_STARTED';
  static readonly LOAD_SELECTS_FINISHED = 'LOAD_SELECTS_FINISHED';

  static readonly SET_CALCS_ACTIVE = 'SET_CALCS_ACTIVE';
  static readonly SET_INPUTS_ACTIVE = 'SET_INPUTS_ACTIVE';
  static readonly SET_SELECTS_ACTIVE = 'SET_SELECTS_ACTIVE';

  static readonly SET_INPUTS_UNIT = 'SET_INPUTS_UNIT';
  static readonly SET_INPUTS_VALUE = 'SET_INPUTS_VALUE';
  static readonly SET_SELECTS_VALUE = 'SET_SELECTS_VALUE';

  @dispatch()
  loadCalcData = (): IAction => ({ type: CalcActions.LOAD_CALC_DATA })

  loadCalcsStarted = (): IAction => ({ type: CalcActions.LOAD_CALCS_STARTED });
  loadCalcsFinished = (payload: ICalc[], error: Error = null): IAction => ({
    type: CalcActions.LOAD_CALCS_FINISHED,
    payload,
    error
  })

  loadInputsStarted = (): IAction => ({ type: CalcActions.LOAD_INPUTS_STARTED });
  loadInputsFinished = (payload: IInput[], error: Error = null): IAction => ({
    type: CalcActions.LOAD_INPUTS_FINISHED,
    payload,
    error
  })

  loadSelectsStarted = (): IAction => ({ type: CalcActions.LOAD_SELECTS_STARTED });
  loadSelectsFinished = (payload: ISelect[], error: Error = null): IAction => ({
    type: CalcActions.LOAD_SELECTS_FINISHED,
    payload,
    error
  })

  @dispatch()
  setCalcsActive = (payload: {id: string, active: boolean}[]): IAction => ({
    type: CalcActions.SET_CALCS_ACTIVE,
    payload: payload,
  })

  setInputsActive = (payload: {id: string, active: boolean}[]): IAction => ({
    type: CalcActions.SET_INPUTS_ACTIVE,
    payload,
  })

  setSelectsActive = (payload: {id: string, active: boolean}[]): IAction => ({
    type: CalcActions.SET_SELECTS_ACTIVE,
    payload,
  })

  @dispatch()
  setInputsUnit = (payload: {id: string, symbol: string}[]): IAction => ({
    type: CalcActions.SET_INPUTS_UNIT,
    payload: payload,
  })

  @dispatch()
  setInputsValue = (payload: {id: string, value: number}[]): IAction => ({
    type: CalcActions.SET_INPUTS_VALUE,
    payload: payload,
  })

  @dispatch()
  setSelectsValue = (payload: {id: string, value: string}[]): IAction => ({
    type: CalcActions.SET_SELECTS_VALUE,
    payload: payload,
  })
}
