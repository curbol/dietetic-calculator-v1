export module Unit {
  export interface Unit {
    readonly symbol: Weight.Symbol|Length.Symbol|Time.Symbol;
    readonly baseSymbol: Weight.Symbol|Length.Symbol|Time.Symbol;
    readonly system: System;
    convertToBase(value: number): number;
    convertFromBase(value: number): number;
  }

  export interface Weight extends Unit {
    readonly symbol: Weight.Symbol;
    readonly baseSymbol: Weight.Symbol.g;
  }

  export const enum System {
    metric = 'Metric', imperial = 'Imperial'
  }

  export module Weight {
    export enum Symbol {
      st = 'Stone', lb = 'Pounds', kg = 'Kilograms', g = 'Grams',
    }
  }

  export module Length {
    export enum Symbol {
      in = 'Inches', ft = 'Feet', yd = 'Yards', cm = 'Centimeters', m = 'Meters',
    }
  }

  export module Time {
    export enum Symbol {
      s = 'Seconds', min = 'Minutes', hr = 'Hours', d = 'Days', mo = 'Months', y = 'Years',
    }
  }
}
