import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { IAction } from '@app/shared/models/action.models';
import { ICalc, Calc } from '@app/calculator/calc.models';

export type LoadCalcsAction = IAction<ICalc[]>;
export type LoadInputsAction = IAction<Calc.IInput[]>;
export type LoadSelectionsAction = IAction<Calc.ISelection[]>;

@Injectable()
export class CalcApiActions {
  static readonly LOAD_CALCS = 'LOAD_CALCS';
  static readonly LOAD_CALCS_STARTED = 'LOAD_CALCS_STARTED';
  static readonly LOAD_CALCS_FINISHED = 'LOAD_CALCS_FINISHED';

  static readonly LOAD_INPUTS = 'LOAD_INPUTS';
  static readonly LOAD_INPUTS_STARTED = 'LOAD_INPUTS_STARTED';
  static readonly LOAD_INPUTS_FINISHED = 'LOAD_INPUTS_FINISHED';

  static readonly LOAD_SELECTIONS = 'LOAD_SELECTIONS';
  static readonly LOAD_SELECTIONS_STARTED = 'LOAD_SELECTIONS_STARTED';
  static readonly LOAD_SELECTIONS_FINISHED = 'LOAD_SELECTIONS_FINISHED';

  @dispatch()
  loadCalcs = (): LoadCalcsAction => ({
    type: CalcApiActions.LOAD_CALCS,
  })

  loadCalcsStarted = (): LoadCalcsAction => ({
    type: CalcApiActions.LOAD_CALCS_STARTED,
  })

  loadCalcsFinished = (payload: ICalc[], error = null): LoadCalcsAction => ({
    type: CalcApiActions.LOAD_CALCS_FINISHED,
    payload,
    error
  })

  @dispatch()
  loadInputs = (): LoadInputsAction => ({
    type: CalcApiActions.LOAD_INPUTS,
  })

  loadInputsStarted = (): LoadInputsAction => ({
    type: CalcApiActions.LOAD_INPUTS_STARTED,
  })

  loadInputsFinished = (payload: Calc.IInput[], error = null): LoadInputsAction => ({
    type: CalcApiActions.LOAD_INPUTS_FINISHED,
    payload,
    error
  })

  @dispatch()
  loadSelections = (): LoadSelectionsAction => ({
    type: CalcApiActions.LOAD_SELECTIONS,
  })

  loadSelectionsStarted = (): LoadSelectionsAction => ({
    type: CalcApiActions.LOAD_SELECTIONS_STARTED,
  })

  loadSelectionsFinished = (payload: Calc.ISelection[], error = null): LoadSelectionsAction => ({
    type: CalcApiActions.LOAD_SELECTIONS_FINISHED,
    payload,
    error
  })
}
