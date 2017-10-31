import { Injectable } from '@angular/core';
import { UnitService } from '../../unit/unit.service';
import { EquationService } from '../../equation/equation.service';
import { Unit } from '../../unit/unit';
import { Calc } from '../calc';
import { Option } from '../option';

@Injectable()
export class CalculatorService {
  private calcs: Calc.Calc[] = [
    {
      id: Calc.Id.bmi,
      title: 'Body Mass Index (BMI)',
      subTitle: 'A measure of body fat in adults',
      group: Calc.Group.anthropometric,
      active: false,
      inputIds: [Calc.Input.Id.height, Calc.Input.Id.weight],
      selectionIds: [],
      output: <Calc.Output>{
        unitText: 'kg/m²',
        result: (inputs: Calc.Input[]) => (selections: Calc.Selection[]): number => {
          // pass in (inputId, targetSymbol) pairs, return conversions
          const data = this.getInputsFromIds([Calc.Input.Id.height, Calc.Input.Id.weight])(inputs);

          const weight: Calc.Input = data[Calc.Input.Id[Calc.Input.Id.weight]];
          const height: Calc.Input = data[Calc.Input.Id[Calc.Input.Id.height]];
          if ([weight, height].find(i => !Calc.inputReadyToCalculate(i))) { return null; }

          const weight_kg: number = Calc.inputConversion(weight)(Unit.Symbol.kg);
          const height_m: number = Calc.inputConversion(height)(Unit.Symbol.m);
          return this.equationService.bodyMassIndex(weight_kg)(height_m);
        }
      }
    },
    {
      id: Calc.Id.mifflin,
      title: 'Mifflin St. Jeor',
      subTitle: 'Daily calorie needs for adults',
      group: Calc.Group.nutritional_needs,
      active: false,
      inputIds: [Calc.Input.Id.height, Calc.Input.Id.weight, Calc.Input.Id.age],
      selectionIds: [Calc.Selection.Id.gender],
      output: <Calc.Output>{
        unitText: 'kcal',
        result: (inputs: Calc.Input[]) => (selections: Calc.Selection[]): number => {
          const gender: Calc.Selection = selections.find(selection => selection.id === Calc.Selection.Id.gender);
          const weight: Calc.Input = inputs.find(input => input.id === Calc.Input.Id.weight);
          const height: Calc.Input = inputs.find(input => input.id === Calc.Input.Id.height);
          const age: Calc.Input = inputs.find(input => input.id === Calc.Input.Id.age);
          if ([weight, height, age].find(i => !Calc.inputReadyToCalculate(i)) ||
              [gender].find(s => !Calc.selectionReadyToCalculate(s))) { return null; }

          const genderText: string = Option.Id[gender.value.id];
          const weight_kg: number = Calc.inputConversion(weight)(Unit.Symbol.kg);
          const height_cm: number = Calc.inputConversion(height)(Unit.Symbol.cm);
          const age_y: number = Calc.inputConversion(age)(Unit.Symbol.y);
          return this.equationService.mifflinStJeor(genderText)(weight_kg)(height_cm)(age_y);
        }
      }
    },
    {
      id: Calc.Id.ibw,
      title: 'Ideal Body Weight (IBW)',
      subTitle: 'Estimated ideal weight for adults',
      group: Calc.Group.anthropometric,
      active: false,
      inputIds: [Calc.Input.Id.height],
      selectionIds: [Calc.Selection.Id.gender],
      output: <Calc.Output>{
        unitText: Unit.Symbol[Unit.Symbol.kg],
        result: (inputs: Calc.Input[]) => (selections: Calc.Selection[]): number => {
          const gender: Calc.Selection = selections.find(selection => selection.id === Calc.Selection.Id.gender);
          const height: Calc.Input = inputs.find(input => input.id === Calc.Input.Id.height);
          if ([height].find(i => !Calc.inputReadyToCalculate(i)) ||
              [gender].find(s => !Calc.selectionReadyToCalculate(s))) { return null; }

          const genderText: string = Option.Id[gender.value.id];
          const height_in: number = Calc.inputConversion(height)(Unit.Symbol.in);
          return this.equationService.idealBodyWeight(genderText)(height_in);
        }
      }
    },
    {
      id: Calc.Id.abw,
      title: 'Adjusted Body Weight (ABW)',
      subTitle: 'Adjusted ideal weight for the obese',
      group: Calc.Group.anthropometric,
      active: false,
      inputIds: [Calc.Input.Id.height, Calc.Input.Id.weight],
      selectionIds: [Calc.Selection.Id.gender],
      output: <Calc.Output>{
        unitText: Unit.Symbol[Unit.Symbol.kg],
        result: (inputs: Calc.Input[]) => (selections: Calc.Selection[]): number => {
          const gender: Calc.Selection = selections.find(selection => selection.id === Calc.Selection.Id.gender);
          const weight: Calc.Input = inputs.find(input => input.id === Calc.Input.Id.weight);
          const height: Calc.Input = inputs.find(input => input.id === Calc.Input.Id.height);
          if ([weight, height].find(i => !Calc.inputReadyToCalculate(i)) ||
              [gender].find(s => !Calc.selectionReadyToCalculate(s))) { return null; }

          const genderText: string = Option.Id[gender.value.id];
          const weight_kg: number = Calc.inputConversion(weight)(Unit.Symbol.kg);
          const height_in: number = Calc.inputConversion(height)(Unit.Symbol.in);
          return this.equationService.adjustedBodyWeight(genderText)(weight_kg)(height_in);
        }
      }
    },
  ];

  private Selections = <Calc.Selection[]>[
    {
      id: Calc.Selection.Id.gender,
      name: 'Gender',
      group: <Option.Option[]>[
        {
          id: Option.Id.male,
          name: 'Male',
        },
        {
          id: Option.Id.female,
          name: 'Female',
        }
      ],
      value: null,
      active: false,
    }
  ];

  private inputSettings = <Calc.Input.Settings[]>[
    {
      name: 'Weight',
      id: Calc.Input.Id.weight,
      typeId: Unit.Type.weight.id,
      symbolsFilter: null,
      defaultSymbol: Unit.Symbol.kg,
    },
    {
      name: 'Height',
      id: Calc.Input.Id.height,
      typeId: Unit.Type.length.id,
      symbolsFilter: null,
      defaultSymbol: Unit.Symbol.cm,
    },
    {
      name: 'Age',
      id: Calc.Input.Id.age,
      typeId: Unit.Type.time.id,
      symbolsFilter: [Unit.Symbol.y],
      defaultSymbol: Unit.Symbol.y,
    },
  ];

  constructor(private unitService: UnitService, private equationService: EquationService) { }

  getCalculators = () => new Promise<Calc.Calc[]>((resolve, reject) => resolve(this.calcs));
  getAllSelections = (): Promise<Calc.Selection[]> => new Promise<Calc.Selection[]>((resolve, reject) => resolve(this.Selections));

  getAllInputs = (): Promise<Calc.Input[]> => {
    return Promise.all([this.getInputSettings(), this.unitService.getAllUnits()]).then(value => {
      const inputSettings: Calc.Input.Settings[] = value[0];
      const units: {[type: number]: Unit.Unit[]} = value[1];

      return inputSettings.map<Calc.Input>(p => {
        const group = Unit.filterUnits(units[p.typeId])(p.symbolsFilter);
        const unit = group.find(u => u.symbol === p.defaultSymbol);
        return <Calc.Input>{
          name: p.name,
          id: p.id,
          group: group,
          unit: unit,
          active: false,
          value: null,
        };
      });
    });
  }

  getInputs = (inputIds: Calc.Input.Id[]) =>
    this.getAllInputs().then((inputs: Calc.Input[]) => inputs.filter(input => inputIds.find(id => id === input.id)))

  private getSelections =
  (selectionIds: Calc.Selection.Id[]) => (selections: Calc.Selection[]) => {
    const result: {[key: string]: Calc.Selection} = {};
    selectionIds.forEach(id => result[Calc.Selection.Id[id]] = selections.find(s => s.id === id));
    return result;
  }

  private getInputsFromIds =
  (inputIds: Calc.Input.Id[]) => (inputs: Calc.Input[]) => {
    const result: {[key: string]: Calc.Input} = {};
    inputIds.forEach(id => result[Calc.Input.Id[id]] = inputs.find(s => s.id === id));
    return result;
  }

  private getInputSettings = () => new Promise<Calc.Input.Settings[]>((resolve, reject) => resolve(this.inputSettings));
}
