import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Unit } from './unit';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UnitService {

  units: {[type: number]: Unit.Unit[]} = {
    [Unit.Type.Id.weight]: [
      {
        name: 'Kilograms',
        type: Unit.Type.weight,
        symbol: Unit.Symbol.kg,
        system: Unit.System.metric,
        factor: 1000,
      },
      {
        name: 'Grams',
        type: Unit.Type.weight,
        symbol: Unit.Symbol.g,
        system: Unit.System.metric,
        factor: 1,
      },
      {
        name: 'Pounds',
        type: Unit.Type.weight,
        symbol: Unit.Symbol.lb,
        system: Unit.System.imperial,
        factor: 453.5929094356,
      },
      {
        name: 'Stone',
        type: Unit.Type.weight,
        symbol: Unit.Symbol.st,
        system: Unit.System.imperial,
        factor: 6350.4159522449,
      }
    ],
    [Unit.Type.Id.length]: [
      {
        name: 'Centimeters',
        type: Unit.Type.length,
        symbol: Unit.Symbol.cm,
        system: Unit.System.metric,
        factor: 0.01,
      },
      {
        name: 'Meters',
        type: Unit.Type.length,
        symbol: Unit.Symbol.m,
        system: Unit.System.metric,
        factor: 1,
      },
      {
        name: 'Inches',
        type: Unit.Type.length,
        symbol: Unit.Symbol.in,
        system: Unit.System.imperial,
        factor: 0.0254,
      },
      {
        name: 'Feet',
        type: Unit.Type.length,
        symbol: Unit.Symbol.ft,
        system: Unit.System.imperial,
        factor: 0.3048037064,
      },
      {
        name: 'Yards',
        type: Unit.Type.length,
        symbol: Unit.Symbol.yd,
        system: Unit.System.imperial,
        factor: 0.9144111192,
      },
    ],
    [Unit.Type.Id.time]: [
      {
        name: 'Seconds',
        type: Unit.Type.time,
        symbol: Unit.Symbol.s,
        system: null,
        factor: 1,
      },
      {
        name: 'Minutes',
        type: Unit.Type.time,
        symbol: Unit.Symbol.min,
        system: null,
        factor: 60,
      },
      {
        name: 'Hours',
        type: Unit.Type.time,
        symbol: Unit.Symbol.hr,
        system: null,
        factor: 3600,
      },
      {
        name: 'Days',
        type: Unit.Type.time,
        symbol: Unit.Symbol.d,
        system: null,
        factor: 86400,
      },
      {
        name: 'Months',
        type: Unit.Type.time,
        symbol: Unit.Symbol.mo,
        system: null,
        factor: 2630016,
      },
      {
        name: 'Years',
        type: Unit.Type.time,
        symbol: Unit.Symbol.y,
        system: null,
        factor: 31556952,
      },
    ],
  };

  constructor() {}

  getAllUnits = () => new Promise<{[type: number]: Unit.Unit[]}>((resolve, reject) => resolve(this.units));

  getUnitsOfType = (typeId: Unit.Type.Id) => new Promise<Unit.Unit[]>((resolve, reject) => resolve(this.units[typeId]));

  getUnitSet = (typeId: Unit.Type.Id) => (symbols: Unit.Symbol[]) =>
    this.getUnitsOfType(typeId).then(units => Unit.filterUnits(units)(symbols))

  getUnit = (symbol: Unit.Symbol): Promise<Unit.Unit> => {
    return this.getAllUnits().then((allUnits: {[type: number]: Unit.Unit[]}) => {
      const unit: Unit.Unit = Object.values<Unit.Unit[]>(allUnits).reduce((a, b) => [...a, ...b]).find(u => u.symbol === symbol);
      return unit;
    });
  }
}
