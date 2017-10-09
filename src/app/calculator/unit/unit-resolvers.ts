import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UnitService } from './unit.service';
import { Unit } from './unit';

@Injectable()
export class WeightUnitsResolver implements Resolve<Unit.IUnit[]> {
  constructor(private unitService: UnitService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Unit.IUnit[]>|Promise<Unit.IUnit[]>|Unit.IUnit[] {
    return this.unitService.getUnits(Unit.Type.weight);
  }
}

@Injectable()
export class LengthUnitsResolver implements Resolve<Unit.IUnit[]> {
  constructor(private unitService: UnitService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Unit.IUnit[]>|Promise<Unit.IUnit[]>|Unit.IUnit[] {
    return this.unitService.getUnits(Unit.Type.length);
  }
}
