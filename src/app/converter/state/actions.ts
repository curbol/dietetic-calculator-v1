import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { IAction } from '@app/store/models';

@Injectable()
export class ConverterActions {
  static readonly SET_TYPE = 'convert/SET_TYPE';
  static readonly SET_VALUE = 'convert/SET_VALUE';
  static readonly SET_CALCULATED_VALUE = 'convert/SET_CALCULATED_VALUE';
  static readonly SET_UNIT = 'convert/SET_UNIT';
  static readonly SET_CONVERTED_VALUE = 'convert/SET_CONVERTED_VALUE';
  static readonly SET_CALCULATED_CONVERTED_VALUE = 'convert/SET_CALCULATED_CONVERTED_VALUE';
  static readonly SET_CONVERT_TO_UNIT = 'convert/SET_CONVERT_TO_UNIT';
  static readonly SET_CONVERTING = 'convert/SET_CONVERTING';

  setType = (payload: string): IAction => ({
    type: ConverterActions.SET_TYPE,
    payload: payload,
  })

  setValue = (payload: number): IAction => ({
    type: ConverterActions.SET_VALUE,
    payload: payload,
  })

  setCalculatedValue = (payload: number): IAction => ({
    type: ConverterActions.SET_CALCULATED_VALUE,
    payload: payload,
  })

  setUnit = (payload: string): IAction => ({
    type: ConverterActions.SET_UNIT,
    payload: payload,
  })

  setConvertedValue = (payload: number): IAction => ({
    type: ConverterActions.SET_CONVERTED_VALUE,
    payload: payload,
  })

  setCalculatedConvertedValue = (payload: number): IAction => ({
    type: ConverterActions.SET_CALCULATED_CONVERTED_VALUE,
    payload: payload,
  })

  setConvertToUnit = (payload: string): IAction => ({
    type: ConverterActions.SET_CONVERT_TO_UNIT,
    payload: payload,
  })
}
