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
      active: false,
      inputIds: [Calc.Input.Id.height, Calc.Input.Id.weight],
      selectionIds: [],
      output: <Calc.Output>{
        unitText: 'kg/m²',
        result: (inputs: Calc.Input[]) => (selections: Calc.Selection[]): number => {
          const weight: Calc.Input = inputs.find(input => input.id === Calc.Input.Id.weight);
          const height: Calc.Input = inputs.find(input => input.id === Calc.Input.Id.height);
          if ([weight, height].find(i => !this.inputReadyToCalculate(i))) { return null; }

          const weight_kg: number = this.inputConversion(weight)(Unit.Symbol.kg);
          const height_m: number = this.inputConversion(height)(Unit.Symbol.m);
          return this.equationService.bodyMassIndex(weight_kg)(height_m);
        }
      }
    },
    {
      id: Calc.Id.mifflin,
      title: 'Mifflin St. Jeor',
      subTitle: 'Daily calorie needs for adults',
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
          if ([weight, height, age].find(i => !this.inputReadyToCalculate(i)) ||
              [gender].find(s => !this.selectionReadyToCalculate(s))) { return null; }

          const genderText: string = Option.Id[gender.value.id];
          const weight_kg: number = this.inputConversion(weight)(Unit.Symbol.kg);
          const height_cm: number = this.inputConversion(height)(Unit.Symbol.cm);
          const age_y: number = this.inputConversion(age)(Unit.Symbol.y);
          return this.equationService.mifflinStJeor(genderText)(weight_kg)(height_cm)(age_y);
        }
      }
    }
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

  private getInputSettings = () => new Promise<Calc.Input.Settings[]>((resolve, reject) => resolve(this.inputSettings));

  inputReadyToCalculate = (input: Calc.Input): boolean => (input != null && input.value != null);

  selectionReadyToCalculate = (selection: Calc.Selection): boolean => (selection != null && selection.value != null);

  getCalculators = () => new Promise<Calc.Calc[]>((resolve, reject) => resolve(this.calcs));

  getAllSelections = (): Promise<Calc.Selection[]> => new Promise<Calc.Selection[]>((resolve, reject) => resolve(this.Selections));

  getSelectionIds = (calcs: Calc.Calc[]) => {
    if (!calcs || calcs.length <= 0) {
      return [];
    }

    const mergedSelectionIds: Calc.Selection.Id[] = [].concat.apply([], calcs.map(c => c.selectionIds));
    const distinctSelectionIds: Calc.Selection.Id[] = mergedSelectionIds.filter((v, i, a) => a.indexOf(v) === i);

    return distinctSelectionIds;
  }

  getAllInputs = (): Promise<Calc.Input[]> => {
    return Promise.all([this.getInputSettings(), this.unitService.getAllUnits()]).then(value => {
      const inputSettings: Calc.Input.Settings[] = value[0];
      const units: {[type: number]: Unit.Unit[]} = value[1];

      return inputSettings.map<Calc.Input>(p => {
        const group = this.unitService.filterUnits(units[p.typeId])(p.symbolsFilter);
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

  getInputs = (inputIds: Calc.Input.Id[]) => this.getAllInputs().then(
    (inputs: Calc.Input[]) => inputs.filter(input => inputIds.find(id => id === input.id))
  )

  getInputIds = (calcs: Calc.Calc[]) => {
    if (!calcs || calcs.length <= 0) {
      return [];
    }

    const mergedInputIds: Calc.Input.Id[] = [].concat.apply([], calcs.map(c => c.inputIds));
    const distinctInputIds: Calc.Input.Id[] = mergedInputIds.filter((v, i, a) => a.indexOf(v) === i);

    return distinctInputIds;
  }

  inputConversion = (input: Calc.Input) => (targetSymbol: Unit.Symbol) => {
    const targetUnit = input.group.find(u => u.symbol === targetSymbol);
    return this.unitService.conversion(input.unit.factor)(targetUnit.factor)(input.value);
  }

  getActiveCount = (data: Calc.Data[]): number => data.filter(d => d.active).length;
  getAllActiveCount = (data: (Calc.Input[]|Calc.Selection[]|Calc.Data[])[]): number => this.getActiveCount([].concat.apply([], data));

  getActiveFilledCount = (data: Calc.Data[]): number => data.filter(d => d.active && d.value).length;
  getAllActiveFilledCount = (data: (Calc.Input[]|Calc.Selection[]|Calc.Data[])[]): number => this.getActiveFilledCount([].concat.apply([], data));
}
