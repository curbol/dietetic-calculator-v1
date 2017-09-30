import { Injectable } from '@angular/core';

@Injectable()
export class EquationService {

  constructor() { }

  bodyMassIndex = (weight_kg: number) => (height_m: number) => weight_kg / (height_m * height_m);
}
