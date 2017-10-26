export module Enum {
  export const getNamesAndValues = <T extends number>(e: any) => getNames(e).map(n => ({ name: n, value: e[n] as T }));

  export const getNames = (e: any) => getObjValues(e).filter(v => typeof v === 'string') as string[];

  export const getValues = <T extends number>(e: any) => getObjValues(e).filter(v => typeof v === 'number') as T[];

  export const getObjValues = (e: any): (number | string)[] => Object.keys(e).map(k => e[k]);
}
