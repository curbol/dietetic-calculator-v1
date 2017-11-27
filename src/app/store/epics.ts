import { Injectable } from '@angular/core';
import { CalcEpics } from '@app/calculator/state/epics';

@Injectable()
export class RootEpics {
  constructor(private calcEpics: CalcEpics) {}

  public createEpics() {
    return [
      this.calcEpics.createLoadCalcsEpicMiddleware(),
      this.calcEpics.createLoadInputsEpicMiddleware(),
      this.calcEpics.createLoadSelectsEpicMiddleware(),
      this.calcEpics.createSetActiveInputsEpicMiddleware(),
    ];
  }
}
