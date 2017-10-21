import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Calc } from '../calc';
import { CalculatorService } from './calculator.service';

@Injectable()
export class CalculatorsResolver implements Resolve<Calc.Calc[]> {
  constructor(private calculatorService: CalculatorService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Calc.Calc[]>|Promise<Calc.Calc[]>|Calc.Calc[] {
    return this.calculatorService.getCalculators();
  }
}

@Injectable()
export class InputsResolver implements Resolve<Calc.Input[]> {
  constructor(private calculatorService: CalculatorService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Calc.Input[]>|Promise<Calc.Input[]>|Calc.Input[] {
    return this.calculatorService.getAllInputs();
  }
}

@Injectable()
export class SelectionsResolver implements Resolve<Calc.Selection[]> {
  constructor(private calculatorService: CalculatorService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Calc.Selection[]>|Promise<Calc.Selection[]>|Calc.Selection[] {
    return this.calculatorService.getAllSelections();
  }
}
