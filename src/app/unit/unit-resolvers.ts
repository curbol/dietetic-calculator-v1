import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UnitService } from './unit.service';
import { Unit } from './unit';

@Injectable()
export class AllUnitsResolver implements Resolve<{[type: number]: Unit.Unit[]}> {
  constructor(private unitService: UnitService) {}

  resolve(route: ActivatedRouteSnapshot):
  Observable<{[type: number]: Unit.Unit[]}>|Promise<{[type: number]: Unit.Unit[]}>|{[type: number]: Unit.Unit[]} {
    return this.unitService.getAllUnits();
  }
}

@Injectable()
export class WeightUnitsResolver implements Resolve<Unit.Unit[]> {
  constructor(private unitService: UnitService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Unit.Unit[]>|Promise<Unit.Unit[]>|Unit.Unit[] {
    return this.unitService.getUnitsOfType(Unit.Type.weight);
  }
}

@Injectable()
export class LengthUnitsResolver implements Resolve<Unit.Unit[]> {
  constructor(private unitService: UnitService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Unit.Unit[]>|Promise<Unit.Unit[]>|Unit.Unit[] {
    return this.unitService.getUnitsOfType(Unit.Type.length);
  }
}

@Injectable()
export class TimeUnitsResolver implements Resolve<Unit.Unit[]> {
  constructor(private unitService: UnitService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Unit.Unit[]>|Promise<Unit.Unit[]>|Unit.Unit[] {
    return this.unitService.getUnitsOfType(Unit.Type.time);
  }
}
