import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UnitService } from './unit.service';
import { Unit } from './unit';

@Injectable()
export class WeightUnitsResolver implements Resolve<Unit.IUnit[]> {
  constructor(private unitService: UnitService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Unit.IUnit[]>|Promise<Unit.IUnit[]>|Unit.IUnit[] {
    return this.unitService.getWeightUnits();
  }
}

@Injectable()
export class LengthUnitsResolver implements Resolve<Unit.IUnit[]> {
  constructor(private unitService: UnitService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Unit.IUnit[]>|Promise<Unit.IUnit[]>|Unit.IUnit[] {
    return this.unitService.getLengthUnits();
  }
}
