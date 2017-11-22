import { Injectable } from '@angular/core';
import { CalcAPIEpics } from '@app/calculator/api/epics';

@Injectable()
export class RootEpics {
  constructor(private calcEpics: CalcAPIEpics) {}

  public createEpics() {
    return [
      this.calcEpics.createLoadCalcsEpicMiddleware(),
    ];
  }
}
