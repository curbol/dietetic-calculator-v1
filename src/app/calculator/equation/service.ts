import { Injectable } from '@angular/core';

@Injectable()
export class EquationService {

  static readonly BODY_MASS_INDEX = 'bmi';
  static readonly IDEAL_BODY_WEIGHT = 'ibw';
  static readonly ADJUSTED_BODY_WEIGHT = 'abw';
  static readonly MIFFLIN_ST_JEOR = 'mifflin';

  static readonly GENDER = 'gender';
  static readonly Weight = 'weight';
  static readonly Height = 'height';
  static readonly Age = 'age';

  constructor(
    private converter: ConversionService
  ) { }

  private equationFromData: {
    [key: string]: (inputs: {id: string, unit: string, value: number}[], selects: {id: string, value: string}[]) => number
  } = {
    [EquationService.BODY_MASS_INDEX]: (inputs, selects) => {
      const weight_kg = inputs.find(i => i.id === EquationService.Weight).map(data => this.converter.conversion(data.value, data.unit, 'kg'));
      const height_m = 0;
      return this.bodyMassIndex(weight_kg)(height_m);
    },
    [EquationService.IDEAL_BODY_WEIGHT]: (inputs, selects) => {
      const gender = '';
      const height_in = 0;
      return this.idealBodyWeight(gender)(height_in);
    },
    [EquationService.ADJUSTED_BODY_WEIGHT]: (inputs, selects) => {
      const gender = '';
      const weight_kg = 0;
      const height_in = 0;
      return this.adjustedBodyWeight(gender)(weight_kg)(height_in);
    },
    [EquationService.MIFFLIN_ST_JEOR]: (inputs, selects) => {
      const gender = '';
      const weight_kg = 0;
      const height_cm = 0;
      const age_y = 0;
      return this.mifflinStJeor(gender)(weight_kg)(height_cm)(age_y);
    },
  };

  getEquation = (id: string) => this.equationFromData[id];

  bodyMassIndex = (weight_kg: number) => (height_m: number) =>
    weight_kg / (height_m * height_m)

  idealBodyWeight = (gender: string) => (height_in: number) => {
    const deltaFiveFeet = height_in - 60;
    switch (gender.toLowerCase()) {
      case 'male':
        return 48 + 2.7 * deltaFiveFeet;
      case 'female':
        return 45.5 + 2.2 * deltaFiveFeet;
      default:
        return null;
    }
  }

  adjustedBodyWeight = (gender: string) => (weight_kg: number) => (height_in: number) => {
    const ibw = this.idealBodyWeight(gender)(height_in);
    return ibw ? 0.25 * (weight_kg - ibw) + ibw : null;
  }

  mifflinStJeor = (gender: string) => (weight_kg: number) => (height_cm: number) => (age_y: number) => {
    switch (gender.toLowerCase()) {
      case 'male':
        return 10 * weight_kg + 6.25 * height_cm - 5 * age_y + 5;
      case 'female':
        return 10 * weight_kg + 6.25 * height_cm - 5 * age_y - 161;
      default:
        return null;
    }
  }
}
