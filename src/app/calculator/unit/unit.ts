export module Unit {
  export interface Unit {
    readonly name: string;
    readonly type: Type;
    readonly symbol: Symbol;
    readonly baseSymbol: Symbol;
    readonly system: System;
    readonly factor: number;
  }

  export interface Weight extends Unit {
    readonly type: Type.weight;
    readonly baseSymbol: Symbol.g;
  }

  export interface Length extends Unit {
    readonly type: Type.length;
    readonly baseSymbol: Symbol.m;
  }

  export interface Time extends Unit {
    readonly type: Type.time;
    readonly baseSymbol: Symbol.s;
  }

  export enum Type {
    weight, length, time,
  }

  export enum Symbol {
    /* Weight */
    st, lb, kg, g,
    /* Length */
    in, ft, yd, cm, m,
    /* Time */
    s, min, hr, d, mo, y,
  }

  export enum System {
    metric, imperial
  }
}
