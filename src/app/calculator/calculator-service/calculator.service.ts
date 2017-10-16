import { Injectable } from '@angular/core';
import { UnitService } from '../unit/unit.service';
import { Unit } from '../unit/unit';
import { Calc } from './calc';
import { EquationService } from '../equation/equation.service';

@Injectable()
export class CalculatorService {
  private calcs: Calc.Calc[] = [
    {
      id: Calc.Id.bmi,
      title: 'Body Mass Index (BMI)',
      subTitle: 'A measure of body fat in adults',
      active: false,
      inputIds: [Calc.Input.Id.height, Calc.Input.Id.weight],
      output: <Calc.Output>{
        unitText: 'kg/m²',
        result: (inputs: Calc.Input[]): number => {
          const weight: Calc.Input = inputs.find(input => input.id === Calc.Input.Id.weight);
          const height: Calc.Input = inputs.find(input => input.id === Calc.Input.Id.height);
          if ([weight, height].find(i => !this.readyToCalculate(i))) { return null; }

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
      output: <Calc.Output>{
        unitText: 'kg/m²',
        result: (inputs: Calc.Input[]): number => {
          const weight: Calc.Input = inputs.find(input => input.id === Calc.Input.Id.weight);
          const height: Calc.Input = inputs.find(input => input.id === Calc.Input.Id.height);
          const age: Calc.Input = inputs.find(input => input.id === Calc.Input.Id.age);
          if ([weight, height, age].find(i => !this.readyToCalculate(i))) { return null; }

          const weight_kg: number = this.inputConversion(weight)(Unit.Symbol.kg);
          const height_cm: number = this.inputConversion(height)(Unit.Symbol.cm);
          const age_y: number = this.inputConversion(age)(Unit.Symbol.y);
          return this.equationService.mifflinStJeor(weight_kg)(height_cm)(age_y);
        }
      }
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

  readyToCalculate = (input: Calc.Input): boolean => (input != null && input.value != null);

  getCalculators = () => new Promise<Calc.Calc[]>((resolve, reject) => resolve(this.calcs));

  getAllInputs(): Promise<Calc.Input[]> {
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

    const mergedInputIds: Calc.Input.Id[] = [].concat.apply([], calcs.map(i => i.inputIds));
    const distinctInputIds: Calc.Input.Id[] = mergedInputIds.filter((v, i, a) => a.indexOf(v) === i);

    return distinctInputIds;
  }

  commonUnitSystem = (inputs: Calc.Input[]) => {
    if (!inputs || inputs.length <= 0) {
      return null;
    }

    const inputsWithSystem = inputs.filter(input => input.unit && input.unit.system != null);
    const systems = inputsWithSystem.map(input => input.unit.system);
    const distinctSystems = systems.filter((v, i, a) => a.indexOf(v) === i);
    const allSame: boolean = distinctSystems.length === 1;

    return allSame ? distinctSystems[0] : null;
  }

  inputConversion = (input: Calc.Input) => (targetSymbol: Unit.Symbol) => {
    const targetUnit = input.group.find(u => u.symbol === targetSymbol);
    return this.unitService.conversion(input.unit.factor)(targetUnit.factor)(input.value);
  }
}
