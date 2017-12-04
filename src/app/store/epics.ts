import { Injectable } from '@angular/core';
import { CalcEpics } from '@app/calculator/state/epics';
import { UnitEpics } from '@app/unit/state/epics';
import { ConverterEpics } from '@app/converter/state/epics';

@Injectable()
export class RootEpics {
  constructor(
    private calcEpics: CalcEpics,
    private unitEpics: UnitEpics,
    private convertEpics: ConverterEpics,
  ) {}

  public createEpics() {
    return [
      ...this.calcEpics.createCalcEpicsMiddleware(),
      ...this.unitEpics.createUnitEpicsMiddleware(),
      ...this.convertEpics.createConverterEpicsMiddleware(),
    ];
  }
}
