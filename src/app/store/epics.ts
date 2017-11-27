import { Injectable } from '@angular/core';
import { CalcEpics } from '@app/calculator/state/epics';
import { UnitEpics } from '@app/unit/state/epics';

@Injectable()
export class RootEpics {
  constructor(
    private calcEpics: CalcEpics,
    private unitEpics: UnitEpics,
  ) {}

  public createEpics() {
    return [
      ...this.calcEpics.createCalcEpicsMiddleware(),
      ...this.unitEpics.createUnitEpicsMiddleware(),
    ];
  }
}
