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

  idealBodyWeight = (gender: string) => (height_in: number) => {
    const deltaFiveFeet = height_in - 60;
    if (gender === 'male') {
      return 48 + 2.7 * deltaFiveFeet;
    } else if (gender === 'female') {
      return 45.5 + 2.2 * deltaFiveFeet;
    }

    return null;
  }

  adjustedBodyWeight = (gender: string) => (weight_kg: number) => (height_in: number) => {
    const ibw = this.idealBodyWeight(gender)(height_in);
    if (ibw) {
      return 0.25 * (weight_kg - ibw) + ibw;
    }

    return null;
  }
}
