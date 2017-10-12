import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Unit } from './unit';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UnitService {
  private units: Unit.Unit[] = [
    {
      name: 'kilograms',
      symbol: Unit.Symbol.kg,
      type: Unit.Type.weight,
      baseSymbol: Unit.Symbol.g,
      system: Unit.System.metric,
      convertToBase: (value: number) => value / 0.001,
      convertFromBase: (value: number) => value * 0.001,
    },
    {
      name: 'grams',
      symbol: Unit.Symbol.g,
      type: Unit.Type.weight,
      baseSymbol: Unit.Symbol.g,
      system: Unit.System.metric,
      convertToBase: (value: number) => value,
      convertFromBase: (value: number) => value,
    },
    {
      name: 'pounds',
      symbol: Unit.Symbol.lb,
      type: Unit.Type.weight,
      baseSymbol: Unit.Symbol.g,
      system: Unit.System.imperial,
      convertToBase: (value: number) => value / 0.0022046,
      convertFromBase: (value: number) => value * 0.0022046,
    },
    {
      name: 'stone',
      symbol: Unit.Symbol.st,
      type: Unit.Type.weight,
      baseSymbol: Unit.Symbol.g,
      system: Unit.System.imperial,
      convertToBase: (value: number) => value / 0.00015747,
      convertFromBase: (value: number) => value * 0.00015747,
    },
    {
      name: 'centimeters',
      symbol: Unit.Symbol.cm,
      type: Unit.Type.length,
      baseSymbol: Unit.Symbol.m,
      system: Unit.System.metric,
      convertToBase: (value: number) => value / 100,
      convertFromBase: (value: number) => value * 100,
    },
    {
      name: 'meters',
      symbol: Unit.Symbol.m,
      type: Unit.Type.length,
      baseSymbol: Unit.Symbol.m,
      system: Unit.System.metric,
      convertToBase: (value: number) => value,
      convertFromBase: (value: number) => value,
    },
    {
      name: 'inches',
      symbol: Unit.Symbol.in,
      type: Unit.Type.length,
      baseSymbol: Unit.Symbol.m,
      system: Unit.System.imperial,
      convertToBase: (value: number) => value / 39.37,
      convertFromBase: (value: number) => value * 39.37,
    },
    {
      name: 'feet',
      symbol: Unit.Symbol.ft,
      type: Unit.Type.length,
      baseSymbol: Unit.Symbol.m,
      system: Unit.System.imperial,
      convertToBase: (value: number) => value / 3.2808,
      convertFromBase: (value: number) => value * 3.2808,
    },
  ];

  constructor() { }

  getUnits(): Promise<Unit.Unit[]> {
    return new Promise<Unit.Unit[]>((resolve, reject) => {
      resolve(this.units);
    });
  }

  getGroupedUnits(): Promise<Unit.Unit[]> {

  }

  getUnitsOfType(type: Unit.Type): Promise<Unit.Unit[]> {
    return new Promise<Unit.Unit[]>((resolve, reject) => {
      return this.getUnits().then((units: Unit.Unit[]) => units.filter(u => u.type === type));
    });
  }

  defaultUnit = (group: Unit.Unit[]) => (system: Unit.System) => {
    return group.find(u => u.system === system);
  }

  conversion = (sourceUnit: Unit.Unit) => (targetUnit: Unit.Unit) => (sourceValue: number) => {
    if (!sourceUnit || !targetUnit) {
      throw Error(`Source or target unit does not exist.
        Source: {${Unit.Symbol[sourceUnit.baseSymbol]}: ${sourceUnit}},
        Target: {${Unit.Symbol[targetUnit.baseSymbol]}: ${targetUnit}}`);
    }
    if (sourceUnit.baseSymbol !== targetUnit.baseSymbol) {
      throw Error(`Units must have the same base unit.
        Source: {${Unit.Symbol[sourceUnit.baseSymbol]}: ${sourceUnit}},
        Target: {${Unit.Symbol[targetUnit.baseSymbol]}: ${targetUnit}}`);
    }

    const baseValue: number = sourceUnit.convertToBase(sourceValue);
    const targetValue: number = targetUnit.convertFromBase(baseValue);
    return targetValue;
  }
}
