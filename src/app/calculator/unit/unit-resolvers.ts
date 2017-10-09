import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UnitService } from './unit.service';
import { Unit } from './unit';

/* Weight */
@Injectable()
export class WeightUnitsResolver implements Resolve<Unit.IUnit[]> {
  constructor(private unitService: UnitService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Unit.IUnit[]>|Promise<Unit.IUnit[]>|Unit.IUnit[] {
    return this.unitService.getUnits(Unit.Type.weight);
  }
}


@Injectable()
export class WeightSelectionResolver implements Resolve<Unit.ISelection> {
  constructor(private unitService: UnitService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Unit.ISelection>|Promise<Unit.ISelection>|Unit.ISelection {
    return this.unitService.getSelection(Unit.Type.weight);
  }
}

/* Length */
@Injectable()
export class LengthUnitsResolver implements Resolve<Unit.IUnit[]> {
  constructor(private unitService: UnitService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Unit.IUnit[]>|Promise<Unit.IUnit[]>|Unit.IUnit[] {
    return this.unitService.getUnits(Unit.Type.length);
  }
}

@Injectable()
export class LengthSelectionResolver implements Resolve<Unit.ISelection> {
  constructor(private unitService: UnitService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Unit.ISelection>|Promise<Unit.ISelection>|Unit.ISelection {
    return this.unitService.getSelection(Unit.Type.length);
  }
}
