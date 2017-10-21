import { Injectable } from '@angular/core';

@Injectable()
export class EquationService {

  constructor() { }

  bodyMassIndex = (weight_kg: number) => (height_m: number) =>
    weight_kg / (height_m * height_m)

  mifflinStJeor = (gender: string) => (weight_kg: number) => (height_cm: number) => (age_y: number) => {
    if (gender === 'male') {
      return 10 * weight_kg + 6.25 * height_cm - 5 * age_y + 5;
    } else if (gender === 'female') {
      return 10 * weight_kg + 6.25 * height_cm - 5 * age_y - 161;
    }

    return null;
  }
}
