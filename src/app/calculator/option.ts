export module Option {
  export enum Id {
    male, female // gender
  }

  export interface Option {
    id: Id;
    name: string;
  }
}
