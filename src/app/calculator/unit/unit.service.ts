import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Unit } from './unit';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UnitService {
  constructor() { }

  units: Unit.IUnit[] = [
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
      type: Unit.Type.distance,
      baseSymbol: Unit.Symbol.m,
      system: Unit.System.metric,
      convertToBase: (value: number) => value / 100,
      convertFromBase: (value: number) => value * 100,
    },
    {
      name: 'meters',
      symbol: Unit.Symbol.m,
      type: Unit.Type.distance,
      baseSymbol: Unit.Symbol.m,
      system: Unit.System.metric,
      convertToBase: (value: number) => value,
      convertFromBase: (value: number) => value,
    },
    {
      name: 'inches',
      symbol: Unit.Symbol.in,
      type: Unit.Type.distance,
      baseSymbol: Unit.Symbol.m,
      system: Unit.System.imperial,
      convertToBase: (value: number) => value / 39.37,
      convertFromBase: (value: number) => value * 39.37,
    },
    {
      name: 'feet',
      symbol: Unit.Symbol.ft,
      type: Unit.Type.distance,
      baseSymbol: Unit.Symbol.m,
      system: Unit.System.imperial,
      convertToBase: (value: number) => value / 3.2808,
      convertFromBase: (value: number) => value * 3.2808,
    },
  ];

  getUnits(type: Unit.Type): Promise<Unit.IUnit[]> {
    return new Promise<Unit.IUnit[]>((resolve, reject) => {
      resolve(this.units.filter(u => u.type === type));
    });
  }

  getSelection = (type: Unit.Type) => {
    return this.getUnits(type).then<Unit.ISelection>((units: Unit.IUnit[]) => {
      const selection = { group: units, unit: null, value: null };
      return selection;
    });
  }

  getSelections = (types: Map<string, Unit.Type>) => {
    const selectionsPromises: Promise<{key: string, value: Unit.ISelection}>[] = [];
    types.forEach((value: Unit.Type, key: string) => {
      const selectionPromise: Promise<{key: string, value: Unit.ISelection}> = this.getSelection(value)
        .then<{key: string, value: Unit.ISelection}>((selection: Unit.ISelection) => {
          return { key: key, value: selection };
        });

      selectionsPromises.push(selectionPromise);
    });

    return Promise.all<{key: string, value: Unit.ISelection}>(selectionsPromises)
      .then<Map<string, Unit.ISelection>>((selectionsArray: {key: string, value: Unit.ISelection}[]) => {
        const selections: Map<string, Unit.ISelection> = new Map<string, Unit.ISelection>();
        selectionsArray.forEach(s => selections[s.key] = s.value);
        return selections;
      });
  }

  defaultUnit = (group: Unit.IUnit[]) => (system: Unit.System) => {
    return group.find(u => u.system === system);
  }

  selectionConversion = (selection: Unit.ISelection) => (targetSymbol: Unit.Symbol) => {
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
