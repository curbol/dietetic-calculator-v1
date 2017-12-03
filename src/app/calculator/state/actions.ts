import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';

import { ICalc, Calc, IInput, ISelect } from '@app/calculator/models';
import { IAction } from '@app/store/models';

@Injectable()
export class CalcActions {
  static readonly LOAD_CALC_DATA = 'calc/LOAD_CALC_DATA';
  static readonly LOAD_CALCS_STARTED = 'calc/LOAD_CALCS_STARTED';
  static readonly LOAD_CALCS_FINISHED = 'calc/LOAD_CALCS_FINISHED';
  static readonly LOAD_INPUTS_STARTED = 'calc/LOAD_INPUTS_STARTED';
  static readonly LOAD_INPUTS_FINISHED = 'calc/LOAD_INPUTS_FINISHED';
  static readonly LOAD_SELECTS_STARTED = 'calc/LOAD_SELECTS_STARTED';
  static readonly LOAD_SELECTS_FINISHED = 'calc/LOAD_SELECTS_FINISHED';

  static readonly SET_CALCS_ACTIVE = 'calc/SET_CALCS_ACTIVE';
  static readonly SET_INPUTS_ACTIVE = 'calc/SET_INPUTS_ACTIVE';
  static readonly SET_SELECTS_ACTIVE = 'calc/SET_SELECTS_ACTIVE';

  static readonly SET_INPUTS_UNIT = 'calc/SET_INPUTS_UNIT';
  static readonly SET_INPUTS_VALUE = 'calc/SET_INPUTS_VALUE';
  static readonly SET_SELECTS_VALUE = 'calc/SET_SELECTS_VALUE';
  static readonly SET_OUTPUTS_UNIT = 'calc/SET_OUTPUTS_UNIT';
  static readonly SET_OUTPUTS_VALUE = 'calc/SET_OUTPUTS_VALUE';
  static readonly SET_OUTPUTS_CONVERTED_VALUE = 'calc/SET_OUTPUTS_CONVERTED_VALUE';

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

  @dispatch()
  setOutputsUnit = (payload: {id: string, symbol: string}[]): IAction => ({
    type: CalcActions.SET_OUTPUTS_UNIT,
    payload: payload,
  })

  setOutputsValue = (payload: {id: string, value: number}[]): IAction => ({
    type: CalcActions.SET_OUTPUTS_VALUE,
    payload: payload,
  })

  setOutputsConvertedValue = (payload: {id: string, convertedValue: number}[]): IAction => ({
    type: CalcActions.SET_OUTPUTS_CONVERTED_VALUE,
    payload: payload,
  })
}
