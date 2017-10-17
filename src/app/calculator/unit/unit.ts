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
    st, lb, kg, g,
    /* Length */
    in, ft, yd, cm, m,
    /* Time */
    s, min, hr, d, mo, y,
  }

  export interface Type {
    readonly id: Type.Id;
    readonly baseSymbol: Symbol;
  }

  export module Type {
    export enum Id {
      weight, length, time,
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
  }

  export enum System {
    metric, imperial, mixed
  }
}
