import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { CalculatorService } from './calculator.service';
import { Calc, ICalc } from '@app/calculator/calc.model';

@Injectable()
export class CalculatorsResolver implements Resolve<ICalc[]> {
  constructor(private calculatorService: CalculatorService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICalc[]>|Promise<ICalc[]>|ICalc[] {
    return this.calculatorService.getAllCalcs();
  }
}

@Injectable()
export class InputsResolver implements Resolve<Calc.IInput[]> {
  constructor(private calculatorService: CalculatorService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Calc.IInput[]>|Promise<Calc.IInput[]>|Calc.IInput[] {
    return this.calculatorService.getAllInputs();
  }
}

@Injectable()
export class SelectionsResolver implements Resolve<Calc.ISelection[]> {
  constructor(private calculatorService: CalculatorService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Calc.ISelection[]>|Promise<Calc.ISelection[]>|Calc.ISelection[] {
    return this.calculatorService.getAllSelections();
  }
}
