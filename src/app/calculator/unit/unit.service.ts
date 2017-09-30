import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Unit } from './unit';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UnitService {
  constructor() { }

  weightUnits: Unit.IUnit[] = [
    {
      name: 'kilograms',
      symbol: Unit.Symbol.kg,
      baseSymbol: Unit.Symbol.g,
      system: Unit.System.metric,
      convertToBase: (value: number) => value / 0.001,
      convertFromBase: (value: number) => value * 0.001,
    },
    {
      name: 'grams',
      symbol: Unit.Symbol.g,
      baseSymbol: Unit.Symbol.g,
      system: Unit.System.metric,
      convertToBase: (value: number) => value,
      convertFromBase: (value: number) => value,
    },
    {
      name: 'pounds',
      symbol: Unit.Symbol.lb,
      baseSymbol: Unit.Symbol.g,
      system: Unit.System.imperial,
      convertToBase: (value: number) => value / 0.0022046,
      convertFromBase: (value: number) => value * 0.0022046,
    },
    {
      name: 'stone',
      symbol: Unit.Symbol.st,
      baseSymbol: Unit.Symbol.g,
      system: Unit.System.imperial,
      convertToBase: (value: number) => value / 0.00015747,
      convertFromBase: (value: number) => value * 0.00015747,
    },
  ];
  
  lengthUnits: Unit.IUnit[] = [
    {
      name: 'centimeters',
      symbol: Unit.Symbol.cm,
      baseSymbol: Unit.Symbol.m,
      system: Unit.System.metric,
      convertToBase: (value: number) => value / 100,
      convertFromBase: (value: number) => value * 100,
    },
    {
      name: 'meters',
      symbol: Unit.Symbol.m,
      baseSymbol: Unit.Symbol.m,
      system: Unit.System.metric,
      convertToBase: (value: number) => value,
      convertFromBase: (value: number) => value,
    },
    {
      name: 'inches',
      symbol: Unit.Symbol.in,
      baseSymbol: Unit.Symbol.m,
      system: Unit.System.imperial,
      convertToBase: (value: number) => value / 39.37,
      convertFromBase: (value: number) => value * 39.37,
    },
    {
      name: 'feet',
      symbol: Unit.Symbol.ft,
      baseSymbol: Unit.Symbol.m,
      system: Unit.System.imperial,
      convertToBase: (value: number) => value / 3.2808,
      convertFromBase: (value: number) => value * 3.2808,
    },
  ];

  getWeightUnits(): Promise<Unit.IUnit[]> {
    return new Promise<Unit.IUnit[]>((resolve, reject) => {
      resolve(this.weightUnits);
    });
  }

  getLengthUnits(): Promise<Unit.IUnit[]> {
    return new Promise<Unit.IUnit[]>((resolve, reject) => {
      resolve(this.lengthUnits);
    });
  }

  defaultUnit = (group: Unit.IUnit[]) => (system: Unit.System) => {
    return group.find(u => u.system === system);
  }

  selectionConversion = (selection: Unit.IUnitSelection) => (targetSymbol: Unit.Symbol) => {
    const targetUnit = selection.group.find(u => u.symbol === targetSymbol);
    return this.conversion(selection.unit)(targetUnit)(selection.value);
  }

  conversion = (sourceUnit: Unit.IUnit) => (targetUnit: Unit.IUnit) => (sourceValue: number) => {
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
