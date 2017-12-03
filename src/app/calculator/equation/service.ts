import { Injectable } from '@angular/core';
import { Unit, IUnit } from '@app/unit/models';

@Injectable()
export class Equations {

  static readonly BODY_MASS_INDEX = 'bmi';
  static readonly IDEAL_BODY_WEIGHT = 'ibw';
  static readonly ADJUSTED_BODY_WEIGHT = 'abw';
  static readonly MIFFLIN_ST_JEOR = 'mifflin';

  static readonly GENDER = 'gender';
  static readonly WEIGHT = 'weight';
  static readonly HEIGHT = 'height';
  static readonly AGE = 'age';

  constructor() { }

  private equationFromData: { [key: string]: (units: IUnit[]) =>
  (inputs: {id: string, unit: string, value: number}[]) => (selects: {id: string, value: string}[]) => number } = {
    [Equations.BODY_MASS_INDEX]: (units) => (inputs) => (selects) => {
      const targetUnits: {[key: string]: string} = {[Equations.WEIGHT]: 'kg', [Equations.HEIGHT]: 'm'};
      const converted = this.getConvertedInputs(units)(inputs)(targetUnits);
      return this.bodyMassIndex(converted[Equations.WEIGHT])(converted[Equations.HEIGHT]);
    },
    [Equations.IDEAL_BODY_WEIGHT]: (units) => (inputs) => (selects) => {
      const targetUnits: {[key: string]: string} = {[Equations.HEIGHT]: 'in'};
      const converted = this.getConvertedInputs(units)(inputs)(targetUnits);
      const indexedSelects = this.getIndexedSelects(selects);
      return this.idealBodyWeight(indexedSelects[Equations.GENDER])(converted[Equations.HEIGHT]);
    },
    [Equations.ADJUSTED_BODY_WEIGHT]: (units) => (inputs) => (selects) => {
      const targetUnits: {[key: string]: string} = {[Equations.WEIGHT]: 'kg', [Equations.HEIGHT]: 'in'};
      const converted = this.getConvertedInputs(units)(inputs)(targetUnits);
      const indexedSelects = this.getIndexedSelects(selects);
      return this.adjustedBodyWeight(indexedSelects[Equations.GENDER])(converted[Equations.WEIGHT])(converted[Equations.HEIGHT]);
    },
    [Equations.MIFFLIN_ST_JEOR]: (units) => (inputs) => (selects) => {
      const targetUnits: {[key: string]: string} = {[Equations.WEIGHT]: 'kg', [Equations.HEIGHT]: 'cm', [Equations.AGE]: 'y'};
      const converted = this.getConvertedInputs(units)(inputs)(targetUnits);
      const indexedSelects = this.getIndexedSelects(selects);
      return this.mifflinStJeor
        (indexedSelects[Equations.GENDER])(converted[Equations.WEIGHT])(converted[Equations.HEIGHT])(converted[Equations.AGE]);
    },
  };

  private getIndexedSelects = (selects: {id: string, value: string}[]): {[key: string]: string} =>
    (selects || []).reduce((acc, cur) => ({...acc, [cur.id]: cur.value}), {})

  private getConvertedInputs = (units: IUnit[]) =>
  (inputs: {id: string, unit: string, value: number}[]) => (targetUnits: {[key: string]: string}): {[key: string]: number} =>
    inputs.map(i => ({id: i.id, value: Unit.convertSymbols(units)(i.value)(i.unit)(targetUnits[i.id])}))
    .reduce((acc, cur) => ({...acc, [cur.id]: cur.value}), {})

  public getEquation = (id: string) => this.equationFromData[id];

  public bodyMassIndex = (weight_kg: number) => (height_m: number) => {
    if (!(weight_kg || weight_kg === 0) || !(height_m || height_m === 0)) { return null; }

    return weight_kg / (height_m * height_m);
  }

  public idealBodyWeight = (gender: string) => (height_in: number) => {
    if (!gender || !(height_in || height_in === 0)) { return null; }

    const deltaFiveFeet = height_in - 60;
    switch (gender.toLowerCase()) {
      case 'male': return 48 + 2.7 * deltaFiveFeet;
      case 'female': return 45.5 + 2.2 * deltaFiveFeet;
      default: return null;
    }
  }

  public adjustedBodyWeight = (gender: string) => (weight_kg: number) => (height_in: number) => {
    if (!gender || !(height_in || height_in === 0)) { return null; }

    const ibw = this.idealBodyWeight(gender)(height_in);
    return ibw ? 0.25 * (weight_kg - ibw) + ibw : null;
  }

  public mifflinStJeor = (gender: string) => (weight_kg: number) => (height_cm: number) => (age_y: number) => {
    if (!gender || !(weight_kg || weight_kg === 0) || !(height_cm || height_cm === 0) || !(age_y || age_y === 0)) { return null; }

    switch (gender.toLowerCase()) {
      case 'male': return 10 * weight_kg + 6.25 * height_cm - 5 * age_y + 5;
      case 'female': return 10 * weight_kg + 6.25 * height_cm - 5 * age_y - 161;
      default: return null;
    }
  }
}
