export module Num {
  export const round = (n: number, digits: number = 0): number => {
    if (n === null || n === undefined) { return null; }

    const negative: boolean = n < 0;
    let result: number = n;

    if (negative) { result *= -1; }

    const multiplier = Math.pow(10, digits);
    result = parseFloat((result * multiplier).toFixed(11));
    result = +(Math.round(result) / multiplier).toFixed(digits);

    if (negative) { result *= -1; }

    return result;
  };
}
