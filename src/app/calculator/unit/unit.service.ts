import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Unit } from './unit';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UnitService {

  units: {[type: number]: Unit.Unit[]} = {
    [Unit.Type.weight]: <Unit.Weight[]>[
      {
        name: 'Kilograms',
        symbol: Unit.Symbol.kg,
        system: Unit.System.metric,
        factor: 1000,
      },
      {
        name: 'Grams',
        symbol: Unit.Symbol.g,
        system: Unit.System.metric,
        factor: 1,
      },
      {
        name: 'Pounds',
        symbol: Unit.Symbol.lb,
        system: Unit.System.imperial,
        factor: 453.5929094356,
      },
      {
        name: 'Stone',
        symbol: Unit.Symbol.st,
        system: Unit.System.imperial,
        factor: 6350.4159522449,
      }
    ],
    [Unit.Type.length]: <Unit.Length[]>[
      {
        name: 'Centimeters',
        symbol: Unit.Symbol.cm,
        system: Unit.System.metric,
        factor: 0.01,
      },
      {
        name: 'Meters',
        symbol: Unit.Symbol.m,
        system: Unit.System.metric,
        factor: 1,
      },
      {
        name: 'Inches',
        symbol: Unit.Symbol.in,
        system: Unit.System.imperial,
        factor: 0.0254,
      },
      {
        name: 'Feet',
        symbol: Unit.Symbol.ft,
        system: Unit.System.imperial,
        factor: 0.3048037064,
      },
      {
        name: 'Yards',
        symbol: Unit.Symbol.yd,
        system: Unit.System.imperial,
        factor: 0.9144111192,
      },
    ],
    [Unit.Type.time]: <Unit.Time[]>[
      {
        name: 'Seconds',
        symbol: Unit.Symbol.s,
        system: null,
        factor: 1,
      },
      {
        name: 'Minutes',
        symbol: Unit.Symbol.min,
        system: null,
        factor: 60,
      },
      {
        name: 'Hours',
        symbol: Unit.Symbol.hr,
        system: null,
        factor: 3600,
      },
      {
        name: 'Days',
        symbol: Unit.Symbol.d,
        system: null,
        factor: 86400,
      },
      {
        name: 'Months',
        symbol: Unit.Symbol.mo,
        system: null,
        factor: 2630016,
      },
      {
        name: 'Years',
        symbol: Unit.Symbol.y,
        system: null,
        factor: 31556952,
      },
    ],
  };

  constructor() {}

  getAllUnits = () => new Promise<{[type: number]: Unit.Unit[]}>((resolve, reject) => resolve(this.units));

  getUnitsOfType = (type: Unit.Type) => new Promise<Unit.Unit[]>((resolve, reject) => resolve(this.units[type]));

  getUnitGroup = (type: Unit.Type) => (symbols: Unit.Symbol[]) => this.getUnitsOfType(type).then(units => this.filterUnits(units)(symbols));

  filterUnits = (units: Unit.Unit[]) => (symbols: Unit.Symbol[]) => symbols.map(s => units.find(u => u.symbol === s));

  defaultUnit = (group: Unit.Unit[]) => (system: Unit.System) => group.find(u => u.system === system);

  conversion = (sourceFactor: number) => (targetFactor: number) => (sourceValue: number) => sourceValue * sourceFactor / targetFactor;
}
