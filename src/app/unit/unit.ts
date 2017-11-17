export module Unit {
  export interface Unit {
    readonly name: string;
    readonly type: Type;
    readonly symbol: Symbol;
    readonly system: System;
    readonly factor: number;
  }

  export enum Symbol {
    /* Weight */
    st = 1, lb, kg, g,
    /* Length */
    in, ft, yd, cm, m,
    /* Time */
    s, min, hr, d, mo, y,
    /* Energy */
    kcal,
  }

  export interface Type {
    readonly id: Type.Id;
    readonly baseSymbol: Symbol;
  }

  export module Type {
    export enum Id {
      weight = 1, length, time, energy
    }

    export const weight: Type = {
      id: Id.weight,
      baseSymbol: Symbol.g,
    };

    export const length: Type = {
      id: Id.length,
      baseSymbol: Symbol.m,
    };

    export const time: Type = {
      id: Id.time,
      baseSymbol: Symbol.s,
    };

    export const energy: Type = {
      id: Id.energy,
      baseSymbol: Symbol.kcal,
    };
  }

  export enum System {
    metric = 1, imperial, mixed
  }

  export const filterUnits = (units: Unit.Unit[]) => (symbols: Unit.Symbol[]) =>
    (!symbols || !symbols.length) ? units : symbols.map(s => units.find(u => u.symbol === s));

  export const defaultUnit = (group: Unit.Unit[]) => (system: Unit.System) => group.find(u => u.system === system);

  export const conversion = (sourceFactor: number) => (targetFactor: number) => (sourceValue: number): number => {
    if (sourceFactor === null || sourceFactor === undefined
      || targetFactor === null || targetFactor === undefined
      || sourceValue === null || sourceValue === undefined) { return null; }
    if (targetFactor === 0) { return undefined; }

    return sourceValue * sourceFactor / targetFactor;
  };

  export const commonSystem = (units: Unit.Unit[]): Unit.System => {
    if (!units || units.length <= 0) {
      return null;
    }

    const systems = units.filter(unit => unit && unit.system != null).map(unit => unit.system);
    const distinctSystems = systems.filter((v, i, a) => a.indexOf(v) === i);
    const allSame: boolean = distinctSystems.length === 1;

    return allSame ? distinctSystems[0] : Unit.System.mixed;
  };
}
